// import { db } from "@/lib/db"; 



// // userbyusername
// export const  getUserByUserName = async (username : string) => {
//     try {
//     const user = await db.user.findUnique({where:{username}})
//     return user        
//     } catch (error) {
//         return null
//     }
// }

// // userbyid

// // export const getUserById = async (id : string) => {
// //     try {
// //         const user = await db.user.findUnique({where:{id},select:{
// //             id:true,
// //             username:true,
// //             role:true,
// //             isAdmin:true,
// //             isStaff:true,
// //         }})
// //         return user
// //     } catch (error) {
// //         return null
// //     }
// // }

// export const getUserById = async (id: string) => {
//     try {
//       const user = await db.user.findUnique({
//         where: { id },
//         select: {
//           id: true,
//           username: true,
//           role: true,
//           isAdmin: true,
//           isStaff: true,
//         },
//       });
//       return user;
//     } catch (error) {
//       return null;
//     }
//   };


// import { db } from "@/lib/db";

// // userbyusername
// export const getUserByUserName = async (username: string) => {
//   try {
//     const user = await db.user.findUnique({ where: { username } });
//     return user;
//   } catch (_error) {
//     return null;
//   }
// }

// // userbyid
// export const getUserById = async (id: string) => {
//   try {
//     const user = await db.user.findUnique({
//       where: { id },
//       select: {
//         id: true,
//         username: true,
//         role: true,
//         isAdmin: true,
//         isStaff: true,
//       },
//     });
//     return user;
//   } catch (_error) {
//     return null;
//   }
// };


import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ username: string }> }
) {
  try {
    const { username } = await params; // 等待 params Promise 解析

    const res = await db.user.findUnique({
      where: {
        username: String(username),
      },
      include: {
        image_rel: true,
        remakes: true,
        job: true,
        task: {
          include: {
            job: true,
          },
        },
      },
    });

    if (!res) {
      return NextResponse.json(
        { error: `未找到用戶 ${username}` },
        { status: 404 }
      );
    }

    return NextResponse.json(res);
  } catch (error) {
    console.error("獲取用戶數據失敗：", error);
    return NextResponse.json(
      { error: "內部服務器錯誤" },
      { status: 500 }
    );
  }
}