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

const mockData: FileItem[] = [
  {
    id: "1",
    name: "Work Projects",
    type: "folder",
    modified: "2 days ago",
    owner: "You",
    children: [
      {
        id: "1-1",
        name: "Project Proposal.docx",
        type: "document",
        size: "2.4 MB",
        modified: "1 day ago",
        owner: "You",
        url: "#",
      },
      {
        id: "1-2",
        name: "Budget Analysis.xlsx",
        type: "document",
        size: "1.8 MB",
        modified: "3 days ago",
        owner: "John Doe",
        url: "#",
      },
    ],
  },
  {
    id: "2",
    name: "Photos",
    type: "folder",
    modified: "1 week ago",
    owner: "You",
    children: [
      {
        id: "2-1",
        name: "vacation-2024.jpg",
        type: "image",
        size: "4.2 MB",
        modified: "1 week ago",
        owner: "You",
        url: "#",
      },
      {
        id: "2-2",
        name: "family-dinner.png",
        type: "image",
        size: "3.1 MB",
        modified: "2 weeks ago",
        owner: "You",
        url: "#",
      },
    ],
  },
  {
    id: "3",
    name: "Meeting Recording.mp4",
    type: "video",
    size: "125 MB",
    modified: "3 days ago",
    owner: "Sarah Wilson",
    url: "#",
  },
  {
    id: "4",
    name: "Presentation.pptx",
    type: "document",
    size: "8.7 MB",
    modified: "5 days ago",
    owner: "You",
    url: "#",
  },
  {
    id: "5",
    name: "Audio Notes",
    type: "folder",
    modified: "1 month ago",
    owner: "You",
    children: [
      {
        id: "5-1",
        name: "interview-notes.mp3",
        type: "audio",
        size: "15.3 MB",
        modified: "1 month ago",
        owner: "You",
        url: "#",
      },
    ],
  },
  {
    id: "6",
    name: "README.txt",
    type: "other",
    size: "2.1 KB",
    modified: "2 months ago",
    owner: "You",
    url: "#",
  },
]

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
    <div className="flex h-screen bg-gray-900">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b border-gray-700 bg-gray-800 p-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <div className="w-5 h-5 bg-white rounded-sm"></div>
            </div>
            <h1 className="text-xl font-medium text-white">Drive</h1>
          </div>

          <div className="flex-1 max-w-2xl mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search in Drive"
                className="pl-10 bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-700">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-700">
              <HelpCircle className="w-4 h-4" />
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="px-6 py-4 border-b border-gray-700 bg-gray-800">
          <div className="flex items-center gap-1 text-sm">
            {currentPath.map((path, index) => (
              <div key={index} className="flex items-center gap-1">
                <button onClick={() => navigateBack(index)} className="text-gray-300 hover:text-white hover:underline">
                  {path}
                </button>
                {index < currentPath.length - 1 && <ChevronRight className="w-4 h-4 text-gray-500" />}
              </div>
            ))}
          </div>
        </div>

        {/* Toolbar */}
        <div className="px-6 py-4 border-b border-gray-700 bg-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button className="gap-2 bg-blue-600 hover:bg-blue-700">
              <Upload className="w-4 h-4" />
              Upload
            </Button>
            <Button variant="outline" className="gap-2">
              <Plus className="w-4 h-4" />
              New folder
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant={viewMode === "grid" ? "default" : "ghost"} size="icon" onClick={() => setViewMode("grid")}>
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "ghost"} size="icon" onClick={() => setViewMode("list")}>
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* File Grid/List */}
        <div className="flex-1 p-6 overflow-auto bg-gray-900">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredItems.map((item) => (
                <Card
                  key={item.id}
                  className="cursor-pointer hover:shadow-md transition-shadow group"
                  onClick={() => (item.type === "folder" ? navigateToFolder(item) : window.open(item.url, "_blank"))}
                >
                  <CardContent className="p-4 text-center">
                    <div className="mb-3 flex justify-center">{getFileIcon(item.type)}</div>
                    <h3 className="text-sm font-medium truncate mb-1">{item.name}</h3>
                    <p className="text-xs text-gray-500">{item.modified}</p>
                    {item.size && <p className="text-xs text-gray-400">{item.size}</p>}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Open</DropdownMenuItem>
                        <DropdownMenuItem>Share</DropdownMenuItem>
                        <DropdownMenuItem>Download</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Rename</DropdownMenuItem>
                        <DropdownMenuItem>Move to trash</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              <div className="grid grid-cols-12 gap-4 px-4 py-2 text-sm font-medium text-gray-400 border-b border-gray-700">
                <div className="col-span-6">Name</div>
                <div className="col-span-2">Owner</div>
                <div className="col-span-2">Last modified</div>
                <div className="col-span-2">File size</div>
              </div>
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-4 px-4 py-3 hover:bg-gray-800 rounded cursor-pointer group"
                  onClick={() => (item.type === "folder" ? navigateToFolder(item) : window.open(item.url, "_blank"))}
                >
                  <div className="col-span-6 flex items-center gap-3">
                    {getFileIcon(item.type)}
                    <span className="text-sm font-medium truncate text-white">{item.name}</span>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <span className="text-sm text-gray-400">{item.owner}</span>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <span className="text-sm text-gray-400">{item.modified}</span>
                  </div>
                  <div className="col-span-2 flex items-center justify-between">
                    <span className="text-sm text-gray-400">{item.size || "—"}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-700"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                        <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">Open</DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">Share</DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">Download</DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-700" />
                        <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">Rename</DropdownMenuItem>
                        <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">Move to trash</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-600 mb-2">
                <Folder className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-400 mb-1">No files found</h3>
              <p className="text-gray-500">
                {searchQuery ? "Try adjusting your search terms" : "This folder is empty"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
