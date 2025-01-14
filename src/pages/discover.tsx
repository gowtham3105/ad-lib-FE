import { MediaCard } from "@/components/media-card"
import { SidebarTrigger } from "@/components/ui/sidebar"

// Sample media data with real examples
const sampleMedia = [
  {
    id: "1",
    type: "image",
    src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    title: "Nike Red Sneakers",
    brandName: "Nike",
    brandLogo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=50&h=50&fit=crop",
    timestamp: "2h",
    isActive: true
  },
  {
    id: "2",
    type: "video",
    src: "https://static.videezy.com/system/resources/previews/000/000/168/original/Record.mp4",
    title: "Vintage Record Player",
    brandName: "Vance",
    brandLogo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?w=50&h=50&fit=crop",
    timestamp: "4h",
    isActive: true
  },
  {
    id: "3",
    type: "image",
    src: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    title: "Premium Headphones",
    brandName: "Beats",
    brandLogo: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=50&h=50&fit=crop",
    timestamp: "6h",
    isActive: false
  },
  {
    id: "4",
    type: "image",
    src: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
    title: "Limited Edition Sneakers",
    brandName: "Nike",
    brandLogo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=50&h=50&fit=crop",
    timestamp: "1d",
    isActive: true
  },
  {
    id: "5",
    type: "video",
    src: "https://static.videezy.com/system/resources/previews/000/002/231/original/5226496.mp4",
    title: "Urban Fashion",
    brandName: "Urban Outfitters",
    brandLogo: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=50&h=50&fit=crop",
    timestamp: "1d",
    isActive: true
  },
  {
    id: "6",
    type: "image",
    src: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    title: "Running Shoes",
    brandName: "Nike",
    brandLogo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=50&h=50&fit=crop",
    timestamp: "2d",
    isActive: false
  },
  {
    id: "7",
    type: "image",
    src: "https://images.unsplash.com/photo-1542219550-37153d387c27",
    title: "Gradient Glasses",
    brandName: "Ray-Ban",
    brandLogo: "https://images.unsplash.com/photo-1542219550-37153d387c27?w=50&h=50&fit=crop",
    timestamp: "2d",
    isActive: true
  },
  {
    id: "8",
    type: "video",
    src: "https://static.videezy.com/system/resources/previews/000/038/626/original/alb_shoe001_1080p.mp4",
    title: "Classic Sneakers",
    brandName: "Nike",
    brandLogo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=50&h=50&fit=crop",
    timestamp: "3d",
    isActive: true
  }
]

export function DiscoverPage() {
  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SidebarTrigger className="md:hidden -ml-1.5 hover:bg-gray-100 rounded-lg" />
          <h1 className="text-2xl font-bold text-gray-900">Discover</h1>
        </div>
        <div className="flex gap-4">
          {/* Add filters/sorting options here later */}
        </div>
      </div>
      
      <div className="columns-1 md:columns-2 xl:columns-3 2xl:columns-4 gap-3 space-y-3 [&>*]:break-inside-avoid-column">
        {sampleMedia.map((media) => (
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