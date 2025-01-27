import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Facebook, Globe } from "lucide-react"

interface ManualTabProps {
  onClose: () => void
}

export function ManualTab({ onClose }: ManualTabProps) {
  const [formData, setFormData] = useState({
    name: "",
    website: "",
    facebook: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    onClose()
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Add Brand Manually
        </h2>
        <p className="text-gray-600">
          Add a new brand by entering its details
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Brand Name */}
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Brand Name
          </label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter brand name"
            className="h-12"
            required
          />
        </div>

        {/* Website URL */}
        <div className="space-y-2">
          <label htmlFor="website" className="text-sm font-medium text-gray-700">
            Website URL
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              id="website"
              value={formData.website}
              onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
              placeholder="https://example.com"
              className="pl-10 h-12"
              type="url"
              required
            />
          </div>
        </div>

        {/* Facebook URL */}
        <div className="space-y-2">
          <label htmlFor="facebook" className="text-sm font-medium text-gray-700">
            Facebook Page URL
          </label>
          <div className="relative">
            <Facebook className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              id="facebook"
              value={formData.facebook}
              onChange={(e) => setFormData(prev => ({ ...prev, facebook: e.target.value }))}
              placeholder="https://facebook.com/brand"
              className="pl-10 h-12"
              type="url"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition-colors text-sm font-medium"
        >
          Add Brand
        </button>
      </form>
    </div>
  )
}