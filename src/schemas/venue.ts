import { z } from 'zod';
export const venueSchema = z.object({
  id: z.string(),
  name: z.string(),
  photoPublicId: z.string(),
  mapUrl: z.url(),
  description: z.string(),
});
