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

// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
//   } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import DatePicker from "react-multi-date-picker";
// import { SWR_SchoolName } from "../fatchdata/swr_schoolname";
// import { SWR_Place_Select } from "../fatchdata/swr_place_select";
// import { SWR_Areas_Select } from "../fatchdata/swr_areas_select";
// import { useParams } from "next/navigation";
// import { Edit_Job_schema } from "@/actions/Edit-Job/schema";
// import { Edit_Job_Action } from "@/actions/Edit-Job";
// import { SWR_Subject_Select_noUserSubject } from "../fatchdata/swr_subject_select_noUserSubject";


// const EditJobForm = () => {

//   const param = useParams();
// //   console.log(param)
//   const UserId = param?.id as string;
//   const JobId = param?.jobListsid as string;
//  const [ GetJobById , setGetJobById ] = useState([]);

//     useEffect(() => {
//         const fetchgetjobbyid = async (id: string) => {
//             const res = await fetch(`/api/Job_Lists_by_ID/${id}`) ;
//             const data = await res.json() ;
//             setGetJobById(data) ;
//         }
//         fetchgetjobbyid(JobId);
//     },[JobId])

//     console.log(" GetJobById : ",GetJobById[0])


//     const [ jobcode , setjobcode ] = useState('');
//     const [ jobsubject , setjobsubject ] = useState('');
//     const [ jobplace , setjobplace ] = useState('');
//     const [ jobarea , setjobarea ] = useState('');
//     const [ jobschoolname , setjobschoolname ] = useState('');
//     const [ jobtime , setjobtime ] = useState('');
//     const [ jobprice , setjobprice ] = useState(0);
//     const [ jobday , setjobday ] = useState('');
//     const [ jobpublic , setjobpublic ] = useState<boolean>();
//     const [ showprice , setshowprice ] = useState<boolean>();
//     const [ teacher , setteacher ] = useState("null");
//     const [ getTeacher , setGetTeacher ] = useState([]);

//   const [ isPending , startTransition ] = useTransition();



//   const job_edit_form = useForm<z.infer<typeof Edit_Job_schema>>({
//     resolver: zodResolver(Edit_Job_schema),
//     defaultValues:{
//       userId: UserId,
//       targetjobId:JobId || "",
//       job_code:jobcode || "",
//       job_subject : jobsubject || "",
//       job_place:jobplace || "",
//       job_area: jobarea || "",
//       job_school_name:jobschoolname || "",
//       job_time:jobtime || "",
//       job_price: jobprice || 0 ,
//       job_day: jobday || "",
//       job_public : jobpublic,
//       showprice: showprice ,
//       teacher: teacher || "",
//     }
//   })

//   useEffect(() => {
//     const fetchteacherdata = async() =>{
//       const res = await fetch(`/api/User_Lists`);
//       const data = await res.json();
//       setGetTeacher(data);
//     }
//     fetchteacherdata();
//   },[])

//  useEffect(() => {
//    if(GetJobById[0]){
//         setjobcode(GetJobById[0].job_code);
//         job_edit_form.setValue("job_code",GetJobById[0].job_code)

//         setjobsubject(GetJobById[0].job_subject);
//         job_edit_form.setValue("job_subject",GetJobById[0].job_subject)

//         setjobplace(GetJobById[0].job_place);
//         job_edit_form.setValue("job_place",GetJobById[0].job_place)

//         setjobarea(GetJobById[0].job_area);
//         job_edit_form.setValue("job_area",GetJobById[0].job_area)

//         setjobschoolname(GetJobById[0].job_school_name);
//         job_edit_form.setValue("job_school_name",GetJobById[0].job_school_name)
    
//         setjobtime(GetJobById[0].job_time);
//         job_edit_form.setValue('job_time',GetJobById[0].job_time)

//         setjobprice(GetJobById[0].job_price);
//         job_edit_form.setValue('job_price',GetJobById[0].job_price)

//         setjobday(GetJobById[0].job_day);
//         job_edit_form.setValue('job_day',GetJobById[0].job_day)

//         setjobpublic(GetJobById[0].job_public);
//         job_edit_form.setValue('job_public',GetJobById[0].job_public )

//         setshowprice(GetJobById[0].show_price);
//         job_edit_form.setValue('showprice',GetJobById[0].showprice )

        
//         setjobpublic(GetJobById[0].job_public );
//         setshowprice(GetJobById[0].showprice );

