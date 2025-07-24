import { z } from "zod";

export const Apply_Reject_Task_Schema = z.object({
    taskId: z.string(),
    userId: z.string(),
    task_apply: z.boolean()
})