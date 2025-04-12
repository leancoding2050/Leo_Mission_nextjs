import { z } from "zod";

export const Apply_Reject_Schema = z.object({
    jobId: z.string(),
    userId: z.string(),
    job_apply: z.boolean()
})