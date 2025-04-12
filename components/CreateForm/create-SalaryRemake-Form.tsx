"use client";
import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage 
} from "@/components/ui/form";
import { useParams } from "next/navigation";
import { Create_SalaryRemake_Schema } from "@/actions/Create-SalaryRemake/schema";
import { Create_SalaryRemake_Action } from "@/actions/Create-SalaryRemake";
const Create_SalaryRemake_Form = () => {

  const param = useParams();
  const username = param.username as string;
  const SalaryJobid = param.id as string;
  const [ isPending , startTransition ] = useTransition();




      const create_SalaryRemake_Form = useForm<z.infer<typeof Create_SalaryRemake_Schema>>({
        resolver: zodResolver(Create_SalaryRemake_Schema),
        defaultValues: {
          username: username,
          remake: "",
          SalaryRemakeId : SalaryJobid
        }
    })

      const SalaryRemake_create_form_onSubmit = (values:z.infer<typeof Create_SalaryRemake_Schema>) => {
        console.log("-- create_SalaryRemake -- :",values,"-- End --" );
        startTransition(() => {
          Create_SalaryRemake_Action(values)
        })
    
      }

    return(
        <div>
            createSalaryRemakeForm
            <Form {...create_SalaryRemake_Form}>
                <form onSubmit={create_SalaryRemake_Form.handleSubmit(SalaryRemake_create_form_onSubmit)}>
                <div className="mb-4">
            <FormField
              control={create_SalaryRemake_Form.control}
              name="remake"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>remake</FormLabel>
                  <FormControl>
                    <Input placeholder="remake" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
               

            <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Submit
              </Button>



                </form>
            </Form>

        </div>
    )
}

export default Create_SalaryRemake_Form