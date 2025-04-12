"use server";

import { InputType , ReturnType } from "./types"; 
import { db } from "@/lib/db";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { Create_Salary_Schema } from "./schema";
import { redirect } from "next/navigation"; 

const handler = async (data: InputType) : Promise<ReturnType> => {

    let salary_data;

    const {
        name ,
        username ,
        phone ,
        salary ,
        Salary_title,
        job_day ,
        start_time ,
        fin_time ,
        job_code, 
        job_school ,
        job_address ,
        add,
        reduce,
        total,
    } = data

    try {
        const formattedPhone = phone.toString();
        salary_data = await db.salary.create({
            data:{
                name : name,
                username : username,
                phone : formattedPhone,
                salary : salary,
                Salary_title : Salary_title,
                job_day : job_day,
                start_time : start_time,
                fin_time : fin_time,
                job_code : job_code,
                job_school : job_school,
               job_address : job_address,
               add : add,
               reduce : reduce,
               total : total,
            }
        })
    } catch (error) {
        console.log(error)
    }
    console.log("-- salary_data -- : ", salary_data ,"-- End --")
    return redirect(`/LeoSalaryPath`)

}

export const CreateSalaryAction = CreateSafeAction(Create_Salary_Schema,handler);

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
        });

        for (const job of jobs) {
            await db.salary.create({
                data: {
                    name: job.authorname || "",
                    phone: 0, // 假設 phone 沒有在 job 中，需要從其他地方獲取
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
        console.error("Error saving previous day's jobs to salary:", error);
    }
};