// import NextAuth from "next-auth";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { db } from "./lib/db";

// import { UserRole } from "@prisma/client";
// import { getUserById } from "./app/api/user/route"; 
// import authConfig from "./auth.config";

// export const {
//     handlers: {GET, POST},
//     auth,
//     signIn,
//     signOut,
// } = NextAuth({
//     callbacks:{
//         async session({token , session}) {
//             // console.log("-- Session token -- : " , {session}, "-- END --")

//             if(session.user){
//                 const getdata = await getUserById(token.sub);
//                 if(getdata) {

//                     session.user.name = getdata?.username;
//                 }
                
//             }

//             if(session.user && token.sub){
//                 session.user.id = token.sub;
//             }

//             if(token.role && session.user) {
//                 session.user.role = token.role as UserRole
//             }
//             if(typeof token.isadmin !== "undefined" && session.user) {
//                 session.user.isadmin = token.isadmin;
//             }
//             if(typeof token.isstaff !== "undefined" && session.user ) {
//                 session.user.isstaff = token.isstaff
//             }

//             return session
//         },
//         async jwt ({token}) {
//             if(!token.sub) return token

//             const existingUser = await getUserById(token.sub);
//             if(!existingUser) return token;

//             token.name = existingUser.username;
//             token.role = existingUser.role;
//             token.userid = existingUser.id;

//             token.isadmin = existingUser.isStaff;
//             token.isadmin = existingUser.isAdmin;

//             return token

//         }
//     },
//     adapter: PrismaAdapter(db),
//     session: {strategy:"jwt"},
//     ...authConfig,
    
// })


import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { UserRole } from "@prisma/client";
import authConfig from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  callbacks: {
    async session({ token, session }) {


       if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.username = token.username as string;
        session.user.role = token.role as UserRole;
        session.user.isAdmin = token.isAdmin as boolean;
        session.user.isStaff = token.isStaff as boolean;
      }


      console.log("-- Session_after  -- : " , {session}, "-- END --")
      return session;
    },

    // async session({ token, session }) {
    //   console.log("-- Session  -- : ", { session}, "-- END --");
    //   console.log("-- token  -- : ", { token }, "-- END --");
    
    //   if (token && session.user) {
    //     session.user = {
    //       ...session.user,
    //       id: token.sub as string,
    //       username: token.username as string,
    //       role: token.role as UserRole,
    //       isAdmin: token.isAdmin as boolean,
    //       isStaff: token.isStaff as boolean,
    //     };
    //   }
    
    //   return session;
    // },


// async jwt({ token, user }) {
//   // 當用戶登入時，將 user 的屬性寫入 token
//   if (user) {
//     token.id = user.id;
//     token.username = user.username;
//     token.role = user.role;
//     token.isAdmin = user.isAdmin;
//     token.isStaff = user.isStaff;
//   }
//   return token;
// },
async jwt({ token, user }) {
  // 當用戶登入時，將 user 的屬性寫入 token
  if (user) {
    token.id = user.id;
    token.username = user.username;
    token.role = user.role;
    token.isAdmin = user.isAdmin;
    token.isStaff = user.isStaff;
  }
  console.log("-- token_after  -- : " , {token}, "-- END --")

  return token;
},


  },
  session: { strategy: "jwt" },
  ...authConfig,
});




// import NextAuth from "next-auth";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { db } from "./lib/db";
// import { UserRole } from "@prisma/client";
// import authConfig from "./auth.config";

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
// } = NextAuth({
//   adapter: PrismaAdapter(db),
//   callbacks: {
//     async session({ token, session }) {
//       console.log('Session Callback:', { token, session });

//       if (token.sub && session.user) {
//         session.user.id = token.sub;
//         session.user.name = token.name ?? '';
//         session.user.email = token.email ?? '';
//         session.user.username = token.username ?? '';
//         session.user.role = (token.role as UserRole) ?? 'TEACHER';
//         session.user.isAdmin = token.isAdmin as boolean ?? false;
//         session.user.isStaff = token.isStaff as boolean ?? false;
//       }

