// import { db } from "@/lib/db";
// import { NextResponse } from "next/server"; 

// export async function GET(req: Request) {
//     try {
//         const { searchParams } = new URL(req.url);
//         const query = searchParams.get("query") || ""; // 获取搜索关键字
//         const searchField = searchParams.get('field') || "all";

//         const whereClauses:any = {
//             AND:[
//             {
//                 job_public: true   
//             },
//             {            OR: [
//                 ...(searchField === "all" || searchField === "job_code" ? [{ job_code: { contains: query, mode: "insensitive" } }] : []),
//                 ...(searchField === "all" || searchField === "job_school_name" ? [{ job_school_name: { contains: query, mode: "insensitive" } }] : []),
//                 ...(searchField === "all" || searchField === "job_subject" ? [{ job_subject: { contains: query, mode: "insensitive" } }] : []),
//                 ...(searchField === "all" || searchField === "job_area" ? [{ job_area: { contains: query, mode: "insensitive" } }] : []),
//                 ...(searchField === "all" || searchField === "job_time_h" ? [{ job_time_h: { contains: query, mode: "insensitive" } }] : []),
//                 ...(searchField === "all" || searchField === "job_day" ? [{ job_day: { contains: query, mode: "insensitive" } }] : []),
//                 ...(searchField === "all" || searchField === "showprice" ? [{ showprice: query === "true" ? true : query === "false" ? false : undefined }] : [])
//             ].filter(Boolean),},

//             ],

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
import { Prisma } from "@prisma/client"; // 匯入 Prisma 以使用 JobWhereInput 和 QueryMode

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("query") || ""; // 獲取搜索關鍵字
        const searchField = searchParams.get("field") || "all";

        const whereClauses: Prisma.JobWhereInput = {
            AND: [
                {
                    job_public: true,
                },
                {
                    OR: [
                        ...(searchField === "all" || searchField === "job_code"
                            ? [{ job_code: { contains: query, mode: Prisma.QueryMode.insensitive } }]
                            : []),
                        ...(searchField === "all" || searchField === "job_school_name"
                            ? [{ job_school_name: { contains: query, mode: Prisma.QueryMode.insensitive } }]
                            : []),
                        ...(searchField === "all" || searchField === "job_subject"
                            ? [{ job_subject: { contains: query, mode: Prisma.QueryMode.insensitive } }]
                            : []),
                        ...(searchField === "all" || searchField === "job_area"
                            ? [{ job_area: { contains: query, mode: Prisma.QueryMode.insensitive } }]
                            : []),
                        ...(searchField === "all" || searchField === "job_time_h"
                            ? [{ job_time_h: { contains: query, mode: Prisma.QueryMode.insensitive } }]
                            : []),
                        ...(searchField === "all" || searchField === "job_day"
                            ? [{ job_day: { contains: query, mode: Prisma.QueryMode.insensitive } }]
                            : []),
                        ...(searchField === "all" || searchField === "showprice"
                            ? [{ showprice: query === "true" ? true : query === "false" ? false : { not: null } }]
                            : []),
                    ] as Prisma.JobWhereInput[], // 明確指定 OR 陣列的類型
                },
            ],
        };

        const jobs = await db.job.findMany({
            where: whereClauses,
        });

        return NextResponse.json(jobs);
    } catch (error: unknown) {
        console.error("搜尋失敗:", error);
        return NextResponse.json(
            { message: "搜尋失敗，請檢查輸入或稍後重試" },
            { status: 500 }
        );
    }
}