import { z } from "zod";

export const Create_Remake_Schema = z.object({
    targetuserId: z.string(),
    UserId: z.string(),
    content: z.string(),
    authorname : z.string(),
})