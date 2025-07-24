// import { db } from "@/lib/db";
// import { NextResponse } from "next/server"; 

// export async function GET(req: Request , {params}:{params:{id:string}}) {

//     const { id } = await params;

//     if(req.method === 'GET'){
//         const res = await db.task.findMany({
//             where:{
//                 id:String(id)
//             },
//             include:{
//                 job: true,
//             }
//         })
//         return NextResponse.json(res)
//     }
// }

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; // 等待 params Promise 解析

    const res = await db.task.findUnique({
      where: {
        id: String(id), // 確保 id 是字符串類型
      },
      include: {
        job: true,
      },
    });

    if (!res) {
      return NextResponse.json({ error: "任務記錄未找到" }, { status: 404 });
    }

    return NextResponse.json(res);
  } catch (error) {
    console.error("獲取任務記錄失敗：", error);
    return NextResponse.json({ error: "內部服務器錯誤" }, { status: 500 });
  }
}