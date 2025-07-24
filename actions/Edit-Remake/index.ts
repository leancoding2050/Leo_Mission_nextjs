"use server";

import { InputType , ReturnType } from "./types"; 
import { db } from "@/lib/db";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { Edit_Remake_Schema } from "./schema";
import { redirect } from "next/navigation"; 

const handler = async (data: InputType) : Promise<ReturnType> => {

    let remake_data;

      const { content , authorname , targetremakeId} = data   
    
    try {
        await db.remake.update({
            where:{
                id : targetremakeId
            },
            data:{
                content : content,
                authorname : authorname
            }
        })
    } catch (error) {
        console.log(error)
    }
    console.log("-- remake_data  -- : ", remake_data , "-- End --")
    return {
        data : remake_data
    }   
}

export const EditSalaryAction = CreateSafeAction(Edit_Remake_Schema,handler);
