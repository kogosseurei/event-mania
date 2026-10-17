# Campus Events

A mobile first campus discovery app for Example University. The implementation follows the attached 17-phase specification, with phase checks and commits as gates.

## Quick start

Use Node.js 22 or later, then run `npm ci` and `npm run dev`. Open http://localhost:3000. No service credentials are needed for local development. Copy `.env.example` to `.env.local` only when configuring integrations.

## Architecture

    Screens -> Hooks -> typed API fetchers -> Route handlers
                                             |
    MCP tools --------------------------> Event service
                                             |
                                     EventRepository interface
                                             |
                                      Mock repository

Client state belongs in persisted Zustand stores. Server state belongs in TanStack Query. Filter state belongs in URL search parameters. Shared schemas validate domain and transport boundaries.

## Integration documentation

Implementation references: [Next Cloudinary](https://next.cloudinary.dev/cldimage/basic-usage), [Google structured output](https://ai.google.dev/gemini-api/docs/structured-output), and [mcp-handler](https://github.com/vercel-labs/mcp-handler).

## Scripts

- `npm run dev`: development server
- `npm run check`: lint, typecheck, unit/component tests in sequence
- `npm run build`: production build
- `npm run test:e2e`: Playwright viewport and accessibility suite
- `npm run test:mcp`: integration test against MCP_URL
- `npm run seed:images`: create and upload placeholder assets to Cloudinary

The integration scripts are wired in the scaffold; their implementations are delivered in the corresponding phases.

## Deployment

The target is Vercel. Import the GitHub repository into Vercel and use the Next.js preset. Set production and preview environment variables in Project Settings > Environment Variables. Keep Gemini credentials server only. Cloudinary upload credentials are for the local seed script, not the browser. Pull requests receive preview deployments; the main branch deploys to production after checks pass.

## Implementation status

Phase 1 is in progress. This repository is not yet a complete application. See docs/DECISIONS.md for assumptions and tradeoffs.
