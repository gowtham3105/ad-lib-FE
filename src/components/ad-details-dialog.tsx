import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { 
  X, Share2, Download, Image, ExternalLink, Facebook, 
  Instagram, MessageCircle, ChevronLeft, ChevronRight,
  Flag, BookmarkPlus, Globe, Calendar, Clock, Activity
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { Separator } from "@/components/ui/separator"

interface AdDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  adId: string
}

export function AdDetailsDialog({ open, onOpenChange, adId }: AdDetailsDialogProps) {
  const { toast } = useToast()

  // Handle keyboard navigation
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        console.log('Navigate to previous')
      } else if (e.key === 'ArrowRight') {
        console.log('Navigate to next')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  const handleReport = () => {
    toast({
      title: "Report submitted",
      description: "Thank you for helping us maintain quality content",
    })
  }

  const handleSaveToCollection = () => {
    toast({
      title: "Saved to collection",
      description: "Ad has been added to your collection",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl w-[95vw] p-0">
        <DialogTitle className="sr-only">Ad Details</DialogTitle>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <img 
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=100&auto=format&fit=crop"
              alt="Brand Logo"
              className="w-8 h-8 rounded-lg"
            />
            <div className="flex flex-col">
              <span className="font-medium text-[15px]">Swiggy</span>
              <span className="text-sm text-gray-500">Food Delivery</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button 
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
              aria-label="Share ad"
            >
              <Share2 className="w-5 h-5 text-gray-700" />
            </button>
            <button 
              onClick={() => onOpenChange(false)}
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        <div className="flex h-[80vh] relative">
          {/* Navigation Buttons */}
          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 bg-white hover:bg-gray-50 rounded-full shadow-lg transition-all hover:scale-105 z-10 group border border-gray-100"
            aria-label="View previous ad"
          >
            <ChevronLeft className="w-5 h-5 text-gray-700" />
            <span className="sr-only">Previous</span>
          </button>
          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-white hover:bg-gray-50 rounded-full shadow-lg transition-all hover:scale-105 z-10 group border border-gray-100"
            aria-label="View next ad"
          >
            <ChevronRight className="w-5 h-5 text-gray-700" />
            <span className="sr-only">Next</span>
          </button>

          {/* Main Content */}
          <div className="flex-1 bg-white flex items-center justify-center p-8">
            <img 
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"
              alt="Swiggy food delivery advertisement"
              className="max-h-full w-auto rounded-2xl shadow-sm"
            />
          </div>

          {/* Sidebar */}
          <aside className="w-[400px] border-l border-gray-100 flex flex-col bg-white" role="complementary" aria-label="Ad details">
            {/* Details Section */}
            <div className="flex-1 overflow-y-auto">
              <nav className="p-6 space-y-8">
                {/* Primary Information */}
                <section aria-labelledby="ad-copy-heading">
                  <h2 id="ad-copy-heading" className="text-[15px] font-semibold mb-4">Ad Content</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Message</h3>
                      <p className="text-[15px] text-gray-900 leading-relaxed">
                        Biryani that's hotter than trending reels? Get it in 10 minutes.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Call to Action</h3>
                      <span className="inline-flex px-3 py-1.5 bg-gray-50 text-gray-900 rounded-lg text-sm font-medium">
                        Order Now
                      </span>
                    </div>
                  </div>
                </section>

                <Separator className="my-6 bg-gray-100" />

                {/* Destination */}
                <section aria-labelledby="destination-heading">
                  <h2 id="destination-heading" className="text-[15px] font-semibold mb-4">Destination</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Landing Page</h3>
                      <a 
                        href="https://play.google.com/store/apps/details?id=in.swiggy.android"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 text-sm text-[rgb(233,128,116)] hover:text-[rgb(225,95,80)]"
                      >
                        <Globe className="w-4 h-4" />
                        <span className="underline-offset-4 group-hover:underline">play.google.com</span>
                        <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </div>
                  </div>
                </section>

                <Separator className="my-6 bg-gray-100" />

                {/* Campaign Details */}
                <section aria-labelledby="campaign-heading">
                  <h2 id="campaign-heading" className="text-[15px] font-semibold mb-4">Campaign Details</h2>
                  <div className="space-y-6">
                    <div className="grid gap-4">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <div>
                          <dt className="text-sm font-medium text-gray-700">Campaign Period</dt>
                          <dd className="text-sm text-gray-600">Jan 10, 2024 - Jan 12, 2024</dd>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <div>
                          <dt className="text-sm font-medium text-gray-700">Duration</dt>
                          <dd className="text-sm text-gray-600">2 Days</dd>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Activity className="w-4 h-4 text-gray-500" />
                        <div>
                          <dt className="text-sm font-medium text-gray-700">Status</dt>
                          <dd className="inline-flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-[rgb(233,128,116)]"></span>
                            <span className="text-sm text-gray-900">Active</span>
                          </dd>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-3">Platforms</h3>
                      <div className="flex flex-wrap gap-2">
                        {[
                          { icon: Facebook, name: "Facebook" },
                          { icon: Instagram, name: "Instagram" },
                          { icon: MessageCircle, name: "Messenger" }
                        ].map((platform) => (
                          <div 
                            key={platform.name}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 rounded-lg text-sm text-gray-900"
                          >
                            <platform.icon className="w-4 h-4 text-gray-600" />
                            <span>{platform.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                <Separator className="my-6 bg-gray-100" />

                {/* Quick Actions */}
                <section aria-labelledby="actions-heading">
                  <h2 id="actions-heading" className="text-[15px] font-semibold mb-4">Quick Actions</h2>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { icon: Download, label: "Download", action: () => {} },
                        { icon: Image, label: "Thumbnail", action: () => {} },
                        { icon: ExternalLink, label: "View LP", action: () => {} }
                      ].map((action) => (
                        <button
                          key={action.label}
                          onClick={action.action}
                          className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                          aria-label={action.label}
                        >
                          <action.icon className="w-5 h-5 text-gray-600 group-hover:text-gray-900" />
                          <span className="text-xs text-gray-600 group-hover:text-gray-900">{action.label}</span>
                        </button>
                      ))}
                    </div>
                    
                    <button 
                      className="w-full px-4 py-2.5 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors font-medium text-[15px]"
                    >
                      Add to Board
                    </button>
                  </div>
                </section>
              </nav>
            </div>

            {/* Bottom Actions */}
            <footer className="border-t border-gray-100 p-4">
              <div className="flex items-center justify-between">
                <button 
                  onClick={handleSaveToCollection}
                  className="inline-flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors text-sm font-medium"
                  aria-label="Save to collection"
                >
                  <BookmarkPlus className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button 
                  onClick={handleReport}
                  className="inline-flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg transition-colors text-sm text-gray-600"
                  aria-label="Report ad"
                >
                  <Flag className="w-4 h-4" />
                  <span>Report</span>
                </button>
              </div>
            </footer>
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  )
}