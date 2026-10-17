// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, expect, it, vi } from 'vitest';
import { InterestPicker } from '@/components/onboarding';
afterEach(cleanup);
it('announces the minimum and exposes selection state', () => {
  const toggle = vi.fn();
  render(<InterestPicker selected={['tech', 'music']} onToggle={toggle} />);
  expect(screen.getByText('2 of 3 selected')).toBeTruthy();
  const button = screen.getByRole('button', { name: 'Technology' });
  expect(button.getAttribute('aria-pressed')).toBe('true');
  fireEvent.click(button);
  expect(toggle).toHaveBeenCalledWith('tech');
});
