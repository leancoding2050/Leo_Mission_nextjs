import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || ""; // 獲取搜索關鍵字
    const searchField = searchParams.get("field") || "all";

    let whereClauses: any = {
      OR: [],
    };

    // 定義所有支持搜索的字段類型
    const stringFields = ["email", "nickname", "username", "phone", "SCRC"];
    const arrayFields = ["area", "place", "subject"];
    const enumFields = ["role"]; // 假設 role 是枚舉型
    const booleanFields = ["isLogin", "isStaff"];

    // 處理字符串字段
    if (searchField === "all" || stringFields.includes(searchField)) {
      stringFields.forEach((field) => {
        if (searchField === "all" || searchField === field) {
          whereClauses.OR.push({
            [field]: {
              contains: query,
              mode: "insensitive",
            },
          });
        }
      });
    }

    // 處理陣列字段（area, place, subject）
    if (searchField === "all" || arrayFields.includes(searchField)) {
      arrayFields.forEach((field) => {
        if (searchField === "all" || searchField === field) {
          whereClauses.OR.push({
            [field]: {
              has: query, // 陣列中包含某個值
            },
          });
        }
      });
    }

    // 處理枚舉字段（role）
    if (searchField === "all" || searchField === "role") {
      if (query) {
        whereClauses.OR.push({
          role: query, // 直接匹配枚舉值
        });
      }
    }

    // 處理布林值字段（isLogin, isStaff）
    if (searchField === "all" || searchField === "isLogin") {
      if (query.toLowerCase() === "true") {
        whereClauses.OR.push({ isLogin: true });
      } else if (query.toLowerCase() === "false") {
        whereClauses.OR.push({ isLogin: false });
      }
    }

    if (searchField === "all" || searchField === "isStaff") {
      if (query.toLowerCase() === "true") {
        whereClauses.OR.push({ isStaff: true });
      } else if (query.toLowerCase() === "false") {
        whereClauses.OR.push({ isStaff: false });
      }
    }

    // 移除空的 OR 條件
    whereClauses.OR = whereClauses.OR.filter(Boolean);

    if (whereClauses.OR.length === 0) {
      return NextResponse.json([]); // 如果沒有條件，返回空陣列
    }

    const users = await db.user.findMany({
      where: whereClauses,
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("搜尋失敗:", error);
    return NextResponse.json(
      { message: "內部服務器錯誤", error },
      { status: 500 }
    );
  }
}