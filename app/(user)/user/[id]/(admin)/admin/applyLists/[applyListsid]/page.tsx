// "use client";

// import { Apply_Accept_Schema } from "@/actions/Apply-Accept/schema";
// import { Apply_Reject_Schema } from "@/actions/Apply-Reject/schema";
// import { Button } from "@/components/ui/button";
// import { useParams } from "next/navigation";
// import { useEffect, useState, useTransition } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { 
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage 
// } from "@/components/ui/form";
// import { Apply_Accept_Action } from "@/actions/Apply-Accept";
// import { Apply_Reject_Action } from "@/actions/Apply-Reject";
// import { Apply_Accept_Task_Schema } from "@/actions/Apply-Accept-Task/schema";
// import { Apply_Reject_Task_Schema } from "@/actions/Apply-Reject-Task/schema";
// import { Apply_Accept_Task_Action } from "@/actions/Apply-Accept-Task";
// import { Apply_Reject_Task_Action } from "@/actions/Apply-Reject-Task";
// import Link from "next/link";

// interface Apply {
//   id: string;
//   apply_user_id: string;
//   apply_code: string;
//   apply_title: string;
//   apply_contect: string;
//   apply_task_code: string | null;
//   apply_job_code: string | null;
//   apply_job_id: string | null;
//   apply_task_id: string | null;
//   applicant_name: string;
//   apply_status: boolean;
//   apply_type: "JOB" | "TASK";
// }

// interface User {
//   id: string;
//   username: string;
// }


// const ApplyListsByIdAdmin = () => {
//     const param = useParams();
    
//     const UserId = param?.id as string;
//     const applyId = param?.applyListsid as string;


//     const [ GetApplyDatabyId , setGetApplyDatabyId ] = useState([]);
//     const [ GetUserDataById , setGetUserDataById ] = useState([]);

//     const [ isPending , startTransition ] =useTransition();

//     useEffect(()=>{
//         const getApplyListsDatabyId = async (id: string) => {
//             const res = await fetch(`/api/Apply_Lists_by_ID/${id}`);
//             if (!res.ok) {
//                 throw new Error("斷線!");
//             }
//             const result = await res.json();
//             setGetApplyDatabyId(result);


//         }
//         getApplyListsDatabyId(applyId)
//     },[applyId])

// console.log(GetApplyDatabyId)



//     const jobId = GetApplyDatabyId[0]?.apply_job_id;
//     const applyuserId = GetApplyDatabyId[0]?.apply_user_id;
//     const applyType = GetApplyDatabyId[0]?.apply_type;

//     const TaskId = GetApplyDatabyId[0]?.apply_task_id;

//         useEffect(() => {
//             const getuserlistsdatabyid = async (id: string) =>{
//                 const res = await fetch(`/api/User_Lists_by_ID/${id}`);
//                 if(!res.ok) {
//                     throw new Error("斷線!");
//                 }
//                 const result = await res.json();
//                 setGetUserDataById(result)
//             }
//             getuserlistsdatabyid(applyuserId)
//         },[applyuserId])

//         console.log("GetUserDataById : ",GetUserDataById)

//     const username = GetUserDataById[0]?.username;


// /* --------------------JOB--------------------------- */

//     const apply_job_status_Accept = useForm<z.infer<typeof Apply_Accept_Schema>>({
//         resolver: zodResolver(Apply_Accept_Schema),
//         defaultValues:{
//          userId: UserId,
//          jobId: jobId,
//          applyuserId: applyuserId,
//          job_apply: true,
//          applyId:applyId,
//          applyusername: username
//         }
//       })

//       const apply_job_status_Reject = useForm<z.infer<typeof Apply_Reject_Schema>>({
//         resolver: zodResolver(Apply_Reject_Schema),
//         defaultValues:{
//          userId: UserId,
//          jobId: jobId,
//          job_apply: false
//         }
//       })

//       if(applyType === "JOB"){
//         apply_job_status_Accept.setValue('jobId',jobId);
//         apply_job_status_Accept.setValue('userId',UserId);
//         apply_job_status_Accept.setValue('applyuserId',applyuserId);
//         apply_job_status_Accept.setValue('applyId',applyId);
//         apply_job_status_Accept.setValue('applyusername' , username);


//         apply_job_status_Reject.setValue('jobId',jobId);
//       }

 

//     const apply_job_status_Accept_onSubmit = (values:z.infer<typeof Apply_Accept_Schema>) => {
//         console.log("-- apply_job_status_Accept_data -- :",values,"-- End --" );
//         startTransition(() => {
//             Apply_Accept_Action(values);
//         })
//     }
//     const apply_job_status_Reject_onSubmit = (values:z.infer<typeof Apply_Reject_Schema>) => {
//         console.log("-- apply_job_status_Reject_data -- :",values,"-- End --" );
//         startTransition(() => {
//             Apply_Reject_Action(values);
//         })
//     }

//     /* --------------------------JOB  END----------------------------------------  */

//     /* -------------------TASK------------------------- */
//     const apply_task_status_Accept = useForm<z.infer<typeof Apply_Accept_Task_Schema>>({
//         resolver: zodResolver(Apply_Accept_Task_Schema),
//         defaultValues:{
//             applyId: applyId,
//             taskId: TaskId,
//             userId: UserId,
//             task_apply: true,
//             applyuserId: applyuserId,
//             applyusername: username
//         }
//     })

//     const apply_task_status_Reject = useForm<z.infer<typeof Apply_Reject_Task_Schema>>({
//         resolver: zodResolver(Apply_Reject_Task_Schema),
//         defaultValues:{
//             taskId: "",
//             userId: "",
//             task_apply: false,
//         }
//     })
//      if(applyType === "TASK"){
//         apply_task_status_Accept.setValue("taskId",TaskId);
//         apply_task_status_Accept.setValue("userId",UserId);
//         apply_task_status_Accept.setValue("applyuserId",applyuserId);
//         apply_task_status_Accept.setValue("applyId",applyId)
//         apply_task_status_Accept.setValue('applyusername' , username);

//         apply_task_status_Reject.setValue("taskId",TaskId);
//       }

//       const apply_task_status_Accept_onSubmit = (values:z.infer<typeof Apply_Accept_Task_Schema>) => {
//         console.log("-- apply_task_status_Accept_data -- :",values,"-- End --" );
//         startTransition(() => {
//             Apply_Accept_Task_Action(values);
//         })
//     }
//     const apply_task_status_Reject_onSubmit = (values:z.infer<typeof Apply_Reject_Task_Schema>) => {
//         console.log("-- apply_task_status_Reject_data -- :",values,"-- End --" );
//         startTransition(() => {
//             Apply_Reject_Task_Action(values);
//         })
//     }




//     /*-----------------------------Task END---------------------------------- */

//     return(
//         <>
//             <Link href={`/user/${UserId}/admin/applyLists/`} >
//             返回
//             </Link>

//             ApplyListsByIdAdmin

//             <div>
//                 {GetApplyDatabyId?.map((d:any)=>{
//                     if(d.apply_type === "JOB"){
//                         return(
//                     <div key={d.id}>
//                         <p>JOB()</p>
//                        申請人 :  {d.applicant_name}
//                        <br />
//                        申請編號： {d.apply_code}
//                        申請工作編號: {d.apply_job_code}
//                        申請標題: {d.apply_title}
//                        申請內容:  {d.apply_contect}
//                         <br />
//                         <Form {...apply_job_status_Accept}>
//                             <form onSubmit={apply_job_status_Accept.handleSubmit(apply_job_status_Accept_onSubmit)}>
//                                 <Button>接受</Button>
//                             </form>
//                         </Form>
//                        <br />
//                        <Form {...apply_job_status_Reject}>
//                             <form onSubmit={apply_job_status_Reject.handleSubmit(apply_job_status_Reject_onSubmit)}>
//                                 <Button>拒絕</Button>
//                             </form>
//                         </Form>
//                     </div>
//                         )
//                     }

//                     if(d.apply_type === "TASK"){
//                         return(
//                             <div key={d.id}>
//                                 <p>TASK()</p>
//                                申請人 :  {d.applicant_name}
//                                <br />
//                                申請編號： {d.apply_code}
//                                申請工作編號: {d.apply_job_code}
//                                申請標題: {d.apply_title}
//                                申請內容:  {d.apply_contect}
//                                 <br />
//                                 <Form {...apply_job_status_Accept}>
//                                     <form onSubmit={apply_task_status_Accept.handleSubmit(apply_task_status_Accept_onSubmit)}>
//                                         <Button>接受</Button>
//                                     </form>
//                                 </Form>
//                                <br />
//                                <Form {...apply_job_status_Reject}>
//                                     <form onSubmit={apply_task_status_Reject.handleSubmit(apply_task_status_Reject_onSubmit)}>
//                                         <Button>拒絕</Button>
//                                     </form>
//                                 </Form>
//                             </div>
//                                 )
                                
//                     }
//                 })}
//             </div>


//         </>
//     )
// }

// export default ApplyListsByIdAdmin


// "use client";

