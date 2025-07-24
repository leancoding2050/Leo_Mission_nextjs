// "use server";

// import { InputType , ReturnType } from "./types"; 
// import { db } from "@/lib/db";
// import { CreateSafeAction } from "@/lib/create-safe-action";
// import { Apply_Reject_Schema } from "./schema";
// import { redirect } from "next/navigation"; 

// const handler = async (data: InputType) : Promise<ReturnType> => {

//     const {jobId , userId , job_apply } = data;

//     let job_apply_data;

//     try {
//         job_apply_data = await db.job.update({
//             where: {
//                 id: jobId,
//             },
//             data: {
//                 job_apply: job_apply,
//             },
//         });
        

//     return {data: job_apply_data};  

//     } catch (error) {
//         console.log(error)
//     }
    
// }

// export const Apply_Reject_Action = CreateSafeAction(Apply_Reject_Schema, handler);


"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { Apply_Reject_Schema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { jobId, job_apply } = data;

    try {
        const job_apply_data = await db.job.update({
            where: {
                id: jobId,
            },
            data: {
                job_apply: job_apply,
            },
        });

        console.log("job_apply_data :",job_apply_data);
        return { data: job_apply_data };
    } catch (error) {
        console.error(error);
        return { error: "更新職缺申請狀態時發生錯誤" };
    }
};

export const Apply_Reject_Action = CreateSafeAction(Apply_Reject_Schema, handler);