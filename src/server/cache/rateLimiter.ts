import { MINUTE_MS, RATE_LIMIT } from '@/config';
export interface RateLimitStore {
  consume(key: string, now: number): boolean;
}
export class SlidingWindowRateLimiter implements RateLimitStore {
  private readonly requests = new Map<string, number[]>();
  constructor(
    private readonly limit: number = RATE_LIMIT,
    private readonly window: number = MINUTE_MS,
  ) {}
  consume(key: string, now: number): boolean {
    for (const [id, times] of this.requests)
      if ((times.at(-1) ?? 0) <= now - this.window) this.requests.delete(id);
    const recent = (this.requests.get(key) ?? []).filter((time) => time > now - this.window);
    if (recent.length >= this.limit) return false;
    if (this.requests.size >= 10000 && !this.requests.has(key)) return false;
    this.requests.set(key, [...recent, now]);
    return true;
  }
}
export const rateLimiter: RateLimitStore = new SlidingWindowRateLimiter();
export function allowRequest(request: Request): boolean {
  const address = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'local';
  return rateLimiter.consume(address, Date.now());
}
