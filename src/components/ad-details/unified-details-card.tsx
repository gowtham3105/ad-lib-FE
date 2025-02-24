import { DialogClose } from "@/components/ui/dialog";
import { X, ChevronDown } from "lucide-react";
import { Globe, Clock, Calendar, LayoutGrid } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AdDetails } from "@/lib/types";

interface UnifiedDetailsCardProps {
  adData: AdDetails;
  loading?: boolean;
}

export function UnifiedDetailsCard({ adData, loading }: UnifiedDetailsCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showExpandButton, setShowExpandButton] = useState(false);
  const [isHookExpanded, setIsHookExpanded] = useState(false);
  const [showHookExpandButton, setShowHookExpandButton] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const hookRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (textRef.current) {
      setShowExpandButton(textRef.current.scrollHeight > 96);
    }
  }, [adData.ad_text]);

  useEffect(() => {
    if (hookRef.current) {
      setShowHookExpandButton(hookRef.current.scrollHeight > 80); // Approximately 4 lines
    }
  }, [adData.transcript]);

  const handleBoardSelect = (boardId: string) => {
    console.log("Selected board:", boardId);
    // Here you would typically make an API call to save the ad to the selected board
  };

  return (
    <div className="space-y-5 relative pb-4">
      {/* Company Header */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg overflow-hidden">
          <img
            src={adData.brand_logo}
            alt={`${adData.brand_name} Logo`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 flex items-center justify-between">
          <h2 className="text-base font-medium text-gray-900">{adData.brand_name}</h2>
          <DialogClose className="inline-flex h-8 w-8 items-center justify-center rounded-lg 
            bg-gray-100/80 backdrop-blur-md hover:bg-gray-200/90 transition-colors">
            <X className="h-4 w-4 text-gray-600" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </div>
      </div>

      {/* Message */}
      <div className="p-4 bg-white rounded-xl border-2 border-[#f3f3f3]">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Message & Actions</h3>
        <div className="text-[13px] text-gray-900 space-y-4">
          <div className="relative">
            <p
              ref={textRef}
              className={cn(
                "text-[13px] text-gray-900 transition-all duration-300",
                !isExpanded && "line-clamp-4",
                isExpanded && "line-clamp-none"
              )}
            >
              {adData.ad_text}
            </p>
            {showExpandButton && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full flex items-center justify-center gap-1.5 mt-2 py-1 text-[13px] font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {isExpanded ? "Show Less" : "Show More"}
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform duration-300",
                  isExpanded && "rotate-180"
                )} />
              </button>
            )}
          </div>


          <div className="flex flex-col gap-5 pt-3 mt-4 border-t border-gray-100">

            {
              adData?.cta_link && (
                <div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Landing Page</p>
                    <a
                      href={adData.cta_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex px-3 py-1.5 bg-white border-2 border-[#f3f3f3] text-gray-900 rounded-lg text-[13px] hover:bg-gray-50 transition-colors"
                    >
                      {new URL(adData.cta_link).hostname}
                    </a>
                  </div>
                </div>
              )
            }


            <div>
              {
                adData?.footer && adData?.footer?.button_text && (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Call to Action</p>
                    <div className="space-y-2">
                      <h4 className="text-[13px] font-medium text-gray-900">{adData.footer.title}</h4>
                      <span className="inline-flex px-3 py-1.5 bg-white border-2 border-[#f3f3f3] text-gray-900 rounded-lg text-[13px]">
                        {adData.footer.button_text}
                      </span>
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Status */}
      <div className="p-4 bg-white rounded-xl border-2 border-[#f3f3f3]">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">Campaign Timeline</h3>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
            <Calendar className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex-1">
            <p className="text-[13px] font-medium text-gray-900 mb-1">
              {adData.end_date
                ? `${adData.start_date} - ${adData.end_date}`
                : `Started ${adData.start_date}`
              }
            </p>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              <p className="text-[13px] font-medium text-emerald-700">
                {adData.is_active ? `Running for ${adData.time}` : `Ran for ${adData.time}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {
        adData.platforms && adData.platforms.length > 0 && (
          // Platforms
          <div className="p-4 bg-white rounded-xl border-2 border-[#f3f3f3]">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Platforms</h3>
            <div className="flex items-center gap-3">
              {[
                { name: "audience_network", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/600px-Facebook_Logo_%282019%29.png" }
              ].filter(platform => adData.platforms.includes(platform.name)).map((platform) => (
                <img
                  key={platform.name}
                  src={platform.icon}
                  alt={platform.name}
                  className="w-5 h-5 opacity-80 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          </div>


        )
      }


      {/* Hook */}
      {adData.transcript && (
        <div className="p-4 bg-white rounded-xl border-2 border-[#f3f3f3]">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Hook</h3>
          <div className="relative">
            <p
              ref={hookRef}
              className={cn(
                "text-[13px] text-gray-900 leading-relaxed transition-all duration-300",
                !isHookExpanded && "line-clamp-4",
                isHookExpanded && "line-clamp-none"
              )}
            >
              {adData.transcript}
            </p>
            {showHookExpandButton && (
              <button
                onClick={() => setIsHookExpanded(!isHookExpanded)}
                className="w-full flex items-center justify-center gap-1.5 mt-2 py-1 text-[13px] font-medium text-gray-600 hover:text-gray-900 transition-colors"
              >
                {isHookExpanded ? "Show Less" : "Show More"}
                <ChevronDown className={cn(
                  "w-4 h-4 transition-transform duration-300",
                  isHookExpanded && "rotate-180"
                )} />
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
}