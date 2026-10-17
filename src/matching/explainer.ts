import type { ExplanationMap, ScoredEvent, StudentProfile } from '@/types';
export interface MatchExplainer {explainMany(profile:StudentProfile,events:ScoredEvent[]):Promise<ExplanationMap>}