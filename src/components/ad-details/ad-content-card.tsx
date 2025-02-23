import { Globe, ExternalLink } from "lucide-react";

export function AdContentCard() {
  return (
    <div className="rounded-xl border border-gray-100 overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
        <h2 className="text-[15px] font-semibold text-gray-900">Ad Content</h2>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Message</h3>
          <p className="text-[15px] text-gray-900 leading-relaxed">
            Experience ultimate comfort with our latest running shoes. Limited time offer.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Call to Action</h3>
          <span className="inline-flex px-3 py-1.5 bg-gray-50 text-gray-900 rounded-lg text-sm font-medium">
            Shop Now
          </span>
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Destination</h3>
          <a 
            href="https://nike.com/running"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-sm text-[rgb(233,128,116)] hover:text-[rgb(225,95,80)]"
          >
            <Globe className="w-4 h-4" />
            <span className="underline-offset-4 group-hover:underline">nike.com</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        </div>
      </div>
    </div>
  );
}