//         const teacherValue = GetJobById[0]?.teacher || "";
//         setteacher(teacherValue);
//         job_edit_form.setValue('teacher', teacherValue);
//    }
 
//   }, [GetJobById]);

  
//   console.log(showprice)
  


//   const job_edit_form_onSubmit = (values:z.infer<typeof Edit_Job_schema>) => {
//     console.log("-- job_input_data -- :",values,"-- End --" );
//     startTransition(() => {
//       Edit_Job_Action(values);
//     })

//   }


//   return (
//     <div>
//       EditJobForm
//         <Form {...job_edit_form}>
//           <form onSubmit={job_edit_form.handleSubmit(job_edit_form_onSubmit)}>

//             <div className="mb-4">
//             <FormField
//               control={job_edit_form.control}
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
//               control={job_edit_form.control}
//               name="job_subject"
//               render={({ field , fieldState}) => (
//                 <FormItem>
//                   <FormLabel>job_subject</FormLabel>
//                   <FormControl>
//                     <SWR_Subject_Select_noUserSubject field={field} fieldState={fieldState}/>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={job_edit_form.control}
//               name="job_place"
//               render={({ field , fieldState}) => (
//                 <FormItem>
//                   <FormLabel>job_place</FormLabel>
//                   <FormControl>
//                     <SWR_Place_Select field={field} fieldState={fieldState}/>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={job_edit_form.control}
//               name="job_area"
//               render={({ field  , fieldState}) => (
//                 <FormItem>
//                   <FormLabel>job_area</FormLabel>
//                   <FormControl>
//                     <SWR_Areas_Select  field={field} fieldState={fieldState} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={job_edit_form.control}
//               name="job_school_name"
//               render={({ field , fieldState}) => (
//                 <FormItem>
//                   <FormLabel>job_school_name</FormLabel>
//                   <FormControl>
//                     <SWR_SchoolName field={field} fieldState={fieldState} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={job_edit_form.control}
//               name="job_time"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>job_time</FormLabel>
//                   <FormControl>
//                     <Input placeholder="job_time" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={job_edit_form.control}
//               name="job_price"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>job_price</FormLabel>
//                   <FormControl>
//                   <Input
//             placeholder="job_price"
//                 defaultValue={field.value != null ? Number(field.value) : 0}
//                 onChange={(e) => {
//                   const newValue = Number(e.target.value);
//                   field.onChange(isNaN(newValue) ? 0 : newValue);
//                 }}
//           />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//           <FormField
//             control={job_edit_form.control}
//             name="job_day"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>工作日期</FormLabel>
//                 <FormControl>
//                   <DatePicker
//                     value={field.value ? new Date(field.value) : null}
//                     onChange={(date) => {
//                       const formattedDate = date && !Array.isArray(date) ? date.toDate().toISOString() : "";
//                       field.onChange(formattedDate);
//                     }}
//                     format="YYYY-MM-DD"
//                     placeholder="工作日期"
//                     disabled={isPending}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//             </div>


//             <div className="mb-4">
//             <FormField
//               control={job_edit_form.control}
//               name="teacher"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>teacher</FormLabel>
//                   <FormControl>
//                   <Select
//                 defaultValue={String(field.value) || ""}
//                 onValueChange={(value) => field.onChange(value) }
//             >
//                 <SelectTrigger>
//                     <SelectValue placeholder={ field.value || "選擇教師" }>{ field.value || "選擇教師" }</SelectValue>
//                 </SelectTrigger>
//                 <SelectContent>
//                     {
//                         getTeacher?.map((datas:any) => {
//                             return(
//                                 <SelectItem value={String(datas.username)} key={datas.id}>
//                                     {datas.nickname} : role {datas.role}
//                                 </SelectItem>
//                             )
//                         })
//                     }

//                 </SelectContent>
//             </Select>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={job_edit_form.control}
//               name="showprice"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>showprice</FormLabel>
//                   <FormControl>
//                   <Switch  checked={field.value}  onCheckedChange={
//                     (value)=>{
//                     field.onChange(value)
//                     setshowprice(value)    
//                     }

//                     } />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={job_edit_form.control}
//               name="job_public"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>是否公開</FormLabel>
//                   <FormControl>
//                   <Switch  checked={field.value}  onCheckedChange={
//                     (value)=>{
//                         field.onChange(value)
//                         setjobpublic(value)
//                     }
                    
//                     } />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>


