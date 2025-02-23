import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Plus, LayoutGrid, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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

interface BoardSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onBoardSelect: (boardId: string) => void;
}

export function BoardSelectionDialog({ 
  open, 
  onOpenChange,
  onBoardSelect 
}: BoardSelectionDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewBoardForm, setShowNewBoardForm] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const [newBoardDescription, setNewBoardDescription] = useState("");

  const filteredBoards = mockBoards.filter(board => 
    board.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    board.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateBoard = () => {
    if (!newBoardName.trim()) return;
    
    // Here you would typically make an API call to create the board
    console.log("Creating new board:", { name: newBoardName, description: newBoardDescription });
    
    // Reset form
    setNewBoardName("");
    setNewBoardDescription("");
    setShowNewBoardForm(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-0 gap-0 bg-white">
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Save to Board</h2>
            <button
              onClick={() => setShowNewBoardForm(!showNewBoardForm)}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              {showNewBoardForm ? "Cancel" : "New Board"}
            </button>
          </div>

          {showNewBoardForm ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="boardName" className="block text-sm font-medium text-gray-700 mb-1">
                  Board Name
                </label>
                <input
                  type="text"
                  id="boardName"
                  value={newBoardName}
                  onChange={(e) => setNewBoardName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                  placeholder="e.g., Campaign Ideas"
                />
              </div>
              <div>
                <label htmlFor="boardDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  id="boardDescription"
                  value={newBoardDescription}
                  onChange={(e) => setNewBoardDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                  rows={3}
                  placeholder="Add a description for your board..."
                />
              </div>
              <button
                onClick={handleCreateBoard}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-lg 
                  hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Create Board
              </button>
            </div>
          ) : (
            <>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search boards..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>

              <div className="space-y-2">
                {filteredBoards.map((board) => (
                  <button
                    key={board.id}
                    onClick={() => onBoardSelect(board.id)}
                    className="w-full flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      {board.thumbnail ? (
                        <img 
                          src={board.thumbnail} 
                          alt={board.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <LayoutGrid className="w-6 h-6 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                        {board.name}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                        {board.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {board.itemCount} items
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}