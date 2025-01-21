import { useState } from "react"
import { Copy, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

// Temporary mock data - will be replaced with API data
const mockHooks = [
  {
    id: "1",
    name: "Just Do It",
    useCount: 24,
    isFavorite: true
  },
  {
    id: "2",
    name: "Play With Fire",
    useCount: 18,
    isFavorite: false
  },
  {
    id: "3",
    name: "Step Into Greatness",
    useCount: 15,
    isFavorite: false
  }
]

export function HooksTab() {
  const { toast } = useToast()
  const [hooks, setHooks] = useState(mockHooks)

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

  return (
    <div className="rounded-xl border bg-white shadow-sm">
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
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Copy hook"
                  >
                    <Copy className="h-4 w-4 text-gray-500" />
                  </button>
                  <button
                    onClick={() => toggleFavorite(hook.id)}
                    className={cn(
                      "p-2 hover:bg-gray-100 rounded-lg transition-colors",
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