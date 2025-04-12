"use server";

import { InputType , ReturnType } from "./types"; 
import { db } from "@/lib/db";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { Edit_Job_schema } from "./schema";
import { redirect } from "next/navigation"; 

const handler = async (data: InputType) : Promise<ReturnType> => {
    const {
        targetjobId,
        userId,
        job_code,
        job_place,
        job_time,
        job_price,
        job_day,
        job_subject,
        job_school_name,
        job_area,
        showprice,
        job_public,
        teacher,


    } = data;

    let job_data;
    try {
        job_data = await db.job.update({
            where:{
                id : targetjobId
            },
            data:{
                job_code : job_code,
                job_place : job_place,
                job_time : job_time,
                job_price : job_price,
                job_subject: job_subject,
                job_day : job_day,
                job_admin_remake_authorname : "",
                job_admin_remake_authorid : "",
                job_admin_createdAt : new Date().toISOString(),
                job_admin_content : "",
                job_complete : false,
                job_task_code : "",
                job_school_name : job_school_name,
                job_area : job_area,
                job_apply : false,
                job_public : job_public,
                showprice : showprice,
                authorname :null,
                teacher: teacher
            }
        })
        
    } catch (error) {
        console.log(error);
    }
    console.log("-- job_Data -- : ",job_data,"-- End --")

    return redirect(`/user/${userId}/admin/jobLists/`);

}

export const Edit_Job_Action = CreateSafeAction(Edit_Job_schema, handler);