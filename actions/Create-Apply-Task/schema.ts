import { z } from "zod"; 

export const Create_Apply_Task_Schema = z.object({
    task_id: z.string(),
    user_id: z.string(),
    apply_type: z.string(),
    apply_title: z.string(),
    apply_contect: z.string(),
    apply_task_code: z.string(),
    applicant_name: z.string(),
    apply_question: z.number(),
    apply_total_job_in_task: z.number(),
    apply_Task_of_job: z.array(z.object({
        id: z.string(), // 修改字段名
        code: z.string() // 修改字段名
    })),
})