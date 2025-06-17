import DriveInterface from "~/components/drive-interface"
import { QUERIES } from "~/server/db/queries";
import { convertToUIFormat } from "~/lib/mockData";

export default async function Page() {
  const parents = await QUERIES.getAllParentsForFolder(1);
  const files = await QUERIES.getFiles(1);
  const folders = await QUERIES.getFolders(1);
  // const files = buildFileSystemTree(1);
  // const folders = buildFileSystemTree(1);

  const data = convertToUIFormat(files);

  return (
    <DriveInterface
      files={data}
      folders={folders}
      parents={parents}  
      currentPath={["My Drive"]}
    />
  )
}