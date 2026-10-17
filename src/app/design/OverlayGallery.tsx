'use client';
import { useState, type ReactElement } from 'react';
import { useToastStore } from '@/stores';
import { Button, BottomSheet, Section, Tabs } from '@/components/ui';
export function OverlayGallery(): ReactElement {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState('first');
  const push = useToastStore((state) => state.push);
  return (
    <>
      <Section title="Overlays and tabs">
        <div className="flow">
          <Button onClick={() => setOpen(true)}>Open sheet</Button>
          <Button
            onClick={() =>
              push({
                message: 'Event saved',
                tone: 'success',
                actionLabel: 'Undo',
                onAction: () => push({ message: 'Save undone', tone: 'info' }),
              })
            }
          >
            Show toast
          </Button>
        </div>
        <Tabs
          label="Gallery tabs"
          tabs={[
            { value: 'first', label: 'First tab' },
            { value: 'second', label: 'Second tab' },
          ]}
          value={tab}
          onChange={setTab}
        />
      </Section>

      <BottomSheet open={open} onClose={() => setOpen(false)} title="A little more detail">
        <p>Accessible sheet with native focus management.</p>
        <Button onClick={() => setOpen(false)}>Done</Button>
      </BottomSheet>
    </>
  );
}
