// @/actions/Create-Apply/index.ts
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import { Create_Apply_Schema } from "./schema";

const prisma = new PrismaClient();

export interface Apply {
  id: string;
  apply_user_id: string;
  apply_code: string;
  apply_title: string;
  apply_contect: string;
  apply_job_code: string;
  apply_job_id: string;
  applicant_name: string;
  apply_type: "JOB" | "TASK";
  apply_status: boolean;
  apply_task_code: string;
  apply_task_id: string;
  apply_task_job?: string[];
  apply_question?: number | null; // 改為 number | null | undefined
  apply_total_job_in_task?: number | null; // 改為 number | null | undefined
  createdAt?: Date;
}

export interface ActionState<TInput> {
  fieldErrors?: {
    [K in keyof TInput]?: string[];
  };
  error?: string | null;
  data?: Apply;
}

export async function Create_Apply_Action(
  values: z.infer<typeof Create_Apply_Schema>
): Promise<ActionState<z.infer<typeof Create_Apply_Schema>>> {
  try {
    // 驗證輸入
    const validated = Create_Apply_Schema.parse(values);

    // 檢查 job_id 是否存在
    const job = await prisma.job.findUnique({
      where: { id: validated.job_id },
    });
    if (!job) {
      return { error: "無效的工作 ID" };
    }

    // 檢查 user_id 是否存在
    const user = await prisma.user.findUnique({
      where: { id: validated.user_id },
    });
    if (!user) {
      return { error: "無效的用戶 ID" };
    }

    // 創建申請
    const apply = await prisma.apply.create({
      data: {
        apply_type: validated.apply_type,
        apply_title: validated.apply_title,
        apply_job_code: validated.apply_job_code,
        apply_contect: validated.apply_contect,
        applicant_name: validated.applicant_name,
        apply_job_id: validated.job_id,
        apply_user_id: validated.user_id,
        apply_code: `APPLY-${Date.now()}`,
        apply_task_code: "",
        apply_task_id: "",
        apply_status: false,
        apply_task_job: [],
        apply_question: null, // 明確設置為 null
        apply_total_job_in_task: null, // 明確設置為 null
      },
    });

    return { data: apply };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { fieldErrors: error.flatten().fieldErrors };
    }
    return { error: "創建申請失敗" };
  }
}

// "use server";

// import { InputType, ReturnType } from "./types";
// import { db } from "@/lib/db";
// import { CreateSafeAction } from "@/lib/create-safe-action";
// import { Create_Apply_Schema } from "./schema";
// import { Apply } from "@prisma/client";

// const handler = async (data: InputType): Promise<ReturnType> => {
//   const { job_id, user_id, apply_title, apply_contect, apply_job_code, applicant_name, apply_type } = data;

//   try {
//     const apply_data = await db.apply.create({
//       data: {
//         apply_job_id: job_id,
//         apply_type: apply_type,
//         apply_code: apply_job_code,
//         apply_title: apply_title,
//         apply_contect: apply_contect,
//         apply_job_code: apply_job_code,
//         applicant_name: applicant_name,
//         apply_task_code: "null",
//         apply_user_id: user_id,
//         apply_status: false,
//         apply_task_id: "null",
//         apply_task_job: [],
//       },
//     });

//     return { data: apply_data };
//   } catch (error) {
//     console.error("創建申請錯誤:", error);
//     return { error: error instanceof Error ? error.message : "內部服務器錯誤" };
//   }
// };

// export const Create_Apply_Action = CreateSafeAction(Create_Apply_Schema, handler);