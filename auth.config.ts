import bcrypt from "bcryptjs";
import credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { Teacher_Login_Schema } from "./actions/Login-Teacher/schema";
import { Admin_Login_Schema } from "./actions/Login-Admin/schema";
import { getUserByUserName } from "./app/api/user/route";

export default{providers:[
    credentials({

        async authorize(credentials ,req) {
            console.log("-- credentials -- : ",credentials ,"-- end --")

            console.log(credentials) 

            if(credentials.role === "ADMIN") {
                console.log('testmessage : is work ')

                const login_form_validatedFields = Admin_Login_Schema.safeParse(credentials);
                if(login_form_validatedFields.success) {
                    const { username , password } = login_form_validatedFields.data;
                    const user = await getUserByUserName(username);
                    if(!user || !user.password){  console.error("no user or no pw (admin)"); return null }
                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password,
                    )
                    console.log('is work')
                    if(passwordsMatch) return user

                } else {
                    console.error("form have wrong (admin) : ", login_form_validatedFields.error)
                    return null
                }

            }


            const login_form_validatedFields = Teacher_Login_Schema.safeParse(credentials);
            if(login_form_validatedFields.success){
                const { username , password } = login_form_validatedFields.data;
                const user = await getUserByUserName(username);
                if(!user || !user.password) { 
                    console.error("no user or no pw (teacher)") 
                    return null 
                }
                const passwordsMatch = await bcrypt.compare(
                    password,
                    user.password
            );
            if(passwordsMatch) return user
            
                }else{
                    console.error("form have wrong (teacher) : ",login_form_validatedFields.error)
                    return null
                }

                return null;
        }

    })
],} satisfies NextAuthConfig

