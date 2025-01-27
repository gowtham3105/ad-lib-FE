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

  // Sort pages by useCount in descending order
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
    <div className="flex flex-col gap-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 border border-gray-100/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Download className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="font-medium">Total Landing Pages</h4>
          </div>
          <div className="text-2xl font-semibold">{landingPages.length}</div>
        </div>
        
        <div className="bg-white rounded-xl p-6 border border-gray-100/50 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 rounded-lg">
              <Download className="w-5 h-5 text-purple-600" />
            </div>
            <h4 className="font-medium">Total Visits</h4>
          </div>
          <div className="text-2xl font-semibold">
            {landingPages.reduce((sum, page) => sum + page.count, 0).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex gap-6 h-[calc(100vh-420px)]">
        {/* Left side - Landing pages list */}
        <div className="w-[400px] flex-shrink-0 rounded-xl border border-gray-100/50 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <h3 className="font-semibold">Landing Pages</h3>
          </div>
          <div className="divide-y overflow-auto h-[calc(100%-57px)]">
            {sortedPages.map((page) => (
              <div 
                key={page.id}
                className={cn(
                  "flex items-center hover:bg-gray-50 transition-all cursor-pointer group",
                  selectedPage?.id === page.id && "bg-blue-50/50"
                )}
                onClick={() => handlePageSelect(page)}
              >
                {/* Usage comparison bar */}
                <div className="w-16 p-4 flex-shrink-0">
                  <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all bg-blue-500"
                      style={{
                        width: `${(page.count / maxUseCount) * 100}%`,
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
                    <span className="text-sm font-medium text-gray-600">{page.count}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleCopyLink(page.url)
                        }}
                        className="p-2 hover:text-gray-900 transition-colors"
                        title="Copy link"
                      >
                        <Copy className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Screenshot preview */}
        <div className="flex-1 rounded-xl border border-gray-100/50 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Screenshot Preview</h3>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={selectedPage?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all text-sm font-medium"
              >
                <ExternalLink className="h-4 w-4" />
                Visit Page
              </a>
              <button
                onClick={() => selectedPage && handleDownloadScreenshot(selectedPage.screenshot_url)}
                disabled={!selectedPage}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition-all hover:scale-[1.02] text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Download className="h-4 w-4" />
                Download
              </button>
            </div>
          </div>
          <div className="p-4 h-[calc(100%-73px)] overflow-auto">
            {selectedPage ? (
              <img
                src={selectedPage.screenshot_url}
                alt={`Screenshot of ${selectedPage.url}`}
                className="w-full h-auto rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-lg transition-shadow"
              />
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