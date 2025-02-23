import { useState, useRef, useEffect } from "react";
import { LayoutGrid, Plus, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Board {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  thumbnail?: string;
}

const mockBoards: Board[] = [
  {
    id: "1",
    name: "Health & Wellness",
    description: "Fitness, nutrition, and wellness product ads",
    itemCount: 24,
    thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&auto=format&fit=crop&q=60"
  },
  {
    id: "2",
    name: "Supplements",
    description: "Vitamin and supplement products",
    itemCount: 12,
    thumbnail: "https://images.unsplash.com/photo-1616196334218-caffdc9b2317?w=800&auto=format&fit=crop&q=60"
  }
];

interface BoardDropdownProps {
  onBoardSelect: (boardId: string) => void;
  disabled?: boolean;
}

export function BoardDropdown({ onBoardSelect, disabled }: BoardDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedBoard, setSavedBoard] = useState<Board | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredBoards = mockBoards.filter(board => 
    board.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    board.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCreateBoard = (name: string) => {
    // Here you would typically make an API call to create the board
    console.log("Creating new board:", { name });
    
    // Mock adding the new board to the list
    const newBoard: Board = {
      id: `${mockBoards.length + 1}`,
      name,
      description: "",
      itemCount: 0
    };
    
    // In a real app, you would update the boards list after the API call succeeds
    console.log("New board created:", newBoard);
    
    handleBoardSelect(newBoard);
    setIsOpen(false);
  };

  const handleBoardSelect = (board: Board) => {
    onBoardSelect(board.id);
    setSavedBoard(board);
    setIsOpen(false);
    
    // Reset the saved state after 2 seconds
    setTimeout(() => {
      setSavedBoard(null);
    }, 2000);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all duration-300 text-sm font-medium group relative",
          savedBoard 
            ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
            : "bg-gray-900/90 hover:bg-gray-800 text-white",
          disabled && "opacity-50 cursor-not-allowed hover:bg-gray-900/90"
        )}
        disabled={disabled}
      >
        {savedBoard ? (
          <>
            <Check className="w-4 h-4 animate-in fade-in slide-in-from-left-1" />
            <span className="animate-in fade-in slide-in-from-left-1">
              Saved to {savedBoard.name}
            </span>
          </>
        ) : (
          <>
            <LayoutGrid className="w-4 h-4 group-hover:scale-105 transition-transform duration-300" />
            <span className="group-hover:scale-105 transition-transform duration-300">
              Save to Board
            </span>
            <ChevronDown className={cn(
              "w-4 h-4 transition-transform duration-200",
              isOpen && "rotate-180"
            )} />
          </>
        )}
      </button>

      {isOpen && (
        <div className="absolute bottom-full mb-2 left-0 right-0 bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden">
          <div className="p-3 space-y-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search boards or create new..."
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div className="max-h-[240px] overflow-y-auto">
              {filteredBoards.length > 0 ? (
                <div className="space-y-1">
                  {filteredBoards.map((board) => (
                    <button
                      key={board.id}
                      onClick={() => handleBoardSelect(board)}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group text-left"
                    >
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        {board.thumbnail ? (
                          <img 
                            src={board.thumbnail} 
                            alt={board.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <LayoutGrid className="w-4 h-4 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                          {board.name}
                        </h3>
                        <p className="text-xs text-gray-500">{board.itemCount} items</p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : searchQuery.trim() ? (
                <div className="p-4 text-center space-y-3">
                  <p className="text-sm text-gray-500">No boards found matching "{searchQuery}"</p>
                  <button
                    onClick={() => {
                      handleCreateBoard(searchQuery.trim());
                      setIsOpen(false);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-lg 
                      border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Create "{searchQuery}"
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}