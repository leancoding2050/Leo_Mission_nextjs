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
import { Edit_Remake_Schema } from "@/actions/Edit-Remake/schema";
import { EditSalaryAction } from "@/actions/Edit-Remake";




const EditRemakeForm = () => {
    const param = useParams();
    const UserId = param?.id as string;
    const targetremakeId = "";
    const [ isPending , startTransition ] = useTransition();
    const [ GetRemakeData , setGetRemakeData ] = useState([]);

    useEffect(() => {
        const fetchRemakeData = async (id: string) => {
            try {
                const response = await fetch(`/api/Remake_by_User/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setGetRemakeData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchRemakeData(targetremakeId)
    }, [targetremakeId])

    const remake_create_form = useForm<z.infer<typeof Edit_Remake_Schema>>({
        resolver: zodResolver(Edit_Remake_Schema),
        defaultValues: {
                content: "",
                authorname : "",
        }
    })

    const remake_create_form_onSubmit = (values: z.infer<typeof Edit_Remake_Schema>) => {
        console.log("-- remake_input_data -- :",values,"-- End --" );
        // startTransition(() => {
        //     CreateRemakeAction(values)
        // })
    };


  return (
    <>
    <div>
        <Form {...remake_create_form}>
            <form onSubmit={remake_create_form.handleSubmit(remake_create_form_onSubmit)}>
                <FormField
                    control={remake_create_form.control}
                    name="content"
                    render={({ field })=> (
                        <FormItem>
                  <FormLabel>content</FormLabel>
                  <FormControl>
                    <Input placeholder="content" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                    )}
                />

<FormField
                    control={remake_create_form.control}
                    name="authorname"
                    render={({ field })=> (
                        <FormItem>
                  <FormLabel>authorname</FormLabel>
                  <FormControl>
                    <Input placeholder="authorname" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                    )}
                />

            <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Submit
              </Button>

            </form>
        </Form>
    </div>
    </>
  )

}


export default EditRemakeForm