//       return session;
//     },
//     async jwt({ token, user }) {
//       console.log('JWT Callback:', { token, user });

//       if (user) {
//         token.sub = user.id;
//         token.name = user.name ?? '';
//         token.email = user.email ?? '';
//         token.username = user.username ?? '';
//         token.role = user.role ?? 'TEACHER';
//         token.isAdmin = user.isAdmin ?? false;
//         token.isStaff = user.isStaff ?? false;
//       }

//       return token;
//     },
//   },
//   session: { strategy: "jwt" },
//   ...authConfig,
// });













// import NextAuth from "next-auth";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { db } from "./lib/db";
// import { UserRole } from "@prisma/client";
// import authConfig from "./auth.config";

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
// } = NextAuth({
//   adapter: {
//     ...PrismaAdapter(db),
//     createUser: async (data) => {
//       const user = await db.user.create({
//         data: {
//           email: data.email,
//           username: data.name || data.email.split("@")[0],
//           role: UserRole.TEACHER,
//           isAdmin: false,
//           isStaff: false,
//           password: "",
//           nickname: data.name || "",
//           phone: "",
//           SCRC: "",
//           isLogin: false,
//           area: [],
//           place: [],
//           subject: [],
//           color: "",
//         },
//       });
//       return {
//         id: user.id,
//         email: user.email,
//         emailVerified: null,
//         name: user.username,
//         role: user.role,
//         username: user.username,
//         isAdmin: user.isAdmin,
//         isStaff: user.isStaff,
//       };
//     },
//     getUser: async (id) => {
//       const user = await db.user.findUnique({ where: { id } });
//       if (!user) return null;
//       return {
//         id: user.id,
//         email: user.email,
//         emailVerified: null,
//         name: user.username,
//         role: user.role,
//         username: user.username,
//         isAdmin: user.isAdmin,
//         isStaff: user.isStaff,
//       };
//     },
//     getUserByEmail: async (email) => {
//       const user = await db.user.findUnique({ where: { email } });
//       if (!user) return null;
//       return {
//         id: user.id,
//         email: user.email,
//         emailVerified: null,
//         name: user.username,
//         role: user.role,
//         username: user.username,
//         isAdmin: user.isAdmin,
//         isStaff: user.isStaff,
//       };
//     },
//     getUserByAccount: async ({ provider, providerAccountId }) => {
//       const account = await db.account.findFirst({
//         where: { provider, providerAccountId },
//         include: { user: true },
//       });
//       if (!account?.user) return null;
//       const user = account.user;
//       return {
//         id: user.id,
//         email: user.email,
//         emailVerified: null,
//         name: user.username,
//         role: user.role,
//         username: user.username,
//         isAdmin: user.isAdmin,
//         isStaff: user.isStaff,
//       };
//     },
//   },
//   callbacks: {
//     async session({ token, session }) {
//       if (session.user && token.sub) {
//         session.user.id = token.sub;
//         if(typeof token.username === "string") {

//           session.user.username = token.username;
//         }
//         session.user.role = token.role as UserRole;
//         session.user.isAdmin = Boolean(token.isAdmin);
//         session.user.isStaff = Boolean(token.isStaff);
//       }
//       return session;
//     },
//     async jwt({ token }) {
//       if (!token.sub) return token;
    
//       // 確保僅在伺服器端執行
//       if (typeof window === 'undefined') {
//         const user = await db.user.findUnique({
//           where: { id: token.sub },
//           select: {
//             id: true,
//             username: true,
//             role: true,
//             isAdmin: true,
//             isStaff: true,
//           },
//         });
//         if (!user) return token;
    
//         token.username = user.username;
//         token.role = user.role;
//         token.userId = user.id;
//         token.isAdmin = user.isAdmin;
//         token.isStaff = user.isStaff;
//       }
    
//       return token;
//     },
//   },
//   debug: true, // 啟用除錯模式
//   session: { strategy: "jwt" },
//   ...authConfig,
// });