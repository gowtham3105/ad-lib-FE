import * as React from "react"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: string
    plan: string
  }[]
}) {
  const [activeTeam] = React.useState(teams[0])

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground p-4"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg overflow-hidden">
            <img 
              src={activeTeam.logo} 
              alt={activeTeam.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid flex-1 text-left leading-tight">
            <span className="truncate text-lg font-semibold">
              {activeTeam.name}
            </span>
            <span className="truncate text-xs text-gray-500">{activeTeam.plan}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}