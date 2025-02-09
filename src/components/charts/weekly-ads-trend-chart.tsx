import { CartesianGrid, LineChart, Line, XAxis, ResponsiveContainer, Tooltip } from "recharts"
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
  ads: {
    label: "Ads",
    color: "hsl(var(--chart-1))",
    valueFormatter: (value: number) => `${value} ads`,
  },
} satisfies ChartConfig

export function WeeklyAdsTrendChart({ data }: WeeklyAdsTrendChartProps) {
  return (
    <div className="w-full max-w-[480px] h-[200px]"> {/* Increased height slightly */}
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 10,
              left: 10,
              bottom: 15, // Increased bottom margin
            }}
          >
            <XAxis 
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tickMargin={4}
              tick={{ fontSize: 11 }}
              height={20} // Added explicit height
              tickFormatter={(value, index) => {
                const currentItem = data[index]
                const prevItem = index > 0 ? data[index - 1] : null
                return prevItem?.month !== currentItem.month ? currentItem.month : ""
              }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) {
                  return null
                }

                const data = payload[0].payload as WeeklyAdsData
                return (
                  <div className="rounded-lg border bg-background p-1.5 shadow-sm text-xs">
                    <div className="flex flex-col items-center">
                      <span className="uppercase text-muted-foreground">
                        Ad Count
                      </span>
                      <span className="font-bold">
                        {data.ads}
                      </span>
                    </div>
                  </div>
                )
              }}
            />
            <Line
              type="monotone"
              dataKey="ads"
              stroke="hsl(var(--chart-1))"
              strokeWidth={1.5}
              dot={false}
              activeDot={{
                r: 2.5,
                fill: "hsl(var(--chart-1))",
                strokeWidth: 0
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}