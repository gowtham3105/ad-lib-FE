import { BookmarkIcon, Link2Icon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useRef, useState } from "react"

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
  const [aspectRatio, setAspectRatio] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadMedia = async () => {
      if (!mediaRef.current) return

      if (type === "image") {
        const img = mediaRef.current as HTMLImageElement
        if (img.complete) {
          setAspectRatio(img.naturalWidth / img.naturalHeight)
          setIsLoading(false)
        } else {
          img.onload = () => {
            setAspectRatio(img.naturalWidth / img.naturalHeight)
            setIsLoading(false)
          }
        }
      } else {
        const video = mediaRef.current as HTMLVideoElement
        // For videos, we need to load the metadata first
        video.onloadedmetadata = () => {
          setAspectRatio(video.videoWidth / video.videoHeight)
          setIsLoading(false)
        }
        // Force metadata loading
        if (video.readyState >= 1) {
          setAspectRatio(video.videoWidth / video.videoHeight)
          setIsLoading(false)
        }
      }
    }

    loadMedia()
  }, [type, src])

  const handleSave = () => {
    // TODO: Implement save functionality
  }

  const handleCopyLink = async () => {
    const url = `${window.location.origin}/ad/${id}`
    await navigator.clipboard.writeText(url)
    toast({
      title: "Link copied",
      description: "The link has been copied to your clipboard",
    })
  }

  return (
    <div className={cn(
      "bg-white rounded-xl overflow-hidden border border-gray-100 flex flex-col",
      "shadow-[0_2px_8px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.08)] transition-shadow duration-300",
      className
    )}>
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
          "relative flex-1",
          isLoading && "bg-gray-100 animate-pulse"
        )}
        style={aspectRatio ? { 
          paddingBottom: `${(1 / aspectRatio) * 100}%`
        } : undefined}
      >
        {type === "image" ? (
          <img
            ref={mediaRef as React.RefObject<HTMLImageElement>}
            src={src}
            alt={title}
            className={cn(
              "absolute inset-0 w-full h-full object-contain bg-gray-50",
              !isLoading && "object-cover"
            )}
          />
        ) : (
          <video
            ref={mediaRef as React.RefObject<HTMLVideoElement>}
            src={src}
            poster={src + "?poster=true"}
            controls
            preload="metadata"
            className={cn(
              "absolute inset-0 w-full h-full object-contain bg-gray-50",
              !isLoading && "object-cover"
            )}
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
  )
}