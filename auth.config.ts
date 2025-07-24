// import bcrypt from "bcryptjs";
// import credentials from "next-auth/providers/credentials";
// import type { NextAuthConfig } from "next-auth";
// import { Teacher_Login_Schema } from "./actions/Login-Teacher/schema";
// import { Admin_Login_Schema } from "./actions/Login-Admin/schema";
// import { getUserByUserName } from "./app/api/user/route";

// export default{providers:[
//     credentials({

//         async authorize(credentials ,req) {
//             console.log("-- credentials -- : ",credentials ,"-- end --")

//             console.log(credentials) 

//             if(credentials.role === "ADMIN") {
//                 console.log('testmessage : is work ')

//                 const login_form_validatedFields = Admin_Login_Schema.safeParse(credentials);
//                 if(login_form_validatedFields.success) {
//                     const { username , password } = login_form_validatedFields.data;
//                     const user = await getUserByUserName(username);
//                     if(!user || !user.password){  console.error("no user or no pw (admin)"); return null }
//                     const passwordsMatch = await bcrypt.compare(
//                         password,
//                         user.password,
//                     )
//                     console.log('is work')
//                     if(passwordsMatch) return user

//                 } else {
//                     console.error("form have wrong (admin) : ", login_form_validatedFields.error)
//                     return null
//                 }

//             }


//             const login_form_validatedFields = Teacher_Login_Schema.safeParse(credentials);
//             if(login_form_validatedFields.success){
//                 const { username , password } = login_form_validatedFields.data;
//                 const user = await getUserByUserName(username);
//                 if(!user || !user.password) { 
//                     console.error("no user or no pw (teacher)") 
//                     return null 
//                 }
//                 const passwordsMatch = await bcrypt.compare(
//                     password,
//                     user.password
//             );
//             if(passwordsMatch) return user
            
//                 }else{
//                     console.error("form have wrong (teacher) : ",login_form_validatedFields.error)
//                     return null
//                 }

//                 return null;
//         }

//     })
// ],} satisfies NextAuthConfig


// import bcrypt from "bcryptjs";
// import Credentials from "next-auth/providers/credentials";
// import type { NextAuthConfig } from "next-auth";
// import { Teacher_Login_Schema } from "./actions/Login-Teacher/schema";
// import { Admin_Login_Schema } from "./actions/Login-Admin/schema";
// import { getUserByUserName } from "./app/api/user/route";
// import { UserRole } from "@prisma/client";

// export default {
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         // 定義通用的驗證邏輯
//         let validatedFields;

//         // 根據角色選擇適當的模式進行驗證
//         if (credentials.role === "ADMIN") {
//           validatedFields = Admin_Login_Schema.safeParse(credentials);
//         } else {
//           validatedFields = Teacher_Login_Schema.safeParse(credentials);
//         }

//         if (!validatedFields.success) {
//           console.error("表單驗證失敗:", validatedFields.error);
//           throw new Error("無效的輸入數據");
//         }

//         const { username, password } = validatedFields.data;

//         // 查詢用戶
//         const user = await getUserByUserName(username);
//         if (!user || !user.password) {
//           console.error("用戶不存在或無密碼");
//           throw new Error("用戶名或密碼錯誤");
//         }

//         // 驗證密碼
//         const passwordsMatch = await bcrypt.compare(password, user.password);
//         if (!passwordsMatch) {
//           console.error("密碼不匹配");
//           throw new Error("用戶名或密碼錯誤");
//         }

//         // 驗證角色（基於數據庫中的 role，而非 credentials）
//         if (credentials.role && user.role !== credentials.role) {
//           console.error(`用戶角色不匹配: 期望 ${credentials.role}, 實際 ${user.role}`);
//           throw new Error("無權訪問此角色");
//         }

//         // 返回用戶對象，包含必要屬性
//         return {
//           id: user.id,
//           username: user.username,
//           role: user.role,
//           isAdmin: user.isAdmin,
//           isStaff: user.isStaff,
//         };
//       },
//     }),
//   ],
// } satisfies NextAuthConfig;



