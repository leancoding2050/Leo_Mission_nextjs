"use server";

import { InputType , ReturnType } from "./types"; 
import { db } from "@/lib/db";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { Create_User_Schema } from "./schema";
import { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import { getUserByUserName } from "@/app/api/user/route"; 
import { redirect } from "next/navigation"; 
import { writeFile } from "fs/promises";
import { join } from "path";

import ossClient from "@/lib/oss"; // 引入 OSS 客戶端


const base64ToBuffer = (base64: string) =>{
    const base64Image = base64.split(';base64,').pop();
    if (!base64Image) {
        throw new Error("Invalid base64 image format");
    }
    return Buffer.from(base64Image, 'base64');
}

const handler = async (data: InputType) : Promise<ReturnType> => {
    const {
        email,
        nickname,
        username,
        password,
        role,
        image,
        area,
        place,
        subject,
        phone,
        SCRC,
        isLogin,
        isstaff,
        isadmin
    } = data;

    let User_data;

    const hashedPassword = await bcrypt.hash(password,10);

    const existingUser = await getUserByUserName(username);

    if(existingUser) {
        return {
            error: "用戶名已有"
        }
    }

    try {

        
        // const bytes = await file.arrayBuffer();
        // const buffer = Buffer.from(bytes);

        // 將 base64 圖片轉換為 Buffer
        const buffer = base64ToBuffer(image);
        // 生成唯一的文件名
        const fileName = `${Date.now()}-${username}-${nickname}.png`;

        console.log("-- fileName -- : ", fileName,"-- End --")

        // 上傳圖片到 OSS
        const ossPath = `uploads/${fileName}`; // OSS 上的文件路徑
        const result = await ossClient.put(ossPath, buffer);


        // 獲取圖片的公開 URL（如果 Bucket 是公開的）
        const imageUrl = result.url;

        const path = join("public", "uploads", fileName);

        await writeFile(path, buffer);

        User_data = await db.user.create({
            data:{
               email : email,
               nickname : nickname,
               username : username,
               password : hashedPassword,
               role : role as UserRole,
               image : {
                create:{
                    path: `/uploads/${fileName}`,
                    image: fileName,
                }
               },
               area : area,
               place : place,
               subject : subject,
               phone : phone,
               SCRC : SCRC,
               isLogin : isLogin,
               isStaff : isstaff,
               isAdmin : isadmin,
               color:"",

            }
        });
    } catch (error) {
        console.log(error)
    }
    console.log("-- User_Data -- : ", User_data ,"-- End --")

    return redirect('/')
    // return {data : User_data}

}

export const createUser = CreateSafeAction(Create_User_Schema, handler)