export type File = {
    id: string
    name: string
    type: "document" | "image" | "video" | "audio" | "other" | "folder"
    size?: string
    modified: string
    owner: string
    url?: string
    parent: string
}
export type Folder = {
    type: "folder",
    id: string
    name: string
    owner: string
    parent: string | null,
    size?: string
}

export const mockFolders: Folder[] = [
    {
        type: "folder",
        id: "root",
        name: "root",
        owner: "You",
        parent: null,
        size: "0 B",
    },
    {
        type: "folder",
        id: "1",
        name: "Work Projects",
        owner: "You",
        parent: "root",
        size: "0 B",
    },
    {
        type: "folder",
        id: "2",
        name: "Photos",
        owner: "You",
        parent: "root",
        size: "0 B",
    },
    {
        type: "folder",
        id: "3",
        name: "Audio Notes",
        owner: "You",
        parent: "root",
        size: "0 B",
    },
    {
        type: "folder",
        id: "4",
        name: "Presentations",
        owner: "You",
        parent: "3",
        size: "0 B",
    },
]

export const mockFiles: File[] = [
    {
        id: "1-1",
        name: "Project Proposal.docx",
        type: "document",
        size: "2.4 MB",
        modified: "1 day ago",
        owner: "You",
        url: "#",
        parent: "1",
    },
    {
        id: "1-2",
        name: "Budget Analysis.xlsx",
        type: "document",
        size: "1.8 MB",
        modified: "3 days ago",
        owner: "John Doe",
        url: "#",
        parent: "1",
    }, {
        id: "2-1",
        name: "vacation-2024.jpg",
        type: "image",
        size: "4.2 MB",
        modified: "1 week ago",
        owner: "You",
        url: "#",
        parent: "2",
    },
    {
        id: "2-2",
        name: "family-dinner.png",
        type: "image",
        size: "3.1 MB",
        modified: "2 weeks ago",
        owner: "You",
        url: "#",
        parent: "2",
    },
    {
        id: "root-3",
        name: "Meeting Recording.mp4",
        type: "video",
        size: "125 MB",
        modified: "3 days ago",
        owner: "Sarah Wilson",
        url: "#",
        parent: "root",
    },
    {
        id: "root-4",
        name: "Presentation.pptx",
        type: "document",
        size: "8.7 MB",
        modified: "5 days ago",
        owner: "You",
        url: "#",
        parent: "root",
    },
    {
        id: "root-5",
        name: "README.txt",
        type: "other",
        size: "2.1 KB",
        modified: "2 months ago",
        owner: "You",
        url: "#",
        parent: "root",
    },
    {
        id: "3-1",
        name: "interview-notes.mp3",
        type: "audio",
        size: "15.3 MB",
        modified: "1 month ago",
        owner: "You",
        url: "#",
        parent: "3",
    },
]

// export const mockData: FileItem[] = [
//     {
//         id: "1",
//         name: "Work Projects",
//         type: "folder",
//         modified: "2 days ago",
//         owner: "You",
//         children: [
//             {
//                 id: "1-1",
//                 name: "Project Proposal.docx",
//                 type: "document",
//                 size: "2.4 MB",
//                 modified: "1 day ago",
//                 owner: "You",
//                 url: "#",
//             },
//             {
//                 id: "1-2",
//                 name: "Budget Analysis.xlsx",
//                 type: "document",
//                 size: "1.8 MB",
//                 modified: "3 days ago",
//                 owner: "John Doe",
//                 url: "#",
//             },
//         ],
//     },
//     {
//         id: "2",
//         name: "Photos",
//         type: "folder",
//         modified: "1 week ago",
//         owner: "You",
//         children: [
//             {
//                 id: "2-1",
//                 name: "vacation-2024.jpg",
//                 type: "image",
//                 size: "4.2 MB",
//                 modified: "1 week ago",
//                 owner: "You",
//                 url: "#",
//             },
//             {
//                 id: "2-2",
//                 name: "family-dinner.png",
//                 type: "image",
//                 size: "3.1 MB",
//                 modified: "2 weeks ago",
//                 owner: "You",
//                 url: "#",
//             },
//         ],
//     },
//     {
//         id: "3",
//         name: "Meeting Recording.mp4",
//         type: "video",
//         size: "125 MB",
//         modified: "3 days ago",
//         owner: "Sarah Wilson",
//         url: "#",
//     },
//     {
//         id: "4",
//         name: "Presentation.pptx",
//         type: "document",
//         size: "8.7 MB",
//         modified: "5 days ago",
//         owner: "You",
//         url: "#",
//     },
//     {
//         id: "5",
//         name: "Audio Notes",
//         type: "folder",
//         modified: "1 month ago",
//         owner: "You",
//         children: [
//             {
//                 id: "5-1",
//                 name: "interview-notes.mp3",
//                 type: "audio",
//                 size: "15.3 MB",
//                 modified: "1 month ago",
//                 owner: "You",
//                 url: "#",
//             },
//         ],
//     },
//     {
//         id: "6",
//         name: "README.txt",
//         type: "other",
//         size: "2.1 KB",
//         modified: "2 months ago",
//         owner: "You",
//         url: "#",
//     },
// ]