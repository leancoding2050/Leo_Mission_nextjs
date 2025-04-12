import { z } from "zod";

export const Create_Job_schema = z.object({
  userId : z.string(),
  job_code : z.string(),
  job_subject: z.string(),
  job_place: z.string(),
  job_area: z.string(),
  job_school_name: z.string(),
  job_time: z.string(),
  job_price: z.number(),
  job_day: z.string(), 
  showprice: z.boolean(),
  job_public: z.boolean(),
  job_time_start: z.string(),
  job_time_end: z.string(),
  job_time_h:z.number(),
  job_contect: z.string(),
  
})