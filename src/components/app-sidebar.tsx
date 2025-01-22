import * as React from "react"
import { BookOpen, Bot, HelpCircle, SquareTerminal, Plus } from "lucide-react"
import { useAuth } from "@clerk/clerk-react"
import { useState, useEffect } from "react"
import type { SidebarResponse } from "@/lib/types"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const teams = [
  {
    name: "Juni",
    logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=64&auto=format&fit=crop",
    plan: "",
  }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { getToken } = useAuth()
  const [sidebarData, setSidebarData] = useState<SidebarResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        setLoading(true)
        const token = await getToken()
        
        const response = await fetch(`http://127.0.0.1:8000/sidebar/view`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch sidebar data')
        }

        const data: SidebarResponse = await response.json()
        setSidebarData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load sidebar data')
        console.error('Error fetching sidebar data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSidebarData()
  }, [])

  const navItems = [
    {
      title: "Add Brand",
      url: "/add-brand",
      icon: Plus,
      isCollapsible: false,
      className: "bg-gradient-to-r from-black to-gray-800 text-white hover:shadow-lg hover:scale-[1.02] transition-all duration-200 shadow-sm"
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
      items: sidebarData?.saved_brands.map(brand => ({
        title: brand.text,
        url: brand.url
      })) || []
    },
    {
      title: "Saved Folders",
      url: "/saved-folders",
      icon: BookOpen,
      items: sidebarData?.saved_folders.map(folder => ({
        title: folder.text,
        url: folder.url
      })) || []
    },
    {
      title: "Help",
      url: "/help",
      icon: HelpCircle,
      isActive: false,
      isCollapsible: false
    }
  ]
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}