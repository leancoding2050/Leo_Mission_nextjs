// "use client";

// import { Create_Apply_Task_Schema } from "@/actions/Create-Apply-Task/schema";
// import { Button } from "@/components/ui/button";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useParams } from "next/navigation";
// import { startTransition, useEffect, useState, useTransition } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Create_Task_Apply_Action } from "@/actions/Create-Apply-Task";
// import Link from "next/link";

// interface TaskDetail {
//     id: string;
//     task_title: string;
//     task_contect: string;
//     task_code: string;
//     task_public: boolean;
//     task_subject: string;
//     task_area: string;
//     School_name: string;
//     showprice: boolean;
//     task_price: number;
//     task_type: string;
//     job: Job[];
// }

// interface Job {
//     id: string;
//     job_code: string;
//     job_place: string;
//     job_time: string;
//     job_price: number;
//     job_day: string;
//     task_code: string;
//     job_school_name: string;
//     job_area: string;
// }

// interface UserList {
//     id: string;
//     username: string;
// }

// const TaskLisksById = () => {
//     const param = useParams();
//     const UserId = param?.id as string;
//     const TaskId = param?.taskListsid as string;
//     const [GetTaskdetailbyId, setGetTaskdetailbyId] = useState<TaskDetail[]>([]);
//     const [GetUserListsById, setGetUserListsById] = useState<UserList[]>([]);
//     const [isPending, startTransition] = useTransition();
//     const [applyTaskOfJob, setApplyTaskOfJob] = useState<{ id: string; code: string }[]>([]);



//     useEffect(() => {
//         const fetchData = async () => {
//             const [taskRes, userRes] = await Promise.all([
//                 fetch(`/api/Task_Lists_by_ID/${TaskId}`),
//                 fetch(`/api/User_Lists_by_ID/${UserId}`)
//             ]);

//             if (!taskRes.ok || !userRes.ok) {
//                 throw new Error("斷線!");
//             }

//             const [taskData, userData] = await Promise.all([taskRes.json(), userRes.json()]);
//             setGetTaskdetailbyId(taskData);
//             setGetUserListsById(userData);
//         };

//         fetchData();
//     }, [TaskId, UserId]);

//     const apply_task_create_form = useForm<z.infer<typeof Create_Apply_Task_Schema>>({
//         resolver: zodResolver(Create_Apply_Task_Schema),
//         defaultValues: {
//             task_id: TaskId || "",
//             user_id: UserId || "",
//             apply_title: "",
//             apply_contect: "",
//             applicant_name: "",
//             apply_Task_of_job: [],
//             apply_task_code: "",
//             apply_type:"TASK",
//             apply_question:0,
//             apply_total_job_in_task:0,
//         },
//     });

//     useEffect(() => {
//         if (TaskId && UserId) {
//             apply_task_create_form.reset({
//                 task_id: TaskId,
//                 user_id: UserId,
//                 apply_title: "",
//                 apply_contect: "",
//                 applicant_name: "",
//                 apply_Task_of_job: [],
//                 apply_task_code: "",
//                 apply_type:"TASK",
//                 apply_question:0,
//                 apply_total_job_in_task:0
//             });
//         }
//     }, [TaskId, UserId, apply_task_create_form]);

  

//     useEffect(() => {
//         if (GetTaskdetailbyId.length > 0) {
//             const task = GetTaskdetailbyId[0];
//             apply_task_create_form.setValue("apply_task_code", task.task_code || "");
//             apply_task_create_form.setValue("apply_title", task.task_title || "");
//             apply_task_create_form.setValue("apply_contect", task.task_contect || "");
//         }
//     }, [GetTaskdetailbyId, apply_task_create_form]);

//     useEffect(() => {
//         if (GetUserListsById.length > 0) {
//             apply_task_create_form.setValue("applicant_name", GetUserListsById[0]?.username || "");
//         }
//     }, [GetUserListsById, apply_task_create_form]);

//     const Add_Job = (jobId: string, jobCode: string) => {
//         const updatedJobs = [...applyTaskOfJob, { id: jobId, code: jobCode }];
//         setApplyTaskOfJob(updatedJobs); // 更新狀態
//         const choose = applyTaskOfJob.length + 1;
//         const TaskJobLength = GetTaskdetailbyId[0].job.length;
//         console.log(TaskJobLength )
//         apply_task_create_form.setValue("apply_total_job_in_task", TaskJobLength);
//         apply_task_create_form.setValue("apply_Task_of_job", updatedJobs); // 同步更新表單值
//         apply_task_create_form.setValue("apply_question", choose );
//       };
    
//       const Delete_Job = (jobId: string) => {
//         const updatedJobs = applyTaskOfJob.filter((job) => job.id !== jobId);
//         setApplyTaskOfJob(updatedJobs); // 更新狀態
//         const choose = applyTaskOfJob.length - 1; 
//         const TaskJobLength = GetTaskdetailbyId[0].job.length;
//         console.log(TaskJobLength )
//         apply_task_create_form.setValue("apply_total_job_in_task", TaskJobLength);
//         apply_task_create_form.setValue("apply_Task_of_job", updatedJobs); // 同步更新表單值
//         apply_task_create_form.setValue("apply_question", choose );
//       };

