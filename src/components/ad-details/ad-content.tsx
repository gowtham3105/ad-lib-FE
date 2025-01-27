import { cn } from "@/lib/utils"
import { MenuBar } from "@/components/ui/bottom-menu"
import { menuItems } from "./menu-items"
import { BrandInfo } from "./content/brand-info"
import { MediaViewer } from "./content/media-viewer"

interface AdContentProps {
  isMobile: boolean
}

export function AdContent({ isMobile }: AdContentProps) {
  return (
    <div className="flex flex-col h-full">
      <BrandInfo />
      
      {/* Media Content */}
      <div className="flex-1 flex flex-col">
        <MediaViewer />
        
        {/* Menu Bar - Desktop Only */}
        {!isMobile && (
          <div className="flex justify-center py-4 px-4 border-t border-gray-100">
            <MenuBar items={menuItems} />
          </div>
        )}
      </div>
    </div>
  )
}