import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  HelpCircle, // Changed from Help to HelpCircle
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

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

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Spyder",
      logo: GalleryVerticalEnd,
      plan: "",
    }
  ],
  navMain: [
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
      isCollapsible: false,
    },
    {
      title: "Saved Folders",
      url: "/saved-folders",
      icon: BookOpen,
      items: [
        {
          title: "Nike",
          url: "/saved-folders/123",
        },
        {
          title: "Vance",
          url: "/saved-folders/12",
        }
      ],
    },
    {
      title: "Help",
      url: "/help",
      icon: HelpCircle, // Updated here as well
      isActive: false,
      isCollapsible: false
    }
  ]

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}