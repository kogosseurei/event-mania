import { getCldOgImageUrl } from 'next-cloudinary';
export const cloudinaryCloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
export const imageSizes =
  '(min-width: 1536px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw';
export const imageWidths = [320, 480, 640, 960];
export const blurPlaceholder =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSI5Ij48cmVjdCB3aWR0aD0iMTYiIGhlaWdodD0iOSIgZmlsbD0iIzMxMmU4MSIvPjwvc3ZnPg==';
export function eventOgImage(publicId: string): string {
  return cloudinaryCloudName ? getCldOgImageUrl({ src: publicId }) : '/opengraph-image';
}
