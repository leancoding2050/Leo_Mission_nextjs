// "use client";


// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useEffect, useState ,useTransition} from "react";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { Create_Apply_Schema } from "@/actions/Create-Apply/schema";
// import { 
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage 
// } from "@/components/ui/form";
// import { Create_Apply_Action } from "@/actions/Create-Apply";

// const JobBoardById = () => {

//     const [isPending, startTransition] = useTransition();

//     const param = useParams();
//     const UserId = param?.id as string;;
//     const JobId = param?.joblistid as string;

//     const [ GetJobById , setGetJobById ] = useState([]);
//     const [  GetUserListsById , setGetUserListsById ] = useState([]);

   
//        useEffect(() => {
//            const fetchgetjobbyid = async (id: string) => {
//                const res = await fetch(`/api/Job_Lists_by_ID/${id}`) ;
//                if (!res) {
//                 throw new Error("斷線!");
//             }
//                const data = await res.json() ;
//                setGetJobById(data) ;
//            }
//            fetchgetjobbyid(JobId);
//        }, [JobId])


//     useEffect(() => {
//         const getUserListsDataById = async (id : string) => {
//             const res = await fetch(`/api/User_Lists_by_ID/${id}`);
//             if (!res) {
//                 throw new Error("斷線!");
//             }
//             const result = await res.json();
//             setGetUserListsById(result);
//         }
//         getUserListsDataById(UserId);

//     }, [UserId]);

//     console.log( "GetUserListsById : ", GetUserListsById);
//     console.log( "UserId : ", UserId);


//     const username = GetUserListsById[0]?.username;
//     const contect = "內容自定" ;
//     const title = "標題自定"    ;
//     const job_code = GetJobById[0]?.job_code;


 

//     const apply_create_form = useForm<z.infer<typeof Create_Apply_Schema>>({
//         resolver: zodResolver(Create_Apply_Schema),
//         defaultValues:{
//             job_id: JobId,
//             user_id: UserId,
//             apply_title:title,
//             apply_job_code:job_code,
//             apply_contect:contect,
//             applicant_name:username,
//             apply_type: "JOB",
//         }
//     })


//    useEffect(()=>{
//         if(GetJobById || GetUserListsById){
//             apply_create_form.setValue("apply_title",title);
//             apply_create_form.setValue("apply_contect",contect);
//             apply_create_form.setValue("apply_job_code", job_code);
//             apply_create_form.setValue("applicant_name",username);
//         }
//     },[GetJobById , GetUserListsById])
//     const apply_create_form_onSubmit = (values: z.infer<typeof Create_Apply_Schema>) => {
//         console.log("-- apply_input_data -- :",values,"-- End --" );
//         startTransition(() => {
//             Create_Apply_Action(values)
//         })
//     };

//     return (
//         <div>
//             <div>
            
//             <Link href={`/user/${UserId}/jobLists`} > 上一頁 </Link>

//             <div>
                
//             <Form {...apply_create_form}>
//                 <form onSubmit={apply_create_form.handleSubmit(apply_create_form_onSubmit)}>
//                        { GetJobById.map((d) => {

//                     return(
//                         <div key={d.id}>
//                             {d.job_code},
//                             {d.job_school_name},
//                             {d.job_area},
//                             {d.job_time},
//                             {d.job_subject},
//                             {d.job_place},
//                             {d.job_price},
//                             {d.job_day.split('T')[0]},

                            

//                         </div>
//                     )

                        

//                 }) }

//                 <Button> 申請 </Button>
//                 </form>
//             </Form>

             
//             </div>


//         </div>
//         </div>
//     );
// };

// export default JobBoardById;

// "use client";

// import Link from "next/link";
// import { useParams, useRouter } from "next/navigation";
// import { useEffect, useState, useTransition } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { Form } from "@/components/ui/form";
// import { Create_Apply_Schema } from "@/actions/Create-Apply/schema";
// import { Create_Apply_Action } from "@/actions/Create-Apply";
// import { z } from "zod";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
// import toast, { Toaster } from "react-hot-toast";

// interface Job {
//   id: string;
//   job_code: string;
//   job_school_name: string;
//   job_area: string;
//   job_time_start: string;
//   job_time_end: string;
//   job_subject: string;
//   job_place: string;
//   job_price: number;
//   job_day: string;
// }

