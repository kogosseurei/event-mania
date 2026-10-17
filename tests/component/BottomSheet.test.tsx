// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, expect, it } from 'vitest';
import { useState, type ReactElement } from 'react';
import { BottomSheet } from '@/components/ui';
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function (this: HTMLDialogElement): void {
    this.open = true;
    this.querySelector<HTMLElement>('button')?.focus();
  };
  HTMLDialogElement.prototype.close = function (this: HTMLDialogElement): void {
    this.open = false;
  };
});
afterEach(cleanup);
function SheetFixture(): ReactElement {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open modal</button>
      <BottomSheet open={open} onClose={() => setOpen(false)} title="Test modal">
        <button>Inside the sheet</button>
      </BottomSheet>
    </>
  );
}
it('opens with a label, locks scroll, closes on Escape and restores focus', () => {
  render(<SheetFixture />);
  const trigger = screen.getByRole('button', { name: 'Open modal' });
  trigger.focus();
  fireEvent.click(trigger);
  expect(screen.getByRole('dialog', { name: 'Test modal' }).getAttribute('open')).not.toBeNull();
  expect(document.body.style.overflow).toBe('hidden');
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.queryByRole('dialog')).toBeNull();
  expect(document.activeElement).toBe(trigger);
  expect(document.body.style.overflow).toBe('');
});
