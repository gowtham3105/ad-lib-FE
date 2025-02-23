import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BookOpen, Bot, HelpCircle, SquareTerminal, Plus } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import type { SidebarResponse } from "@/lib/types";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/3d-button";

const teams = [
  {
    name: "Juni",
    logo: "https://i.ibb.co/DrTd1jz/Untitled-design.png",
    plan: "",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { getToken } = useAuth();
  const [sidebarData, setSidebarData] = useState<SidebarResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isMobile } = useSidebar();
  const location = useLocation();

  useEffect(() => {
    const fetchSidebarData = async () => {
      try {
        setLoading(true);
        const token = await getToken();

        const response = await fetch(`http://127.0.0.1:8080/sidebar/view`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch sidebar data");
        }

        const data: SidebarResponse = await response.json();
        setSidebarData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load sidebar data");
        console.error("Error fetching sidebar data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSidebarData();
  }, [getToken]);

  useEffect(() => {
    const pathParts = location.pathname.split('/');
    if (pathParts[1] === 'track-brands' && pathParts[2]) {
      const brandId = pathParts[2];
      if (!sidebarData?.saved_brands.some(brand => brand.url.includes(brandId))) {
        fetchSidebarData();
      }
    }
  }, [location, sidebarData]);

  const fetchSidebarData = async () => {
    try {
      setLoading(true);
      const token = await getToken();

      const response = await fetch(`http://127.0.0.1:8080/sidebar/view`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch sidebar data");
      }

      const data: SidebarResponse = await response.json();
      setSidebarData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load sidebar data");
      console.error("Error fetching sidebar data:", err);
    } finally {
      setLoading(false);
    }
  };

  const navItems = [
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
      ),
    },
    {
      title: "Discover",
      url: "/",
      icon: SquareTerminal,
      isActive: true,
      isCollapsible: false,
    },
    {
      title: "Track Brands",
      url: "/track-brands",
      icon: Bot,
      isCollapsible: true,
      items: sidebarData?.saved_brands.map((brand) => ({
        title: brand.text,
        url: brand.url,
      })) || [],
    },
    {
      title: "Saved Folders",
      url: "/saved-folders",
      icon: BookOpen,
      items: sidebarData?.saved_folders.map((folder) => ({
        title: folder.text,
        url: folder.url,
      })) || [],
    },
    {
      title: "Help",
      url: "/help",
      icon: HelpCircle,
      isActive: false,
      isCollapsible: false,
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Sidebar
      collapsible={isMobile ? "icon" : false}
      className="border-sidebar-border bg-sidebar"
      {...props}
    >
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      {isMobile && <SidebarRail />}
    </Sidebar>
  );
}
