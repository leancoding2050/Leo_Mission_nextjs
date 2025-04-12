import { db } from "@/lib/db";
import { NextResponse } from "next/server"; 

export async function GET(req: Request , {params}:{params:{id:string}}) {

    const { id } = await params;

    if(req.method === 'GET'){
        const res = await db.task.findMany({
            where:{
                id:String(id)
            },
            include:{
                job: true,
            }
        })
        return NextResponse.json(res)
    }
}
