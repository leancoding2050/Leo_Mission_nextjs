// import { db } from "@/lib/db";
// import { NextResponse } from "next/server"; 

// export async function GET(req: Request) {
//     try {
//         const { searchParams } = new URL(req.url);
//         const query = searchParams.get("query") || ""; // 获取搜索关键字
//         const searchField = searchParams.get('field') || "all";

//         const whereClauses = {
//             OR: [
//                 ...(searchField === "all" || searchField === "job_code" ? [{ job_code: { contains: query, mode: "insensitive" } }] : []),
//                 ...(searchField === "all" || searchField === "job_school_name" ? [{ job_school_name: { contains: query, mode: "insensitive" } }] : []),
//                 ...(searchField === "all" || searchField === "job_subject" ? [{ job_subject: { contains: query, mode: "insensitive" } }] : []),
//                 ...(searchField === "all" || searchField === "job_area" ? [{ job_area: { contains: query, mode: "insensitive" } }] : []),
//                 ...(searchField === "all" || searchField === "job_time_h" ? [{ job_time_h: { contains: query, mode: "insensitive" } }] : []),
//                 ...(searchField === "all" || searchField === "job_day" ? [{ job_day: { contains: query, mode: "insensitive" } }] : []),
//                 ...(searchField === "all" || searchField === "showprice" ? [{ showprice: query === "true" ? true : query === "false" ? false : undefined }] : [])
//             ].filter(Boolean),
//         };

//         const jobs = await db.job.findMany({
//             where: whereClauses,
//         });

//         return NextResponse.json(jobs);
//     } catch (error) {
//         console.error("搜尋失敗:", error);
//         return NextResponse.json(
//             { message: "內部服務器錯誤" },
//             { status: 500 }
//         );
//     }
// }


import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || "";
    const searchField = searchParams.get("field") || "all";

    // 構建 OR 條件數組，排除 undefined
    const orConditions: Prisma.JobWhereInput[] = [];

    if (searchField === "all" || searchField === "job_code") {
      orConditions.push({ job_code: { contains: query, mode: "insensitive" } });
    }
    if (searchField === "all" || searchField === "job_school_name") {
      orConditions.push({
        job_school_name: { contains: query, mode: "insensitive" },
      });
    }
    if (searchField === "all" || searchField === "job_subject") {
      orConditions.push({
        job_subject: { contains: query, mode: "insensitive" },
      });
    }
    if (searchField === "all" || searchField === "job_area") {
      orConditions.push({ job_area: { contains: query, mode: "insensitive" } });
    }
    if (searchField === "all" || searchField === "job_time_h") {
      orConditions.push({ job_time_h: { contains: query, mode: "insensitive" } });
    }
    if (searchField === "all" || searchField === "job_day") {
      orConditions.push({ job_day: { contains: query, mode: "insensitive" } });
    }
    if (searchField === "all" || searchField === "showprice") {
      if (query === "true") {
        orConditions.push({ showprice: true });
      } else if (query === "false") {
        orConditions.push({ showprice: false });
      }
    }

    // 構建 where 子句
    const whereClauses: Prisma.JobWhereInput = orConditions.length
      ? { OR: orConditions }
      : {};

    const jobs = await db.job.findMany({
      where: whereClauses,
      orderBy: { job_admin_createdAt: "desc" }, // 按創建時間排序
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error("搜尋失敗:", error);
    return NextResponse.json(
      { message: "內部服務器錯誤" },
      { status: 500 }
    );
  }
}