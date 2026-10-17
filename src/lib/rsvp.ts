import type { CampusEvent, RsvpRecord } from '@/types';
export type RsvpState = 'idle' | 'pending' | 'going' | 'full' | 'conflict' | 'past';
export function findConflict(
  event: Pick<CampusEvent, 'id' | 'startTime' | 'endTime'>,
  records: RsvpRecord[],
): RsvpRecord | undefined {
  return records.find(
    (record) =>
      record.eventId !== event.id &&
      Date.parse(record.startTime) < Date.parse(event.endTime) &&
      Date.parse(record.endTime) > Date.parse(event.startTime),
  );
}
export function getRsvpState(
  event: CampusEvent,
  records: RsvpRecord[],
  pending: boolean = false,
  now: number = Date.now(),
): RsvpState {
  if (pending) return 'pending';
  if (records.some((record) => record.eventId === event.id)) return 'going';
  if (Date.parse(event.endTime) <= now) return 'past';
  if (event.registeredCount >= event.capacity) return 'full';
  if (findConflict(event, records)) return 'conflict';
  return 'idle';
}
export function canRsvp(
  event: CampusEvent,
  records: RsvpRecord[],
  now: number = Date.now(),
): boolean {
  return getRsvpState(event, records, false, now) === 'idle';
}
