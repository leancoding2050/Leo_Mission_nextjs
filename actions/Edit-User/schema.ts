import { z } from "zod"

export const Edit_User_Schema = z.object({
    adminId: z.string(),
    targetuserId : z.string(),
    email: z.string(),
    nickname: z.string(),
    username: z.string(),
    image: z.string().optional(),
    area: z.array(z.string()).min(1, "最少選一個"),
    place: z.array(z.string()).min(1, "最少選一個"),
    subject: z.array(z.string()).min(1, "最少選一個"),
    phone: z.string(),
    SCRC : z.string(),
    isLogin : z.boolean(),
    isstaff: z.boolean().default(false),
    color: z.string(),
    
})