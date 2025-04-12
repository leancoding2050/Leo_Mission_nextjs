import { z } from "zod";

export const Edit_Remake_Schema = z.object({
    targetremakeId : z.string(),
    content: z.string(),
    authorname : z.string(),
})