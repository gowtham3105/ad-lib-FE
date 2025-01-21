import { useCallback, useRef, useEffect } from "react"
import type { Ad } from "@/lib/types"
import { MediaCard } from "@/components/media-card"
import { Skeleton } from "@/components/ui/skeleton"
import Masonry from 'react-masonry-css'

interface MediaMasonryProps {
  media: Ad[]
  loading?: boolean
  error?: string | null
  hasMore?: boolean
  onLastElementInView?: () => void
}

export function MediaMasonry({ 
  media, 
  loading = false, 
  error = null,
  hasMore = false,
  onLastElementInView 
}: MediaMasonryProps) {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const lastElementRefCallback = useRef<HTMLDivElement | null>(null)

  const lastElementRef = useCallback((node: HTMLDivElement) => {
    lastElementRefCallback.current = node
  }, [])

  useEffect(() => {
    if (loading || !onLastElementInView || !lastElementRefCallback.current) return

    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          onLastElementInView()
        }
      })

    observerRef.current.observe(lastElementRefCallback.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [loading, hasMore, onLastElementInView])

  const breakpointColumns = {
    default: 4,
    1536: 3, // 2xl
    1280: 3, // xl
    768: 2,  // md
    640: 1   // sm
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-600">
        {error}
      </div>
    )
  }

  if (media.length === 0 && !loading) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-4 text-gray-500">
        No ads found
      </div>
    )
  }

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-3 w-auto"
        columnClassName="pl-3 bg-clip-padding"
      >
        {media.map((ad, index) => (
          <div
            key={ad.key ?? ad.external_id}
            ref={index === media.length - 1 && onLastElementInView ? lastElementRef : undefined}
            className="mb-3"
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
        {loading && (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={`skeleton-${i}`} className="mb-3">
              <div className="bg-white rounded-xl overflow-hidden border border-gray-100">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-6 h-6 rounded-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="w-full h-[300px]" />
                <div className="h-[52px]" />
              </div>
            </div>
          ))
        )}
      </Masonry>
      
      {!hasMore && media.length > 0 && !loading && (
        <div className="text-center text-gray-500 py-4">
          No more ads to load
        </div>
      )}
    </>
  )
}