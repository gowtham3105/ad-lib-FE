import { Copy, Volume2, Loader2, AlertCircle } from "lucide-react"
import type { Hook } from "@/lib/types"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface VideoPreviewProps {
  hook: Hook | null
}

export function VideoPreview({ hook }: VideoPreviewProps) {
  const { toast } = useToast()
  const [isLandscape, setIsLandscape] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleCopyHook = async (description: string) => {
    await navigator.clipboard.writeText(description)
    toast({
      title: "Hook copied",
      description: "The hook text has been copied to your clipboard",
    })
  }

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    setError('Failed to load video')
    setIsLoading(false)
  }

  const handleVideoLoad = () => {
    setIsLoading(false)
    setError(null)
  }

  const handleVideoLoadStart = () => {
    setIsLoading(true)
  }

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.target as HTMLVideoElement
    if (video.videoWidth > video.videoHeight) {
      setIsLandscape(true)
    }
  }

  return (
    <div className="flex-1 rounded-xl border border-gray-100/50 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
      <div className="px-6 h-14 flex items-center justify-between border-b">
        <div className="flex items-center gap-3">
          <h3 className="font-semibold">Preview</h3>
        </div>
        {hook && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleCopyHook(hook.text)}
              className="p-2.5 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors"
              title="Copy Hook"
            >
              <Copy className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        )}
      </div>
      <div className="relative p-6 h-[calc(100%-65px)] overflow-auto bg-[#f3f3f3] custom-scrollbar">
        {hook ? (
          <div className="relative">
            <div className="flex flex-col gap-6">
              <div className="relative rounded-lg">
                <div className={cn(
                  "mx-auto w-fit"
                )}>
                  <div className={cn("flex items-center justify-center h-[calc(100vh-320px)]")}>
                    <div className={cn(
                      "relative",
                      "bg-gray-50 rounded-lg overflow-hidden",
                      !isLandscape && "max-w-[400px]"
                    )}>
                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                        <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                      </div>
                    )}
                    {error && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-50 text-gray-500">
                        <AlertCircle className="w-8 h-8" />
                        <p className="text-sm">{error}</p>
                      </div>
                    )}
                    <video 
                      controls
                      playsInline
                      className="w-full h-auto" 
                      src={hook.audio_url}
                      onLoadedMetadata={handleLoadedMetadata}
                      onLoadedData={handleVideoLoad}
                      onLoadStart={handleVideoLoadStart}
                      onError={handleVideoError}
                    >
                      Your browser does not support the video element.
                    </video>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No content selected
          </div>
        )}
      </div>
    </div>
  )
}