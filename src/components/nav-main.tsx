import { type LucideIcon } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { UpgradeDialog } from "@/components/upgrade-dialog"
import { Bot, BookOpen, HelpCircle, Plus, SquareTerminal } from "lucide-react"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/3d-button"

interface NavItem {
  title: string
  url: string
  icon?: LucideIcon
  className?: string
  isActive?: boolean
  component?: React.ReactNode
  items?: {
    title: string
    url: string
    icon?: LucideIcon
    className?: string
  }[]
}

const defaultNavItems: NavItem[] = [
  {
    title: "Add Brand",
    url: "/add-brand",
    icon: Plus,
    isCollapsible: false,
    component: (
      <Button
        variant="outline"
        size="default"
        className="w-full bg-gray-100/80 hover:bg-gray-200 shadow-sm hover:scale-[1.02] transition-all duration-200 [&>*]:text-black"
      >
        <Plus className="w-4 h-4" />
        <span>Add Brand</span>
      </Button>
    )
  },
  {
    title: "Discover",
    url: "/",
    icon: SquareTerminal,
    isActive: true,
    isCollapsible: false
  },
  {
    title: "Track Brands",
    url: "/track-brands",
    icon: Bot,
    isCollapsible: true,
    items: []
  },
  {
    title: "Saved Folders",
    url: "/saved-folders",
    icon: BookOpen,
    items: []
  },
  {
    title: "Help",
    url: "/help",
    icon: HelpCircle,
    isActive: false,
    isCollapsible: false
  }
]

export function NavMain({
  items = defaultNavItems,
}: {
  items?: NavItem[]
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const { isMobile, setOpen, isCollapsed } = useSidebar()
  const [showUpgrade, setShowUpgrade] = useState(false)

  const handleNavigation = (url: string) => {
    if (url === '#upgrade') {
      setShowUpgrade(true)
      return
    }
    navigate(url)
    if (isMobile) {
      setTimeout(() => {
        setOpen(false)
      }, 150)
    }
  }

  return (
    <SidebarGroup className="flex flex-col h-full">
      <div className="flex-1">
        <SidebarMenu className="space-y-2 px-2">
          {items.map((item) => (
            <div key={item.title} className="space-y-1">
              <SidebarMenuItem>
                {item.component ? (
                  <div onClick={() => handleNavigation(item.url)}>
                    {item.component}
                  </div>
                ) : (
                  <SidebarMenuButton 
                    className={cn(
                      "w-full flex font-medium rounded-xl transition-all duration-200",
                      isCollapsed ? "justify-center py-2.5 px-2" : "items-center justify-between px-4 py-2.5",
                      location.pathname === item.url 
                        ? 'bg-sidebar-accent text-sidebar-foreground' 
                        : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground',
                      item.className
                    )}
                    onClick={() => handleNavigation(item.url)}
                  >
                    <div className={cn(
                      "flex items-center",
                      !isCollapsed && "gap-3"
                    )}>
                      {item.icon && (
                        <item.icon className={cn(
                          "h-[18px] w-[18px] flex-shrink-0",
                          location.pathname === item.url ? "text-sidebar-foreground" : "text-sidebar-foreground/70"
                        )} />
                      )}
                      {!isCollapsed && <span className="text-[15px]">{item.title}</span>}
                    </div>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>

              {/* Subfolders */}
              {!isCollapsed && item.items && item.items.length > 0 && (
                <div className="pl-9 space-y-1">
                  {item.items.map((subItem) => (
                    <SidebarMenuItem key={subItem.title}>
                      <SidebarMenuButton 
                        className={cn(
                          "w-full flex items-center px-4 py-2 text-[15px] font-medium rounded-lg transition-all duration-200",
                          location.pathname === subItem.url 
                            ? 'bg-sidebar-accent text-sidebar-foreground' 
                            : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground',
                          subItem.className
                        )}
                        onClick={() => handleNavigation(subItem.url)}
                      >
                        {subItem.icon && (
                          <subItem.icon className={cn(
                            "h-[18px] w-[18px] mr-2",
                            location.pathname === subItem.url ? "text-sidebar-foreground" : "text-sidebar-foreground/70"
                          )} />
                        )}
                        <span>{subItem.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </div>
              )}
            </div>
          ))}
        </SidebarMenu>
      </div>

      {/* Trial Status */}
      {!isCollapsed && (
        <div className="mt-auto px-4 py-4 group-data-[collapsible=icon]:hidden">
          <div className="rounded-xl bg-sidebar-accent p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-gradient-to-br from-pink-300 to-purple-400 animate-pulse" />
              <span className="text-[13px] font-medium text-sidebar-foreground">6 days left for trial</span>
            </div>
            <button 
              onClick={() => handleNavigation('#upgrade')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-[15px] font-medium rounded-xl bg-sidebar-accent/50 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all duration-200"
            >
              Upgrade
            </button>
          </div>
        </div>
      )}
      <UpgradeDialog open={showUpgrade} onOpenChange={setShowUpgrade} />
    </SidebarGroup>
  )
}