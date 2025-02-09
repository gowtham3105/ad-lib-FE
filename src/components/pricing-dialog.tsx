import React from 'react';
import { X, Check } from 'lucide-react';
import { DollarSign } from 'lucide-react';

interface PricingPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const MONTHLY_PRICE = 35;
const ANNUAL_PRICE = 30;

export default function PricingPopup({ isOpen, onClose }: PricingPopupProps) {
  const [isAnnual, setIsAnnual] = React.useState<boolean>(true);
  const currentPrice = isAnnual ? ANNUAL_PRICE : MONTHLY_PRICE;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative p-6 text-center">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
          <h2 className="text-2xl font-semibold text-gray-800">Upgrade your workspace for unlimited value</h2>
          
          <div className="mt-4 flex flex-col items-center gap-2">
            <div className="h-[24px]">
              {isAnnual && (
                <span className="text-sm text-green-600 font-medium flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  Save $60 per user yearly
                </span>
              )}
            </div>
            <div className="inline-flex items-center gap-3 bg-gray-100/50 rounded-full p-1">
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isAnnual ? 'bg-white shadow-sm text-black' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Annual billing
              </button>
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !isAnnual ? 'bg-white shadow-sm text-black' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Monthly billing
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-2 gap-6 p-6 max-w-4xl mx-auto">
          {/* Free Plan */}
          <div className="rounded-xl p-6 bg-gray-50/50">
            <h3 className="text-lg font-semibold text-gray-800">Free</h3>
            <div className="mt-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-800">$0</span>
              </div>
            </div>
            <p className="text-gray-600 mt-2">Try Sana for free. Up to 5 seats</p>
            
            <button className="mt-6 w-full py-2 px-4 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors text-gray-700">
              Continue using Free
            </button>
            
            <div className="my-6 h-px bg-gray-200" />
            
            <div className="mt-6 space-y-4">
              {[
                '10 meetings and 1000 messages per user and month',
                'Up to 5 members per workspace',
                'Unlimited assistants and prompt templates',
                'Meeting integrations with Google Meet, Microsoft Teams, and Zoom',
                'Knowledge integrations with Google Drive, Sharepoint, OneDrive, Notion, and Confluence',
                'Help center support'
              ].map((feature, i) => (
                <div key={i} className="flex gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Team Plan */}
          <div className="rounded-xl p-6 bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800">Team</h3>
            <div className="mt-4 flex items-end gap-2">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-gray-800">${currentPrice}</span>
                {isAnnual && (
                  <span className="text-gray-500 line-through ml-2">
                    ${MONTHLY_PRICE}
                  </span>
                )}
                <span className="text-gray-600 ml-1">/month</span>
              </div>
            </div>
            <p className="text-gray-600 mt-2">
              Per member, billed {isAnnual ? 'annually' : 'monthly'}
            </p>
            
            <button className="mt-6 w-full py-2 px-4 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
              Select team
            </button>
            
            <div className="my-6 h-px bg-gray-200" />
            
            <div className="mt-6 space-y-4">
              {[
                'Everything in free',
                'Unlimited documents, queries, and recordings',
                'All off-the-shelf integrations',
                'OpenAI & Claude LLM model selection',
                'Priority in email & chat support',
                'Early access to new features',
                'Up to 50 members per workspace'
              ].map((feature, i) => (
                <div key={i} className="flex gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 bg-white" />
      </div>
    </div>
  );
}