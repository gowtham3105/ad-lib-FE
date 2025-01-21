import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronDown, TrendingUp, HelpCircle } from "lucide-react"
import { MediaMixPieChart } from "@/components/charts/media-mix-pie-chart"
import { WeeklyAdsTrendChart } from "@/components/charts/weekly-ads-trend-chart"
import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Sample data for media mix distribution
const mediaMixData = [
  {
    name: "Image",
    total: 65,
  },
  {
    name: "Video",
    total: 35,
  },
  {
    name: "Carousel",
    total: 28,
  },
  {
    name: "Story",
    total: 42,
  },
  {
    name: "Reel",
    total: 15,
  },
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
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="mb-8">
      <Card className="overflow-hidden transition-shadow hover:shadow-md">
        <CardHeader className="border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2"
              >
                <CardTitle>Analytics Overview</CardTitle>
                <ChevronDown className={cn(
                  "h-5 w-5 text-gray-500 transition-transform duration-200",
                  isExpanded && "rotate-180"
                )} />
              </button>
              <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                <TrendingUp className="h-4 w-4" />
                Ad creation up by 8.2% this month
              </div>
            </div>
          </div>
        </CardHeader>

        <div className={cn(
          "transition-all duration-300 ease-in-out origin-top",
          isExpanded ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
        )}>
          <CardContent className="p-6">
            <div className="grid gap-8 auto-rows-min grid-cols-1 xl:grid-cols-2">
              {/* Media Mix Distribution */}
              <div className="flex flex-col items-center xl:items-start">
                <div className="w-full mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold">Media Mix Distribution</h3>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Breakdown of ad formats to identify what works best</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <CardDescription>Breakdown by ad format</CardDescription>
                </div>
                <div className="flex justify-center w-full">
                  <MediaMixPieChart data={mediaMixData} />
                </div>
              </div>

              {/* Weekly Ads Trend */}
              <div className="flex flex-col items-center xl:items-start">
                <div className="w-full mb-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-semibold">Weekly Ads Trend</h3>
                    <Tooltip>
                      <TooltipTrigger>
                        <HelpCircle className="h-4 w-4 text-gray-400" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Track ad frequency and identify campaign patterns</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <CardDescription>Number of ads started each week</CardDescription>
                </div>
                <div className="flex justify-center w-full">
                  <WeeklyAdsTrendChart data={weeklyAdsData} />
                </div>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}