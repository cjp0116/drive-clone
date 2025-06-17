"use client"

import { Upload, Plus, Grid3X3, List } from "lucide-react"
import { Button } from "~/components/ui/button"

interface ToolbarProps {
    viewMode: "grid" | "list"
    setViewMode: (mode: "grid" | "list") => void
    isDarkMode: boolean
}

export default function Toolbar({ viewMode, setViewMode, isDarkMode }: ToolbarProps) {
    return (
        <div
            className={`px-6 py-4 border-b flex items-center justify-between transition-colors duration-300 ease-in-out ${isDarkMode ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
                }`}
        >
            <div className="flex items-center gap-2">
                <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
                    <Upload className="w-4 h-4" />
                    Upload
                </Button>
                <Button
                    variant="outline"
                    className={`gap-2 transition-colors duration-300 ease-in-out ${isDarkMode
                            ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                            : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                >
                    <Plus className="w-4 h-4" />
                    New folder
                </Button>
            </div>

            <div className="flex items-center gap-2">
                <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className={`transition-all duration-300 ease-in-out ${viewMode === "grid"
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : isDarkMode
                                ? "text-gray-400 hover:text-white hover:bg-gray-700"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                >
                    <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className={`transition-all duration-300 ease-in-out ${viewMode === "list"
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : isDarkMode
                                ? "text-gray-400 hover:text-white hover:bg-gray-700"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        }`}
                >
                    <List className="w-4 h-4" />
                </Button>
            </div>
        </div>
    )
}
