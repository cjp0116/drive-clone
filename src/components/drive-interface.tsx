"use client"

import { useState } from "react"
import { Folder } from "lucide-react"

import Header from "./header"
import Breadcrumb from "./breadCrumbs"
import Toolbar from "./ui/Toolbar"
import GroupActions from "./group-actions"
import FileGrid from "./file-grid"
import FileList from "./file-list"
import { useTheme } from "~/context/themeProvider";
import type { FileItem } from "~/lib/mockData";
import { useRouter } from "next/navigation";

interface PathItem {
  name: string;
  id: number;
}

interface DriveInterfaceProps {
  items: FileItem[];
  path: PathItem[];
}

export default function DriveInterface({
  items,
  path
}: DriveInterfaceProps) {
  const [currentPath, setCurrentPath] = useState<PathItem[]>(path);
  const [currentItems, setCurrentItems] = useState<FileItem[]>(items);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set())

  const { toggleTheme, theme } = useTheme();
  const isDarkMode = theme === "dark";
  const router = useRouter();

  const handleItemSelect = (id: string, selected: boolean) => {
    const newSelectedItems = new Set(selectedItems)
    if (selected) {
      newSelectedItems.add(id)
    } else {
      newSelectedItems.delete(id)
    }
    setSelectedItems(newSelectedItems)
  }

  const navigateToFolder = (folder: FileItem) => {
    if (folder.type === 'folder') {
      setCurrentPath(currentPath => [...currentPath, { name: folder.name, id: Number(folder.id) }])
      router.push(`/${folder.id}`)
    } else {
      console.error("Cannot navigate to a file")
    }
  }

  const navigateBack = (folderId: number) => {
    const currentIndex = currentPath.findIndex(item => item.id === folderId);
    if (currentIndex === -1) {
      // If we can't find the folder, go to root
      router.push('/1');
      setCurrentPath([{ name: 'Root', id: 1 }]);
    } else {
      // Update the path to only include items up to the clicked folder
      const newPath = currentPath.slice(0, currentIndex + 1);
      setCurrentPath(newPath);
      router.push(`/${folderId}`);
    }
  }

  const handleItemClick = (item: FileItem) => {
    if (item.type === "folder") {
      navigateToFolder(item)
    } else {
      window.open(item.url, "_blank")
    }
  }

  const clearSelection = () => {
    setSelectedItems(new Set())
  }

  const filteredItems = currentItems?.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
  return (
    <div
      className={`flex h-screen transition-colors duration-300 ease-in-out ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
    >
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <Breadcrumb
          currentPath={currentPath}
          onNavigateBack={navigateBack}
          isDarkMode={isDarkMode}
        />

        {selectedItems.size > 0 && (
          <GroupActions
            selectedCount={selectedItems.size}
            onClearSelection={clearSelection}
            isDarkMode={isDarkMode}
          />
        )}

        <Toolbar
          viewMode={viewMode}
          setViewMode={setViewMode}
          isDarkMode={isDarkMode}
        />

        {/* File Grid/List */}
        <div
          className={`flex-1 p-6 overflow-auto transition-colors duration-300 ease-in-out ${isDarkMode ? "bg-gray-900" : "bg-gray-50"}`}
        >
          {viewMode === "grid" ? (
            <FileGrid
              items={filteredItems}
              selectedItems={selectedItems}
              onItemSelect={handleItemSelect}
              onItemClick={handleItemClick}
              isDarkMode={isDarkMode}
            />

          ) : (

            <FileList
              items={filteredItems}
              selectedItems={selectedItems}
              onItemSelect={handleItemSelect}
              onItemClick={handleItemClick}
              isDarkMode={isDarkMode}
            />


          )}

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div
                className={`mb-2 transition-colors duration-300 ease-in-out ${isDarkMode ? "text-gray-600" : "text-gray-400"}`}
              >
                <Folder className="w-16 h-16 mx-auto" />
              </div>
              <h3
                className={`text-lg font-medium mb-1 transition-colors duration-300 ease-in-out ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}
              >
                No files found
              </h3>
              <p
                className={`transition-colors duration-300 ease-in-out ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}
              >
                {searchQuery ? "Try adjusting your search terms" : "This folder is empty"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
