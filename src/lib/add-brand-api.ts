const API_BASE_URL = 'http://127.0.0.1:8080';
const API_TOKEN = 'test';

export interface BrandSearchResult {
  name: string;
  id: string;
  logo: string;
  count: number;
}

export async function searchBrands(query: string, offset = 0, limit = 10, token:string): Promise<BrandSearchResult[]> {


 console.log('token', token);
  try {
    const response = await fetch(
      `${API_BASE_URL}/brand/search?q=${encodeURIComponent(query)}&offset=${offset}&limit=${limit}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
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

export async function saveBrand(brandId: string, token:string): Promise<void> {
 
  try {
    const response = await fetch(
      `${API_BASE_URL}/saved-brand/${brandId}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to save brand');
    }
  } catch (error) {
    console.error('Error saving brand:', error);
    throw error;
  }
}

export async function createBrandFromUrl(facebookPageUrl: string, token: string): Promise<{ external_id: string }> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/brand/create/url`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          facebook_page_url: facebookPageUrl
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to create brand');
    }

    const data = await response.json();
    return { external_id: data.brand.external_id };
  } catch (error) {
    console.error('Error creating brand:', error);
    throw error;
  }
}