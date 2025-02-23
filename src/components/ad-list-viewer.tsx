import { useState, useCallback } from "react"
import type { Ad, AdDetails } from "@/lib/types"
import { MediaMasonry } from "@/components/media-masonry"
import { AdDetailsDialog } from "@/components/ad-details/ad-details-dialog"
import { useAuth } from "@clerk/clerk-react"
import { useToast } from '@/hooks/use-toast';

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
    const { toast } = useToast();

    const [currentAdIndex, setCurrentAdIndex] = useState<number>(-1)


    const fetchAdDetails = useCallback(async (externalId: string) => {
        try {
            const token = await getToken()
            const response = await fetch(`http://127.0.0.1:8080/ad/${externalId}`, {
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

        try {
            const details = await fetchAdDetails(ad.external_id)
            setSelectedAd(details)
        } catch (error) {
            console.error('Error fetching ad details:', error)
            setDialogOpen(false)

            toast({
                title: 'Failed to fetch ad details',
                description: 'An unknown error occurred. Please try again.',
            });
        } finally {
            setDialogLoading(false)
        }
    }, [fetchAdDetails])

    const handlePrevious = useCallback(async () => {
        if (currentAdIndex > 0) {
            const prevAd = media[currentAdIndex - 1]
            setCurrentAdIndex(currentAdIndex - 1)
            setDialogLoading(true)

            try {
                const details = await fetchAdDetails(prevAd.external_id)
                setSelectedAd(details)
            } catch (error) {
                console.error('Error fetching previous ad details:', error)
                setDialogOpen(false)
                toast({
                    title: 'Failed to fetch ad details',
                    description: 'An unknown error occurred. Please try again.',
                });
                

            } finally {
                setDialogLoading(false)
            }
        }
    }, [currentAdIndex, media, fetchAdDetails])

    const handleNext = useCallback(async () => {
        if (currentAdIndex < media.length - 1) {
            const nextAd = media[currentAdIndex + 1]
            setCurrentAdIndex(currentAdIndex + 1)
            setDialogLoading(true)

            try {
                const details = await fetchAdDetails(nextAd.external_id)
                setSelectedAd(details)
            } catch (error) {
                console.error('Error fetching next ad details:', error)

                setDialogOpen(false)

                toast({
                    title: 'Failed to fetch ad details',
                    description: 'An unknown error occurred. Please try again.',
                });
            } finally {
                setDialogLoading(false)
            }
        }
    }, [currentAdIndex, media, fetchAdDetails])

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
                    onPrevious={handlePrevious}
                    onNext={handleNext}

                />
            )}
        </>
    )
}