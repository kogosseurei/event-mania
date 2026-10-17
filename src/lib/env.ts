import { z } from 'zod';
export const publicEnvironmentSchema = z.object({
  NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().optional(),
  NEXT_PUBLIC_APP_URL: z.url().default('http://localhost:3000'),
});
export const serverEnvironmentSchema = z.object({
  GEMINI_API_KEY: z.string().optional(),
  GEMINI_MODEL_FAST: z.string().default('gemini-2.5-flash-lite'),
  GEMINI_MODEL_SMART: z.string().default('gemini-3.8-flash'),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  MCP_URL: z.url().default('http://localhost:3000/api/mcp'),
});
export function readServerEnvironment(): z.infer<typeof serverEnvironmentSchema> {
  return serverEnvironmentSchema.parse(process.env);
}
