import React from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { BrandSearchResult } from './../../../lib/fetch-brand-suggestions';

interface SearchTabProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    isFocused: boolean;
    setIsFocused: (focused: boolean) => void;
    isLoading: boolean;
    error: string | null;
    brands: BrandSearchResult[];
    setOffset: (offset: number) => void;
  }
  
  export default function SearchTab({
    searchQuery,
    setSearchQuery,
    isFocused,
    setIsFocused,
    isLoading,
    error,
    brands,
    setOffset,
  }: SearchTabProps) {
    return (
      <div className="border-border">
        <div className="relative px-1 py-4">
          <div 
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 bg-white border ${
              isFocused 
                ? 'border-zinc-500 shadow-[0_1px_2px_rgba(0,0,0,0.04)]' 
                : 'border-zinc-300 hover:border-zinc-500'
            }`}
          >
            <Search 
              className="text-muted-foreground/70" 
              size={18} 
            />
            <input
              type="text"
              placeholder="Search brands..."
              className="w-full bg-transparent border-none outline-none text-[13px] text-foreground placeholder:text-muted-foreground/60 transition-colors font-medium"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-muted-foreground/50 hover:text-muted-foreground transition-colors"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
  
        <div className="px-1 space-y-1" style={{ height: '324px', overflowY: 'auto' }}>
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-full gap-2 text-muted-foreground">
              <span className="text-sm">{error}</span>
              <button onClick={() => setOffset(0)} className="text-sm text-primary hover:underline">Try again</button>
            </div>
          ) : brands.length === 0 ? (
            <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
              No brands found
            </div>
          ) : brands.map((brand) => (
            <div
              key={brand.id}
              className="flex items-center py-2 pl-2 pr-3 rounded-lg hover:bg-muted/50 transition-all duration-200 border border-transparent hover:border-gray-300 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="w-7 h-7 rounded-md object-cover bg-muted ring-1 ring-border/10 group-hover:ring-primary/20 transition-all duration-200"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://via.placeholder.com/28x28/e5e7eb/9ca3af?text=${brand.name.charAt(0)}`;
                  }}
                />
                <span className="text-sm font-medium group-hover:text-primary transition-colors duration-200">{brand.name}</span>
              </div>
              <span className="text-sm text-muted-foreground ml-auto">
                {brand.count.toLocaleString()} ads
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }