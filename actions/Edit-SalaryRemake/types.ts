import { z } from "zod"
import { Edit_SalaryRemake_Schema } from "./schema"
import { ActionState } from "@/lib/create-safe-action";
import { SalaryRemake } from "@prisma/client";


export type InputType = z.infer<typeof Edit_SalaryRemake_Schema>;
export type ReturnType = ActionState<InputType , SalaryRemake>