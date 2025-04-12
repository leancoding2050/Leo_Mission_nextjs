import { db } from "@/lib/db"; 
import { NextResponse } from "next/server";


// userbyusername
export const  getUserByUserName = async (username : string) => {
    try {
    const user = await db.user.findUnique({where:{username}})
    return user        
    } catch (error) {
        return null
    }
}

// userbyid

export const getUserById = async (id : string) => {
    try {
        const user = await db.user.findUnique({where:{id},select:{
            id:true,
            username:true,
            role:true,
            isAdmin:true,
            isStaff:true,
        }})
        return user
    } catch (error) {
        return null
    }
}