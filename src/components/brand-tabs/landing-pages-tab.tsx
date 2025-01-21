import { useState } from "react"
import { Copy, Star, ExternalLink, Download, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { generateScreenshot } from "@/lib/screenshot-service"

// Temporary mock data - will be replaced with API data
const mockLandingPages = [
  {
    id: "1",
    url: "https://nike.com/air-max-2024",
    useCount: 15,
    isFavorite: false
  },
  {
    id: "2",
    url: "https://nike.com/running-collection",
    useCount: 8,
    isFavorite: true
  },
  {
    id: "3",
    url: "https://nike.com/summer-essentials",
    useCount: 12,
    isFavorite: false
  }
]

interface Screenshot {
  url: string
  imageUrl: string
  timestamp: string
}

export function LandingPagesTab() {
  const { toast } = useToast()
  const [landingPages, setLandingPages] = useState(mockLandingPages)
  const [selectedPage, setSelectedPage] = useState(mockLandingPages[0])
  const [screenshots, setScreenshots] = useState<Record<string, Screenshot>>({})
  const [isGenerating, setIsGenerating] = useState(false)

  // Sort pages by useCount in descending order
  const sortedPages = [...landingPages].sort((a, b) => b.useCount - a.useCount)
  const maxUseCount = sortedPages[0]?.useCount || 0

  const handleCopyLink = async (url: string) => {
    await navigator.clipboard.writeText(url)
    toast({
      title: "Link copied",
      description: "The landing page URL has been copied to your clipboard",
    })
  }

  const handleDownloadScreenshot = async () => {
    const screenshot = screenshots[selectedPage.url]
    if (!screenshot) return

    try {
      const response = await fetch(screenshot.imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `screenshot-${selectedPage.id}.png`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      toast({
        title: "Download started",
        description: "The screenshot is being downloaded",
      })
    } catch (error) {
      toast({
        title: "Download failed",
        description: "Failed to download the screenshot",
        variant: "destructive"
      })
    }
  }

  const toggleFavorite = (id: string) => {
    setLandingPages(pages =>
      pages.map(page =>
        page.id === id
          ? { ...page, isFavorite: !page.isFavorite }
          : page
      )
    )
  }

  const handlePageSelect = async (page: typeof mockLandingPages[0]) => {
    setSelectedPage(page)
    
    // If we don't have a screenshot for this URL yet, generate one
    if (!screenshots[page.url]) {
      setIsGenerating(true)
      try {
        const screenshot = await generateScreenshot(page.url)
        setScreenshots(prev => ({
          ...prev,
          [page.url]: screenshot
        }))
      } catch (error) {
        toast({
          title: "Screenshot generation failed",
          description: "Failed to generate the page screenshot",
          variant: "destructive"
        })
      } finally {
        setIsGenerating(false)
      }
    }
  }

  return (
    <div className="flex gap-6 h-[calc(100vh-300px)]">
      {/* Left side - Landing pages list */}
      <div className="w-[400px] flex-shrink-0 rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <h3 className="font-semibold">Landing Pages</h3>
        </div>
        <div className="divide-y overflow-auto h-[calc(100%-57px)]">
          {sortedPages.map((page) => (
            <div 
              key={page.id}
              className={cn(
                "flex items-center hover:bg-gray-50 transition-colors cursor-pointer",
                selectedPage.id === page.id && "bg-gray-50"
              )}
              onClick={() => handlePageSelect(page)}
            >
              {/* Usage comparison bar */}
              <div className="w-16 p-4 flex-shrink-0">
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full"
                    style={{ 
                      width: `${(page.useCount / maxUseCount) * 100}%`,
                      transition: 'width 0.3s ease-in-out'
                    }}
                  />
                </div>
              </div>

              {/* Main content */}
              <div className="flex-1 flex items-center gap-4 p-4 min-w-0">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600 hover:text-blue-800 font-medium truncate">
                      {page.url}
                    </span>
                    <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-600">{page.useCount}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCopyLink(page.url)
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Copy link"
                    >
                      <Copy className="h-4 w-4 text-gray-500" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(page.id)
                      }}
                      className={cn(
                        "p-2 hover:bg-gray-100 rounded-lg transition-colors",
                        page.isFavorite && "text-yellow-500"
                      )}
                      title={page.isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Star className="h-4 w-4" fill={page.isFavorite ? "currentColor" : "none"} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right side - Screenshot preview */}
      <div className="flex-1 rounded-xl border bg-white shadow-sm overflow-hidden">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold">Screenshot Preview</h3>
          <div className="flex items-center gap-2">
            <a
              href={selectedPage.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              <ExternalLink className="h-4 w-4" />
              Visit Page
            </a>
            <button
              onClick={handleDownloadScreenshot}
              disabled={!screenshots[selectedPage.url] || isGenerating}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
          </div>
        </div>
        <div className="p-4 h-[calc(100%-73px)] overflow-auto">
          {isGenerating ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-500">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p>Generating screenshot...</p>
            </div>
          ) : screenshots[selectedPage.url] ? (
            <img
              src={screenshots[selectedPage.url].imageUrl}
              alt={`Screenshot of ${selectedPage.url}`}
              className="w-full h-auto rounded-lg border border-gray-200"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a page to view its screenshot
            </div>
          )}
        </div>
      </div>
    </div>
  )
}