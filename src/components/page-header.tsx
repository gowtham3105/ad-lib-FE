import { useLocation, useParams } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function PageHeader() {
  const location = useLocation()
  const { folderId } = useParams()

  // Function to get breadcrumb configuration based on current route
  const getBreadcrumbConfig = () => {
    const path = location.pathname

    if (path === "/") {
      return {
        current: "Discover"
      }
    }

    if (path === "/track-brands") {
      return {
        current: "Track Brands"
      }
    }

    if (path.startsWith("/saved-folders/")) {
      return {
        parent: "Saved Folders",
        parentLink: "/saved-folders",
        current: folderId === "123" ? "Nike" : folderId === "12" ? "Vance" : folderId
      }
    }

    if (path === "/help") {
      return {
        current: "Help"
      }
    }

    if (path === "/account") {
      return {
        current: "Account"
      }
    }

    return {
      current: "Page Not Found"
    }
  }

  const config = getBreadcrumbConfig()

  return (
    <div className="flex items-center gap-2 px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          {config.parent && (
            <>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href={config.parentLink}>
                  {config.parent}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
            </>
          )}
          <BreadcrumbItem>
            <BreadcrumbPage>{config.current}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}