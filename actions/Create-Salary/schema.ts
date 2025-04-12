import { z } from "zod";

export const Create_Salary_Schema = z.object({
    name : z.string(),
    username: z.string(),
    phone : z.number(),
    salary : z.number(),
    Salary_title: z.string(),
    job_day : z.string(),
    start_time : z.string(),
    fin_time : z.string(),
    job_code : z.string(),
    job_school : z.string(),
    job_address : z.string(),
    add:z.number(),
    reduce:z.number(),
    total:z.number(),
})