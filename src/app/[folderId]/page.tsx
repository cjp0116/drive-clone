import DriveContents from "~/components/google-drive-clone"
import { QUERIES } from "~/server/db/queries";


export default async function Page(props: { params: Promise<{ folderId: string }>; }) {
    const params = await props.params;
    
    const parsedFolderId = Number(params.folderId);
    if (isNaN(parsedFolderId)) {
        return <div>Invalid Folder ID</div>
    }
    const parentsPromise = QUERIES.getAllParentsForFolder(parsedFolderId);
    const filesPromise = QUERIES.getFiles(parsedFolderId);
    const foldersPromise = QUERIES.getFolders(parsedFolderId);

    const [files, folders, parents] = await Promise.all([filesPromise, foldersPromise, parentsPromise]);

    return (
        <DriveContents
            files={files}
            folders={folders}
            parents={parents}
        />
    )
};