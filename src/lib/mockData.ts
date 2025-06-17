export interface Folder {
    id: number
    ownerId: string
    size: bigint
    name: string
    parent: number | null
    createdAt: Date
}

export interface File {
    id: number
    ownerId: string
    name: string
    type: string | null
    size: bigint
    url: string
    createdAt: Date
    parent: number
}

export interface FileSystemItem {
    id: number
    name: string
    type: "folder" | "file"
    size: bigint
    ownerId: string
    parent: number | null
    createdAt: Date
    url?: string
    fileType?: string | null
    children?: FileSystemItem[]
}

export interface FileItem {
    id: string
    name: string
    type: "folder" | "document" | "image" | "video" | "audio" | "other"
    size?: string
    modified: string
    ownerId: string
    url?: string
    children?: FileItem[]
}

export const mockFolders: Folder[] = [
    {
        id: 1,
        ownerId: "user_123",
        size: BigInt(0), // Folders typically have 0 size or calculated size
        name: "My Drive",
        parent: null, // Root folder
        createdAt: new Date("2024-01-01T00:00:00Z"),
    },
    {
        id: 2,
        ownerId: "user_123",
        size: BigInt(0),
        name: "Work Projects",
        parent: 1,
        createdAt: new Date("2024-01-15T10:30:00Z"),
    },
    {
        id: 3,
        ownerId: "user_123",
        size: BigInt(0),
        name: "Photos",
        parent: 1,
        createdAt: new Date("2024-02-01T14:20:00Z"),
    },
    {
        id: 4,
        ownerId: "user_123",
        size: BigInt(0),
        name: "Audio Notes",
        parent: 1,
        createdAt: new Date("2024-01-20T09:15:00Z"),
    },
    {
        id: 5,
        ownerId: "user_123",
        size: BigInt(0),
        name: "Documents",
        parent: 2, // Inside Work Projects
        createdAt: new Date("2024-01-16T11:45:00Z"),
    },
]

export const mockFiles: File[] = [
    {
        id: 1,
        ownerId: "user_123",
        name: "Project Proposal.docx",
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        size: BigInt(2516582), // ~2.4 MB in bytes
        url: "https://example.com/files/project-proposal.docx",
        createdAt: new Date("2024-01-16T15:30:00Z"),
        parent: 5, // Inside Documents folder
    },
    {
        id: 2,
        ownerId: "user_456", // Different owner (shared file)
        name: "Budget Analysis.xlsx",
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        size: BigInt(1887437), // ~1.8 MB in bytes
        url: "https://example.com/files/budget-analysis.xlsx",
        createdAt: new Date("2024-01-13T09:20:00Z"),
        parent: 2, // Inside Work Projects
    },
    {
        id: 3,
        ownerId: "user_123",
        name: "vacation-2024.jpg",
        type: "image/jpeg",
        size: BigInt(4404019), // ~4.2 MB in bytes
        url: "https://example.com/files/vacation-2024.jpg",
        createdAt: new Date("2024-02-01T16:45:00Z"),
        parent: 3, // Inside Photos
    },
    {
        id: 4,
        ownerId: "user_123",
        name: "family-dinner.png",
        type: "image/png",
        size: BigInt(3250586), // ~3.1 MB in bytes
        url: "https://example.com/files/family-dinner.png",
        createdAt: new Date("2024-01-25T19:30:00Z"),
        parent: 3, // Inside Photos
    },
    {
        id: 5,
        ownerId: "user_789", // Different owner (shared file)
        name: "Meeting Recording.mp4",
        type: "video/mp4",
        size: BigInt(131072000), // ~125 MB in bytes
        url: "https://example.com/files/meeting-recording.mp4",
        createdAt: new Date("2024-01-12T14:00:00Z"),
        parent: 1, // In root My Drive
    },
    {
        id: 6,
        ownerId: "user_123",
        name: "Presentation.pptx",
        type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        size: BigInt(9126805), // ~8.7 MB in bytes
        url: "https://example.com/files/presentation.pptx",
        createdAt: new Date("2024-01-10T11:15:00Z"),
        parent: 1, // In root My Drive
    },
    {
        id: 7,
        ownerId: "user_123",
        name: "interview-notes.mp3",
        type: "audio/mpeg",
        size: BigInt(16052429), // ~15.3 MB in bytes
        url: "https://example.com/files/interview-notes.mp3",
        createdAt: new Date("2023-12-15T10:30:00Z"),
        parent: 4, // Inside Audio Notes
    },
    {
        id: 8,
        ownerId: "user_123",
        name: "README.txt",
        type: "text/plain",
        size: BigInt(2150), // ~2.1 KB in bytes
        url: "https://example.com/files/readme.txt",
        createdAt: new Date("2023-11-20T08:45:00Z"),
        parent: 1, // In root My Drive
    },
];

