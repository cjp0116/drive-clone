export interface FileItem {
    id: string
    name: string
    type: "folder" | "document" | "image" | "video" | "audio" | "other"
    size?: string
    modified: string
    owner: string
    url?: string
    children?: FileItem[]
}

export const mockData: FileItem[] = [
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