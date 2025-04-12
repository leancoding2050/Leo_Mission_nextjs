import { db } from "@/lib/db";
import { NextResponse } from "next/server"; 

export async function GET(req: Request , {params}:{params:{id:string}}) {

    const { id } = await params;

    if(req.method === 'GET'){
        const res = await db.user.findMany({
            where:{
                id:String(id)
            },include:{
                image: true,
                remakes: true,
                job: true,
                task: {
                    include:{
                        job: true,
                    }
                },

            }
        });
        return NextResponse.json(res)
    }
}