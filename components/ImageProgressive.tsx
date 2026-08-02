import Image, {type ImageProps} from 'next/image';
import {cache} from 'react';
import sharp from 'sharp';

const BLUR_SOURCE_QUALITY = 80;
const BLUR_SOURCE_WIDTH = 200;
const BLUR_WIDTH = 16;
const BLUR_QUALITY = 40;

/**
 * Builds an inlined blur placeholder from `url`. Fetches a small Contentful
 * resize so the original image is not downloaded.
 */
const getBlurDataUrl = cache(
  async (url: string): Promise<string | undefined> => {
    try {
      const res = await fetch(
        `${url}?w=${BLUR_SOURCE_WIDTH}&q=${BLUR_SOURCE_QUALITY}`
      );
      // just in case
      if (!res.ok) return undefined;

      const sourceBuffer = Buffer.from(await res.arrayBuffer());
      const placeholderBuffer = await sharp(sourceBuffer)
        .resize(BLUR_WIDTH)
        .webp({quality: BLUR_QUALITY})
        .toBuffer();

      const base64Image = placeholderBuffer.toString('base64');
      return `data:image/webp;base64,${base64Image}`;
    } catch {
      // Image still renders without a placeholder.
      return undefined;
    }
  }
);

interface ImageProgressiveProps extends Omit<
  ImageProps,
  'placeholder' | 'blurDataURL'
> {
  src: string;
}

/** Renders next/image with a Sharp-encoded blur placeholder. Server-only. */
export default async function ImageProgressive({
  alt,
  className,
  height,
  sizes,
  src,
  width,
}: ImageProgressiveProps) {
  const blurDataUrl = await getBlurDataUrl(src);

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      placeholder={blurDataUrl ? 'blur' : undefined}
      blurDataURL={blurDataUrl}
    />
  );
}
