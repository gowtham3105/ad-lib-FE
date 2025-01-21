import { type LucideIcon } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import { motion, AnimatePresence } from "framer-motion"

interface NavItem {
  title: string
  url: string
  icon?: LucideIcon
  className?: string
  isActive?: boolean
  isCollapsible?: boolean
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
  const { isMobile, setOpen } = useSidebar()

  const handleNavigation = (url: string) => {
    if (url.startsWith('#')) {
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
        <SidebarMenu>
          {items.map((item) => (
            item.isCollapsible === false ? (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-[15px] font-medium rounded-2xl transition-all duration-200 ${
                    location.pathname === item.url 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  } ${item.className || ''}`}
                  onClick={() => handleNavigation(item.url)}
                >
                  <span>{item.title}</span>
                  {item.icon && <item.icon className="h-[18px] w-[18px] text-gray-500" />}
                </SidebarMenuButton>
              </SidebarMenuItem>
            ) : (
              <Collapsible
                key={item.title}
                asChild
                defaultOpen={item.isActive || item.items?.some(subItem => location.pathname.startsWith(subItem.url))}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton 
                      tooltip={item.title} 
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-[15px] font-medium rounded-2xl transition-all duration-200 ${
                        location.pathname === item.url 
                          ? 'bg-gray-100 text-gray-900' 
                          : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <span>{item.title}</span>
                      <ChevronDownIcon className="h-4 w-4 text-gray-500 transition-transform duration-300 ease-in-out group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="overflow-hidden transition-all duration-300 ease-in-out">
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <SidebarMenuSub>
                        {item.items?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton 
                              className={`w-full flex items-center px-4 py-2.5 text-[15px] font-medium rounded-2xl transition-all duration-200 ${
                                location.pathname === subItem.url 
                                  ? 'bg-gray-100 text-gray-900' 
                                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                              } ${subItem.className || ''}`}
                              onClick={() => handleNavigation(subItem.url)}
                            >
                              {subItem.icon && (
                                <subItem.icon 
                                  className={`mr-2 h-[18px] w-[18px] text-gray-500 ${subItem.className}`} 
                                />
                              )}
                              <span>{subItem.title}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </motion.div>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            )
          ))}
        </SidebarMenu>
      </div>

      {/* Trial Status */}
      <div className="mt-auto px-4 py-4">
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
    </SidebarGroup>
  )
}