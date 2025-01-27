export function BrandInfo() {
  return (
    <div className="absolute top-20 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-gray-200/50 shadow-sm z-10">
      <img 
        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=100&auto=format&fit=crop"
        alt="Brand Logo"
        className="w-6 h-6 rounded-md"
      />
      <span className="font-medium text-[13px]">Swiggy</span>
    </div>
  )
}