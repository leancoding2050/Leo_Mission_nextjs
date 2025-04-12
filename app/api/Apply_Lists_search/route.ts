import { db } from "@/lib/db";
import { NextResponse } from "next/server"; 

export async function GET(req: Request) {

    try {
        const { searchParams } = new URL(req.url);
        const query = searchParams.get('query') || "";
        const searchField = searchParams.get('field')  || "all";

        const whereClauses = {
            OR:[
            searchField === "all" || searchField === "apply_title" ? { apply_title: {contains: query , mode: "insensitive"} } : undefined,
            searchField === "all" || searchField === "apply_task_code" ? { apply_task_code: {contains: query , mode: "insensitive"} }: undefined,
            searchField === "all" || searchField=== "apply_job_code" ? { apply_job_code: {contains: query , mode: "insensitive"} }: undefined,
            searchField === "all" || searchField=== "apply_contect" ? { apply_contect: {contains: query , mode: "insensitive"} }: undefined,
            searchField === "all" || searchField=== "apply_code" ? { apply_code: {contains: query , mode: "insensitive"} }: undefined,
            searchField === "all" || searchField=== "applicant_name" ? { applicant_name: {contains: query , mode: "insensitive"} }: undefined,
            searchField === "all" || searchField === "apply_status"  ? { apply_status: query === "true" ? true : query === "false" ? false : undefined }
            : undefined,].filter(Boolean),
            
        }
        
        const apply = await db.apply.findMany({
            where: whereClauses,  
        });
        return NextResponse.json(apply) 
    } catch (error) {
        console.error("搜尋失敗:", error);
        return NextResponse.json(
          { message: "內部服務器錯誤" },
          { status: 500 } 
        );
    }




}
