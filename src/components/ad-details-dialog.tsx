import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { AdHeader } from "./ad-details/ad-header"
import { AdContent } from "./ad-details/ad-content"
import { AdSidebar } from "./ad-details/ad-sidebar"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

interface AdDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  adId: string
}

export function AdDetailsDialog({ open, onOpenChange, adId }: AdDetailsDialogProps) {
  const isMobile = useIsMobile()
  const [showDetails, setShowDetails] = useState(!isMobile)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(
        "max-w-[95vw] w-[95vw] p-0",
        isMobile ? "h-[100vh] max-h-[100vh]" : "h-[95vh] max-h-[95vh]"
      )}>
        <DialogTitle>
          <VisuallyHidden>Advertisement Details</VisuallyHidden>
        </DialogTitle>
        
        <div className={cn(
          "flex relative bg-white",
          isMobile ? "flex-col h-full" : "h-full"
        )}>
          {/* Main Content Area */}
          <div className={cn(
            "relative",
            isMobile ? "h-[50vh]" : "flex-1"
          )}>
            <AdHeader onClose={() => onOpenChange(false)} />
            <AdContent isMobile={isMobile} />
          </div>

          {/* Mobile Toggle Button */}
          {isMobile && (
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="p-2 w-full bg-white border-t border-gray-100 text-sm font-medium text-gray-600"
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