//     const apply_task_create_form_onSubmit = (values: z.infer<typeof Create_Apply_Task_Schema>) => {
//         console.log("-- apply_task_data -- :", values, "-- End --");

//         const transformedValues = {
//             task_id: values.task_id,
//             user_id: values.user_id,
//             apply_title: values.apply_title,
//             apply_contect: values.apply_contect,
//             applicant_name: values.applicant_name,
//             apply_task_code: values.apply_task_code,
//             apply_type: values.apply_type,
//             apply_question:values.apply_question,
//             apply_total_job_in_task: values.apply_total_job_in_task,
//             apply_Task_of_job: values.apply_Task_of_job.map(job => ({
//                 id: job.id,
//                 code: job.code
//             })),
//         };
        
//         startTransition(() => {
//             Create_Task_Apply_Action(transformedValues); // 调用 API 或函数
//         });
//     };

//     return (
//         <>

//         <Link href={`/user/${UserId}/taskLists`}>
//             返回
//         </Link>

//             {GetTaskdetailbyId?.map((d) => {
//                 if (d.task_public === true) {
//                     return (
//                         <div key={d.id}>
//                             <p>TaskTitle: {d.task_title}</p>
//                             <p>Task主題: {d.task_subject}</p>
//                             <p>TaskCode: {d.task_code}</p>
//                             <p>Taskarea: {d.task_area}</p>
//                             <p>SchoolName: {d.School_name}</p>
//                             <p>工作數量: {d.job.length}</p>
//                             {d.showprice && <p>價錢: {d.task_price}</p>}
//                             <div>
//                                 {d.job.map((j) => (
//                                     <div key={j.id}>
//                                         <p>工作編號: {j.job_code}</p>
//                                         <p>工作地方: {j.job_place}</p>
//                                         <p>工作時間: {j.job_time}</p>
//                                       { j.showprice && <p>工作價錢: {j.job_price}</p>}
//                                         <p>工作日期: {j.job_day}</p>
//                                         <p>TaskCode: {j.task_code}</p>
//                                         <p>工作學校名: {j.job_school_name}</p>
//                                         <p>工作地區: {j.job_area}</p>
//                                         <Button
//                       onClick={() =>
//                         applyTaskOfJob.some((job) => job.id === j.id)
//                           ? Delete_Job(j.id)
//                           : Add_Job(j.id, j.job_code)
//                       }
//                     >
//                       {applyTaskOfJob.some((job) => job.id === j.id) ? "減掉工作" : "加入工作"}
//                     </Button>
//                                     </div>
//                                 ))}
//                             </div>
//                             <div>
//                             <p>已加入的工作: {applyTaskOfJob.length}/{d.job.length}</p>
    
//                             </div>

//                             <Form {...apply_task_create_form}>
//                                 <form onSubmit={apply_task_create_form.handleSubmit(apply_task_create_form_onSubmit)}>
//                                     <div className="grid grid-cols-2 gap-4">
//                                         <FormField
//                                             control={apply_task_create_form.control}
//                                             name="task_id"
//                                             render={({ field }) => (
//                                                 <FormItem style={{display:"none"}} >
//                                                     <FormLabel>task_id</FormLabel>
//                                                     <FormControl>
//                                                         <Input value={field.value} readOnly disabled={isPending} type="text" />
//                                                     </FormControl>
//                                                 </FormItem>
//                                             )}
//                                         />
//                                         <FormField
//                                             control={apply_task_create_form.control}
//                                             name="user_id"
//                                             render={({ field }) => (
//                                                 <FormItem style={{display:"none"}} >
//                                                     <FormLabel>user_id</FormLabel>
//                                                     <FormControl>
//                                                         <Input value={field.value} readOnly disabled={isPending} type="text" />
//                                                     </FormControl>
//                                                 </FormItem>
//                                             )}
//                                         />
//                                         <FormField
//                                             control={apply_task_create_form.control}
//                                             name="apply_title"
//                                             render={({ field }) => (
//                                                 <FormItem style={{display:"none"}} >
//                                                     <FormLabel>apply_title</FormLabel>
//                                                     <FormControl>
//                                                         <Input value={field.value} readOnly disabled={isPending} type="text" />
//                                                     </FormControl>
//                                                 </FormItem>
//                                             )}
//                                         />
//                                         <FormField
//                                             control={apply_task_create_form.control}
//                                             name="apply_contect"
//                                             render={({ field }) => (
//                                                 <FormItem style={{display:"none"}} >
//                                                     <FormLabel>apply_contect</FormLabel>
//                                                     <FormControl>
//                                                         <Input value={field.value} readOnly disabled={isPending} type="text" />
//                                                     </FormControl>
//                                                 </FormItem>
//                                             )}
//                                         />
//                                         <FormField
//                                             control={apply_task_create_form.control}
//                                             name="applicant_name"
//                                             render={({ field }) => (
//                                                 <FormItem style={{display:"none"}} >
//                                                     <FormLabel>applicant_name</FormLabel>
//                                                     <FormControl>
//                                                         <Input value={field.value} readOnly disabled={isPending} type="text" />
//                                                     </FormControl>
//                                                 </FormItem>
//                                             )}
//                                         />
//                                         <FormField
//                                             control={apply_task_create_form.control}
//                                             name="apply_task_code"
//                                             render={({ field }) => (
//                                                 <FormItem style={{display:"none"}} >
//                                                     <FormLabel>apply_task_code</FormLabel>
//                                                     <FormControl>
//                                                         <Input value={field.value} readOnly disabled={isPending} type="text" />
//                                                     </FormControl>
//                                                 </FormItem>
//                                             )}
//                                         />
//                                     </div>
//                                     <Button type="submit">申請TASK</Button>
//                                 </form>
//                             </Form>
//                         </div>
//                     );
//                 }
//             })}
//         </>
//     );
// };

