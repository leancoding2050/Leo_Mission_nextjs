// "use server";

// import { InputType , ReturnType } from "./types"; 
// import { db } from "@/lib/db";
// import { CreateSafeAction } from "@/lib/create-safe-action";
// import { Create_User_Schema } from "./schema";
// import { UserRole } from "@prisma/client";
// import bcrypt from "bcryptjs";
// import { getUserByUserName } from "@/app/api/user/route"; 
// import { redirect } from "next/navigation"; 
// import { writeFile } from "fs/promises";
// import { join } from "path";

// import ossClient from "@/lib/oss"; // 引入 OSS 客戶端


// const base64ToBuffer = (base64: string) =>{
//     const base64Image = base64.split(';base64,').pop();
//     if (!base64Image) {
//         throw new Error("Invalid base64 image format");
//     }
//     return Buffer.from(base64Image, 'base64');
// }

// const handler = async (data: InputType) : Promise<ReturnType> => {
//     const {
//         email,
//         nickname,
//         username,
//         password,
//         role,
//         image,
//         area,
//         place,
//         subject,
//         phone,
//         SCRC,
//         isLogin,
//         isstaff,
//         isadmin
//     } = data;

//     let User_data;

//     const hashedPassword = await bcrypt.hash(password,10);

//     const existingUser = await getUserByUserName(username);

//     if(existingUser) {
//         return {
//             error: "用戶名已有"
//         }
//     }

//     try {

        
//         // const bytes = await file.arrayBuffer();
//         // const buffer = Buffer.from(bytes);

//         // 將 base64 圖片轉換為 Buffer
//         const buffer = base64ToBuffer(image);
//         // 生成唯一的文件名
//         const fileName = `${Date.now()}-${username}-${nickname}.png`;

//         console.log("-- fileName -- : ", fileName,"-- End --")

//         // 上傳圖片到 OSS
//         const ossPath = `uploads/${fileName}`; // OSS 上的文件路徑
//         const result = await ossClient.put(ossPath, buffer);


//         // 獲取圖片的公開 URL（如果 Bucket 是公開的）
//         const imageUrl = result.url;

//         const path = join("public", "uploads", fileName);

//         await writeFile(path, buffer);

//         User_data = await db.user.create({
//             data:{
//                email : email,
//                nickname : nickname,
//                username : username,
//                password : hashedPassword,
//                role : role as UserRole,
//                image : {
//                 create:{
//                     path: `/uploads/${fileName}`,
//                     image: fileName,
//                 }
//                },
//                area : area,
//                place : place,
//                subject : subject,
//                phone : phone,
//                SCRC : SCRC,
//                isLogin : isLogin,
//                isStaff : isstaff,
//                isAdmin : isadmin,
//                color:"",

//             }
//         });
//     } catch (error) {
//         console.log(error)
//     }
//     console.log("-- User_Data -- : ", User_data ,"-- End --")

//     return redirect('/')
//     // return {data : User_data}

// }

// export const createUser = CreateSafeAction(Create_User_Schema, handler)


// "use server";

// import { InputType, ReturnType } from "./types";
// import { db } from "@/lib/db";
// import { CreateSafeAction } from "@/lib/create-safe-action";
// import { Create_User_Schema } from "./schema";
// import { UserRole } from "@prisma/client";
// import bcrypt from "bcryptjs";
// import { getUserByUserName } from "@/app/api/user/route";
// import { redirect } from "next/navigation";
// import { writeFile } from "fs/promises";
// import { join } from "path";
// import ossClient from "@/lib/oss";

// const base64ToBuffer = (base64: string) => {
//     const base64Image = base64.split(";base64,").pop();
//     if (!base64Image) {
//         throw new Error("Invalid base64 image format");
//     }
//     return Buffer.from(base64Image, "base64");
// };

// const handler = async (data: InputType): Promise<ReturnType> => {
//     const {
//         email,
//         nickname,
//         username,
//         password,
//         role,
//         image,
//         area,
//         place,
//         subject,
//         phone,
//         SCRC,
//         isLogin = true,
//         isstaff = false,
//         isadmin = false,
//     } = data;

