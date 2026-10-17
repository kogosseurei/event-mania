import { fetchExplanations } from '@/api';
import type { ExplanationMap, ScoredEvent, StudentProfile } from '@/types';
import type { MatchExplainer } from './explainer';
import { RuleBasedExplainer } from './RuleBasedExplainer';
export class ApiExplainer implements MatchExplainer {
  async explainMany(profile: StudentProfile, events: ScoredEvent[]): Promise<ExplanationMap> {
    try {
      return await fetchExplanations({
        interests: profile.interests,
        faculty: profile.faculty,
        events: events.slice(0, 12).map(({ event, score }) => ({
          id: event.id,
          title: event.title,
          category: event.category,
          tags: event.tags,
          score,
        })),
      });
    } catch {
      return new RuleBasedExplainer().explainMany(profile, events);
    }
  }
}
