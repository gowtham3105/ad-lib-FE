import { useNavigate } from "react-router-dom"
import { Home } from "lucide-react"

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Image */}
        <div className="relative mb-8">
          <img
            src="https://picfiles.alphacoders.com/654/thumb-1920-654650.webp"
            alt="404 illustration"
            className="w-full max-w-[400px] mx-auto"
          />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Button */}
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all duration-200 hover:scale-105 font-medium"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}