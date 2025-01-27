import { cn } from "@/lib/utils"
import { AdContentCard } from "./sidebar/ad-content-card"
import { CampaignDetailsCard } from "./sidebar/campaign-details-card"
import { SaveAdCard } from "./sidebar/save-ad-card"

interface AdSidebarProps {
  isMobile: boolean
  showDetails: boolean
}

export function AdSidebar({ isMobile, showDetails }: AdSidebarProps) {
  return (
    <aside 
      className={cn(
        "border-l border-gray-100 bg-white overflow-hidden",
        isMobile ? (
          showDetails 
            ? "h-[calc(50dvh-40px)]" 
            : "h-0"
        ) : "w-[400px]"
      )}
      role="complementary" 
      aria-label="Ad details"
    >
      <div className="h-full overflow-y-auto">
        <div className="p-4 md:p-6 space-y-4">
          <AdContentCard />
          <CampaignDetailsCard />
          <SaveAdCard />
        </div>
      </div>
    </aside>
  )
}