//               <Button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//                 Submit
//               </Button>


//           </form>
//         </Form>

//     </div>
//   )
// }
// export default EditJobForm

// "use client";
// import * as z from "zod";
// import { useEffect, useState, useTransition } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Switch } from "@/components/ui/switch";
// import DatePicker from "react-multi-date-picker";
// import { SWR_SchoolName_Multi } from "../fatchdata/swr_schoolname";
// import { SWR_Place_Select } from "../fatchdata/swr_place_select";
// import { SWR_Areas_Select } from "../fatchdata/swr_areas_select";
// import { useParams } from "next/navigation";
// import { Edit_Job_schema } from "@/actions/Edit-Job/schema";
// import { Edit_Job_Action } from "@/actions/Edit-Job";
// import { SWR_Subject_Select_noUserSubject } from "../fatchdata/swr_subject_select_noUserSubject";

// interface JobData {
//   id: string;
//   job_code: string;
//   job_subject: string;
//   job_place: string;
//   job_area: string;
//   job_school_name: string;
//   job_time_start: string;
//   job_time_end: string;
//   job_time_h: string;
//   job_price: number;
//   job_day: string;
//   job_public: boolean;
//   showprice: boolean;
//   teacher: string | null;
//   job_contect?: string;
//   job_title?: string;
//   job_complete: boolean;
//   job_admin_content: string;
//   job_admin_remake_authorname: string;
//   job_admin_remake_authorid: string;
//   job_admin_createdAt: string;
//   job_task_id?: string;
//   job_task_code: string;
//   job_in_task?: boolean;
//   job_apply: boolean;
//   authorname?: string | null;
//   is_confirm: boolean;
//   job_user_id?: string | null;
//   salary_id?: string | null;
// }

// interface TeacherData {
//   id: string;
//   username: string;
//   nickname: string;
//   role: string;
// }

// const EditJobForm = () => {
//   const param = useParams();
//   const UserId = param?.id as string;
//   const JobId = param?.jobListsid as string;
//   const [isPending, startTransition] = useTransition();
//   const [GetJobById, setGetJobById] = useState<JobData[]>([]);
//   const [getTeacher, setGetTeacher] = useState<TeacherData[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const job_edit_form = useForm<z.infer<typeof Edit_Job_schema>>({
//     resolver: zodResolver(Edit_Job_schema),
//     defaultValues: {
//       userId: UserId,
//       targetjobId: JobId,
//       job_code: "",
//       job_subject: "",
//       job_place: "",
//       job_area: "",
//       job_school_name: "",
//       job_time: "",
//       job_price: 0,
//       job_day: "",
//       job_public: false,
//       showprice: false,
//       teacher: "",
//     },
//   });

//   useEffect(() => {
//     const fetchgetjobbyid = async (id: string) => {
//       setIsLoading(true);
//       try {
//         const res = await fetch(`/api/Job_Lists_by_ID/${id}`);
//         if (!res.ok) throw new Error("無法獲取工作資料");
//         const data = await res.json();
//         setGetJobById(Array.isArray(data) ? data : [data]);
//         setError(null);
//       } catch (error) {
//         console.error("獲取工作資料失敗：", error);
//         setError("無法載入工作資料，請稍後再試");
//         setGetJobById([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchgetjobbyid(JobId);
//   }, [JobId]);

//   useEffect(() => {
//     const fetchteacherdata = async () => {
//       try {
//         const res = await fetch(`/api/User_Lists`);
//         if (!res.ok) throw new Error("無法獲取教師列表");
//         const data = await res.json();
//         setGetTeacher(data);
//       } catch (error) {
//         console.error("獲取教師列表失敗：", error);
//       }
//     };
//     fetchteacherdata();
//   }, []);

//   useEffect(() => {
//     const Job = GetJobById[0];
//     if (Job) {
//       job_edit_form.reset({
//         userId: UserId,
//         targetjobId: JobId,
//         job_code: Job.job_code || "",
//         job_subject: Job.job_subject || "",
//         job_place: Job.job_place || "",
//         job_area: Job.job_area || "",
//         job_school_name: Job.job_school_name || "",
//         job_time: `${Job.job_time_start || ""} - ${Job.job_time_end || ""}`,
//         job_price: Job.job_price ?? 0,
//         job_day: Job.job_day ? new Date(Job.job_day).toISOString().split("T")[0] : "",
//         job_public: Job.job_public ?? false,
//         showprice: Job.showprice ?? false,
//         teacher: Job.teacher || "",
//       });
//     }
//   }, [GetJobById, job_edit_form, UserId, JobId]);