// import { Apply_Accept_Schema } from "@/actions/Apply-Accept/schema";
// import { Apply_Reject_Schema } from "@/actions/Apply-Reject/schema";
// import { Button } from "@/components/ui/button";
// import { useParams } from "next/navigation";
// import { useEffect, useState, useTransition } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import {
//   Form,
//   // FormControl,
//   // FormField,
//   // FormItem,
//   // FormLabel,
//   // FormMessage,
// } from "@/components/ui/form";
// import { Apply_Accept_Action } from "@/actions/Apply-Accept";
// import { Apply_Reject_Action } from "@/actions/Apply-Reject";
// import { Apply_Accept_Task_Schema } from "@/actions/Apply-Accept-Task/schema";
// import { Apply_Reject_Task_Schema } from "@/actions/Apply-Reject-Task/schema";
// import { Apply_Accept_Task_Action } from "@/actions/Apply-Accept-Task";
// import { Apply_Reject_Task_Action } from "@/actions/Apply-Reject-Task";
// import Link from "next/link";

// interface Apply {
//   id: string;
//   apply_user_id: string;
//   apply_code: string;
//   apply_title: string;
//   apply_contect: string;
//   apply_task_code: string | null;
//   apply_job_code: string | null;
//   apply_job_id: string | null;
//   apply_task_id: string | null;
//   applicant_name: string;
//   apply_status: boolean;
//   apply_type: "JOB" | "TASK";
// }

// interface User {
//   id: string;
//   username: string;
// }

// const ApplyListsByIdAdmin = () => {
//   const param = useParams();
//   const UserId = param?.id as string;
//   const applyId = param?.applyListsid as string;

//   const [GetApplyDatabyId, setGetApplyDatabyId] = useState<Apply[]>([]);
//   const [GetUserDataById, setGetUserDataById] = useState<User[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isPending, startTransition] = useTransition();

//   const getApplyListsDatabyId = async (id: string): Promise<Apply[]> => {
//     const res = await fetch(`/api/Apply_Lists_by_ID/${id}`);
//     if (!res.ok) {
//       throw new Error("斷線!");
//     }
//     return res.json();
//   };

//   const getuserlistsdatabyid = async (id: string): Promise<User[]> => {
//     const res = await fetch(`/api/User_Lists_by_ID/${id}`);
//     if (!res.ok) {
//       throw new Error("斷線!");
//     }
//     return res.json();
//   };

//   // useEffect(() => {
//   //   const fetchApplyData = async () => {
//   //     setIsLoading(true);
//   //     try {
//   //       const result = await getApplyListsDatabyId(applyId);
//   //       setGetApplyDatabyId(result);
//   //     } catch (error) {
//   //       setError("Failed to fetch apply data");
//   //     } finally {
//   //       setIsLoading(false);
//   //     }
//   //   };
//   //   fetchApplyData();
//   // }, [applyId]);

//   // useEffect(() => {
//   //   if (GetApplyDatabyId.length > 0) {
//   //     const applyuserId = GetApplyDatabyId[0].apply_user_id;
//   //     const fetchUserData = async () => {
//   //       setIsLoading(true);
//   //       try {
//   //         const result = await getuserlistsdatabyid(applyuserId);
//   //         setGetUserDataById(result);
//   //       } catch (error) {
//   //         setError("Failed to fetch user data");
//   //       } finally {
//   //         setIsLoading(false);
//   //       }
//   //     };
//   //     fetchUserData();
//   //   }
//   // }, [GetApplyDatabyId]);


// useEffect(() => {
//   const fetchApplyData = async () => {
//     setIsLoading(true);
//     try {
//       const result = await getApplyListsDatabyId(applyId);
//       setGetApplyDatabyId(result);
//     } catch (err) {
//       console.error("Error fetching apply data:", err);
//       setError("Failed to fetch apply data");
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   fetchApplyData();
// }, [applyId]);

// useEffect(() => {
//   if (GetApplyDatabyId.length > 0) {
//     const applyuserId = GetApplyDatabyId[0].apply_user_id;
//     const fetchUserData = async () => {
//       setIsLoading(true);
//       try {
//         const result = await getuserlistsdatabyid(applyuserId);
//         setGetUserDataById(result);
//       } catch (err) {
//         console.error("Error fetching user data:", err);
//         setError("Failed to fetch user data");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchUserData();
//   }
// }, [GetApplyDatabyId]);


//   // useEffect(() => {
//   //   if (GetApplyDatabyId.length > 0 && GetUserDataById.length > 0) {
//   //     const jobId = GetApplyDatabyId[0].apply_job_id;
//   //     const applyuserId = GetApplyDatabyId[0].apply_user_id;
//   //     const applyType = GetApplyDatabyId[0].apply_type;
//   //     const taskId = GetApplyDatabyId[0].apply_task_id;
//   //     const username = GetUserDataById[0].username;

//   //     if (applyType === "JOB") {
//   //       apply_job_status_Accept.setValue("jobId", jobId || "");
//   //       apply_job_status_Accept.setValue("userId", UserId);
//   //       apply_job_status_Accept.setValue("applyuserId", applyuserId || "");
//   //       apply_job_status_Accept.setValue("applyId", applyId);
//   //       apply_job_status_Accept.setValue("applyusername", username || "");

//   //       apply_job_status_Reject.setValue("jobId", jobId || "");
//   //       apply_job_status_Reject.setValue("userId", UserId);
//   //     } else if (applyType === "TASK") {
//   //       apply_task_status_Accept.setValue("taskId", taskId || "");
//   //       apply_task_status_Accept.setValue("userId", UserId);
//   //       apply_task_status_Accept.setValue("applyuserId", applyuserId || "");
//   //       apply_task_status_Accept.setValue("applyId", applyId);
//   //       apply_task_status_Accept.setValue("applyusername", username || "");

//   //       apply_task_status_Reject.setValue("taskId", taskId || "");
//   //       apply_task_status_Reject.setValue("userId", UserId);
//   //     }
//   //   }
//   // }, [GetApplyDatabyId, GetUserDataById, UserId, applyId]);




//   const apply_job_status_Accept = useForm<z.infer<typeof Apply_Accept_Schema>>({
//     resolver: zodResolver(Apply_Accept_Schema),
//     defaultValues: {
//       userId: UserId,
//       jobId: "",
//       applyuserId: "",
//       job_apply: true,
//       applyId: applyId,
//       applyusername: "",
//     },
//   });

//   const apply_job_status_Reject = useForm<z.infer<typeof Apply_Reject_Schema>>({
//     resolver: zodResolver(Apply_Reject_Schema),
//     defaultValues: {
//       userId: UserId,
//       jobId: "",
//       job_apply: false,
//     },
//   });

//   const apply_task_status_Accept = useForm<
//     z.infer<typeof Apply_Accept_Task_Schema>
//   >({
//     resolver: zodResolver(Apply_Accept_Task_Schema),
//     defaultValues: {
//       applyId: applyId,
//       taskId: "",
//       userId: UserId,
//       task_apply: true,
//       applyuserId: "",
//       applyusername: "",
//     },
//   });

//   const apply_task_status_Reject = useForm<
//     z.infer<typeof Apply_Reject_Task_Schema>
//   >({
//     resolver: zodResolver(Apply_Reject_Task_Schema),
//     defaultValues: {
//       taskId: "",
//       userId: UserId,
//       task_apply: false,
//     },
//   });



// useEffect(() => {
//   if (GetApplyDatabyId.length > 0 && GetUserDataById.length > 0) {
//     const jobId = GetApplyDatabyId[0].apply_job_id;
//     const applyuserId = GetApplyDatabyId[0].apply_user_id;
//     const applyType = GetApplyDatabyId[0].apply_type;
//     const taskId = GetApplyDatabyId[0].apply_task_id;
//     const username = GetUserDataById[0].username;

//     if (applyType === "JOB") {
//       apply_job_status_Accept.setValue("jobId", jobId || "");
//       apply_job_status_Accept.setValue("userId", UserId);
//       apply_job_status_Accept.setValue("applyuserId", applyuserId || "");
//       apply_job_status_Accept.setValue("applyId", applyId);
//       apply_job_status_Accept.setValue("applyusername", username || "");

//       apply_job_status_Reject.setValue("jobId", jobId || "");
//       apply_job_status_Reject.setValue("userId", UserId);
//     } else if (applyType === "TASK") {
//       apply_task_status_Accept.setValue("taskId", taskId || "");
//       apply_task_status_Accept.setValue("userId", UserId);
//       apply_task_status_Accept.setValue("applyuserId", applyuserId || "");
//       apply_task_status_Accept.setValue("applyId", applyId);
//       apply_task_status_Accept.setValue("applyusername", username || "");

//       apply_task_status_Reject.setValue("taskId", taskId || "");
//       apply_task_status_Reject.setValue("userId", UserId);
//     }
//   }
// }, [
//   GetApplyDatabyId,
//   GetUserDataById,
//   UserId,
//   applyId,
//   apply_job_status_Accept,
//   apply_job_status_Reject,
//   apply_task_status_Accept,
//   apply_task_status_Reject,
// ]);



//   const apply_job_status_Accept_onSubmit = (
//     values: z.infer<typeof Apply_Accept_Schema>
//   ) => {
//     console.log("-- apply_job_status_Accept_data -- :", values, "-- End --");
//     startTransition(() => {
//       Apply_Accept_Action(values);
//     });
//   };

