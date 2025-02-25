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
    name: "Total",
    total: 100, // This is the total number that will be displayed in the center
  }
]

// Sample data for weekly ads trend
const weeklyAdsData = [
  { month: "January", photos: 40, videos: 20 },
  { month: "February", photos: 65, videos: 35 },
  { month: "March", photos: 55, videos: 25 },
  { month: "April", photos: 45, videos: 30 },
  { month: "May", photos: 50, videos: 28 },
  { month: "June", photos: 60, videos: 40 },
]

export function AnalyticsSection() {
  return (
    <div className="mb-6">
      <Card className="border border-gray-100/50">
        <CardContent className="p-6">
          <div className="grid gap-6 auto-rows-min grid-cols-1 xl:grid-cols-2 xl:divide-x xl:divide-gray-200">
            {/* Media Mix Distribution */}
            <div className="flex flex-col xl:items-start xl:pr-6">
              <div className="w-full mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold">Media Mix Distribution</h3>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Breakdown of ad formats between images and videos</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <CardDescription className="text-xs">Distribution of image vs video ads</CardDescription>
              </div>
              <div className="flex justify-center items-center w-full h-[220px] -mt-2 pb-4">
                <MediaMixPieChart data={mediaMixData} />
              </div>
            </div>

            {/* Weekly Ads Trend */}
            <div className="flex flex-col xl:items-start xl:pl-6">
              <div className="w-full mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-semibold">Weekly Ads Trend</h3>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-3.5 w-3.5 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Track ad frequency and identify campaign patterns</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <CardDescription className="text-xs">Number of ads started each week</CardDescription>
              </div>
              <div className="flex justify-center items-center w-full h-[220px]">
                <WeeklyAdsTrendChart data={weeklyAdsData} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}