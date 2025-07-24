import { z } from "zod"
import { Create_Remake_Schema } from "./schema"
import { ActionState } from "@/lib/create-safe-action";
import { Remake} from "@prisma/client";


export type InputType = z.infer<typeof Create_Remake_Schema>;
export type ReturnType = ActionState<InputType , Remake>