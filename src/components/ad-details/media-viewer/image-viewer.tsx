import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface ImageViewerProps {
  mediaUrl: string;
  isLoaded: boolean;
  loading?: boolean;
  isMobile: boolean;
  onLoad: () => void;
}

export function ImageViewer({
  mediaUrl,
  isLoaded,
  loading,
  isMobile,
  onLoad
}: ImageViewerProps) {
  const imageRef = useRef<HTMLImageElement>(null);

  return (
    <img 
      src={mediaUrl}
      alt="Advertisement media"
      ref={imageRef}
      draggable="false"
      className={cn(
        "w-auto rounded-[1.25rem]",
        "shadow-[0_8px_24px_-6px_rgba(0,0,0,0.15),0_4px_12px_-4px_rgba(25,28,33,0.08)]",
        "object-contain transition-transform duration-300 ease-out will-change-transform",
        "hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.3),0_12px_24px_-8px_rgba(25,28,33,0.2)]",
        (!isLoaded || loading) && "opacity-0 scale-95",
        isMobile 
          ? "max-w-[95%] max-h-[calc(100vh-180px)]" 
          : "max-w-[50%] max-h-[75vh]"
      )}
      onLoad={onLoad}
      style={{ 
        transformStyle: 'preserve-3d',
        objectFit: 'contain',
        touchAction: 'pan-y pinch-zoom'
      }}
    />
  );
}