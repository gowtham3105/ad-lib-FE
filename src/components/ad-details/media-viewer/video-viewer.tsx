import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface VideoViewerProps {
  mediaUrl: string;
  isLoaded: boolean;
  loading?: boolean;
  isMobile: boolean;
  onLoad: () => void;
}

export function VideoViewer({
  mediaUrl,
  isLoaded,
  loading,
  isMobile,
  onLoad
}: VideoViewerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isLoaded && !loading) {
      videoRef.current.play().catch(() => {
        console.log('Autoplay prevented by browser');
      });
    }
  }, [isLoaded, loading]);

  return (
      <video
        ref={videoRef}
        src={mediaUrl}
        className={cn(
          "w-auto rounded-[1.25rem]",
          "shadow-[0_8px_24px_-6px_rgba(0,0,0,0.15),0_4px_12px_-4px_rgba(25,28,33,0.08)]",
          "object-contain transition-opacity duration-300",
          (!isLoaded || loading) && "opacity-0",
          isMobile 
            ? "max-w-[95%] max-h-[calc(100vh-180px)]" 
            : "max-w-[50%] max-h-[75vh]"
        )}
        onLoadedData={onLoad}
        playsInline
        muted
        loop
        controls
        style={{ 
          touchAction: 'pan-y pinch-zoom'
        }}
      />
    
  );
}