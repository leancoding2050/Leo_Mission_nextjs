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

import { Admin_Login_Schema } from "@/actions/Login-Admin/schema"; 
import { Admin_login_action } from "@/actions/Login-Admin";

const Admin_Login_Form = () => {
    const [ isPending, startTransition ] = useTransition(); 

    const admin_login_form = useForm<z.infer<typeof Admin_Login_Schema>>({
        resolver: zodResolver(Admin_Login_Schema),
        defaultValues:{
            username: "",
            password : "",
            isstaff: true,
            isadmin: true,
        }
    })

    const admin_login_form_onSubmit = (values:z.infer<typeof Admin_Login_Schema>) => {
        console.log("-- admin_input_data -- :",values,"-- End --" );
        startTransition(() => {
            Admin_login_action(values)
        })
    }
    return(
        <>
        Admin login page
        <Form {...admin_login_form} >
            <form 
                onSubmit={admin_login_form.handleSubmit(admin_login_form_onSubmit)}
                className="space-y-6"
            >
                <div className="space-y-6" >
                    <FormField 
                        control={admin_login_form.control}
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
                        control={admin_login_form.control}
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
export default Admin_Login_Form