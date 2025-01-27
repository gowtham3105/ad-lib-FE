import { useState, useCallback, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@clerk/clerk-react"
import { Search, Loader2, ChevronDown, Heart, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample suggestions data
const SAMPLE_SUGGESTIONS = [
  {
    id: "1",
    name: "RYZE Superfoods",
    logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=100&auto=format&fit=crop",
    count: 41316
  },
  {
    id: "2",
    name: "PetLab Co.",
    logo: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=100&auto=format&fit=crop",
    count: 21428
  },
  {
    id: "3",
    name: "Hismile",
    logo: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=100&auto=format&fit=crop",
    count: 20068
  },
  {
    id: "4",
    name: "hims",
    logo: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=100&auto=format&fit=crop",
    count: 8804
  },
  {
    id: "5",
    name: "Dr. Squatch",
    logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=100&auto=format&fit=crop",
    count: 10671
  },
  {
    id: "6",
    name: "AC1 by Athletic Greens",
    logo: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=100&auto=format&fit=crop",
    count: 7173
  }
]

// Sample recommended brands
const RECOMMENDED_BRANDS = [
  {
    id: "7",
    name: "Nooro",
    logo: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=100&auto=format&fit=crop",
    count: 7302,
    growth: "+156%"
  },
  {
    id: "8",
    name: "Happy Mammoth",
    logo: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=100&auto=format&fit=crop",
    count: 21361,
    growth: "+89%"
  },
  {
    id: "9",
    name: "Ritual",
    logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=100&auto=format&fit=crop",
    count: 15234,
    growth: "+67%"
  }
]

interface Suggestion {
  id: string
  name: string
  logo: string
  count: number
  growth?: string
}

export function BrandSearch() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const { getToken } = useAuth()
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showDropdown, setShowDropdown] = useState(true) // Show by default for recommendations
  const searchInputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const getSuggestions = useCallback(async (query: string) => {
    setIsSearching(true)
    setShowDropdown(true)
    const token = await getToken();

      fetch(`http://127.0.0.1:8000/brand/search?q=${query}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch brand suggestions')
          }
          return response.json()
        })
        .then(data => {
          setSuggestions(data)
          setIsSearching(false)
        })
    
    // // Simulate API call
    // setTimeout(() => {
    //   const filteredSuggestions = SAMPLE_SUGGESTIONS.filter(suggestion => 
    //     suggestion.name.toLowerCase().includes(query.toLowerCase())
    //   )
    //   setSuggestions(filteredSuggestions)
    //   setIsSearching(false)
    // }, 300)
  }, [])

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    
    if (query.length >= 2) {
      getSuggestions(query)
    } else {
      setSuggestions([])
    }
  }

  const handleSearchClick = () => {
    if (searchQuery.length >= 2) {
      getSuggestions(searchQuery)
    }
  }

  const handleSuggestionClick = (suggestion: Suggestion) => {

    //add brand to user's saved brands list

    navigate(`/track-brands/${suggestion.id}`)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Focus input on mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <Input
            ref={searchInputRef}
            type="text"
            placeholder="Search brands..."
            value={searchQuery}
            onChange={handleSearch}
            className="pl-10 pr-4 h-12 text-base"
            onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
            onFocus={() => setShowDropdown(true)}
          />
        </div>
        
        {/* Suggestions dropdown */}
        {showDropdown && (
          <div 
            ref={dropdownRef}
            className="absolute left-0 right-0 z-10 mt-2 rounded-lg border border-gray-200 bg-white shadow-lg overflow-hidden"
          >
            {isSearching ? (
              <div className="p-8 text-center text-gray-500 flex flex-col items-center gap-3">
                <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                <p>Searching for brands...</p>
              </div>
            ) : suggestions.length > 0 ? (
              <ul className="max-h-[calc(100vh-400px)] overflow-auto divide-y divide-gray-100">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.id}
                    className="cursor-pointer hover:bg-gray-50 transition-colors"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <div className="p-4 flex items-center gap-4">
                      <Avatar className="h-12 w-12 rounded-lg">
                        <AvatarImage src={suggestion.logo} alt={suggestion.name} />
                        <AvatarFallback className="rounded-lg">
                          {suggestion.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-base">{suggestion.name}</div>
                        <div className="text-sm text-gray-500">
                          {suggestion.count.toLocaleString()} ads
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : searchQuery.length >= 2 ? (
              <div className="p-8 text-center text-gray-500">
                <p className="mb-2">No brands found</p>
                <p className="text-sm">Try searching with a different name or URL</p>
              </div>
            ) : (
              // Recommended Brands Section
              <div>
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-900">Recommended Brands</span>
                  </div>
                </div>
                <ul className="divide-y divide-gray-100">
                  {RECOMMENDED_BRANDS.map((brand) => (
                    <li
                      key={brand.id}
                      className="cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => handleSuggestionClick(brand)}
                    >
                      <div className="p-4 flex items-center gap-4">
                        <Avatar className="h-12 w-12 rounded-lg">
                          <AvatarImage src={brand.logo} alt={brand.name} />
                          <AvatarFallback className="rounded-lg">
                            {brand.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-base">{brand.name}</div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                              {brand.count.toLocaleString()} ads
                            </span>
                            <span className="text-xs text-green-600 font-medium">
                              {brand.growth}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Location Selector */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Location</label>
        <button
          type="button"
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-gray-200" />
            <span className="text-sm font-medium">Default Folder</span>
          </div>
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </button>
      </div>

      {/* Credits Display */}
      <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-lg">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <Heart className="h-4 w-4 text-gray-500" />
        </div>
        <div className="text-sm font-medium">0/2 credits</div>
      </div>
    </div>
  )
}