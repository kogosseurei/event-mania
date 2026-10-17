# Decisions and tradeoffs

## Product and local data

- The supplied attachment is the specification. The project is a local Next.js repository targeting Vercel, rather than Sites hosting, which uses a different deployment architecture.
- Example University branding, faculties, venues, and primary color come from configuration. No real university account or event API was supplied.
- No authentication or authoritative RSVP backend was specified. Preferences, saves, and RSVP snapshots are versioned browser-local Zustand state. Mock RSVP latency is 500 ms; the transport can simulate a failure for rollback tests.
- Raw event offsets are converted relative to the current hour at repository read time. Persisted RSVPs retain their original time snapshots as requested. Live demo events advance hourly, while already saved registration snapshots do not.
- Feed excludes ended events and scores below 20; Browse includes past events. Upcoming means the event has not ended. Same-score recommendations order by start time. RSVP conflicts use strict interval overlap, so touching endpoints are allowed.
- Date presets use the server/browser's local date boundaries; weeks begin on Monday. Custom date ranges use ISO instants and an exclusive upper bound. URL input is validated; invalid browser filters reset to defaults, while invalid API inputs return a structured 400.

## Integrations

- Missing Cloudinary credentials show original category artwork in the UI. Domain objects contain public IDs only. The seeder generates and uploads 16 1920×1080 PNG assets with exact IDs and overwrite enabled. No upload was attempted without credentials.
- Cloudinary requests use the configured responsive widths. Metadata uses the Cloudinary OG helper through the image utility, with a generated branded fallback image.
- Gemini is server-only, uses JSON schema output, validates responses, and times out after four seconds. No API key is required. Invalid, missing, partial, failed, and rate-limited AI responses have deterministic fallbacks. Partial explanation results fill missing IDs with local explanations and discard unknown IDs.
- The brief's smart model identifier is retained only as a configurable default. It is not assumed to be available to every account. The fast default is gemini-2.5-flash-lite. Runtime availability failures use fallback behavior.
- Search text is untrusted data. Known instruction-injection patterns bypass Gemini; common email and phone patterns are redacted in prompts. The profile contains only interests and faculty.
- The in-memory TTL cache (24 hours) and sliding-window limiter (20/minute/IP) are bounded per server instance. CacheStore and RateLimitStore allow replacement with a shared service; current limits are not deployment-wide quotas. Forwarded IP headers rely on the hosting platform's proxy behavior.
- Current mcp-handler 2.3 uses SDK 2 internally and no longer accepts the old basePath option. Next.js routing exposes the requested /api/mcp URL. SDK 1.32 is retained as the integration client. The older 1.x adapter was rejected because it pinned an SDK with a reported production security advisory.
- SDK 1's transport sessionId declaration is inconsistent with exactOptionalPropertyTypes. The integration client contains one documented structural cast at connect; strict checking remains enabled everywhere else.
- MCP is stateless and read-only. GET/DELETE session operations follow the adapter's stateless protocol behavior. Browser saves and registrations are not exposed. Write tools require a future authenticated service.

## UI and architecture

- Native modal dialog provides focus trapping and Escape behavior, with explicit focus restoration and body scroll locking. Pointer gestures support downward dismissal.
- The breakpoint hook returns base on the server and during hydration. Navigation visibility remains CSS-driven. Event actions and filter surfaces mount one layout at a time after hydration.
- Shared filters and scoring are used by app screens, services, and MCP tools. Browse best-match uses the current browser profile; the generic read API has no implicit student identity.
- Source render functions are decomposed into focused components. Behaviors, mutations, browser APIs, and persistence live in hooks or stores; client fetch operations live in src/api.
- Layout is mobile first. Container queries additionally stack the Browse panel when zoom reduces available space even though the viewport breakpoint remains wide. Event cards use a stretched link above which the separate save button remains operable.
- Reduced-motion and system-dark preferences use CSS. Category badges retain explicit accessible foreground/background pairs.

## Verification and delivery

- Every implementation phase runs lint, strict typecheck, and unit/component tests before its phase commit.
- Production prerendering exposed unavailable persistence helpers without browser storage. A guarded hydration hook and server-render regression test cover that case.
- Browser connector discovery returned no available browser. The user-requested Playwright suite uses its installed Chromium for automated verification and screenshot artifacts; screenshots were inspected from disk.
- Viewport checks cover 320×640, 360×800, 390×844, 768×1024, 1024×768, 1280×800, and 1536×864. Layout scenarios run on every project. Full student path and dialog focus restoration intentionally run only at 390×844.
- The first axe run identified a visible-label/accessibility-name mismatch on the shared student avatar. Its accessible name now includes the visible text. Zoom failures identified the header and Browse fixed-width layout, which now wrap or stack.
- The development-only layout-check route returns 404 in production. Production test coverage uses the public app routes; layout-check is intended for the dev server.
- At final dependency review, npm audit reports a development-only braces/micromatch dependency advisory through eslint-config-next. The registry has no patched braces release; npm's suggested fix downgrades Next's lint config by two major versions. The supported config is retained. The production-only audit is clean.
- GitHub preview checks require Vercel's deployment_status event and, for protected previews, an automation bypass secret. GitHub/Vercel accounts were not linked or deployed automatically because no target account/repository was supplied.
- The Vercel MCP and Codex setup commands in README were verified against current official Vercel documentation and the fetched Codex manual. No MCP connection settings were changed on the user's behalf.

## Final verification — 17 October 2026

- `npm run check`: lint and strict typecheck pass; 69 unit/component tests pass in 15 files.
- `npm run build`: production build passes without warnings, including the generated social image.
- `npm run test:e2e`: 61 passed, 23 intentionally skipped, across all seven viewport projects. Each public route has screenshot artifacts. The full student path, modal focus, save Undo, light/dark axe, grid, touch target, and 200% zoom checks pass in their configured projects.
- `MCP_URL=http://localhost:3200/api/mcp npm run test:mcp`: all five tools pass, including invalid-input and unknown-ID checks.
- `npm audit --omit=dev`: zero reported production vulnerabilities. The development-only lint-chain advisory described above remains.
- `npm run seed:images` with missing credentials: correctly fails with a clear setup message before any upload.
- The production app is left running at http://localhost:3200. The repository branch is main and each of the 17 phases has its own commit.
- Live Gemini generation, Cloudinary uploads, and Vercel deployment were not verified without service configuration. Their credential-free fallbacks and mock paths were verified.
