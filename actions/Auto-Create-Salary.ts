// "use server";

// import { db } from "@/lib/db";

// export async function savePreviousDayJobToSalary(userId: string) {

//     console.log("到了server ");
//     try {
//         // 計算前一天的日期
//     const now = new Date();
//     const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
//     const startOfYesterday = new Date(yesterday.setHours(0, 0, 0, 0));
//     const endOfYesterday = new Date(yesterday.setHours(23, 59, 59, 999));

//      // 查詢前一天的 Job 資料
//     const jobs = await db.job.findMany({
//         where: {
//           job_user_id: userId,
//         //   job_day: {
//         //     gte: startOfYesterday.toISOString(),
//         //     lte: endOfYesterday.toISOString(),
//         //   },
//         },
//         include: {
//           job_user: true,
//         },
//       });   

//     for(const job of jobs) {
//         const nickname = job.job_user?.nickname || "未知用戶";
//         const phone = job.job_user?.phone || 0;

//          await db.salary.create({
//             data: {
//                 name: "自動生成薪資",
//                 username: nickname,
//                 salary: job.job_price,
//                 phone: phone,
//                 Salary_title: job.job_title,
//                 job_day: job.job_day,
//                 start_time: job.job_time_start,
//                 fin_time: job.job_time_end,
//                 job_code: job.job_code,
//                 job_school: job.job_school_name,
//                 job_address: job.job_area,
//                 add: 0,     // 添加默认值
//                 reduce: 0,  // 添加默认值
//                 total: job.job_price, // 假设总金额等于job_price
//             },
//         });
        
//     }
        
//     } catch (error) {
//         console.error("儲存 Job 到 Salary 失敗:", error);
//         throw error;
//     }


// }


"use server";

import { db } from "@/lib/db";

export async function savePreviousDayJobToSalary(userId: string) {
  console.log("到了 server");

  try {
    // 計算前一天的日期
    const now = new Date();
    const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
    const startOfYesterday = new Date(yesterday.setHours(0, 0, 0, 0));
    const endOfYesterday = new Date(yesterday.setHours(23, 59, 59, 999));

    // 查詢前一天的 Job 資料
    const jobs = await db.job.findMany({
      where: {
        job_user_id: userId,
        job_day: {
          gte: startOfYesterday.toISOString(),
          lte: endOfYesterday.toISOString(),
        },
      },
      include: {
        job_user: true,
      },
    });

    if (jobs.length === 0) {
      console.log(`未找到用戶 ${userId} 前一天的 Job 記錄`);
      return { message: `未找到用戶 ${userId} 前一天的 Job 記錄` };
    }

    for (const job of jobs) {
      const nickname = job.job_user?.nickname || "未知用戶";
      const phone = job.job_user?.phone || "未提供電話";

      await db.salary.create({
        data: {
          name: "自動生成薪資",
          username: nickname,
          salary: job.job_price,
          phone: phone,
          Salary_title: job.job_title,
          job_day: job.job_day,
          start_time: job.job_time_start,
          fin_time: job.job_time_end,
          job_code: job.job_code,
          job_school: job.job_school_name,
          job_address: job.job_area,
          add: 0,
          reduce: 0,
          total: job.job_price,
        },
      });
    }

    return { message: `成功為用戶 ${userId} 生成 ${jobs.length} 條薪資記錄` };
  } catch (error) {
    console.error("儲存 Job 到 Salary 失敗:", error);

    // 安全地處理 error.message
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`儲存用戶 ${userId} 的薪資記錄失敗: ${errorMessage}`);
  }
}