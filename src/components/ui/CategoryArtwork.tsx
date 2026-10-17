import type { ReactElement } from 'react';
import { Code2, Music2, Trophy, BriefcaseBusiness, Users, Palette, Sparkles } from 'lucide-react';
import { university } from '@/config';
export interface CategoryArtworkProps {
  category: string;
  alt: string;
}
const icons = {
  tech: Code2,
  sports: Trophy,
  music: Music2,
  careers: BriefcaseBusiness,
  clubs: Users,
  arts: Palette,
};
const captions: Record<string, string> = {
  tech: 'BUILD WHAT’S NEXT',
  music: 'FEEL THE MOMENT',
  sports: 'PLAY YOUR PART',
  careers: 'YOUR NEXT CHAPTER',
  arts: 'A NEW PERSPECTIVE',
  clubs: 'FIND YOUR PEOPLE',
};
export function CategoryArtwork({ category, alt }: CategoryArtworkProps): ReactElement {
  const Icon = icons[category as keyof typeof icons] ?? Sparkles;
  return (
    <div className="artwork" role="img" aria-label={alt}>
      <div className="artwork-orbit" />
      <div className="artwork-grid" />
      <Icon size={96} strokeWidth={1} />
      <span className="artwork-word">{captions[category] ?? 'FIND YOUR PEOPLE'}</span>
      <span className="artwork-caption">{university.name.toUpperCase()} · CAMPUS LIFE</span>
    </div>
  );
}
