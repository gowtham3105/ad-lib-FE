import * as React from "react"
import { ResponsiveContainer } from "recharts"
import { cn } from "@/lib/utils"

export interface ChartConfig {
  [key: string]: {
    label: string
    color?: string
  }
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig
  children: React.ReactNode
}

export function ChartContainer({
  config,
  children,
  className,
  ...props
}: ChartContainerProps) {
  // Create CSS variables for chart colors
  const style = React.useMemo(() => {
    return Object.entries(config).reduce((acc, [key, value]) => {
      if (value.color) {
        acc[`--color-${key}`] = value.color
      }
      return acc
    }, {} as Record<string, string>)
  }, [config])

  return (
    <div
      style={style}
      className={cn("h-full w-full", className)}
      {...props}
    >
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  )
}

interface ChartTooltipProps {
  active?: boolean
  payload?: Array<{
    name: string
    value: number
    payload: Record<string, any>
  }>
  label?: string
  config?: ChartConfig
  hideLabel?: boolean
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  config,
  hideLabel = false,
}: ChartTooltipProps) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      {!hideLabel && label && (
        <div className="grid gap-2">
          <p className="text-sm font-medium">{label}</p>
        </div>
      )}
      <div className={cn("grid gap-2", !hideLabel && label && "mt-2")}>
        {payload.map(({ name, value }, i) => {
          const color = config?.[name]?.color ?? `var(--color-${name})`
          return (
            <div key={i} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <div
                  className="h-2 w-2 rounded-full"
                  style={{ background: color }}
                />
                <p className="text-sm text-muted-foreground">
                  {config?.[name]?.label ?? name}
                </p>
              </div>
              <p className="text-sm font-medium">{value}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export const ChartTooltip = React.forwardRef<
  any,
  React.ComponentProps<typeof ChartTooltipContent>
>(({ ...props }, ref) => (
  <div
    ref={ref}
    className="rounded-lg border bg-background p-2 shadow-sm"
  >
    <ChartTooltipContent {...props} />
  </div>
))
ChartTooltip.displayName = "ChartTooltip"