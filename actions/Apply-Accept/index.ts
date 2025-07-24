"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { CreateSafeAction } from "@/lib/create-safe-action";
import { Apply_Accept_Schema } from "./schema";

const handler = async (data: InputType): Promise<ReturnType> => {
    const { jobId, job_apply, applyId, applyuserId } = data;

    try {
        // 檢查 Job 記錄是否存在
        const jobExists = await db.job.findUnique({
            where: {
                id: jobId,
            },
        });

        if (!jobExists) {
            console.log("Job record not found");
            return {
                error: "Job record not found.",
            };
        }

        const job_apply_data = await db.job.update({
            where: {
                id: jobId,
            },
            data: {
                job_apply: job_apply,
                job_user_id: applyuserId
            },
        });

        if (job_apply === true) {
            await db.apply.update({
                where: {
                    id: applyId,
                },
                data: {
                    apply_status: true,
                },
            });
        } else if (job_apply === false) {
            await db.apply.update({
                where: {
                    id: applyId,
                },
                data: {} // 可考虑是否需要更新为特定状态（如取消）
            });
        }

        return {
            data: job_apply_data,
        };

    } catch (error) {
        console.error(error);
        return {
            error: "An unexpected error occurred during processing.",
        };
    }
};

export const Apply_Accept_Action = CreateSafeAction(Apply_Accept_Schema, handler);