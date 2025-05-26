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


"use client";

import { Apply_Accept_Schema } from "@/actions/Apply-Accept/schema";
import { Apply_Reject_Schema } from "@/actions/Apply-Reject/schema";
import { Apply_Accept_Task_Schema } from "@/actions/Apply-Accept-Task/schema";
import { Apply_Reject_Task_Schema } from "@/actions/Apply-Reject-Task/schema";
import { Apply_Accept_Action } from "@/actions/Apply-Accept";
import { Apply_Reject_Action } from "@/actions/Apply-Reject";
import { Apply_Accept_Task_Action } from "@/actions/Apply-Accept-Task";
import { Apply_Reject_Task_Action } from "@/actions/Apply-Reject-Task";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useSWR from "swr";
import * as z from "zod";

interface Apply {
  id: string;
  apply_user_id: string;
  apply_code: string;
  apply_title: string;
  apply_contect: string;
  apply_task_code: string | null;
  apply_job_code: string | null;
  apply_job_id: string | null;
  apply_task_id: string | null;
  applicant_name: string;
  apply_status: boolean;
  apply_type: "JOB" | "TASK";
}

interface User {
  id: string;
  username: string;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("獲取數據失敗");
  return res.json();
};

const ApplyListsByIdAdmin = () => {
  const param = useParams();
  const UserId = param?.id as string;
  const applyId = param?.applyListsid as string;

  const [isPending, startTransition] = useTransition();

  // 使用 SWR 獲取申請數據
  const { data: GetApplyDatabyId, error: applyError } = useSWR<Apply[]>(
    applyId ? `http://127.0.0.1:8000/api/apply/lists/${applyId}` : null,
    fetcher
  );

  // 使用 SWR 獲取用戶數據
  const applyuserId = GetApplyDatabyId?.[0]?.apply_user_id;
  const { data: GetUserDataById, error: userError } = useSWR<User[]>(
    applyuserId ? `http://127.0.0.1:8000/api/user/lists/${applyuserId}` : null,
    fetcher
  );

  const jobId = GetApplyDatabyId?.[0]?.apply_job_id;
  const applyType = GetApplyDatabyId?.[0]?.apply_type;
  const taskId = GetApplyDatabyId?.[0]?.apply_task_id;
  const username = GetUserDataById?.[0]?.username;

  // JOB 表單
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

  // TASK 表單
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

  // 動態更新表單值
  useEffect(() => {
    if (applyType === "JOB" && jobId && applyuserId && username) {
      apply_job_status_Accept.reset({
        userId: UserId,
        jobId,
        applyuserId,
        job_apply: true,
        applyId,
        applyusername: username,
      });
      apply_job_status_Reject.reset({
        userId: UserId,
        jobId,
        job_apply: false,
      });
    } else if (applyType === "TASK" && taskId && applyuserId && username) {
      apply_task_status_Accept.reset({
        applyId,
        taskId,
        userId: UserId,
        task_apply: true,
        applyuserId,
        applyusername: username,
      });
      apply_task_status_Reject.reset({
        taskId,
        userId: UserId,
        task_apply: false,
      });
    }
  }, [jobId, taskId, applyuserId, applyType, username, UserId, applyId]);

  // 表單提交處理
  const apply_job_status_Accept_onSubmit = (
    values: z.infer<typeof Apply_Accept_Schema>
  ) => {
    console.log("-- apply_job_status_Accept_data -- :", values, "-- End --");
    startTransition(() => {
      Apply_Accept_Action(values);
    });
  };

  const apply_job_status_Reject_onSubmit = (
    values: z.infer<typeof Apply_Reject_Schema>
  ) => {
    console.log("-- apply_job_status_Reject_data -- :", values, "-- End --");
    startTransition(() => {
      Apply_Reject_Action(values);
    });
  };

  const apply_task_status_Accept_onSubmit = (
    values: z.infer<typeof Apply_Accept_Task_Schema>
  ) => {
    console.log("-- apply_task_status_Accept_data -- :", values, "-- End --");
    startTransition(() => {
      Apply_Accept_Task_Action(values);
    });
  };

  const apply_task_status_Reject_onSubmit = (
    values: z.infer<typeof Apply_Reject_Task_Schema>
  ) => {
    console.log("-- apply_task_status_Reject_data -- :", values, "-- End --");
    startTransition(() => {
      Apply_Reject_Task_Action(values);
    });
  };

  // 錯誤和載入處理
  if (applyError || userError)
    return (
      <div className="text-red-500">
        無法載入數據：{applyError?.message || userError?.message}
      </div>
    );
  if (!GetApplyDatabyId || !GetUserDataById) return <div>載入中...</div>;
  if (GetApplyDatabyId.length === 0) return <div>無申請數據</div>;

  return (
    <div className="p-4">
      <Link
        href={`/user/${UserId}/admin/applyLists/`}
        className="text-blue-500 hover:underline"
      >
        返回
      </Link>
      <h1 className="text-2xl font-bold mb-4">申請詳情</h1>

      <div>
        {GetApplyDatabyId.map((d) => (
          <div key={d.id} className="border p-4 rounded mb-4">
            {d.apply_type === "JOB" ? (
              <>
                <p className="font-semibold">工作申請</p>
                <p>申請人: {d.applicant_name}</p>
                <p>申請編號: {d.apply_code}</p>
                <p>申請工作編號: {d.apply_job_code || "無"}</p>
                <p>申請標題: {d.apply_title}</p>
                <p>申請內容: {d.apply_contect}</p>
                <div className="mt-4 space-y-2">
                  <Form {...apply_job_status_Accept}>
                    <form
                      onSubmit={apply_job_status_Accept.handleSubmit(
                        apply_job_status_Accept_onSubmit
                      )}
                    >
                      <Button disabled={isPending}>接受</Button>
                    </form>
                  </Form>
                  <Form {...apply_job_status_Reject}>
                    <form
                      onSubmit={apply_job_status_Reject.handleSubmit(
                        apply_job_status_Reject_onSubmit
                      )}
                    >
                      <Button disabled={isPending} variant="destructive">
                        拒絕
                      </Button>
                    </form>
                  </Form>
                </div>
              </>
            ) : (
              <>
                <p className="font-semibold">任務申請</p>
                <p>申請人: {d.applicant_name}</p>
                <p>申請編號: {d.apply_code}</p>
                <p>申請任務編號: {d.apply_task_code || "無"}</p>
                <p>申請標題: {d.apply_title}</p>
                <p>申請內容: {d.apply_contect}</p>
                <div className="mt-4 space-y-2">
                  <Form {...apply_task_status_Accept}>
                    <form
                      onSubmit={apply_task_status_Accept.handleSubmit(
                        apply_task_status_Accept_onSubmit
                      )}
                    >
                      <Button disabled={isPending}>接受</Button>
                    </form>
                  </Form>
                  <Form {...apply_task_status_Reject}>
                    <form
                      onSubmit={apply_task_status_Reject.handleSubmit(
                        apply_task_status_Reject_onSubmit
                      )}
                    >
                      <Button disabled={isPending} variant="destructive">
                        拒絕
                      </Button>
                    </form>
                  </Form>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplyListsByIdAdmin;