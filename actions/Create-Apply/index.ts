"use server";

import { InputType , ReturnType } from "./types"; 
import { db } from "@/lib/db";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { Create_Apply_Schema } from "./schema";
import { redirect } from "next/navigation"; 

const handler = async (data: InputType) : Promise<ReturnType> => {
    const { job_id , user_id , apply_title , apply_contect , apply_job_code , applicant_name ,apply_type} = data

    let apply_data;

    const userId = user_id;

    try {
        apply_data = await db.apply.create({
            data:{
                apply_job_id : job_id,
                apply_type:apply_type,
                apply_code : apply_job_code,
                apply_title : apply_title,
                apply_contect : apply_contect,
                apply_job_code : apply_job_code,
                applicant_name : applicant_name,
                apply_task_code : "null",
                apply_user_id : user_id,
                apply_status: false,
                apply_task_id: "null",
                apply_task_job: [],

            }
        })


    } catch (error) {
        console.log(error)
    }
    console.log("-- apply_Data -- : ", apply_data ,"-- End --")


    return redirect(`/user/${userId}/applyLists/`);

}
export const Create_Apply_Action = CreateSafeAction(Create_Apply_Schema, handler);