// export default TaskLisksById;


// "use client";

// import { Create_Apply_Task_Schema } from "@/actions/Create-Apply-Task/schema";
// import { Button } from "@/components/ui/button";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useParams } from "next/navigation";
// import { useEffect, useState, useTransition } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Form, FormControl, FormField, FormItem, FormLabel, 
// //  FormMessage
//  } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Create_Task_Apply_Action } from "@/actions/Create-Apply-Task";
// import Link from "next/link";

// interface Job {
//   id: string;
//   job_code: string;
//   job_place: string;
//   job_time_h: string; // 修正為 job_time_h
//   job_price: number;
//   showprice: boolean; // 添加 showprice
//   job_day: string;
//   task_code: string;
//   job_school_name: string;
//   job_area: string;
// }

// interface TaskDetail {
//   id: string;
//   task_title: string;
//   task_contect: string;
//   task_code: string;
//   task_public: boolean;
//   task_subject: string;
//   task_area: string;
//   School_name: string[];
//   showprice: boolean;
//   task_price: number;
//   task_type: string;
//   job: Job[];
// }

// interface UserList {
//   id: string;
//   username: string;
// }

// const TaskLisksById = () => {
//   const param = useParams();
//   const UserId = param?.id as string;
//   const TaskId = param?.taskListsid as string;

//   const [GetTaskdetailbyId, setGetTaskdetailbyId] = useState<TaskDetail[]>([]);
//   const [GetUserListsById, setGetUserListsById] = useState<UserList[]>([]);
//   const [isPending, startTransition] = useTransition();
//   const [applyTaskOfJob, setApplyTaskOfJob] = useState<{ id: string; code: string }[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const [taskRes, userRes] = await Promise.all([
//           fetch(`/api/Task_Lists_by_ID/${TaskId}`),
//           fetch(`/api/User_Lists_by_ID/${UserId}`),
//         ]);

//         if (!taskRes.ok || !userRes.ok) {
//           throw new Error("無法獲取數據");
//         }

//         const [taskData, userData] = await Promise.all([taskRes.json(), userRes.json()]);
//         setGetTaskdetailbyId(taskData);
//         setGetUserListsById(userData);
//       } catch (error) {
//         setError("無法載入數據");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (TaskId && UserId) {
//       fetchData();
//     }
//   }, [TaskId, UserId]);

//   const apply_task_create_form = useForm<z.infer<typeof Create_Apply_Task_Schema>>({
//     resolver: zodResolver(Create_Apply_Task_Schema),
//     defaultValues: {
//       task_id: TaskId || "",
//       user_id: UserId || "",
//       apply_title: "",
//       apply_contect: "",
//       applicant_name: "",
//       apply_Task_of_job: [],
//       apply_task_code: "",
//       apply_type: "TASK",
//       apply_question: 0,
//       apply_total_job_in_task: 0,
//     },
//   });

//   useEffect(() => {
//     if (TaskId && UserId) {
//       apply_task_create_form.reset({
//         task_id: TaskId,
//         user_id: UserId,
//         apply_title: "",
//         apply_contect: "",
//         applicant_name: "",
//         apply_Task_of_job: [],
//         apply_task_code: "",
//         apply_type: "TASK",
//         apply_question: 0,
//         apply_total_job_in_task: 0,
//       });
//     }
//   }, [TaskId, UserId, apply_task_create_form]);

//   useEffect(() => {
//     if (GetTaskdetailbyId.length > 0) {
//       const task = GetTaskdetailbyId[0];
//       apply_task_create_form.setValue("apply_task_code", task.task_code || "");
//       apply_task_create_form.setValue("apply_title", task.task_title || "");
//       apply_task_create_form.setValue("apply_contect", task.task_contect || "");
//     }
//   }, [GetTaskdetailbyId, apply_task_create_form]);

//   useEffect(() => {
//     if (GetUserListsById.length > 0) {
//       apply_task_create_form.setValue("applicant_name", GetUserListsById[0]?.username || "");
//     }
//   }, [GetUserListsById, apply_task_create_form]);

