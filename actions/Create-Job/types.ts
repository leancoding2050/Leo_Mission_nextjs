import { z } from "zod"
import { Create_Job_schema } from "./schema"
import { ActionState } from "@/lib/create-safe-action";
import { Job } from "@prisma/client";


export type InputType = z.infer<typeof Create_Job_schema>;
export type ReturnType = ActionState<InputType , Job>