"use server";

import { InputType , ReturnType } from "./types"; 
import { db } from "@/lib/db";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { Create_SalaryRemake_Schema } from "./schema";
import { redirect } from "next/navigation"; 

const handler = async (data: InputType) : Promise<ReturnType> => {

    const {
            username,
            remake,
            SalaryRemakeId
    } = data;

    let SalaryRemake_data;

    try {
        SalaryRemake_data = await db.salaryRemake.create({
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

export const Create_SalaryRemake_Action = CreateSafeAction(Create_SalaryRemake_Schema, handler);