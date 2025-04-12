"use server";

import { db } from "@/lib/db";

export async function UpdataConfirmJob(jobId: string) {
    console.log("到了server --UpdataConfirmJob");

    try {
        await db.job.update({
            where:{id:jobId},
            data:{
                is_confirm:true
            }
        })
        console.log("更新成功 -- UpdataConfirmJob");

    } catch (error) {
        console.error("錯誤 : ", error);
        throw error;
    }

}