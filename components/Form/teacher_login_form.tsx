"use client";

import * as z from "zod";
import {  useTransition } from "react";
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


import { Teacher_login_action } from "@/actions/Login-Teacher";
import { Teacher_Login_Schema } from "@/actions/Login-Teacher/schema";

const Teacher_Login_Form = () => {
    const [ isPending, startTransition ] = useTransition(); 

    const teacher_login_form = useForm<z.infer<typeof Teacher_Login_Schema>>({
        resolver: zodResolver(Teacher_Login_Schema),
        defaultValues:{
            username: "",
            password : "",
            isstaff: true,
            isadmin: false,
        }
    })

    const teacher_login_form_onSubmit = (values:z.infer<typeof Teacher_Login_Schema>) => {
        console.log("-- teacher_input_data -- :",values,"-- End --" )
        startTransition(() => {
            Teacher_login_action(values)
        })
    }
    return(
        <>
        Teacher login page
        <Form {...teacher_login_form} >
            <form 
                onSubmit={teacher_login_form.handleSubmit(teacher_login_form_onSubmit)}
                className="space-y-6"
            >
                <div className="space-y-6" >
                    <FormField 
                        control={teacher_login_form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel> UserName </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Enter username"
                                        type="text"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className="space-y-6" >
                    <FormField 
                        control={teacher_login_form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel> Password </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isPending}
                                        placeholder="Enter password"
                                        type="text"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <Button disabled={isPending} type="submit" >
                    login
                </Button>

            </form>
        </Form>
        </>
    )
}
export default Teacher_Login_Form