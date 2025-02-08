const API_BASE_URL = 'http://127.0.0.1:8000';
const API_TOKEN = 'test';

export interface BrandSearchResult {
  name: string;
  id: string;
  logo: string;
  count: number;
}

export async function searchBrands(query: string, offset = 0, limit = 10): Promise<BrandSearchResult[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/brand/search?q=${encodeURIComponent(query)}&offset=${offset}&limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch brands');
    }

    const data = await response.json();
    return data.map(brand => ({
      ...brand,
      logo: brand.logo === 'None' ? 'https://via.placeholder.com/28x28/e5e7eb/9ca3af?text=' + brand.name.charAt(0) : brand.logo
    }));
  } catch (error) {
    console.error('Error searching brands:', error);
    throw error;
  }
}