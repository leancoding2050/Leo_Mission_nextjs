import { z } from "zod"; 
import { Create_Apply_Task_Schema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Apply } from "@prisma/client";


export type InputType = z.infer<typeof Create_Apply_Task_Schema>;
export type ReturnType = ActionState<InputType , Apply>