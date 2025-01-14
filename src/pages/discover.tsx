import { MediaCard } from "@/components/media-card"
import { PageHeader } from "@/components/page-header"

// Sample media data
const sampleMedia = [
  {
    id: "1",
    type: "video" as const,
    src: "https://video.xx.fbcdn.net/v/t42.1790-2/471988498_616763337405326_1593700898547275560_n.mp4?_nc_cat=107&ccb=1-7&_nc_sid=c53f8f&_nc_ohc=VctEx6HzWd8Q7kNvgHjRaDx&_nc_zt=28&_nc_ht=scontent.fblr1-7.fna&_nc_gid=AsbzVkrPFP-uHj5nmOQSsvZ&oh=00_AYAt7SZ2tYhqSD2CXRrb861UpcU19N8nAT7fF9BBg43goQ&oe=678CB4FA",
    title: "KFC Fried Chicken",
    brandName: "KFC",
    brandLogo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=100&auto=format&fit=crop",
    timestamp: "2h",
    isActive: true
  },
  {
    id: "2",
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    title: "Adidas Originals",
    brandName: "Adidas",
    brandLogo: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=100&auto=format&fit=crop",
    timestamp: "4h",
    isActive: true
  },
  {
    id: "3",
    type: "video" as const,
    src: "https://video.xx.fbcdn.net/v/t42.1790-2/471549516_4172170129768291_8192092389548894531_n.mp4?_nc_cat=104&ccb=1-7&_nc_sid=c53f8f&_nc_ohc=NAIuDUfudH0Q7kNvgGFR2b-&_nc_zt=28&_nc_ht=scontent.fblr1-4.fna&_nc_gid=Ai2MXoQIHcGmZohZzJJgreJ&oh=00_AYBQ7lzMHAL9Zidk11TDkThx7o_G1Y5fkK7oMtYgdjvLVw&oe=678C84C2",
    title: "Under Armour - Push Your Limits",
    brandName: "Under Armour",
    brandLogo: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=100&auto=format&fit=crop",
    timestamp: "6h",
    isActive: false
  },
  {
    id: "4",
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa",
    title: "Nike Air Max",
    brandName: "Nike",
    brandLogo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=100&auto=format&fit=crop",
    timestamp: "8h",
    isActive: true
  },
  {
    id: "5",
    type: "video" as const,
    src: "https://video.xx.fbcdn.net/v/t42.1790-2/471549516_4172170129768291_8192092389548894531_n.mp4?_nc_cat=104&ccb=1-7&_nc_sid=c53f8f&_nc_ohc=NAIuDUfudH0Q7kNvgGFR2b-&_nc_zt=28&_nc_ht=scontent.fblr1-4.fna&_nc_gid=Ai2MXoQIHcGmZohZzJJgreJ&oh=00_AYBQ7lzMHAL9Zidk11TDkThx7o_G1Y5fkK7oMtYgdjvLVw&oe=678C84C2",
    title: "Puma - Forever Faster",
    brandName: "Puma",
    brandLogo: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=100&auto=format&fit=crop",
    timestamp: "12h",
    isActive: true
  },
  {
    id: "6",
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    title: "New Balance",
    brandName: "New Balance",
    brandLogo: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=100&auto=format&fit=crop",
    timestamp: "1d",
    isActive: false
  },
  {
    id: "7",
    type: "video" as const,
    src: "https://video.xx.fbcdn.net/v/t42.1790-2/471549516_4172170129768291_8192092389548894531_n.mp4?_nc_cat=104&ccb=1-7&_nc_sid=c53f8f&_nc_ohc=NAIuDUfudH0Q7kNvgGFR2b-&_nc_zt=28&_nc_ht=scontent.fblr1-4.fna&_nc_gid=Ai2MXoQIHcGmZohZzJJgreJ&oh=00_AYBQ7lzMHAL9Zidk11TDkThx7o_G1Y5fkK7oMtYgdjvLVw&oe=678C84C2",
    title: "Reebok - Sport the Unexpected",
    brandName: "Reebok",
    brandLogo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=100&auto=format&fit=crop",
    timestamp: "1d",
    isActive: true
  },
  {
    id: "8",
    type: "image" as const,
    src: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
    title: "Asics",
    brandName: "Asics",
    brandLogo: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=100&auto=format&fit=crop",
    timestamp: "2d",
    isActive: true
  }
]

export function DiscoverPage() {
  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-50 min-h-screen">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <PageHeader />
      </header>
      
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