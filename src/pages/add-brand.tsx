import { Search, Plus } from "lucide-react"
import { useState } from "react"
import AddBrandModal from "@/components/add-brand/add-brand-dialog/add-brand-dialog"

export function AddBrandPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [initialTab, setInitialTab] = useState<"search" | "manual">("search")

  const handleSearchClick = () => {
    setDialogOpen(true)
    setInitialTab("search")
  }

  const handleAddNewClick = () => {
    setDialogOpen(true)
    setInitialTab("manual")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Center content vertically */}
      <div className="flex-1 flex items-center py-12">
        <div className="w-full">
          <div className="relative max-w-4xl mx-auto px-4">
            {/* Juni Logo */}
            <div className="flex justify-center mb-8">
              <img
                src="https://i.ibb.co/DrTd1jz/Untitled-design.png"
                alt="Juni Logo"
                className="w-16 h-16 animate-[spin_40s_ease-in-out_infinite_alternate]"
              />
            </div>

            {/* Title and Subtitle */}
            <div className="text-center mb-14">
              <h1 className="text-4xl font-semibold mb-3">
                Automated Competitor Creative Analysis
              </h1>
              <p className="text-lg text-gray-600">
                Juni allows you to track, save and analyze every<br />
                ad and landing page a brand launches.
              </p>
            </div>

            {/* Track Options */}
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {/* Search Existing Brand */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 flex flex-col">
                {/* Title & Subtitle */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Search an Existing Juni Brand</h3>
                  <p className="text-sm text-gray-600">
                    Unlock the historical data from brands already being tracked on Juni.
                  </p>
                </div>

                {/* Illustration */}
                <div className="flex-1 mb-6">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      {
                        logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
                        name: "PetLab Co.",
                        ads: "21,428"
                      },
                      {
                        logo: "https://images.unsplash.com/photo-1543508282-6319a3e2621f",
                        name: "Hismile",
                        ads: "20,068"
                      },
                      {
                        logo: "https://images.unsplash.com/photo-1608231387042-66d1773070a5",
                        name: "Nooro",
                        ads: "7,302"
                      },
                      {
                        logo: "https://images.unsplash.com/photo-1556906781-9a412961c28c",
                        name: "Happy Mammoth",
                        ads: "21,361"
                      }
                    ].map((brand) => (
                      <div key={brand.name} className="flex items-center gap-2">
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                        <div className="min-w-0">
                          <div className="text-sm font-medium truncate">{brand.name}</div>
                          <div className="text-xs text-gray-500">{brand.ads}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={handleSearchClick}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors text-sm font-medium"
                >
                  <Search className="w-4 h-4" />
                  Search for brand
                </button>
              </div>

              {/* Add New Brand */}
              <div className="bg-white rounded-xl p-6 border border-gray-100 flex flex-col">
                {/* Title & Subtitle */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Manually Add a New Brand</h3>
                  <p className="text-sm text-gray-600">
                    Start tracking a brand not yet available in Juni.
                  </p>
                </div>

                {/* Illustration */}
                <div className="flex-1 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-3">
                    <div className="text-sm text-gray-600">https://</div>
                    <div className="flex items-center gap-2">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png"
                        alt="Facebook"
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium">Facebook</span>
                    </div>
                    <div className="text-sm text-gray-600">/ads/library/</div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gray-200"></div>
                      <span className="text-sm text-gray-600">Brand</span>
                    </div>
                  </div>

                  <div className="p-2.5 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500">Example URL</div>
                    <div className="text-sm text-gray-700 font-mono truncate">
                      facebook.com/ads/library/nike
                    </div>
                  </div>
                </div>

                {/* Button */}
                <button
                  onClick={handleAddNewClick}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[rgb(233,128,116)] text-white rounded-lg hover:bg-[rgb(225,95,80)] transition-colors text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add new brand
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog */}


      <AddBrandModal
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        totalCredits={2}
        usedCredits={1}
      />
    </div>
  )
}