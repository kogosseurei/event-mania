export function jsonResponse(
  data: unknown,
  status: number = 200,
  cache: boolean = false,
): Response {
  return Response.json(data, {
    status,
    headers: {
      'Cache-Control': cache ? 'public, s-maxage=60, stale-while-revalidate=300' : 'no-store',
    },
  });
}
