import { Calendar, Clock, Activity, Facebook, Instagram, MessageCircle } from "lucide-react";

export function CampaignDetailsCard() {
  return (
    <div className="rounded-xl border border-gray-100 overflow-hidden">
      <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
        <h2 className="text-[15px] font-semibold text-gray-900">Campaign Details</h2>
      </div>
      <div className="p-4 space-y-6">
        <div className="grid gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-gray-500" />
            <div>
              <dt className="text-sm font-medium text-gray-700">Campaign Period</dt>
              <dd className="text-sm text-gray-600">Jan 10, 2024 - Jan 12, 2024</dd>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-gray-500" />
            <div>
              <dt className="text-sm font-medium text-gray-700">Duration</dt>
              <dd className="text-sm text-gray-600">2 Days</dd>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Activity className="w-4 h-4 text-gray-500" />
            <div>
              <dt className="text-sm font-medium text-gray-700">Status</dt>
              <dd className="inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[rgb(233,128,116)]"></span>
                <span className="text-sm text-gray-900">Active</span>
              </dd>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Platforms</h3>
          <div className="flex flex-wrap gap-2">
            {[
              { icon: Facebook, name: "Facebook" },
              { icon: Instagram, name: "Instagram" },
              { icon: MessageCircle, name: "Messenger" }
            ].map((platform) => (
              <div 
                key={platform.name}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-gray-50 rounded-lg text-sm text-gray-900"
              >
                <platform.icon className="w-4 h-4 text-gray-600" />
                <span>{platform.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}