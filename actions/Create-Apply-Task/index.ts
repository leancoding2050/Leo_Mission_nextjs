// @/actions/Create-Apply-Task/index.ts
"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { Create_Apply_Task_Schema } from "./schema";
import { redirect } from "next/navigation";

const handler = async (data: InputType): Promise<ReturnType> => {
  const {
    task_id,
    user_id,
    apply_title,
    apply_contect,
    apply_task_code,
    applicant_name,
    apply_question,
    apply_type,
    apply_total_job_in_task,
    apply_Task_of_job = [],
  } = data;

  console.log("-- data -- : ", data, "-- End --");

  try {
    // 驗證 task_id 是否存在
    const task = await db.task.findUnique({
      where: { id: task_id },
    });
    if (!task) {
      return { error: "無效的任務 ID" };
    }

    // 驗證 user_id 是否存在
    const user = await db.user.findUnique({
      where: { id: user_id },
    });
    if (!user) {
      return { error: "無效的用戶 ID" };
    }

    // 將 apply_Task_of_job 轉換為字串陣列
    const jobIds = apply_Task_of_job.map((job) => job.id);

    const apply_task_data = await db.apply.create({
      data: {
        apply_title,
        apply_task_code,
        apply_job_code: "",
        apply_type, // 已由 Create_Apply_Task_Schema 保證為 "JOB" | "TASK"
        apply_contect,
        applicant_name,
        apply_job_id: "",
        apply_user_id: user_id,
        apply_task_id: task_id,
        apply_task_job: jobIds,
        apply_code: apply_task_code,
        apply_question: apply_question ?? null, // 轉換 undefined 為 null
        apply_total_job_in_task: apply_total_job_in_task ?? null, // 轉換 undefined 為 null
        apply_status: false,
      },
    });

    console.log("apply_task_data created:", apply_task_data);

    return { data: apply_task_data };
  } catch (error) {
    console.error(error);
    return { error: "Failed to create apply task" };
  }
};

export const Create_Task_Apply_Action = CreateSafeAction(Create_Apply_Task_Schema, handler);