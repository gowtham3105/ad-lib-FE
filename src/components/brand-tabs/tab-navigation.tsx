import { cn } from "@/lib/utils"

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
    <nav className="flex gap-8 px-6" aria-label="Tabs">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "relative py-4 text-sm font-medium transition-colors focus-visible:outline-none",
            activeTab === tab.id
              ? "text-black"
              : "text-gray-500 hover:text-gray-700"
          )}
        >
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute inset-x-0 -bottom-px h-0.5 bg-black" />
          )}
        </button>
      ))}
    </nav>
  )
}