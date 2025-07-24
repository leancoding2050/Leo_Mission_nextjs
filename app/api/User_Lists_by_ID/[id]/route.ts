// import { db } from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function GET(req: Request, { params }: { params: { id: string } }) {
//   const { id } = params;

//   if (req.method === "GET") {
//     const res = await db.user.findMany({
//       where: {
//         id: String(id),
//       },
//       include: {
//         image_rel: true, // 將 image 改為 image_rel 以匹配模型
//         remakes: true,
//         job: true,
//         task: {
//           include: {
//             job: true,
//           },
//         },
//       },
//     });
//     return NextResponse.json(res);
//   }
// }

// import { db } from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function GET(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params; // 等待 params Promise 解析

//     const res = await db.user.findUnique({
//       where: {
//         id: String(id),
//       },
//       include: {
//         image_rel: true,
//         remakes: true,
//         job: true,
//         task: {
//           include: {
//             job: true,
//           },
//         },
//       },
//     });


//     console.log("server Data : " , res)

//     if (!res) {
//       return NextResponse.json(
//         { error: `未找到用戶 (ID: ${id})` },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(res);
//   } catch (error) {
//     console.error("獲取用戶數據失敗：", error);
//     return NextResponse.json(
//       { error: "內部服務器錯誤" },
//       { status: 500 }
//     );
//   }
// }


import { db } from "@/lib/db";
     import { NextResponse } from "next/server";

     export async function GET(
       req: Request,
       { params }: { params: Promise<{ id: string }> }
     ) {
       try {
         const { id } = await params;
         console.log('Received userId:', id);
         console.log('DATABASE_URL:', process.env.DATABASE_URL);

         const res = await db.user.findUnique({
           where: { id: String(id) },
           include: {
             image_rel: true,
             remakes: true,
             job: true,
             task: {
               include: { job: true },
             },
           },
         });

         console.log("Server Data:", res);

         if (!res) {
           console.log('No user found for ID:', id);
           return NextResponse.json(
             { error: `未找到用戶 (ID: ${id})` },
             { status: 404 }
           );
         }

         return NextResponse.json(res);
       } catch (error: unknown) {
         // 確認 error 是 Error 類型
         const errorMessage = error instanceof Error ? error.message : String(error);
         const errorStack = error instanceof Error ? error.stack : undefined;
         console.error("獲取用戶數據失敗：", {
           message: errorMessage,
           stack: errorStack,
         });
         return NextResponse.json(
           { error: "內部服務器錯誤", details: errorMessage },
           { status: 500 }
         );
       } finally {
         await db.$disconnect();
       }
     }