import DriveContents from "~/components/drive-interface"
import { QUERIES } from "~/server/db/queries";
import { convertToUIFormat } from "~/lib/mockData";

export default async function Page(props: { params: Promise<{ folderId: string }>; }) {
    const params = await props.params;

    const parsedFolderId = parseInt(params.folderId);
    if (isNaN(parsedFolderId)) {
        return <div>Invalid folder ID</div>;
    }

    // Get the full folder path
    const folderPath = await QUERIES.getAllParentsForFolder(parsedFolderId);
    const items = await QUERIES.getFilesAndFoldersTree(parsedFolderId);
    const data = convertToUIFormat(items);

    return (
        <DriveContents
            items={data}
            path={folderPath.map(folder => ({ name: folder.name, id: Number(folder.id) }))}
        />
    )
};