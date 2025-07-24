// "use server";

// import { InputType , ReturnType } from "./types"; 
// import { db } from "@/lib/db";
// import { CreateSafeAction } from "@/lib/create-safe-action";
// import { Create_Salary_Schema } from "./schema";
// import { redirect } from "next/navigation"; 

// const handler = async (data: InputType) : Promise<ReturnType> => {

//     let salary_data;

//     const {
//         name ,
//         username ,
//         phone ,
//         salary ,
//         Salary_title,
//         job_day ,
//         start_time ,
//         fin_time ,
//         job_code, 
//         job_school ,
//         job_address ,
//         add,
//         reduce,
//         total,
//     } = data

//     try {
//         const formattedPhone = phone.toString();
//         salary_data = await db.salary.create({
//             data:{
//                 name : name,
//                 username : username,
//                 phone : formattedPhone,
//                 salary : salary,
//                 Salary_title : Salary_title,
//                 job_day : job_day,
//                 start_time : start_time,
//                 fin_time : fin_time,
//                 job_code : job_code,
//                 job_school : job_school,
//                job_address : job_address,
//                add : add,
//                reduce : reduce,
//                total : total,
//             }
//         })
//     } catch (error) {
//         console.log(error)
//     }
//     console.log("-- salary_data -- : ", salary_data ,"-- End --")
//     return redirect(`/LeoSalaryPath`)

// }

// export const CreateSalaryAction = CreateSafeAction(Create_Salary_Schema,handler);

// export const savePreviousDayJobToSalary = async (userId: string) => {
//     try {
//         const previousDay = new Date();
//         previousDay.setDate(previousDay.getDate() - 1);
//         const startOfDay = new Date(previousDay.getFullYear(), previousDay.getMonth(), previousDay.getDate(), 0, 0, 0);
//         const endOfDay = new Date(previousDay.getFullYear(), previousDay.getMonth(), previousDay.getDate(), 23, 59, 59);

//         const jobs = await db.job.findMany({
//             where: {
//                 job_user_id: userId,
//                 job_day: {
//                     gte: startOfDay.toISOString(),
//                     lte: endOfDay.toISOString(),
//                 },
               
//             }, include: {
//                     job_user: true,
//                 },
//         });

//         for (const job of jobs) {
//             await db.salary.create({
//                 data: {
//                     name: job.authorname || "",
//                     username: job.job_user.username,
//                     phone: "", // 假設 phone 沒有在 job 中，需要從其他地方獲取
//                     salary: job.job_price,
//                     Salary_title: job.job_title,
//                     job_day: job.job_day,
//                     start_time: job.job_time_start,
//                     fin_time: job.job_time_end,
//                     job_code: job.job_code,
//                     job_school: job.job_school_name,
//                     job_address: job.job_place,
//                     add: 0,
//                     reduce: 0,
//                     total: job.job_price,
//                     user: {
//                         connect: { id: userId },
//                     },
//                     job: {
//                         connect: { id: job.id },
//                     },
//                 },
//             });
//         }
//     } catch (error) {
//         console.error("Error saving previous day's jobs to salary:", error);
//     }
// };

"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { Create_Salary_Schema } from "./schema";
import { redirect } from "next/navigation";

const handler = async (data: InputType): Promise<ReturnType> => {
    const {
        name,
        username,
        phone,
        salary,
        Salary_title,
        job_day,
        start_time,
        fin_time,
        job_code,
        job_school,
        job_address,
        remake,
        add,
        reduce,
        total,
    } = data;

    let salary_data;

    try {
        // 創建 Salary 記錄
        salary_data = await db.salary.create({
            data: {
                name,
                username,
                phone,
                salary,
                Salary_title,
                job_day,
                start_time,
                fin_time,
                job_code,
                job_school,
                job_address,
                add,
                reduce,
                total,
                // 如果需要連接 User 或 Job，取消以下註釋
                // user: UserId ? { connect: { id: UserId } } : undefined,
                // job: job_id ? { connect: { id: job_id } } : undefined,
                // 如果提供了 remake，創建 SalaryRemake 記錄
                ...(remake && remake.trim() !== ""
                    ? {
                          SalaryRemake: {
                              create: {
                                  remake: remake.trim(),
                              },
                          },
                      }
                    : {}),
            },
        });
    } catch (error) {
        console.error("創建薪資時出錯：", error);
        return { error: "無法創建薪資記錄" };
    }

    console.log("-- salary_data -- : ", salary_data, "-- End --");
    return redirect(`/LeoSalaryPath`);
};

export const CreateSalaryAction = CreateSafeAction(Create_Salary_Schema, handler);

export const savePreviousDayJobToSalary = async (userId: string) => {
    try {
        const previousDay = new Date();
        previousDay.setDate(previousDay.getDate() - 1);
        const startOfDay = new Date(previousDay.getFullYear(), previousDay.getMonth(), previousDay.getDate(), 0, 0, 0);
        const endOfDay = new Date(previousDay.getFullYear(), previousDay.getMonth(), previousDay.getDate(), 23, 59, 59);

        const jobs = await db.job.findMany({
            where: {
                job_user_id: userId,
                job_day: {
                    gte: startOfDay.toISOString(),
                    lte: endOfDay.toISOString(),
                },
            },
            include: {
                job_user: true,
            },
        });

        for (const job of jobs) {
            if (!job.job_user) {
                console.warn(`工作 ${job.id} 沒有關聯用戶，跳過薪資創建。`);
                continue;
            }

            await db.salary.create({
                data: {
                    name: job.authorname || "",
                    username: job.job_user.username,
                    phone: job.job_user.phone || "",
                    salary: job.job_price,
                    Salary_title: job.job_title,
                    job_day: job.job_day,
                    start_time: job.job_time_start,
                    fin_time: job.job_time_end,
                    job_code: job.job_code,
                    job_school: job.job_school_name,
                    job_address: job.job_place,
                    add: 0,
                    reduce: 0,
                    total: job.job_price,
                    user: {
                        connect: { id: userId },
                    },
                    job: {
                        connect: { id: job.id },
                    },
                },
            });
        }
    } catch (error) {
        console.error("儲存前一天工作到薪資時出錯：", error);
    }
};