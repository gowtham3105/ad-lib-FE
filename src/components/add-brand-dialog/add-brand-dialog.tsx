import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { searchBrands, BrandSearchResult, createBrandFromUrl } from '../../lib/add-brand-api';
import SearchTab from './search-bar';
import ManualTab from './manual-tab';
import ModalFooter from './model-footer';
import { useAuth } from "@clerk/clerk-react"
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { BrandCreationProvider, useBrandCreation } from '@/context/brand-creation-context';


interface AddBrandModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalCredits: number;
  usedCredits: number;
}

export default function AddBrandModal({ isOpen, onClose, totalCredits = 2, usedCredits = 0 }: AddBrandModalProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'search' | 'manual'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [brands, setBrands] = useState<BrandSearchResult[]>([]);
  const [offset, setOffset] = useState(0);
  const [url, setUrl] = useState('');
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [isCreatingBrand, setIsCreatingBrand] = useState(false);
  const {toast} = useToast();
  const limit = 10;
  const { getToken } = useAuth();
  
  const { getBrandCreationStatus, clearBrandCreation } = useBrandCreation();
  const [currentPageId, setCurrentPageId] = useState<string | null>(null);

  // Effect to continuously check brand creation status
  useEffect(() => {
    if (isCreatingBrand && currentPageId) {
      const checkStatus = () => {
        const status = getBrandCreationStatus(currentPageId);
        
        if (status?.status === 'success' && status.brandId) {
          setIsCreatingBrand(false);
          clearBrandCreation(currentPageId);
          onClose();
          navigate(`/track-brands/${status.brandId}`);
        } else if (status?.status === 'error') {
          setIsCreatingBrand(false);
          clearBrandCreation(currentPageId);

          toast({
            title: 'Failed to create brand',
            description: 'An unknown error occurred. Please try again.',
          });

        }
      };

      const intervalId = setInterval(checkStatus, 1000);
      return () => clearInterval(intervalId);
    }
  }, [isCreatingBrand, currentPageId, getBrandCreationStatus, clearBrandCreation, navigate, onClose]);
  
  // Initial search when modal opens
  useEffect(() => {
    if (isOpen) {
      const fetchInitialBrands = async () => {
        setIsLoading(true);
        setError(null);

        try {
          const token = await getToken();
          const results = await searchBrands('', offset, limit, token);
          setBrands(results);
        } catch (err) {
          setError('Failed to fetch brands. Please try again.');
        
        } finally {
          setIsLoading(false);
        }
      };

      fetchInitialBrands();
    }
  }, [isOpen, offset]);

  useEffect(() => {
    const fetchBrands = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = await getToken();
        const results = await searchBrands(searchQuery, offset, limit, token);
        setBrands(results);
      } catch (err) {
        setError('Failed to fetch brands. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(fetchBrands, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, offset]);

  const handleCreateBrand = async () => {
    setIsCreatingBrand(true);
    try {
      const pageId = new URL(url).searchParams.get('view_all_page_id');
      if (!pageId) throw new Error('Invalid URL');

      setCurrentPageId(pageId);
    } catch (error) {
      console.error('Failed to create brand:', error);
      setIsCreatingBrand(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
     
      <div className="bg-card text-card-foreground rounded-xl shadow-lg w-[490px] modal-animation">
        <div className="p-5">
          <div className="flex flex-col gap-4 relative">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-base font-medium">
                  Start Spying on Competitors
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Track & save every ad your competitors launch.
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-all duration-200"
                aria-label="Close modal"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>
            
            <div className="flex gap-2 mb-2 border-b border-border">
              <button
                className={`pb-3 px-1 text-sm relative ${
                  activeTab === 'search'
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground'
                }`}
                onClick={() => setActiveTab('search')}
              >
                Search Brand
                {activeTab === 'search' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
              <button
                className={`pb-3 px-1 text-sm relative ${
                  activeTab === 'manual'
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground'
                }`}
                onClick={() => setActiveTab('manual')}
              >
                Add Manually
                {activeTab === 'manual' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            </div>
          </div>

          {activeTab === 'search' && (
            <SearchTab
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              isFocused={isFocused}
              setIsFocused={setIsFocused}
              isLoading={isLoading}
              error={error}
              brands={brands}
              setOffset={setOffset}
            />
          )}
          {activeTab === 'manual' && (
            <ManualTab 
              url={url}
              setUrl={setUrl}
              isLoading={isCreatingBrand}
              onValidChange={setIsUrlValid}
              onClose={onClose}
            />
          )}

          <ModalFooter
            showAddButton={activeTab === 'manual'}
            totalCredits={totalCredits}
            usedCredits={usedCredits}
            isDisabled={activeTab === 'manual' && (!isUrlValid || isCreatingBrand)}
            onAddBrand={activeTab === 'manual' ? () => handleCreateBrand() : undefined}
            isLoading={isCreatingBrand}
          />
        </div>
      </div>
    </div>
  );
}