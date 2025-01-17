import { MediaCard } from "@/components/media-card"
import { AnalyticsSection } from "./analytics-section"
import type { Media } from "@/data/brands"

interface LibraryTabProps {
  media: Media[]
}

export function LibraryTab({ media }: LibraryTabProps) {
  return (
    <div>
      <AnalyticsSection />
      
      <div className="columns-1 md:columns-2 xl:columns-3 2xl:columns-4 gap-3 space-y-3 [&>*]:break-inside-avoid-column">
        {media.map((item) => (
          <MediaCard
            key={item.id}
            id={item.id}
            type={item.type}
            src={item.src}
            title={item.title}
            brandName={item.brandName}
            brandLogo={item.brandLogo}
            timestamp={item.timestamp}
            isActive={item.isActive}
          />
        ))}
      </div>
    </div>
  )
}