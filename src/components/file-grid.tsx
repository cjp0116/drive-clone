"use client"

import type { FileItem } from "~/lib/mockData"
import FileCard from "./file-cards"

interface FileGridProps {
  items: FileItem[]
  selectedItems: Set<string>
  onItemSelect: (id: string, selected: boolean) => void
  onItemClick: (item: FileItem) => void
  isDarkMode: boolean
}


export default function FileGrid({ items, selectedItems, onItemSelect, onItemClick, isDarkMode }: FileGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {items.map((item) => (
        <FileCard
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
