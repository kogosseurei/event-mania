import type { ReactElement } from 'react';
import { NavigationLinks } from './NavigationLinks';
export function BottomTabBar(): ReactElement {
  return (
    <nav className="bottom-tabs" aria-label="Mobile navigation">
      <NavigationLinks />
    </nav>
  );
}
