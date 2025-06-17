"use client"

import type React from "react"
import { useState } from "react"
import { MoreVertical, Check } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Card, CardContent } from "~/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import type { FileItem } from "~/lib/mockData"
import { getFileIcon } from "~/components/ui/icons"
import Link from 'next/link'

interface FileCardProps {
    item: FileItem
    isSelected: boolean
    onSelect: (selected: boolean) => void
    onClick: () => void
    isDarkMode: boolean
}

export default function FileCard({ item, isSelected, onSelect, onClick, isDarkMode }: FileCardProps) {
    const [isHovered, setIsHovered] = useState(false)

    const handleCardClick = (e: React.MouseEvent) => {
        if (
            (e.target as HTMLElement).closest(".checkbox-container") ||
            (e.target as HTMLElement).closest(".dropdown-trigger")
        ) {
            return
        }
        onClick()
    }

    const handleCheckboxChange = (checked: boolean) => {
        onSelect(checked)
    }

    return (
        <Card
            className={`cursor-pointer hover:shadow-md transition-all duration-300 ease-in-out group relative ${isSelected
                    ? isDarkMode
                        ? "bg-blue-900 border-blue-600 ring-2 ring-blue-500"
                        : "bg-blue-50 border-blue-300 ring-2 ring-blue-400"
                    : isDarkMode
                        ? "bg-gray-800 border-gray-700 hover:bg-gray-750"
                        : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
            onClick={handleCardClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <CardContent className="p-4 text-center">
                {(isHovered || isSelected) && (
                    <div className="absolute top-2 left-2 checkbox-container">
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

                <div className="mb-3 flex justify-center">{getFileIcon(item.type)}</div>
                <h3
                    className={`text-sm font-medium truncate mb-1 transition-colors duration-300 ease-in-out ${isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                >
                    {item.name}
                </h3>
                <p
                    className={`text-xs transition-colors duration-300 ease-in-out ${isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                >
                    {item.modified}
                </p>
                {item.size && (
                    <p
                        className={`text-xs transition-colors duration-300 ease-in-out ${isDarkMode ? "text-gray-500" : "text-gray-400"
                            }`}
                    >
                        {item.size}
                    </p>
                )}

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className={`absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out dropdown-trigger ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                                }`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <MoreVertical className="w-4 h-4" />
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
            </CardContent>
        </Card>
    )
}
