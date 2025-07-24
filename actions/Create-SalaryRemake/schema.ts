import { z } from "zod";

export const Create_SalaryRemake_Schema = z.object({
    username:z.string(),
    remake:z.string(),
    SalaryRemakeId:z.string()
})