import { MediaViewer } from './media-viewer/media-viewer';

interface AdContentProps {
  isMobile: boolean;
  externalId: string;
  mediaUrl: string;
  mediaType: string;
  loading?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
}

export function AdContent({ 
  isMobile, 
  externalId, 
  mediaUrl, 
  mediaType, 
  loading,
  onPrevious, 
  onNext 
}: AdContentProps) {
  return (
    <div className="relative flex-1 h-full">
      <MediaViewer 
        externalId={externalId} 
        mediaUrl={mediaUrl} 
        mediaType={mediaType}
        isMobile={isMobile}
        loading={loading}
        onPrevious={onPrevious}
        onNext={onNext}
      />
    </div>
  );
}