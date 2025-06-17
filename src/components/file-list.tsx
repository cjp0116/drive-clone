"use client"

import type { FileItem } from "~/lib/mockData"
import FileListItem from "./file-list-item"

interface FileListProps {
  items: FileItem[]
  selectedItems: Set<string>
  onItemSelect: (id: string, selected: boolean) => void
  onItemClick: (item: FileItem) => void
  isDarkMode: boolean
}


export default function FileList({ items, selectedItems, onItemSelect, onItemClick, isDarkMode }: FileListProps) {
  return (
    <div className="space-y-1">
      <div
        className={`grid grid-cols-12 gap-4 px-4 py-2 text-sm font-medium border-b transition-colors duration-300 ease-in-out ${isDarkMode ? "text-gray-400 border-gray-700" : "text-gray-600 border-gray-200"
          }`}
      >
        <div className="col-span-6">Name</div>
        <div className="col-span-2">Owner</div>
        <div className="col-span-2">Last modified</div>
        <div className="col-span-2">File size</div>
      </div>
      {items.map((item) => (
        <FileListItem
          key={item.id}
          item={item}
          isSelected={selectedItems.has(item.id)}
          onSelect={(selected) => onItemSelect(item.id, selected)}
          onClick={() => onItemClick(item)}
          isDarkMode={isDarkMode}
        />
      ))}
    </div>
  )
}
