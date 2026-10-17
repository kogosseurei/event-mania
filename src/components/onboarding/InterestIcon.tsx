import type { ReactElement } from 'react';
import {
  Code2,
  Trophy,
  Music2,
  BriefcaseBusiness,
  Users,
  Palette,
  HeartHandshake,
  Rocket,
  Gamepad2,
  Leaf,
} from 'lucide-react';
import type { Interest } from '@/types';
export interface InterestIconProps {
  interest: Interest;
  size?: number;
}
const icons = {
  tech: Code2,
  sports: Trophy,
  music: Music2,
  careers: BriefcaseBusiness,
  clubs: Users,
  arts: Palette,
  volunteering: HeartHandshake,
  entrepreneurship: Rocket,
  gaming: Gamepad2,
  wellness: Leaf,
};
export function InterestIcon({ interest, size = 18 }: InterestIconProps): ReactElement {
  const Icon = icons[interest];
  return <Icon size={size} />;
}
