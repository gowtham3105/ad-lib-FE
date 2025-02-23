import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@clerk/clerk-react"
import { Loader2 } from "lucide-react"
import { ProgressBar } from "./progress-bar"
import { HooksList } from "./hooks/hooks-list"
import { VideoPreview } from "./hooks/hooks-preview"

interface ApiHook {
  id: number
  text: string
  count: number,
  brand_id: string
  audio_url: string
}

interface HooksTabProps {
  showProgressBar?: boolean | null
}


export function HooksTab({ showProgressBar }: HooksTabProps) {
  const { brandId } = useParams()
  const { getToken } = useAuth()
  const [hooks, setHooks] = useState<ApiHook[]>([])
  const [sortBy, setSortBy] = useState<'views' | 'date'>('views')
  const [filterPlatform, setFilterPlatform] = useState<string | null>(null)
  const [selectedHook, setSelectedHook] = useState<ApiHook | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Sort and filter hooks
  const sortedAndFilteredHooks = [...hooks].sort((a, b) => {
    switch (sortBy) {
      case 'views':
        return b.count - a.count
      case 'date':
        return b.id - a.id
      default:
        return 0
    }
  })

  useEffect(() => {
    const fetchHooks = async () => {
      if (!brandId) return

      try {
        setLoading(true)
        const token = await getToken()
        const response = await fetch(`http://127.0.0.1:8080/transcript/brand/${brandId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) throw new Error('Failed to fetch hooks')

        const data: ApiHook[] = await response.json()
        setHooks(data)
        if (data.length > 0) {
          setSelectedHook(data[0])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load hooks')
      } finally {
        setLoading(false)
      }
    }


setSelectedHook(null)
    fetchHooks()
  }, [brandId, getToken])

  if (showProgressBar) {
    return (
      <ProgressBar onComplete={() => { }} duration={30000} />
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
    <div className="flex flex-col">
      <div className="flex gap-6 h-[calc(100vh-200px)]">
        <HooksList
          hooks={sortedAndFilteredHooks}
          selectedHook={selectedHook}
          onSelectHook={setSelectedHook}
          sortBy={sortBy}
          onSortChange={setSortBy}
          filterPlatform={filterPlatform}
          onFilterChange={setFilterPlatform}
        />
        <VideoPreview hook={selectedHook} />
      </div>
    </div>
  )
}