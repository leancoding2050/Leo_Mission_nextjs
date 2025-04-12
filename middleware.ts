import NextAuth from "next-auth";
import { auth } from "./auth";

export default auth((req) => {
    const publicRoutes = ['/','/adminlogin','/teacherlogin',"/hide/createMainAdmin","/forgot-password","/reset-password","/api/Send_reset_email","/api/Reset_Password"];
    const currentPath = req.nextUrl.pathname;

    if(!req.auth && !publicRoutes.includes(currentPath)) {
        console.log("要登入");
        const newUrl = new URL("/",req.nextUrl) 
        return Response.redirect(newUrl)
    }

})

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)','/','/(api|trpc)(.*)'],
}