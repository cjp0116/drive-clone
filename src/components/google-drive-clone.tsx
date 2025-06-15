"use client"

import { useState, useMemo, useEffect } from "react"
import {
  Search,
  Folder as FolderIcon,
  Settings,
  HelpCircle,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { mockFiles, mockFolders } from "~/lib/mockData"
import type { File, Folder } from "~/lib/mockData"
import { FileGrid, FileRow, FolderGrid, FolderRow } from "~/components/fileRow"
import Toolbar from "~/components/ui/Toolbar"


export default function Component() {
  const [currentFolder, setCurrentFolder] = useState<string>("root")
  const [currentItems, setCurrentItems] = useState<File[] | Folder[]>(mockFiles)
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme")
      return saved ? (saved as "light" | "dark") : "dark"
    }
    return "dark"
  })

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme))
  }, [theme])

  const getCurrentFolder = () => {
    return mockFolders.filter((folder) => folder.parent === currentFolder)
  }

  const getCurrentFiles = () => {
    console.log("currentItems", mockFiles.filter((file) => file.parent === currentFolder))
    return mockFiles.filter((file) => file.parent === currentFolder)
  }

  const handleFolderClick = (folderId: string) => {
    setCurrentFolder(folderId)
  }

  const navigateToFolder = (folderId: string) => {
    setCurrentFolder(folderId)
    setCurrentItems(getCurrentFiles())
  }

  const breadcrumbs = useMemo(() => {
    const breadCrumbs = []
    let currentId = currentFolder;

    while (currentId !== null) {
      const folder = mockFolders.find((folder) => folder.id === currentFolder)
      if (folder) {
        breadCrumbs.unshift(folder)
        currentId = folder.parent ?? "root";
      } else {
        break
      }
    }
    return breadCrumbs
  }, [currentFolder])

  const navigateBack = (folderId: string) => {
    if (folderId === "root") {
      setCurrentFolder("root");
      setCurrentItems(getCurrentFiles())
    }
    setCurrentFolder(folderId)
    setCurrentItems(getCurrentFiles())
    console.log("currentFolder", currentFolder)
  }

  const filteredItems = currentItems.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className={`flex h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header
          className={`border-b p-4 flex items-center gap-4 ${theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
            }`}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center cursor-pointer" onClick={() => setCurrentFolder("root")} >
              <div className="w-5 h-5 bg-white rounded-sm"></div>
            </div>
            <h1 className="text-xl font-medium text-white">My Drive</h1>
          </div>

          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
              />
              <Input
                placeholder="Search in Drive"
                className={`pl-10 ${theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <Button
              variant="ghost"
              size="icon"
              className={`${theme === "dark"
                ? "text-gray-400 hover:text-white hover:bg-gray-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`${theme === "dark"
                ? "text-gray-400 hover:text-white hover:bg-gray-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`${theme === "dark"
                ? "text-gray-400 hover:text-white hover:bg-gray-700"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
            >
              <HelpCircle className="w-4 h-4" />
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback className={theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"}>
                JD
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Breadcrumb */}
        <div
          className={`px-6 py-4 border-b ${theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"}`}
        >
          <div className="flex items-center gap-1 text-sm">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentFolder("root")}
                className={`${theme === "dark"
                  ? "text-gray-300 hover:text-white hover:underline"
                  : "text-gray-600 hover:text-gray-900 hover:underline"
                  }`}
              >
                My Drive
              </button>
            </div>
            {breadcrumbs.map((path, index) => (
              <div key={index} className="flex items-center gap-1">
                <button
                  onClick={() => navigateBack(path.id)}
                  className={`${theme === "dark"
                    ? "text-gray-300 hover:text-white hover:underline"
                    : "text-gray-600 hover:text-gray-900 hover:underline"
                    }`}
                >
                  {path.name}
                </button>
                {index < getCurrentFolder().length - 1 && (
                  <ChevronRight className={`w-4 h-4 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Toolbar */}
        <Toolbar
          theme={theme}
          viewMode={viewMode}
          setViewMode={setViewMode}
        /> 

        {/* File Grid/List */}
        <div className={`flex-1 p-6 overflow-auto ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {getCurrentFolder().map((folder, index) => (
                <FolderGrid
                  key={index}
                  folder={folder}
                  theme={theme}
                  handleFolderClick={handleFolderClick}
                />
              ))}
              {filteredItems.map((item, index) => (
                <FileGrid
                  key={index} 
                  item={item as File}
                  theme={theme}
                  navigateToFolder={navigateToFolder}
                />
              ))}
            </div>
          ) : (
            <>
            {getCurrentFolder().map((folder, index) => (
              <FolderRow
                key={index}
                folder={folder}
                theme={theme}
                handleFolderClick={handleFolderClick}
              />
            ))}
            {filteredItems.map((item) => (
              <FileRow
                key={item.id}
                item={item as File}
                theme={theme}
                navigateToFolder={navigateToFolder}
           
              />
            ))}
            </>
          )}
        </div>
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className={`mb-2 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}>
              <FolderIcon className="w-16 h-16 mx-auto" />
            </div>
            <h3 className={`text-lg font-medium mb-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              No files found
            </h3>
            <p className={`${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}>
              {searchQuery ? "Try adjusting your search terms" : "This folder is empty"}
            </p>
          </div>
        )}
      </div>
    </div>

  )
}
