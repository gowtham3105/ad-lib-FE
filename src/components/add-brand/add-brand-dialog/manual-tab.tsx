import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link2, Facebook, CheckCircle2, XCircle, PlayCircle } from 'lucide-react';
import loadingAnimation from '../../../assets/brand_loading.json';
import Lottie from 'lottie-react';
import { useBrandCreation } from '../../../context/brand-creation-context';


const LOADING_STATES = [
    '🔍 Validating URL...',
    '🌐 Opening URL...',
    '📊 Retrieving brand information...',
    '🔄 Analyzing brand data...',
    '✨ Creating brand profile...'
  ];
  
  interface ValidationState {
    isValid: boolean;
    message: string;
    showTutorial: boolean;
  }
  
  function validateFacebookUrl(url: string): ValidationState {
    if (!url) return { isValid: false, message: '', showTutorial: false };
    
    try {
      const urlObj = new URL(url);
      if (!urlObj.hostname.includes('facebook.com')) {
        return {
          isValid: false,
          message: 'Please enter a Facebook Ad Library URL',
          showTutorial: true
        };
      }
      
      const hasViewAllPageId = urlObj.searchParams.has('view_all_page_id');
      if (!hasViewAllPageId) {
        return {
        isValid: false,
        message: "this doesn't looks like a facebook brand's Ad page url",
        showTutorial: true
      };
      }
      
      return {
        isValid: true,
        message: 'Valid Facebook Ad Library URL',
        showTutorial: false
      };
    } catch {
      return {
        isValid: false,
        message: "this doesn't looks like a facebook brand's ad page url",
        showTutorial: true
      };
    }
  }
  
  interface ManualTabProps {
    url: string;
    setUrl: (url: string) => void;
    isLoading: boolean;
    onValidChange?: (isValid: boolean) => void;
    onClose?: () => void;
  }
  
  export default function ManualTab({ url, setUrl, isLoading, onValidChange, onClose }: ManualTabProps) {
    const navigate = useNavigate();
    const [loadingStep, setLoadingStep] = React.useState(0);
    const [validation, setValidation] = useState<ValidationState>({ 
      isValid: false, 
      message: '', 
      showTutorial: false 
    });
    const [isFocused, setIsFocused] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { createBrandInBackground, getBrandCreationStatus } = useBrandCreation();
  
    // Start brand creation in background when URL is valid
    useEffect(() => {
      if (validation.isValid && url) {
        createBrandInBackground(url);
      }
    }, [validation.isValid, url, createBrandInBackground]);
  
    // Check brand creation status when URL changes
    useEffect(() => {
      if (validation.isValid && url) {
        const pageId = new URL(url).searchParams.get('view_all_page_id');
        if (pageId) {
          const status = getBrandCreationStatus(pageId);
          if (status?.status === 'error') {
            setError(status.error);
          }
        }
      }
    }, [validation.isValid, url, getBrandCreationStatus]);
  
    useEffect(() => {
      if (isLoading) {
        const interval = setInterval(() => {
          setLoadingStep(prev => (prev + 1) % LOADING_STATES.length);
        }, 2000);
        return () => clearInterval(interval);
      } else {
        setLoadingStep(0);
      }
    }, [isLoading]);
  
    useEffect(() => {
      const result = validateFacebookUrl(url);
      setValidation(result);
      onValidChange?.(result.isValid);
    }, [url, onValidChange]);
  
    return (
      <div className="px-1 relative" style={{ height: '393.5px', overflowY: 'auto' }}>
        {isLoading && (
          <div className="absolute inset-0 bg-white backdrop-blur-[1px] flex items-center justify-center z-10">
            <div className="flex flex-col items-center gap-3">
              <div className="w-80 mb-2">
                <Lottie animationData={loadingAnimation} loop={true} />
              </div>
              <div className="h-7 relative ">
                <p
                  key={loadingStep}
                  className="text-sm font-semibold absolute left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 rounded-full bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 border border-primary/20 text-primary shadow-[0_2px_10px_-2px_rgba(0,0,0,0.1)] transition-all duration-500 animate-in fade-in slide-in-from-bottom-3 text-gray-800"
                >
                  {LOADING_STATES[loadingStep]}
                  
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="mb-4">
          <label className="text-base font-medium">Facebook Ad Library URL</label>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-200 bg-white ${
                isFocused
                  ? 'border-zinc-500 ring-1 ring-zinc-500/20'
                  : url
                  ? validation.isValid
                    ? 'border-green-500/50 hover:border-green-500'
                    : 'border-red-500/50 hover:border-red-500'
                  : 'border-zinc-300 hover:border-zinc-500'
              }`}>
                <Link2 
                  className={`transition-colors ${
                    validation.isValid && url 
                      ? 'text-green-500' 
                      : 'text-muted-foreground/70'
                  }`} 
                  size={18} 
                />
                <input
                  type="text"
                  placeholder="facebook.com/ads/library..."
                  className="w-full bg-transparent border-none outline-none text-[13px] text-foreground placeholder:text-muted-foreground/60 transition-colors font-medium"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
                {url && (
                  <div className="flex items-center gap-1 pl-2 border-l border-border">
                    {validation.isValid ? (
                      <CheckCircle2 size={16} className="text-green-500" />
                    ) : (
                      <button
                        onClick={() => setUrl('')}
                        className="text-red-500 hover:text-red-600 transition-colors"
                      >
                        <XCircle size={16} />
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            <a
              href="https://facebook.com/ads/library"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-white text-muted-foreground text-sm font-medium hover:bg-muted/50 transition-colors"
            >
              <Facebook size={16} className="text-[#1877F2]" />
              Ad Library <span className="text-xs">↗</span>
            </a>
          </div>
        </div>
  
        {url && (
          <div className={`rounded-lg p-4 border transition-all duration-200 h-[88px] flex items-center ${
            validation.isValid
              ? 'bg-green-500/5 border-green-500/20' 
              : 'bg-red-500/5 border-red-500/20'
          }`}>
            <div className="flex items-start gap-2 w-full">
              {validation.isValid ? (
                <CheckCircle2 size={18} className="text-green-500 shrink-0" />
              ) : (
                <XCircle size={18} className="text-red-500 shrink-0" />
              )}
              <div className="flex-1">
                <p className={`text-sm font-medium ${
                  validation.isValid ? 'text-green-600' : 'text-red-600'
                } whitespace-pre-line`}>
                  {validation.message}
                </p>
                {validation.showTutorial && (
                  <div className="flex items-center gap-2 mt-2">
                    <button className="text-xs bg-white px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 group">
                      <PlayCircle size={14} className="text-primary group-hover:text-primary/70 transition-colors" />
                      Watch how to find a brand's Ad Library
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {!url && (
          <div className="h-[88px] flex items-center px-1">
            <p className="text-sm text-muted-foreground">
            Copy the Facebook Ad Library Page URL of a brand, not a keyword search
            </p>
          </div>
        )}
        <div className="mt-4 rounded-lg overflow-hidden border border-border">
          <img
            src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDk1NWtic3BtNXBuaWkzeHBkN2ozc3huenBqanowYXE1cW5nY2pqdyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/9JrkkDoJuU0FbdbUZU/giphy.gif"
            alt="How to find Facebook Ad Library URL"
            className="w-full h-[200px] object-cover"
          />
        </div>
      </div>
    );
  }