import { PageHeader } from "@/components/page-header"
import { Input } from "@/components/ui/input"
import { useState, useCallback, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { Search, Globe, Facebook } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample suggestions data
const SAMPLE_SUGGESTIONS = [
  {
    id: "1",
    name: "Nike",
    logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=100&auto=format&fit=crop",
    totalAds: 156
  },
  {
    id: "2",
    name: "Adidas",
    logo: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=100&auto=format&fit=crop",
    totalAds: 89
  },
  {
    id: "3",
    name: "Puma",
    logo: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=100&auto=format&fit=crop",
    totalAds: 42
  },
  {
    id: "4",
    name: "Under Armour",
    logo: "https://images.unsplash.com/photo-1556906781-9a412961c28c?q=80&w=100&auto=format&fit=crop",
    totalAds: 73
  }
]

interface Suggestion {
  id: string
  name: string
  logo: string
  totalAds: number
}

export function AddBrandPage() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const getSuggestions = useCallback((query: string) => {
    setIsSearching(true)
    
    setTimeout(() => {
      const filteredSuggestions = SAMPLE_SUGGESTIONS.filter(suggestion => 
        suggestion.name.toLowerCase().includes(query.toLowerCase())
      )
      setSuggestions(filteredSuggestions)
      setIsSearching(false)
    }, 300)
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
    navigate(`/track-brands/${suggestion.id}`)
  }

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [])

  return (
    <div className="flex flex-col gap-4 p-4">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <PageHeader />
      </header>
      <div className="w-full pt-4 md:pt-8">
        {/* Search Section */}
        <div className="relative">
          <p className="text-center text-gray-600 mb-4 px-4">
            Search for a brand by name, website, or Facebook page URL
          </p>
          <div className="relative w-[90%] sm:w-[80%] md:max-w-xl mx-auto flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                ref={searchInputRef}
                type="text"
                placeholder="Start typing to search..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10 pr-4 h-12 text-base sm:text-lg"
                onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
              />
            </div>
            <button
              onClick={handleSearchClick}
              className="h-12 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-2 font-medium px-4 sm:px-6"
            >
              <Search className="h-5 w-5" />
              <span>Search</span>
            </button>
          </div>
          
          {/* Suggestions dropdown */}
          {(suggestions.length > 0 || isSearching) && (
            <div className="absolute left-1/2 -translate-x-1/2 z-10 mt-2 w-[90%] sm:w-[80%] md:max-w-xl rounded-lg border border-gray-200 bg-white shadow-lg">
              {isSearching ? (
                <div className="p-4 text-center text-sm text-gray-500">
                  Searching...
                </div>
              ) : (
                <ul className="max-h-[calc(100vh-300px)] overflow-auto py-2">
                  {suggestions.map((suggestion) => (
                    <li
                      key={suggestion.id}
                      className="cursor-pointer px-4 py-3 hover:bg-gray-50 transition-colors"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={suggestion.logo} alt={suggestion.name} />
                          <AvatarFallback>
                            {suggestion.name.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-base">{suggestion.name}</div>
                          <div className="text-sm text-gray-500">
                            {suggestion.totalAds.toLocaleString()} ads saved
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Search Guide */}
          <div className="mt-8 md:mt-12">
            <div className="bg-white rounded-xl p-6 md:p-8 border border-gray-100 w-[90%] sm:w-[80%] md:max-w-3xl mx-auto">
              <h3 className="text-lg font-semibold mb-6 text-center">How to Find a Brand</h3>
              
              <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
                {/* Left Side */}
                <div className="flex-1 flex flex-col items-center text-center">
                  <div className="mb-4">
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                      <Search className="w-8 h-8 text-black-500" />
                    </div>
                  </div>
                  <h4 className="text-base font-medium text-black-600 mb-2">
                    Search by Brand Name
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Type the brand name to see if it's already being tracked. 
                    Suggestions will appear if the brand exists in our database.
                  </p>
                </div>

                {/* Separator */}
                <div className="hidden md:block w-[1px] bg-gray-200 self-stretch" />
                <div className="block md:hidden h-[1px] w-1/2 bg-gray-200 mx-auto" />

                {/* Right Side */}
                <div className="flex-1 flex flex-col items-center text-center">
                  <div className="mb-4">
                    <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4">
                      <Globe className="w-8 h-8 text-black-500" />
                    </div>
                  </div>
                  <h4 className="text-base font-medium text-black-600 mb-2">
                    Try Website or Facebook URL
                  </h4>
                  <div className="space-y-2">
                    <p className="text-gray-600 text-sm">
                      If no suggestions appear, try pasting:
                    </p>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <span>Brand's website URL</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      <Facebook className="h-4 w-4 text-gray-400" />
                      <span>Facebook page URL</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}