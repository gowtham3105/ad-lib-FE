import { useCallback, useRef, useEffect, useState } from "react"
import type { Ad } from "@/lib/types"
import { MediaCard } from "@/components/media-card"
import { Skeleton } from "@/components/ui/skeleton"
import Masonry from 'react-masonry-css'

interface MediaMasonryProps {
  media: Ad[]
  loading?: boolean
  error?: string | null
  hasMore?: boolean
  onAdClick?: (ad: Ad) => void
  onLastElementInView?: () => void
}

export function MediaMasonry({ 
  media, 
  loading = false, 
  error = null,
  onAdClick,
  hasMore = false,
  onLastElementInView 
}: MediaMasonryProps) {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const lastElementRefCallback = useRef<HTMLDivElement | null>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const preloadTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [preloadStarted, setPreloadStarted] = useState(false)

  const lastElementRef = useCallback((node: HTMLDivElement) => {
    lastElementRefCallback.current = node
  }, [])

  useEffect(() => {
    if (!onLastElementInView || !lastElementRefCallback.current) return

    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(entries => {
      const isIntersecting = entries[0].isIntersecting
      setIsIntersecting(isIntersecting)
      
      // Start preloading when we're 75% through the current content
      if (entries[0].intersectionRatio > 0.75 && !preloadStarted && hasMore && !loading) {
        setPreloadStarted(true)
        if (preloadTimeoutRef.current) {
          clearTimeout(preloadTimeoutRef.current)
        }
        preloadTimeoutRef.current = setTimeout(() => {
          onLastElementInView?.()
        }, 300)
      }
    }, {
      rootMargin: '200px', // Increased margin for earlier detection
      threshold: [0, 0.25, 0.5, 0.75, 1] // Monitor multiple thresholds
    })

    observerRef.current.observe(lastElementRefCallback.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      if (preloadTimeoutRef.current) {
        clearTimeout(preloadTimeoutRef.current)
      }
    }
  }, [onLastElementInView])

  // Handle intersection with debounce
  useEffect(() => {
    setPreloadStarted(false)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (isIntersecting && hasMore && !loading) {
      timeoutRef.current = setTimeout(() => {
        onLastElementInView()
      }, 500) // Debounce time of 500ms
    }

    return () => timeoutRef.current && clearTimeout(timeoutRef.current)
  }, [isIntersecting, hasMore, loading, onLastElementInView])

  // Preload images for next batch
  useEffect(() => {
    if (media.length > 0) {
      const imagesToPreload = media.slice(-4) // Preload last 4 images
      imagesToPreload.forEach(ad => {
        if (ad.media_type === "image") {
          const img = new Image()
          img.src = ad.media_src
        }
      })
    }
  }, [media])

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
            <div onClick={() => onAdClick?.(ad)}>
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