import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

export type TabType = "library" | "landing-pages" | "hooks"

interface TabNavigationProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

const tabs = [
  { id: "library" as const, label: "Library" },
  { id: "landing-pages" as const, label: "Landing Pages" },
  { id: "hooks" as const, label: "Hooks" }
]

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav className="flex items-center gap-8 px-6 h-14" aria-label="Tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "relative text-[15px] font-medium transition-colors focus-visible:outline-none",
            activeTab === tab.id
              ? "text-black"
              : "text-gray-500 hover:text-gray-900"
          )}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}