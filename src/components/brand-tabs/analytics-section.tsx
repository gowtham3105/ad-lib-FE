import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { HelpCircle } from "lucide-react"
import { MediaMixPieChart } from "@/components/charts/media-mix-pie-chart"
import { WeeklyAdsTrendChart } from "@/components/charts/weekly-ads-trend-chart"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Simplified media mix data for just image and video
const mediaMixData = [
  {
    name: "Image",
    total: 65,
  },
  {
    name: "Video",
    total: 35,
  }
]

// Sample data for weekly ads trend (24 weeks = 6 months)
const weeklyAdsData = [
  { week: "W1", month: "Jan", ads: 12 },
  { week: "W2", month: "Jan", ads: 15 },
  { week: "W3", month: "Jan", ads: 8 },
  { week: "W4", month: "Jan", ads: 10 },
  { week: "W1", month: "Feb", ads: 14 },
  { week: "W2", month: "Feb", ads: 18, highlight: "Campaign Launch" },
  { week: "W3", month: "Feb", ads: 12 },
  { week: "W4", month: "Feb", ads: 9 },
  { week: "W1", month: "Mar", ads: 16 },
  { week: "W2", month: "Mar", ads: 20, highlight: "Product Release" },
  { week: "W3", month: "Mar", ads: 15 },
  { week: "W4", month: "Mar", ads: 13 },
  { week: "W1", month: "Apr", ads: 11 },
  { week: "W2", month: "Apr", ads: 14 },
  { week: "W3", month: "Apr", ads: 17 },
  { week: "W4", month: "Apr", ads: 19 },
  { week: "W1", month: "May", ads: 22, highlight: "Summer Campaign" },
  { week: "W2", month: "May", ads: 18 },
  { week: "W3", month: "May", ads: 15 },
  { week: "W4", month: "May", ads: 12 },
  { week: "W1", month: "Jun", ads: 16 },
  { week: "W2", month: "Jun", ads: 19 },
  { week: "W3", month: "Jun", ads: 21 },
  { week: "W4", month: "Jun", ads: 17 },
]

export function AnalyticsSection() {
  return (
    <div className="mb-6"> {/* Reduced margin */}
      <Card className="border border-gray-100/50">
        <CardContent className="p-4 pb-0"> {/* Removed bottom padding */}
          <div className="grid gap-4 auto-rows-min grid-cols-1 xl:grid-cols-2 xl:divide-x xl:divide-gray-200"> {/* Reduced gap */}
            {/* Media Mix Distribution */}
            <div className="flex flex-col items-center xl:items-start xl:pr-4"> {/* Reduced padding */}
              <div className="w-full mb-3"> {/* Reduced margin */}
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold">Media Mix Distribution</h3> {/* Reduced text size */}
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-3.5 w-3.5 text-gray-400" /> {/* Reduced icon size */}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Breakdown of ad formats between images and videos</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <CardDescription className="text-xs">Distribution of image vs video ads</CardDescription> {/* Reduced text size */}
              </div>
              <div className="flex justify-center w-full pb-0">
                <MediaMixPieChart data={mediaMixData} />
              </div>
            </div>

            {/* Weekly Ads Trend */}
            <div className="flex flex-col items-center xl:items-start xl:pl-4"> {/* Reduced padding */}
              <div className="w-full mb-3"> {/* Reduced margin */}
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold">Weekly Ads Trend</h3> {/* Reduced text size */}
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-3.5 w-3.5 text-gray-400" /> {/* Reduced icon size */}
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Track ad frequency and identify campaign patterns</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <CardDescription className="text-xs">Number of ads started each week</CardDescription> {/* Reduced text size */}
              </div>
              <div className="flex justify-center w-full pb-0">
                <WeeklyAdsTrendChart data={weeklyAdsData} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}