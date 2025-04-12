import { z } from "zod";

export const Apply_Accept_Schema = z.object({
    applyId: z.string(),
    jobId: z.string(),
    userId: z.string(),
    job_apply: z.boolean(),
    applyuserId: z.string(),
    applyusername: z.string(),
})