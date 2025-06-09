"use client";

import * as z from "zod";
import {  useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Create_Salary_Schema } from "@/actions/Create-Salary/schema";
import { useParams } from "next/navigation";
import DatePicker from "react-multi-date-picker";
import { CreateSalaryAction } from "@/actions/Create-Salary";

const CreateSalaryForm = () => {
    const param = useParams();
    //const UserId = param?.id as string;
    const [
        //isPending,
         ,startTransition] = useTransition();

    const salary_create_form = useForm<z.infer<typeof Create_Salary_Schema>>({
        resolver: zodResolver(Create_Salary_Schema),
        defaultValues: {
            name: "",
            username: "",
            phone: "",
            salary: 0,
            Salary_title: "",
            job_day: "",
            start_time: "",
            fin_time: "",
            job_code: "",
            job_school: "",
            job_address: "",
            add: 0,
            reduce: 0,
            total: 0,
        },
    });

    const salary_create_form_onSubmit = (values: z.infer<typeof Create_Salary_Schema>) => {
        console.log("-- salary_input_data -- :", values, "-- End --");
        startTransition(() => {
            CreateSalaryAction(values);
        });
    };

    return (
        <div>
            <Form {...salary_create_form}>
                <form onSubmit={salary_create_form.handleSubmit(salary_create_form_onSubmit)}>
                    <div className="mb-4">
                        <FormField
                            control={salary_create_form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mb-4">
                        <FormField
                            control={salary_create_form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mb-4">
                        <FormField
                            control={salary_create_form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>phone</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="phone"
                                            value={field.value}
                                            onChange={(e) => field.onChange(e.target.value)}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mb-4">
                        <FormField
                            control={salary_create_form.control}
                            name="salary"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>salary</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="salary"
                                            value={field.value === 0 ? "" : field.value}
                                            onChange={(e) => {
                                                const value = e.target.valueAsNumber;
                                                field.onChange(isNaN(value) ? 0 : value);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mb-4">
                        <FormField
                            control={salary_create_form.control}
                            name="Salary_title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Salary_title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Salary_title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mb-4">
                        <FormField
                            control={salary_create_form.control}
                            name="job_day"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>job_day</FormLabel>
                                    <FormControl>
                                        <DatePicker
                                            value={field.value ? new Date(field.value) : null}
                                            onChange={(date) => {
                                                const formattedDate = date && !Array.isArray(date) ? date.toDate().toISOString() : "";
                                                field.onChange(formattedDate);
                                            }}
                                            format="YYYY-MM-DD" // ✅ 使用 format 替代 dateFormat
                                            placeholder="job_day"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mb-4">
                        <FormField
                            control={salary_create_form.control}
                            name="start_time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>start_time</FormLabel>
                                    <FormControl>
                                        <Input type="time" placeholder="start_time" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mb-4">
                        <FormField
                            control={salary_create_form.control}
                            name="fin_time"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>fin_time</FormLabel>
                                    <FormControl>
                                        <Input type="time" placeholder="fin_time" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mb-4">
                        <FormField
                            control={salary_create_form.control}
                            name="job_code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>job_code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="job_code" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mb-4">
                        <FormField
                            control={salary_create_form.control}
                            name="job_school"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>job_school</FormLabel>
                                    <FormControl>
                                        <Input placeholder="job_school" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mb-4">
                        <FormField
                            control={salary_create_form.control}
                            name="job_address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>job_address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="job_address" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mb-4">
                        <FormField
                            control={salary_create_form.control}
                            name="add"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>add</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="add"
                                            value={field.value === 0 ? "" : field.value}
                                            onChange={(e) => {
                                                const value = e.target.valueAsNumber;
                                                field.onChange(isNaN(value) ? 0 : value);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mb-4">
                        <FormField
                            control={salary_create_form.control}
                            name="reduce"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>reduce</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="reduce"
                                            value={field.value === 0 ? "" : field.value}
                                            onChange={(e) => {
                                                const value = e.target.valueAsNumber;
                                                field.onChange(isNaN(value) ? 0 : value);
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="mb-4">
                        <FormField
                            control={salary_create_form.control}
                            name="total"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>total</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder="total"
                                            value={field.value === 0 ? "" : field.value}
                                            onChange={(e) => {
                                                const value = e.target.valueAsNumber;
                                                field.onChange(isNaN(value) ? 0 : value);
                                            }}
                                        />
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
    );
};

export default CreateSalaryForm;