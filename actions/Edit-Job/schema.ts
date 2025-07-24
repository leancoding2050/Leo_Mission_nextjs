import { z } from "zod";

export const Edit_Job_schema = z.object({
  userId: z.string().min(1, "用戶 ID 不可為空"),
  targetjobId: z.string().min(1, "工作 ID 不可為空"),
  job_code: z.string().min(1, "工作編號不可為空"),
  job_subject: z.string().min(1, "請選擇科目"),
  job_place: z.string().min(1, "請選擇地點"),
  job_area: z.string().min(1, "請選擇地區"),
  job_school_name: z.string().min(1, "請選擇學校"),
  job_time: z.string().min(1, "請輸入工作時間"),
  job_price: z.number().min(0, "價格必須為正數"),
  job_day: z.string().min(1, "請選擇日期"),
  showprice: z.boolean(),
  job_public: z.boolean(),
  teacher: z.string().min(1, "請選擇教師"),
});