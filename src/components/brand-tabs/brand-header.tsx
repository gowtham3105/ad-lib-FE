import { Globe, Facebook } from "lucide-react"
import type { Brand } from "@/data/brands"

interface BrandHeaderProps {
  brand: Brand
}

export function BrandHeader({ brand }: BrandHeaderProps) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center gap-4">
        <img 
          src={brand.logo}
          alt={brand.name}
          className="w-16 h-16 rounded-xl object-cover"
        />
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-900">{brand.name}</h1>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
            <p className="text-gray-500">{brand.media.length} ads tracked</p>
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