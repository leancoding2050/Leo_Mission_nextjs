import { db } from "@/lib/db";
import { NextResponse } from "next/server"; 

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("query") || ""; // 获取搜索关键字
        const searchField = searchParams.get('field') || "all";
        const userId = searchParams.get("userId") || ""; // 从查询参数中获取 userId

        console.log("userid : ",userId)

        if (!userId) {
            return NextResponse.json(
              { message: "用戶ID缺失" },
              { status: 400 }
            );
          }

          // 先根据 userId 获取用户的 nickname
    const user = await db.user.findUnique({
        where: { id: userId },
        select: { nickname: true }, // 只获取 nickname
      });

      if (!user) {
        return NextResponse.json(
          { message: "找不到用戶" },
          { status: 404 }
        );
      }

      const userNickname = user.nickname;

      console.log("userNickname : ",userNickname)

        let whereClauses : any = {
            AND:[
                          {
            OR: [
                ...(searchField === "all" || searchField === "job_code" ? [{ job_code: { contains: query, mode: "insensitive" } }] : []),
                ...(searchField === "all" || searchField === "job_school_name" ? [{ job_school_name: { contains: query, mode: "insensitive" } }] : []),
                ...(searchField === "all" || searchField === "job_subject" ? [{ job_subject: { contains: query, mode: "insensitive" } }] : []),
                ...(searchField === "all" || searchField === "job_area" ? [{ job_area: { contains: query, mode: "insensitive" } }] : []),
                ...(searchField === "all" || searchField === "job_time_h" ? [{ job_time_h: { contains: query, mode: "insensitive" } }] : []),
                ...(searchField === "all" || searchField === "job_day" ? [{ job_day: { contains: query, mode: "insensitive" } }] : []),
                ...(searchField === "all" || searchField === "showprice" ? [{ showprice: query === "true" ? true : query === "false" ? false : undefined }] : [])
            ].filter(Boolean),

            },


            // { teacher: userNickname }, // 限制 authorname 必须与用户的 nickname 匹配
        { job_user_id: userId }, // 限制 job_user_id 必须与 userId 匹配  
            ]

        };

        // 如果 OR 条件为空，移除 OR 部分，只返回匹配 authorname 和 job_user_id 的记录
    if (whereClauses.AND[0].OR.length === 0) {
        whereClauses = {
          AND: [{ authorname: userNickname }, { job_user_id: userId }],
        };
      }

        const jobs = await db.job.findMany({
            where: whereClauses,
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