import type { z } from 'zod';
import type { eventSchema, venueSchema, studentProfileSchema, interestSchema, eventFiltersSchema, scoreResultSchema, explanationMapSchema, explanationInputSchema, rsvpRecordSchema, categorySchema } from '@/schemas';
export type CampusEvent = z.infer<typeof eventSchema>;
export type Venue = z.infer<typeof venueSchema>;
export type StudentProfile = z.infer<typeof studentProfileSchema>;
export type Interest = z.infer<typeof interestSchema>;
export type Category = z.infer<typeof categorySchema>;
export type EventFilters = z.infer<typeof eventFiltersSchema>;
export type ScoreResult = z.infer<typeof scoreResultSchema>;
export type ExplanationMap = z.infer<typeof explanationMapSchema>;
export type ExplanationInput = z.infer<typeof explanationInputSchema>;
export type RsvpRecord = z.infer<typeof rsvpRecordSchema>;
export interface ScoredEvent { event: CampusEvent; score: ScoreResult }