export interface EventStatus { label: string; tone: 'success' | 'warning' | 'muted' }
const HOUR = 3_600_000;
export function getEventStatus(startTime: string, endTime: string, now: number): EventStatus | null {
 const start = Date.parse(startTime); const end = Date.parse(endTime);
 if (end <= now) return { label: 'Past event', tone: 'muted' };
 if (start <= now) return { label: 'Happening now', tone: 'success' };
 if (start - now < 24 * HOUR) return { label: `Starts in ${Math.max(1, Math.ceil((start - now) / HOUR))}h`, tone: 'warning' };
 return null;
}
export function formatDate(value: string): string { return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', weekday: 'short' }).format(new Date(value)); }
export function formatTime(value: string): string { return new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' }).format(new Date(value)); }