import { useState, useEffect, useRef } from "react"
import { useParams } from "react-router-dom"
import { Copy, Volume2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { useAuth } from "@clerk/clerk-react"
import { Loader2, Pause } from "lucide-react"
import type { BrandDetails } from "@/lib/types"

interface ApiHook {
  id: number
  text: string
  count: number
  audio_url: string
}

interface HooksTabProps {
  brandDetails?: BrandDetails | null
}

const highlightKeywords = (text: string, keywords: string[]) => {
  const regex = new RegExp(`(${keywords.join('|')})`, 'gi')
  return text.split(regex).map((part, i) =>
    keywords.includes(part.toLowerCase()) ? (
      <span key={i} className="text-blue-600 font-medium">{part}</span>
    ) : (
      part
    )
  )
}

export function HooksTab({ brandDetails }: HooksTabProps) {
  const { toast } = useToast()
  const { brandId } = useParams()
  const { getToken } = useAuth()
  const [hooks, setHooks] = useState<{ 
    id: string
    name: string 
    useCount: number
    isFavorite: boolean
    audioUrl: string
  }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [playingHookId, setPlayingHookId] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handlePlayAudio = (hookId: string, audioUrl: string) => {
    if (playingHookId === hookId) {
      if (audioRef.current) {
        try {
          audioRef.current.pause()
          audioRef.current.currentTime = 0
        } catch (error) {
          console.warn("Error stopping audio:", error)
        }
        setPlayingHookId(null)
      }
      return
    }

    // Stop any currently playing audio
    if (audioRef.current) {
      try {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      } catch (error) {
        console.warn("Error stopping audio:", error)
      }
    }

    // Create or reuse audio element
    if (!audioRef.current) {
      audioRef.current = new Audio()
      audioRef.current.addEventListener('ended', () => {
        setPlayingHookId(null)
      })
    }

    // Check audio format support
    const canPlayAudio = () => {
      const audio = document.createElement('audio')
      return audio.canPlayType('audio/mpeg') !== "" || 
             audio.canPlayType('audio/wav') !== "" ||
             audio.canPlayType('audio/ogg') !== ""
    }

    // Attempt to play audio with better error handling
    try {
      if (!canPlayAudio()) {
        throw new Error("Audio format not supported by browser")
      }

      audioRef.current.src = audioUrl
      const playPromise = audioRef.current.play()
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setPlayingHookId(hookId)
          })
          .catch(error => {
            console.warn("Audio playback failed:", error)
            toast({
              title: "Audio Unavailable",
              description: "The audio preview is currently unavailable. Please try again later.",
              variant: "destructive"
            })
          })
      }
    } catch (error) {
      console.warn("Audio setup failed:", error)
      toast({
        title: "Audio Unsupported",
        description: "Your browser doesn't support this audio format.",
        variant: "destructive"
      })
    }
  }

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ""
      }
    }
  }, [])

  useEffect(() => {
    const fetchHooks = async () => {
      if (!brandId) return
      
      try {
        setLoading(true)
        const token = await getToken()
        // http://localhost:8000/transcript/brand/:external_id
        const response = await fetch(`http://127.0.0.1:8000/transcript/brand/${brandId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) throw new Error('Failed to fetch hooks')
        
        const data: ApiHook[] = await response.json()
        setHooks(data.map(hook => ({
          id: hook.id.toString(),
          name: hook.text,
          useCount: hook.count,
          audioUrl: hook.audio_url,
          isFavorite: false,
        })))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load hooks')
      } finally {
        setLoading(false)
      }
    }

    fetchHooks()
  }, [brandId, getToken])

  const sortedHooks = [...hooks].sort((a, b) => b.useCount - a.useCount)
  const maxUseCount = sortedHooks[0]?.useCount || 1

  const getUsageColor = (count: number) => {
    if (count >= 1000) return "bg-blue-50 text-blue-600"
    if (count >= 500) return "bg-purple-50 text-purple-600"
    if (count >= 250) return "bg-pink-50 text-pink-600"
    if (count >= 100) return "bg-orange-50 text-orange-600"
    if (count >= 50) return "bg-green-50 text-green-600"
    return "bg-gray-50 text-gray-600"
  }

  const handleCopyHook = async (hook: string) => {
    await navigator.clipboard.writeText(hook)
    toast({
      description: "Hook copied to clipboard",
      className: "bg-black text-white border-none",
    })
  }

  const toggleFavorite = (id: string) => {
    setHooks(hooks =>
      hooks.map(hook =>
        hook.id === id
          ? { ...hook, isFavorite: !hook.isFavorite }
          : hook
      )
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-300px)]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-300px)] text-red-500">
        {error}
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-900 font-switzer">Ad Hook Library</h1>
        <p className="text-gray-600 mt-2 font-switzer">Explore and manage your marketing hooks</p>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-3">
        {sortedHooks.map((hook, index) => (
          <div 
            key={hook.id}
            className="break-inside-avoid mb-4"
          >
            <div className="bg-white rounded-xl overflow-hidden border border-gray-100/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:translate-y-[-2px)]">
              <div className="p-4 pb-2">
                {brandDetails && (
                  <div className="flex items-center gap-2 mb-3">
                    <img 
                      src={brandDetails.logo}
                      alt={`${brandDetails.name} logo`}
                      className="h-6 w-auto rounded-sm"
                    />
                  </div>
                )}

                <div className="text-gray-900 font-switzer text-base">
                  {highlightKeywords(hook.name, ['mom', 'low fees', 'brazil', 'family'])}
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className={cn(
                    "text-xs font-medium px-2 py-1 rounded-full",
                    getUsageColor(hook.useCount)
                  )}>
                    Used {hook.useCount} times
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handlePlayAudio(hook.id, hook.audioUrl)}
                      className={cn(
                        "p-1.5 hover:bg-gray-50 rounded-full transition-colors",
                        playingHookId === hook.id && "text-blue-600 bg-blue-50 hover:bg-blue-100"
                      )}
                      title={playingHookId === hook.id ? "Stop" : "Play"}
                    >
                      {playingHookId === hook.id ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => handleCopyHook(hook.name)}
                      className="p-1.5 hover:bg-gray-50 rounded-full transition-colors"
                      title="Copy hook"
                    >
                      <Copy className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}