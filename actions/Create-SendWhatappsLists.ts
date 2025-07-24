"use server";

import { db } from "@/lib/db";

export async function CreateSendWhatappsLists(jobId: string) {
    console.log("到了server ");

    try {
        const jobs = await db.job.findMany({
            where:{id:jobId},include:{job_user:true}
        })

    for (const job of jobs) {
        const nickname = job.job_user?.nickname || "未知用戶";
        const phone = job.job_user?.phone || " " ;

        await db.sendWhatappsmessage.create({
            data: {
                username: nickname,
                phone: phone,
                date: new Date(),
                isSend: false,
                message: `Hello ${nickname} 👋, 提一提, 聽日${job.job_day}:

${job.job_time_start} - ${job.job_time_end} 在 ${job.job_school_name} 有 ${job.job_title}

- 麻煩提早10-15分鐘左右到達, 謝謝🙏
- 麻煩到達學校後(上堂前), Whatsapp share location 或者 影一影學校外觀/門口/班房Whatsapp畀我, 當打卡🙏

麻煩收到請回覆「ok」`,
                
            }
        })
    }

        
    } catch (error) {
        console.error("儲存 Job 到 SendWhatappsLists 失敗:", error);
        throw error;
    }


}