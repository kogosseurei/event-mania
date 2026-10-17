import type { ExplanationMap, ScoredEvent, StudentProfile } from '@/types';
import type { MatchExplainer } from './explainer';
export function explainMatch(item:ScoredEvent):string {return item.score.reasons.join(' ')||'Discover something new on campus.';}
export class RuleBasedExplainer implements MatchExplainer {async explainMany(_profile:StudentProfile,events:ScoredEvent[]):Promise<ExplanationMap> {return {source:'fallback',explanations:Object.fromEntries(events.map((item)=>[item.event.id,explainMatch(item)]))};}}