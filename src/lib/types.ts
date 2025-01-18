export interface AdResponse {
  data: Ad[]
  page: number
  limit: number
  sort_order: "asc" | "desc"
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