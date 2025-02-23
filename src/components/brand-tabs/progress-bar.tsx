import { useEffect, useState } from 'react'
import { Loader2, RefreshCw, CheckCircle, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const LOADING_VIDEO_URL = "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4"

interface ProgressBarProps {
  duration?: number // in milliseconds
  onComplete?: () => void
  email?: string
}

export function ProgressBar({ 
  duration = 5000, // default 10 seconds
  onComplete,
  email = "your inbox"
}: ProgressBarProps) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState(1)
  const [showEmailNotice, setShowEmailNotice] = useState(false)

  useEffect(() => {
    const startTime = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min((elapsed / duration) * 100, 100)
      setProgress(newProgress)
      
      // Update phases based on progress
      if (newProgress >= 66) {
        setPhase(3)
      } else if (newProgress >= 33) {
        setPhase(2)
      }
      
      if (newProgress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setShowEmailNotice(true)
        }, 500)
      }
    }, 50) // Update every 50ms for smooth animation

    return () => clearInterval(interval)
  }, [duration, onComplete])

  const getPhaseMessage = () => {
    if (showEmailNotice) {
      return `We'll notify ${email} when your data is ready`
    }
    switch(phase) {
      case 1:
        return "Starting data collection..."
      case 2:
        return "Processing media files..."
      case 3:
        return "Finalizing results..."
      default:
        return "Processing..."
    }
  }

  const getIcon = () => {
    if (showEmailNotice) return Mail
    if (phase === 1) return Loader2
    return RefreshCw
  }

  const Icon = getIcon()

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4 } }}
      exit={{ opacity: 0 }}
      className="relative h-[calc(100vh-154px)] inset-0 flex items-center justify-center"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 20,
          delay: 0.1
        }}
        className="bg-[hsl(var(--card))] rounded-2xl  w-full max-w-2xl mx-4"
      >
        {/* Video Section */}
        <div className="relative aspect-video rounded-t-2xl overflow-hidden">
          <video
            src={LOADING_VIDEO_URL}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>

        {/* Progress Section */}
        <div className="p-8">
          <div className="flex flex-col items-center text-center">
            <Icon className={`w-12 h-12 text-[hsl(var(--chart-1))] mb-4 ${!showEmailNotice && progress < 100 ? 'animate-spin' : ''}`} />
            <h3 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-3">
              {showEmailNotice ? "Still Processing" : "We're fetching your data"}
            </h3>
            <p className="text-[hsl(var(--muted-foreground))] mb-8">
              Enjoy this video while we {getPhaseMessage().toLowerCase()}
            </p>
            
            <AnimatePresence>
              {!showEmailNotice && (
                <motion.div 
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full bg-[hsl(var(--secondary))] rounded-full h-3 mb-4 overflow-hidden"
                >
                  <div 
                    className="h-full bg-[hsl(var(--chart-1))] transition-all duration-700 ease-out rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* <motion.div 
              key={showEmailNotice ? 'email' : Math.round(progress)}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-sm font-medium text-[hsl(var(--muted-foreground))]"
            > */}
              {showEmailNotice ? `Check ${email} for updates` : `${Math.round(progress)}% Complete`}
            {/* </motion.div> */}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}