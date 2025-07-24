// import { db } from "@/lib/db";
// import { NextResponse } from "next/server"; 

// export async function GET(req: Request) {

//     try {
//         const { searchParams } = new URL(req.url);
//         const query = searchParams.get('query') || "";
//         const searchField = searchParams.get('field')  || "all";

//         const whereClauses = {
//             OR:[
//             searchField === "all" || searchField === "apply_title" ? { apply_title: {contains: query , mode: "insensitive"} } : undefined,
//             searchField === "all" || searchField === "apply_task_code" ? { apply_task_code: {contains: query , mode: "insensitive"} }: undefined,
//             searchField === "all" || searchField=== "apply_job_code" ? { apply_job_code: {contains: query , mode: "insensitive"} }: undefined,
//             searchField === "all" || searchField=== "apply_contect" ? { apply_contect: {contains: query , mode: "insensitive"} }: undefined,
//             searchField === "all" || searchField=== "apply_code" ? { apply_code: {contains: query , mode: "insensitive"} }: undefined,
//             searchField === "all" || searchField=== "applicant_name" ? { applicant_name: {contains: query , mode: "insensitive"} }: undefined,
//             searchField === "all" || searchField === "apply_status"  ? { apply_status: query === "true" ? true : query === "false" ? false : undefined }
//             : undefined,].filter(Boolean),
            
//         }
        
//         const apply = await db.apply.findMany({
//             where: whereClauses,  
//         });
//         return NextResponse.json(apply) 
//     } catch (error) {
//         console.error("搜尋失敗:", error);
//         return NextResponse.json(
//           { message: "內部服務器錯誤" },
//           { status: 500 } 
//         );
//     }




// }


// import { db } from "@/lib/db";
// import { NextResponse } from "next/server";
// import { Prisma } from "@prisma/client";

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const query = searchParams.get("query") || "";
//     const searchField = searchParams.get("field") || "all";

//     // 構建 OR 條件數組，排除 undefined
//     const orConditions: Prisma.ApplyWhereInput[] = [];

//     if (searchField === "all" || searchField === "apply_title") {
//       orConditions.push({ apply_title: { contains: query, mode: "insensitive" } });
//     }
//     if (searchField === "all" || searchField === "apply_task_code") {
//       orConditions.push({
//         apply_task_code: { contains: query, mode: "insensitive" },
//       });
//     }
//     if (searchField === "all" || searchField === "apply_job_code") {
//       orConditions.push({
//         apply_job_code: { contains: query, mode: "insensitive" },
//       });
//     }
//     if (searchField === "all" || searchField === "apply_contect") {
//       orConditions.push({
//         apply_contect: { contains: query, mode: "insensitive" },
//       });
//     }
//     if (searchField === "all" || searchField === "apply_code") {
//       orConditions.push({ apply_code: { contains: query, mode: "insensitive" } });
//     }
//     if (searchField === "all" || searchField === "applicant_name") {
//       orConditions.push({
//         applicant_name: { contains: query, mode: "insensitive" },
//       });
//     }
//     if (searchField === "all" || searchField === "apply_status") {
//       if (query === "true") {
//         orConditions.push({ apply_status: true });
//       } else if (query === "false") {
//         orConditions.push({ apply_status: false });
//       }
//     }

//     // 構建 where 子句
//     const whereClauses: Prisma.ApplyWhereInput = orConditions.length
//       ? { OR: orConditions }
//       : {};

//     const apply = await db.apply.findMany({
//       where: whereClauses,
//       orderBy: { apply_date: "desc" }, // 可選：按日期排序
//     });

//     return NextResponse.json(apply);
//   } catch (error) {
//     console.error("搜尋失敗:", error);
//     return NextResponse.json(
//       { message: "內部服務器錯誤" },
//       { status: 500 }
//     );
//   }
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
       const orConditions: Prisma.ApplyWhereInput[] = [];

       if (searchField === "all" || searchField === "apply_title") {
         orConditions.push({ apply_title: { contains: query, mode: "insensitive" } });
       }
       if (searchField === "all" || searchField === "apply_task_code") {
         orConditions.push({
           apply_task_code: { contains: query, mode: "insensitive" },
         });
       }
       if (searchField === "all" || searchField === "apply_job_code") {
         orConditions.push({
           apply_job_code: { contains: query, mode: "insensitive" },
         });
       }
       if (searchField === "all" || searchField === "apply_contect") {
         orConditions.push({
           apply_contect: { contains: query, mode: "insensitive" },
         });
       }
       if (searchField === "all" || searchField === "apply_code") {
         orConditions.push({ apply_code: { contains: query, mode: "insensitive" } });
       }
       if (searchField === "all" || searchField === "applicant_name") {
         orConditions.push({
           applicant_name: { contains: query, mode: "insensitive" },
         });
       }
       if (searchField === "all" || searchField === "apply_status") {
         if (query === "true") {
           orConditions.push({ apply_status: true });
         } else if (query === "false") {
           orConditions.push({ apply_status: false });
         }
       }

       // 構建 where 子句
       const whereClauses: Prisma.ApplyWhereInput = orConditions.length
         ? { OR: orConditions }
         : {};

       const apply = await db.apply.findMany({
         where: whereClauses,
         orderBy: { createdAt: "desc" }, // 使用 createdAt 排序
       });

       return NextResponse.json(apply);
     } catch (error) {
       console.error("搜尋失敗:", error);
       return NextResponse.json(
         { message: "Internal server error" },
         { status: 500 }
       );
     }
   }