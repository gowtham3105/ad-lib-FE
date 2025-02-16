import { useState, useCallback } from "react"
import type { Ad, AdDetails } from "@/lib/types"
import { MediaMasonry } from "@/components/media-masonry"
import { AdDetailsDialog } from "@/components/ad-details-dialog"
import { useAuth } from "@clerk/clerk-react"

interface AdListViewerProps {
  media: Ad[]
  loading?: boolean
  error?: string | null
  hasMore?: boolean
  onLastElementInView?: () => void
}

export function AdListViewer({
  media,
  loading = false,
  error: listError = null,
  hasMore = false,
  onLastElementInView
}: AdListViewerProps) {
  const { getToken } = useAuth()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedAd, setSelectedAd] = useState<AdDetails | null>(null)
  const [dialogLoading, setDialogLoading] = useState(false)
  const [dialogError, setDialogError] = useState<string | null>(null)

  const fetchAdDetails = useCallback(async (externalId: string) => {
    try {
      const token = await getToken()
      const response = await fetch(`/ad/details/${externalId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error('Failed to fetch ad details')
      }

      return await response.json()
    } catch (err) {
      throw err
    }
  }, [getToken])

  const handleAdClick = useCallback(async (ad: Ad) => {
    setDialogOpen(true)
    setDialogLoading(true)
    setDialogError(null)
    
    try {
      const details = await fetchAdDetails(ad.external_id)
      setSelectedAd(details)
    } catch (error) {
      console.error('Error fetching ad details:', error)
      setDialogError('Failed to load ad details. Please try again.')
    } finally {
      setDialogLoading(false)
    }
  }, [fetchAdDetails])

  return (
    <>
      <MediaMasonry
        media={media}
        loading={loading}
        error={listError}
        onAdClick={handleAdClick}
        hasMore={hasMore}
        onLastElementInView={onLastElementInView}
      />
      
      {selectedAd && (
        <AdDetailsDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          adData={selectedAd}
          loading={dialogLoading}
          error={dialogError}
        />
      )}
    </>
  )
}