# Real photos and Vercel deployment

Configured public cloud name: `vdqzgkv9`. Local upload credentials are not required for the Media Library workflow.

## 1. Cloudinary

Create or select a Cloudinary product environment and copy its cloud name. Add it to NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME in the ignored .env.local file. Public image delivery does not require API_KEY or API_SECRET in this application.

In Cloudinary Media Library, upload your event and venue photos as publicly deliverable image assets. Landscape photos work well with the automatic cover crop. After upload, copy or edit each asset's full Public ID to match this table exactly. Do not include the cloud name, delivery URL, version, or image extension. Folder placement alone does not guarantee the Public ID, particularly with dynamic asset folders; verify the Public ID on each asset's details.

| Photo                              | Full Public ID                 |
| ---------------------------------- | ------------------------------ |
| Campus Hackathon Kickoff           | `tech-01`                      |
| Intro to Machine Learning Workshop | `tech-02`                      |
| Inter-Faculty Football Final       | `sports-01`                    |
| Open Mic Night                     | `music-01`                     |
| Career Fair                        | `careers-01`                   |
| CV Clinic with Alumni              | `careers-02`                   |
| Chess and Debate Mixer             | `clubs-01`                     |
| Photography Walk                   | `arts-01`                      |
| Jazz Evening                       | `music-02`                     |
| Campus 5K Fun Run                  | `sports-02`                    |
| Main Auditorium                    | `venues/main-auditorium`       |
| Engineering Lab Block              | `venues/engineering-lab-block` |
| Sports Complex                     | `venues/sports-complex`        |
| Student Union Hall                 | `venues/student-union-hall`    |
| Library Atrium                     | `venues/library-atrium`        |
| Amphitheatre                       | `venues/amphitheatre`          |

If you prefer to retain Cloudinary's existing IDs, replace coverPublicId values in src/data/events.stub.json and photoPublicId values in src/config/university.config.ts with the actual IDs. Keep image URLs out of the event data.

Do not run npm run seed:images after uploading your real photos: that script creates placeholder images and overwrites assets with the same public IDs.

Restart npm run dev after changing .env.local. Check all event covers in /browse and venue photos in event details. The app switches from fallback artwork to Cloudinary when the cloud name is configured; missing public IDs will need correcting in Cloudinary or configuration.

## 2. Before GitHub

Run npm run check and npm run build. Commit the project source and .env.example, but keep .env.local ignored. Create a GitHub repository, add its remote, and push main. If a remote already exists, inspect it before replacing it.

## 3. Vercel

Import the GitHub repository into Vercel. Choose the Next.js preset, repository root directory, and default output settings. Use npm ci for install and npm run build for build. Set main as the production branch.

Add these variables under Project Settings > Environment Variables:

| Variable                          | Value                                             | Environment                         |
| --------------------------------- | ------------------------------------------------- | ----------------------------------- |
| NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME | Your cloud name                                   | Production and Preview              |
| NEXT_PUBLIC_APP_URL               | Your final HTTPS domain, without a trailing slash | Production                          |
| GEMINI_API_KEY                    | Optional Google AI Studio key                     | Production and Preview, server only |

Do not copy the local localhost APP_URL into Vercel Production. If the production domain is not known initially, deploy once to obtain it, set NEXT_PUBLIC_APP_URL, and redeploy. Cloudinary API upload credentials are unnecessary for the public-image delivery path and should remain out of the deployment. Gemini can be configured later; the app already has a fallback.

NEXT_PUBLIC values are embedded at build time, so redeploy after changing them. Subsequent pushes to main deploy production; other branches and pull requests receive previews through Vercel's Git integration.

## 4. Verify the live app

Check /onboarding, /browse, all real photos, event details, Save, RSVP, My Events, and /mcp. Test sharing and confirm MCP event URLs point to your real domain. For protected previews, configure VERCEL_AUTOMATION_BYPASS_SECRET in GitHub Actions if you want automated preview checks.

## Official references

- [Cloudinary upload public IDs](https://cloudinary.com/documentation/upload_parameters#public_id)
- [Cloudinary Node configuration and credential handling](https://cloudinary.com/documentation/node_integration)
- [Next.js environment variables](https://nextjs.org/docs/app/guides/environment-variables)
- [Vercel environment variables](https://vercel.com/docs/environment-variables)
- [Vercel GitHub integration](https://vercel.com/docs/git/vercel-for-github)
