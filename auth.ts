import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";

import { UserRole } from "@prisma/client";
import { getUserById } from "./app/api/user/route"; 
import authConfig from "./auth.config";

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    callbacks:{
        async session({token , session}) {
            // console.log("-- Session token -- : " , {session}, "-- END --")

            if(session.user){
                const getdata = await getUserById(token.sub);
                if(getdata) {

                    session.user.name = getdata?.username;
                }
                
            }

            if(session.user && token.sub){
                session.user.id = token.sub;
            }

            if(token.role && session.user) {
                session.user.role = token.role as UserRole
            }
            if(typeof token.isadmin !== "undefined" && session.user) {
                session.user.isadmin = token.isadmin;
            }
            if(typeof token.isstaff !== "undefined" && session.user ) {
                session.user.isstaff = token.isstaff
            }

            return session
        },
        async jwt ({token}) {
            if(!token.sub) return token

            const existingUser = await getUserById(token.sub);
            if(!existingUser) return token;

            token.name = existingUser.username;
            token.role = existingUser.role;
            token.userid = existingUser.id;

            token.isadmin = existingUser.isStaff;
            token.isadmin = existingUser.isAdmin;

            return token

        }
    },
    adapter: PrismaAdapter(db),
    session: {strategy:"jwt"},
    ...authConfig,
    
})