import { z } from "zod";

export const Apply_Accept_Task_Schema = z.object({
    applyId: z.string(),
    taskId: z.string(),
    userId: z.string(),
    task_apply: z.boolean(),
    applyuserId: z.string(),
    applyusername: z.string(),
})