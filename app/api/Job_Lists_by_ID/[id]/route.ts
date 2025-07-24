// import { db } from "@/lib/db";
// import { NextResponse } from "next/server"; 

// export async function GET(req: Request , {params}:{params:{id:string}}) {

//     const { id } = await params;

//     if(req.method === 'GET'){
//         const res = await db.job.findMany({
//             where:{
//                 id:String(id)
//             }
//         });
//         return NextResponse.json(res)
//     }
// }


import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; // 等待 params Promise 解析

    const res = await db.job.findUnique({
      where: {
        id: String(id), // 確保 id 是字符串類型
      },
    });

    if (!res) {
      return NextResponse.json({ error: "工作記錄未找到" }, { status: 404 });
    }

    return NextResponse.json(res);
  } catch (error) {
    console.error("獲取工作記錄失敗：", error);
    return NextResponse.json({ error: "內部服務器錯誤" }, { status: 500 });
  }
}