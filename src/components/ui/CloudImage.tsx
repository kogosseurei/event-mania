'use client';
import type { ReactElement } from 'react';
import { CldImage } from 'next-cloudinary';
import { cloudinaryCloudName, imageSizes, blurPlaceholder } from '@/lib';
import { CategoryArtwork } from './CategoryArtwork';
export interface CloudImageProps {
  publicId: string;
  alt: string;
  aspect?: 'cover' | 'wide' | 'square';
  sizes?: string;
  priority?: boolean;
}
export function CloudImage({
  publicId,
  alt,
  aspect = 'cover',
  sizes = imageSizes,
  priority = false,
}: CloudImageProps): ReactElement {
  const category = publicId.split('/')[1]?.split('-')[0] ?? 'tech';
  return (
    <div className={`cloud-image aspect-${aspect} artwork-${category}`}>
      {cloudinaryCloudName ? (
        <CldImage
          src={publicId}
          alt={alt}
          fill
          sizes={sizes}
          crop="fill"
          gravity="auto"
          quality="auto"
          format="auto"
          priority={priority}
          placeholder="blur"
          blurDataURL={blurPlaceholder}
        />
      ) : (
        <CategoryArtwork category={category} alt={alt} />
      )}
    </div>
  );
}
