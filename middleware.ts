// // import NextAuth from "next-auth";
// import { auth } from "./auth";

// export default auth((req) => {
//     const publicRoutes = ['/','/adminlogin','/teacherlogin',"/hide/createMainAdmin","/forgot-password","/reset-password","/api/Send_reset_email","/api/Reset_Password"];
//     const currentPath = req.nextUrl.pathname;

//     if(!req.auth && !publicRoutes.includes(currentPath)) {
//         console.log("要登入");
//         const newUrl = new URL("/",req.nextUrl) 
//         return Response.redirect(newUrl)
//     }

// })

// export const config = {
//     matcher: ['/((?!.+\\.[\\w]+$|_next).*)','/','/(api|trpc)(.*)'],
// }

// import { auth } from "./auth";
// import { NextResponse } from "next/server";

// const publicRoutes = ['/', '/adminlogin', '/teacherlogin', "/hide/createMainAdmin", "/forgot-password", "/reset-password"];

// export default auth((req) => {
//   const currentPath = req.nextUrl.pathname;
  
//   if (!req.auth?.user && !publicRoutes.includes(currentPath)) {
//     const newUrl = new URL("/", req.nextUrl.origin);
//     return NextResponse.redirect(newUrl);
//   }
// });

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };



// import { auth } from "./auth";
// import { NextResponse } from "next/server";

// export default auth(async (req) => {
//   const publicRoutes = [
//     '/',
//     '/adminlogin',
//     '/teacherlogin',
//     '/hide/createMainAdmin',
//     '/forgot-password',
//     '/reset-password',
//     '/api/Send_reset_email',
//     '/api/Reset_Password',
//   ];
//   const currentPath = req.nextUrl.pathname;

//   if (!req.auth && !publicRoutes.includes(currentPath)) {
//     console.log("要登入");
//     return NextResponse.redirect(new URL("/", req.nextUrl));
//   }

//   return NextResponse.next();
// });

// export const config = {
//   matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
// };


import { auth } from "./auth";
import { NextResponse } from "next/server";

const publicRoutes = ['/', '/adminlogin', '/teacherlogin', "/hide/createMainAdmin", "/forgot-password", "/reset-password"];

export default auth(async (req) => {
  const currentPath = req.nextUrl.pathname;
  
  // 處理 API 路由的 CORS
  if (currentPath.startsWith('/api')) {
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return response;
  }

  // 原有認證邏輯
  if (!req.auth?.user && !publicRoutes.includes(currentPath)) {
    const newUrl = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }
});

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};