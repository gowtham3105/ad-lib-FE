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
import { ChevronRightIcon } from "@radix-ui/react-icons"

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
      // Handle modal open here
      return
    }
    // First navigate to the new URL
    navigate(url)
    // Then close the sidebar if we're on mobile
    if (isMobile) {
      setTimeout(() => {
        setOpen(false)
      }, 150) // Small delay to ensure smooth transition
    }
  }

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          item.isCollapsible === false ? (
            <SidebarMenuItem key={item.title} className="mb-1">
              <SidebarMenuButton 
                className={`text-base p-4 ${location.pathname === item.url ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}
                onClick={() => handleNavigation(item.url)}
              >
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ) : (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive || item.items?.some(subItem => location.pathname.startsWith(subItem.url))}
              className="group/collapsible"
            >
              <SidebarMenuItem className="mb-1">
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton 
                    tooltip={item.title} 
                    className={`text-base p-4 ${location.pathname === item.url ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem, index) => (
                      <SidebarMenuSubItem 
                        key={subItem.title} 
                        className={index === 0 ? "mt-1" : ""}
                      >
                        <SidebarMenuSubButton 
                          className={`text-base p-4 ${subItem.className || ''} ${location.pathname === subItem.url ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''}`}
                          onClick={() => handleNavigation(subItem.url)}
                        >
                          {subItem.icon && (
                            <subItem.icon 
                              className={`!text-inherit !bg-inherit ${subItem.className}`} 
                            />
                          )}
                          <span>{subItem.title}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}