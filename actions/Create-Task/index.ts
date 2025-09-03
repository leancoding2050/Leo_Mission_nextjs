"use server";

import { InputType , ReturnType } from "./types"; 
import { db } from "@/lib/db";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { Create_Task_Schema } from "./schema";
import { redirect } from "next/navigation"; 

const handler = async (data: InputType) : Promise<ReturnType> => {
    const {
        userId,
        task_title,
        task_subject,
        task_contect,
        task_code,
        task_address,
        task_area,
        task_price,
        task_apply,
        showprice,
        school_name,
        completed,
        task_public,
        // job,
        jobidbyarray,
        teacher,
    } = data;

    let task_data;

    try {
        task_data = await db.task.create({
            data:{
                task_title : task_title,
                task_subject : task_subject,
                task_contect : task_contect,
                task_code : task_code,
                task_address : task_address,
                task_area : task_area,
                task_price : task_price,
                task_apply : task_apply,
                showprice : showprice,
                School_name : school_name,
                completed : completed,
                task_public : task_public,
                job : {
                    connect:jobidbyarray.map(id=>({id})),
                    
                },

                teacher : teacher,
            }
        })

        await db.job.updateMany({
            where:{
                id:{
                    in: jobidbyarray
                }
            },
            data:{
                job_in_task: true
            }
        })
        
    }
     catch (error) {
        console.log(error)
    }
    console.log("-- task_Data -- : ", task_data ,"-- End --")

return redirect(`/user/${userId}/admin/taskLists/`);
}

export const Create_Task_Action = CreateSafeAction(Create_Task_Schema, handler);