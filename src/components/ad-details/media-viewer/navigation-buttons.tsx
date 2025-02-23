import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationButtonsProps {
  onPrevious?: () => void;
  onNext?: () => void;
  loading?: boolean;
  isMobile: boolean;
}

export function NavigationButtons({
  onPrevious,
  onNext,
  loading,
  isMobile
}: NavigationButtonsProps) {
  return (
    <>
      <button
        onClick={onPrevious}
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10",
          "shadow-sm hover:bg-white/20 transition-all duration-300 group/nav hover:scale-105",
          (!onPrevious || loading) && "opacity-50 cursor-not-allowed hover:bg-white/10 hover:scale-100",
          isMobile && "hidden"
        )}
        disabled={!onPrevious || loading}
      >
        <ChevronLeft className="w-5 h-5 text-white/70 group-hover/nav:text-white" />
      </button>
      <button
        onClick={onNext}
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/10",
          "shadow-sm hover:bg-white/20 transition-all duration-300 group/nav hover:scale-105",
          (!onNext || loading) && "opacity-50 cursor-not-allowed hover:bg-white/10 hover:scale-100",
          isMobile && "hidden"
        )}
        disabled={!onNext || loading}
      >
        <ChevronRight className="w-5 h-5 text-white/70 group-hover/nav:text-white" />
      </button>
    </>
  );
}