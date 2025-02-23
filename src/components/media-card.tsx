import { BookmarkIcon, Link2Icon, PlayCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { useEffect, useRef, useState, useCallback, memo } from "react"

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

export const MediaCard = memo(function MediaCard({
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
  const videoRef = useRef<HTMLVideoElement>(null)



  const [blurDataUrl, setBlurDataUrl] = useState<string>('')
  const [isHovered, setIsHovered] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  // Generate blur data URL
  useEffect(() => {
    if (type === "image") {
      const canvas = document.createElement('canvas')
      canvas.width = 10
      canvas.height = 10
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#e5e7eb' // Tailwind gray-200
        ctx.fillRect(0, 0, 10, 10)
        setBlurDataUrl(canvas.toDataURL())
      }
    }
  }, [type])

  const handleMouseEnter = useCallback(() => {
    if (type === "video" && videoRef.current) {
      setIsHovered(true)
      videoRef.current.play().catch(() => {
        // Handle any autoplay restrictions
        console.log("Autoplay prevented")
      })
    }
  }, [type])

  const handleMouseLeave = useCallback(() => {
    if (type === "video" && videoRef.current) {
      setIsHovered(false)
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [type])

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

  const handleVideoClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation() // Prevent card click
    if (type === "video") {
      if (videoRef.current) {
        if (videoRef.current.paused) {
          videoRef.current.play().then(() => {
            setIsPlaying(true)
          }).catch(error => {
            console.error('Error playing video:', error)
            setIsPlaying(false)
          })
        } else {
          videoRef.current.pause()
          setIsPlaying(false)
        }
      }
    }
  }, [type])

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const handleEnded = () => {
        setIsPlaying(false)
        video.currentTime = 0 // Reset to start when ended
      }

      const handlePlay = () => setIsPlaying(true)
      const handlePause = () => setIsPlaying(false)

      video.addEventListener('ended', handleEnded)
      video.addEventListener('play', handlePlay)
      video.addEventListener('pause', handlePause)

      return () => {
        video.removeEventListener('ended', handleEnded)
        video.removeEventListener('play', handlePlay)
        video.removeEventListener('pause', handlePause)
      }
    }
  }, [])

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
      >
        {/* Card Header */}
        <div className="flex items-center justify-between px-4 pt-2.5 pb-2">
          <div className="flex items-center gap-3">
            <img
              src={brandLogo}
              alt={brandName}
              className="w-7 h-7 rounded-lg object-cover"
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
            isLoading && "bg-gray-100 animate-pulse",
            type === "video" && "group",
          )}
          style={{
            paddingBottom: aspectRatio ? `${(1 / aspectRatio) * 100 + 4}%` : "104%"
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={type === "video" ? handleVideoClick : undefined}
        >
          {type === "image" ? (
            <div className="absolute inset-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] rounded-lg overflow-hidden">
              {blurDataUrl && !isImageLoaded && (
                <div
                  className="absolute inset-0 bg-cover bg-center blur-xl transform scale-110"
                  style={{ backgroundImage: `url(${blurDataUrl})` }}
                />
              )}
              <img
                ref={mediaRef as React.RefObject<HTMLImageElement>}
                src={src}
                alt={title}
                onLoad={() => setIsImageLoaded(true)}
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
                  !isImageLoaded && "opacity-0",
                  isImageLoaded && "opacity-100"
                )}
              />
            </div>
          ) : (
            <div className="absolute inset-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)]">
              <video
                ref={(el) => {
                  mediaRef.current = el
                  videoRef.current = el
                }}
                src={src}
                controls={isPlaying}
                preload="metadata"
                className={cn(
                  "w-full h-full object-cover rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
                  !isPlaying && !isHovered && "cursor-pointer"
                )}
                onClick={handleVideoClick}
                muted // Required for autoplay
              />
              {!isPlaying && !isHovered && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg transition-opacity"
                  onClick={handleVideoClick}
                >
                  <div className="transform hover:scale-110 transition-transform">
                    <PlayCircle className="w-16 h-16 text-white drop-shadow-lg" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Card Footer */}
        <div className="pt-1.5 pb-2 px-4">
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
    </>
  )
})