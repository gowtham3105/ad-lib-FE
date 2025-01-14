import { PageHeader } from "@/components/page-header"

export function AccountPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <PageHeader />
      </header>
      <div className="rounded-lg border p-4">
        <p>Account page content will go here</p>
      </div>
    </div>
  )
}