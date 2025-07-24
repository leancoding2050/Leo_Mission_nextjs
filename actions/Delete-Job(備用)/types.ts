import { z } from "zod"; 
import { Job } from "@prisma/client";
import { ActionState } from "@/lib/create-safe-action";
import { Delete_Job_Schema } from "./schema";

export type InputType = z.infer<typeof Delete_Job_Schema>;
export type ReturnType = ActionState<InputType , Job>;