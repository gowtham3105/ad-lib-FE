import { Search, Globe, Facebook } from "lucide-react"

export function SearchGuide() {
  return (
    <div className="bg-white rounded-xl p-8 border border-gray-100">
      <h3 className="text-lg font-semibold mb-8 text-center">How to Find a Brand</h3>
      
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
        {/* Left Side */}
        <div className="flex-1 flex flex-col items-center text-center">
          <div className="mb-6">
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-900" />
            </div>
          </div>
          <h4 className="text-base font-medium text-gray-900 mb-2">
            Search by Brand Name
          </h4>
          <p className="text-gray-600 text-sm">
            Type the brand name to see if it's already being tracked. 
            Suggestions will appear if the brand exists in our database.
          </p>
        </div>

        {/* Separator */}
        <div className="hidden md:block w-px bg-gray-100 self-stretch" />
        <div className="block md:hidden h-px w-1/2 bg-gray-100 mx-auto" />

        {/* Right Side */}
        <div className="flex-1 flex flex-col items-center text-center">
          <div className="mb-6">
            <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4">
              <Globe className="w-8 h-8 text-gray-900" />
            </div>
          </div>
          <h4 className="text-base font-medium text-gray-900 mb-2">
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
  )
}