import { useState, useEffect, useRef, useCallback } from "react"
import { PageHeader } from "@/components/page-header"
import { MediaCard } from "@/components/media-card"
import type { Ad, AdResponse } from "@/lib/types"

export function DiscoverPage() {
  const [ads, setAds] = useState<Ad[]>([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef<IntersectionObserver>()
  const loadingRef = useRef<HTMLDivElement>(null)

  const fetchAds = async (pageNumber: number) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/ad',
        {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ page: pageNumber }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch ads')
      }

      const data: AdResponse = await response.json()
      
      if (pageNumber === 1) {
        setAds(data.data.map(ad => ({ ...ad, key: `${ad.external_id}-${pageNumber}` })))
      } else {
        setAds(prev => [...prev, ...data.data.map(ad => ({ ...ad, key: `${ad.external_id}-${pageNumber}` }))])
      }
      
      // Check if we've reached the end of the data
      setHasMore(data.data.length > 0)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load ads')
    } finally {
      setIsLoading(false)
    }
  }

  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (isLoading) return
    
    if (observer.current) {
      observer.current.disconnect()
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1)
      }
    })

    if (node) {
      observer.current.observe(node)
    }
  }, [isLoading, hasMore])

  useEffect(() => {
    fetchAds(page)
  }, [page])

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-50 min-h-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <PageHeader />
      </header>
      
      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      ) : ads.length === 0 && !isLoading ? (
        <div className="rounded-lg border border-gray-200 bg-white p-4 text-gray-500">
          No ads found
        </div>
      ) : (
        <>
          <div className="columns-1 md:columns-2 xl:columns-3 2xl:columns-4 gap-3 space-y-3 [&>*]:break-inside-avoid-column">
            {ads.map((ad, index) => (
              <div
                key={ad.key}
                ref={index === ads.length - 1 ? lastElementRef : undefined}
              >
                <MediaCard
                  id={ad.external_id}
                  type={ad.media_type}
                  src={ad.media_src}
                  title={ad.brand_name}
                  brandName={ad.brand_name}
                  brandLogo={ad.brand_logo}
                  timestamp={ad.time}
                  isActive={ad.is_active}
                />
              </div>
            ))}
          </div>
          
          {isLoading && (
            <div ref={loadingRef} className="flex items-center justify-center py-4">
              <div className="animate-pulse text-gray-500">Loading more ads...</div>
            </div>
          )}
          
          {!hasMore && ads.length > 0 && (
            <div className="text-center text-gray-500 py-4">
              No more ads to load
            </div>
          )}
        </>
      )}
    </div>
  )
}