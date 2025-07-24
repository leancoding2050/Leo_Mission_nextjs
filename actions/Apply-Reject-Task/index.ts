// "use server";

// import { InputType , ReturnType } from "./types"; 
// import { db } from "@/lib/db";
// import { CreateSafeAction } from "@/lib/create-safe-action";
// import { Apply_Reject_Task_Schema } from "./schema";
// import { redirect } from "next/navigation"; 

// const handler = async (data: InputType) : Promise<ReturnType> => {

//     const {taskId , task_apply } = data;

    

//     try {
//        const task_apply_data = await db.task.update({
//             where: {
//                 id: taskId,
//             },
//             data: {
//                 task_apply: task_apply,
//             },
//         });
        

//         return { data: task_apply_data }

//     } catch (error) {
//         console.log(error)
//     }
   
// }

// export const Apply_Reject_Task_Action = CreateSafeAction(Apply_Reject_Task_Schema, handler);

"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { Apply_Reject_Task_Schema } from "./schema";


const handler = async (data: InputType): Promise<ReturnType> => {
  const { taskId, task_apply } = data;

  try {
    const task_apply_data = await db.task.update({
      where: {
        id: taskId,
      },
      data: {
        task_apply: task_apply,
      },
    });

    console.log("task_apply_data", task_apply_data);
    return { data: task_apply_data };
  } catch (error) {
    console.error("更新任務失敗:", error);
    return { error: "無法更新任務，請稍後重試" };
  }
};

export const Apply_Reject_Task_Action = CreateSafeAction(Apply_Reject_Task_Schema, handler);