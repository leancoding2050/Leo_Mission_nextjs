import { z } from "zod"; 
import { Task } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { Delete_Task_Schema } from "./schema";

export type InputType = z.infer<typeof Delete_Task_Schema>;
export type ReturnType = ActionState<InputType , Task>;