function getFileTypeCategory(mimeType: string | null): "document" | "image" | "video" | "audio" | "other" {
    if (!mimeType) return "other"

    if (mimeType.startsWith("image/")) return "image"
    if (mimeType.startsWith("video/")) return "video"
    if (mimeType.startsWith("audio/")) return "audio"
    if (
        mimeType.includes("document") ||
        mimeType.includes("spreadsheet") ||
        mimeType.includes("presentation") ||
        mimeType === "text/plain" ||
        mimeType === "application/pdf"
    ) {
        return "document"
    }
    return "other"
}

// Helper function to format file size
function formatFileSize(bytes: bigint): string {
    const sizes = ["B", "KB", "MB", "GB"]
    if (bytes === BigInt(0)) return "0 B"

    const bytesNumber = Number(bytes)
    const i = Math.floor(Math.log(bytesNumber) / Math.log(1024))
    const size = bytesNumber / Math.pow(1024, i)

    return `${size.toFixed(1)} ${sizes[i]}`
}

// Helper function to format relative time
function formatRelativeTime(date: Date): string {
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
    const diffInWeeks = Math.floor(diffInDays / 7)
    const diffInMonths = Math.floor(diffInDays / 30)

    if (diffInDays === 0) return "Today"
    if (diffInDays === 1) return "1 day ago"
    if (diffInDays < 7) return `${diffInDays} days ago`
    if (diffInWeeks === 1) return "1 week ago"
    if (diffInWeeks < 4) return `${diffInWeeks} weeks ago`
    if (diffInMonths === 1) return "1 month ago"
    if (diffInMonths < 12) return `${diffInMonths} months ago`

    const diffInYears = Math.floor(diffInMonths / 12)
    if (diffInYears === 1) return "1 year ago"
    return `${diffInYears} years ago`
}

// Helper function to get owner display name
function getOwnerDisplayName(ownerId: string): string {
    const ownerMap: Record<string, string> = {
        user_123: "You",
        user_456: "John Doe",
        user_789: "Sarah Wilson",
    }
    return ownerMap[ownerId] ?? "Unknown User"
}




// Function to build file system tree structure
export function buildFileSystemTree(parentId: number | null = null): FileSystemItem[] {
    const items: FileSystemItem[] = []

    const folders = mockFolders.filter((folder) => folder.parent === parentId)
    folders.forEach((folder) => {
        const folderItem: FileSystemItem = {
            id: folder.id,
            name: folder.name,
            type: "folder",
            size: folder.size,
            ownerId: folder.ownerId,
            parent: folder.parent,
            createdAt: folder.createdAt,
            children: buildFileSystemTree(folder.id), // Recursively build children
        }
        items.push(folderItem)
    })

    const files = mockFiles.filter((file) => file.parent === parentId)
    files.forEach((file) => {
        const fileItem: FileSystemItem = {
            id: file.id,
            name: file.name,
            type: "file",
            size: file.size,
            ownerId: file.ownerId,
            parent: file.parent,
            createdAt: file.createdAt,
            url: file.url,
            fileType: file.type,
        }
        items.push(fileItem)
    })

    // Sort by creation date (newest first)
    return items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}


export function getItemsForParent(parentId: number | null = null): FileSystemItem[] {
    return buildFileSystemTree(parentId)
}

// Function to convert FileSystemItem to the format expected by the UI components
export function convertToUIFormat(items: FileSystemItem[]): FileItem[] {
    return items.map((item) => ({
        id: item.id.toString(),
        name: item.name,
        type: item.type === "folder" ? "folder" : getFileTypeCategory(item.fileType ?? null),
        size: item.type === "file" ? formatFileSize(item.size) : undefined, 
        modified: formatRelativeTime(item.createdAt),
        ownerId: getOwnerDisplayName(item.ownerId),
        url: item.url,
        children: item.children ? convertToUIFormat(item.children) : undefined,
    }))
}

export const mockData = convertToUIFormat(buildFileSystemTree(1))