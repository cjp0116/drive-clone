import { db } from "~/server/db"
import { files as filesSchema, folders as foldersSchema } from "~/server/db/schema";
import DriveContents from "~/components/google-drive-clone"
import { eq } from "drizzle-orm";

export default async function Page(props: { params: Promise<{ folderId: number }>; }) {
    const params = await props.params;
    const parsedFolderId = parseInt(params.folderId);

    if(isNaN(parsedFolderId)) {
        return <div>Invalid Folder ID</div>
    }

    // const safeParams = z.object({
    //     folderId: z.string().transform((val, ctx) => {
    //         const parsed = parseInt(val);
    //         if (isNaN(parsed)) {
    //             ctx.addIssue({
    //                 code: z.ZodIssueCode.custom,
    //                 message: "Invalid Number",
    //             });
    //             return z.NEVER;
    //         }
    //         return parsed;
    //     })
    // })

    const files = await db
        .select()
        .from(filesSchema)
        .where(eq(filesSchema.parent, parsedFolderId));
    
    const folders = await db
        .select()
        .from(foldersSchema)
        .where(eq(foldersSchema.parent, parsedFolderId));
    
    return (
        <DriveContents files={files} folders={folders} />
    )
};