//   const Add_Job = (jobId: string, jobCode: string) => {
//     const updatedJobs = [...applyTaskOfJob, { id: jobId, code: jobCode }];
//     setApplyTaskOfJob(updatedJobs);
//     const choose = updatedJobs.length; // 使用更新後的長度
//     const TaskJobLength = GetTaskdetailbyId[0]?.job.length || 0;
//     apply_task_create_form.setValue("apply_total_job_in_task", TaskJobLength);
//     apply_task_create_form.setValue("apply_Task_of_job", updatedJobs);
//     apply_task_create_form.setValue("apply_question", choose);
//   };

//   const Delete_Job = (jobId: string) => {
//     const updatedJobs = applyTaskOfJob.filter((job) => job.id !== jobId);
//     setApplyTaskOfJob(updatedJobs);
//     const choose = updatedJobs.length; // 使用更新後的長度
//     const TaskJobLength = GetTaskdetailbyId[0]?.job.length || 0;
//     apply_task_create_form.setValue("apply_total_job_in_task", TaskJobLength);
//     apply_task_create_form.setValue("apply_Task_of_job", updatedJobs);
//     apply_task_create_form.setValue("apply_question", choose);
//   };

//   const apply_task_create_form_onSubmit = (values: z.infer<typeof Create_Apply_Task_Schema>) => {
//     console.log("-- apply_task_data -- :", values, "-- End --");
//     startTransition(() => {
//       Create_Task_Apply_Action(values);
//     });
//   };

//   if (isLoading) {
//     return <div>載入中...</div>;
//   }

//   if (error) {
//     return <div style={{ color: "red" }}>{error}</div>;
//   }

//   if (!TaskId || !UserId) {
//     return <div>無效的 TaskId 或 UserId</div>;
//   }

//   return (
//     <>
//       <Link href={`/user/${UserId}/taskLists`}>返回</Link>

//       {GetTaskdetailbyId?.map((d) => {
//         if (d.task_public === true) {
//           return (
//             <div key={d.id}>
//               <p>TaskTitle: {d.task_title}</p>
//               <p>Task主題: {d.task_subject}</p>
//               <p>TaskCode: {d.task_code}</p>
//               <p>Taskarea: {d.task_area}</p>
//               <p>SchoolName: {d.School_name.join(", ")}</p>
//               <p>工作數量: {d.job.length}</p>
//               {d.showprice && <p>價錢: {d.task_price}</p>}
//               <div>
//                 {d.job.map((j) => (
//                   <div key={j.id}>
//                     <p>工作編號: {j.job_code}</p>
//                     <p>工作地方: {j.job_place}</p>
//                     <p>工作時間: {j.job_time_h}</p>
//                     {j.showprice && <p>工作價錢: {j.job_price}</p>}
//                     <p>工作日期: {j.job_day}</p>
//                     <p>TaskCode: {j.task_code}</p>
//                     <p>工作學校名: {j.job_school_name}</p>
//                     <p>工作地區: {j.job_area}</p>
//                     <Button
//                       onClick={() =>
//                         applyTaskOfJob.some((job) => job.id === j.id)
//                           ? Delete_Job(j.id)
//                           : Add_Job(j.id, j.job_code)
//                       }
//                     >
//                       {applyTaskOfJob.some((job) => job.id === j.id) ? "減掉工作" : "加入工作"}
//                     </Button>
//                   </div>
//                 ))}
//               </div>
//               <div>
//                 <p>已加入的工作: {applyTaskOfJob.length}/{d.job.length}</p>
//               </div>

//               <Form {...apply_task_create_form}>
//                 <form onSubmit={apply_task_create_form.handleSubmit(apply_task_create_form_onSubmit)}>
//                   <div className="grid grid-cols-2 gap-4">
//                     <FormField
//                       control={apply_task_create_form.control}
//                       name="task_id"
//                       render={({ field }) => (
//                         <FormItem style={{ display: "none" }}>
//                           <FormLabel>task_id</FormLabel>
//                           <FormControl>
//                             <Input value={field.value} readOnly disabled={isPending} type="text" />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={apply_task_create_form.control}
//                       name="user_id"
//                       render={({ field }) => (
//                         <FormItem style={{ display: "none" }}>
//                           <FormLabel>user_id</FormLabel>
//                           <FormControl>
//                             <Input value={field.value} readOnly disabled={isPending} type="text" />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={apply_task_create_form.control}
//                       name="apply_title"
//                       render={({ field }) => (
//                         <FormItem style={{ display: "none" }}>
//                           <FormLabel>apply_title</FormLabel>
//                           <FormControl>
//                             <Input value={field.value} readOnly disabled={isPending} type="text" />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={apply_task_create_form.control}
//                       name="apply_contect"
//                       render={({ field }) => (
//                         <FormItem style={{ display: "none" }}>
//                           <FormLabel>apply_contect</FormLabel>
//                           <FormControl>
//                             <Input value={field.value} readOnly disabled={isPending} type="text" />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={apply_task_create_form.control}
//                       name="applicant_name"
//                       render={({ field }) => (
//                         <FormItem style={{ display: "none" }}>
//                           <FormLabel>applicant_name</FormLabel>
//                           <FormControl>
//                             <Input value={field.value} readOnly disabled={isPending} type="text" />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={apply_task_create_form.control}
//                       name="apply_task_code"
//                       render={({ field }) => (
//                         <FormItem style={{ display: "none" }}>
//                           <FormLabel>apply_task_code</FormLabel>
//                           <FormControl>
//                             <Input value={field.value} readOnly disabled={isPending} type="text" />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                   <Button type="submit" disabled={isPending}>
//                     申請TASK
//                   </Button>
//                 </form>
//               </Form>
//             </div>
//           );
//         }
//       })}
//     </>
//   );
// };

