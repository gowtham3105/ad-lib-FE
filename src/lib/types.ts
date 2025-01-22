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
  ad_count?: number | null
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