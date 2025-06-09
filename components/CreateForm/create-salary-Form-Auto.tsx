// "use client";
// import * as z from "zod";
// import { useEffect, useState, useTransition } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { Input } from "@/components/ui/input";

// import { Button } from "@/components/ui/button";

// import { 
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage 
// } from "@/components/ui/form";
// import { Create_Salary_Schema } from "@/actions/Create-Salary/schema";
// import { useParams } from "next/navigation";
// import DatePicker from "react-multi-date-picker";
// import { CreateSalaryAction } from "@/actions/Create-Salary";

// const CreateSalaryForm = () => {
//     const param = useParams();
//     const UserId = param?.id as string;
//     const [ isPending , startTransition ] = useTransition();

//     const salary_create_form = useForm<z.infer<typeof Create_Salary_Schema>>({
//         resolver: zodResolver(Create_Salary_Schema),
//         defaultValues: {
//             name : "",
//             phone : "",
//             salary : 0,
//             Salary_title: "",
//             job_day : "",
//             start_time : "",
//             fin_time : "",
//             job_code : "",
//             job_school : "",
//             job_address : "",
//             remake: "",
//             add:0,
//             reduce:0,
//             total:0,
//         },
//     });

// const salary_create_form_onSubmit = (values: z.infer<typeof Create_Salary_Schema>) => {
//     console.log("-- salary_input_data -- :",values,"-- End --" );
//     startTransition(() => {
//         CreateSalaryAction(values)
//     })
// };


//   return (
//     <>
//     <div>
//         <Form {...salary_create_form}>
//             <form onSubmit={salary_create_form.handleSubmit(salary_create_form_onSubmit)}>

//             <div className="mb-4">
//             <FormField
//               control={salary_create_form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>name</FormLabel>
//                   <FormControl>
//                     <Input placeholder="name" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={salary_create_form.control}
//               name="phone"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>phone</FormLabel>
//                   <FormControl>
//                     <Input placeholder="phone" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={salary_create_form.control}
//               name="salary"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>salary</FormLabel>
//                   <FormControl>
//                     <Input placeholder="salary" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={salary_create_form.control}
//               name="Salary_title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Salary_title</FormLabel>
//                   <FormControl>
//                     <Input placeholder="Salary_title" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={salary_create_form.control}
//               name="job_day"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>job_day</FormLabel>
//                   <FormControl>
//                         <DatePicker 
//                             placeholder="job_day" 
//                             {...field} 
//                             selected={field.value ? new Date(field.value) : null}
//                             onChange={(date) =>{
//                                 const formattedDate = date instanceof Date ? date.toISOString() : new Date(date).toISOString();
//                                 field.onChange(formattedDate)   
//                             }}
//                             dateFormat="yyyy-MM-dd"
//                           />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={salary_create_form.control}
//               name="start_time"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>start_time</FormLabel>
//                   <FormControl>
//                     <Input placeholder="start_time" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={salary_create_form.control}
//               name="fin_time"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>fin_time</FormLabel>
//                   <FormControl>
//                     <Input placeholder="fin_time" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={salary_create_form.control}
//               name="job_code"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>job_code</FormLabel>
//                   <FormControl>
//                     <Input placeholder="job_code" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={salary_create_form.control}
//               name="job_school"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>job_school</FormLabel>
//                   <FormControl>
//                     <Input placeholder="job_school" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={salary_create_form.control}
//               name="job_address"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>job_address</FormLabel>
//                   <FormControl>
//                     <Input placeholder="job_address" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={salary_create_form.control}
//               name="remake"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>remake</FormLabel>
//                   <FormControl>
//                     <Input placeholder="remake" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={salary_create_form.control}
//               name="add"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>add</FormLabel>
//                   <FormControl>
//                     <Input placeholder="add" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={salary_create_form.control}
//               name="reduce"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>reduce</FormLabel>
//                   <FormControl>
//                     <Input placeholder="reduce" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={salary_create_form.control}
//               name="total"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>total</FormLabel>
//                   <FormControl>
//                     <Input placeholder="total" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                 Submit
//               </Button>


