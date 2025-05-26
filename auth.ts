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
  adapter: {
    ...PrismaAdapter(db),
    createUser: async (data) => {
      const user = await db.user.create({
        data: {
          email: data.email,
          username: data.name || data.email.split("@")[0],
          role: UserRole.TEACHER,
          isAdmin: false,
          isStaff: false,
          password: "",
          nickname: data.name || "",
          phone: "",
          SCRC: "",
          isLogin: false,
          area: [],
          place: [],
          subject: [],
          color: "",
        },
      });
      return {
        id: user.id,
        email: user.email,
        emailVerified: null,
        name: user.username,
        role: user.role,
        username: user.username,
        isAdmin: user.isAdmin,
        isStaff: user.isStaff,
      };
    },
    getUser: async (id) => {
      const user = await db.user.findUnique({ where: { id } });
      if (!user) return null;
      return {
        id: user.id,
        email: user.email,
        emailVerified: null,
        name: user.username,
        role: user.role,
        username: user.username,
        isAdmin: user.isAdmin,
        isStaff: user.isStaff,
      };
    },
    getUserByEmail: async (email) => {
      const user = await db.user.findUnique({ where: { email } });
      if (!user) return null;
      return {
        id: user.id,
        email: user.email,
        emailVerified: null,
        name: user.username,
        role: user.role,
        username: user.username,
        isAdmin: user.isAdmin,
        isStaff: user.isStaff,
      };
    },
    getUserByAccount: async ({ provider, providerAccountId }) => {
      const account = await db.account.findFirst({
        where: { provider, providerAccountId },
        include: { user: true },
      });
      if (!account?.user) return null;
      const user = account.user;
      return {
        id: user.id,
        email: user.email,
        emailVerified: null,
        name: user.username,
        role: user.role,
        username: user.username,
        isAdmin: user.isAdmin,
        isStaff: user.isStaff,
      };
    },
  },
  callbacks: {
    async session({ token, session }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        if(typeof token.username === "string") {

          session.user.username = token.username;
        }
        session.user.role = token.role as UserRole;
        session.user.isAdmin = Boolean(token.isAdmin);
        session.user.isStaff = Boolean(token.isStaff);
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const user = await db.user.findUnique({
        where: { id: token.sub },
        select: {
          id: true,
          username: true,
          role: true,
          isAdmin: true,
          isStaff: true,
        },
      });
      if (!user) return token;

      token.username = user.username;
      token.role = user.role;
      token.userId = user.id;
      token.isAdmin = user.isAdmin;
      token.isStaff = user.isStaff;

      return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});