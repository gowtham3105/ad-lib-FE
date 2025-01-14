import { SidebarTrigger } from "@/components/ui/sidebar"

export function HelpPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="md:hidden -ml-1.5 hover:bg-gray-100 rounded-lg" />
        <h1 className="text-2xl font-bold">Help</h1>
      </div>
      <div className="rounded-lg border p-4">
        <p>Help page content will go here</p>
      </div>
    </div>
  )
}