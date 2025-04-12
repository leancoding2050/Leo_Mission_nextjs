import { z } from "zod"; 
import { Edit_Remake_Schema } from "./schema";
import { ActionState } from "@/lib/create-safe-action";
import { Remake } from "@prisma/client";

export type InputType = z.infer<typeof Edit_Remake_Schema>;
export type ReturnType = ActionState<InputType , Remake>