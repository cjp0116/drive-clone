import { db } from "~/server/db";
import {
    files as filesSchema,
    folders as foldersSchema,
} from "~/server/db/schema";
import { eq  } from 'drizzle-orm';

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

    getFiles: function(folderId: number) {
        return db
            .select()
            .from(filesSchema)
            .where(eq(filesSchema.parent, folderId))
            .orderBy((filesSchema.id))
    },
    
    getAllParentsForFolder: async function(folderId: number) {
        const parents = [];
        let currentId: number | null = folderId;
        while(currentId !== null) {
            const folder = await db
                .selectDistinct()
                .from(foldersSchema)
                .where(eq(foldersSchema.id, currentId));
            
            if(!folder[0]) {
                throw new Error("Parent folder not found")
            }

            parents.unshift(folder[0]);
            currentId = folder[0]?.parent;
        }
        return parents;
    },

    getFilesAndFolders: async function(folderId: number | null = null) {
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
        if(!folder[0]) {
            console.error(`Folder with id ${folderId} not found`);
            return null;
        }
        return folder[0];
    }
}