//             </form>
//         </Form>

//     </div>
    
//     </>
//   )
// };

// export default CreateSalaryForm;

"use client";

import * as z from "zod";
import { useTransition } from "react";
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
   // const UserId = param?.id as string;
    const [isPending, startTransition] = useTransition();

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
            remake: "",
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
                <form onSubmit={salary_create_form.handleSubmit(salary_create_form_onSubmit)} className="space-y-4">
                    <FormField
                        control={salary_create_form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>名稱</FormLabel>
                                <FormControl>
                                    <Input placeholder="名稱" {...field} disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={salary_create_form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>用戶名</FormLabel>
                                <FormControl>
                                    <Input placeholder="用戶名" {...field} disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={salary_create_form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>電話</FormLabel>
                                <FormControl>
                                    <Input placeholder="電話" {...field} disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={salary_create_form.control}
                        name="salary"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>薪資</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="薪資"
                                        value={field.value === 0 ? "" : field.value}
                                        onChange={(e) => {
                                            const value = e.target.valueAsNumber;
                                            field.onChange(isNaN(value) ? 0 : value);
                                        }}
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={salary_create_form.control}
                        name="Salary_title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>薪資標題</FormLabel>
                                <FormControl>
                                    <Input placeholder="薪資標題" {...field} disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={salary_create_form.control}
                        name="job_day"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>工作日期</FormLabel>
                                <FormControl>
                                    <DatePicker
                                        value={field.value ? new Date(field.value) : null}
                                        onChange={(date) => {
                                            const formattedDate = date && !Array.isArray(date) ? date.toDate().toISOString() : "";
                                            field.onChange(formattedDate);
                                        }}
                                        format="YYYY-MM-DD" // ✅ 使用 format 替代 dateFormat
                                        placeholder="工作日期"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={salary_create_form.control}
                        name="start_time"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>開始時間</FormLabel>
                                <FormControl>
                                    <Input type="time" placeholder="開始時間" {...field} disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={salary_create_form.control}
                        name="fin_time"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>結束時間</FormLabel>
                                <FormControl>
                                    <Input type="time" placeholder="結束時間" {...field} disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={salary_create_form.control}
                        name="job_code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>工作代碼</FormLabel>
                                <FormControl>
                                    <Input placeholder="工作代碼" {...field} disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={salary_create_form.control}
                        name="job_school"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>學校名稱</FormLabel>
                                <FormControl>
                                    <Input placeholder="學校名稱" {...field} disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={salary_create_form.control}
                        name="job_address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>工作地址</FormLabel>
                                <FormControl>
                                    <Input placeholder="工作地址" {...field} disabled={isPending} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={salary_create_form.control}
                        name="remake"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>備註（可選）</FormLabel>
                                <FormControl>
                                    <textarea
                                        placeholder="備註"
                                        {...field}
                                        className="w-full p-2 border rounded"
                                        rows={4}
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={salary_create_form.control}
                        name="add"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>加項</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="加項"
                                        value={field.value === 0 ? "" : field.value}
                                        onChange={(e) => {
                                            const value = e.target.valueAsNumber;
                                            field.onChange(isNaN(value) ? 0 : value);
                                        }}
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={salary_create_form.control}
                        name="reduce"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>減項</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="減項"
                                        value={field.value === 0 ? "" : field.value}
                                        onChange={(e) => {
                                            const value = e.target.valueAsNumber;
                                            field.onChange(isNaN(value) ? 0 : value);
                                        }}
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={salary_create_form.control}
                        name="total"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>總額</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="總額"
                                        value={field.value === 0 ? "" : field.value}
                                        onChange={(e) => {
                                            const value = e.target.valueAsNumber;
                                            field.onChange(isNaN(value) ? 0 : value);
                                        }}
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        disabled={isPending}
                    >
                        提交
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default CreateSalaryForm;