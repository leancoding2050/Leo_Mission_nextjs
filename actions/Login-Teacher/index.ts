"use server";

import { getUserByUserName } from "@/app/api/user/route"; 
import { Teacher_Login_Schema } from "./schema";
import { z } from "zod";
import bcrypt from 'bcryptjs';
import { AuthError } from "next-auth";
import { signIn } from "@/auth";

export const Teacher_login_action = async (values:z.infer<typeof Teacher_Login_Schema>) => {
    console.log("--Teacher_login_values-- :", values , "-- End --")


        const validatedFields = Teacher_Login_Schema.safeParse(values);
        if(!validatedFields){
            return {
                error: "Invalid fields"
            }
        }
        console.log("is work 1")

        const { username , password , isadmin ,isstaff} = validatedFields.data;
        console.log("is work 2")
            const existingUserName = await getUserByUserName(username)
            if(!existingUserName || !existingUserName.username){
                console.log('error : ', "這username是沒有" , '-- End--')
                return { error: "這username是沒有" }
            }
        
            if(isstaff !== existingUserName.isStaff && isadmin !== existingUserName.isAdmin){
                console.log('error : ', "此用戶不在權限" , '-- End--')
                return { error: "此用戶不在權限" }
            }
        
            const passwordMatch = await bcrypt.compare(password, existingUserName.password);
            if (!passwordMatch) {
                console.log('error : ', "帳號/密碼有誤！" , '-- End--')
            return { error: "帳號/密碼有誤！", status: "error" };
            }
        
            const userid = existingUserName.id;
        
            console.log("is work 3")

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