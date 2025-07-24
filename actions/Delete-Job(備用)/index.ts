"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { Delete_Job_Schema } from "./schema";
import { redirect } from "next/navigation";

const handler = async (data: InputType) : Promise<ReturnType> => {

    const { id } = data;
    let job;

    try {
        job = await db.job.delete({
            where:{
                id
            }
        })
    } catch (error) {
        console.log(error)
        return{
            error:"不能刪除"
        }
    }
    return {
        data : job
    }
}

export const deleteJob = CreateSafeAction(Delete_Job_Schema , handler)