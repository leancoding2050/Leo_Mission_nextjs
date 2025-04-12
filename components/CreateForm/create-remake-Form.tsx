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
import { CreateRemakeAction } from "@/actions/Create-Remake";
import { Create_Remake_Schema } from "@/actions/Create-Remake/schema";


const CreateRemakeForm = () => {
    const param = useParams();
    const UserId = param?.id as string;
    const targetuserId = param?.userListsid as string ;
    const [ isPending , startTransition ] = useTransition();
console.log(param)
    const [  GetUserListsById , setGetUserListsById ] = useState<any>([]);


    useEffect(() => {
      const getUserListsDataById = async () => {
          const res = await fetch(`/api/User_Lists_by_ID/${UserId}`);
          if (!res) {
              throw new Error("斷線!");
          }
          const result = await res.json();
          setGetUserListsById(result);
      }
      getUserListsDataById();

  }, [UserId]);

  console.log( "GetUserListsById : ", GetUserListsById);

  const nickname = GetUserListsById[0]?.nickname;



    const remake_create_form = useForm<z.infer<typeof Create_Remake_Schema>>({
        resolver: zodResolver(Create_Remake_Schema),
        defaultValues: {
          targetuserId: targetuserId,
          UserId : UserId,
                content: "",
                authorname : nickname || "",
        }
    })

    useEffect(() => {
       remake_create_form.setValue("authorname" , nickname)
    },[GetUserListsById])
   
    const remake_create_form_onSubmit = (values: z.infer<typeof Create_Remake_Schema>) => {
        console.log("-- remake_input_data -- :",values,"-- End --" );
        startTransition(() => {
            CreateRemakeAction(values)
        })
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
                    <Input placeholder="content" {...field} />
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
                    <Input placeholder={nickname}
                    {...field}
                    disabled={isPending}
                    type="text"
                    />
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


export default CreateRemakeForm