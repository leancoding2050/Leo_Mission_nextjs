// import { db } from "@/lib/db";
// import { NextResponse } from "next/server"; 

// export async function GET(req: Request) {
//     if(req.method === 'GET'){
//         const res = await db.user.findMany({
//             include:{
//                 image : true
//             }
//         })
//         return NextResponse.json(res)
//     }
// }

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    if (req.method !== "GET") {
      return NextResponse.json({ error: "方法不允許" }, { status: 405 });
    }

    const res = await db.user.findMany({
      include: {
        image_rel: true, // 使用正確的關係字段
      },
      orderBy: {
        username: "asc", // 可選：按用戶名排序
      },
    });

    return NextResponse.json(res);
  } catch (error) {
    console.error("獲取用戶列表失敗:", error);
    return NextResponse.json(
      { error: "內部服務器錯誤" },
      { status: 500 }
    );
  }
}