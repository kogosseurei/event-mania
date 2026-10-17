import { explanationMapSchema, eventFiltersSchema } from '@/schemas';
import type { ExplanationInput, ExplanationMap, EventFilters } from '@/types';
async function postJson(path: string, input: unknown): Promise<unknown> {
  const response = await fetch(path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error('AI is unavailable');
  return response.json();
}
export async function fetchExplanations(input: ExplanationInput): Promise<ExplanationMap> {
  return explanationMapSchema.parse(await postJson('/api/ai/explanations', input));
}
export async function parseSearch(query: string): Promise<EventFilters> {
  return eventFiltersSchema.parse(await postJson('/api/ai/parse-search', { query }));
}
