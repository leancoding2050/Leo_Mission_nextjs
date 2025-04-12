import { z } from "zod"



export const Create_User_Schema = z.object({
    email: z.string(),
    nickname: z.string(),
    username: z.string(),
    password: z.string(),
    role: z.string(),
    image:  z.string(),
    area: z.array(z.string()).min(1, "最少選一個"),
    place: z.array(z.string()).min(1, "最少選一個"),
    subject: z.array(z.string()).min(1, "最少選一個"),
    phone: z.string(),
    SCRC : z.string(),
    isLogin : z.boolean().default(true),
    isstaff: z.boolean().default(false),
    isadmin : z.boolean().default(false),
    
})