//   const job_edit_form_onSubmit = (values: z.infer<typeof Edit_Job_schema>) => {
//     console.log("-- job_input_data -- :", values, "-- End --");
//     startTransition(() => {
//       Edit_Job_Action(values);
//     });
//   };

//   if (isLoading) return <div>載入中...</div>;
//   if (error) return <div>{error}</div>;

//   console.log("GetJobById : ", GetJobById, " -- End --");

//   return (
//     <div>
//       <Form {...job_edit_form}>
//         <form onSubmit={job_edit_form.handleSubmit(job_edit_form_onSubmit)} className="space-y-4">
//           <FormField
//             control={job_edit_form.control}
//             name="job_code"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>工作編號 <span className="text-red-500">*</span></FormLabel>
//                 <FormControl>
//                   <Input placeholder="輸入工作編號" {...field} disabled={isPending} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={job_edit_form.control}
//             name="job_subject"
//             render={({ field, fieldState }) => (
//               <FormItem>
//                 <FormLabel>工作科目 <span className="text-red-500">*</span></FormLabel>
//                 <FormControl>
//                   <SWR_Subject_Select_noUserSubject field={field} fieldState={fieldState} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={job_edit_form.control}
//             name="job_place"
//             render={({ field, fieldState }) => (
//               <FormItem>
//                 <FormLabel>工作地點 <span className="text-red-500">*</span></FormLabel>
//                 <FormControl>
//                   <SWR_Place_Select field={field} fieldState={fieldState} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={job_edit_form.control}
//             name="job_area"
//             render={({ field, fieldState }) => (
//               <FormItem>
//                 <FormLabel>工作地區 <span className="text-red-500">*</span></FormLabel>
//                 <FormControl>
//                   <SWR_Areas_Select field={field} fieldState={fieldState} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={job_edit_form.control}
//             name="job_school_name"
//             render={({ field, fieldState }) => (
//               <FormItem>
//                 <FormLabel>學校名稱 <span className="text-red-500">*</span></FormLabel>
//                 <FormControl>
//                   <SWR_SchoolName_Multi field={field} fieldState={fieldState} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={job_edit_form.control}
//             name="job_time"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>工作時間 <span className="text-red-500">*</span></FormLabel>
//                 <FormControl>
//                   <Input placeholder="輸入工作時間 (格式: HHMM - HHMM)" {...field} disabled={isPending} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={job_edit_form.control}
//             name="job_price"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>工作價格 <span className="text-red-500">*</span></FormLabel>
//                 <FormControl>
//                   <Input
//                     placeholder="輸入工作價格"
//                     value={field.value ?? ""}
//                     onChange={(e) => {
//                       const newValue = Number(e.target.value);
//                       field.onChange(isNaN(newValue) ? 0 : newValue);
//                     }}
//                     disabled={isPending}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={job_edit_form.control}
//             name="job_day"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>工作日期 <span className="text-red-500">*</span></FormLabel>
//                 <FormControl>
//                   <DatePicker
//                     value={field.value ? new Date(field.value) : null}
//                     onChange={(date) => {
//                       const formattedDate = date && !Array.isArray(date) ? date.toDate().toISOString().split("T")[0] : "";
//                       field.onChange(formattedDate);
//                     }}
//                     format="YYYY-MM-DD"
//                     placeholder="選擇工作日期"
//                     disabled={isPending}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={job_edit_form.control}
//             name="teacher"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>教師 <span className="text-red-500">*</span></FormLabel>
//                 <FormControl>
//                   <Select
//                     value={field.value}
//                     onValueChange={field.onChange}
//                     disabled={isPending}
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="選擇教師" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {getTeacher.map((datas) => (
//                         <SelectItem value={datas.username} key={datas.id}>
//                           {datas.nickname} : role {datas.role}
//                         </SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={job_edit_form.control}
//             name="showprice"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>顯示價格</FormLabel>
//                 <FormControl>
//                   <Switch checked={field.value} onCheckedChange={field.onChange} disabled={isPending} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={job_edit_form.control}
//             name="job_public"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>是否公開</FormLabel>
//                 <FormControl>
//                   <Switch checked={field.value} onCheckedChange={field.onChange} disabled={isPending} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <Button
//             type="submit"
//             className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             disabled={isPending}
//           >
//             {isPending ? "提交中..." : "提交"}
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default EditJobForm;

"use client";
import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import DatePicker from "react-multi-date-picker";
import { SWR_SchoolName_Multi } from "../fatchdata/swr_schoolname";
import { SWR_Place_Select } from "../fatchdata/swr_place_select";
import { SWR_Areas_Select } from "../fatchdata/swr_areas_select";
import { useParams } from "next/navigation";
import { Edit_Job_schema } from "@/actions/Edit-Job/schema";
import { Edit_Job_Action } from "@/actions/Edit-Job";
import { SWR_Subject_Select_noUserSubject } from "../fatchdata/swr_subject_select_noUserSubject";

interface MissionSubject {
  id: number;
  mission_subject: string;
}

interface MissionPlace {
  id: number;
  mission_place: string;
}

interface MissionArea {
  id: number;
  mission_area: string;
}

interface JobData {
  id: string;
  job_code: string;
  job_subject: string;
  job_place: string;
  job_area: string;
  job_school_name: string;
  job_time_start: string;
  job_time_end: string;
  job_time_h: string;
  job_price: number;
  job_day: string;
  job_public: boolean;
  showprice: boolean;
  teacher: string | null;
  job_contect?: string;
  job_title?: string;
  job_complete: boolean;
  job_admin_content: string;
  job_admin_remake_authorname: string;
  job_admin_remake_authorid: string;
  job_admin_createdAt: string;
  job_task_id?: string;
  job_task_code: string;
  job_in_task?: boolean;
  job_apply: boolean;
  authorname?: string | null;
  is_confirm: boolean;
  job_user_id?: string | null;
  salary_id?: string | null;
}

interface TeacherData {
  id: string;
  username: string;
  nickname: string;
  role: string;
}

const EditJobForm = () => {
  const param = useParams();
  const UserId = param?.id as string;
  const JobId = param?.jobListsid as string;
  const [isPending, startTransition] = useTransition();
  const [GetJobById, setGetJobById] = useState<JobData[]>([]);
  const [getTeacher, setGetTeacher] = useState<TeacherData[]>([]);
  const [subjects, setSubjects] = useState<MissionSubject[]>([]);
  const [places, setPlaces] = useState<MissionPlace[]>([]);
  const [areas, setAreas] = useState<MissionArea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const job_edit_form = useForm<z.infer<typeof Edit_Job_schema>>({
    resolver: zodResolver(Edit_Job_schema),
    defaultValues: {
      userId: UserId,
      targetjobId: JobId,
      job_code: "",
      job_subject: "",
      job_place: "",
      job_area: "",
      job_school_name: "",
      job_time: "",
      job_price: 0,
      job_day: "",
      job_public: false,
      showprice: false,
      teacher: "",
    },
  });

  useEffect(() => {
    const fetchgetjobbyid = async (id: string) => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/Job_Lists_by_ID/${id}`);
        if (!res.ok) throw new Error("無法獲取工作資料");
        const data = await res.json();
        setGetJobById(Array.isArray(data) ? data : [data]);
        setError(null);
      } catch (error) {
        console.error("獲取工作資料失敗：", error);
        setError("無法載入工作資料，請稍後再試");
        setGetJobById([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchgetjobbyid(JobId);
  }, [JobId]);

  useEffect(() => {
    const fetchteacherdata = async () => {
      try {
        const res = await fetch(`/api/User_Lists`);
        if (!res.ok) throw new Error("無法獲取教師列表");
        const data = await res.json();
        setGetTeacher(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("獲取教師列表失敗：", error);
      }
    };

    const fetchSubjects = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/mission/missionsubject/");
        if (!res.ok) throw new Error("無法獲取科目列表");
        const data = await res.json();
        setSubjects(data);
      } catch (error) {
        console.error("獲取科目列表失敗：", error);
      }
    };

    const fetchPlaces = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/mission/missionplace/");
        if (!res.ok) throw new Error("無法獲取地點列表");
        const data = await res.json();
        setPlaces(data);
      } catch (error) {
        console.error("獲取地點列表失敗：", error);
      }
    };

    const fetchAreas = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/mission/missionarea/");
        if (!res.ok) throw new Error("無法獲取地區列表");
        const data = await res.json();
        setAreas(data);
      } catch (error) {
        console.error("獲取地區列表失敗：", error);
      }
    };

    fetchSubjects();
    fetchPlaces();
    fetchAreas();
    fetchteacherdata();
  }, []);

  useEffect(() => {
    const Job = GetJobById[0];
    if (Job && subjects.length > 0 && places.length > 0 && areas.length > 0 && getTeacher.length > 0) {
      const normalizedSubject = subjects.find(s => s.mission_subject.toLowerCase() === Job.job_subject.toLowerCase())?.mission_subject || Job.job_subject;
      const normalizedPlace = places.find(p => p.mission_place.toLowerCase() === Job.job_place.toLowerCase())?.mission_place || Job.job_place;
      const normalizedArea = areas.find(a => a.mission_area.toLowerCase() === Job.job_area.toLowerCase())?.mission_area || Job.job_area;
      const normalizedTeacher = getTeacher.find(t => t.username === Job.teacher)?.username || Job.teacher || "";

      job_edit_form.reset({
        userId: UserId,
        targetjobId: JobId,
        job_code: Job.job_code || "",
        job_subject: normalizedSubject,
        job_place: normalizedPlace,
        job_area: normalizedArea,
        job_school_name: Job.job_school_name || "",
        job_time: `${Job.job_time_start || ""} - ${Job.job_time_end || ""}`,
        job_price: Job.job_price ?? 0,
        job_day: Job.job_day ? new Date(Job.job_day).toISOString().split("T")[0] : "",
        job_public: Job.job_public ?? false,
        showprice: Job.showprice ?? false,
        teacher: normalizedTeacher,
      });
    }
  }, [GetJobById, subjects, places, areas, getTeacher, job_edit_form, UserId, JobId]);

  const job_edit_form_onSubmit = (values: z.infer<typeof Edit_Job_schema>) => {
    console.log("-- job_input_data -- :", values, "-- End --");
    startTransition(() => {
      Edit_Job_Action(values);
    });
  };

  if (isLoading) return <div>載入中...</div>;
  if (error) return <div>{error}</div>;

  console.log("GetJobById : ", GetJobById, " -- End --");

  return (
    <div>
      <Form {...job_edit_form}>
        <form onSubmit={job_edit_form.handleSubmit(job_edit_form_onSubmit)} className="space-y-4">
          <FormField
            control={job_edit_form.control}
            name="job_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>工作編號 <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="輸入工作編號" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={job_edit_form.control}
            name="job_subject"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>工作科目 <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <SWR_Subject_Select_noUserSubject field={field} fieldState={fieldState} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={job_edit_form.control}
            name="job_place"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>工作地點 <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <SWR_Place_Select field={field} fieldState={fieldState} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={job_edit_form.control}
            name="job_area"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>工作地區 <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <SWR_Areas_Select field={field} fieldState={fieldState} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={job_edit_form.control}
            name="job_school_name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>學校名稱 <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <SWR_SchoolName_Multi field={field} fieldState={fieldState} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={job_edit_form.control}
            name="job_time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>工作時間 <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input placeholder="輸入工作時間 (格式: HHMM - HHMM)" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={job_edit_form.control}
            name="job_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>工作價格 <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input
                    placeholder="輸入工作價格"
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const newValue = Number(e.target.value);
                      field.onChange(isNaN(newValue) ? 0 : newValue);
                    }}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={job_edit_form.control}
            name="job_day"
            render={({ field }) => (
              <FormItem>
                <FormLabel>工作日期 <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <DatePicker
                    value={field.value ? new Date(field.value) : null}
                    onChange={(date) => {
                      const formattedDate = date && !Array.isArray(date) ? date.toDate().toISOString().split("T")[0] : "";
                      field.onChange(formattedDate);
                    }}
                    format="YYYY-MM-DD"
                    placeholder="選擇工作日期"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={job_edit_form.control}
            name="teacher"
            render={({ field }) => (
              <FormItem>
                <FormLabel>教師 <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isPending}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="選擇教師" />
                    </SelectTrigger>
                    <SelectContent>
                      {getTeacher.map((datas) => (
                        <SelectItem value={datas.username} key={datas.id}>
                          {datas.nickname} : role {datas.role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={job_edit_form.control}
            name="showprice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>顯示價格</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={job_edit_form.control}
            name="job_public"
            render={({ field }) => (
              <FormItem>
                <FormLabel>是否公開</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={isPending}
          >
            {isPending ? "提交中..." : "提交"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditJobForm;