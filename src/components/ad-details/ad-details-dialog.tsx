import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { AdContent } from "./ad-content"
import { AdSidebar } from "./ad-sidebar"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { X } from "lucide-react"

interface AdDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  adId: string
}

export function AdDetailsDialog({ open, onOpenChange, adId }: AdDetailsDialogProps) {
  const isMobile = useIsMobile()
  const [showDetails, setShowDetails] = useState(!isMobile)
  const [mounted, setMounted] = useState(false)

  // Prevent initial animation
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setMounted(true)
      }, 0)
      return () => clearTimeout(timer)
    }
    setMounted(false)
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className={cn(
          "p-0 overflow-hidden transition-[transform,opacity]",
          !mounted && "opacity-0 scale-95",
          isMobile 
            ? "w-full h-[100dvh] max-w-full rounded-none border-0 bg-white" 
            : "w-[85vw] h-[85vh] max-w-[1200px] rounded-2xl bg-white border border-gray-200/50"
        )}
      >
        <DialogTitle>
          <VisuallyHidden>Advertisement Details</VisuallyHidden>
        </DialogTitle>

        {/* Close Button */}
        <button 
          onClick={() => onOpenChange(false)}
          className="absolute top-6 right-6 z-50 p-2.5 rounded-xl bg-white/90 backdrop-blur-[2px] border border-gray-200/50 shadow-sm hover:bg-white transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Content Wrapper */}
        <div className={cn(
          "flex h-full bg-gray-50",
          isMobile && "flex-col"
        )}>
          {/* Main Content Area */}
          <div className={cn(
            "relative bg-white",
            isMobile ? "h-[50dvh]" : "flex-1"
          )}>
            <AdContent isMobile={isMobile} />
          </div>

          {/* Mobile Toggle Button */}
          {isMobile && (
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="p-2.5 w-full bg-white border-t border-gray-100 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
            >
              {showDetails ? "Hide Details" : "Show Details"}
            </button>
          )}

          {/* Sidebar */}
          <AdSidebar isMobile={isMobile} showDetails={showDetails} />
        </div>
      </DialogContent>
    </Dialog>
  )
}