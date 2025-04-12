"use server";

import { InputType , ReturnType } from "./types"; 
import { db } from "@/lib/db";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { Edit_SalaryRemake_Schema } from "./schema";
import { redirect } from "next/navigation"; 

const handler = async (data: InputType) : Promise<ReturnType> => {

    const {
        targetId,
            username,
            remake,
            SalaryRemakeId
    } = data;

    let SalaryRemake_data;

    try {
        SalaryRemake_data = await db.salaryRemake.update({
            where:{
                id:targetId
            },
            data:{
                remake : remake,
                SalaryRemakeId : SalaryRemakeId

            }
        })
    } catch (error) {
        console.log(error)
    }

    console.log("-- SalaryRemake_data  -- : ", SalaryRemake_data , "-- End --")
    return redirect(`/LeoSalaryPath/salaryLists/${username}`)
}

export const Edit_SalaryRemake_Action = CreateSafeAction(Edit_SalaryRemake_Schema, handler);