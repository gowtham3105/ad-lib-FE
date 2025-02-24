import { useState, useRef, useEffect } from "react";
import { LayoutGrid, Plus, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import useBoards from "../../hooks/use-boards";
import { AdDetails } from "@/lib/types";
import { useAuth } from "@clerk/clerk-react";
interface Board {
  id?: string;
  name: string;
  itemCount: number;
}


interface BoardDropdownProps {
  disabled?: boolean;
  adData: AdDetails;
}

export function BoardDropdown({ disabled, adData }: BoardDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedBoard, setSavedBoard] = useState<Board | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getToken } = useAuth();

  const { boards, loading, error } = useBoards();
  const convertedBoards = boards.map(b => ({
    id: b.id.toString(),
    name: b.name,
    itemCount: 0,
  }));
  
  const filteredBoards = convertedBoards.filter(board => 
    board.name.toLowerCase().includes(searchQuery.toLowerCase())
   
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
    
    // Mock adding the new board to the list using the current boards length for a new id
    const newBoard: Board = {
      name,
      itemCount: 0,
    };
    
    console.log("New board created:", newBoard);
    handleBoardSelect(newBoard);
  };


  const handleBoardSelect = async (board: Board) => {
    try {
      const token = await getToken();
      const response = await fetch('http://127.0.0.1:8080/saved-folder/add/ad', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ad_external_id: adData.external_id,
          folder_id: board.id,
          folder_name: board.name
        })
      });

      if (!response.ok) {
        throw new Error('Failed to save ad to board');
      }

      // Continue with UI updates after successful API call
      setSavedBoard(board);
      setIsOpen(false);
      
      // Reset the saved state after 2 seconds
      setTimeout(() => {
        setSavedBoard(null);
      }, 2000);
    } catch (error) {
      console.error('Error saving ad to board:', error);
      // Here you might want to show an error toast/notification to the user

    }
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
                className="w-full pl-9 pr-3 py-2 text-sm border-1 border-gray-200 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div className="max-h-[240px] overflow-y-auto">
              {filteredBoards.length > 0 ? (
                <div className="space-y-1">
                  {filteredBoards.map((board) => (
                    <button
                      key={board.id}
                      onClick={() => handleBoardSelect(board)}
                      className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors group text-left ml-4"
                    >
                     
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                          {board.name}
                        </h3>
                        {/* <p className="text-xs text-gray-500">{board.itemCount} items</p> */}
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
