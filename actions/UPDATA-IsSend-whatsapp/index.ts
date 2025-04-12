"use server"

import { db } from "@/lib/db";

export async function UpdataIsSendWhatapps(whpId: string) {
    console.log("到了server --UpdataIsSendWhatapps");

    try {
        await db.sendWhatappsmessage.update({
            where:{id:whpId},
            data:{
                isSend:true
            }
        })
        console.log("更新成功 -- UpdataIsSendWhatapps");

    } catch (error) {
        console.error("錯誤 : ",error);
    }
}