// export default TaskLisksById;



// "use client";

// import { Create_Apply_Task_Schema } from "@/actions/Create-Apply-Task/schema";
// import { Button } from "@/components/ui/button";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useParams } from "next/navigation";
// import { useEffect, useState, useTransition } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Create_Task_Apply_Action } from "@/actions/Create-Apply-Task";
// import Link from "next/link";

// interface Job {
//   id: string;
//   job_code: string;
//   job_place: string;
//   job_time_h: string;
//   job_price: number;
//   showprice: boolean;
//   job_day: string;
//   task_code: string;
//   job_school_name: string;
//   job_area: string;
// }

// interface TaskDetail {
//   id: string;
//   task_title: string;
//   task_contect: string;
//   task_code: string;
//   task_public: boolean;
//   task_subject: string;
//   task_area: string;
//   School_name: string[];
//   showprice: boolean;
//   task_price: number;
//   task_type: string;
//   job: Job[];
// }

// interface UserList {
//   id: string;
//   username: string;
// }

// const TaskLisksById = () => {
//   const param = useParams();
//   const UserId = param?.id as string;
//   const TaskId = param?.taskListsid as string;

//   const [GetTaskdetailbyId, setGetTaskdetailbyId] = useState<TaskDetail[]>([]);
//   const [GetUserListsById, setGetUserListsById] = useState<UserList[]>([]);
//   const [isPending, startTransition] = useTransition();
//   const [applyTaskOfJob, setApplyTaskOfJob] = useState<{ id: string; code: string }[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       try {
//         const [taskRes, userRes] = await Promise.all([
//           fetch(`/api/Task_Lists_by_ID/${TaskId}`),
//           fetch(`/api/User_Lists_by_ID/${UserId}`),
//         ]);

//         if (!taskRes.ok || !userRes.ok) {
//           throw new Error("無法獲取數據");
//         }

//         const [taskData, userData] = await Promise.all([taskRes.json(), userRes.json()]);
//         setGetTaskdetailbyId(taskData);
//         setGetUserListsById(userData);
//       } catch (_error) { // 將 error 改為 _error
//         setError("無法載入數據");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (TaskId && UserId) {
//       fetchData();
//     }
//   }, [TaskId, UserId]);

//   const apply_task_create_form = useForm<z.infer<typeof Create_Apply_Task_Schema>>({
//     resolver: zodResolver(Create_Apply_Task_Schema),
//     defaultValues: {
//       task_id: TaskId || "",
//       user_id: UserId || "",
//       apply_title: "",
//       apply_contect: "",
//       applicant_name: "",
//       apply_Task_of_job: [],
//       apply_task_code: "",
//       apply_type: "TASK",
//       apply_question: 0,
//       apply_total_job_in_task: 0,
//     },
//   });

//   useEffect(() => {
//     if (TaskId && UserId) {
//       apply_task_create_form.reset({
//         task_id: TaskId,
//         user_id: UserId,
//         apply_title: "",
//         apply_contect: "",
//         applicant_name: "",
//         apply_Task_of_job: [],
//         apply_task_code: "",
//         apply_type: "TASK",
//         apply_question: 0,
//         apply_total_job_in_task: 0,
//       });
//     }
//   }, [TaskId, UserId, apply_task_create_form]);

//   useEffect(() => {
//     if (GetTaskdetailbyId.length > 0) {
//       const task = GetTaskdetailbyId[0];
//       apply_task_create_form.setValue("apply_task_code", task.task_code || "");
//       apply_task_create_form.setValue("apply_title", task.task_title || "");
//       apply_task_create_form.setValue("apply_contect", task.task_contect || "");
//     }
//   }, [GetTaskdetailbyId, apply_task_create_form]);

//   useEffect(() => {
//     if (GetUserListsById.length > 0) {
//       apply_task_create_form.setValue("applicant_name", GetUserListsById[0]?.username || "");
//     }
//   }, [GetUserListsById, apply_task_create_form]);

//   const Add_Job = (jobId: string, jobCode: string) => {
//     const updatedJobs = [...applyTaskOfJob, { id: jobId, code: jobCode }];
//     setApplyTaskOfJob(updatedJobs);
//     const choose = updatedJobs.length;
//     const TaskJobLength = GetTaskdetailbyId[0]?.job.length || 0;
//     apply_task_create_form.setValue("apply_total_job_in_task", TaskJobLength);
//     apply_task_create_form.setValue("apply_Task_of_job", updatedJobs);
//     apply_task_create_form.setValue("apply_question", choose);
//   };

