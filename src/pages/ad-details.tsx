import { useParams } from "react-router-dom"
import { PageHeader } from "@/components/page-header"

export function AdDetailsPage() {
  const { id } = useParams()

  return (
    <div className="flex flex-col gap-4 p-4">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <PageHeader />
      </header>
      <div className="flex h-[calc(100vh-6rem)]">
        {/* Main content area */}
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <p>Ad ID: {id}</p>
            <p>Ad details content will go here</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-white border-l border-gray-200 p-4">
          <h2 className="font-semibold mb-4">Ad Details</h2>
          {/* Sidebar content will go here */}
        </div>
      </div>
    </div>
  )
}