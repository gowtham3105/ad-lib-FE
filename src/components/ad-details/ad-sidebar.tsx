import { UnifiedDetailsCard } from './unified-details-card';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { BoardDropdown } from './board-dropdown';

import { AdData } from './ad-details-dialog';

interface AdSidebarProps {
  isMobile: boolean;
  showDetails: boolean;
  onShowDetailsChange: (show: boolean) => void;
  adData: AdData;
  loading?: boolean;
}

export function AdSidebar({ 
  isMobile, 
  showDetails, 
  onShowDetailsChange,
  adData, 
  loading 
}: AdSidebarProps) {
  const [startY, setStartY] = useState<number | null>(null);
  const [currentY, setCurrentY] = useState<number | null>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const handleBoardSelect = (boardId: string) => {
    console.log("Selected board:", boardId);
    // Here you would typically make an API call to save the ad to the selected board
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startY === null) return;
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (startY === null || currentY === null) return;
    
    const diff = currentY - startY;
    if (diff > 50) { // If dragged down more than 50px
      onShowDetailsChange(false);
    }
    
    setStartY(null);
    setCurrentY(null);
  };

  // Calculate transform based on drag
  const getTransform = () => {
    if (startY === null || currentY === null) return '';
    const diff = currentY - startY;
    if (diff < 0) return ''; // Don't allow dragging up
    return `translateY(${diff}px)`;
  };

  return (
    <div
      ref={sheetRef}
      className={cn(
        'w-[360px] bg-white border-l border-[#262626] z-30 relative flex flex-col overflow-hidden',
        'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200/50 hover:scrollbar-thumb-gray-300/50',
        isMobile && 'fixed inset-x-0 bottom-0 w-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]',
        isMobile && !showDetails && 'translate-y-full',
        isMobile && showDetails && 'translate-y-0 h-[80vh] rounded-t-[2rem] shadow-2xl'
      )}
      onTouchStart={isMobile ? handleTouchStart : undefined}
      onTouchMove={isMobile ? handleTouchMove : undefined}
      onTouchEnd={isMobile ? handleTouchEnd : undefined}
      style={{ transform: getTransform() }}
    >
      {loading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-3 border-gray-300/50 border-t-gray-900/90 animate-spin" />
        </div>
      )}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          <UnifiedDetailsCard adData={adData} loading={loading} />
        </div>
      </div>
      <div className="p-3 bg-white">
        <BoardDropdown onBoardSelect={handleBoardSelect} disabled={loading} />
      </div>
    </div>
  );
}