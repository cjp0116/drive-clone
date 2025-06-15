"use client"

import { useState } from "react"
import {
  Search,
  Grid3X3,
  List,
  Upload,
  Plus,
  MoreVertical,
  Folder,
  FileText,
  FileImage,
  FileVideo,
  FileAudio,
  File,
  Settings,
  HelpCircle,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Card, CardContent } from "~/components/ui/card"
import { mockData } from "~/lib/mockData"

interface FileItem {
  id: string
  name: string
  type: "folder" | "document" | "image" | "video" | "audio" | "other"
  size?: string
  modified: string
  owner: string
  url?: string
  children?: FileItem[]
}


const getFileIcon = (type: string) => {
  switch (type) {
    case "folder":
      return <Folder className="w-8 h-8 text-blue-500" />
    case "document":
      return <FileText className="w-8 h-8 text-blue-600" />
    case "image":
      return <FileImage className="w-8 h-8 text-green-600" />
    case "video":
      return <FileVideo className="w-8 h-8 text-red-600" />
    case "audio":
      return <FileAudio className="w-8 h-8 text-purple-600" />
    default:
      return <File className="w-8 h-8 text-gray-600" />
  }
}

export default function Component() {
  const [currentPath, setCurrentPath] = useState<string[]>(["My Drive"])
  const [currentItems, setCurrentItems] = useState<FileItem[]>(mockData)
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [theme, setTheme] = useState<"light" | "dark">("dark")

  const navigateToFolder = (folder: FileItem) => {
    if (folder.type === "folder" && folder.children) {
      setCurrentPath([...currentPath, folder.name])
      setCurrentItems(folder.children)
    }
  }

  const navigateBack = (index: number) => {
    if (index === 0) {
      setCurrentPath(["My Drive"])
      setCurrentItems(mockData)
    } else {
      // In a real app, you'd need to track the full path structure
      // For this demo, we'll just go back to root
      setCurrentPath(["My Drive"])
      setCurrentItems(mockData)
    }
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
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <div className="w-5 h-5 bg-white rounded-sm"></div>
            </div>
            <h1 className="text-xl font-medium text-white">Drive</h1>
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
            {currentPath.map((path, index) => (
              <div key={index} className="flex items-center gap-1">
                <button
                  onClick={() => navigateBack(index)}
                  className={`${theme === "dark"
                      ? "text-gray-300 hover:text-white hover:underline"
                      : "text-gray-600 hover:text-gray-900 hover:underline"
                    }`}
                >
                  {path}
                </button>
                {index < currentPath.length - 1 && (
                  <ChevronRight className={`w-4 h-4 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Toolbar */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-white"
            }`}
        >
          <div className="flex items-center gap-2">
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
              <Upload className="w-4 h-4" />
              Upload
            </Button>
            <Button
              variant="outline"
              className={`gap-2 ${theme === "dark"
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
              className={
                viewMode === "grid"
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : theme === "dark"
                    ? "text-gray-400 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
              className={
                viewMode === "list"
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : theme === "dark"
                    ? "text-gray-400 hover:text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* File Grid/List */}
        <div className={`flex-1 p-6 overflow-auto ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className={`cursor-pointer hover:shadow-md transition-shadow group ${theme === "dark"
                      ? "bg-gray-800 border-gray-700 hover:bg-gray-750"
                      : "bg-white border-gray-200 hover:bg-gray-50"
                    }`}
                  onClick={() => (item.type === "folder" ? navigateToFolder(item) : window.open(item.url, "_blank"))}
                >
                  <CardContent className="p-4 text-center">
                    <div className="mb-3 flex justify-center">{getFileIcon(item.type)}</div>
                    <h3 className={`text-sm font-medium truncate mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {item.name}
                    </h3>
                    <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{item.modified}</p>
                    {item.size && (
                      <p className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>{item.size}</p>
                    )}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                            }`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className={theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}>
                        <DropdownMenuItem className={theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}>Open</DropdownMenuItem>
                        <DropdownMenuItem className={theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}>Share</DropdownMenuItem>
                        <DropdownMenuItem className={theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}>Download</DropdownMenuItem>
                        <DropdownMenuSeparator className={theme === "dark" ? "bg-gray-700" : "bg-gray-200"} />
                        <DropdownMenuItem className={theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}>Rename</DropdownMenuItem>
                        <DropdownMenuItem className={theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}>Move to trash</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
                <div
                  className={`grid grid-cols-12 gap-4 px-4 py-2 text-sm font-medium border-b ${theme === "dark" ? "text-gray-400 border-gray-700" : "text-gray-600 border-gray-200"
                    }`}
                >
                <div className="col-span-6">Name</div>
                <div className="col-span-2">Owner</div>
                <div className="col-span-2">Last modified</div>
                <div className="col-span-2">File size</div>
              </div>
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`grid grid-cols-12 gap-4 px-4 py-3 rounded cursor-pointer group ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                    }`}
                  onClick={() => (item.type === "folder" ? navigateToFolder(item) : window.open(item.url, "_blank"))}
                >
                  <div className="col-span-6 flex items-center gap-3">
                    {getFileIcon(item.type)}
                    <span className={`text-sm font-medium truncate ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      {item.name}
                    </span>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{item.owner}</span>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{item.modified}</span>
                  </div>
                  <div className="col-span-2 flex items-center justify-between">
                    <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{item.size ?? "—"}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className={`opacity-0 group-hover:opacity-100 transition-opacity ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                            }`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className={`w-4 h-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className={theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}
                      >
                        <DropdownMenuItem
                          className={theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}
                        >
                          Open
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className={theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}
                        >
                          Share
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className={theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}
                        >
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className={theme === "dark" ? "bg-gray-700" : "bg-gray-200"} />
                        <DropdownMenuItem
                          className={theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}
                        >
                          Rename
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className={theme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-700 hover:bg-gray-100"}
                        >
                          Move to trash
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className={`mb-2 ${theme === "dark" ? "text-gray-600" : "text-gray-400"}`}>
                <Folder className="w-16 h-16 mx-auto" />
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
    </div>
  )
}
