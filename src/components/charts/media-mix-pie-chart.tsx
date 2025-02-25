"use client"

import { TrendingUp } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart, Tooltip } from "recharts"
import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart"

interface MediaMixData {
  name: string
  total: number
}

interface MediaMixPieChartProps {
  data: MediaMixData[]
  className?: string
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

export function MediaMixPieChart({ data }: MediaMixPieChartProps) {
  const chartData = [{
    month: "current",
    photos: 65,
    videos: 35,
  }]

  const totalContent = data[0]?.total || 0

  return (
    <div className="w-full h-full">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square w-full max-w-[280px]"
      >
        <RadialBarChart
          data={chartData}
          endAngle={180}
          innerRadius={90}
          outerRadius={130}
          barSize={15}
        >
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null
              
              const data = payload[0].payload
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[hsl(217_91%_60%)]" />
                      <span className="text-sm">Photos: {Math.round(totalContent * 0.65)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-[hsl(215_28%_65%)]" />
                      <span className="text-sm">Videos: {Math.round(totalContent * 0.35)}</span>
                    </div>
                  </div>
                </div>
              )
            }}
          />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) - 16}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalContent.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 4}
                        className="fill-muted-foreground"
                      >
                        Total Content
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </PolarRadiusAxis>
          <RadialBar
            dataKey="photos"
            stackId="a"
            cornerRadius={5}
            fill="hsl(217 91% 60%)"
            className="stroke-transparent stroke-2"
          />
          <RadialBar
            dataKey="videos"
            stackId="a"
            cornerRadius={5}
            fill="hsl(215 28% 65%)"
            className="stroke-transparent stroke-2"
          />
        </RadialBarChart>
      </ChartContainer>
    </div>
  )
}