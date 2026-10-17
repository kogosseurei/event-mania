import type { ReactElement } from 'react';
import {
  Button,
  Badge,
  Chip,
  Skeleton,
  ProgressBar,
  Section,
  Toaster,
  IconButton,
} from '@/components/ui';
import { Heart } from 'lucide-react';
import { EventGallery } from './EventGallery';
import { FallbackGallery } from './FallbackGallery';
import { OverlayGallery } from './OverlayGallery';
export default function Design(): ReactElement {
  return (
    <main id="main" className="page-container">
      <h1>Design system</h1>
      <p>Campus Events · components and states</p>
      <Section title="Buttons">
        <div className="flow">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button loading>Loading</Button>
          <IconButton aria-label="Example save control">
            <Heart size={18} />
          </IconButton>
        </div>
      </Section>
      <Section title="Chips and badges">
        <div className="flow">
          <Chip selected>Technology</Chip>
          <Chip>Sports</Chip>
          <Badge tone="success">92% match</Badge>
          <Badge tone="warning">Nearly full</Badge>
        </div>
      </Section>
      <Section title="Loading and progress">
        <Skeleton shape="block" />
        <ProgressBar value={75} label="75 percent full" />
      </Section>
      <EventGallery />
      <OverlayGallery />
      <FallbackGallery />
      <Toaster />
    </main>
  );
}
