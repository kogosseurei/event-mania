# Campus event image pack

10 AI-generated photographic-style event covers, made with the built-in Imagegen tool.
These depict fictional university events; they are not documentary photographs.

Upload the PNG files from the events folder to Cloudinary. Set each full Public ID to its filename without .png (no events/ prefix).
Example: events/tech-01.png -> tech-01
Use cloudinary-upload-map.csv to match each cover to its event.

Check the actual Public ID in Cloudinary asset details; its visible folder and display name may differ.
No app event-data changes are required when these public IDs match.
This pack contains the ten event covers. The six venue photos are not included.

Do not run npm run seed:images after upload: it overwrites matching assets with generated placeholders.

Generation prompt set:
Use case: photorealistic-natural.
Asset: editorial photographic cover for a fictional university campus event website.
Wide 16:9 landscape composition, requested at approximately 1920x1080.
Diverse adult university students, realistic anatomy, candid expressions, natural documentary style.
Keep main subjects in the central crop-safe area, with relatively quiet top corners for app badges.
Avoid captions, readable text, logos, branding, watermarks, and collage layouts.
The per-event scene prompts are recorded in cloudinary-upload-map.csv.
Generated source images have been preserved without resizing or recompression.
