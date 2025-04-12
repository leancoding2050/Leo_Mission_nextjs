import { z } from "zod";

export const Create_Apply_Schema = z.object({
    job_id: z.string(),
    user_id: z.string(),
    apply_title: z.string(),
    apply_job_code: z.string(),
    apply_contect: z.string(),
    applicant_name: z.string(),
    apply_type: z.string(),
})