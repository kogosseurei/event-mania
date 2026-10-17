import { interestCategoryMap } from '@/config';
import type { CampusEvent, ScoreResult, StudentProfile } from '@/types';
import { weights } from './weights';
export function scoreEvent(profile: StudentProfile, event: CampusEvent, now: number): ScoreResult {
  if (Date.parse(event.endTime) <= now)
    return { score: 0, matchedInterests: [], categoryMatched: false, reasons: [] };
  const matchedInterests = [
    ...new Set(profile.interests.filter((interest) => event.tags.includes(interest))),
  ];
  const categoryMatched = profile.interests.some(
    (interest) => interestCategoryMap[interest] === event.category,
  );
  const timeUntil = Math.max(0, Date.parse(event.startTime) - now);
  const proximity = Math.max(0, weights.proximity * (1 - timeUntil / weights.proximityWindow));
  const facultyMatched = profile.faculty !== null && event.faculty === profile.faculty;
  const score = Math.min(
    weights.maximum,
    Math.round(
      (categoryMatched ? weights.category : 0) +
        Math.min(weights.tagCap, matchedInterests.length * weights.tag) +
        proximity +
        (facultyMatched ? weights.faculty : 0),
    ),
  );
  const reasons = [
    ...(matchedInterests.length
      ? [`Matches your interest in ${matchedInterests.join(' and ')}.`]
      : categoryMatched
        ? ['A category you enjoy.']
        : []),
    ...(facultyMatched ? ['From your faculty.'] : []),
    ...(proximity > 0 ? ['Coming up this week.'] : []),
  ];
  return { score, matchedInterests, categoryMatched, reasons };
}
