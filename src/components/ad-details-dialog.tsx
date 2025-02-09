import { Dialog, DialogContent } from "@/components/ui/dialog"
import { useIsMobile } from "@/hooks/use-mobile"
import { useState } from "react"
import { AdContent } from "@/components/ad-details/ad-content"
import { AdSidebar } from "@/components/ad-details/ad-sidebar"
import { MenuBar } from "@/components/ui/bottom-menu"
import { menuItems } from "@/components/ad-details/menu-items"

interface AdDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  adId: string
}

export function AdDetailsDialog({ 
  open, 
  onOpenChange,
  adId 
}: AdDetailsDialogProps) {
  const isMobile = useIsMobile()
  const [showDetails, setShowDetails] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="p-0 overflow-hidden max-w-[1400px] w-full h-[100dvh] md:h-[85vh] md:rounded-2xl"
      >
        <div className="flex h-full">
          {/* Main Content */}
          <div className="flex-1 flex flex-col bg-gray-50">
            <AdContent isMobile={isMobile} />
          </div>

          {/* Sidebar */}
          <AdSidebar 
            isMobile={isMobile} 
            showDetails={showDetails} 
          />

          {/* Mobile Menu Bar */}
          {isMobile && (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 py-2 px-4">
              <MenuBar 
                items={[
                  ...menuItems,
                  {
                    icon: showDetails ? "ChevronDown" : "ChevronUp",
                    label: showDetails ? "Hide Details" : "Show Details",
                    onClick: () => setShowDetails(!showDetails)
                  }
                ]} 
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}