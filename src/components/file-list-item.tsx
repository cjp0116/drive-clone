"use client"

import type React from "react"
import { useState } from "react"
import { MoreVertical, Check } from "lucide-react"
import { Button } from "~/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import type { FileItem } from "~/lib/mockData"
import { getFileIcon } from "~/components/ui/icons";
import Link from 'next/link';

interface FileListItemProps {
  item: FileItem
  isSelected: boolean
  onSelect: (selected: boolean) => void
  isDarkMode: boolean
}

export default function FileListItem({ item, isSelected, onSelect, isDarkMode }: FileListItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleRowClick = (e: React.MouseEvent) => {
    if (
      (e.target as HTMLElement).closest(".checkbox-container") ||
      (e.target as HTMLElement).closest(".dropdown-trigger")
    ) {
      return
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    onSelect(checked)
  }

  return (
    <Link href={item.type === "folder" ? `/${item.id}` : ``}
      className={`grid grid-cols-12 gap-4 px-4 py-3 rounded cursor-pointer group transition-all duration-200 ease-in-out relative ${isSelected
        ? isDarkMode
          ? "bg-blue-900 hover:bg-blue-800"
          : "bg-blue-50 hover:bg-blue-100"
        : isDarkMode
          ? "hover:bg-gray-800"
          : "hover:bg-gray-100"
        }`}
      onClick={handleRowClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="col-span-6 flex items-center gap-3">
        {(isHovered || isSelected) && (
          <div className="checkbox-container">
            <Button
              variant="ghost"
              size="icon"
              className={`w-5 h-5 rounded border-2 transition-all duration-200 ${isSelected ? "bg-blue-600 border-blue-600 text-white" : "bg-white border-gray-300 hover:border-gray-400"
                }`}
              onClick={(e) => {
                e.stopPropagation()
                handleCheckboxChange(!isSelected)
              }}
            >
              {isSelected && <Check className="w-3 h-3" />}
            </Button>
          </div>
        )}
        {getFileIcon(item.type)}
        <span
          className={`text-sm font-medium truncate transition-colors duration-300 ease-in-out ${isDarkMode ? "text-white" : "text-gray-900"
            }`}
        >
          {item.name}
        </span>
      </div>
      <div className="col-span-2 flex items-center">
        <span
          className={`text-sm transition-colors duration-300 ease-in-out ${isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
        >
          {item.ownerId}
        </span>
      </div>
      <div className="col-span-2 flex items-center">
        <span
          className={`text-sm transition-colors duration-300 ease-in-out ${isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
        >
          {item.modified}
        </span>
      </div>
      <div className="col-span-2 flex items-center justify-between">
        <span
          className={`text-sm transition-colors duration-300 ease-in-out ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
        >
          {item.size ?? "—"}
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={`opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out dropdown-trigger ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                }`}
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical
                className={`w-4 h-4 transition-colors duration-300 ease-in-out ${isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className={`transition-colors duration-300 ease-in-out ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
              }`}
          >
            <DropdownMenuItem
              className={`transition-colors duration-200 ease-in-out ${isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              Open
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`transition-colors duration-200 ease-in-out ${isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              Share
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`transition-colors duration-200 ease-in-out ${isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              Download
            </DropdownMenuItem>
            <DropdownMenuSeparator
              className={`transition-colors duration-300 ease-in-out ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}
            />
            <DropdownMenuItem
              className={`transition-colors duration-200 ease-in-out ${isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              Rename
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`transition-colors duration-200 ease-in-out ${isDarkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              Move to trash
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Link>
  )
}
