import { useParams } from "react-router-dom"
import { PageHeader } from "@/components/page-header"

export function TrackBrandsPage() {
  const { brandId } = useParams()

  return (
    <div className="flex flex-col gap-4 p-4">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <PageHeader />
      </header>
      <div className="rounded-lg border p-4">
        {brandId ? (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Brand Details</h2>
            <p>Viewing brand with ID: {brandId}</p>
            {/* Add brand-specific content here */}
          </div>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Track Brands</h2>
            <p>Select a brand from the sidebar to view details</p>
          </div>
        )}
      </div>
    </div>
  )
}