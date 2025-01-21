import { Globe, Facebook, TrendingUp, Filter } from "lucide-react"
import { useAuth } from "@clerk/clerk-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState, useEffect } from "react"
import type { BrandDetails } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"

interface BrandHeaderProps {
  brandId: string
}

export function BrandHeader({ brandId }: BrandHeaderProps) {
  const { getToken } = useAuth()
  const [brand, setBrand] = useState<BrandDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBrandDetails = async () => {
      try {
        setLoading(true)
        setError(null)
        const token = await getToken()

        const response = await fetch(`http://127.0.0.1:8000/brand/view/${brandId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!response.ok) {
          throw new Error('Failed to fetch brand details')
        }

        const data: BrandDetails = await response.json()
        setBrand(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load brand details')
      } finally {
        setLoading(false)
      }
    }

    fetchBrandDetails()
  }, [brandId])

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <Skeleton className="w-16 h-16 rounded-xl" />
          <div className="flex-1">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-96 mb-4" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl p-6 border border-red-100 shadow-sm">
        <div className="text-red-600">{error}</div>
      </div>
    )
  }

  if (!brand) return null

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center gap-4">
        <img 
          src={brand.logo}
          alt={brand.name}
          className="w-16 h-16 rounded-xl object-cover ring-2 ring-red-50"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            {brand.name}
            <Tooltip>
              <TooltipTrigger asChild>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Ad activity trending up 23% this month</p>
              </TooltipContent>
            </Tooltip>
          </h1>
          <p className="text-gray-500 mt-1">Get a complete overview of {brand.name}'s Facebook ad strategy</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
            {'ad_count' in brand && brand.ad_count !== null && brand.ad_count !== "" && (
              <button 
                onClick={() => {}} 
                className="inline-flex items-center gap-1.5 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <span className="font-medium">{brand.ad_count} ads tracked</span>
                <Filter className="w-4 h-4" />
              </button>
            )}
            <div className="flex items-center gap-3">
              {brand.website && (
                <a
                  href={brand.website.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-sm">{brand.website.text}</span>
                </a>
              )}
              {brand.facebook && (
                <a
                  href={brand.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                  <span className="text-sm">{brand.facebook.text}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}