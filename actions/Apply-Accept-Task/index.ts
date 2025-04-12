"use server";

import { InputType , ReturnType } from "./types"; 
import { db } from "@/lib/db";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { Apply_Accept_Task_Schema } from "./schema";
import { redirect } from "next/navigation"; 

const handler = async (data: InputType) : Promise<ReturnType> => {

    const {taskId , userId , task_apply , applyId , applyuserId , applyusername} = data;

    let task_apply_data;

    try {

            // 檢查 Task 記錄是否存在
    const taskExists = await db.task.findUnique({
        where: {
          id: taskId,
        },
      });
  
      if (!taskExists) {
        console.log("task record not found");
        return {
          error: "task record not found.",
        };
      }

      task_apply_data = await db.task.update({
            where: {
                id: taskId,
            },
            data: {
                task_apply: task_apply,
                teacher : applyusername,
                user:{
                    connect: {
                        id: applyuserId
                    }
                },

            },
        });
        
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
                            id: taskId
                        }
                    }
                },
            });
            
            await db.job.updateMany({
                where:{
                    job_task_id : taskId,
                },
                data:{
                    job_user_id : applyuserId,
                    teacher: applyusername

                }
            })


        } else if (task_apply === false) {
            await db.apply.update({
                where: {
                    id: applyId,
                },
               data: {}
            })
        }

    } catch (error) {
        console.log(error)
    }
    return redirect(`/user/${userId}/admin/applyLists/`);
}

export const Apply_Accept_Task_Action = CreateSafeAction(Apply_Accept_Task_Schema , handler);