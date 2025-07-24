// import { db } from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function GET(
//   req: Request,
//   { params }: { params: { username: string } }
// ) {

// // 檢查 params 是否存在並提取 username
// if (!params || !params.username) {
//     return NextResponse.json(
//       { error: "Username parameter is missing" },
//       { status: 400 }
//     );
//   }

//   // console.log("-- API params -- : ", params, "-- end --");

//   const { username } = params;
//   console.log("-- API params value -- : ", username, "-- end --");

//   try {
//     const res = await db.salary.findMany({
//       where: {
//         username: String(username),
//       },
//       include: {
//         SalaryRemake: true,
//         user: {
//             select:{
//                 id: true,
//                 nickname: true,
                
//             }
//         },
//       },
//     });

//     return NextResponse.json(res);
//   } catch (error) {
//     console.error("Error fetching salary data:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }


import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params; // 等待 params Promise 解析

    console.log("-- API params value -- : ", username, "-- end --");

    const res = await db.salary.findMany({
      where: {
        username: String(username),
      },
      include: {
        SalaryRemake: true,
        user: {
          select: {
            id: true,
            nickname: true,
          },
        },
      },
    });

    if (res.length === 0) {
      return NextResponse.json(
        { error: `未找到用戶 ${username} 的薪資記錄` },
        { status: 404 }
      );
    }

    return NextResponse.json(res);
  } catch (error) {
    console.error("獲取薪資數據失敗：", error);
    return NextResponse.json(
      { error: "內部服務器錯誤" },
      { status: 500 }
    );
  }
}