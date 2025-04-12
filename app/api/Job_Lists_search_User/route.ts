import { db } from "@/lib/db";
import { NextResponse } from "next/server"; 

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get("query") || ""; // 获取搜索关键字
        const searchField = searchParams.get('field') || "all";

        const whereClauses:any = {
            AND:[
            {
                job_public: true   
            },
            {            OR: [
                ...(searchField === "all" || searchField === "job_code" ? [{ job_code: { contains: query, mode: "insensitive" } }] : []),
                ...(searchField === "all" || searchField === "job_school_name" ? [{ job_school_name: { contains: query, mode: "insensitive" } }] : []),
                ...(searchField === "all" || searchField === "job_subject" ? [{ job_subject: { contains: query, mode: "insensitive" } }] : []),
                ...(searchField === "all" || searchField === "job_area" ? [{ job_area: { contains: query, mode: "insensitive" } }] : []),
                ...(searchField === "all" || searchField === "job_time_h" ? [{ job_time_h: { contains: query, mode: "insensitive" } }] : []),
                ...(searchField === "all" || searchField === "job_day" ? [{ job_day: { contains: query, mode: "insensitive" } }] : []),
                ...(searchField === "all" || searchField === "showprice" ? [{ showprice: query === "true" ? true : query === "false" ? false : undefined }] : [])
            ].filter(Boolean),},

            ],

        };

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