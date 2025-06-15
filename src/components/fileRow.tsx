import { type File, type Folder } from "~/lib/mockData"
import { Card, CardContent } from "./ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Button } from "./ui/button"
import { MoreVertical } from "lucide-react"
import { FolderIcon, FileText, FileImage, FileVideo, FileAudio, FileIcon } from "lucide-react"

export function getFileIcon(type: string): React.ReactNode {
    switch (type) {
        case "folder":
            return <FolderIcon className="w-8 h-8 text-blue-500" />
        case "document":
            return <FileText className="w-8 h-8 text-blue-600" />
        case "image":
            return <FileImage className="w-8 h-8 text-green-600" />
        case "video":
            return <FileVideo className="w-8 h-8 text-red-600" />
        case "audio":
            return <FileAudio className="w-8 h-8 text-purple-600" />
        default:
            return <FileIcon className="w-8 h-8 text-gray-600" />
    }
}

export function FolderRow({ folder, theme, handleFolderClick }: { folder: Folder, theme: string, handleFolderClick: (folderId: string) => void }) {
    return (
        <div
            key={folder.id}
            className={`grid grid-cols-12 gap-4 px-4 py-3 rounded cursor-pointer group ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                }`}
            onClick={() => handleFolderClick(folder.id)}
        >
            <div className="col-span-6 flex items-center gap-3">
                {getFileIcon('folder')}
                <span className={`text-sm font-medium truncate ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {folder.name}
                </span>
            </div>
            <div className="col-span-2 flex items-center">
                <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{folder.owner}</span>
            </div>
            <div className="col-span-2 flex items-center">
                <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    {"—"}
                </span>
            </div>
            <div className="col-span-2 flex items-center">
                <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    {folder.size}
                </span>
            </div>
        </div>
    )
}

export function FileRow({ item, theme, navigateToFolder }: { item: File, theme: string, navigateToFolder: (folderId: string) => void }) {
    return (
        <div
            key={item.id}
            className={`grid grid-cols-12 gap-4 px-4 py-3 rounded cursor-pointer group ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-100"
                }`}
            onClick={() => (item.type === "folder" ? navigateToFolder(item.id) : window.open(item.url, "_blank"))}
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
                <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    {item.type !== "folder" ? item.modified : "—"}
                </span>
            </div>
            {item.type !== 'folder' && (
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
            )}
        </div>
    )
}

export function FileGrid({ item, theme, navigateToFolder }: { item: File, theme: string, navigateToFolder: (folderId: string) => void }) {
    return (
        <Card
            key={item.id}
            className={`cursor-pointer hover:shadow-md transition-shadow group ${theme === "dark"
                ? "bg-gray-800 border-gray-700 hover:bg-gray-750"
                : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
            onClick={() => (item.type === "folder" ? navigateToFolder(item.id) : window.open(item.url, "_blank"))}
        >
            <CardContent className="p-4 text-center">
                <div className="mb-3 flex justify-center">{getFileIcon(item.type)}</div>
                <h3 className={`text-sm font-medium truncate mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {item.name}
                </h3>
                <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    {item.type !== "folder" ? item.modified : "—"}
                </p>
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
    )
}

export function FolderGrid({ folder, theme, handleFolderClick }: { folder: Folder, theme: string, handleFolderClick: (folderId: string) => void }) {
    return (
        <Card
            key={folder.id}
            className={`cursor-pointer hover:shadow-md transition-shadow group ${theme === "dark"
                ? "bg-gray-800 border-gray-700 hover:bg-gray-750"
                : "bg-white border-gray-200 hover:bg-gray-50"
                }`}
            onClick={() => handleFolderClick(folder.id)}
        >
            <CardContent className="p-4 text-center">
                <div className="mb-3 flex justify-center">{getFileIcon('folder')}</div>
                <h3 className={`text-sm font-medium truncate mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                    {folder.name}
                </h3>
                <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                  
                </p>
                {folder.size && (
                    <p className={`text-xs ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>{folder.size}</p>
                )}

            </CardContent>
        </Card>
    )
}