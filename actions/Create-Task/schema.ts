import { z } from "zod";

export const Create_Task_Schema = z.object({
    userId: z.string().min(1 , "enter something"),
    task_title: z.string().min(1 , "enter something"),
    task_subject: z.string().min(1 , "enter something"),
    task_contect: z.string().min(1 , "enter something"),
    task_code: z.string().min(1 , "enter something"),
    task_address: z.string().min(1 , "enter something"),
    task_area: z.string().min(1 , "enter something"),
    task_apply: z.boolean(),
    task_price: z.number().min(1 , "enter something"),
    showprice: z.boolean(),
    school_name : z.array(z.string().min(1 , "enter something"),),
    completed: z.boolean(),
    task_public:z.boolean(),
    job: z.array(z.string()).min(1 , "enter something"),
    jobidbyarray: z.array(z.string()).min(1 , "enter something"),
    teacher: z.string()
})