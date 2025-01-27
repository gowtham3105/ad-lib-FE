import { BrandSearch } from "../brand-search"

export function SearchTab() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          Search Brand
        </h2>
        <p className="text-gray-600">
          Search for brands already being tracked on Juni
        </p>
      </div>

      <BrandSearch />
    </div>
  )
}