// interface User {
//   id: string;
//   username: string;
// }

// const JobBoardById = () => {
//   const [isPending, startTransition] = useTransition();
//   const [GetJobById, setGetJobById] = useState<Job | null>(null);
//   const [GetUserListsById, setGetUserListsById] = useState<User[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const { id: UserId, joblistid: JobId } = useParams<{ id: string; joblistid: string }>();

//   useEffect(() => {
//     const fetchGetJobById = async (id: string) => {
//       try {
//         const res = await fetch(`/api/Job_Lists_by_ID/${id}`, {
//           cache: "no-store",
//         });
//         if (!res.ok) throw new Error("無法獲取工作數據");
//         const data = await res.json();
//         setGetJobById(data);
//       } catch (err) {
//         console.error("獲取工作數據錯誤:", err);
//         setError("無法載入工作數據，請稍後重試。");
//       }
//     };
//     if (JobId) fetchGetJobById(JobId);
//   }, [JobId]);

//   useEffect(() => {
//     const getUserListsDataById = async (id: string) => {
//       try {
//         const res = await fetch(`/api/User_Lists_by_ID/${id}`, {
//           cache: "no-store",
//         });
//         if (!res.ok) throw new Error("無法獲取用戶數據");
//         const result = await res.json();
//         setGetUserListsById(Array.isArray(result) ? result : [result]);
//       } catch (err) {
//         console.error("獲取用戶數據錯誤:", err);
//         setError("無法載入用戶數據，請稍後重試。");
//       }
//     };
//     if (UserId) getUserListsDataById(UserId);
//   }, [UserId]);

//   const apply_create_form = useForm<z.infer<typeof Create_Apply_Schema>>({
//     resolver: zodResolver(Create_Apply_Schema),
//     defaultValues: {
//       job_id: JobId || "",
//       user_id: UserId || "",
//       apply_title: "標題自定",
//       apply_job_code: "",
//       apply_contect: "內容自定",
//       applicant_name: "",
//       apply_type: "JOB",
//     },
//   });

//   useEffect(() => {
//     if (GetJobById && GetUserListsById.length > 0) {
//       apply_create_form.setValue("apply_title", "標題自定");
//       apply_create_form.setValue("apply_contect", "內容自定");
//       apply_create_form.setValue("apply_job_code", GetJobById.job_code);
//       apply_create_form.setValue("applicant_name", GetUserListsById[0].username);
//     }
//   }, [GetJobById, GetUserListsById, apply_create_form]);

//   const apply_create_form_onSubmit = async (values: z.infer<typeof Create_Apply_Schema>) => {
//     startTransition(async () => {
//       try {
//         const result = await Create_Apply_Action(values);
//         if (result.success) {
//           toast.success("申請提交成功！");
//           apply_create_form.reset();
//           router.push(`/user/${UserId}/applyLists`);
//         } else {
//           toast.error(result.error || "申請提交失敗，請稍後重試。");
//         }
//       } catch (err) {
//         console.error("提交錯誤:", err);
//         toast.error("申請提交失敗，請稍後重試。");
//       }
//     });
//   };

//   if (error) {
//     return (
//       <div className="text-center text-red-500 font-noto-sans-tc text-lg">
//         {error}
//       </div>
//     );
//   }

