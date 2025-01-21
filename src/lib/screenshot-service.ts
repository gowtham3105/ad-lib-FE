// Screenshot service configuration
export const SCREENSHOT_API_URL = import.meta.env.VITE_SCREENSHOT_API_URL || 'http://localhost:3001'

export interface ScreenshotResponse {
  url: string
  imageUrl: string
  timestamp: string
}

export async function generateScreenshot(url: string): Promise<ScreenshotResponse> {
  const response = await fetch(`${SCREENSHOT_API_URL}/screenshot`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  })

  if (!response.ok) {
    throw new Error('Failed to generate screenshot')
  }

  return response.json()
}