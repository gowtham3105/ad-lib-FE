import React, { createContext, useContext, useState, useCallback } from 'react';
import { createBrandFromUrl } from '../lib/add-brand-api';
import { useAuth } from "@clerk/clerk-react"


interface BrandCreationState {
  status: 'idle' | 'pending' | 'success' | 'error';
  brandId?: string;
  error?: string;
}

interface BrandCreationMap {
  [pageId: string]: BrandCreationState;
}

interface BrandCreationContextType {
  brandCreations: BrandCreationMap;
  createBrandInBackground: (url: string) => Promise<void>;
  getBrandCreationStatus: (pageId: string) => BrandCreationState | undefined;
  clearBrandCreation: (pageId: string) => void;
}

const BrandCreationContext = createContext<BrandCreationContextType | undefined>(undefined);

function extractPageId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    return urlObj.searchParams.get('view_all_page_id');
  } catch {
    return null;
  }
}

export function BrandCreationProvider({ children }: { children: React.ReactNode }) {
  const [brandCreations, setBrandCreations] = useState<BrandCreationMap>({});
    const { getToken } = useAuth()

  const createBrandInBackground = useCallback(async (url: string) => {
    const pageId = extractPageId(url);
    if (!pageId) return;

    // Check if we already have a pending or successful request for this page
    const existingCreation = brandCreations[pageId];
    if (existingCreation && (existingCreation.status === 'pending' || existingCreation.status === 'success')) {
      return;
    }

    // Set initial pending state
    setBrandCreations(prev => ({
      ...prev,
      [pageId]: { status: 'pending' }
    }));

    try {
        const token = await getToken()
      const { external_id } = await createBrandFromUrl(url, token);
      setBrandCreations(prev => ({
        ...prev,
        [pageId]: { status: 'success', brandId: external_id }
      }));
    } catch (error) {
      setBrandCreations(prev => ({
        ...prev,
        [pageId]: { status: 'error', error: (error as Error).message }
      }));
    }
  }, [brandCreations]);

  const getBrandCreationStatus = useCallback((pageId: string) => {
    return brandCreations[pageId];
  }, [brandCreations]);

  const clearBrandCreation = useCallback((pageId: string) => {
    setBrandCreations(prev => {
      const newState = { ...prev };
      delete newState[pageId];
      return newState;
    });
  }, []);

  return (
    <BrandCreationContext.Provider 
      value={{ 
        brandCreations, 
        createBrandInBackground, 
        getBrandCreationStatus,
        clearBrandCreation
      }}
    >
      {children}
    </BrandCreationContext.Provider>
  );
}

export function useBrandCreation() {
  const context = useContext(BrandCreationContext);
  if (!context) {
    throw new Error('useBrandCreation must be used within a BrandCreationProvider');
  }
  return context;
}