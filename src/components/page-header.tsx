import { useLocation, useParams } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useEffect, useState, useMemo } from "react"
import { useAuth } from "@clerk/clerk-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface BrandDetails {
  name: string
  logo: string
  activeCount?: number
  inactiveCount?: number
}

export function PageHeader() {
  const location = useLocation()
  const { folderId, brandId } = useParams()
  const { getToken } = useAuth()
  const [brandDetails, setBrandDetails] = useState<BrandDetails | null>(null)

  // Memoize the breadcrumb config to prevent unnecessary recalculations
  const config = useMemo(() => {
    const path = location.pathname

    if (path === "/") return { current: "Discover" }

    if (path.startsWith("/track-brands")) {
      if (path === "/track-brands/add") {
        return {
          parent: "Track Brands",
          parentLink: "/track-brands",
          current: "Add Brand"
        }
      }
      return {
        parent: "Track Brands",
        parentLink: "/track-brands",
        current: brandDetails?.name || "Loading..."
      }
    }

    if (path.startsWith("/saved-folders/")) {
      return {
        parent: "Saved Folders",
        parentLink: "/saved-folders",
        current: folderId === "123" ? "Nike" : folderId === "12" ? "Vance" : folderId
      }
    }

    if (path === "/help") return { current: "Help" }
    if (path === "/account") return { current: "Account" }

    return { current: "Page Not Found" }
  }, [location.pathname, brandDetails?.name, folderId])

  useEffect(() => {
    let isMounted = true

    const fetchBrandDetails = async () => {
      if (!brandId) return
      try {
        const token = await getToken()
        const response = await fetch(`http://127.0.0.1:8000/brand/view/${brandId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (!response.ok) throw new Error('Failed to fetch brand details')
        const data = await response.json()
        
        if (isMounted) {
          setBrandDetails({
            name: data.name,
            logo: data.logo,
            activeCount: 1000, // These would come from the API
            inactiveCount: 100
          })
        }
      } catch (error) {
        console.error('Error fetching brand details:', error)
      }
    }

    fetchBrandDetails()
    return () => { isMounted = false }
  }, [brandId, getToken])

  // Memoize the status counts display
  const StatusCounts = useMemo(() => {
    if (!brandId || !brandDetails?.activeCount) return null

    const formatCount = (count: number) => {
      if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
      if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
      return count.toString()
    }

    return (
      <div className="flex items-center gap-3 text-[13px]">
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
          <span className="font-medium text-gray-700">
            {formatCount(brandDetails.activeCount)} active
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-gray-200" />
          <span className="font-medium text-gray-600">
            {formatCount(brandDetails.inactiveCount || 0)} inactive
          </span>
        </div>
      </div>
    )
  }, [brandId, brandDetails?.activeCount, brandDetails?.inactiveCount])

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {config.parent && (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href={config.parentLink}>
                    {config.parent}
                  </BreadcrumbLink>
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
      </div>

      {StatusCounts}
    </div>
  )
}