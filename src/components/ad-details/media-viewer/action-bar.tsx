import { Heart, Share2, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useCallback } from 'react';

export function ActionBar() {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleShare = useCallback(() => {
    console.log('Share clicked');
  }, []);

  const handleDownload = useCallback(() => {
    console.log('Download clicked');
  }, []);

  return (
    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-2
      bg-white/10 backdrop-blur-md rounded-full border border-white/10 shadow-sm">
      <button
        onClick={() => setIsFavorite(!isFavorite)}
        className="p-1.5 rounded-full hover:bg-white/10 transition-colors group"
      >
        <Heart 
          className={cn(
            "w-3.5 h-3.5 transition-all duration-300",
            isFavorite 
              ? "fill-red-500 text-red-500 scale-110" 
              : "text-white/70 group-hover:text-white"
          )} 
        />
      </button>
      <div className="w-px h-3 bg-white/10" />
      <button
        onClick={handleShare}
        className="p-1.5 rounded-full hover:bg-white/10 transition-colors group"
      >
        <Share2 className="w-3.5 h-3.5 text-white/70 group-hover:text-white transition-colors" />
      </button>
      <div className="w-px h-3 bg-white/10" />
      <button
        onClick={handleDownload}
        className="p-1.5 rounded-full hover:bg-white/10 transition-colors group"
      >
        <Download className="w-3.5 h-3.5 text-white/70 group-hover:text-white transition-colors" />
      </button>
    </div>
  );
}