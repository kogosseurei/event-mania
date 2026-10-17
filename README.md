# Campus Events

A mobile first event discovery app for **Example University**. Students choose interests, receive an explainable personalized feed, browse campus events, save possibilities, and RSVP without scheduling conflicts. Ten validated mock events stay current through an hourly relative-time anchor.

Built with Next.js App Router, strict TypeScript, Tailwind v4, Zustand, TanStack Query, Zod, Cloudinary, Gemini, and a read-only MCP endpoint. Works with **no environment variables**: category artwork replaces Cloudinary and deterministic explanations replace Gemini.

## Quick start

Use Node.js 22 or later (verified locally with Node 24).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Start at `/onboarding`, choose at least three interests, and continue. Local preferences, saved events, and mock RSVPs persist in this browser. They are not university-wide registrations.

For a production preview:

```sh
npm run check
npm run build
npm run start
```

## Screens

| Route                | Purpose                                                |
| -------------------- | ------------------------------------------------------ |
| `/`                  | Ranked personalized feed and top match                 |
| `/onboarding`        | Interest and faculty selection                         |
| `/browse`            | URL-based search, filters, and sorting                 |
| `/events/ev-004`     | Detail, agenda, location, RSVP, share, calendar export |
| `/my-events`         | Upcoming RSVP and saved lists; past event disclosure   |
| `/profile/interests` | Edit the same preferences used in onboarding           |
| `/mcp`               | Live registry-driven tool documentation                |
| `/design`            | UI, event variants, and RSVP state gallery             |
| `/layout-check`      | Breakpoint review; intentionally 404 in production     |

## Environment variables

Copy `.env.example` to `.env.local` for local integrations. In Vercel, set applicable values under **Project → Settings → Environment Variables**, select Production/Preview/Development, and redeploy after changes. Do not commit secrets.

| Variable                                      | Purpose and location                                                                                              |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`           | Optional cloud name from the Cloudinary dashboard; set in Vercel Preview and Production to enable hosted images   |
| `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Local seed script only; obtain from Cloudinary API settings; never expose with a NEXT_PUBLIC prefix               |
| `GEMINI_API_KEY`                              | Optional Google AI Studio key; server-side Vercel Preview/Production variable                                     |
| `GEMINI_MODEL_FAST`                           | Explanations model; defaults to `gemini-2.5-flash-lite`                                                           |
| `GEMINI_MODEL_SMART`                          | Search parsing model; defaults to the brief's `gemini-3.8-flash`; choose an identifier available to your account  |
| `NEXT_PUBLIC_APP_URL`                         | Canonical deployment origin, e.g. `https://campus.example.edu`; set to the production domain in Vercel Production |
| `MCP_URL`                                     | Integration test endpoint; defaults to `http://localhost:3000/api/mcp`                                            |
| `BASE_URL`                                    | Optional Playwright target; otherwise tests start the local production build at port 3100                         |
| `VERCEL_AUTOMATION_BYPASS_SECRET`             | Optional GitHub Actions secret for protected preview deployments                                                  |

Model names are configured only in the environment validator. Missing credentials, unavailable models, invalid responses, timeouts, and AI rate limits use deterministic fallbacks. No paid AI or image upload calls were needed for local verification.

## Scripts and verification

| Command                       | Purpose                                                                                       |
| ----------------------------- | --------------------------------------------------------------------------------------------- |
| `npm run dev`                 | Development server                                                                            |
| `npm run lint`                | ESLint, import boundaries, zero warning threshold                                             |
| `npm run typecheck`           | Strict TypeScript, including unchecked indexes and exact optional fields                      |
| `npm test`                    | Vitest unit and component checks                                                              |
| `npm run check`               | Lint → typecheck → tests                                                                      |
| `npm run build` / `npm start` | Production build / server                                                                     |
| `npm run test:e2e`            | Seven viewport projects, axe, touch targets, grid dimensions, zoom, screenshots, student path |
| `npm run test:mcp`            | SDK client lists and calls all tools, rejects invalid input, checks unknown event errors      |
| `npm run seed:images`         | Generate and upload 16 gradient PNGs with exact public IDs; overwrites safely                 |

Install the test browser once with `npx playwright install chromium`. Build before running the local E2E suite. The suite saves per-route screenshots, traces on failures, and an HTML report under ignored `test-results/` and `playwright-report/` folders. The two journey/dialog scenarios intentionally run only in the 390×844 project; every route layout scenario runs at all seven sizes.

The mock data includes a full workshop (`ev-002`), nearly full CV clinic (`ev-006`), past fun run (`ev-010`), and deliberately overlapping **Open Mic Night (`ev-004`) / Chess and Debate Mixer (`ev-007`)**. RSVP checks use half-open intervals, so events touching at an endpoint do not conflict. A failed mock mutation rolls back its optimistic update. Calendar downloads fold lines at 75 UTF-8 octets and use escaped text, UTC timestamps, and CRLF line endings.

## Folder structure

```text
src/app/          App Router screens, route groups, API and MCP routes
src/api/          Validated client fetchers
src/components/   UI, layout, events, filters, onboarding, feed
src/config/       University branding, venues, categories, interests, constants
src/data/         Ten raw offset-based event fixtures
src/hooks/        Browser-safe behavior, queries, hydration and actions
src/lib/          Pure filtering, dates, RSVP rules, ICS, class and image helpers
src/matching/     Scoring and interchangeable explanation providers
src/schemas/      Shared Zod transport/domain schemas
src/server/       Repositories, services, HTTP, Gemini, cache, rate limits, MCP tools
src/stores/       Versioned persisted browser data and transient UI/toast state
src/types/        Schema-inferred domain types
scripts/          Cloudinary seeder and MCP SDK integration client
tests/            Unit, component and viewport/E2E checks
docs/             Implementation decisions
```

