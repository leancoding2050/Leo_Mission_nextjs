// import { PrismaClient } from "@prisma/client"; 

// declare global {
//     let prisma: PrismaClient | undefined;
// }

// export const db = globalThis.prisma || new PrismaClient()

// if(process.env.NODE_ENV !== "production") globalThis.prisma = db


import { PrismaClient } from "@prisma/client";

// 擴展 globalThis 的類型
declare global {
  interface globalThis {
    prisma?: PrismaClient;
  }
}

// 初始化 PrismaClient，優先使用全局實例
const globalForPrisma = globalThis as { prisma?: PrismaClient };

export const db = globalForPrisma.prisma ?? new PrismaClient();

// 在非生產環境中復用同一個 PrismaClient 實例
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}