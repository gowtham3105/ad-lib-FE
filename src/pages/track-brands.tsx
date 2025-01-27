import { useParams } from "react-router-dom"
import { PageHeader } from "@/components/page-header"
import { useState, useEffect, useRef, useCallback } from "react"
import { TabNavigation, type TabType } from "@/components/brand-tabs/tab-navigation"
import { LibraryTab } from "@/components/brand-tabs/library-tab"
import { LandingPagesTab } from "@/components/brand-tabs/landing-pages-tab"
import { HooksTab } from "@/components/brand-tabs/hooks-tab"
import { motion } from "framer-motion"
import type { Ad, AdResponse } from "@/lib/types"
import { useAuth } from "@clerk/clerk-react"

export function TrackBrandsPage() {
  const { getToken } = useAuth()
  const { brandId } = useParams()
  const [activeTab, setActiveTab] = useState<TabType>("library");
  const [media, setMedia] = useState<Ad[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const initialFetchComplete = useRef(false);

  const fetchBrandMedia = useCallback(async (pageNumber: number) => {
    if (!brandId) return
    if (loading) return

    try {
      setLoading(true)
      setError(null)
      const token = await getToken()
      
      const response = await fetch(`http://127.0.0.1:8000/ad/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          page: pageNumber,
          brand_id: brandId,
          limit: 40
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch brand media')
      }

      const data: AdResponse = await response.json()
      
      // Add page number to make keys unique
      const newAds = data.data.map(ad => ({
        ...ad,
        key: `${ad.external_id}-${pageNumber}`
      }))

      setMedia(prev => {
        // Prevent duplicate ads in case of double render
        const existingKeys = new Set(prev.map(ad => ad.key))
        const uniqueNewAds = newAds.filter(ad => !existingKeys.has(ad.key))
        return [...prev, ...uniqueNewAds]
      })
      setHasMore(data.data.length > 0)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load brand media')
    } finally {
      setLoading(false)
    }
  }, [brandId, getToken, loading])

  // Handle initial fetch
  useEffect(() => {
    if (!initialFetchComplete.current) {
      initialFetchComplete.current = true;
      fetchBrandMedia(1);
    }
  }, [])

  // Reset state when brand changes
  useEffect(() => {
    if (brandId) {
      setMedia([])
      setPage(1)
      setHasMore(true)
      setError(null)
      initialFetchComplete.current = false
      fetchBrandMedia(1);
    }
  }, [brandId])

  // Handle subsequent page fetches
  useEffect(() => {
    if (page > 1) {
      fetchBrandMedia(page)
    }
  }, [page, brandId])

  const handleLastElementInView = () => {
    setPage(prevPage => prevPage + 1)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "library":
        return (
          <LibraryTab 
            media={media} 
            loading={loading} 
            error={error}
            hasMore={hasMore}
            onLastElementInView={handleLastElementInView}
          />
        )
      case "landing-pages":
        return <LandingPagesTab />
      case "hooks":
        return <HooksTab />
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="flex h-14 shrink-0 items-center gap-3 px-4 bg-white border-b border-gray-100">
        <PageHeader />
      </header>
      
      <div className="flex-1 flex flex-col">
        {brandId ? (
          <div>
            <div className="bg-white border-b border-gray-100">
              <TabNavigation 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
              />
            </div>

            <div className="p-6">
              {renderTabContent()}
            </div>

            {!loading && !error && media.length > 0 && !hasMore && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center py-8 text-gray-500"
              >
                That's all for today! Check back tomorrow for new updates.
              </motion.div>
            )}
          </div>
        ) : (
          <div className="rounded-lg border p-4 bg-white m-4">
            <h2 className="text-2xl font-semibold mb-4">Track Brands</h2>
            <p className="text-gray-500">Select a brand from the sidebar to view details</p>
          </div>
        )}
      </div>
    </div>
  )
}