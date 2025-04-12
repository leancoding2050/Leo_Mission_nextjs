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

import { Edit_SalaryRemake_Schema } from "@/actions/Edit-SalaryRemake/schema";
import { Edit_SalaryRemake_Action } from "@/actions/Edit-SalaryRemake";
const Edit_SalaryRemake_Form = () => {

  const param = useParams();
  const username = param.username as string;
  const SalaryJobid = param.id as string;
  const SalaryRemakeid = param.targetid as string;
//   console.log(param)
  const [ isPending , startTransition ] = useTransition();


    const [GetSalaryRemakeData , setGetSalaryRemakeData] = useState<any>([]);
    const [ RemakeValue , setRemakeValue ] = useState("");

    useEffect(() => {
        if(SalaryRemakeid && username){
            const fetchSalaryRemakeData = async (username: string , SalaryRemakeid: string) => {
                const res = await fetch(`/api/Salary_Lists_by_username_salaryremake/${username}/${SalaryRemakeid}`);
                const data = await res.json();
                setGetSalaryRemakeData(data);
            };
            fetchSalaryRemakeData(username , SalaryRemakeid)
        }
    }, [SalaryRemakeid , username]);

    console.log("GetSalaryRemakeData : ",GetSalaryRemakeData)
    useEffect(()=>{
        edit_SalaryRemake_Form.setValue("remake", GetSalaryRemakeData[0]?.remake)
        let remake = GetSalaryRemakeData[0]?.remake ;
        setRemakeValue(remake)


    },[GetSalaryRemakeData])



      const edit_SalaryRemake_Form = useForm<z.infer<typeof Edit_SalaryRemake_Schema>>({
        resolver: zodResolver(Edit_SalaryRemake_Schema),
        defaultValues: {
        targetId:SalaryRemakeid,
          username: username,
          remake: "",
          SalaryRemakeId : SalaryJobid
        }
    })


      const SalaryRemake_edit_form_onSubmit = (values:z.infer<typeof Edit_SalaryRemake_Schema>) => {
        console.log("-- edit_SalaryRemake -- :",values,"-- End --" );
        startTransition(() => {
            Edit_SalaryRemake_Action(values)
        })
    
      }

    return(
        <div>
            Edit_SalaryRemake_Form
            <Form {...edit_SalaryRemake_Form}>
                <form onSubmit={edit_SalaryRemake_Form.handleSubmit(SalaryRemake_edit_form_onSubmit)}>
                <div className="mb-4">
            <FormField
              control={edit_SalaryRemake_Form.control}
              name="remake"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>remake</FormLabel>
                  <FormControl>
                    <Input placeholder={RemakeValue} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
               

            <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
               Edit
              </Button>



                </form>
            </Form>

        </div>
    )
}

export default Edit_SalaryRemake_Form