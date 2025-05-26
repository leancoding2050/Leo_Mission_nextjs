// import { z } from "zod";

// export const Create_Job_schema = z.object({
//   userId : z.string(),
//   job_code : z.string(),
//   job_subject: z.string(),
//   job_place: z.string(),
//   job_area: z.string(),
//   job_school_name: z.string(),
//   job_time: z.string(),
//   job_price: z.number(),
//   job_day: z.string(), 
//   showprice: z.boolean(),
//   job_public: z.boolean(),
//   job_time_start: z.string(),
//   job_time_end: z.string(),
//   job_time_h:z.number(),
//   job_contect: z.string(),
  
// })


import { z } from "zod";

export const Create_Job_schema = z.object({
  userId: z.string().min(1, "用戶 ID 不能為空"),
  job_code: z.string().min(1, "工作代碼不能為空"),
  job_subject: z.string().min(1, "科目不能為空"),
  job_place: z.string().min(1, "地點不能為空"),
  job_area: z.string().min(1, "區域不能為空"),
  job_school_name: z.string().min(1, "學校名稱不能為空"),
  job_time: z.string().optional(),
  job_price: z.number().min(0, "價格不能為負數").default(0),
  job_day: z.string().min(1, "工作日期不能為空"),
  showprice: z.boolean().default(false),
  job_public: z.boolean().default(false),
  job_time_start: z.string().regex(/^\d{4}$/, "開始時間必須為 HHMM 格式（例如 0900）"),
  job_time_end: z.string().regex(/^\d{4}$/, "結束時間必須為 HHMM 格式（例如 1700）"),
  job_time_h: z.number().min(0, "工作時數不能為負數").default(0),
  job_contect: z.string().min(1, "工作內容不能為空"),
});