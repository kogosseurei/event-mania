export function eventPath(id: string): string {
  return `/events/${encodeURIComponent(id)}`;
}
