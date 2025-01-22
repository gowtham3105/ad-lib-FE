import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { DiscoverPage } from "@/pages/discover"
import { TrackBrandsPage } from "@/pages/track-brands"
import { AddBrandPage } from "@/pages/add-brand"
import { SavedFolderPage } from "@/pages/saved-folder"
import { HelpPage } from "@/pages/help"
import { AccountPage } from "@/pages/account"
import { SignInPage } from "@/pages/sign-in"
import { AdDetailsPage } from "@/pages/ad-details"

if (!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key")
}

export default function App() {
  return (
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <Router>
        <Routes>
          <Route path="/sign-in" element={<SignInPage />} />
          
          <Route
            path="/*"
            element={
              <>
                <SignedIn>
                  <SidebarProvider>
                    <AppSidebar />
                    <SidebarInset>
                      <Routes>
                        <Route path="/discover" element={<Navigate to="/" replace />} />
                        <Route path="/" element={<DiscoverPage />} />
                        <Route path="/track-brands" element={<TrackBrandsPage />} />
                        <Route path="/add-brand" element={<AddBrandPage />} />
                        <Route path="/track-brands/:brandId" element={<TrackBrandsPage />} />
                        <Route path="/saved-folders/:folderId" element={<SavedFolderPage />} />
                        <Route path="/help" element={<HelpPage />} />
                        <Route path="/ad/:id" element={<AdDetailsPage />} />
                      </Routes>
                    </SidebarInset>
                  </SidebarProvider>
                </SignedIn>
                <SignedOut>
                  <Navigate to="/sign-in" replace />
                </SignedOut>
              </>
            }
          />
        </Routes>
      </Router>
    </ClerkProvider>
  )
}