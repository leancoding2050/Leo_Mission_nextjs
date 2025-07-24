// import { db } from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function GET(
//   req: Request,
//   { params }: { params: { username: string, targetid: string } }
// ) {

// // 檢查 params 是否存在並提取 username
// if (!params || !params.username) {
//     return NextResponse.json(
//       { error: "Username parameter is missing" },
//       { status: 400 }
//     );
//   }

//   // console.log("-- API params -- : ", params, "-- end --");

//   const { username , targetid} = params;
//   console.log("-- API params value -- : ", username, "-- end --");
//   console.log("-- API params value -- : ", targetid, "-- end --");

//   try {
//     // const res = await db.salary.findMany({
//     //   where: {
//     //     AND:[
//     //      {username: String(username)}, 
//     //      {id: String(targetid)}
//     //     ]
        
//     //   },
//     //   include: {
//     //     SalaryRemake: true,
//     //     user: {
//     //         select:{
//     //             id: true,
//     //             nickname: true,
                
//     //         }
//     //     },
//     //   },
//     // });

//     const res = await db.salaryRemake.findMany({
//       where: {

//          id: String(targetid)
        
        
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
  { params }: { params: Promise<{ username: string; targetid: string }> }
) {
  try {
    const { username, targetid } = await params; // 等待 params Promise 解析

    console.log("-- API params value -- : ", { username, targetid }, "-- end --");

    const res = await db.salaryRemake.findMany({
      where: {
        id: String(targetid),
        Salary: {
          username: String(username), // 確保與 salary 表的 username 關聯
        },
      },
      include: {
        Salary: {
          include: {
            user: {
              select: {
                id: true,
                nickname: true,
              },
            },
          },
        },
      },
    });

    if (res.length === 0) {
      return NextResponse.json(
        { error: `未找到用戶 ${username} 的薪資備註記錄 (ID: ${targetid})` },
        { status: 404 }
      );
    }

    return NextResponse.json(res);
  } catch (error) {
    console.error("獲取薪資備註數據失敗：", error);
    return NextResponse.json(
      { error: "內部服務器錯誤" },
      { status: 500 }
    );
  }
}