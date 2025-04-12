import { z } from "zod"
import { Create_SalaryRemake_Schema } from "./schema"
import { ActionState } from "@/lib/create-safe-action";
import { SalaryRemake } from "@prisma/client";


export type InputType = z.infer<typeof Create_SalaryRemake_Schema>;
export type ReturnType = ActionState<InputType , SalaryRemake>