"use server";

import { InputType , ReturnType } from "./types"; 
import { db } from "@/lib/db";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { getUserByUserName } from "@/app/api/user/route"; 
import { redirect } from "next/navigation"; 
import { Edit_User_Schema } from "./schema";

const handler = async (data: InputType) : Promise<ReturnType> => {
    const {
        adminId,
        targetuserId,
        email,
        nickname,
        username,
        image,
        area,
        place,
        subject,
        phone,
        SCRC,
        isLogin,
        isstaff,
        color,
    } = data;

    let User_data;

    // const existingUser = await getUserByUserName(username);

    // if(existingUser) {
    //     return {
    //         error: "用戶名已有"
    //     }
    // }
    try {
// 獲取當前用戶資料以比較現有圖片
const currentUser = await db.user.findUnique({
    where: { id: targetuserId },
    include: { image: true }, // 包含圖片關聯
  });

  if (!currentUser) {
    return { error: "用戶不存在" };
  }
// 判斷是否需要更新圖片
const currentImagePath = currentUser.image[0]?.path;
let imageData = currentImagePath; // 預設保留現有圖片

if (image && image !== currentImagePath) {
  // 如果提供了新圖片路徑且與現有路徑不同，則更新圖片
  if (currentUser.image.length > 0) {
    // 如果已有圖片，則刪除舊圖片記錄
    await db.image.delete({
      where: { id: currentUser.image[0].id },
    });
  }
  // 創建新的圖片記錄
  const newImage = await db.image.create({
    data: {
      path: image,
      image: image, // 假設此欄位與 path 存相同值
      user: { connect: { id: targetuserId } },
    },
  });
  imageData = newImage.path;
}

        User_data = await db.user.update({
            where: {
                id: targetuserId
            },
            data:{
                email : email,
                nickname : nickname,
                username : username,
                area : area,
                place : place,
                subject :subject,
                phone : phone,
                SCRC : SCRC,
                isLogin : isLogin,
                isStaff : isstaff,
                color:  color,
// 僅在圖片有更新時才設定 image 關聯
...(image && image !== currentImagePath
    ? {
        image: {
          connect: { id: currentUser.image[0]?.id || undefined },
        },
      }
    : {}),
            }
        })
    } catch (error) {
        console.log(error)
    }
    console.log("-- User_Updata_Data -- : ", User_data ,"-- End --")

    return redirect(`/user/${adminId}/admin/userLists/`);

}

export const Edit_User_Action = CreateSafeAction(Edit_User_Schema, handler);