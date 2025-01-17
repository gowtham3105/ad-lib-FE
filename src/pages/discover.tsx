import { MediaCard } from "@/components/media-card"
import { PageHeader } from "@/components/page-header"
import { discoverMedia } from "@/data/brands"

export function DiscoverPage() {
  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-50 min-h-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <PageHeader />
      </header>
      
      <div className="columns-1 md:columns-2 xl:columns-3 2xl:columns-4 gap-3 space-y-3 [&>*]:break-inside-avoid-column">
        {discoverMedia.map((media) => (
          <MediaCard
            key={media.id}
            id={media.id}
            type={media.type}
            src={media.src}
            title={media.title}
            brandName={media.brandName}
            brandLogo={media.brandLogo}
            timestamp={media.timestamp}
            isActive={media.isActive}
          />
        ))}
      </div>
    </div>
  )
}