//   const apply_job_status_Reject_onSubmit = (
//     values: z.infer<typeof Apply_Reject_Schema>
//   ) => {
//     console.log("-- apply_job_status_Reject_data -- :", values, "-- End --");
//     startTransition(() => {
//       Apply_Reject_Action(values);
//     });
//   };

//   const apply_task_status_Accept_onSubmit = (
//     values: z.infer<typeof Apply_Accept_Task_Schema>
//   ) => {
//     console.log("-- apply_task_status_Accept_data -- :", values, "-- End --");
//     startTransition(() => {
//       Apply_Accept_Task_Action(values);
//     });
//   };

//   const apply_task_status_Reject_onSubmit = (
//     values: z.infer<typeof Apply_Reject_Task_Schema>
//   ) => {
//     console.log("-- apply_task_status_Reject_data -- :", values, "-- End --");
//     startTransition(() => {
//       Apply_Reject_Task_Action(values);
//     });
//   };

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;


//   console.log("GetApplyDatabyId : ",GetApplyDatabyId, "-- END --")

//   return (
//     <>
//       <Link href={`/user/${UserId}/admin/applyLists/`}>返回</Link>
//       <h1>ApplyListsByIdAdmin</h1>
//       <div>
//         {GetApplyDatabyId.map((d) => {
//           if (d.apply_type === "JOB") {
//             return (
//               <div key={d.id}>
//                 <p>JOB</p>
//                 申請人: {d.applicant_name}
//                 <br />
//                 申請編號: {d.apply_code}
//                 <br />
//                 申請工作編號: {d.apply_job_code}
//                 <br />
//                 申請標題: {d.apply_title}
//                 <br />
//                 申請內容: {d.apply_contect}
//                 <br />
//                 <Form {...apply_job_status_Accept}>
//                   <form
//                     onSubmit={apply_job_status_Accept.handleSubmit(
//                       apply_job_status_Accept_onSubmit
//                     )}
//                   >
//                     <Button disabled={isPending}>接受</Button>
//                   </form>
//                 </Form>
//                 <br />
//                 <Form {...apply_job_status_Reject}>
//                   <form
//                     onSubmit={apply_job_status_Reject.handleSubmit(
//                       apply_job_status_Reject_onSubmit
//                     )}
//                   >
//                     <Button disabled={isPending}>拒絕</Button>
//                   </form>
//                 </Form>
//               </div>
//             );
//           }
//           if (d.apply_type === "TASK") {
//             return (
//               <div key={d.id}>
//                 <p>TASK</p>
//                 申請人: {d.applicant_name}
//                 <br />
//                 申請編號: {d.apply_code}
//                 <br />
//                 申請工作編號: {d.apply_job_code}
//                 <br />
//                 申請標題: {d.apply_title}
//                 <br />
//                 申請內容: {d.apply_contect}
//                 <br />
//                 <Form {...apply_task_status_Accept}>
//                   <form
//                     onSubmit={apply_task_status_Accept.handleSubmit(
//                       apply_task_status_Accept_onSubmit
//                     )}
//                   >
//                     <Button disabled={isPending}>接受</Button>
//                   </form>
//                 </Form>
//                 <br />
//                 <Form {...apply_task_status_Reject}>
//                   <form
//                     onSubmit={apply_task_status_Reject.handleSubmit(
//                       apply_task_status_Reject_onSubmit
//                     )}
//                   >
//                     <Button disabled={isPending}>拒絕</Button>
//                   </form>
//                 </Form>
//               </div>
//             );
//           }
//           return null;
//         })}
//       </div>
//     </>
//   );
// };

// export default ApplyListsByIdAdmin;

"use client";

import { Apply_Accept_Schema } from "@/actions/Apply-Accept/schema";
import { Apply_Reject_Schema } from "@/actions/Apply-Reject/schema";
import { Apply_Accept_Task_Schema } from "@/actions/Apply-Accept-Task/schema";
import { Apply_Reject_Task_Schema } from "@/actions/Apply-Reject-Task/schema";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Apply_Accept_Action } from "@/actions/Apply-Accept";
import { Apply_Reject_Action } from "@/actions/Apply-Reject";
import { Apply_Accept_Task_Action } from "@/actions/Apply-Accept-Task";
import { Apply_Reject_Task_Action } from "@/actions/Apply-Reject-Task";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast"; // 添加 react-hot-toast

interface Apply {
  id: string;
  apply_user_id: string;
  apply_code: string;
  apply_title: string;
  apply_contect: string;
  apply_task_code: string;
  apply_job_code: string;
  apply_job_id: string;
  apply_task_id: string;
  applicant_name: string;
  apply_status: boolean;
  apply_type: "JOB" | "TASK";
}

interface User {
  id: string;
  username: string;
}

