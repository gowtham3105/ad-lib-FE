import { useParams } from "react-router-dom"
import { PageHeader } from "@/components/page-header"
import { brandMediaData } from "@/data/brands"
import { useState } from "react"
import { BrandHeader } from "@/components/brand-tabs/brand-header"
import { TabNavigation, type TabType } from "@/components/brand-tabs/tab-navigation"
import { LibraryTab } from "@/components/brand-tabs/library-tab"
import { LandingPagesTab } from "@/components/brand-tabs/landing-pages-tab"
import { HooksTab } from "@/components/brand-tabs/hooks-tab"

export function TrackBrandsPage() {
  const { brandId } = useParams()
  const brandData = brandId ? brandMediaData[brandId as keyof typeof brandMediaData] : null
  const [activeTab, setActiveTab] = useState<TabType>("library")

  const renderTabContent = () => {
    switch (activeTab) {
      case "library":
        return <LibraryTab media={brandData?.media || []} />
      case "landing-pages":
        return <LandingPagesTab />
      case "hooks":
        return <HooksTab />
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-50 min-h-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <PageHeader />
      </header>
      
      {brandId ? (
        brandData ? (
          <div className="space-y-6">
            <BrandHeader brand={brandData} />

            <div className="bg-white border border-gray-100 rounded-xl">
              <div className="border-b border-gray-100">
                <TabNavigation 
                  activeTab={activeTab} 
                  onTabChange={setActiveTab} 
                />
              </div>
              
              <div className="p-6">
                {renderTabContent()}
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border p-4 bg-white">
            <p className="text-gray-500">Brand not found</p>
          </div>
        )
      ) : (
        <div className="rounded-lg border p-4 bg-white">
          <h2 className="text-2xl font-semibold mb-4">Track Brands</h2>
          <p className="text-gray-500">Select a brand from the sidebar to view details</p>
        </div>
      )}
    </div>
  )
}