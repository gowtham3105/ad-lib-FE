import { AnalyticsSection } from "./analytics-section"
import type { Ad } from "@/lib/types"
import { AdListViewer } from "../ad-list-viewer"
import { ProgressBar } from "./progress-bar"

interface LibraryTabProps {
  media: Ad[]
  loading: boolean
  error: string | null
  hasMore?: boolean
  onLastElementInView?: () => void
  showProgressBar?: boolean | null
}

export function LibraryTab({ 
  media, 
  loading, 
  error,
  hasMore,
  onLastElementInView,
  showProgressBar
}: LibraryTabProps) {

  if (showProgressBar) {
    return (
      <ProgressBar onComplete={() => {}}/>
    )
  }

  return (
    <div className="space-y-8">
      <AnalyticsSection />
      <AdListViewer
        media={media}
        loading={loading}
        error={error}
        hasMore={hasMore}
        onLastElementInView={onLastElementInView}
      />
    </div>
  )
}