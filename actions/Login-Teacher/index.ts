// "use server";

// import { getUserByUserName } from "@/app/api/user/route"; 
// import { Teacher_Login_Schema } from "./schema";
// import { z } from "zod";
// import bcrypt from 'bcryptjs';
// import { AuthError } from "next-auth";
// import { signIn } from "@/auth";

// export const Teacher_login_action = async (values:z.infer<typeof Teacher_Login_Schema>) => {
//     console.log("--Teacher_login_values-- :", values , "-- End --")


//         const validatedFields = Teacher_Login_Schema.safeParse(values);
//         if(!validatedFields){
//             return {
//                 error: "Invalid fields"
//             }
//         }
//         console.log("is work 1")

//         const { username , password , isadmin ,isstaff} = validatedFields.data;
//         console.log("is work 2")
//             const existingUserName = await getUserByUserName(username)
//             if(!existingUserName || !existingUserName.username){
//                 console.log('error : ', "這username是沒有" , '-- End--')
//                 return { error: "這username是沒有" }
//             }
        
//             if(isstaff !== existingUserName.isStaff && isadmin !== existingUserName.isAdmin){
//                 console.log('error : ', "此用戶不在權限" , '-- End--')
//                 return { error: "此用戶不在權限" }
//             }
        
//             const passwordMatch = await bcrypt.compare(password, existingUserName.password);
//             if (!passwordMatch) {
//                 console.log('error : ', "帳號/密碼有誤！" , '-- End--')
//             return { error: "帳號/密碼有誤！", status: "error" };
//             }
        
//             const userid = existingUserName.id;
        
//             console.log("is work 3")

//             try {
        
//                 await signIn("credentials", {
//                     username,
//                     password,
//                     redirectTo: `/user/${userid}`
//                 })
            
            
//                 } catch (error) {
//                     if(error instanceof AuthError) {

//                         switch (error.type) {
//                             case "CredentialsSignin":
//                                 return { error: error.message , status:"error"};
//                         default:
//                             return { error: "出了問題！" , status:"error"}
//                             }
//                     }
//                     throw error
//                 }
        
// }


"use server";

import { db } from "@/lib/db";
import { Teacher_Login_Schema } from "./schema";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const Teacher_login_action = async (
  values: z.infer<typeof Teacher_Login_Schema>
) => {
  console.log("--Teacher_login_values-- :", values, "-- End --");

  const validatedFields = Teacher_Login_Schema.safeParse(values);
  if (!validatedFields.success) {
    return {
      error: "無效的欄位",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { username, password, isadmin, isstaff } = validatedFields.data;

  try {
    // 直接查詢資料庫
    const existingUser = await db.user.findUnique({
      where: { username },
      select: {
        id: true,
        username: true,
        password: true,
        isAdmin: true,
        isStaff: true,
      },
    });

    if (!existingUser) {
      console.log("錯誤：用戶名不存在", username);
      return { error: "用戶名不存在" };
    }

    // 檢查權限：允許 isStaff 或 isAdmin 任一匹配
    if (
      (isstaff && !existingUser.isStaff) &&
      (isadmin && !existingUser.isAdmin)
    ) {
      console.log("錯誤：用戶權限不足", username);
      return { error: "用戶權限不足" };
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      console.log("錯誤：密碼錯誤", username);
      return { error: "帳號或密碼錯誤", status: "error" };
    }

    const userid = existingUser.id;

    await signIn("credentials", {
      username,
      password,
      redirect: false, // 禁用自動重定向
    });

    return { success: true, redirect: `/user/${userid}` };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "無效的憑證", status: "error" };
        default:
          return { error: "登錄失敗，請稍後重試", status: "error" };
      }
    }
    console.error("登錄錯誤:", error);
    return { error: "內部服務器錯誤", status: "error" };
  }
};