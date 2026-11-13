import { useEffect, useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
  fallbackNote?: string;
  loading?: 'eager' | 'lazy';
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
  fallbackNote,
  loading = 'lazy',
}: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-2 bg-[#F3E8FF] dark:bg-[#2B1C3D] p-6 text-center ${className}`}
      >
        <ImageOff
          className="h-7 w-7 text-[#6B21A8] dark:text-[#D8B4FE]"
          aria-hidden="true"
        />
        {fallbackTitle && (
          <p className="font-display text-sm font-semibold text-[#21152F] dark:text-[#F3E8FF]">
            {fallbackTitle}
          </p>
        )}
        {fallbackNote && (
          <p className="font-mono-code text-xs text-[#4A3B5C] dark:text-[#D8B4FE] break-all">
            {fallbackNote}
          </p>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
