import { useState } from "react"
import { cn } from "@/lib/utils"

export function MediaViewer() {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <div className="h-full overflow-y-auto">
      <div className={cn(
        "flex items-center justify-center min-h-full p-8 pt-24 pb-2",
        !isLoaded && "bg-gray-50"
      )}>
        <img 
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"
          alt="Swiggy food delivery advertisement"
          className={cn(
            "max-w-full max-h-full w-auto h-auto rounded-2xl shadow-sm object-contain transition-opacity duration-200",
            !isLoaded && "opacity-0"
          )}
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </div>
  )
}