//     let User_data;

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const existingUser = await getUserByUserName(username);

//     if (existingUser) {
//         return {
//             error: "用戶名已有",
//         };
//     }

//     try {
//         const buffer = base64ToBuffer(image);
//         const fileName = `${Date.now()}-${username}-${nickname}.png`;
//         const ossPath = `uploads/${fileName}`;
//         const result = await ossClient.put(ossPath, buffer);
//         const imageUrl = result.url;
//         const path = join("public", "uploads", fileName);

//         await writeFile(path, buffer);

//         User_data = await db.user.create({
//             data: {
//                 email,
//                 nickname,
//                 username,
//                 password: hashedPassword,
//                 role: role as UserRole,
//                 image: {
//                     create: {
//                         path: `/uploads/${fileName}`,
//                         image: fileName,
//                     },
//                 },
//                 area,
//                 place,
//                 subject,
//                 phone,
//                 SCRC,
//                 isLogin,
//                 isStaff: isstaff,
//                 isAdmin: isadmin,
//                 color: "",
//             },
//         });
//     } catch (error) {
//         console.error(error);
//         return { error: "創建用戶失敗，請稍後重試" };
//     }

//     console.log("-- User_Data -- : ", User_data, "-- End --");

//     return redirect("/");
// };

// export const createUser = CreateSafeAction(Create_User_Schema, handler);



// "use server";

// import { InputType, ReturnType } from "./types";
// import { db } from "@/lib/db";
// import { CreateSafeAction } from "@/lib/create-safe-action";
// import { Create_User_Schema } from "./schema";
// import { UserRole } from "@prisma/client";
// import bcrypt from "bcryptjs";
// import { getUserByUserName } from "@/app/api/user/route";
// import { redirect } from "next/navigation";

// const handler = async (data: InputType): Promise<ReturnType> => {
//   const {
//     email,
//     nickname,
//     username,
//     password,
//     role,
//     image,
//     area,
//     place,
//     subject,
//     phone,
//     SCRC,
//     isLogin,
//     isstaff = false,   // 设置默认值
//     isadmin = false,   // 设置默认值
//   } = data;

//   let User_data;

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const existingUser = await getUserByUserName(username);

//   if (existingUser) {
//     return {
//       error: "用户名已有",
//     };
//   }

//   try {
//     const fileName = image ? image.split('/').pop() : null;
//     User_data = await db.user.create({
//       data: {
//         email,
//         nickname,
//         username,
//         password: hashedPassword,
//         role: role as UserRole,
//         image: image
//           ? {
//               create: {
//                 path: image,
//                 image: fileName || '',
//               },
//             }
//           : undefined,
//         area,
//         place,
//         subject,
//         phone,
//         SCRC,
//         isLogin,
//         isStaff: isstaff,
//         isAdmin: isadmin,
//         color: "",
//       },
//     });
//   } catch (error) {
//     console.error(error);
//     return { error: "创建用户失败，请稍后重试" };
//   }

//   console.log("-- User_Data -- : ", User_data, "-- End --");

//   return redirect("/");
// };

// export const createUser = CreateSafeAction(Create_User_Schema, handler);



// "use server";

// import { db } from "@/lib/db";
// import { z } from "zod";
// import { Create_User_Schema } from "@/actions/Create-User/schema";
// import { redirect } from "next/navigation";

// export async function createUser(data: z.infer<typeof Create_User_Schema>) {
//   try {
//     // 確保 area 和 place 是陣列
//     const validatedData = Create_User_Schema.parse({
//       ...data,
//       area: Array.isArray(data.area) ? data.area : data.area ? [data.area] : [],
//       place: Array.isArray(data.place) ? data.place : data.place ? [data.place] : [],
//       subject: Array.isArray(data.subject) ? data.subject : data.subject ? [data.subject] : [],
//     });