// import bcrypt from "bcryptjs";
// import Credentials from "next-auth/providers/credentials";
// import type { NextAuthConfig } from "next-auth";
// import { Teacher_Login_Schema } from "./actions/Login-Teacher/schema";
// import { Admin_Login_Schema } from "./actions/Login-Admin/schema";
// import { getUserByUserName } from "./app/api/user/route";
// import { UserRole } from "@prisma/client";

// export default {
//   providers: [
//     Credentials({
//       async authorize(credentials) {
//         let validatedFields;

//         if (credentials.role === "ADMIN") {
//           validatedFields = Admin_Login_Schema.safeParse(credentials);
//         } else {
//           validatedFields = Teacher_Login_Schema.safeParse(credentials);
//         }

//         if (!validatedFields.success) {
//           console.error("表單驗證失敗:", validatedFields.error);
//           throw new Error("無效的輸入數據");
//         }

//         const { username, password } = validatedFields.data;

//         const user = await getUserByUserName(username);
//         if (!user || !user.password) {
//           console.error("用戶不存在或無密碼");
//           throw new Error("用戶名或密碼錯誤");
//         }

//         const passwordsMatch = await bcrypt.compare(password, user.password);
//         if (!passwordsMatch) {
//           console.error("密碼不匹配");
//           throw new Error("用戶名或密碼錯誤");
//         }

//         if (credentials.role && user.role !== credentials.role) {
//           console.error(`用戶角色不匹配: 期望 ${credentials.role}, 實際 ${user.role}`);
//           throw new Error("無權訪問此角色");
//         }

//         // return {
//         //   id: user.id,
//         //   email: user.email,
//         //   emailVerified: null,
//         //   name: user.username,
//         //   role: user.role,
//         //   username: user.username,
//         //   isAdmin: user.isAdmin,
//         //   isStaff: user.isStaff,
//         // };
//         return {
//           id: user.id,
//           email: user.email,
//           name: user.username,
//           username: user.username,
//           role: user.role as UserRole,
//           isAdmin: user.isAdmin ?? false,
//           isStaff: user.isStaff ?? false,
//         };

//       },
//     }),
//   ],
// } satisfies NextAuthConfig;






import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { Teacher_Login_Schema } from "./actions/Login-Teacher/schema";
import { Admin_Login_Schema } from "./actions/Login-Admin/schema";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        let validatedFields;

        // 驗證角色
        const role = credentials.role as string | undefined;
        if (role === "ADMIN") {
          validatedFields = Admin_Login_Schema.safeParse(credentials);
        } else {
          validatedFields = Teacher_Login_Schema.safeParse(credentials);
        }

        if (!validatedFields.success) {
          console.error("表單驗證失敗:", validatedFields.error);
          throw new Error("無效的輸入數據");
        }

        const { username, password } = validatedFields.data;

        // 直接查詢資料庫
        const user = await db.user.findUnique({
          where: { username },
          select: {
            id: true,
            email: true,
            username: true,
            password: true,
            role: true,
            isAdmin: true,
            isStaff: true,
          },
        });

        if (!user || !user.password) {
          console.error("用戶不存在或無密碼:", username);
          throw new Error("用戶名或密碼錯誤");
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);
        if (!passwordsMatch) {
          console.error("密碼不匹配:", username);
          throw new Error("用戶名或密碼錯誤");
        }

        if (role && user.role !== role) {
          console.error(`用戶角色不匹配: 期望 ${role}, 實際 ${user.role}`);
          throw new Error("無權訪問此角色");
        }

        return {
          id: user.id,
          email: user.email ?? "",
          name: user.username ?? "",
          username: user.username ?? "",
          role: user.role as UserRole,
          isAdmin: user.isAdmin ?? false,
          isStaff: user.isStaff ?? false,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  // 確保不覆蓋 trustHost
  trustHost: process.env.AUTH_TRUST_HOST === "true", // 可選：添加信任主機設置
} satisfies NextAuthConfig;