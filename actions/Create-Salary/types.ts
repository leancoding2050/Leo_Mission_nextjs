import { z } from "zod"
import { Create_Salary_Schema } from "./schema"
import { ActionState } from "@/lib/create-safe-action";
import { Salary} from "@prisma/client";


export type InputType = z.infer<typeof Create_Salary_Schema>;
export type ReturnType = ActionState<InputType , Salary>