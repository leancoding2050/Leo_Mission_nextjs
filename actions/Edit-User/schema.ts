// import { z } from "zod";

// export const Edit_User_Schema = z.object({
//   adminId: z.string().min(1, "管理員 ID 不能為空"),
//   targetuserId: z.string().min(1, "目標用戶 ID 不能為空"),
//   email: z.string().email("無效的電郵地址"),
//   nickname: z.string().min(1, "暱稱不能為空"),
//   username: z.string().min(1, "用戶名稱不能為空"),
//   image: z.string().optional(),
//   area: z.array(z.string()).min(1, "最少選一個地區"),
//   place: z.array(z.string()).min(1, "最少選一個地方"),
//   subject: z.array(z.string()).min(1, "最少選一個科目"),
//   phone: z.string().min(8, "電話號碼無效"),
//   SCRC: z.string().min(1, "SCRC 不能為空"),
//   isLogin: z.boolean(),
//   isstaff: z.boolean().default(false),
//   color: z.string().min(1, "必須選擇顏色"),
// });


// import { z } from "zod";

// export const Edit_User_Schema = z.object({
//   adminId: z.string().min(1, "管理員 ID 不能為空"),
//   targetuserId: z.string().min(1, "目標用戶 ID 不能為空"),
//   email: z.string().email("無效的電郵地址"),
//   nickname: z.string().min(1, "暱稱不能為空"),
//   username: z.string().min(1, "用戶名稱不能為空"),
//   image: z.string().optional(),
//   area: z.array(z.string()).min(1, "最少選一個地區"),
//   place: z.array(z.string()).min(1, "最少選一個地方"),
//   subject: z.array(z.string()).min(1, "最少選一個科目"),
//   phone: z
//     .string()
//     .min(8, "電話號碼無效")
//     .regex(/^[0-9+()-]*$/, "電話號碼只能包含數字、+、- 和括號"),
//   SCRC: z.string().optional(), // 可選，允許空值
//   isLogin: z.boolean(),
//   isStaff: z.boolean().default(false), // 修正為 isStaff
//   color: z.string().min(1, "必須選擇顏色"),
// });

// @/actions/Create-User/schema.ts
import { z } from "zod";


export const SubjectSchema = z.object({
  subject: z.array(z.string()).min(1, "最少選一個科目"),
});


export const Edit_User_Schema = SubjectSchema.extend({
  adminId: z.string(),
  targetuserId:z.string(),
  email: z.string().email("無效的電郵地址"),
  nickname: z.string().min(1, "暱稱不能為空"),
  username: z.string().min(1, "用戶名稱不能為空"),
  password: z.string().min(6, "密碼至少 6 個字符"),
  role: z.enum(["ADMIN", "TEACHER"]),
  phone: z.string().min(8, "電話號碼無效").regex(/^[0-9+()-]*$/, "電話號碼只能包含數字、+、- 和括號"),
  SCRC: z.string().optional(),
  isLogin: z.boolean(),
  isStaff: z.boolean(),
  isAdmin: z.boolean(),
  image: z.string().optional(),
  area: z.array(z.string()).min(1, "最少選一個地區"),
  place: z.array(z.string()).min(1, "最少選一個地方"),
  color: z.string().min(1, "必須選擇顏色"),
  subject: z.array(z.string()).min(1, "最少選一個科目"),
});