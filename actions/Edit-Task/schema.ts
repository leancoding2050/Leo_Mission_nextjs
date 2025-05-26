// import { z } from "zod";

// export const Edit_Task_Schema = z.object({
//     userId: z.string().min(1 , "enter something"),
//     targettaskId : z.string(),
//     task_title: z.string().min(1 , "enter something"),
//     task_subject: z.string().min(1 , "enter something"),
//     task_contect: z.string().min(1 , "enter something"),
//     task_code: z.string().min(1 , "enter something"),
//     task_address: z.string().min(1 , "enter something"),
//     task_area: z.string().min(1 , "enter something"),
//     task_apply: z.boolean(),
//     task_price: z.number().min(1 , "enter something"),
//     showprice: z.boolean(),
//     school_name : z.array(z.string().min(1 , "enter something"),),
//     completed: z.boolean(),
//     task_public:z.boolean(),
//     job: z.array(z.string()).min(1 , "enter something"),
//     jobidbyarray: z.array(z.string()),
//     teacher: z.string()
// })
import { z } from "zod";

export const Edit_Task_Schema = z.object({
  userId: z.string().min(1, "請輸入用戶 ID"),
  targettaskId: z.string().min(1, "請輸入目標任務 ID"),
  task_title: z.string().min(1, "請輸入任務標題"),
  task_subject: z.string().min(1, "請輸入任務科目"),
  task_contect: z.string().min(1, "請輸入任務內容"),
  task_code: z.string().min(1, "請輸入任務編號"),
  task_address: z.string().min(1, "請輸入任務地址"),
  task_area: z.string().min(1, "請輸入任務地區"),
  task_apply: z.boolean(),
  task_price: z.number().min(1, "請輸入有效價格"),
  showprice: z.boolean(),
  school_name: z.array(z.string().min(1, "請輸入學校名稱")).min(1, "請選擇至少一個學校"),
  completed: z.boolean(),
  task_public: z.boolean(),
  job: z.array(z.string()).min(1, "請選擇至少一個任務"),
  jobidbyarray: z.array(z.string()),
  teacher: z.string().min(1, "請選擇教師"),
});