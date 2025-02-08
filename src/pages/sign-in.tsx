import { SignIn } from "@clerk/clerk-react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef, useEffect, useState } from "react"

const mediaUrls = [
  {
    type: "image",
    url: "https://i.ibb.co/ymWrBjXs/Media-6-1.jpg"
  },
  // {
  //   type: "video",
  //   url: "https://video.xx.fbcdn.net/v/t42.1790-2/471988498_616763337405326_1593700898547275560_n.mp4?_nc_cat=107&ccb=1-7&_nc_sid=c53f8f&_nc_ohc=VctEx6HzWd8Q7kNvgHjRaDx&_nc_zt=28&_nc_ht=scontent.fblr1-7.fna&_nc_gid=AsbzVkrPFP-uHj5nmOQSsvZ&oh=00_AYAt7SZ2tYhqSD2CXRrb861UpcU19N8nAT7fF9BBg43goQ&oe=678CB4FA"
  // },
  {
    type: "image",
    url: "https://i.ibb.co/SwfsxcWf/Ad-Media-15.jpg"
  },
  {
    type: "image",
    url: "https://i.ibb.co/pBDh5VGC/Ad-Media-14.jpg"
  },
   {
    type: "image",
    url: "https://i.ibb.co/BHmncsxf/Ad-Media-13-1.jpg"
  }


 
  
]

export function SignInPage() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)

  // Function to get next media item with cycling
  const getNextMediaItem = (index: number) => {
    return mediaUrls[index % mediaUrls.length]
  }

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollY(window.scrollY * 0.5) // Adjust speed
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Sign In */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center -mt-16 p-8 lg:p-12 bg-white">
        <div className="flex flex-col items-center mb-12">
          <img
            src="https://i.ibb.co/DrTd1jz/Untitled-design.png"
            alt="Juni"
            className="w-16 h-16 mb-6"
          />
          <h1 className="text-2xl font-bold text-gray-900 text-center">Welcome back</h1>
          <p className="mt-3 text-gray-600 text-center">Sign in to your account to continue</p>
        </div>
        
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: 
                "bg-black hover:bg-gray-800 text-sm normal-case h-11",
              card: "border-none rounded-none p-6 bg-white",
              socialButtonsBlockButton: 
                "border-gray-200 hover:border-gray-300 hover:bg-gray-50/50 h-11",
              socialButtonsBlockButtonText: 
                "text-gray-500 text-sm font-medium",
              dividerLine: "bg-gray-200",
              dividerText: "text-gray-500 text-sm",
              formFieldLabel: "text-gray-700",
              formFieldInput: 
                "block w-full h-11 appearance-none rounded-lg border border-gray-200 px-3 placeholder-gray-400 shadow-sm focus:border-gray-300 focus:outline-none focus:ring-1 focus:ring-black/5 sm:text-sm",
              footerActionLink: 
                "font-medium text-black hover:text-gray-800",
              rootBox: "bg-transparent w-full max-w-md",
              header: "hidden",
              cardBox: "shadow-none m-auto"
            },
          }}
        />
      </div>
      
      {/* Right Side - Images */}
      <div className="hidden lg:block w-1/2 bg-white relative overflow-hidden">
        <div className="absolute inset-0 -rotate-45 scale-150">
          {/* Multiple Diagonal Lines */}
          {[...Array(8)].map((_, lineIndex) => (
            <div 
              key={`line-${lineIndex}`}
              className="absolute w-full"
              style={{
                top: `${lineIndex * 190}px`,
                animation: `${
                  lineIndex % 2 === 0 ? 'slide-right' : 'slide-left'
                } 200s linear infinite`
              }}
            >
              <div className="flex gap-3">
                {[...Array(40)].map((_, i) => (
                  <div 
                    key={`img-${lineIndex}-${i}`} 
                    className="flex-shrink-0  h-[180px]"
                  >
                    {(() => {
                      const media = getNextMediaItem(lineIndex * 40 + i)
                      return media.type === "video" ? (
                        <video
                          src={media.url}
                          className="h-full  object-cover rounded-lg shadow-lg"
                          autoPlay
                          muted
                          loop
                          playsInline
                        />
                      ) : (
                        <img
                          src={media.url}
                          alt={`Screen ${lineIndex}-${i}`}
                          className=" h-full object-cover rounded-lg shadow-lg"
                          loading="eager"
                        />
                      )
                    })()}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}