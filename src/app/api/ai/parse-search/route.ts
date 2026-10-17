import { searchInputSchema } from '@/schemas';
import { parseNaturalSearch, ruleBasedSearch } from '@/server/ai';
import { allowRequest } from '@/server/cache';
import { handleRoute } from '@/server/http';
export async function POST(request: Request): Promise<Response> {
  return handleRoute(async () => {
    const { query } = searchInputSchema.parse(await request.json());
    return allowRequest(request) ? parseNaturalSearch(query) : ruleBasedSearch(query);
  });
}
