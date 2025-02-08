import React from 'react';
import { PlayCircle, Plus, Sparkles } from 'lucide-react';

interface ModalFooterProps {
  totalCredits: number;
  usedCredits: number;
}

export default function ModalFooter({ totalCredits, usedCredits }: ModalFooterProps) {
  return (
    <div className="flex justify-between items-center p-4 border-t border-border bg-muted/30">
      <button 
        className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors group"
      >
        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <PlayCircle size={16} className="text-primary" />
        </div>
        <span className="text-sm font-medium group-hover:text-primary transition-colors">Watch Tutorial</span>
      </button>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-sm border border-border shadow-sm">
          <Sparkles size={14} className="text-primary" />
          <span className={`font-medium ${usedCredits >= totalCredits ? 'text-destructive' : 'text-foreground'}`}>
            {usedCredits}/{totalCredits}
          </span>
          <span className="text-muted-foreground font-medium">credits</span>
        </div>
        <button 
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 shadow-sm ${
            usedCredits >= totalCredits
              ? 'bg-muted text-muted-foreground cursor-not-allowed'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
          }`}
          disabled={usedCredits >= totalCredits}
        >
          <Plus size={16} />
          <span>Add Brand</span>
        </button>
      </div>
    </div>
  );
}