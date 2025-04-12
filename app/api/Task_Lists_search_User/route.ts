import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query") || ""; // 獲取搜索關鍵字
    const searchField = searchParams.get("field") || "all";

    let whereClauses: any = {
      AND: [
        { task_public: true }, // 只返回公开的 Task
        {
          OR: [],
        },
      ],
    };

    // 定義所有支持搜索的字段類型
    const stringFields = ["task_title", "task_subject", "task_contect", "task_code", "task_address", "task_area", "teacher"];
    const booleanFields = ["task_apply", "showprice", "completed"];
    const numberFields = ["task_price"]; // 數字字段
    const arrayFields = ["School_name"]; // 陣列字段

    // 處理字符串字段
    if (searchField === "all" || stringFields.includes(searchField)) {
      stringFields.forEach((field) => {
        if (searchField === "all" || searchField === field) {
          whereClauses.AND[1].OR.push({
            [field]: {
              contains: query,
              mode: "insensitive",
            },
          });
        }
      });
    }

    // 處理布林值字段（不包括 task_public，因為它已作為主條件）
    if (searchField === "all" || booleanFields.includes(searchField)) {
      booleanFields.forEach((field) => {
        if (searchField === "all" || searchField === field) {
          if (query.toLowerCase() === "true") {
            whereClauses.AND[1].OR.push({ [field]: true });
          } else if (query.toLowerCase() === "false") {
            whereClauses.AND[1].OR.push({ [field]: false });
          }
        }
      });
    }

    // 處理數字字段（task_price）
    if (searchField === "all" || searchField === "task_price") {
      const numberQuery = parseInt(query, 10);
      if (!isNaN(numberQuery)) {
        whereClauses.AND[1].OR.push({ task_price: numberQuery });
      }
    }

    // 處理陣列字段（School_name）
    if (searchField === "all" || searchField === "School_name") {
      whereClauses.AND[1].OR.push({
        School_name: {
          has: query, // 檢查陣列是否包含某個值
        },
      });
    }

    // 移除空的 OR 條件
    whereClauses.AND[1].OR = whereClauses.AND[1].OR.filter(Boolean);

    // 如果 OR 条件为空，只返回 task_public 为 true 的记录
    if (whereClauses.AND[1].OR.length === 0) {
      whereClauses = { task_public: true };
    }

    // 查詢數據庫
    const tasks = await db.task.findMany({
      where: whereClauses,
    });

    // 如果沒有數據，返回「沒有數據」的訊息
    if (tasks.length === 0) {
      return NextResponse.json(
        { message: "沒有數據" },
        { status: 200 }
      );
    }

    // 如果有數據，返回查詢結果
    return NextResponse.json(tasks, { status: 200 });

  } catch (error) {
    console.error("搜尋失敗:", error);
    return NextResponse.json(
      { message: "內部服務器錯誤" },
      { status: 500 }
    );
  }
}