"use server";

import { InputType , ReturnType } from "./types"; 
import { db } from "@/lib/db";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { Apply_Reject_Schema } from "./schema";
import { redirect } from "next/navigation"; 

const handler = async (data: InputType) : Promise<ReturnType> => {

    const {jobId , userId , job_apply } = data;

    let job_apply_data;

    try {
        job_apply_data = await db.job.update({
            where: {
                id: jobId,
            },
            data: {
                job_apply: job_apply,
            },
        });
        



    } catch (error) {
        console.log(error)
    }
    return redirect(`/user/${userId}/admin/applyLists/`);
}

export const Apply_Reject_Action = CreateSafeAction(Apply_Reject_Schema, handler);