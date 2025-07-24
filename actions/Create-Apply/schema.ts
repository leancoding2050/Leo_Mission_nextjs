// import { z } from "zod";

// export const Create_Apply_Schema = z.object({
//     job_id: z.string(),
//     user_id: z.string(),
//     apply_title: z.string(),
//     apply_job_code: z.string(),
//     apply_contect: z.string(),
//     applicant_name: z.string(),
//     apply_type: z.string(),
// })


// @/actions/Create-Apply/schema.ts
import { z } from "zod";

export const Create_Apply_Schema = z.object({
  job_id: z.string().min(1, "工作 ID 為必填"),
  user_id: z.string().min(1, "用戶 ID 為必填"),
  apply_title: z.string().min(1, "申請標題為必填"),
  apply_job_code: z.string().min(1, "工作編號為必填"),
  apply_contect: z.string().min(1, "申請內容為必填"),
  applicant_name: z.string().min(1, "申請人姓名為必填"),
  apply_type: z.enum(["JOB", "TASK"], { message: "申請類型必須為 JOB 或 TASK" }),
});