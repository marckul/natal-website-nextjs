'use client';

import Image, {type ImageProps} from 'next/image';
import {useEffect, useRef, useState} from 'react';

type ImageProgressiveClientProps = Pick<
  ImageProps,
  'src' | 'alt' | 'width' | 'height' | 'sizes' | 'className'
> & {blurDataUrl?: string};

// Fades the sharp image in over its blur once it has loaded. The blur is a
// separate underlying layer, not next/image's own `placeholder`: fading the
// image's opacity would fade its background blur with it, so the two are kept
// apart and the sharp image is faded in on top. Without a blur it just fades in.
export default function ImageProgressiveClient({
  alt,
  blurDataUrl,
  className,
  height,
  sizes,
  src,
  width,
}: ImageProgressiveClientProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // A cached image can finish loading before React attaches `onLoad`, which
  // would leave it stuck transparent — catch that case on mount.
  useEffect(() => {
    if (imageRef.current?.complete) setIsLoaded(true);
  }, []);

  // Reveal on error too, so a broken image shows its alt text instead of
  // staying transparent over the blur.
  const handleLoadEnd = () => setIsLoaded(true);

  const containerClassName = isLoaded
    ? 'progressive-image progressive-image--loaded'
    : 'progressive-image';
  const imageClassName = [className, 'progressive-image__img']
    .filter(Boolean)
    .join(' ');

  return (
    <span className={containerClassName}>
      {blurDataUrl && (
        <span
          className="progressive-image__blur"
          style={{backgroundImage: `url(${blurDataUrl})`}}
          aria-hidden="true"
        />
      )}
      <Image
        ref={imageRef}
        className={imageClassName}
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        onError={handleLoadEnd}
        onLoad={handleLoadEnd}
      />
      {/* Without JS `onLoad` never fires — keep the image visible. */}
      <noscript>
        <style>{`.progressive-image__img{opacity:1}`}</style>
      </noscript>
    </span>
  );
}
