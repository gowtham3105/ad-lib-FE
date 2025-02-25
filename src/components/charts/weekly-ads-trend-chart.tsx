"use client"

import { Area, AreaChart, CartesianGrid, XAxis, Tooltip } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

interface WeeklyAdsData {
  week: string
  month: string
  ads: number
}

interface WeeklyAdsTrendChartProps {
  data: WeeklyAdsData[]
}

const chartConfig = {
  photos: {
    label: "Photos",
    color: "hsl(217 91% 60%)",
  },
  videos: {
    label: "Videos",
    color: "hsl(215 28% 65%)",
  },
} satisfies ChartConfig

export function WeeklyAdsTrendChart({ data }: WeeklyAdsTrendChartProps) {
  const chartData = [
    { month: "January", photos: 40, videos: 20 },
    { month: "February", photos: 65, videos: 35 },
    { month: "March", photos: 55, videos: 25 },
    { month: "April", photos: 45, videos: 30 },
    { month: "May", photos: 50, videos: 28 },
    { month: "June", photos: 60, videos: 40 },
  ]

  return (
    <div className="w-full h-full">
      <ChartContainer config={chartConfig}>
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 0,
          }}
          height={180}
        >
          <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.2} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
            fontSize={11}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null
              
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="flex flex-col gap-1">
                    <div className="text-xs text-muted-foreground">
                      {payload[0].payload.month}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[hsl(217_91%_60%)]" />
                      <span className="text-sm">Photos: {payload[0].value}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[hsl(215_28%_65%)]" />
                      <span className="text-sm">Videos: {payload[1].value}</span>
                    </div>
                  </div>
                </div>
              )
            }}
          />
          <defs>
            <linearGradient id="fillPhotos" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(217 91% 60%)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="hsl(217 91% 60%)"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="fillVideos" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="hsl(215 28% 65%)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="hsl(215 28% 65%)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            dataKey="videos"
            type="monotone"
            fill="url(#fillVideos)"
            fillOpacity={0.4}
            stroke="hsl(215 28% 65%)"
            strokeWidth={1.5}
            stackId="a"
          />
          <Area
            dataKey="photos"
            type="monotone"
            fill="url(#fillPhotos)"
            fillOpacity={0.4}
            stroke="hsl(217 91% 60%)"
            strokeWidth={1.5}
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}