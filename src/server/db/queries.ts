import { db } from "~/server/db";
import {
    files as filesSchema,
    folders as foldersSchema,
} from "~/server/db/schema";
import { eq } from 'drizzle-orm';
import type { FileSystemItem } from "~/lib/mockData";

export const QUERIES = {
    getAllFiles: function () {
        return db
            .select()
            .from(filesSchema)
            .orderBy((filesSchema.id))
    },

    getAllFolders: function () {
        return db
            .select()
            .from(foldersSchema)
            .orderBy((foldersSchema.id))
    },

    getFolders: function (folderId: number) {
        return db
            .select()
            .from(foldersSchema)
            .where(eq(foldersSchema.parent, folderId))
            .orderBy((foldersSchema.id))
    },

    getFiles: function (folderId: number) {
        return db
            .select()
            .from(filesSchema)
            .where(eq(filesSchema.parent, folderId))
            .orderBy((filesSchema.id))
    },

    getAllParentsForFolder: async function (folderId: number) {
        const parents = [];
        let currentId: number | null = folderId;
        while (currentId !== null) {
            const folder = await db
                .selectDistinct()
                .from(foldersSchema)
                .where(eq(foldersSchema.id, currentId));

            if (!folder[0]) {
                throw new Error("Parent folder not found")
            }

            parents.unshift(folder[0]);
            currentId = folder[0]?.parent;
        }
        return parents;
    },
    async buildFileSystemTreeRecursive(parentId: number | null = null): Promise<FileSystemItem[]> {
        const items: FileSystemItem[] = [];

        const { files, folders } = await QUERIES.getFilesAndFoldersForParent(parentId ?? 0);

        for (const folder of folders) {
            const folderItem: FileSystemItem = {
                id: folder.id,
                name: folder.name,
                type: "folder",
                size: folder.size,
                ownerId: folder.ownerId,
                parent: folder.parent,
                createdAt: folder.createdAt,
                children: await QUERIES.buildFileSystemTreeRecursive(folder.id), // Recursively build children
            };
            items.push(folderItem);
        }
        for (const file of files) {
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
            };
            items.push(fileItem);
        }

        // Sort by creation date (newest first)
        return items.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    },

    getFilesAndFoldersTree: async function (folderId: number | null = null) {
        return await QUERIES.buildFileSystemTreeRecursive(folderId);
    },

    getFilesAndFoldersForParent: async function (folderId: number) {
        const [files, folders] = await Promise.all([
            QUERIES.getFiles(folderId),
            QUERIES.getFolders(folderId)
        ]);
        return { files, folders };
    },

    getFilesAndFolders: async function (folderId: number | null = null) {
        const [files, folders] = await Promise.all([
            QUERIES.getFiles(folderId),
            QUERIES.getFolders(folderId)
        ]);
        return { files, folders };
    },

    getFolderById: async function (folderId: number) {
        const folder = await db
            .select()
            .from(foldersSchema)
            .where(eq(foldersSchema.id, folderId));
        if (!folder[0]) {
            console.error(`Folder with id ${folderId} not found`);
            return null;
        }
        return folder[0];
    },

    getFolderName: async function (folderId: number) {
        const folder = await db
            .select()
            .from(foldersSchema)
            .where(eq(foldersSchema.id, folderId));
        return folder[0]?.name;
    }
}
