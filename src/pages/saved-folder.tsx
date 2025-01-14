import { useParams } from "react-router-dom"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function SavedFolderPage() {
  const { folderId } = useParams()

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="md:hidden -ml-1.5 hover:bg-gray-100 rounded-lg" />
        <h1 className="text-2xl font-bold">Saved Folder</h1>
      </div>
      <div className="rounded-lg border p-4">
        <p>Folder ID: {folderId}</p>
        <p>Saved folder content will go here</p>
      </div>
    </div>
  )
}