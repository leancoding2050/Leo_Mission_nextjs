// @/actions/Create-Apply-Task/schema.ts
import { z } from "zod";

export const Create_Apply_Task_Schema = z.object({
  task_id: z.string().min(1, "任務 ID 為必填"),
  user_id: z.string().min(1, "用戶 ID 為必填"),
  apply_type: z.enum(["JOB", "TASK"], { message: "申請類型必須為 JOB 或 TASK" }),
  apply_title: z.string().min(1, "申請標題為必填"),
  apply_contect: z.string().min(1, "申請內容為必填"),
  apply_task_code: z.string().min(1, "任務編號為必填"),
  applicant_name: z.string().min(1, "申請人姓名為必填"),
  apply_question: z.number().optional(), // 可選，允許 undefined
  apply_total_job_in_task: z.number().optional(), // 可選，允許 undefined
  apply_Task_of_job: z.array(z.object({
    id: z.string(),
    code: z.string(),
  })).optional(), // 可選，允許空陣列
});