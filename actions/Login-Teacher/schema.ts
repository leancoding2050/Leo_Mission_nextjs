import { z } from "zod";

export const Teacher_Login_Schema = z.object({
    username: z.string().min(1,{
        message:"請輸入username"
    }),
    password: z.string().min(1,{
        message:"請輸入password"
    }),
    isstaff: z.boolean().default(false),
    isadmin : z.boolean().default(false),
})