//   if (!GetJobById) {
//     return (
//       <div className="text-center text-primary-1 font-noto-sans-tc text-lg">
//         載入工作數據中...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-white font-noto-sans-tc z-40 ml-[48px] sm:ml-12 md:ml-16 container mx-auto px-4 sm:px-6 lg:px-8 mt-2.5">
//       <Toaster position="top-center" />
//       <div className="mb-4">
//         <Link
//           href={`/user/${UserId}/jobLists`}
//           className="flex items-center text-primary-1 hover:bg-grey-2 px-2 py-1 rounded"
//         >
//           <FontAwesomeIcon icon={faArrowLeft} className="text-base mr-2" />
//           <span>返回</span>
//         </Link>
//       </div>
//       <h1 className="text-2xl font-bold text-primary-1 mb-4">工作詳情</h1>
//       <Form {...apply_create_form}>
//         <form onSubmit={apply_create_form.handleSubmit(apply_create_form_onSubmit)} className="space-y-4">
//           <div key={GetJobById.id} className="border border-grey-2 p-4 rounded hover:bg-grey-2">
//             <p className="text-lg">
//               <span className="font-semibold">工作編號:</span> {GetJobById.job_code}
//             </p>
//             <p>
//               <span className="font-semibold">學校:</span> {GetJobById.job_school_name}
//             </p>
//             <p>
//               <span className="font-semibold">地區:</span> {GetJobById.job_area}
//             </p>
//             <p>
//               <span className="font-semibold">時間:</span> {GetJobById.job_time_start} -{" "}
//               {GetJobById.job_time_end}
//             </p>
//             <p>
//               <span className="font-semibold">科目:</span> {GetJobById.job_subject}
//             </p>
//             <p>
//               <span className="font-semibold">地點:</span> {GetJobById.job_place}
//             </p>
//             <p>
//               <span className="font-semibold">價錢:</span> {GetJobById.job_price}
//             </p>
//             <p>
//               <span className="font-semibold">日期:</span>{" "}
//               {new Date(GetJobById.job_day).toLocaleDateString()}
//             </p>
//           </div>
//           <Button
//             type="submit"
//             disabled={isPending}
//             className="bg-primary-1 text-white hover:bg-grey-2 hover:text-primary-1"
//           >
//             {isPending ? "提交中..." : "申請"}
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default JobBoardById;


"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Create_Apply_Schema } from "@/actions/Create-Apply/schema";
import { Create_Apply_Action } from "@/actions/Create-Apply";
import { z } from "zod";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";

interface Job {
  id: string;
  job_code: string;
  job_school_name: string;
  job_area: string;
  job_time_start: string;
  job_time_end: string;
  job_subject: string;
  job_place: string;
  job_price: number;
  job_day: string;
  job_contect: string;
  job_time_h: number;
}

interface User {
  id: string;
  username: string;
}

// ./app/(user)/user/[id]/jobLists/[joblistid]/page.tsx
interface Apply {
  id: string;
  apply_user_id: string;
  apply_code: string;
  apply_title: string;
  apply_contect: string;
  apply_job_code: string;
  apply_job_id: string;
  applicant_name: string;
  apply_type: "JOB" | "TASK";
  apply_status: boolean;
  apply_task_code: string;
  apply_task_id: string;
  apply_task_job?: string[];
  apply_question?: number | null; // 改為 number | null | undefined
  apply_total_job_in_task?: number | null; // 改為 number | null | undefined
  createdAt?: Date;
}

interface ActionState<TInput> {
  fieldErrors?: {
    [K in keyof TInput]?: string[];
  };
  error?: string | null;
  data?: Apply; // 使用 Apply 型別
}