const ApplyListsByIdAdmin = () => {
  const param = useParams();
  const UserId = param?.id as string;
  const applyId = param?.applyListsid as string;
  console.log("param:", param);

  const [GetApplyDatabyId, setGetApplyDatabyId] = useState<Apply | null>(null);
  const [GetUserDataById, setGetUserDataById] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [getTaskId, setgetTaskId] = useState<string | null>(null);
  const [getJobId, setgetJobId] = useState<string | null>(null);
  const router = useRouter();

  const getApplyListsDatabyId = async (id: string): Promise<Apply> => {
    const res = await fetch(`/api/Apply_Lists_by_ID/${id}`);
    if (!res.ok) {
      throw new Error("斷線!");
    }
    const data = await res.json();
    console.log("API Response for Apply:", data);
    return data;
  };

  const getuserlistsdatabyid = async (id: string): Promise<User[]> => {
    const res = await fetch(`/api/User_Lists_by_ID/${id}`);
    if (!res.ok) {
      throw new Error("斷線!");
    }
    return res.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const applyResult = await getApplyListsDatabyId(applyId);
        console.log("Fetched Apply Data:", applyResult);
        setGetApplyDatabyId(applyResult);

        const applyuserId = applyResult.apply_user_id;
        const userResult = await getuserlistsdatabyid(applyuserId);
        console.log("Fetched User Data:", userResult);
        setGetUserDataById(userResult);
      } catch (err) {
        console.error("獲取數據錯誤:", err);
        setError("無法獲取申請或用戶數據");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [applyId]);

  const apply_job_status_Accept = useForm<z.infer<typeof Apply_Accept_Schema>>({
    resolver: zodResolver(Apply_Accept_Schema),
    defaultValues: {
      userId: UserId,
      jobId: "",
      applyuserId: "",
      job_apply: true,
      applyId: applyId,
      applyusername: "",
    },
  });

  const apply_job_status_Reject = useForm<z.infer<typeof Apply_Reject_Schema>>({
    resolver: zodResolver(Apply_Reject_Schema),
    defaultValues: {
      userId: UserId,
      jobId: "",
      job_apply: false,
    },
  });

  const apply_task_status_Accept = useForm<
    z.infer<typeof Apply_Accept_Task_Schema>
  >({
    resolver: zodResolver(Apply_Accept_Task_Schema),
    defaultValues: {
      applyId: applyId,
      taskId: "",
      userId: UserId,
      task_apply: true,
      applyuserId: "",
      applyusername: "",
    },
  });

  const apply_task_status_Reject = useForm<
    z.infer<typeof Apply_Reject_Task_Schema>
  >({
    resolver: zodResolver(Apply_Reject_Task_Schema),
    defaultValues: {
      taskId: "",
      userId: UserId,
      task_apply: false,
    },
  });

// useEffect(() => {
//   if (GetApplyDatabyId) {
//     const jobId = GetApplyDatabyId.apply_job_id;
//     const applyuserId = GetApplyDatabyId.apply_user_id;
//     const applyType = GetApplyDatabyId.apply_type;
//     const taskId = GetApplyDatabyId.apply_task_id;
//     const username = GetUserDataById.length > 0 ? GetUserDataById[0].username : "";

//     console.log("Setting form values:", {
//       jobId,
//       taskId,
//       applyuserId,
//       applyType,
//       username,
//       applyId,
//       UserId,
//     });

//     setgetTaskId(taskId || null);
//     setgetJobId(jobId || null);

//     if (applyType === "JOB" && jobId && applyuserId && username) {
//       apply_job_status_Accept.setValue("jobId", jobId);
//       apply_job_status_Accept.setValue("userId", UserId);
//       apply_job_status_Accept.setValue("applyuserId", applyuserId);
//       apply_job_status_Accept.setValue("applyId", applyId);
//       apply_job_status_Accept.setValue("applyusername", username);

//       apply_job_status_Reject.setValue("jobId", jobId);
//       apply_job_status_Reject.setValue("userId", UserId);
//     } else if (applyType === "TASK" && taskId && applyuserId && username) {
//       apply_task_status_Accept.setValue("taskId", taskId);
//       apply_task_status_Accept.setValue("userId", UserId);
//       apply_task_status_Accept.setValue("applyuserId", applyuserId);
//       apply_task_status_Accept.setValue("applyId", applyId);
//       apply_task_status_Accept.setValue("applyusername", username);

//       apply_task_status_Reject.setValue("taskId", taskId);
//       apply_task_status_Reject.setValue("userId", UserId);
//     } else {
//       console.warn("缺少必要數據，無法設置表單值:", {
//         applyType,
//         jobId,
//         taskId,
//         applyuserId,
//         username,
//       });
//     }
//   }
// }, [
//   GetApplyDatabyId,
//   GetUserDataById,
//   UserId,
//   applyId,
//   apply_job_status_Accept,
//   apply_job_status_Reject,
//   apply_task_status_Accept,
//   apply_task_status_Reject,
// ]);

useEffect(() => {
  if (GetApplyDatabyId) {
    const jobId = GetApplyDatabyId.apply_job_id;
    const applyuserId = GetApplyDatabyId.apply_user_id;
    const applyType = GetApplyDatabyId.apply_type;
    const taskId = GetApplyDatabyId.apply_task_id;
    const username = GetUserDataById.length > 0 ? GetUserDataById[0].username : "";

    console.log("Setting form values:", {
      jobId,
      taskId,
      applyuserId,
      applyType,
      username,
      applyId,
      UserId,
    });

    setgetTaskId(taskId || null);
    setgetJobId(jobId || null);

    if (applyType === "JOB" && jobId && applyuserId) {
      console.log("Updating JOB form values:", { jobId, applyuserId, username });
      apply_job_status_Accept.setValue("jobId", jobId);
      apply_job_status_Accept.setValue("userId", UserId);
      apply_job_status_Accept.setValue("applyuserId", applyuserId);
      apply_job_status_Accept.setValue("applyId", applyId);
      apply_job_status_Accept.setValue("applyusername", username || "未知用戶");

      apply_job_status_Reject.setValue("jobId", jobId);
      apply_job_status_Reject.setValue("userId", UserId);
    } else if (applyType === "TASK" && taskId && applyuserId) {
      console.log("Updating TASK form values:", { taskId, applyuserId, username });
      apply_task_status_Accept.setValue("taskId", taskId);
      apply_task_status_Accept.setValue("userId", UserId);
      apply_task_status_Accept.setValue("applyuserId", applyuserId);
      apply_task_status_Accept.setValue("applyId", applyId);
      apply_task_status_Accept.setValue("applyusername", username || "未知用戶");

      apply_task_status_Reject.setValue("taskId", taskId);
      apply_task_status_Reject.setValue("userId", UserId);
    } else {
      console.warn("缺少必要數據，無法設置表單值:", {
        applyType,
        jobId,
        taskId,
        applyuserId,
        username,
      });
    }

    // 驗證表單值是否正確設置
    console.log("After setting JOB Accept form:", apply_job_status_Accept.getValues());
    console.log("After setting JOB Reject form:", apply_job_status_Reject.getValues());
    console.log("After setting TASK Accept form:", apply_task_status_Accept.getValues());
    console.log("After setting TASK Reject form:", apply_task_status_Reject.getValues());
  }
}, [
  GetApplyDatabyId,
  GetUserDataById,
  UserId,
  applyId,
  apply_job_status_Accept,
  apply_job_status_Reject,
  apply_task_status_Accept,
  apply_task_status_Reject,
]);

  // const apply_job_status_Accept_onSubmit = (
  //   values: z.infer<typeof Apply_Accept_Schema>
  // ) => {
  //   console.log("-- apply_job_status_Accept_data -- :", values, "-- End --");
  //   startTransition(async () => {
  //     try {
  //       const result = await Apply_Accept_Action(values);
  //       if ("error" in result) {
  //         throw new Error(result.error || "申請接受失敗");
  //       }
  //       router.push(`/user/${UserId}/admin/applyLists`);
  //     } catch (error) {
  //       const errorMessage = error instanceof Error ? error.message : "未知錯誤";
  //       apply_job_status_Accept.setError("root", {
  //         message: `表單提交失敗: ${errorMessage}`,
  //       });
  //     }
  //   });
  // };

const apply_job_status_Accept_onSubmit = (
  values: z.infer<typeof Apply_Accept_Schema>
) => {
  console.log("-- apply_job_status_Accept_data -- :", values, "-- End --");
  if (!values.jobId) {
    console.error("提交失敗: jobId 為空");
    toast.error("提交失敗: 工作 ID 無效");
    apply_job_status_Accept.setError("jobId", { message: "工作 ID 為必填項" });
    return;
  }
  startTransition(async () => {
    try {
      const result = await Apply_Accept_Action(values);
      if ("error" in result) {
        console.error("申請接受失敗:", result.error);
        toast.error(`申請接受失敗: ${result.error}`);
        return;
      }
      toast.success("批核成功！");
      router.push(`/user/${UserId}/admin/applyLists`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "未知錯誤";
      console.error("申請接受錯誤:", errorMessage, error);
      toast.error(`申請接受失敗: ${errorMessage}`);
      apply_job_status_Accept.setError("root", {
        message: `表單提交失敗: ${errorMessage}`,
      });
    }
  });
};

  // const apply_job_status_Reject_onSubmit = (
  //   values: z.infer<typeof Apply_Reject_Schema>
  // ) => {
  //   console.log("-- apply_job_status_Reject_data -- :", values, "-- End --");
  //   startTransition(async () => {
  //     try {
  //       const result = await Apply_Reject_Action(values);
  //       if ("error" in result) {
  //         throw new Error(result.error || "申請拒絕失敗");
  //       }
  //       router.push(`/user/${UserId}/admin/applyLists`);
  //     } catch (error) {
  //       const errorMessage = error instanceof Error ? error.message : "未知錯誤";
  //       apply_job_status_Reject.setError("root", {
  //         message: `表單提交失敗: ${errorMessage}`,
  //       });
  //     }
  //   });
  // };
const apply_job_status_Reject_onSubmit = (
  values: z.infer<typeof Apply_Reject_Schema>
) => {
  console.log("-- apply_job_status_Reject_data -- :", values, "-- End --");
  if (!values.jobId) {
    console.error("提交失敗: jobId 為空");
    toast.error("提交失敗: 工作 ID 無效");
    apply_job_status_Reject.setError("jobId", { message: "工作 ID 為必填項" });
    return;
  }
  startTransition(async () => {
    try {
      const result = await Apply_Reject_Action(values);
      if ("error" in result) {
        console.error("申請拒絕失敗:", result.error);
        toast.error(`申請拒絕失敗: ${result.error}`);
        return;
      }
      toast.success("批核成功！");
      router.push(`/user/${UserId}/admin/applyLists`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "未知錯誤";
      console.error("申請拒絕錯誤:", errorMessage, error);
      toast.error(`申請拒絕失敗: ${errorMessage}`);
      apply_job_status_Reject.setError("root", {
        message: `表單提交失敗: ${errorMessage}`,
      });
    }
  });
};

  // const apply_task_status_Accept_onSubmit = (
  //   values: z.infer<typeof Apply_Accept_Task_Schema>
  // ) => {
  //   console.log("-- apply_task_status_Accept_data -- :", values, "-- End --");
  //   console.log("Current form state:", apply_task_status_Accept.getValues());
  //   console.log("getTaskId state:", getTaskId);
  //   console.log("GetApplyDatabyId.apply_task_id:", GetApplyDatabyId?.apply_task_id);
  //   startTransition(async () => {
  //     try {
  //       const result = await Apply_Accept_Task_Action(values);
  //       if ("error" in result) {
  //         throw new Error(result.error || "任務接受失敗");
  //       }
  //       router.push(`/user/${UserId}/admin/applyLists`);
  //     } catch (error) {
  //       const errorMessage = error instanceof Error ? error.message : "未知錯誤";
  //       apply_task_status_Accept.setError("root", {
  //         message: `表單提交失敗: ${errorMessage}`,
  //       });
  //     }
  //   });
  // };

const apply_task_status_Accept_onSubmit = (
  values: z.infer<typeof Apply_Accept_Task_Schema>
) => {
  console.log("-- apply_task_status_Accept_data -- :", values, "-- End --");
  if (!values.taskId) {
    console.error("提交失敗: taskId 為空");
    toast.error("提交失敗: 任務 ID 無效");
    apply_task_status_Accept.setError("taskId", { message: "任務 ID 為必填項" });
    return;
  }
  startTransition(async () => {
    try {
      const result = await Apply_Accept_Task_Action(values);
      if ("error" in result) {
        console.error("任務接受失敗:", result.error);
        toast.error(`任務接受失敗: ${result.error}`);
        return;
      }
      toast.success("批核成功！");
      router.push(`/user/${UserId}/admin/applyLists`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "未知錯誤";
      console.error("任務接受錯誤:", errorMessage, error);
      toast.error(`任務接受失敗: ${errorMessage}`);
      apply_task_status_Accept.setError("root", {
        message: `表單提交失敗: ${errorMessage}`,
      });
    }
  });
};

  // const apply_task_status_Reject_onSubmit = (
  //   values: z.infer<typeof Apply_Reject_Task_Schema>
  // ) => {
  //   console.log("-- apply_task_status_Reject_data -- :", values, "-- End --");
  //   console.log("Current form state:", apply_task_status_Reject.getValues());
  //   console.log("getTaskId state:", getTaskId);
  //   console.log("GetApplyDatabyId.apply_task_id:", GetApplyDatabyId?.apply_task_id);
  //   startTransition(async () => {
  //     try {
  //       const result = await Apply_Reject_Task_Action(values);
  //       if ("error" in result) {
  //         throw new Error(result.error || "任務拒絕失敗");
  //       }
  //       router.push(`/user/${UserId}/admin/applyLists`);
  //     } catch (error) {
  //       const errorMessage = error instanceof Error ? error.message : "未知錯誤";
  //       apply_task_status_Reject.setError("root", {
  //         message: `表單提交失敗: ${errorMessage}`,
  //       });
  //     }
  //   });
  // };

const apply_task_status_Reject_onSubmit = (
  values: z.infer<typeof Apply_Reject_Task_Schema>
) => {
  console.log("-- apply_task_status_Reject_data -- :", values, "-- End --");
  if (!values.taskId) {
    console.error("提交失敗: taskId 為空");
    toast.error("提交失敗: 任務 ID 無效");
    apply_task_status_Reject.setError("taskId", { message: "任務 ID 為必填項" });
    return;
  }
  startTransition(async () => {
    try {
      const result = await Apply_Reject_Task_Action(values);
      if ("error" in result) {
        console.error("任務拒絕失敗:", result.error);
        toast.error(`任務拒絕失敗: ${result.error}`);
        return;
      }
      toast.success("批核成功！");
      router.push(`/user/${UserId}/admin/applyLists`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "未知錯誤";
      console.error("任務拒絕錯誤:", errorMessage, error);
      toast.error(`任務拒絕失敗: ${errorMessage}`);
      apply_task_status_Reject.setError("root", {
        message: `表單提交失敗: ${errorMessage}`,
      });
    }
  });
};

  console.log("jobId:", getJobId);
  console.log("taskId:", getTaskId);
  console.log("GetApplyDatabyId:", GetApplyDatabyId);

//   return (
//     <div className="flex flex-col min-h-screen bg-white font-noto-sans-tc p-4 sm:p-8">
//       <div className="max-w-2xl mx-auto w-full space-y-6">
//         <Link
//           href={`/user/${UserId}/admin/applyLists/`}
//           className="text-primary-1 hover:bg-grey-2 rounded-md px-4 py-2 inline-block transition-colors duration-300"
//         >
//           返回
//         </Link>
//         <h1 className="text-2xl sm:text-3xl text-primary-1 mb-6">申請詳情管理</h1>
//         <div className="space-y-4">
//           {isLoading && <div className="text-primary-1 text-base">載入中...</div>}
//           {error && <div className="text-red-500 text-base">錯誤: {error}</div>}
//           {GetApplyDatabyId && (
//             <div className="border border-grey-2 rounded-md p-6 space-y-4">
//               {GetApplyDatabyId.apply_type === "JOB" && (
//                 <div>
//                   <p className="text-primary-1 text-lg font-semibold">工作申請</p>
//                   <p className="text-primary-1">申請人: {GetApplyDatabyId.applicant_name}</p>
//                   <p className="text-primary-1">申請編號: {GetApplyDatabyId.apply_code}</p>
//                   <p className="text-primary-1">申請工作編號: {GetApplyDatabyId.apply_job_code}</p>
//                   <p className="text-primary-1">申請標題: {GetApplyDatabyId.apply_title}</p>
//                   <p className="text-primary-1">申請內容: {GetApplyDatabyId.apply_contect}</p>
//                   <div className="flex space-x-4 mt-4">
//                     <Form {...apply_job_status_Accept}>
//                       <form
//                         onSubmit={apply_job_status_Accept.handleSubmit(
//                           apply_job_status_Accept_onSubmit
//                         )}
//                       >
//                         <div hidden>
//                         <FormField
//                           control={apply_job_status_Accept.control}
//                           name="jobId"
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel>工作 ID</FormLabel>
//                               <FormControl>
//                                 <Input
//                                   placeholder="工作 ID"
//                                   value={field.value || GetApplyDatabyId.apply_job_id || ""}
//                                   onChange={field.onChange}
//                                   disabled={isPending}
//                                 />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                         </div>


//                         <Button
//                           disabled={isPending}
//                           className="w-24 h-12 bg-primary-1 text-white hover:bg-grey-2 rounded-md transition-colors duration-300"
//                         >
//                           接受
//                         </Button>
//                       </form>
//                     </Form>
//                     <Form {...apply_job_status_Reject}>
//                       <form
//                         onSubmit={apply_job_status_Reject.handleSubmit(
//                           apply_job_status_Reject_onSubmit
//                         )}
//                       >
//                          <div hidden>
//                         <FormField
//                           control={apply_job_status_Accept.control}
//                           name="jobId"
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel>工作 ID</FormLabel>
//                               <FormControl>
//                                 <Input
//                                   placeholder="工作 ID"
//                                   value={field.value || GetApplyDatabyId.apply_job_id || ""}
//                                   onChange={field.onChange}
//                                   disabled={isPending}
//                                 />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                         </div>
//                         <Button
//                           disabled={isPending}
//                           className="w-24 h-12 bg-primary-1 text-white hover:bg-grey-2 rounded-md transition-colors duration-300"
//                         >
//                           拒絕
//                         </Button>
//                       </form>
//                     </Form>
//                   </div>
//                 </div>
//               )}
//               {GetApplyDatabyId.apply_type === "TASK" && (
//                 <div>
//                   <p className="text-primary-1 text-lg font-semibold">任務申請</p>
//                   <p className="text-primary-1">申請人: {GetApplyDatabyId.applicant_name}</p>
//                   <p className="text-primary-1">申請編號: {GetApplyDatabyId.apply_code}</p>
//                   <p className="text-primary-1">申請任務編號: {GetApplyDatabyId.apply_task_code}</p>
//                   <p className="text-primary-1">申請標題: {GetApplyDatabyId.apply_title}</p>
//                   <p className="text-primary-1">申請內容: {GetApplyDatabyId.apply_contect}</p>
//                   <div className="flex space-x-4 mt-4">
//                     <Form {...apply_task_status_Accept}>
//                       <form
//                         onSubmit={apply_task_status_Accept.handleSubmit(
//                           apply_task_status_Accept_onSubmit
//                         )}
//                       >
//                         <div hidden>
//                         <FormField
//                           control={apply_task_status_Accept.control}
//                           name="taskId"
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel>任務 ID</FormLabel>
//                               <FormControl>
//                                 <Input
//                                   placeholder="任務 ID"
//                                   value={field.value || GetApplyDatabyId.apply_task_id || ""}
//                                   onChange={field.onChange}
//                                   disabled={isPending}
//                                 />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                         </div>

//                         <Button
//                           disabled={isPending}
//                           className="w-24 h-12 bg-primary-1 text-white hover:bg-grey-2 rounded-md transition-colors duration-300"
//                         >
//                           接受
//                         </Button>
//                       </form>
//                     </Form>
//                     <Form {...apply_task_status_Reject}>
//                       <form
//                         onSubmit={apply_task_status_Reject.handleSubmit(
//                           apply_task_status_Reject_onSubmit
//                         )}
//                       >
//                         <div hidden>
//                           <FormField
//                           control={apply_task_status_Reject.control}
//                           name="taskId"
//                           render={({ field }) => (
//                             <FormItem>
//                               <FormLabel>任務 ID</FormLabel>
//                               <FormControl>
//                                 <Input
//                                   placeholder="任務 ID"
//                                   value={field.value || GetApplyDatabyId.apply_task_id || ""}
//                                   onChange={field.onChange}
//                                   disabled={isPending}
//                                 />
//                               </FormControl>
//                               <FormMessage />
//                             </FormItem>
//                           )}
//                         />
//                         </div>
                        
//                         <Button
//                           disabled={isPending}
//                           className="w-24 h-12 bg-primary-1 text-white hover:bg-grey-2 rounded-md transition-colors duration-300"
//                         >
//                           拒絕
//                         </Button>
//                       </form>
//                     </Form>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//           {!isLoading && !error && !GetApplyDatabyId && (
//             <div className="text-primary-1 text-base">未找到申請</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApplyListsByIdAdmin;


return (
    <div className="flex flex-col min-h-screen bg-white font-noto-sans-tc p-4 sm:p-8">
      <Toaster position="top-center" /> {/* 添加 Toaster 組件以顯示 toast 提示 */}
      <div className="max-w-2xl mx-auto w-full space-y-6">
        <Link
          href={`/user/${UserId}/admin/applyLists/`}
          className="text-primary-1 hover:bg-grey-2 rounded-md px-4 py-2 inline-block transition-colors duration-300"
        >
          返回
        </Link>
        <h1 className="text-2xl sm:text-3xl text-primary-1 mb-6">申請詳情管理</h1>
        <div className="space-y-4">
          {isLoading && <div className="text-primary-1 text-base">載入中...</div>}
          {error && <div className="text-red-500 text-base">錯誤: {error}</div>}
          {GetApplyDatabyId && (
            <div className="border border-grey-2 rounded-md p-6 space-y-4">
              {GetApplyDatabyId.apply_type === "JOB" && (
                <div>
                  <p className="text-primary-1 text-lg font-semibold">工作申請</p>
                  <p className="text-primary-1">申請人: {GetApplyDatabyId.applicant_name}</p>
                  <p className="text-primary-1">申請編號: {GetApplyDatabyId.apply_code}</p>
                  <p className="text-primary-1">申請工作編號: {GetApplyDatabyId.apply_job_code}</p>
                  <p className="text-primary-1">申請標題: {GetApplyDatabyId.apply_title}</p>
                  <p className="text-primary-1">申請內容: {GetApplyDatabyId.apply_contect}</p>
                  <div className="flex space-x-4 mt-4">
                    <Form {...apply_job_status_Accept}>
                      <form
                        onSubmit={apply_job_status_Accept.handleSubmit(
                          apply_job_status_Accept_onSubmit
                        )}
                      >
                        <div hidden>
                          <FormField
                            control={apply_job_status_Accept.control}
                            name="jobId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>工作 ID</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="工作 ID"
                                    value={field.value || GetApplyDatabyId.apply_job_id || ""}
                                    onChange={field.onChange}
                                    disabled={isPending}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button
                          disabled={isPending}
                          className="w-24 h-12 bg-black text-white hover:bg-gray-800 disabled:bg-gray-600 disabled:text-gray-300 rounded-md transition-colors duration-300"
                        >
                          接受
                        </Button>
                      </form>
                    </Form>
                    <Form {...apply_job_status_Reject}>
                      <form
                        onSubmit={apply_job_status_Reject.handleSubmit(
                          apply_job_status_Reject_onSubmit
                        )}
                      >
                        <div hidden>
                          <FormField
                            control={apply_job_status_Reject.control} // 修正為 apply_job_status_Reject.control
                            name="jobId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>工作 ID</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="工作 ID"
                                    value={field.value || GetApplyDatabyId.apply_job_id || ""}
                                    onChange={field.onChange}
                                    disabled={isPending}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button
                          disabled={isPending}
                          className="w-24 h-12 bg-black text-white hover:bg-gray-800 disabled:bg-gray-600 disabled:text-gray-300 rounded-md transition-colors duration-300"
                        >
                          拒絕
                        </Button>
                      </form>
                    </Form>
                  </div>
                </div>
              )}
              {GetApplyDatabyId.apply_type === "TASK" && (
                <div>
                  <p className="text-primary-1 text-lg font-semibold">任務申請</p>
                  <p className="text-primary-1">申請人: {GetApplyDatabyId.applicant_name}</p>
                  <p className="text-primary-1">申請編號: {GetApplyDatabyId.apply_code}</p>
                  <p className="text-primary-1">申請任務編號: {GetApplyDatabyId.apply_task_code}</p>
                  <p className="text-primary-1">申請標題: {GetApplyDatabyId.apply_title}</p>
                  <p className="text-primary-1">申請內容: {GetApplyDatabyId.apply_contect}</p>
                  <div className="flex space-x-4 mt-4">
                    <Form {...apply_task_status_Accept}>
                      <form
                        onSubmit={apply_task_status_Accept.handleSubmit(
                          apply_task_status_Accept_onSubmit
                        )}
                      >
                        <div hidden>
                          <FormField
                            control={apply_task_status_Accept.control}
                            name="taskId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>任務 ID</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="任務 ID"
                                    value={field.value || GetApplyDatabyId.apply_task_id || ""}
                                    onChange={field.onChange}
                                    disabled={isPending}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button
                          disabled={isPending}
                          className="w-24 h-12 bg-black text-white hover:bg-gray-800 disabled:bg-gray-600 disabled:text-gray-300 rounded-md transition-colors duration-300"
                        >
                          接受
                        </Button>
                      </form>
                    </Form>
                    <Form {...apply_task_status_Reject}>
                      <form
                        onSubmit={apply_task_status_Reject.handleSubmit(
                          apply_task_status_Reject_onSubmit
                        )}
                      >
                        <div hidden>
                          <FormField
                            control={apply_task_status_Reject.control}
                            name="taskId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>任務 ID</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="任務 ID"
                                    value={field.value || GetApplyDatabyId.apply_task_id || ""}
                                    onChange={field.onChange}
                                    disabled={isPending}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <Button
                          disabled={isPending}
                          className="w-24 h-12 bg-black text-white hover:bg-gray-800 disabled:bg-gray-600 disabled:text-gray-300 rounded-md transition-colors duration-300"
                        >
                          拒絕
                        </Button>
                      </form>
                    </Form>
                  </div>
                </div>
              )}
              {!isLoading && !error && !GetApplyDatabyId && (
                <div className="text-primary-1 text-base">未找到申請</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyListsByIdAdmin;



// "use client";

// import { Apply_Accept_Schema } from "@/actions/Apply-Accept/schema";
// import { Apply_Reject_Schema } from "@/actions/Apply-Reject/schema";
// import { Button } from "@/components/ui/button";
// import { useParams } from "next/navigation";
// import { useEffect, useState, useTransition } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Form } from "@/components/ui/form";
// import { Apply_Accept_Action } from "@/actions/Apply-Accept";
// import { Apply_Reject_Action } from "@/actions/Apply-Reject";
// import { Apply_Accept_Task_Schema } from "@/actions/Apply-Accept-Task/schema";
// import { Apply_Reject_Task_Schema } from "@/actions/Apply-Reject-Task/schema";
// import { Apply_Accept_Task_Action } from "@/actions/Apply-Accept-Task";
// import { Apply_Reject_Task_Action } from "@/actions/Apply-Reject-Task";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// interface Apply {
//   id: string;
//   apply_user_id: string;
//   apply_code: string;
//   apply_title: string;
//   apply_contect: string;
//   apply_task_code: string | null;
//   apply_job_code: string | null;
//   apply_job_id: string | null;
//   apply_task_id: string | null;
//   applicant_name: string;
//   apply_status: boolean;
//   apply_type: "JOB" | "TASK";
// }

// interface User {
//   id: string;
//   username: string;
// }

// const ApplyListsByIdAdmin = () => {
//   const param = useParams();
//   const UserId = param?.id as string;
//   const applyId = param?.applyListsid as string;
//   console.log("param :",param)


//   const [GetApplyDatabyId, setGetApplyDatabyId] = useState<Apply | null>(null);
//   const [GetUserDataById, setGetUserDataById] = useState<User[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isPending, startTransition] = useTransition();
//   const router = useRouter();

//   const getApplyListsDatabyId = async (id: string): Promise<Apply> => {
//     const res = await fetch(`/api/Apply_Lists_by_ID/${id}`);
//     if (!res.ok) {
//       throw new Error("斷線!");
//     }
//     return res.json();
//   };

//   const getuserlistsdatabyid = async (id: string): Promise<User[]> => {
//     const res = await fetch(`/api/User_Lists_by_ID/${id}`);
//     if (!res.ok) {
//       throw new Error("斷線!");
//     }
//     return res.json();
//   };

//   useEffect(() => {
//     const fetchApplyData = async () => {
//       setIsLoading(true);
//       try {
//         const result = await getApplyListsDatabyId(applyId);
//         setGetApplyDatabyId(result);
//       } catch (err) {
//         console.error("獲取申請數據錯誤:", err);
//         setError("無法獲取申請數據");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchApplyData();
//   }, [applyId]);

//   useEffect(() => {
//     if (GetApplyDatabyId) {
//       const applyuserId = GetApplyDatabyId.apply_user_id;
//       const fetchUserData = async () => {
//         setIsLoading(true);
//         try {
//           const result = await getuserlistsdatabyid(applyuserId);
//           setGetUserDataById(result);
//         } catch (err) {
//           console.error("獲取用戶數據錯誤:", err);
//           setError("無法獲取用戶數據");
//         } finally {
//           setIsLoading(false);
//         }
//       };
//       fetchUserData();
//     }
//   }, [GetApplyDatabyId]);

//   const apply_job_status_Accept = useForm<z.infer<typeof Apply_Accept_Schema>>({
//     resolver: zodResolver(Apply_Accept_Schema),
//     defaultValues: {
//       userId: UserId,
//       jobId: "",
//       applyuserId: "",
//       job_apply: true,
//       applyId: applyId,
//       applyusername: "",
//     },
//   });

//   const apply_job_status_Reject = useForm<z.infer<typeof Apply_Reject_Schema>>({
//     resolver: zodResolver(Apply_Reject_Schema),
//     defaultValues: {
//       userId: UserId,
//       jobId: "",
//       job_apply: false,
//     },
//   });

//   const apply_task_status_Accept = useForm<
//     z.infer<typeof Apply_Accept_Task_Schema>
//   >({
//     resolver: zodResolver(Apply_Accept_Task_Schema),
//     defaultValues: {
//       applyId: applyId,
//       taskId: "",
//       userId: UserId,
//       task_apply: true,
//       applyuserId: "",
//       applyusername: "",
//     },
//   });

//   const apply_task_status_Reject = useForm<
//     z.infer<typeof Apply_Reject_Task_Schema>
//   >({
//     resolver: zodResolver(Apply_Reject_Task_Schema),
//     defaultValues: {
//       taskId: "",
//       userId: UserId,
//       task_apply: false,
//     },
//   });

//   useEffect(() => {
//     if (GetApplyDatabyId && GetUserDataById.length > 0) {
//       const jobId = GetApplyDatabyId.apply_job_id;
//       const applyuserId = GetApplyDatabyId.apply_user_id;
//       const applyType = GetApplyDatabyId.apply_type;
//       const taskId = GetApplyDatabyId.apply_task_id;
//       const username = GetUserDataById[0].username;

    

//       if (applyType === "JOB") {
//         apply_job_status_Accept.setValue("jobId", jobId || "");
//         apply_job_status_Accept.setValue("userId", UserId);
//         apply_job_status_Accept.setValue("applyuserId", applyuserId || "");
//         apply_job_status_Accept.setValue("applyId", applyId);
//         apply_job_status_Accept.setValue("applyusername", username || "");

//         apply_job_status_Reject.setValue("jobId", jobId || "");
//         apply_job_status_Reject.setValue("userId", UserId);
//       } else if (applyType === "TASK") {
//         apply_task_status_Accept.setValue("taskId", taskId || "");
//         apply_task_status_Accept.setValue("userId", UserId);
//         apply_task_status_Accept.setValue("applyuserId", applyuserId || "");
//         apply_task_status_Accept.setValue("applyId", applyId);
//         apply_task_status_Accept.setValue("applyusername", username || "");

//         apply_task_status_Reject.setValue("taskId", taskId || "");
//         apply_task_status_Reject.setValue("userId", UserId);
//       }
//     }
//   }, [
//     GetApplyDatabyId,
//     GetUserDataById,
//     UserId,
//     applyId,
//     apply_job_status_Accept,
//     apply_job_status_Reject,
//     apply_task_status_Accept,
//     apply_task_status_Reject,
//   ]);

//   const apply_job_status_Accept_onSubmit = (
//     values: z.infer<typeof Apply_Accept_Schema>
//   ) => {
//     console.log("-- apply_job_status_Accept_data -- :", values, "-- End --");
// startTransition(async () => {
//   try {
//     const result = await Apply_Accept_Action(values);

//     // 假设成功时返回 { success: true }，失败时返回 { error: 'xxx' }
//     if ("error" in result) {
//       throw new Error(result.error || "申請接受失敗");
//     }
//     router.push(`/user/${UserId}/admin/applyLists`); // 成功跳转
//   } catch (error) {
//     const errorMessage = error instanceof Error ? error.message : "未知錯誤";
//     apply_job_status_Accept.setError("root", {
//       message: `表單提交失敗: ${errorMessage}`,
//     });
//   }
// });
//   };

//   const apply_job_status_Reject_onSubmit = (
//     values: z.infer<typeof Apply_Reject_Schema>
//   ) => {
//     console.log("-- apply_job_status_Reject_data -- :", values, "-- End --");
//     startTransition(async () => {
//   try {
//     const result = await Apply_Reject_Action(values);

//     // 假设成功时返回 { success: true }，失败时返回 { error: 'xxx' }
//     if ("error" in result) {
//       throw new Error(result.error || "申請接受失敗");
//     }
//     router.push(`/user/${UserId}/admin/applyLists`); // 成功跳转
//   } catch (error) {
//     const errorMessage = error instanceof Error ? error.message : "未知錯誤";
//     apply_job_status_Accept.setError("root", {
//       message: `表單提交失敗: ${errorMessage}`,
//     });
//   }
// });
//   };

//   const apply_task_status_Accept_onSubmit = (
//     values: z.infer<typeof Apply_Accept_Task_Schema>
//   ) => {
//     console.log("-- apply_task_status_Accept_data -- :", values, "-- End --");
//     startTransition(() => {
//       Apply_Accept_Task_Action(values);
//     });
//   };

//   const apply_task_status_Reject_onSubmit = (
//     values: z.infer<typeof Apply_Reject_Task_Schema>
//   ) => {
//     console.log("-- apply_task_status_Reject_data -- :", values, "-- End --");
//     startTransition(() => {
//       Apply_Reject_Task_Action(values);
//     });
//   };

//   console.log("jobId :" , GetApplyDatabyId?.apply_job_id)
//   console.log("taskId : ", GetApplyDatabyId?.apply_task_id)

//   return (
//     <div className="flex flex-col min-h-screen bg-white font-noto-sans-tc p-4 sm:p-8">
//       <div className="max-w-2xl mx-auto w-full space-y-6">
//         <Link
//           href={`/user/${UserId}/admin/applyLists/`}
//           className="text-primary-1 hover:bg-grey-2 rounded-md px-4 py-2 inline-block transition-colors duration-300"
//         >
//           返回
//         </Link>
//         <h1 className="text-2xl sm:text-3xl text-primary-1 mb-6">申請詳情管理</h1>
//         <div className="space-y-4">
//           {isLoading && <div className="text-primary-1 text-base">載入中...</div>}
//           {error && <div className="text-red-500 text-base">錯誤: {error}</div>}
//           {GetApplyDatabyId && (
//             <div className="border border-grey-2 rounded-md p-6 space-y-4">
//               {GetApplyDatabyId.apply_type === "JOB" && (
//                 <div>
//                   <p className="text-primary-1 text-lg font-semibold">工作申請</p>
//                   <p className="text-primary-1">申請人: {GetApplyDatabyId.applicant_name}</p>
//                   <p className="text-primary-1">申請編號: {GetApplyDatabyId.apply_code}</p>
//                   <p className="text-primary-1">申請工作編號: {GetApplyDatabyId.apply_job_code}</p>
//                   <p className="text-primary-1">申請標題: {GetApplyDatabyId.apply_title}</p>
//                   <p className="text-primary-1">申請內容: {GetApplyDatabyId.apply_contect}</p>
//                   <div className="flex space-x-4 mt-4">
//                     <Form {...apply_job_status_Accept}>
//                       <form
//                         onSubmit={apply_job_status_Accept.handleSubmit(
//                           apply_job_status_Accept_onSubmit
//                         )}
//                       >
//                         <Button
//                           disabled={isPending}
//                           className="w-24 h-12 bg-primary-1 text-white hover:bg-grey-2 rounded-md transition-colors duration-300"
//                         >
//                           接受
//                         </Button>
//                       </form>
//                     </Form>
//                     <Form {...apply_job_status_Reject}>
//                       <form
//                         onSubmit={apply_job_status_Reject.handleSubmit(
//                           apply_job_status_Reject_onSubmit
//                         )}
//                       >
//                         <Button
//                           disabled={isPending}
//                           className="w-24 h-12 bg-primary-1 text-white hover:bg-grey-2 rounded-md transition-colors duration-300"
//                         >
//                           拒絕
//                         </Button>
//                       </form>
//                     </Form>
//                   </div>
//                 </div>
//               )}
//               {GetApplyDatabyId.apply_type === "TASK" && (
//                 <div>
//                   <p className="text-primary-1 text-lg font-semibold">任務申請</p>
//                   <p className="text-primary-1">申請人: {GetApplyDatabyId.applicant_name}</p>
//                   <p className="text-primary-1">申請編號: {GetApplyDatabyId.apply_code}</p>
//                   <p className="text-primary-1">申請任務編號: {GetApplyDatabyId.apply_task_code}</p>
//                   <p className="text-primary-1">申請標題: {GetApplyDatabyId.apply_title}</p>
//                   <p className="text-primary-1">申請內容: {GetApplyDatabyId.apply_contect}</p>
//                   <div className="flex space-x-4 mt-4">
//                     <Form {...apply_task_status_Accept}>
//                       <form
//                         onSubmit={apply_task_status_Accept.handleSubmit(
//                           apply_task_status_Accept_onSubmit
//                         )}
//                       >
//                         <Button
//                           disabled={isPending}
//                           className="w-24 h-12 bg-primary-1 text-white hover:bg-grey-2 rounded-md transition-colors duration-300"
//                         >
//                           接受
//                         </Button>
//                       </form>
//                     </Form>
//                     <Form {...apply_task_status_Reject}>
//                       <form
//                         onSubmit={apply_task_status_Reject.handleSubmit(
//                           apply_task_status_Reject_onSubmit
//                         )}
//                       >
//                         <Button
//                           disabled={isPending}
//                           className="w-24 h-12 bg-primary-1 text-white hover:bg-grey-2 rounded-md transition-colors duration-300"
//                         >
//                           拒絕
//                         </Button>
//                       </form>
//                     </Form>
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//           {!isLoading && !error && !GetApplyDatabyId && (
//             <div className="text-primary-1 text-base">未找到申請</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApplyListsByIdAdmin;








// "use client";

// import { Apply_Accept_Schema } from "@/actions/Apply-Accept/schema";
// import { Apply_Reject_Schema } from "@/actions/Apply-Reject/schema";
// import { Button } from "@/components/ui/button";
// import { useParams } from "next/navigation";
// import { useEffect, useState, useTransition } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Form } from "@/components/ui/form";
// import { Apply_Accept_Action } from "@/actions/Apply-Accept";
// import { Apply_Reject_Action } from "@/actions/Apply-Reject";
// import { Apply_Accept_Task_Schema } from "@/actions/Apply-Accept-Task/schema";
// import { Apply_Reject_Task_Schema } from "@/actions/Apply-Reject-Task/schema";
// import { Apply_Accept_Task_Action } from "@/actions/Apply-Accept-Task";
// import { Apply_Reject_Task_Action } from "@/actions/Apply-Reject-Task";
// import Link from "next/link";

// interface Apply {
//   id: string;
//   apply_user_id: string;
//   apply_code: string;
//   apply_title: string;
//   apply_contect: string;
//   apply_task_code: string | null;
//   apply_job_code: string | null;
//   apply_job_id: string | null;
//   apply_task_id: string | null;
//   applicant_name: string;
//   apply_status: boolean;
//   apply_type: "JOB" | "TASK";
// }

// interface User {
//   id: string;
//   username: string;
// }

// const ApplyListsByIdAdmin = () => {
//   const param = useParams();
//   const UserId = param?.id as string;
//   const applyId = param?.applyListsid as string;

//   const [GetApplyDatabyId, setGetApplyDatabyId] = useState<Apply | null>(null);
//   const [GetUserDataById, setGetUserDataById] = useState<User[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isPending, startTransition] = useTransition();

//   const getApplyListsDatabyId = async (id: string): Promise<Apply> => {
//     const res = await fetch(`/api/Apply_Lists_by_ID/${id}`);
//     if (!res.ok) {
//       throw new Error("斷線!");
//     }
//     return res.json();
//   };

//   const getuserlistsdatabyid = async (id: string): Promise<User[]> => {
//     const res = await fetch(`/api/User_Lists_by_ID/${id}`);
//     if (!res.ok) {
//       throw new Error("斷線!");
//     }
//     return res.json();
//   };

//   useEffect(() => {
//     const fetchApplyData = async () => {
//       setIsLoading(true);
//       try {
//         const result = await getApplyListsDatabyId(applyId);
//         setGetApplyDatabyId(result);
//       } catch (err) {
//         console.error("獲取申請數據錯誤:", err);
//         setError("無法獲取申請數據");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchApplyData();
//   }, [applyId]);

//   useEffect(() => {
//     if (GetApplyDatabyId) {
//       const applyuserId = GetApplyDatabyId.apply_user_id;
//       const fetchUserData = async () => {
//         setIsLoading(true);
//         try {
//           const result = await getuserlistsdatabyid(applyuserId);
//           setGetUserDataById(result);
//         } catch (err) {
//           console.error("獲取用戶數據錯誤:", err);
//           setError("無法獲取用戶數據");
//         } finally {
//           setIsLoading(false);
//         }
//       };
//       fetchUserData();
//     }
//   }, [GetApplyDatabyId]);

//   const apply_job_status_Accept = useForm<z.infer<typeof Apply_Accept_Schema>>({
//     resolver: zodResolver(Apply_Accept_Schema),
//     defaultValues: {
//       userId: UserId,
//       jobId: "",
//       applyuserId: "",
//       job_apply: true,
//       applyId: applyId,
//       applyusername: "",
//     },
//   });

//   const apply_job_status_Reject = useForm<z.infer<typeof Apply_Reject_Schema>>({
//     resolver: zodResolver(Apply_Reject_Schema),
//     defaultValues: {
//       userId: UserId,
//       jobId: "",
//       job_apply: false,
//     },
//   });

//   const apply_task_status_Accept = useForm<
//     z.infer<typeof Apply_Accept_Task_Schema>
//   >({
//     resolver: zodResolver(Apply_Accept_Task_Schema),
//     defaultValues: {
//       applyId: applyId,
//       taskId: "",
//       userId: UserId,
//       task_apply: true,
//       applyuserId: "",
//       applyusername: "",
//     },
//   });

//   const apply_task_status_Reject = useForm<
//     z.infer<typeof Apply_Reject_Task_Schema>
//   >({
//     resolver: zodResolver(Apply_Reject_Task_Schema),
//     defaultValues: {
//       taskId: "",
//       userId: UserId,
//       task_apply: false,
//     },
//   });

//   useEffect(() => {
//     if (GetApplyDatabyId && GetUserDataById.length > 0) {
//       const jobId = GetApplyDatabyId.apply_job_id;
//       const applyuserId = GetApplyDatabyId.apply_user_id;
//       const applyType = GetApplyDatabyId.apply_type;
//       const taskId = GetApplyDatabyId.apply_task_id;
//       const username = GetUserDataById[0].username;

//       if (applyType === "JOB") {
//         apply_job_status_Accept.setValue("jobId", jobId || "");
//         apply_job_status_Accept.setValue("userId", UserId);
//         apply_job_status_Accept.setValue("applyuserId", applyuserId || "");
//         apply_job_status_Accept.setValue("applyId", applyId);
//         apply_job_status_Accept.setValue("applyusername", username || "");

//         apply_job_status_Reject.setValue("jobId", jobId || "");
//         apply_job_status_Reject.setValue("userId", UserId);
//       } else if (applyType === "TASK") {
//         apply_task_status_Accept.setValue("taskId", taskId || "");
//         apply_task_status_Accept.setValue("userId", UserId);
//         apply_task_status_Accept.setValue("applyuserId", applyuserId || "");
//         apply_task_status_Accept.setValue("applyId", applyId);
//         apply_task_status_Accept.setValue("applyusername", username || "");

//         apply_task_status_Reject.setValue("taskId", taskId || "");
//         apply_task_status_Reject.setValue("userId", UserId);
//       }
//     }
//   }, [
//     GetApplyDatabyId,
//     GetUserDataById,
//     UserId,
//     applyId,
//     apply_job_status_Accept,
//     apply_job_status_Reject,
//     apply_task_status_Accept,
//     apply_task_status_Reject,
//   ]);

//   const apply_job_status_Accept_onSubmit = (
//     values: z.infer<typeof Apply_Accept_Schema>
//   ) => {
//     console.log("-- apply_job_status_Accept_data -- :", values, "-- End --");
//     startTransition(() => {
//       Apply_Accept_Action(values);
//     });
//   };

//   const apply_job_status_Reject_onSubmit = (
//     values: z.infer<typeof Apply_Reject_Schema>
//   ) => {
//     console.log("-- apply_job_status_Reject_data -- :", values, "-- End --");
//     startTransition(() => {
//       Apply_Reject_Action(values);
//     });
//   };

//   const apply_task_status_Accept_onSubmit = (
//     values: z.infer<typeof Apply_Accept_Task_Schema>
//   ) => {
//     console.log("-- apply_task_status_Accept_data -- :", values, "-- End --");
//     startTransition(() => {
//       Apply_Accept_Task_Action(values);
//     });
//   };

//   const apply_task_status_Reject_onSubmit = (
//     values: z.infer<typeof Apply_Reject_Task_Schema>
//   ) => {
//     console.log("-- apply_task_status_Reject_data -- :", values, "-- End --");
//     startTransition(() => {
//       Apply_Reject_Task_Action(values);
//     });
//   };

//   return (
//     <>
//     <div style={{ marginLeft: "50px" }}>
//       <Link href={`/user/${UserId}/admin/applyLists/`}>返回</Link>
//       <h1>申請詳情管理</h1>
//       <div>
//         {isLoading && <div>載入中...</div>}
//         {error && <div>錯誤: {error}</div>}
//         {GetApplyDatabyId && (
//           <div>
//             {GetApplyDatabyId.apply_type === "JOB" && (
//               <div key={GetApplyDatabyId.id}>
//                 <p>工作申請</p>
//                 申請人: {GetApplyDatabyId.applicant_name}
//                 <br />
//                 申請編號: {GetApplyDatabyId.apply_code}
//                 <br />
//                 申請工作編號: {GetApplyDatabyId.apply_job_code}
//                 <br />
//                 申請標題: {GetApplyDatabyId.apply_title}
//                 <br />
//                 申請內容: {GetApplyDatabyId.apply_contect}
//                 <br />
//                 <Form {...apply_job_status_Accept}>
//                   <form
//                     onSubmit={apply_job_status_Accept.handleSubmit(
//                       apply_job_status_Accept_onSubmit
//                     )}
//                   >
//                     <Button disabled={isPending}>接受</Button>
//                   </form>
//                 </Form>
//                 <br />
//                 <Form {...apply_job_status_Reject}>
//                   <form
//                     onSubmit={apply_job_status_Reject.handleSubmit(
//                       apply_job_status_Reject_onSubmit
//                     )}
//                   >
//                     <Button disabled={isPending}>拒絕</Button>
//                   </form>
//                 </Form>
//               </div>
//             )}
//             {GetApplyDatabyId.apply_type === "TASK" && (
//               <div key={GetApplyDatabyId.id}>
//                 <p>任務申請</p>
//                 申請人: {GetApplyDatabyId.applicant_name}
//                 <br />
//                 申請編號: {GetApplyDatabyId.apply_code}
//                 <br />
//                 申請工作編號: {GetApplyDatabyId.apply_job_code}
//                 <br />
//                 申請標題: {GetApplyDatabyId.apply_title}
//                 <br />
//                 申請內容: {GetApplyDatabyId.apply_contect}
//                 <br />
//                 <Form {...apply_task_status_Accept}>
//                   <form
//                     onSubmit={apply_task_status_Accept.handleSubmit(
//                       apply_task_status_Accept_onSubmit
//                     )}
//                   >
//                     <Button disabled={isPending}>接受</Button>
//                   </form>
//                 </Form>
//                 <br />
//                 <Form {...apply_task_status_Reject}>
//                   <form
//                     onSubmit={apply_task_status_Reject.handleSubmit(
//                       apply_task_status_Reject_onSubmit
//                     )}
//                   >
//                     <Button disabled={isPending}>拒絕</Button>
//                   </form>
//                 </Form>
//               </div>
//             )}
//           </div>
//         )}
//         {!isLoading && !error && !GetApplyDatabyId && (
//           <div>未找到申請</div>
//         )}
//       </div>

//       </div>
//     </>
//   );
// };

// export default ApplyListsByIdAdmin;