// import { db } from "@/lib/db";
// import { NextResponse } from "next/server";

// export async function GET(
//   req: Request,
//   { params }: { params: { username: string } }
// ) {
//   if (!params || !params.username) {
//     return NextResponse.json(
//       { error: "Username parameter is missing" },
//       { status: 400 }
//     );
//   }

//   const { username } = params;

//   try {
//     const res = await db.salary.findMany({
//       where: {
//         username: String(username),
//       },
//       include: {
//         SalaryRemake: true,
//         user: {
//           select: {
//             id: true,
//             nickname: true,
//           },
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

// export async function PUT(
//   req: Request,
//   { params }: { params: { username: string; id: string } }
// ) {
//   if (!params || !params.username || !params.id) {
//     return NextResponse.json(
//       { error: "Username or ID parameter is missing" },
//       { status: 400 }
//     );
//   }

//   const { username, id } = params;

//   try {
//     const body = await req.json();
//     const { add, reduce, total } = body;

//     // 驗證至少有一個字段需要更新
//     if (add === undefined && reduce === undefined && total === undefined) {
//       return NextResponse.json(
//         { error: "At least one field (add, reduce, or total) must be provided" },
//         { status: 400 }
//       );
//     }

//     // 檢查記錄是否存在
//     const existingRecord = await db.salary.findFirst({
//       where: {
//         id: id,
//         username: username,
//       },
//     });

//     if (!existingRecord) {
//       return NextResponse.json(
//         { error: "Salary record not found" },
//         { status: 404 }
//       );
//     }

//     // 更新記錄，只更新指定的字段
//     const updatedRecord = await db.salary.update({
//       where: {
//         id: id,
//       },
//       data: {
//         ...(add !== undefined && { add }),
//         ...(reduce !== undefined && { reduce }),
//         ...(total !== undefined && { total }),
//       },
//       include: {
//         SalaryRemake: true,
//         user: {
//           select: {
//             id: true,
//             nickname: true,
//           },
//         },
//       },
//     });

//     return NextResponse.json(updatedRecord);
//   } catch (error) {
//     console.error("Error updating salary data:", error);
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
  { params }: { params: Promise<{ username: string; id: string }> }
) {
  try {
    const { username, id } = await params; // 等待 params Promise 解析

    console.log("-- API params value -- : ", { username, id }, "-- end --");

    const res = await db.salary.findUnique({
      where: {
        id: id,
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

    if (!res) {
      return NextResponse.json(
        { error: `未找到用戶 ${username} 的薪資記錄 (ID: ${id})` },
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

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ username: string; id: string }> }
) {
  try {
    const { username, id } = await params; // 等待 params Promise 解析
    const body = await req.json();
    const { add, reduce, total } = body;

    // 驗證至少有一個字段需要更新
    if (add === undefined && reduce === undefined && total === undefined) {
      return NextResponse.json(
        { error: "必須提供至少一個字段 (add, reduce 或 total)" },
        { status: 400 }
      );
    }

    // 檢查記錄是否存在
    const existingRecord = await db.salary.findFirst({
      where: {
        id: id,
        username: String(username),
      },
    });

    if (!existingRecord) {
      return NextResponse.json(
        { error: `未找到用戶 ${username} 的薪資記錄 (ID: ${id})` },
        { status: 404 }
      );
    }

    // 更新記錄，只更新指定的字段
    const updatedRecord = await db.salary.update({
      where: {
        id: id,
      },
      data: {
        ...(add !== undefined && { add }),
        ...(reduce !== undefined && { reduce }),
        ...(total !== undefined && { total }),
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

    return NextResponse.json(updatedRecord);
  } catch (error) {
    console.error("更新薪資數據失敗：", error);
    return NextResponse.json(
      { error: "內部服務器錯誤" },
      { status: 500 }
    );
  }
}