import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { DialogClose } from '@/components/ui/dialog';
import { useSwipeable } from 'react-swipeable';
import { X } from 'lucide-react';
import { ImageViewer } from './image-viewer';
import { VideoViewer } from './video-viewer';
import { ActionBar } from './action-bar';
import { NavigationButtons } from './navigation-buttons';

interface MediaViewerProps {
  externalId: string;
  mediaUrl: string;
  mediaType: string;
  isMobile: boolean;
  loading?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
}

export function MediaViewer({ 
  externalId, 
  mediaUrl, 
  mediaType,
  isMobile,
  loading,
  onPrevious,
  onNext
}: MediaViewerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Configure swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (onNext && !loading) onNext();
    },
    onSwipedRight: () => {
      if (onPrevious && !loading) onPrevious();
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: false,
    trackTouch: true,
    delta: 10,
    swipeDuration: 250,
    minSwipeDistance: 40
  });

  return (
    <div 
      className={cn(
        "h-full relative flex flex-col items-center justify-center gap-4 bg-[#262626]",
        isMobile ? "p-4 pb-20" : "p-8"
      )}
    > 
      {/* Mobile Close Button */}
      {isMobile && (
        <DialogClose 
          className="absolute right-4 top-4 z-50 inline-flex h-10 w-10 items-center justify-center rounded-xl 
            bg-white/10 backdrop-blur-md border border-white/10 
            transition-all duration-300 hover:scale-105 hover:bg-white/20"
        >
          <X className="h-5 w-5 text-white" />
          <span className="sr-only">Close</span>
        </DialogClose>
      )}

      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg border border-gray-200/30 shadow-sm">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <p className="text-xs font-medium text-gray-600">ID: {externalId}</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-medium text-emerald-600">Active</span>
          </div>
        </div>
      </div>

      <div className={cn(
        "flex items-center justify-center h-full w-full relative rounded-2xl",
        (!isLoaded || loading) && "bg-[#262626]"
      )}
      ref={containerRef}
      {...handlers}
    >
        <NavigationButtons
          onPrevious={onPrevious}
          onNext={onNext}
          loading={loading}
          isMobile={isMobile}
        />

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#262626]/90 backdrop-blur-sm rounded-2xl">
            <div className="w-12 h-12 rounded-full border-4 border-white/20 border-t-white/90 animate-spin" />
          </div>
        )}

        {mediaType === 'video' ? (
          <VideoViewer
            mediaUrl={mediaUrl}
            isLoaded={isLoaded}
            loading={loading}
            isMobile={isMobile}
            onLoad={() => setIsLoaded(true)}
          />
        ) : (
          <ImageViewer
            mediaUrl={mediaUrl}
            isLoaded={isLoaded}
            loading={loading}
            isMobile={isMobile}
            onLoad={() => setIsLoaded(true)}
          />
        )}

        <ActionBar />
      </div>
    </div>
  );
}