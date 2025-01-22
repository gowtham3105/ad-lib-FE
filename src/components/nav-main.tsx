import { type LucideIcon } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import { cn } from "@/lib/utils"

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

interface NavItem {
  title: string
  url: string
  icon?: LucideIcon
  className?: string
  isActive?: boolean
  items?: {
    title: string
    url: string
    icon?: LucideIcon
    className?: string
  }[]
}

export function NavMain({
  items,
}: {
  items: NavItem[]
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const { isMobile, setOpen, isCollapsed } = useSidebar()

  const handleNavigation = (url: string) => {
    if (url === '#') {
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
        <SidebarMenu className="space-y-2">
          {items.map((item) => (
            <div key={item.title} className="space-y-1">
              <SidebarMenuItem>
                <SidebarMenuButton 
                  className={cn(
                    "w-full flex font-medium rounded-2xl transition-colors",
                    isCollapsed ? "justify-center py-2.5 px-2" : "items-center justify-between px-4 py-2.5",
                    location.pathname === item.url 
                      ? 'bg-gray-50 text-gray-900' 
                      : 'text-gray-700 hover:bg-gray-50/50',
                    item.className
                  )}
                  onClick={() => handleNavigation(item.url)}
                >
                  <div className={cn(
                    "flex items-center",
                    !isCollapsed && "gap-3"
                  )}>
                    {item.icon && (
                      <item.icon className="h-[18px] w-[18px] text-gray-500 flex-shrink-0" />
                    )}
                    {!isCollapsed && <span className="text-[15px]">{item.title}</span>}
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>

              {/* Subfolders */}
              {!isCollapsed && item.items && item.items.length > 0 && (
                <div className="pl-9 space-y-1">
                  {item.items.map((subItem) => (
                    <SidebarMenuItem key={subItem.title}>
                      <SidebarMenuButton 
                        className={cn(
                          "w-full flex items-center px-4 py-2 text-[15px] font-medium rounded-xl transition-colors",
                          location.pathname === subItem.url 
                            ? 'bg-gray-50 text-gray-900' 
                            : 'text-gray-600 hover:bg-gray-50/50',
                          subItem.className
                        )}
                        onClick={() => handleNavigation(subItem.url)}
                      >
                        {subItem.icon && (
                          <subItem.icon className="h-[18px] w-[18px] mr-2 text-gray-400" />
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
          <div className="rounded-2xl bg-gray-50 p-3">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-gradient-to-br from-pink-300 to-purple-400 animate-pulse" />
              <span className="text-[13px] font-medium text-gray-900">6 days left for trial</span>
            </div>
            <button 
              onClick={() => handleNavigation('#upgrade')}
              className="w-full bg-black text-white rounded-full py-1.5 text-[13px] font-medium hover:bg-gray-800 transition-colors"
            >
              Upgrade
            </button>
          </div>
        </div>
      )}
    </SidebarGroup>
  )
}