//   const Delete_Job = (jobId: string) => {
//     const updatedJobs = applyTaskOfJob.filter((job) => job.id !== jobId);
//     setApplyTaskOfJob(updatedJobs);
//     const choose = updatedJobs.length;
//     const TaskJobLength = GetTaskdetailbyId[0]?.job.length || 0;
//     apply_task_create_form.setValue("apply_total_job_in_task", TaskJobLength);
//     apply_task_create_form.setValue("apply_Task_of_job", updatedJobs);
//     apply_task_create_form.setValue("apply_question", choose);
//   };

//   const apply_task_create_form_onSubmit = (values: z.infer<typeof Create_Apply_Task_Schema>) => {
//     console.log("-- apply_task_data -- :", values, "-- End --");
//     startTransition(() => {
//       Create_Task_Apply_Action(values);
//     });
//   };

//   if (isLoading) {
//     return <div>載入中...</div>;
//   }

//   if (error) {
//     return <div style={{ color: "red" }}>{error}</div>;
//   }

//   if (!TaskId || !UserId) {
//     return <div>無效的 TaskId 或 UserId</div>;
//   }

//   return (
//     <>
//       <Link href={`/user/${UserId}/taskLists`}>返回</Link>

//       {GetTaskdetailbyId?.map((d) => {
//         if (d.task_public === true) {
//           return (
//             <div key={d.id}>
//               <p>TaskTitle: {d.task_title}</p>
//               <p>Task主題: {d.task_subject}</p>
//               <p>TaskCode: {d.task_code}</p>
//               <p>Taskarea: {d.task_area}</p>
//               <p>SchoolName: {d.School_name.join(", ")}</p>
//               <p>工作數量: {d.job.length}</p>
//               {d.showprice && <p>價錢: {d.task_price}</p>}
//               <div>
//                 {d.job.map((j) => (
//                   <div key={j.id}>
//                     <p>工作編號: {j.job_code}</p>
//                     <p>工作地方: {j.job_place}</p>
//                     <p>工作時間: {j.job_time_h}</p>
//                     {j.showprice && <p>工作價錢: {j.job_price}</p>}
//                     <p>工作日期: {j.job_day}</p>
//                     <p>TaskCode: {j.task_code}</p>
//                     <p>工作學校名: {j.job_school_name}</p>
//                     <p>工作地區: {j.job_area}</p>
//                     <Button
//                       onClick={() =>
//                         applyTaskOfJob.some((job) => job.id === j.id)
//                           ? Delete_Job(j.id)
//                           : Add_Job(j.id, j.job_code)
//                       }
//                     >
//                       {applyTaskOfJob.some((job) => job.id === j.id) ? "減掉工作" : "加入工作"}
//                     </Button>
//                   </div>
//                 ))}
//               </div>
//               <div>
//                 <p>已加入的工作: {applyTaskOfJob.length}/{d.job.length}</p>
//               </div>

//               <Form {...apply_task_create_form}>
//                 <form onSubmit={apply_task_create_form.handleSubmit(apply_task_create_form_onSubmit)}>
//                   <div className="grid grid-cols-2 gap-4">
//                     <FormField
//                       control={apply_task_create_form.control}
//                       name="task_id"
//                       render={({ field }) => (
//                         <FormItem style={{ display: "none" }}>
//                           <FormLabel>task_id</FormLabel>
//                           <FormControl>
//                             <Input value={field.value} readOnly disabled={isPending} type="text" />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={apply_task_create_form.control}
//                       name="user_id"
//                       render={({ field }) => (
//                         <FormItem style={{ display: "none" }}>
//                           <FormLabel>user_id</FormLabel>
//                           <FormControl>
//                             <Input value={field.value} readOnly disabled={isPending} type="text" />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={apply_task_create_form.control}
//                       name="apply_title"
//                       render={({ field }) => (
//                         <FormItem style={{ display: "none" }}>
//                           <FormLabel>apply_title</FormLabel>
//                           <FormControl>
//                             <Input value={field.value} readOnly disabled={isPending} type="text" />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={apply_task_create_form.control}
//                       name="apply_contect"
//                       render={({ field }) => (
//                         <FormItem style={{ display: "none" }}>
//                           <FormLabel>apply_contect</FormLabel>
//                           <FormControl>
//                             <Input value={field.value} readOnly disabled={isPending} type="text" />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={apply_task_create_form.control}
//                       name="applicant_name"
//                       render={({ field }) => (
//                         <FormItem style={{ display: "none" }}>
//                           <FormLabel>applicant_name</FormLabel>
//                           <FormControl>
//                             <Input value={field.value} readOnly disabled={isPending} type="text" />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                     <FormField
//                       control={apply_task_create_form.control}
//                       name="apply_task_code"
//                       render={({ field }) => (
//                         <FormItem style={{ display: "none" }}>
//                           <FormLabel>apply_task_code</FormLabel>
//                           <FormControl>
//                             <Input value={field.value} readOnly disabled={isPending} type="text" />
//                           </FormControl>
//                         </FormItem>
//                       )}
//                     />
//                   </div>
//                   <Button type="submit" disabled={isPending}>
//                     申請TASK
//                   </Button>
//                 </form>
//               </Form>
//             </div>
//           );
//         }
//       })}
//     </>
//   );
// };

