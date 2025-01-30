import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAuth } from "@clerk/clerk-react"
import { Copy, ExternalLink, Download, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import type { LandingPage } from "@/lib/types"

export function LandingPagesTab() {
  const { toast } = useToast()
  const { brandId } = useParams()
  const { getToken } = useAuth()
  const [landingPages, setLandingPages] = useState<LandingPage[]>([])
  const [selectedPage, setSelectedPage] = useState<LandingPage | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  // Sort pages by count
  const sortedPages = [...landingPages].sort((a, b) => b.count - a.count)

  const maxUseCount = sortedPages[0]?.count || 0

  useEffect(() => {
    const fetchLandingPages = async () => {
      if (!brandId) return

      try {
        setLoading(true)
        setError(null)
        const token = await getToken()

        const response = await fetch(`http://127.0.0.1:8000/landing-pages/${brandId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch landing pages')
        }

        const data: LandingPage[] = await response.json()
        setLandingPages(data)
        if (data.length > 0) {
          setSelectedPage(data[0])
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load landing pages')
      } finally {
        setLoading(false)
      }
    }

    fetchLandingPages()
  }, [brandId, getToken])

  const handleCopyLink = async (url: string) => {
    await navigator.clipboard.writeText(url)
    toast({
      title: "Link copied",
      description: "The landing page URL has been copied to your clipboard",
    })
  }

  const handleDownloadScreenshot = async (screenshotUrl: string) => {
    try {
      const response = await fetch(screenshotUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `screenshot-${selectedPage?.id}.png`
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

  const handlePageSelect = (page: LandingPage) => {
    setSelectedPage(page)
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
      {/* Main Content */}
      <div className="flex gap-6 h-[calc(100vh-200px)]">
        {/* Left side - Landing pages list */}
        <div className="w-[400px] flex-shrink-0 rounded-xl border border-gray-100/50 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="font-semibold">Landing Pages</h3>
          </div>
          <div className="overflow-auto h-[calc(100%-65px)]">
            {sortedPages.map((page) => (
              <div
                key={page.id}
                className={cn(
                  "flex items-center hover:bg-[#f3f3f3] transition-all cursor-pointer group px-6 py-2.5",
                  selectedPage?.id === page.id && "bg-[#f9f9f9]"
                )}
                onClick={() => handlePageSelect(page)}
              >
                <div className="flex-1 flex items-center gap-3 min-w-0">
                  <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <span className="block text-sm text-gray-600 truncate">
                      {page.url}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{page.count}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCopyLink(page.url)
                      }}
                      className="p-1.5 hover:bg-gray-100 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                      title="Copy link"
                    >
                      <Copy className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Screenshot preview */}
        <div className="flex-1 rounded-xl border border-gray-100/50 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Screenshot Preview</h3>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={selectedPage?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-gray-50 hover:bg-gray-100 transition-all text-sm"
              >
                <ExternalLink className="h-4 w-4" />
                Visit Page
              </a>
            </div>
          </div>
          <div className="relative p-6 h-[calc(100%-65px)] overflow-auto bg-[#f3f3f3]">
            {selectedPage ? (
              <div className="relative">
                <img
                  src={selectedPage.screenshot_url}
                  alt={`Screenshot of ${selectedPage.url}`}
                  className="w-full h-auto rounded-lg border border-gray-100"
                />
                <button
                  onClick={() => selectedPage && handleDownloadScreenshot(selectedPage.screenshot_url)}
                  disabled={!selectedPage}
                  className="absolute left-4 bottom-4 p-2.5 rounded-xl bg-white/90 backdrop-blur-[2px] border border-gray-200/50 shadow-sm hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Download screenshot"
                >
                  <Download className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No screenshot available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}