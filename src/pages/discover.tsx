import { useState, useEffect, useRef, useCallback } from "react"
import { PageHeader } from "@/components/page-header"
import type { Ad, AdResponse } from "@/lib/types"
import { useAuth } from "@clerk/clerk-react"
import { MediaMasonry } from "@/components/media-masonry"
import { AdListViewer } from "@/components/ad-list-viewer"

export function DiscoverPage() {
  const { getToken } = useAuth()
  const [ads, setAds] = useState<Ad[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const initialFetchComplete = useRef(false)

  // Handle initial fetch
  useEffect(() => {
    if (!initialFetchComplete.current) {
      initialFetchComplete.current = true
      fetchAds(1)
    }
  }, [])

  // Handle subsequent page fetches
  useEffect(() => {
    if (page > 1) {
      fetchAds(page)
    }
  }, [page])

  const fetchAds = async (pageNumber: number) => {
    if (loading) return

    try {
      setLoading(true)
      const token = await getToken()
      
      const response = await fetch(`http://127.0.0.1:8080/ad/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          page: pageNumber,
          limit: 40 
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch ads')
      }

      const data: AdResponse = await response.json()
      
      // Add page number to make keys unique
      const newAds = data.data.map(ad => ({
        ...ad,
        key: `${ad.external_id}-${pageNumber}`
      }))

      setAds(prev => {
        // Prevent duplicate ads in case of double render
        const existingKeys = new Set(prev.map(ad => ad.key))
        const uniqueNewAds = newAds.filter(ad => !existingKeys.has(ad.key))
        return [...prev, ...uniqueNewAds]
      })
      setHasMore(data.data.length > 0)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load ads')
    } finally {
      setLoading(false)
    }
  }

  const handleLastElementInView = () => {
    setPage(prevPage => prevPage + 1)
  }

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-50 min-h-screen">
      <header className="flex h-16 shrink-0 items-center gap-2">
        <PageHeader />
      </header>
      <AdListViewer
        media={ads}
        loading={loading}
        error={error}
        hasMore={hasMore}
        onLastElementInView={handleLastElementInView}
      />
    </div>
  )
}