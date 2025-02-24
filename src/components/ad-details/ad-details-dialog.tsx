import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { AdContent } from "@/components/ad-details/ad-content";
import { AdSidebar } from "@/components/ad-details/ad-sidebar";
import { MenuBar } from "@/components/ui/bottom-menu";
import { menuItems } from "@/components/ad-details/menu-items";

interface AdDetails {
  external_id: string;
  brand_name: string;
  brand_logo: string;
  time: string;
  media_type: string;
  media_src: string;
  start_date: string;
  end_date: string | null;
  platforms: string[];
  ad_text: string;
  transcript?: string;
  footer: {
    view_link: string;
    title: string;
    sub_title: string;
    button_text: string;
  };
  cta_link: string;
  is_active: boolean;
}

interface AdDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  adData: AdDetails;
  loading?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
}

export function AdDetailsDialog({ 
  open, 
  onOpenChange,
  adData,
  loading,
  onPrevious,
  onNext
}: AdDetailsDialogProps) {
  const isMobile = useIsMobile();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="p-0 overflow-hidden max-w-[1200px] w-full h-[100dvh] md:h-[80vh] md:rounded-[1.75rem] bg-white"
      >
        <DialogTitle className="sr-only">Advertisement Details</DialogTitle>
        <div className="flex h-full relative">
          {/* Main Content */}
          <div className="flex-1 flex flex-col bg-[#262626]">
            <AdContent 
              isMobile={isMobile} 
              externalId={adData.external_id}
              mediaUrl={adData.media_src} 
              mediaType={adData.media_type} 
              loading={loading}
              onPrevious={onPrevious}
              onNext={onNext}
            />
          </div>

          {/* Sidebar */}
          <AdSidebar
            isMobile={isMobile} 
            showDetails={showDetails} 
            onShowDetailsChange={setShowDetails}
            adData={adData}
            loading={loading}
          />

          {/* Mobile Menu Bar */}
          {isMobile && (
            <div className="fixed bottom-0 left-0 right-0 bg-[#262626] border-t border-white/10 py-2 px-4 z-20">
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
  );
}