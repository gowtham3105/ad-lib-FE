import { Share2, Heart, Flag, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MenuItem {
  icon: string;
  label: string;
  onClick: () => void;
}

interface MenuBarProps {
  items: MenuItem[];
}

const iconMap = {
  Share2,
  Heart,
  Flag,
  ChevronDown,
  ChevronUp,
};

export function MenuBar({ items }: MenuBarProps) {
  return (
    <div className="flex justify-around items-center">
      {items.map((item, index) => {
        const Icon = iconMap[item.icon as keyof typeof iconMap];
        return (
          <button
            key={index}
            onClick={item.onClick}
            className="flex flex-col items-center gap-1.5 p-2 text-gray-600 hover:text-gray-900 transition-colors duration-300"
          >
            {Icon && <Icon className="w-5 h-5 transition-transform duration-300 hover:scale-110" />}
            <span className="text-sm">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}