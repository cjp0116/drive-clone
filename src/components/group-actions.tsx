"use client"

import { Download, Share, Trash2, Move, X } from "lucide-react"
import { Button } from "~/components/ui/button"

interface GroupActionsProps {
  selectedCount: number
  onClearSelection: () => void
  isDarkMode: boolean
}

export default function GroupActions({ selectedCount, onClearSelection, isDarkMode }: GroupActionsProps) {
  return (
    <div
      className={`px-6 py-3 border-b flex items-center justify-between transition-colors duration-300 ease-in-out ${isDarkMode ? "border-gray-700 bg-gray-750" : "border-gray-200 bg-blue-50"
        }`}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClearSelection}
            className={`transition-all duration-300 ease-in-out ${isDarkMode
                ? "text-gray-400 hover:text-white hover:bg-gray-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
          >
            <X className="w-4 h-4" />
          </Button>
          <span
            className={`text-sm font-medium transition-colors duration-300 ease-in-out ${isDarkMode ? "text-white" : "text-gray-900"
              }`}
          >
            {selectedCount} selected
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          className={`gap-2 transition-all duration-300 ease-in-out ${isDarkMode
              ? "text-gray-300 hover:text-white hover:bg-gray-700"
              : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            }`}
        >
          <Download className="w-4 h-4" />
          Download
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`gap-2 transition-all duration-300 ease-in-out ${isDarkMode
              ? "text-gray-300 hover:text-white hover:bg-gray-700"
              : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            }`}
        >
          <Share className="w-4 h-4" />
          Share
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`gap-2 transition-all duration-300 ease-in-out ${isDarkMode
              ? "text-gray-300 hover:text-white hover:bg-gray-700"
              : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
            }`}
        >
          <Move className="w-4 h-4" />
          Move
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`gap-2 transition-all duration-300 ease-in-out ${isDarkMode
              ? "text-red-400 hover:text-red-300 hover:bg-gray-700"
              : "text-red-600 hover:text-red-700 hover:bg-gray-100"
            }`}
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </Button>
      </div>
    </div>
  )
}
