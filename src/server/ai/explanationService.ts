import { z } from 'zod';
import type { ExplanationInput, ExplanationMap } from '@/types';
import { TtlCache, type CacheStore } from '../cache';
import { explanationPrompt } from './prompts';
import { generateJson, type GeminiGateway } from './geminiClient';
const outputSchema = z.record(
  z.string(),
  z
    .string()
    .trim()
    .min(1)
    .refine((text) => text.split(/\s+/).length <= 16),
);
const cache = new TtlCache<string>();
export async function explainEvents(
  input: ExplanationInput,
  gateway: GeminiGateway = generateJson,
  store: CacheStore<string> = cache,
): Promise<ExplanationMap> {
  const explanations = Object.fromEntries(
    input.events.map((event) => [
      event.id,
      event.score.reasons.join(' ') || 'Discover something new on campus.',
    ]),
  );
  const profileKey = JSON.stringify([[...input.interests].sort(), input.faculty]);
  const missing = input.events.filter((event) => {
    const cached = store.get(`${profileKey}:${event.id}`);
    if (cached) {
      explanations[event.id] = cached;
      return false;
    }
    return true;
  });
  if (!missing.length) return { explanations, source: input.events.length ? 'ai' : 'fallback' };
  try {
    const result = outputSchema.parse(
      await gateway(explanationPrompt({ ...input, events: missing }), z.toJSONSchema(outputSchema)),
    );
    let accepted = 0;
    for (const event of missing) {
      const text = result[event.id];
      if (text) {
        explanations[event.id] = text;
        store.set(`${profileKey}:${event.id}`, text);
        accepted++;
      }
    }
    return { explanations, source: accepted ? 'ai' : 'fallback' };
  } catch {
    return { explanations, source: 'fallback' };
  }
}