const JobBoardById = () => {
  const [isPending, startTransition] = useTransition();
  const [GetJobById, setGetJobById] = useState<Job | null>(null);
  const [GetUserListsById, setGetUserListsById] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id: UserId, joblistid: JobId } = useParams<{ id: string; joblistid: string }>();

  useEffect(() => {
    const fetchGetJobById = async (id: string) => {
      try {
        const res = await fetch(`/api/Job_Lists_by_ID/${id}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("無法獲取工作數據");
        const data = await res.json();
        setGetJobById(data);
      } catch (err) {
        console.error("獲取工作數據錯誤:", err);
        setError("無法載入工作數據，請稍後重試。");
      }
    };
    if (JobId) fetchGetJobById(JobId);
  }, [JobId]);

  useEffect(() => {
    const getUserListsDataById = async (id: string) => {
      try {
        const res = await fetch(`/api/User_Lists_by_ID/${id}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("無法獲取用戶數據");
        const result = await res.json();
        setGetUserListsById(Array.isArray(result) ? result : [result]);
      } catch (err) {
        console.error("獲取用戶數據錯誤:", err);
        setError("無法載入用戶數據，請稍後重試。");
      }
    };
    if (UserId) getUserListsDataById(UserId);
  }, [UserId]);

  const apply_create_form = useForm<z.infer<typeof Create_Apply_Schema>>({
    resolver: zodResolver(Create_Apply_Schema),
    defaultValues: {
      job_id: JobId || "",
      user_id: UserId || "",
      apply_title: "",
      apply_job_code: "",
      apply_contect: "",
      applicant_name: "",
      apply_type: "JOB",
    },
  });

  useEffect(() => {
    if (GetJobById && GetUserListsById.length > 0) {
      const title = `${GetJobById.job_school_name || ""} - ${GetJobById.job_place || ""} - ${
        GetJobById.job_area || ""
      } - ${GetJobById.job_subject || ""}`;
      const content = `${GetJobById.job_school_name || ""} - ${GetJobById.job_place || ""} - ${
        GetJobById.job_area || ""
      } - ${GetJobById.job_subject || ""} - ${GetJobById.job_contect || ""} - ${
        GetJobById.job_day ? new Date(GetJobById.job_day).toLocaleDateString("zh-TW") : ""
      } 時間: ${GetJobById.job_time_start || ""} - ${GetJobById.job_time_end || ""} 共: ${
        GetJobById.job_time_h || 0
      } 小時`;

      apply_create_form.setValue("apply_title", title);
      apply_create_form.setValue("apply_contect", content);
      apply_create_form.setValue("apply_job_code", GetJobById.job_code || "");
      apply_create_form.setValue("applicant_name", GetUserListsById[0]?.username || "");
    }
  }, [GetJobById, GetUserListsById, apply_create_form]);

  const apply_create_form_onSubmit = async (values: z.infer<typeof Create_Apply_Schema>) => {
    console.log("onSubmit : ", values, "-- End --");
    startTransition(async () => {
      try {
        const result: ActionState<z.infer<typeof Create_Apply_Schema>> = await Create_Apply_Action(values);
        if (result.data) {
          toast.success("申請提交成功！");
          apply_create_form.reset();
          router.push(`/user/${UserId}/applyLists`);
        } else if (result.error) {
          toast.error(result.error);
        } else if (result.fieldErrors) {
          Object.entries(result.fieldErrors).forEach(([field, errors]) => {
            toast.error(`${field}: ${errors.join(", ")}`);
          });
        }
      } catch (err) {
        console.error("提交錯誤:", err);
        toast.error("申請提交失敗，請稍後重試。");
      }
    });
  };

  if (error) {
    return (
      <div className="text-center text-red-500 font-noto-sans-tc text-lg">{error}</div>
    );
  }

  if (!GetJobById) {
    return (
      <div className="text-center text-primary-1 font-noto-sans-tc text-lg">
        載入工作數據中...
      </div>
    );
  }

  console.log("GetJobById :", GetJobById);

  return (
    <div className="min-h-screen bg-white font-noto-sans-tc z-40 ml-[48px] sm:ml-12 md:ml-16 container mx-auto px-4 sm:px-6 lg:px-8 mt-2.5">
      <Toaster position="top-center" />
      <div className="mb-4">
        <Link
          href={`/user/${UserId}/jobLists`}
          className="flex items-center text-primary-1 hover:bg-grey-2 px-2 py-1 rounded"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-base mr-2" />
          <span>返回</span>
        </Link>
      </div>
      <h1 className="text-2xl font-bold text-primary-1 mb-4">工作詳情</h1>
      <Form {...apply_create_form}>
        <form onSubmit={apply_create_form.handleSubmit(apply_create_form_onSubmit)} className="space-y-4">
          <div key={GetJobById.id} className="border border-grey-2 p-4 rounded hover:bg-grey-2">
            <p className="text-lg">
              <span className="font-semibold">工作編號:</span> {GetJobById.job_code}
            </p>
            <p>
              <span className="font-semibold">學校:</span> {GetJobById.job_school_name}
            </p>
            <p>
              <span className="font-semibold">地區:</span> {GetJobById.job_area}
            </p>
            <p>
              <span className="font-semibold">時間:</span> {GetJobById.job_time_start} -{" "}
              {GetJobById.job_time_end}
            </p>
            <p>
              <span className="font-semibold">科目:</span> {GetJobById.job_subject}
            </p>
            <p>
              <span className="font-semibold">地點:</span> {GetJobById.job_place}
            </p>
            <p>
              <span className="font-semibold">價錢:</span> {GetJobById.job_price}
            </p>
            <p>
              <span className="font-semibold">日期:</span>{" "}
              {new Date(GetJobById.job_day).toLocaleDateString()}
            </p>
          </div>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-primary-1 text-white hover:bg-grey-2 hover:text-primary-1"
          >
            {isPending ? "提交中..." : "申請"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default JobBoardById;