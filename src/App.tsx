import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { DiscoverPage } from "@/pages/discover"
import { TrackBrandsPage } from "@/pages/track-brands"
import { AddBrandPage } from "@/pages/add-brand"
import { SavedFolderPage } from "@/pages/saved-folder"
import { HelpPage } from "@/pages/help"
import { AccountPage } from "@/pages/account"
import { SignInPage } from "@/pages/sign-in"
import { AdDetailsPage } from "@/pages/ad-details"
import { NotFoundPage } from "@/pages/not-found"
import { Toaster } from "@/components/ui/toaster"

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
                    <div className="flex h-screen w-full bg-sidebar">
                      {/* Sidebar */}
                      <div className="flex-shrink-0 border-none">
                        <AppSidebar />
                      </div>
                      
                      {/* Main Content */}
                      <div className="flex-1 overflow-auto rounded-2xl m-2">
                        <Routes>
                          <Route path="/discover" element={<Navigate to="/" replace />} />
                          <Route path="/" element={<DiscoverPage />} />
                          <Route path="/track-brands" element={<TrackBrandsPage />} />
                          <Route path="/add-brand" element={<AddBrandPage />} />
                          <Route path="/track-brands/:brandId" element={<TrackBrandsPage />} />
                          <Route path="/saved-folders/:folderId" element={<SavedFolderPage />} />
                          <Route path="/help" element={<HelpPage />} />
                          <Route path="/ad/:id" element={<AdDetailsPage />} />
                          <Route path="*" element={<NotFoundPage />} />
                        </Routes>
                      </div>
                    </div>
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
      <Toaster />
    </ClerkProvider>
  )
}