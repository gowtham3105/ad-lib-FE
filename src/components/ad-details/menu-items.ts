import { ChevronLeft, ChevronRight, Download, ExternalLink } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface MenuItem {
  icon: LucideIcon
  label: string
}

export const menuItems: MenuItem[] = [
  {
    icon: ChevronLeft,
    label: "Previous"
  },
  {
    icon: ChevronRight,
    label: "Next"
  },
  {
    icon: Download,
    label: "Download"
  },
  {
    icon: ExternalLink,
    label: "Landing Page"
  }
]