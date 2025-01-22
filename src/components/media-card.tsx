import { BookmarkIcon, Link2Icon, PlayCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useRef, useState } from "react"
import { AdDetailsDialog } from "@/components/ad-details-dialog"

interface MediaCardProps {
  type: "image" | "video"
  src: string
  title: string
  brandName: string
  brandLogo: string
  timestamp?: string
  isActive?: boolean
  className?: string
  id: string
}

export function MediaCard({ 
  type, 
  src, 
  title, 
  brandName,
  brandLogo,
  timestamp = "2D",
  isActive = false,
  className,
  id
}: MediaCardProps) {
  const { toast } = useToast()
  const mediaRef = useRef<HTMLImageElement | HTMLVideoElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [aspectRatio, setAspectRatio] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    const loadMedia = async () => {
      if (!mediaRef.current) return

      if (type === "image") {
        const img = mediaRef.current as HTMLImageElement
        const updateImageAspect = () => {
          setAspectRatio(img.naturalWidth / img.naturalHeight)
          setIsLoading(false)
        }

        if (img.complete) {
          updateImageAspect()
        } else {
          img.onload = updateImageAspect
        }
      } else {
        const video = mediaRef.current as HTMLVideoElement
        video.addEventListener('loadedmetadata', () => {
          setAspectRatio(video.videoWidth / video.videoHeight)
          setIsLoading(false)
        }, { once: true })

        // Load the first frame
        video.currentTime = 0.1
        video.addEventListener('seeked', () => {
          setIsLoading(false)
        }, { once: true })
      }
    }

    loadMedia()
  }, [type, src])

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click
    toast({
      title: "Saved",
      description: "The item has been saved to your collection",
    })
  }

  const handleCopyLink = async (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click
    const url = `${window.location.origin}/ad/${id}`
    await navigator.clipboard.writeText(url)
    toast({
      title: "Link copied",
      description: "The link has been copied to your clipboard",
    })
  }

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click
    if (type === "video") {
      setIsPlaying(true)
      const video = mediaRef.current as HTMLVideoElement
      video.play()
    }
  }

  const handleCardClick = () => {
    setShowDetails(true)
  }

  return (
    <>
      <div 
        className={cn(
          "bg-white rounded-xl overflow-hidden border border-gray-100/50 flex flex-col",
          "shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300",
          "hover:translate-y-[-2px]",
          "cursor-pointer",
          className
        )}
        onClick={handleCardClick}
      >
        {/* Card Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <img 
              src={brandLogo} 
              alt={brandName}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="font-medium text-gray-900">{brandName}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-2 h-2 rounded-full",
              isActive 
                ? "bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]" 
                : "bg-gray-300"
            )} />
            <span className="text-gray-500 text-sm">{timestamp}</span>
          </div>
        </div>

        {/* Media Content */}
        <div 
          className={cn(
            "relative w-full cursor-pointer p-2",
            isLoading && "bg-gray-100 animate-pulse"
          )}
          style={{
            paddingBottom: aspectRatio ? `${(1 / aspectRatio) * 100 + 4}%` : "104%"
          }}
          onClick={type === "video" ? handleVideoClick : undefined}
        >
          {type === "image" ? (
            <img
              ref={mediaRef as React.RefObject<HTMLImageElement>}
              src={src}
              alt={title}
              className="absolute inset-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] object-cover rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
            />
          ) : (
            <video
              ref={mediaRef as React.RefObject<HTMLVideoElement>}
              src={src}
              controls={isPlaying}
              preload="metadata"
              className={cn(
                "absolute inset-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] object-cover rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
                !isPlaying && "cursor-pointer"
              )}
              onClick={handleVideoClick}
            />
          )}
        </div>

        {/* Card Footer */}
        <div className="py-2.5 px-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={handleCopyLink}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-all shadow-sm hover:shadow font-medium"
              title="Copy link"
            >
              <Link2Icon className="w-4 h-4" />
            </button>
            <button 
              onClick={handleSave}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
              title="Save"
            >
              <BookmarkIcon className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <AdDetailsDialog 
        open={showDetails}
        onOpenChange={setShowDetails}
        adId={id}
      />
    </>
  )
}