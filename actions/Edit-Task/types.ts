import { z } from "zod"; 
import { Edit_Task_Schema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Task } from "@prisma/client";

export type InputType = z.infer<typeof Edit_Task_Schema>;
export type ReturnType = ActionState<InputType , Task>