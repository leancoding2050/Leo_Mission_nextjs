"use server";

import { InputType , ReturnType } from "./types"; 
import { db } from "@/lib/db";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { Apply_Reject_Task_Schema } from "./schema";
import { redirect } from "next/navigation"; 

const handler = async (data: InputType) : Promise<ReturnType> => {

    const {taskId , userId , task_apply } = data;

    let task_apply_data;

    try {
        task_apply_data = await db.task.update({
            where: {
                id: taskId,
            },
            data: {
                task_apply: task_apply,
            },
        });
        



    } catch (error) {
        console.log(error)
    }
    return redirect(`/user/${userId}/admin/jobLists/`);
}

export const Apply_Reject_Task_Action = CreateSafeAction(Apply_Reject_Task_Schema, handler);