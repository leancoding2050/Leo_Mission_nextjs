import { z } from "zod"
import { Apply_Accept_Task_Schema } from "./schema"
import { ActionState } from "@/lib/create-safe-action";
import { Job } from "@prisma/client";


export type InputType = z.infer<typeof Apply_Accept_Task_Schema>;
export type ReturnType = ActionState<InputType , Job>