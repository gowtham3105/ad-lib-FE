import { Label, PolarRadiusAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip, 
  ChartTooltipContent
} from "@/components/ui/chart"
import { TrendingUp } from "lucide-react"

interface MediaMixData {
  name: string
  total: number
}

interface MediaMixPieChartProps {
  data: MediaMixData[]
  className?: string
}

export function MediaMixPieChart({ data }: MediaMixPieChartProps) {
  // Transform the data into the format needed for the radial chart
  const chartData = [{
    month: "current",
    image: data[0]?.total || 0,
    video: data[1]?.total || 0,
  }]

  const totalContent = chartData[0].image + chartData[0].video

  const chartConfig = {
    image: {
      label: "Image",
      color: "hsl(var(--chart-1))",
    },
    video: {
      label: "Video",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig

  return (
    <div className="flex flex-col items-center">
        <ChartContainer
          config={chartConfig}
          className="mx-auto h-[200px] w-[200px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              data={chartData}
              endAngle={180}
              innerRadius={70}
              outerRadius={110}
            >
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
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
                            className="fill-foreground text-2xl font-bold"
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
                dataKey="image"
                stackId="a"
                cornerRadius={5}
                fill="var(--color-image)"
                className="stroke-transparent stroke-2"
              />
              <RadialBar
                dataKey="video"
                fill="var(--color-video)"
                stackId="a"
                cornerRadius={5}
                className="stroke-transparent stroke-2"
              />
            </RadialBarChart>
          </ResponsiveContainer>
        </ChartContainer>
    </div>
  )
}