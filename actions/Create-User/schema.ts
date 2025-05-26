// import { z } from "zod"



// export const Create_User_Schema = z.object({
//     email: z.string(),
//     nickname: z.string(),
//     username: z.string(),
//     password: z.string(),
//     role: z.string(),
//     image:  z.string(),
//     area: z.array(z.string()).min(1, "最少選一個"),
//     place: z.array(z.string()).min(1, "最少選一個"),
//     subject: z.array(z.string()).min(1, "最少選一個"),
//     phone: z.string(),
//     SCRC : z.string(),
//     isLogin : z.boolean().default(true),
//     isstaff: z.boolean().default(false),
//     isadmin : z.boolean().default(false),
    
// })


import { z } from "zod";

// 示例修正后的 schema 片段
export const Create_User_Schema = z.object({
    email: z.string().email(),
    nickname: z.string(),
    username: z.string(),
    password: z.string(),
    role: z.enum(["ADMIN", "TEACHER"]),
    image: z.string(),
    area: z.array(z.string()),
    place: z.array(z.string()),
    subject: z.array(z.string()),
    phone: z.string(),
    SCRC: z.string(),
    isLogin: z.boolean(),     // 必须明确 boolean 类型，不能是 optional
    isstaff: z.boolean(),     // 改为 .boolean() 而非 .optional()
    isadmin: z.boolean(),     // 改为 .boolean() 而非 .optional()
  });