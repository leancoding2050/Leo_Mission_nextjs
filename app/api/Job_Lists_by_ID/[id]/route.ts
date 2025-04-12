import { db } from "@/lib/db";
import { NextResponse } from "next/server"; 

export async function GET(req: Request , {params}:{params:{id:string}}) {

    const { id } = await params;

    if(req.method === 'GET'){
        const res = await db.job.findMany({
            where:{
                id:String(id)
            }
        });
        return NextResponse.json(res)
    }
}