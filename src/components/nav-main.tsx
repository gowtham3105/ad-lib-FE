import { type LucideIcon } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { UpgradeDialog } from "@/components/upgrade-dialog"
import { Bot, BookOpen, HelpCircle, Plus, SquareTerminal, Sparkles } from "lucide-react"
import { GlowEffect } from "@/components/ui/glow-effect"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/3d-button"
import PricingPopup from "./pricing-dialog"

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
        <div className="mt-auto px-2 py-2 group-data-[collapsible=icon]:hidden">
          <div className="relative rounded-2xl bg-[#1C1C1C] p-4 overflow-hidden">
            <GlowEffect
              colors={['#2A9D8F', '#264653', '#E9B44C', '#E76F51', '#E9B44C', '#2A9D8F']}
              mode="colorShift"
              blur="strong"
              scale={1.5}
             duration={20}
              className="opacity-20"
            />
            <div className="flex items-center gap-3 mb-2">
              <div className="w-5 h-5 rounded-full bg-[#2C2C2C] flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#E76F51]/60 animate-blink" />
              </div>
              <span className="text-[15px] font-medium text-white">6 days left</span>
            </div>
            <div className="text-[13px] text-gray-400 mb-3">Access to 40+ million ads</div>
            <button 
              onClick={() => handleNavigation('#upgrade')}
              className="w-full flex items-center justify-center px-3 py-1.5 bg-white hover:bg-gray-100 text-black rounded-full transition-all duration-200 text-[15px] font-medium"
            >
              Upgrade
            </button>
          </div>
        </div>
      )}
            <PricingPopup isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} />

    </SidebarGroup>
  )
}