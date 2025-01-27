import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Copy, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { useAuth } from "@clerk/clerk-react"
import { Loader2 } from "lucide-react"

interface ApiHook {
  id: number
  text: string
  count: number
}

export function HooksTab() {
  const { toast } = useToast()
  const { brandId } = useParams()
  const { getToken } = useAuth()
  const [hooks, setHooks] = useState<{ id: string; name: string; useCount: number; isFavorite: boolean }[]>([])
  const [selectedHook, setSelectedHook] = useState<{ id: string; name: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHooks = async () => {
      if (!brandId) return
      
      try {
        setLoading(true)
        setError(null)
        const token = await getToken()
        
        const response = await fetch(`http://localhost:8000/transcript/brand/${brandId}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch hooks')
        }

        const data: ApiHook[] = await response.json()
        setHooks(data.map(hook => ({
          id: hook.id.toString(),
          name: hook.text,
          useCount: hook.count,
          isFavorite: false
        })))
        if (data.length > 0) {
          setSelectedHook({
            id: data[0].id.toString(),
            name: data[0].text
          })
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load hooks')
      } finally {
        setLoading(false)
      }
    }

    fetchHooks()
  }, [brandId, getToken])

  // Sort hooks by useCount in descending order
  const sortedHooks = [...hooks].sort((a, b) => b.useCount - a.useCount)
  const maxUseCount = sortedHooks[0]?.useCount || 0

  const handleCopyHook = async (hook: string) => {
    await navigator.clipboard.writeText(hook)
    toast({
      title: "Hook copied",
      description: "The advertising hook has been copied to your clipboard",
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
    <div className="rounded-xl border border-gray-100/50 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
      <div className="p-4 border-b">
        <h3 className="font-semibold">Ad Hooks</h3>
      </div>
      <div className="divide-y">
        {sortedHooks.map((hook) => (
          <div 
            key={hook.id}
            className="flex items-center hover:bg-gray-50 transition-colors"
          >
            {/* Usage comparison bar */}
            <div className="w-16 p-4 flex-shrink-0">
              <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full"
                  style={{ 
                    width: `${(hook.useCount / maxUseCount) * 100}%`,
                    transition: 'width 0.3s ease-in-out'
                  }}
                />
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex items-center gap-4 p-4 min-w-0">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 truncate">
                  {hook.name}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-600">{hook.useCount}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyHook(hook.name)}
                    className="p-2 hover:text-gray-900 transition-colors"
                    title="Copy hook"
                  >
                    <Copy className="h-4 w-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => toggleFavorite(hook.id)}
                    className={cn(
                      "p-2 hover:text-gray-900 transition-colors",
                      hook.isFavorite && "text-yellow-500"
                    )}
                    title={hook.isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Star className="h-4 w-4" fill={hook.isFavorite ? "currentColor" : "none"} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}