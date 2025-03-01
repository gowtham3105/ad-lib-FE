export interface AdResponse {
  data: Ad[]
  page: number
  limit: number
  sort_order: "asc" | "desc"
}

export interface BrandDetails {
  external_id: string
  name: string
  logo: string
  website: {
    url: string
    text: string
  } | null
  facebook: {
    url: string
    text: string
  } | null,
  ad_count?: number | null,
  ads_scrapped?: boolean | null
  landing_pages_scrapped?: boolean | null
  hooks_fetched?: boolean | null
}

export interface Ad {
  external_id: string
  brand_name: string
  brand_logo: string
  time: string
  media_type: "image" | "video"
  media_src: string
  is_active: boolean
  key?: string
}

export interface AdDetails {
  external_id: string
  brand_name: string
  brand_logo: string
  time: string
  media_type: string
  media_src: string
  start_date: string
  end_date: string | null
  platforms: string[]
  ad_text: string
  transcript?: string;
  footer: {
    view_link: string
    title: string
    sub_title: string
    button_text: string
  }
  cta_link: string
  is_active: boolean
}



export interface SidebarItem {
  url: string
  text: string
}

export interface SidebarResponse {
  saved_brands: SidebarItem[]
  saved_folders: SidebarItem[]
}

export interface LandingPage {
  id: number
  url: string
  screenshot_url: string
  count: number
  brand_id: string
}

// src/types/index.ts
export interface BrandSuggestion {
  id: number
  name: string
  adsCount: number
  trend: number
  logo: string
  // Add any additional fields you need
}

export interface FolderDetails {
  name:string
  id:string
}