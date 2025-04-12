"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { Delete_Task_Schema } from "./schema";
import { redirect } from "next/navigation";

const handler = async (data: InputType) : Promise<ReturnType> => {

    const { id } = data;
    let task;

    try {
        task = await db.task.delete({
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
        data : task
    }
}

export const deleteTask = CreateSafeAction(Delete_Task_Schema , handler)