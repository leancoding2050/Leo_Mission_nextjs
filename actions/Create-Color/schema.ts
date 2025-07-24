import { z } from "zod"; 

export const Create_Color_Schema = z.object({
    id:z.string(),
    color_name: z.string()
})