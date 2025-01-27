import { useEffect, useRef } from 'react'
import { useAuth } from "@clerk/clerk-react"
import type { AdResponse } from "@/lib/types"

export function useBackgroundLoader(
  currentPage: number,
  loading: boolean,
  hasMore: boolean,
  onDataLoaded: (data: AdResponse) => void,
  options?: {
    brandId?: string
  }
) {
  const { getToken } = useAuth()
  const nextPageRef = useRef<number>(currentPage + 1)
  const loadingRef = useRef(loading)
  const controller = useRef<AbortController | null>(null)

  useEffect(() => {
    loadingRef.current = loading
    nextPageRef.current = currentPage + 1
  }, [loading, currentPage])

  useEffect(() => {
    if (!hasMore) return

    const preloadNextPage = async () => {
      try {
        // Cancel any existing request
        if (controller.current) {
          controller.current.abort()
        }

        // Create new controller for this request
        controller.current = new AbortController()

        const token = await getToken()
        const response = await fetch(`http://127.0.0.1:8000/ad/search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ 
            page: nextPageRef.current,
            limit: 40,
            ...(options?.brandId && { brand_id: options.brandId })
          }),
          signal: controller.current.signal
        })

        if (!response.ok) {
          throw new Error('Failed to preload next page')
        }

        const data: AdResponse = await response.json()
        onDataLoaded(data)
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          // Request was aborted, ignore
          return
        }
        console.error('Error preloading next page:', error)
      }
    }

    // Start preloading when current request finishes
    if (!loadingRef.current) {
      preloadNextPage()
    }

    return () => {
      if (controller.current) {
        controller.current.abort()
      }
    }
  }, [currentPage, hasMore, getToken, options?.brandId])
}