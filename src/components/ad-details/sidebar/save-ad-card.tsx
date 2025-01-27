import { Layout as LayoutBoard } from "lucide-react"

export function SaveAdCard() {
  return (
    <div className="rounded-xl border border-gray-100 overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
        <h2 className="text-[15px] font-semibold text-gray-900">Save Ad</h2>
      </div>
      <div className="p-4">
        <button 
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition-colors text-sm font-medium group"
        >
          <LayoutBoard className="w-4 h-4 group-hover:scale-110 transition-transform" />
          Add to Board
        </button>
      </div>
    </div>
  )
}