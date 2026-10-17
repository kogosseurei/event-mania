# Decisions
- The attachment is the project specification. Local Next.js source targets Vercel as requested; Sites hosting would change that architecture.
- Optional credentials are not required for local development. Missing Cloudinary uses category artwork; missing Gemini uses deterministic explanations.
- No authentication service is specified. Preferences and mock registrations belong to this browser and are not authoritative university registrations.
- MCP handler 1.x will be used with the requested SDK 1.x and basePath API. Current handler 2.x removes that API and requires SDK 2.x.
- The smart model requested in the brief remains configurable. Availability is account-dependent and errors must fall back.
- The MCP 1.1 adapter pins SDK 1.26.0 as its exact peer dependency; both are pinned together instead of bypassing npm compatibility checks.
- Local in-memory cache and rate limits are bounded per instance. A distributed store is needed for cross-instance quotas.
- The browser connector reported no available browser. The explicitly requested Playwright suite remains the automated browser verification path.

- Superseding the initial adapter choice: npm audit found an advisory in the SDK pinned by mcp-handler 1.x. Phase 14 uses mcp-handler 2.3 and its SDK 2 server, with patched SDK 1.32 for the requested integration client. The URL is still /api/mcp; obsolete basePath options are omitted because routing now determines the endpoint.
