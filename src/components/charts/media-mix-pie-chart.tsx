import * as React from "react"
import { PieChart, Pie, Cell, Label, Sector } from "recharts"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

interface MediaMixData {
  name: string
  total: number
}

interface MediaMixPieChartProps {
  data: MediaMixData[]
}

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={innerRadius - 4}
        outerRadius={innerRadius - 2}
        fill={fill}
      />
    </g>
  )
}

export function MediaMixPieChart({ data }: MediaMixPieChartProps) {
  const [activeIndex, setActiveIndex] = React.useState<number | undefined>()
  const [containerWidth, setContainerWidth] = React.useState(0)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const isMobile = useIsMobile()

  const totalAds = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr.total, 0)
  }, [data])

  React.useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth)
      }
    }

    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  const COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
    'hsl(var(--chart-5))'
  ]

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const onPieLeave = () => {
    setActiveIndex(undefined)
  }

  // Calculate chart dimensions based on container width
  const chartSize = Math.min(280, containerWidth)
  const pieSize = {
    width: chartSize,
    height: chartSize,
    innerRadius: chartSize * 0.17,
    outerRadius: chartSize * 0.29
  }

  // Determine if we should stack the legend below
  const shouldStackLegend = containerWidth < 480 || isMobile

  return (
    <div 
      ref={containerRef}
      className={cn(
        "w-full max-w-[480px]",
        shouldStackLegend ? "flex flex-col items-center gap-6" : "flex items-center justify-between gap-8"
      )}
    >
      <div className={cn(
        "relative",
        shouldStackLegend ? "flex justify-center" : ""
      )}>
        <PieChart width={pieSize.width} height={pieSize.height}>
          <Pie
            data={data}
            dataKey="total"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={pieSize.innerRadius}
            outerRadius={pieSize.outerRadius}
            paddingAngle={2}
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="fill-foreground text-2xl font-bold"
                    >
                      {totalAds}
                    </text>
                  )
                }
              }}
            />
          </Pie>
        </PieChart>
      </div>

      {/* Legend with counts */}
      <div className={cn(
        "flex gap-2",
        shouldStackLegend ? "flex-row flex-wrap justify-center" : "flex-col"
      )}>
        {data.map((entry, index) => (
          <div
            key={entry.name}
            className={cn(
              "flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors",
              activeIndex === index && "bg-gray-100"
            )}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(undefined)}
          >
            <div 
              className="w-2.5 h-2.5 rounded-sm"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-medium whitespace-nowrap">{entry.name}</span>
              <span className="text-xs text-gray-500">({entry.total})</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}