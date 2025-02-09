import { useLocation, useParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSidebar } from "@/components/ui/sidebar";
import { useMemo } from "react";

// --- Types ---
interface PageHeaderProps {
  brandDetails?: BrandDetails | null;
}

interface BreadcrumbConfig {
  parent?: string;
  parentLink?: string;
  current: string;
}

// --- Helper Component: Breadcrumbs ---
const Breadcrumbs = ({ config, brandDetails }: { config: BreadcrumbConfig; brandDetails?: BrandDetails | null }) => (
  <Breadcrumb>
    <BreadcrumbList>
      {config.parent && (
        <>
          <BreadcrumbItem>
            <BreadcrumbLink href={config.parentLink}>{config.parent}</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
        </>
      )}
      <BreadcrumbItem>
        <BreadcrumbPage>
          <div className="flex items-center gap-2">
            {brandDetails && (
              <Avatar className="h-5 w-5 rounded-[4px]">
                <AvatarImage src={brandDetails.logo} alt={brandDetails.name} />
                <AvatarFallback className="rounded-[4px] text-xs">
                  {brandDetails.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
            <span>{config.current}</span>
          </div>
        </BreadcrumbPage>
      </BreadcrumbItem>
    </BreadcrumbList>
  </Breadcrumb>
);

// --- Main Component ---
export function PageHeader({ brandDetails }: PageHeaderProps) {
  const location = useLocation();
  const { folderId, brandId } = useParams();
  const { isMobile } = useSidebar();

  // Memoize breadcrumb configuration
  const config = useMemo((): BreadcrumbConfig => {
    const path = location.pathname;

    if (path === "/") return { current: "Discover" };

    if (path.startsWith("/track-brands")) {
      if (path === "/track-brands/add") {
        return {
          parent: "Track Brands",
          parentLink: "/track-brands",
          current: "Add Brand",
        };
      }
      return {
        parent: "Track Brands",
        parentLink: "/track-brands",
        current: brandDetails?.name || "Loading...",
      };
    }

    if (path.startsWith("/saved-folders/")) {
      return {
        parent: "Saved Folders",
        parentLink: "/saved-folders",
        current: folderId === "123" ? "Nike" : folderId === "12" ? "Vance" : folderId || "Folder",
      };
    }

    if (path === "/help") return { current: "Help" };
    if (path === "/account") return { current: "Account" };
    if (path === "/add-brand") return { current: "Add Brand" };

    return { current: "Discover" };
  }, [location.pathname, brandDetails?.name, folderId]);

  // Memoize status counts display
  const StatusCounts = useMemo(() => {
    if (!brandId || !brandDetails?.activeCount) return null;

    const formatCount = (count: number) => {
      if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
      if (count >= 1_000) return `${(count / 1_000).toFixed(1)}K`;
      return count.toString();
    };

    return (
      <div className="flex items-center gap-3 text-[13px]">
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
          <span className="font-medium text-gray-700">
            {formatCount(brandDetails.activeCount)} active
          </span>
        </div>
      </div>
    );
  }, [brandId, brandDetails?.activeCount]);

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        {isMobile && (
          <>
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </>
        )}
        {/* Breadcrumbs */}
        <Breadcrumbs config={config} brandDetails={brandDetails} />
      </div>

      {/* Status Counts */}
      {StatusCounts}
    </div>
  );
}