//     const user = await db.user.create({
//       data: {
//         email: validatedData.email,
//         nickname: validatedData.nickname,
//         username: validatedData.username,
//         password: validatedData.password, // 應加密
//         role: validatedData.role,
//         phone: validatedData.phone,
//         SCRC: validatedData.SCRC,
//         isLogin: validatedData.isLogin,
//         isAdmin: validatedData.isadmin,
//         isStaff: validatedData.isstaff,
//         area: validatedData.area || [],
//         place: validatedData.place || [],
//         subject: validatedData.subject || [],
//         color: "default", // 根據需要設置
//       },
//     });

//     return redirect("/");
//   } catch (error) {
//     console.error("創建用戶失敗:", error);
//     return { success: false, error: "創建用戶失敗" };
//   }
// }


// "use server";

// import { db } from "@/lib/db";
// import { z } from "zod";
// import { Create_User_Schema } from "@/actions/Create-User/schema";

// export async function createUser(data: z.infer<typeof Create_User_Schema>) {
//   try {
//     // 驗證數據
//     const validatedData = Create_User_Schema.parse({
//       ...data,
//       area: Array.isArray(data.area) ? data.area : data.area ? [data.area] : [],
//       place: Array.isArray(data.place) ? data.place : data.place ? [data.place] : [],
//       subject: Array.isArray(data.subject) ? data.subject : data.subject ? [data.subject] : [],
//     });

//     // 創建用戶
//     const user = await db.user.create({
//       data: {
//         email: validatedData.email,
//         nickname: validatedData.nickname,
//         username: validatedData.username,
//         password: validatedData.password, // 應加密
//         role: validatedData.role,
//         phone: validatedData.phone,
//         SCRC: validatedData.SCRC,
//         isLogin: validatedData.isLogin,
//         isAdmin: validatedData.isadmin,
//         isStaff: validatedData.isstaff,
//         area: validatedData.area || [],
//         place: validatedData.place || [],
//         subject: validatedData.subject || [],
//         color: "default",
//       },
//     });

//     // 如果有圖片 URL，創建 Image 記錄
//     if (validatedData.image) {
//       await db.image.create({
//         data: {
//           path: validatedData.image,
//           image: validatedData.image,
//           image_user_id: user.id,
//         },
//       });
//     }

//     return { success: true, message: "用戶創建成功", userId: user.id };
//   } catch (error) {
//     console.error("創建用戶失敗:", error);
//     return { success: false, error: "創建用戶失敗" };
//   }
// }




"use server";

import { db } from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { Create_User_Schema } from "@/actions/Create-User/schema";

export async function createUser(data: z.infer<typeof Create_User_Schema>) {
  try {
    // 驗證數據
    const validatedData = Create_User_Schema.parse({
      ...data,
      area: Array.isArray(data.area) ? data.area : data.area ? [data.area] : [],
      place: Array.isArray(data.place) ? data.place : data.place ? [data.place] : [],
      subject: Array.isArray(data.subject) ? data.subject : data.subject ? [data.subject] : [],
    });

    // 加密密碼
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // 創建用戶
    const user = await db.user.create({
      data: {
        email: validatedData.email,
        nickname: validatedData.nickname,
        username: validatedData.username,
        password: hashedPassword, // 使用加密後的密碼
        role: validatedData.role,
        phone: validatedData.phone,
        SCRC: validatedData.SCRC,
        isLogin: validatedData.isLogin,
        isAdmin: validatedData.isadmin,
        isStaff: validatedData.isstaff,
        area: validatedData.area || [],
        place: validatedData.place || [],
        subject: validatedData.subject || [],
        color: "default",
      },
    });

    // 如果有圖片 URL，創建 Image 記錄
    if (validatedData.image) {
      await db.image.create({
        data: {
          path: validatedData.image,
          image: validatedData.image,
          image_user_id: user.id,
        },
      });
    }

    return { success: true, message: "用戶創建成功", userId: user.id };
  } catch (error) {
    console.error("創建用戶失敗:", error);
    return { success: false, error: "創建用戶失敗" };
  }
}