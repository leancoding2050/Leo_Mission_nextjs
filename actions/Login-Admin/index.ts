"use server";

import { getUserByUserName } from "@/app/api/user/route"; 
import { Admin_Login_Schema } from "./schema";
import { z } from "zod";
import bcrypt from 'bcryptjs';
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export const Admin_login_action = async (values:z.infer<typeof Admin_Login_Schema>) => {
    console.log("--Admin_login_values-- :", values , "-- End --");

    const validatedFields = Admin_Login_Schema.safeParse(values);
    if(!validatedFields){
        return {
            error: "Invalid fields"
        }
    }
    const { username , password , isadmin ,isstaff} = validatedFields.data as any ;

    const existingUserName = await getUserByUserName(username)
    if(!existingUserName || !existingUserName.username){
        return { error: "這username是沒有" }
    }

    if(isstaff !== existingUserName.isStaff || isadmin !== existingUserName.isAdmin){
        return { error: "此用戶不在權限" }
    }

    const passwordMatch = await bcrypt.compare(password, existingUserName.password);
    if (!passwordMatch) {
    return { error: "帳號/密碼有誤！", status: "error" };
    }

    const userid = existingUserName.id;

    try {

        await signIn("credentials", {
            username,
            password,
            redirectTo: `/user/${userid}`
        })
    
    
        } catch (error) {
            if(error instanceof AuthError) {
                switch (error.type) {
                    case "CredentialsSignin":
                        return { error: error.message , status:"error"};
                default:
                    return { error: "出了問題！" , status:"error"}
                    }
            }
            throw error
        }

}