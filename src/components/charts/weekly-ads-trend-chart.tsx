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
    <div className="w-full max-w-[480px] h-[280px]">
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 10,
              bottom: 5,
            }}
          >
            <XAxis 
              dataKey="week"
              axisLine={false}
              tickLine={false}
              tickMargin={8}
              tick={{ fontSize: 12 }}
              tickFormatter={(value, index) => {
                // Show month name only for the first week of each month
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
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="flex flex-col items-center">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Ad Count
                      </span>
                      <span className="font-bold text-base">
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
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 3,
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