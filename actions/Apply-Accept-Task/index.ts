"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { Apply_Accept_Task_Schema } from "./schema";


const handler = async (data: InputType): Promise<ReturnType> => {
  const { taskId, task_apply, applyId, applyuserId, applyusername } = data;
  console.log("Server Data:", { taskId, task_apply, applyId, applyuserId, applyusername });

  try {
    // 檢查 Task 記錄是否存在
    const taskExists = await db.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (!taskExists) {
      console.log(`Task not found for taskId: ${taskId}`);
      return {
        error: `任務記錄未找到 (taskId: ${taskId})`,
      };
    }

    // 更新 Task
    const task_apply_data = await db.task.update({
      where: {
        id: taskId,
      },
      data: {
        task_apply: task_apply,
        teacher: applyusername,
        user: {
          connect: {
            id: applyuserId,
          },
        },
      },
    });

    // 根據 task_apply 更新 Apply 和其他相關記錄
    if (task_apply === true) {
      await db.apply.update({
        where: {
          id: applyId,
        },
        data: {
          apply_status: true,
        },
      });

      await db.user.update({
        where: {
          id: applyuserId,
        },
        data: {
          task: {
            connect: {
              id: taskId,
            },
          },
        },
      });

      await db.job.updateMany({
        where: {
          job_task_id: taskId,
        },
        data: {
          job_user_id: applyuserId,
          teacher: applyusername,
        },
      });
    } else if (task_apply === false) {
      await db.apply.update({
        where: {
          id: applyId,
        },
        data: {
          apply_status: false, // 明確設置 apply_status 為 false
        },
      });
    }

    console.log("Task updated successfully:", task_apply_data);
    return { data: task_apply_data };
  } catch (error) {
    console.error("更新任務失敗:", error);
    return {
      error: "操作過程中發生意外錯誤，請稍後重試",
    };
  }
};

export const Apply_Accept_Task_Action = CreateSafeAction(Apply_Accept_Task_Schema, handler);