// export default TaskLisksById;


"use client";

import { Create_Apply_Task_Schema } from "@/actions/Create-Apply-Task/schema";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Create_Task_Apply_Action } from "@/actions/Create-Apply-Task";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface Job {
  id: string;
  job_code: string;
  job_place: string;
  job_time_h: string;
  job_price: number;
  showprice: boolean;
  job_day: string;
  task_code: string;
  job_school_name: string;
  job_area: string;
}

interface TaskDetail {
  id: string;
  task_title: string;
  task_contect: string;
  task_code: string;
  task_public: boolean;
  task_subject: string;
  task_area: string;
  School_name: string[];
  showprice: boolean;
  task_price: number;
  task_type: string;
  job: Job[];
}

interface UserList {
  id: string;
  username: string;
}

const TaskLisksById = () => {
  const param = useParams();
  const UserId = param?.id as string;
  const TaskId = param?.taskListsid as string;

  const [GetTaskdetailbyId, setGetTaskdetailbyId] = useState<TaskDetail | null>(null);
  const [GetUserListsById, setGetUserListsById] = useState<UserList | null>(null);
  const [isPending, startTransition] = useTransition();
  const [applyTaskOfJob, setApplyTaskOfJob] = useState<{ id: string; code: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [taskRes, userRes] = await Promise.all([
          fetch(`/api/Task_Lists_by_ID/${TaskId}`),
          fetch(`/api/User_Lists_by_ID/${UserId}`),
        ]);

        if (!taskRes.ok) {
          throw new Error("無法獲取任務數據");
        }
        if (!userRes.ok) {
          throw new Error("無法獲取用戶數據");
        }

        const [taskData, userData] = await Promise.all([taskRes.json(), userRes.json()]);
        setGetTaskdetailbyId(taskData as TaskDetail);
        setGetUserListsById(userData as UserList);
      } catch {
        setError("無法載入數據");
      } finally {
        setIsLoading(false);
      }
    };

    if (TaskId && UserId) {
      fetchData();
    }
  }, [TaskId, UserId]);

  const apply_task_create_form = useForm<z.infer<typeof Create_Apply_Task_Schema>>({
    resolver: zodResolver(Create_Apply_Task_Schema),
    defaultValues: {
      task_id: TaskId || "",
      user_id: UserId || "",
      apply_title: "",
      apply_contect: "",
      applicant_name: "",
      apply_Task_of_job: [],
      apply_task_code: "",
      apply_type: "TASK",
      apply_question: 0,
      apply_total_job_in_task: 0,
    },
  });

  useEffect(() => {
    if (TaskId && UserId && GetTaskdetailbyId && GetUserListsById) {
      apply_task_create_form.reset({
        task_id: TaskId,
        user_id: UserId,
        apply_title: GetTaskdetailbyId.task_title || "",
        apply_contect: GetTaskdetailbyId.task_contect || "",
        applicant_name: GetUserListsById.username || "",
        apply_Task_of_job: [],
        apply_task_code: GetTaskdetailbyId.task_code || "",
        apply_type: "TASK",
        apply_question: 0,
        apply_total_job_in_task: GetTaskdetailbyId.job?.length || 0,
      });
    }
  }, [TaskId, UserId, GetTaskdetailbyId, GetUserListsById, apply_task_create_form]);

  const Add_Job = (jobId: string, jobCode: string) => {
    const updatedJobs = [...applyTaskOfJob, { id: jobId, code: jobCode }];
    setApplyTaskOfJob(updatedJobs);
    const choose = updatedJobs.length;
    const TaskJobLength = GetTaskdetailbyId?.job.length || 0;
    apply_task_create_form.setValue("apply_total_job_in_task", TaskJobLength);
    apply_task_create_form.setValue("apply_Task_of_job", updatedJobs);
    apply_task_create_form.setValue("apply_question", choose);
  };

  const Delete_Job = (jobId: string) => {
    const updatedJobs = applyTaskOfJob.filter((job) => job.id !== jobId);
    setApplyTaskOfJob(updatedJobs);
    const choose = updatedJobs.length;
    const TaskJobLength = GetTaskdetailbyId?.job.length || 0;
    apply_task_create_form.setValue("apply_total_job_in_task", TaskJobLength);
    apply_task_create_form.setValue("apply_Task_of_job", updatedJobs);
    apply_task_create_form.setValue("apply_question", choose);
  };

  const apply_task_create_form_onSubmit = (values: z.infer<typeof Create_Apply_Task_Schema>) => {
    console.log("-- apply_task_data -- :", values, "-- End --");
    startTransition(() => {
      Create_Task_Apply_Action(values);
    });
  };

  if (isLoading) {
    return <div>載入中...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  if (!TaskId || !UserId || !GetTaskdetailbyId || !GetUserListsById) {
    return <div>無效的 TaskId 或 UserId，或未找到數據</div>;
  }

  return (
    <div className="min-h-screen bg-white font-noto-sans-tc z-40 ml-[48px] sm:ml-12 md:ml-16 container mx-auto px-4 sm:px-6 lg:px-8 mt-2.5">
      <div className="mb-4">
        <Link
          href={`/user/${UserId}/taskLists`}
          className="flex items-center text-primary-1 hover:bg-grey-2 px-2 py-1 rounded"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-base mr-2" />
          <span>返回</span>
        </Link>
      </div>

      {GetTaskdetailbyId.task_public === true && (
        <div key={GetTaskdetailbyId.id} className="text-primary-1">
          <h1 className="text-2xl font-bold mb-4">任務詳情</h1>
          <div className="space-y-2">
            <p className="text-lg">
              <span className="font-semibold">任務標題:</span> {GetTaskdetailbyId.task_title}
            </p>
            <p>
              <span className="font-semibold">任務主題:</span> {GetTaskdetailbyId.task_subject}
            </p>
            <p>
              <span className="font-semibold">任務編號:</span> {GetTaskdetailbyId.task_code}
            </p>
            <p>
              <span className="font-semibold">任務地區:</span> {GetTaskdetailbyId.task_area}
            </p>
            <p>
              <span className="font-semibold">學校名稱:</span>{" "}
              {GetTaskdetailbyId.School_name.join(", ")}
            </p>
            <p>
              <span className="font-semibold">工作數量:</span> {GetTaskdetailbyId.job.length}
            </p>
            {GetTaskdetailbyId.showprice && (
              <p>
                <span className="font-semibold">價錢:</span> {GetTaskdetailbyId.task_price}
              </p>
            )}
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">相關工作</h2>
            <div className="space-y-4">
              {GetTaskdetailbyId.job.map((j) => (
                <div
                  key={j.id}
                  className="border border-grey-2 p-4 rounded hover:bg-grey-2"
                >
                  <p>
                    <span className="font-semibold">工作編號:</span> {j.job_code}
                  </p>
                  <p>
                    <span className="font-semibold">工作地方:</span> {j.job_place}
                  </p>
                  <p>
                    <span className="font-semibold">工作時間:</span> {j.job_time_h}
                  </p>
                  {j.showprice && (
                    <p>
                      <span className="font-semibold">工作價錢:</span> {j.job_price}
                    </p>
                  )}
                  <p>
                    <span className="font-semibold">工作日期:</span> {j.job_day}
                  </p>
                  <p>
                    <span className="font-semibold">任務編號:</span> {j.task_code}
                  </p>
                  <p>
                    <span className="font-semibold">工作學校名:</span> {j.job_school_name}
                  </p>
                  <p>
                    <span className="font-semibold">工作地區:</span> {j.job_area}
                  </p>
                  <Button
                    onClick={() =>
                      applyTaskOfJob.some((job) => job.id === j.id)
                        ? Delete_Job(j.id)
                        : Add_Job(j.id, j.job_code)
                    }
                    className="mt-2 bg-primary-1 text-white hover:bg-grey-2 hover:text-primary-1"
                    disabled={isPending}
                  >
                    {applyTaskOfJob.some((job) => job.id === j.id) ? "減掉工作" : "加入工作"}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <p className="text-lg">
              <span className="font-semibold">已加入的工作:</span>{" "}
              {applyTaskOfJob.length}/{GetTaskdetailbyId.job.length}
            </p>
          </div>

          <Form {...apply_task_create_form}>
            <form
              onSubmit={apply_task_create_form.handleSubmit(apply_task_create_form_onSubmit)}
              className="mt-6"
            >
              <div className="grid grid-cols-2 gap-4" style={{ display: "none" }}>
                <FormField
                  control={apply_task_create_form.control}
                  name="task_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>task_id</FormLabel>
                      <FormControl>
                        <Input value={field.value} readOnly disabled={isPending} type="text" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={apply_task_create_form.control}
                  name="user_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>user_id</FormLabel>
                      <FormControl>
                        <Input value={field.value} readOnly disabled={isPending} type="text" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={apply_task_create_form.control}
                  name="apply_title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>apply_title</FormLabel>
                      <FormControl>
                        <Input value={field.value} readOnly disabled={isPending} type="text" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={apply_task_create_form.control}
                  name="apply_contect"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>apply_contect</FormLabel>
                      <FormControl>
                        <Input value={field.value} readOnly disabled={isPending} type="text" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={apply_task_create_form.control}
                  name="applicant_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>applicant_name</FormLabel>
                      <FormControl>
                        <Input value={field.value} readOnly disabled={isPending} type="text" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={apply_task_create_form.control}
                  name="apply_task_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>apply_task_code</FormLabel>
                      <FormControl>
                        <Input value={field.value} readOnly disabled={isPending} type="text" />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-primary-1 text-white hover:bg-grey-2 hover:text-primary-1 mt-4"
              >
                申請任務
              </Button>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
};

export default TaskLisksById;


