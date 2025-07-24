import { z } from "zod";

export const Delete_Task_Schema = z.object({
    id:z.string(),
})