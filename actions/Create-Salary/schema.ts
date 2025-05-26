import { z } from "zod";

export const Create_Salary_Schema = z.object({
    name: z.string().min(1, "名稱不能為空"),
    username: z.string().min(1, "用戶名不能為空"),
    phone: z.string().min(8, "電話號碼無效"),
    salary: z.number().min(0, "薪資不能為負數"),
    Salary_title: z.string().min(1, "薪資標題不能為空"),
    job_day: z.string().min(1, "工作日期不能為空"),
    start_time: z.string().min(1, "開始時間不能為空"),
    fin_time: z.string().min(1, "結束時間不能為空"),
    job_code: z.string().min(1, "工作代碼不能為空"),
    job_school: z.string().min(1, "學校名稱不能為空"),
    job_address: z.string().min(1, "工作地址不能為空"),
    remake: z.string().optional(), // 可選的 remake 欄位
    add: z.number().min(0, "加項不能為負數"),
    reduce: z.number().min(0, "減項不能為負數"),
    total: z.number().min(0, "總額不能為負數"),
});