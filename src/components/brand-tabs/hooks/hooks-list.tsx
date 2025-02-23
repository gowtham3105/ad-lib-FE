import { useState } from "react"
import { ChevronDown, ChevronUp, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Hook } from "@/lib/types"

interface HooksListProps {
  hooks: Hook[]
  selectedHook: Hook | null
  onSelectHook: (hook: Hook) => void
  sortBy: 'views' | 'date'
  onSortChange: (sort: 'views' | 'date') => void
  filterPlatform: string | null
  onFilterChange: (platform: string | null) => void
}

export function HooksList({
  hooks,
  selectedHook,
  onSelectHook,
  sortBy,
  onSortChange,
  filterPlatform,
  onFilterChange
}: HooksListProps) {
  const [expandedHook, setExpandedHook] = useState<number | null>(null)
  
  const truncateText = (text: string) => {
    if (text.length <= 40) return text
    return text.slice(0, 40) + '...'
  }

  return (
    <div className="w-[450px] flex-shrink-0 rounded-xl border border-gray-100/50 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
      <div className="px-6 h-14 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-medium text-gray-900">Hooks</h3>
          <div className="h-4 w-px bg-gray-200" />
          <span className="text-sm text-gray-500">{hooks.length} total</span>
        </div>
        <div className="flex items-center gap-2">
          <select 
            className="text-xs bg-transparent border-none outline-none cursor-pointer text-gray-600 font-medium"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as 'views' | 'date')}
          >
            <option value="views">Most Views</option>
            <option value="date">Latest</option>
          </select>
          <div className="h-4 w-px bg-gray-100" />
        </div>
      </div>
      <div className="overflow-auto h-[calc(100%-65px)] custom-scrollbar">
        {hooks.map((hook) => (
          <div 
            key={hook.id}
            className={cn(
              "flex flex-col hover:bg-[#f3f3f3] transition-all cursor-pointer group px-6 py-4 space-y-2.5",
              selectedHook?.id === hook.id && expandedHook !== hook.id && "bg-[#f9f9f9]"
            )}
            onClick={() => {
              onSelectHook(hook)
              setExpandedHook(null)
            }}
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="flex-1 flex items-center justify-between min-w-0">
                <div className="flex-1 min-w-0 py-0.5">
                  <span className="block text-sm text-gray-700 font-medium line-clamp-2">
                    {truncateText(hook.text)}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">Used {hook.count}x</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      const newExpandedHook = expandedHook === hook.id ? null : hook.id
                      setExpandedHook(newExpandedHook)
                      if (!newExpandedHook) {
                        onSelectHook(hook)
                      }
                    }}
                    className="p-1 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    {expandedHook === hook.id ? (
                      <ChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            {expandedHook === hook.id && (
              <div className="pl-7 space-y-3">
                <p className="text-sm text-gray-600">{hook.text}</p>
            
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}