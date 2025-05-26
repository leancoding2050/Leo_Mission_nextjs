// import { UserRole } from "@prisma/client";

// declare module "next-auth" {
//   interface User {
//     id: string;
//     role: UserRole; // 對應 Prisma 的 UserRole 枚舉
//     isadmin?: boolean; // 對應 isAdmin
//     isstaff?: boolean; // 對應 isStaff
//     name?: string | null; // 確保 name 可以為 null
//   }

//   interface Session {
//     user: User;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id?: string;
//     role?: UserRole;
//     isadmin?: boolean;
//     isstaff?: boolean;
//   }
// }



// import { UserRole } from "@prisma/client";
// import { AdapterUser } from "@auth/core/adapters";

// declare module "@auth/core/types" {
//   interface AdapterUser extends AdapterUser {
//     role: UserRole; // 添加 role 屬性
//     username?: string; // 可選的 username
//     isAdmin?: boolean; // 可選的 isAdmin
//     isStaff?: boolean; // 可選的 isStaff
//   }
// }

// declare module "next-auth" {
//   interface User {
//     id: string;
//     username?: string;
//     role: UserRole;
//     isAdmin?: boolean;
//     isStaff?: boolean;
//     name?: string | null;
//   }

//   interface Session {
//     user: User;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id?: string;
//     username?: string;
//     role?: UserRole;
//     isAdmin?: boolean;
//     isStaff?: boolean;
//     userId?: string;
//   }
// }



import { UserRole } from "@prisma/client";
import { AdapterUser } from "@auth/core/adapters";

declare module "@auth/core/types" {
  interface AdapterUser extends AdapterUser {
    role: UserRole;
    username?: string;
    isAdmin?: boolean;
    isStaff?: boolean;
  }
}

declare module "next-auth" {
  interface User {
    id: string;
    username?: string;
    role: UserRole;
    isAdmin?: boolean;
    isStaff?: boolean;
    name?: string | null;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    username?: string;
    role?: UserRole;
    isAdmin?: boolean;
    isStaff?: boolean;
    userId?: string;
  }
}