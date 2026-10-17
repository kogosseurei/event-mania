import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const routes = [
  '/',
  '/browse',
  '/my-events',
  '/profile/interests',
  '/onboarding',
  '/events/ev-004',
  '/mcp',
  '/design',
];
for (const route of routes)
  test(`layout and accessibility ${route}`, async ({ page }, testInfo) => {
    await page.addInitScript(() => {
      localStorage.setItem(
        'campus-events:profile:v1',
        JSON.stringify({
          state: {
            interests: ['tech', 'music', 'arts', 'clubs'],
            faculty: 'Engineering',
            onboarded: true,
          },
          version: 1,
        }),
      );
    });
    await page.goto(route);
    await expect(page.locator('h1')).toBeVisible();
    if (route !== '/design') await expect(page.locator('.skeleton').first()).toBeHidden();
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
      .toBe(true);
    const result = await new AxeBuilder({ page }).analyze();
    expect(
      result.violations.filter((violation) =>
        ['serious', 'critical'].includes(violation.impact ?? ''),
      ),
    ).toEqual([]);
    const width = page.viewportSize()?.width ?? 0;
    if (!['/onboarding', '/design'].includes(route)) {
      await expect(
        page.getByRole('navigation', {
          name:
            width < 768
              ? 'Mobile navigation'
              : width < 1280
                ? 'Tablet navigation'
                : 'Desktop navigation',
          exact: true,
        }),
      ).toHaveCount(route.startsWith('/events/') && width < 768 ? 0 : 1);
    }
    if (width <= 1024) {
      const small = await page.locator('button,a,input,select,summary').evaluateAll((elements) =>
        elements.flatMap((element) => {
          const style = getComputedStyle(element);
          if (
            style.display === 'none' ||
            style.visibility === 'hidden' ||
            element.closest('dialog:not([open])') ||
            element.classList.contains('skip-link')
          )
            return [];
          const target =
            element instanceof HTMLInputElement && element.type === 'checkbox'
              ? (element.closest('label') ?? element)
              : element;
          const box = target.getBoundingClientRect();
          if (!box.width || !box.height) return [];
          return box.width < 43 || box.height < 43
            ? [{ text: element.textContent?.slice(0, 40), width: box.width, height: box.height }]
            : [];
        }),
      );
      expect(small).toEqual([]);
    }
    if (route === '/' || route === '/browse') {
      const grid = page.locator('.responsive-grid').first();
      if (await grid.count()) {
        const columns = await grid.evaluate(
          (element) => getComputedStyle(element).gridTemplateColumns.split(' ').length,
        );
        expect(columns).toBe(
          width < 768
            ? 1
            : width < 1024
              ? 2
              : width < 1536
                ? route === '/browse'
                  ? 2
                  : 3
                : route === '/browse'
                  ? 3
                  : 4,
        );
        const rows = await grid.locator(':scope > article').evaluateAll((cards) => {
          const groups = new Map<number, number[]>();
          for (const card of cards) {
            const rect = card.getBoundingClientRect();
            const key = Math.round(rect.top);
            groups.set(key, [...(groups.get(key) ?? []), rect.height]);
          }
          return [...groups.values()];
        });
        for (const row of rows) expect(Math.max(...row) - Math.min(...row)).toBeLessThan(2);
      }
    }
    await page.screenshot({
      path: testInfo.outputPath(`route-${route.replaceAll('/', '-') || 'home'}.png`),
      fullPage: true,
    });
    await page.evaluate(() => {
      document.documentElement.style.zoom = '2';
    });
    await expect
      .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
      .toBe(true);
  });
test('student path and overlap conflict', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== '390x844', 'Full path runs at the requested phone viewport.');
  await page.goto('/onboarding');
  for (const interest of ['Technology', 'Music', 'Clubs & societies'])
    await page.getByRole('button', { name: interest, exact: true }).click();
  await page.getByRole('button', { name: 'Find my events' }).click();
  await expect(page).toHaveURL('/');
  await page.goto('/events/ev-004');
  await page.getByRole('button', { name: 'RSVP \u00b7 Save me a spot' }).click();
  await expect(page.getByRole('button', { name: 'Going, tap to cancel' })).toBeVisible();
  await page.goto('/my-events');
  await expect(page.getByRole('link', { name: 'Open Mic Night', exact: true })).toBeVisible();
  await page.goto('/events/ev-007');
  const conflict = page.getByRole('button', { name: 'Clashes with Open Mic Night' });
  await expect(conflict).toBeVisible();
  await expect(conflict).toBeDisabled();
});
test('mobile filter dialog closes and restores focus', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== '390x844');
  await page.goto('/browse');
  const trigger = page.getByRole('button', { name: 'Filters', exact: true });
  await trigger.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(trigger).toBeFocused();
});
test('dark mode remains accessible', async ({ page }, testInfo) => {
  test.skip(
    !['390x844', '1280x800'].includes(testInfo.project.name),
    'Dark mode review at phone and desktop.',
  );
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/browse');
  await expect(page.getByRole('link', { name: 'Open Mic Night', exact: true })).toBeVisible();
  const result = await new AxeBuilder({ page }).analyze();
  expect(
    result.violations.filter((violation) =>
      ['serious', 'critical'].includes(violation.impact ?? ''),
    ),
  ).toEqual([]);
  await page.screenshot({ path: testInfo.outputPath('dark-browse.png'), fullPage: true });
});
test('saving can be undone', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== '390x844');
  await page.goto('/browse');
  const save = page.getByRole('button', { name: 'Save event', exact: true }).first();
  await save.click();
  await expect(page.getByRole('button', { name: 'Unsave event', exact: true })).toHaveCount(1);
  await page.getByRole('button', { name: 'Undo', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Unsave event', exact: true })).toHaveCount(0);
});
