import { mockFolders, mockFiles } from "~/lib/mockData";
import { db } from "~/server/db";
import { files, folders } from "~/server/db/schema";

export default function SandboxPage() {

    return (
        <div className="flex flex-col gap-4">
            <h1>Seed Function</h1>
            <form action={async () => {
                "use server";

                const insertedFolders = await db.insert(folders).values(
                    mockFolders.map((folder, index) => ({
                    ...folder,
                    id: parseInt(folder.id),
                    parent: Number.isNaN(parseInt(folder.parent)) ?? 1,
                    size: folder.size ? parseInt(folder.size) : 5000,
                })));
                console.log("Inserted folders:", insertedFolders);

                const insertedFiles = await db.insert(files).values(mockFiles.map((file, index) => ({
                    ...file,
                    id: parseInt(file.id),
                    parent:  parseInt(file.parent),
                    size: file.size ? parseInt(file.size) : 5000,
                    url: file.url ?? "",
                    modified: new Date(),
                })));
                console.log("Inserted files:", insertedFiles);

            }}>
                <button type="submit">Seed</button>
            </form>
        </div>
    )
}