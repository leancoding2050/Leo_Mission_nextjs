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
        apply_Task_of_job = [], // 使用正确的属性名
    } = data;

    console.log("-- data -- : ", data ,"-- End --")

    let apply_task_data;

    console.log("data : ", data);

    try {
        // 将 apply_Task_of_job 转换为字符串数组，假设使用 id 字段
        const jobIds = apply_Task_of_job.map(job => job.id);

        const apply_task_data = await db.apply.create({
            data: {
                apply_title: data.apply_title,
                apply_task_code: data.apply_task_code,
                apply_job_code: "",
                apply_type:apply_type,
                apply_contect: data.apply_contect,
                applicant_name: data.applicant_name,
                apply_job_id: "",
                apply_user_id: data.user_id,
                apply_task_id: data.task_id,
                apply_task_job: jobIds, // 修改为字符串数组
                apply_code: data.apply_task_code, // 确保有默认值
                apply_question: data.apply_question,
                apply_total_job_in_task: apply_total_job_in_task
            },
        });

        console.log("apply_task_data created:", apply_task_data);

    } catch (error) {
        console.error(error); // 改进错误日志输出
        return { error: "Failed to create apply task" }; // 返回错误信息
    }
        return redirect(`/user/${data.user_id}/applyLists/`)

};

export const Create_Task_Apply_Action = CreateSafeAction(Create_Apply_Task_Schema, handler);