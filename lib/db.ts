// import { PrismaClient } from "@prisma/client"; 

// declare global {
//     let prisma: PrismaClient | undefined;
// }

// export const db = globalThis.prisma || new PrismaClient()

// if(process.env.NODE_ENV !== "production") globalThis.prisma = db



import { PrismaClient } from "@prisma/client";

// 扩展 globalThis 类型以支持自定义 prisma 属性
declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient | undefined;
    }
  }
}

// 初始化 PrismaClient，优先使用全局实例
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// 在非生产环境中复用同一个 PrismaClient 实例
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}