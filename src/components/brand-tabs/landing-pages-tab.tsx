import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAuth } from "@clerk/clerk-react"
import { Copy, ExternalLink, Download, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import type { LandingPage } from "@/lib/types"
import { ProgressBar } from "./progress-bar"


interface LandingPagesTabProps {
  showProgressBar?: boolean | null
}


export function LandingPagesTab({ showProgressBar }: LandingPagesTabProps) {
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

        const response = await fetch(`http://127.0.0.1:8080/landing-pages/${brandId}`, {
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

  if (showProgressBar) {
    return (
      <ProgressBar onComplete={() => {}} duration={30000}/>
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
      {/* Main Content */}
      <div className="flex gap-6 h-[calc(100vh-200px)]">
        {/* Left side - Landing pages list */}
        <div className="w-[400px] flex-shrink-0 rounded-xl border border-gray-100/50 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="px-6 h-14 flex items-center border-b">
            <h3 className="font-semibold">Landing Pages</h3>
          </div>
          <div className="overflow-auto h-[calc(100%-65px)] custom-scrollbar">
            {sortedPages.map((page) => (
              <div 
                key={page.id}
                className={cn(
                  "flex items-center hover:bg-[#f3f3f3] transition-all cursor-pointer group px-6 py-3.5",
                  selectedPage?.id === page.id && "bg-[#f9f9f9]"
                )}
                onClick={() => handlePageSelect(page)}
              >
                <div className="flex-1 flex items-center gap-3 min-w-0">
                  <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0 py-0.5">
                    <span className="block text-sm text-gray-600 truncate">
                      {page.url}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">{page.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Screenshot preview */}
        <div className="flex-1 rounded-xl border border-gray-100/50 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="px-6 h-14 flex items-center justify-between border-b">
            <div>
              <h3 className="font-semibold">Screenshot Preview</h3>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => selectedPage && handleCopyLink(selectedPage.url)}
                className="p-2.5 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors"
                title="Copy URL"
              >
                <Copy className="h-4 w-4 text-gray-600" />
              </button>
              <a
                href={selectedPage?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors"
                title="Visit page"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="relative p-6 h-[calc(100%-65px)] overflow-auto bg-[#f3f3f3] custom-scrollbar">
            {selectedPage ? (
              selectedPage.screenshot_url ? (
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
                <div className="h-full flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <img
                      src="https://i.ibb.co/DrTd1jz/Untitled-design.png"
                      alt="Juni Logo"
                      className="w-8 h-8 opacity-50"
                    />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Preview Not Available</h3>
                  <p className="text-gray-500 max-w-sm">
                    We're currently processing this landing page. Check back soon to see the preview.
                  </p>
                </div>
              )
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