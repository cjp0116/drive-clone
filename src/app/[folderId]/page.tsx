import DriveContents from "~/components/drive-interface"
import { QUERIES } from "~/server/db/queries";
// import { convertToUIFormat } from "~/lib/mockData";

export default async function Page(props: { params: Promise<{ folderId: string }>; }) {
    const params = await props.params;

    const parsedFolderId = parseInt(params.folderId);
    if (isNaN(parsedFolderId)) {
        return <div>Invalid folder ID</div>;
    }

    const [folders, files, parents] = await Promise.all([
        QUERIES.getFolders(parsedFolderId),
        QUERIES.getFiles(parsedFolderId),
        QUERIES.getAllParentsForFolder(parsedFolderId),
    ]);

    // const data = convertToUIFormat(files);
  
    return (
        <DriveContents
            files={files}
            folders={folders}
            parents={parents}
            currentPath={["My Drive", ...parents.map(parent => parent.name)]}
        />
    )
};