## Breakpoints

| Token | Minimum width | Navigation     | Feed columns | Browse columns |
| ----- | ------------: | -------------- | -----------: | -------------: |
| base  |  320 px floor | Bottom tabs    |            1 |              1 |
| xs    |        360 px | Bottom tabs    |            1 |              1 |
| sm    |        480 px | Bottom tabs    |            1 |              1 |
| md    |        768 px | 72 px rail     |            2 |              2 |
| lg    |       1024 px | 72 px rail     |            3 |    2 + filters |
| xl    |       1280 px | 240 px sidebar |            3 |    2 + filters |
| 2xl   |       1536 px | 240 px sidebar |            4 |    3 + filters |

`src/config/breakpoints.ts`, re-exported through `src/lib/breakpoints.ts`, is the JS source. Matching CSS tokens are declared once in `@theme`. Container queries let Browse stack under 200% zoom even when a wide-screen navigation breakpoint remains active. All viewport layout media queries use minimum widths; the landscape-short rule is the requested maximum-height exception.

## Architecture and swap points

```text
Screens → hooks → typed client API → route wrapper ─┐
                                                 ├→ eventService → EventRepository → mock JSON
AI assistant → /api/mcp → shared tool registry ────┘

Feed / Browse / API / MCP → shared filtering and scoring
Explanation provider → server-only Gemini → schema validation → cache
                                       ↘ deterministic fallback
Browser actions → persisted Zustand records → pure RSVP / calendar logic
```

1. **Real event API:** replace the repository created in `src/server/events/index.ts`. Keep the `EventRepository` contract and validated domain objects; screens and MCP tools remain unchanged.
2. **Explanation engine:** change `explainerProvider` in `src/matching/explainerProvider.ts`. The interface is `MatchExplainer`; Gemini credentials remain on the server.
3. **Authenticated MCP writes:** extend `src/server/tools/toolRegistry.ts` only after adding real authorization and write services. Current annotations and operations are strictly read only; change annotations for any future write tool.

The in-memory TTL cache and sliding window limiter are bounded, **per server instance**, not global quotas. Their store interfaces allow Redis/Upstash/KV implementations without UI changes. Personal student names or emails are not profile fields or AI inputs; user search data is treated as untrusted, with common email/phone patterns redacted before Gemini.

## Deployment flow

Push this repository to GitHub and import it into a Vercel project using the default Next.js preset. No custom `vercel.json` is required. Configure the main branch as Production; Vercel's Git integration creates previews for pull requests. The included GitHub workflow runs code checks on pushes and pull requests. A successful preview deployment status triggers a second job that runs Playwright and the MCP client against that preview URL; enable deployment status events through the Vercel GitHub integration. For protected previews, configure the automation bypass secret in GitHub Actions.

Vercel Analytics is included in the root layout. Enable Web Analytics in your Vercel project. Deployment and service accounts have not been linked automatically: the source, checks, and workflow are prepared locally.

## MCP for students

Open `/mcp` for schemas and examples generated from the server registry. The Streamable HTTP endpoint is `/api/mcp`. Its tools are `search_events`, `get_event`, `recommend_events`, `list_venues`, and `list_categories`. Limits: 200 search characters, 10 interests, 20 results, 20 requests per minute per IP.

For clients that need a stdio bridge:

```json
{
  "mcpServers": {
    "campus-events": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://YOUR-DOMAIN/api/mcp"]
    }
  }
}
```

Recommendations need only interest IDs and an optional faculty. This endpoint cannot access browser saves or RSVPs. Check it locally with `MCP_URL=http://localhost:3000/api/mcp npm run test:mcp` (PowerShell: `$env:MCP_URL='http://localhost:3000/api/mcp'` followed by the npm command).

## Vercel MCP for developers

Vercel's separate official MCP server is **https://mcp.vercel.com**. It lets a coding agent inspect deployments and build/runtime logs. Use it to diagnose a preview, then check environment configuration in the Vercel project settings; do not paste secret values into chat. Its tools and account permissions differ from this application's student endpoint. See [Vercel's setup documentation](https://vercel.com/docs/agent-resources/vercel-mcp) and [available tools](https://vercel.com/docs/agent-resources/vercel-mcp/tools).

For Codex CLI:

```sh
codex mcp add vercel --url https://mcp.vercel.com
codex mcp login vercel
codex mcp list
```

Complete the browser-based Vercel OAuth sign-in, approve the intended account/team, and return to Codex. In the Codex interface, `/mcp` shows active connections. Equivalent `config.toml` entry:

```toml
[mcp_servers.vercel]
url = "https://mcp.vercel.com"
```

For other Streamable HTTP clients, use the following configuration and their sign-in/authorization prompt:

```json
{ "mcpServers": { "vercel": { "url": "https://mcp.vercel.com" } } }
```

After authorizing, ask the agent to inspect the latest preview deployment, identify failed build steps, or review runtime errors for this project. Environment settings should be checked against `.env.example` before redeployment. Codex configuration guidance was checked against the [official Codex manual](https://developers.openai.com/codex/codex-manual.md).

## Implementation references

The installed APIs were checked against [Next Cloudinary](https://next.cloudinary.dev/cldimage/basic-usage), [Gemini structured output](https://ai.google.dev/gemini-api/docs/structured-output), and [mcp-handler](https://github.com/vercel-labs/mcp-handler). The current MCP handler uses SDK 2 server internals and derives its path from Next.js routing; old `basePath` options are intentionally absent. The integration client uses the patched SDK 1 package requested in the brief. See [docs/DECISIONS.md](docs/DECISIONS.md) for tradeoffs and verification notes.
