"use server";

import { InputType , ReturnType } from "./types"; 
import { db } from "@/lib/db";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { Create_Job_schema } from "./schema";
import { redirect } from "next/navigation"; 

const handler = async (data: InputType) : Promise<ReturnType> => {
    const {
        userId,
        job_code,
        job_place,
        job_price,
        job_day,
        job_subject,
        job_school_name,
        job_area,
        showprice,
        job_public,
        job_time_start,
        job_time_end,
        job_time_h,
        job_contect,
    } = data;

    let job_data;
    try {
        job_data = await db.job.create({
            data:{
                job_code : job_code,
                job_place : job_place,
                job_title : job_school_name,
                job_time_start : job_time_start,
                job_time_end : job_time_end,
                job_time_h : String(job_time_h),
                job_price : job_price,
                job_contect: job_contect,
                job_day : job_day,
                authorname :null,
                job_admin_remake_authorname : "",
                job_admin_content : "",
                job_admin_createdAt : new Date().toISOString(),
                job_complete : false,
                job_school_name : job_school_name,
                job_area : job_area,
                showprice : showprice,
                job_apply : false,
                job_public : job_public,
                job_task_id : null,
                job_in_task : false,
                job_admin_remake_authorid : "",
                job_task_code : "",
                job_subject: job_subject,  
                is_confirm : false,              
            }
        })
        
    } catch (error) {
        console.log(error);
    }
    console.log("-- job_Data -- : ",job_data,"-- End --")

    return redirect(`/user/${userId}/admin/jobLists/`);

}

export const Create_Job_Action = CreateSafeAction(Create_Job_schema, handler);