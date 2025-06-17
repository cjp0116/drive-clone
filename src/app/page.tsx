import DriveInterface from "~/components/drive-interface"
import { QUERIES } from "~/server/db/queries";
import { convertToUIFormat } from "~/lib/mockData";
// import type { FileSystemItem } from "~/lib/mockData";

export default async function Page() {
  const items = await QUERIES.getFilesAndFoldersTree(1);
  const data = convertToUIFormat(items);
  console.log(data);
  return (
    <DriveInterface
      items={data}
      path={[{ name: "My Drive", id: 1 }]}
    />
  )
} 