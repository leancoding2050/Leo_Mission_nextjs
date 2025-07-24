// "use server";

// import { InputType , ReturnType } from "./types"; 
// import { db } from "@/lib/db";
// import { CreateSafeAction } from "@/lib/create-safe-action";
// import { Edit_Job_schema } from "./schema";
// import { redirect } from "next/navigation"; 

// const handler = async (data: InputType) : Promise<ReturnType> => {
//     const {
//         targetjobId,
//         userId,
//         job_code,
//         job_place,
//         job_time,
//         job_price,
//         job_day,
//         job_subject,
//         job_school_name,
//         job_area,
//         showprice,
//         job_public,
//         teacher,


//     } = data;

//     let job_data;
//     try {
//         job_data = await db.job.update({
//             where:{
//                 id : targetjobId
//             },
//             data:{
//                 job_code : job_code,
//                 job_place : job_place,
//                 job_time : job_time,
//                 job_price : job_price,
//                 job_subject: job_subject,
//                 job_day : job_day,
//                 job_admin_remake_authorname : "",
//                 job_admin_remake_authorid : "",
//                 job_admin_createdAt : new Date().toISOString(),
//                 job_admin_content : "",
//                 job_complete : false,
//                 job_task_code : "",
//                 job_school_name : job_school_name,
//                 job_area : job_area,
//                 job_apply : false,
//                 job_public : job_public,
//                 showprice : showprice,
//                 authorname :null,
//                 teacher: teacher
//             }
//         })
        
//     } catch (error) {
//         console.log(error);
//     }
//     console.log("-- job_Data -- : ",job_data,"-- End --")

//     return redirect(`/user/${userId}/admin/jobLists/`);

// }

// export const Edit_Job_Action = CreateSafeAction(Edit_Job_schema, handler);

"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { Edit_Job_schema } from "./schema";
import { redirect } from "next/navigation";

const handler = async (data: InputType): Promise<ReturnType> => {
  const {
    targetjobId,
    userId,
    job_code,
    job_place,
    job_time,
    job_price,
    job_day,
    job_subject,
    job_school_name,
    job_area,
    showprice,
    job_public,
    teacher,
  } = data;

  try {
    const existingJob = await db.job.findUnique({
      where: { id: targetjobId },
    });

    if (!existingJob) {
      throw new Error("工作不存在");
    }

    // 拆分 job_time 為 job_time_start 和 job_time_end
    const [job_time_start, job_time_end] = job_time ? job_time.split(" - ") : [existingJob.job_time_start, existingJob.job_time_end];

    const updatedData: Partial<InputType & { job_time_start?: string; job_time_end?: string }> = {};

    if (job_code !== existingJob.job_code) updatedData.job_code = job_code;
    if (job_place !== existingJob.job_place) updatedData.job_place = job_place;
    if (job_time_start !== existingJob.job_time_start) updatedData.job_time_start = job_time_start;
    if (job_time_end !== existingJob.job_time_end) updatedData.job_time_end = job_time_end;
    if (job_price !== existingJob.job_price) updatedData.job_price = job_price;
    if (job_day !== existingJob.job_day) updatedData.job_day = job_day;
    if (job_subject !== existingJob.job_subject) updatedData.job_subject = job_subject;
    if (job_school_name !== existingJob.job_school_name) updatedData.job_school_name = job_school_name;
    if (job_area !== existingJob.job_area) updatedData.job_area = job_area;
    if (showprice !== existingJob.showprice) updatedData.showprice = showprice;
    if (job_public !== existingJob.job_public) updatedData.job_public = job_public;
    if (teacher !== existingJob.teacher) updatedData.teacher = teacher;

    let job_data;
    if (Object.keys(updatedData).length > 0) {
      job_data = await db.job.update({
        where: { id: targetjobId },
        data: {
          ...updatedData,
          job_admin_remake_authorname: existingJob.job_admin_remake_authorname,
          job_admin_remake_authorid: existingJob.job_admin_remake_authorid,
          job_admin_createdAt: new Date().toISOString(),
          job_admin_content: existingJob.job_admin_content,
          job_complete: existingJob.job_complete,
          job_task_code: existingJob.job_task_code,
          job_apply: existingJob.job_apply,
          authorname: existingJob.authorname,
        },
      });
    } else {
      job_data = existingJob;
    }

    console.log("-- job_Data -- : ", job_data, "-- End --");
  } catch (error) {
    console.error("更新工作失敗：", error);
    return { error: "更新工作失敗，請稍後再試" };
  }

  return redirect(`/user/${userId}/admin/jobLists/`);
};

export const Edit_Job_Action = CreateSafeAction(Edit_Job_schema, handler);