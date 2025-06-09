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


"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, 
  // FormControl, FormField, FormItem, FormLabel, FormMessage 
} from "@/components/ui/form";
import { Create_Apply_Schema } from "@/actions/Create-Apply/schema";
import { Create_Apply_Action } from "@/actions/Create-Apply";
import { z } from "zod";

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
}

interface User {
  id: string;
  username: string;
}

const JobBoardById = () => {
  const [isPending, startTransition] = useTransition();
  const [GetJobById, setGetJobById] = useState<Job[]>([]);
  const [GetUserListsById, setGetUserListsById] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { id: UserId, joblistid: JobId } = useParams<{ id: string; joblistid: string }>();

  // useEffect(() => {
  //   const fetchGetJobById = async (id: string) => {
  //     try {
  //       const res = await fetch(`/api/Job_Lists_by_ID/${id}`);
  //       if (!res.ok) throw new Error("Failed to fetch job data");
  //       const data = await res.json();
  //       setGetJobById(data);
  //     } catch (err) {
  //       setError("Unable to load job data. Please try again later.");
  //     }
  //   };
  //   if (JobId) fetchGetJobById(JobId);
  // }, [JobId]);

  // useEffect(() => {
  //   const getUserListsDataById = async (id: string) => {
  //     try {
  //       const res = await fetch(`/api/User_Lists_by_ID/${id}`);
  //       if (!res.ok) throw new Error("Failed to fetch user data");
  //       const result = await res.json();
  //       setGetUserListsById(result);
  //     } catch (err) {
  //       setError("Unable to load user data. Please try again later.");
  //     }
  //   };
  //   if (UserId) getUserListsDataById(UserId);
  // }, [UserId]);

  useEffect(() => {
  const fetchGetJobById = async (id: string) => {
    try {
      const res = await fetch(`/api/Job_Lists_by_ID/${id}`);
      if (!res.ok) throw new Error("Failed to fetch job data");
      const data = await res.json();
      setGetJobById(data);
    } catch (err) {
      console.error("Error fetching job data:", err); // 記錄錯誤
      setError("Unable to load job data. Please try again later.");
    }
  };
  if (JobId) fetchGetJobById(JobId);
}, [JobId]);

useEffect(() => {
  const getUserListsDataById = async (id: string) => {
    try {
      const res = await fetch(`/api/User_Lists_by_ID/${id}`);
      if (!res.ok) throw new Error("Failed to fetch user data");
      const result = await res.json();
      setGetUserListsById(result);
    } catch (err) {
      console.error("Error fetching user data:", err); // 記錄錯誤
      setError("Unable to load user data. Please try again later.");
    }
  };
  if (UserId) getUserListsDataById(UserId);
}, [UserId]);

  const apply_create_form = useForm<z.infer<typeof Create_Apply_Schema>>({
    resolver: zodResolver(Create_Apply_Schema),
    defaultValues: {
      job_id: JobId,
      user_id: UserId,
      apply_title: "標題自定",
      apply_job_code: "",
      apply_contect: "內容自定",
      applicant_name: "",
      apply_type: "JOB",
    },
  });

  useEffect(() => {
    if (GetJobById[0] && GetUserListsById[0]) {
      apply_create_form.setValue("apply_title", "標題自定");
      apply_create_form.setValue("apply_contect", "內容自定");
      apply_create_form.setValue("apply_job_code", GetJobById[0].job_code);
      apply_create_form.setValue("applicant_name", GetUserListsById[0].username);
    }
  }, [GetJobById, GetUserListsById, apply_create_form]);

  const apply_create_form_onSubmit = async (values: z.infer<typeof Create_Apply_Schema>) => {
    startTransition(async () => {
      try {
        await Create_Apply_Action(values);
        alert("Application submitted successfully!");
        apply_create_form.reset();
      } catch (err) {
        console.log(" submit error " , err)
        // alert("Failed to submit application. Please try again.");
      }
    });
  };

  if (error) return <div>{error}</div>;
  if (!GetJobById.length) return <div>Loading job data...</div>;

  return (
    <div className="p-4">
      <Link href={`/user/${UserId}/jobLists`} className="text-blue-500 hover:underline">
        上一頁
      </Link>
      <Form {...apply_create_form}>
        <form onSubmit={apply_create_form.handleSubmit(apply_create_form_onSubmit)} className="space-y-4">
          {GetJobById.map((job) => (
            <div key={job.id} className="border p-4 rounded-md">
              <p><strong>Job Code:</strong> {job.job_code}</p>
              <p><strong>School:</strong> {job.job_school_name}</p>
              <p><strong>Area:</strong> {job.job_area}</p>
              <p><strong>Time:</strong> {job.job_time_start} - {job.job_time_end}</p>
              <p><strong>Subject:</strong> {job.job_subject}</p>
              <p><strong>Place:</strong> {job.job_place}</p>
              <p><strong>Price:</strong> {job.job_price}</p>
              <p><strong>Day:</strong> {new Date(job.job_day).toLocaleDateString()}</p>
            </div>
          ))}
          <Button type="submit" disabled={isPending}>
            {isPending ? "Submitting..." : "申請"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default JobBoardById;