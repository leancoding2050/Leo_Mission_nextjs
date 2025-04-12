import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { username: string, targetid: string } }
) {

// 檢查 params 是否存在並提取 username
if (!params || !params.username) {
    return NextResponse.json(
      { error: "Username parameter is missing" },
      { status: 400 }
    );
  }

  // console.log("-- API params -- : ", params, "-- end --");

  const { username , targetid} = params;
  console.log("-- API params value -- : ", username, "-- end --");
  console.log("-- API params value -- : ", targetid, "-- end --");

  try {
    // const res = await db.salary.findMany({
    //   where: {
    //     AND:[
    //      {username: String(username)}, 
    //      {id: String(targetid)}
    //     ]
        
    //   },
    //   include: {
    //     SalaryRemake: true,
    //     user: {
    //         select:{
    //             id: true,
    //             nickname: true,
                
    //         }
    //     },
    //   },
    // });

    const res = await db.salaryRemake.findMany({
      where: {

         id: String(targetid)
        
        
      },

    });

    return NextResponse.json(res);
  } catch (error) {
    console.error("Error fetching salary data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}