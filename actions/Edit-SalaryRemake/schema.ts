import { z } from "zod";

export const Edit_SalaryRemake_Schema = z.object({
    targetId:z.string(),
    username:z.string(),
    remake:z.string(),
    SalaryRemakeId:z.string()
})