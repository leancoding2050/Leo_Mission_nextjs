"use server";

import { InputType , ReturnType } from "./types"; 
import { db } from "@/lib/db";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { Create_Remake_Schema } from "./schema";
import { redirect } from "next/navigation"; 

const handler = async (data: InputType) : Promise<ReturnType> => {

    let remake_data;

      const { content , authorname  ,  targetuserId , UserId} = data   
    
    try {
       remake_data = await db.remake.create({
            data:{
                
                content : content,
                authorname : authorname,
                Username_id: targetuserId,
            }
        })
    } catch (error) {
        console.log(error)
    }
    console.log("-- remake_data  -- : ", remake_data , "-- End --")
    return redirect(`/user/${UserId}/admin/userLists/${targetuserId}`)
}

export const CreateRemakeAction = CreateSafeAction(Create_Remake_Schema,handler);
