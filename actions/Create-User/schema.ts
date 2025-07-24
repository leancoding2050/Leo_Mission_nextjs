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


// import { z } from "zod";

// // 示例修正后的 schema 片段
// export const Create_User_Schema = z.object({
//     email: z.string().email(),
//     nickname: z.string(),
//     username: z.string(),
//     password: z.string(),
//     role: z.enum(["ADMIN", "TEACHER"]),
//     image: z.string().url().optional(), // 修改为接受 URL
//     area: z.array(z.string()).optional(),
//     place: z.array(z.string()).optional(),
//     subject: z.array(z.string()).optional(),
//     phone: z.string().min(1, { message: "電話不能為空" }), // 改為必填
//     SCRC: z.string().min(1, { message: "SCRC 不能為空" }), // 改為必填
//     isLogin: z.boolean({ required_error: "isLogin 必須提供" }), // 改為必填
//   isstaff: z.boolean({ required_error: "isstaff 必須提供" }), // 改為必填
//   isadmin: z.boolean({ required_error: "isadmin 必須提供" }), // 改為必填
//   });


import { z } from "zod";

export const Create_User_Schema = z.object({
  email: z.string().email(),
  nickname: z.string(),
  username: z.string(),
  password: z.string(),
  role: z.enum(["ADMIN", "TEACHER"]),
  image: z.string().url().optional().or(z.literal("")), // 允許空字符串
  area: z.array(z.string()).optional(),
  place: z.array(z.string()).optional(),
  subject: z.array(z.string()).optional(),
  phone: z.string().min(1, { message: "電話不能為空" }),
  SCRC: z.string().min(1, { message: "SCRC 不能為空" }),
  isLogin: z.boolean({ required_error: "isLogin 必須提供" }),
  isstaff: z.boolean({ required_error: "isstaff 必須提供" }),
  isadmin: z.boolean({ required_error: "isadmin 必須提供" }),
});