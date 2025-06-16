import { db } from "~/server/db"
import { files as filesSchema, folders as foldersSchema } from "~/server/db/schema";
import DriveContents from "~/components/google-drive-clone"

export default async function Page() {
  const files = await db.select().from(filesSchema)
  const folders = await db.select().from(foldersSchema)
  return (

    <DriveContents files={files} folders={folders} />

  )
}