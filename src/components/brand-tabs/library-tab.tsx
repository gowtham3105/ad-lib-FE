import { AnalyticsSection } from "./analytics-section"
import type { Ad } from "@/lib/types"
import { MediaMasonry } from "@/components/media-masonry"

interface LibraryTabProps {
  media: Ad[]
  loading: boolean
  error: string | null
  hasMore?: boolean
  onLastElementInView?: () => void
}

export function LibraryTab({ 
  media, 
  loading, 
  error,
  hasMore,
  onLastElementInView 
}: LibraryTabProps) {
  return (
    <div className="space-y-8">
      <AnalyticsSection />
      <MediaMasonry
        media={media}
        loading={loading}
        error={error}
        hasMore={hasMore}
        onLastElementInView={onLastElementInView}
      />
    </div>
  )
}