import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { X } from "lucide-react"
import { SearchTab } from "./tabs/search-tab"
import { ManualTab } from "./tabs/manual-tab"

interface AddBrandDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialTab?: "search" | "manual"
}

export function AddBrandDialog({ 
  open, 
  onOpenChange,
  initialTab = "search" 
}: AddBrandDialogProps) {
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)

  // Prevent initial animation
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setMounted(true)
      }, 0)
      return () => clearTimeout(timer)
    }
    setMounted(false)
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className={cn(
          "p-0 overflow-hidden transition-[transform,opacity]",
          !mounted && "opacity-0 scale-95",
          isMobile 
            ? "w-full h-[100dvh] max-w-full rounded-none border-0" 
            : "w-[640px] max-h-[85vh] rounded-2xl border border-gray-200/50"
        )}
      >
        <DialogTitle>
          <VisuallyHidden>Add Brand</VisuallyHidden>
        </DialogTitle>

        {/* Close Button */}
        <button 
          onClick={() => onOpenChange(false)}
          className="absolute top-6 right-6 z-50 p-2.5 rounded-xl bg-white/90 backdrop-blur-[2px] border border-gray-200/50 shadow-sm hover:bg-white transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Content */}
        <Tabs defaultValue={initialTab} className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-2 p-0 h-auto bg-transparent border-b border-gray-100">
            <TabsTrigger 
              value="search"
              className={cn(
                "flex-1 px-6 py-4 text-sm font-medium data-[state=active]:text-black data-[state=active]:shadow-none",
                "relative rounded-none border-0 bg-transparent hover:bg-transparent",
                "data-[state=active]:after:absolute data-[state=active]:after:bottom-0",
                "data-[state=active]:after:left-0 data-[state=active]:after:right-0",
                "data-[state=active]:after:h-0.5 data-[state=active]:after:bg-black"
              )}
            >
              Search Brand
            </TabsTrigger>
            <TabsTrigger 
              value="manual"
              className={cn(
                "flex-1 px-6 py-4 text-sm font-medium data-[state=active]:text-black data-[state=active]:shadow-none",
                "relative rounded-none border-0 bg-transparent hover:bg-transparent",
                "data-[state=active]:after:absolute data-[state=active]:after:bottom-0",
                "data-[state=active]:after:left-0 data-[state=active]:after:right-0",
                "data-[state=active]:after:h-0.5 data-[state=active]:after:bg-black"
              )}
            >
              Add Manually
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-auto">
            <TabsContent value="search" className="m-0 border-none outline-none">
              <SearchTab />
            </TabsContent>
            <TabsContent value="manual" className="m-0 border-none outline-none">
              <ManualTab onClose={() => onOpenChange(false)} />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}