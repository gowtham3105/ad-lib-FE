import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DiscoverPage } from "@/pages/discover"
import { TrackBrandsPage } from "@/pages/track-brands"
import { AddBrandPage } from "@/pages/add-brand"
import { SavedFolderPage } from "@/pages/saved-folder"
import { HelpPage } from "@/pages/help"
import { AccountPage } from "@/pages/account"

export default function App() {
  return (
    <Router>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Routes>
            <Route path="/discover" element={<Navigate to="/" replace />} />
            <Route path="/" element={<DiscoverPage />} />
            <Route path="/track-brands" element={<TrackBrandsPage />} />
            <Route path="/track-brands/add" element={<AddBrandPage />} />
            <Route path="/track-brands/:brandId" element={<TrackBrandsPage />} />
            <Route path="/saved-folders/:folderId" element={<SavedFolderPage />} />
            <Route path="/help" element={<HelpPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Routes>
        </SidebarInset>
      </SidebarProvider>
    </Router>
  )
}