import { Folder, FileText, FileImage, FileVideo, FileAudio, File } from "lucide-react"

export const getFileIcon = (type: string) => {
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
