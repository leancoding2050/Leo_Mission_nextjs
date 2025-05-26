// "use client";
// import * as z from "zod";
// import { use, useEffect, useState, useTransition } from "react";
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
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";


// import { Switch } from "@/components/ui/switch";
// import { SWR_Subject_Select } from "../fatchdata/swr_subject_select";
// import { SWR_Areas_Select } from "../fatchdata/swr_areas_select";
// import { useParams } from "next/navigation";
// import { Edit_Task_Schema } from "@/actions/Edit-Task/schema";
// import { Edit_Task_Action } from "@/actions/Edit-Task";
// import { SWR_Subject_Select_noUserSubject } from "../fatchdata/swr_subject_select_noUserSubject";
// const EditTaskForm = () => {
//   const param = useParams();
//   const UserId = param?.id as string;
//   const targettaskId = param?.taskListsid as string;
//   const [ isPpending , startTransition ] = useTransition();
//   const [ isPopupVisible , setPopupVisible ] = useState(false);
//   const [ searchQuery , setSearchQuery ] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [ GetJobLists , setGetJobLists ] = useState([]) ;
//   const [ searchField , setSearchField ] = useState("all");
//   const [ windowSize , setWindowSize ] = useState({
//     width: typeof window !== 'undefined' ? window.innerWidth : 0,
//     height: typeof window !== 'undefined' ? window.innerHeight : 0,
//   })
//   const [ getTeacher , setGetTeacher ] = useState([]);
//   const [ GetTaskById , setGetTaskById ] = useState([]);



//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);


//   useEffect(()=>{
//     const fetchjoblistsdata = async () => {
//       const res = await fetch(`/api/Job_Lists`) ;
//       const data = await res.json() ;
//       setGetJobLists(data) ;
//     }
//     fetchjoblistsdata()
//   },[])
//   // console.log(" GetJobLists : ",GetJobLists," -- End -- ") ;


//   useEffect(() => {
//     const fetchteacherdata = async() =>{
//       const res = await fetch(`/api/User_Lists`);
//       const data = await res.json();
//       setGetTeacher(data);
//     }
//     fetchteacherdata();
//   },[])

//   // console.log("Teacher : ",getTeacher, " -- End --")
//   const handleInputFocus = () => {
//     setPopupVisible(true);
//   };

//   const handleClosePopup = () => {
//     setPopupVisible(false);
//   };

//   const handleSearch =  async (event: React.ChangeEvent<HTMLInputElement>) => {
//     try {
//       const response = await fetch(`/api/Job_Lists_search?query=${searchQuery}&field=${searchField}`);
//       const data = await response.json();
//       setSearchResults(data);
//     } catch (error) {
//       console.error("搜尋失敗:", error)
//     }
//   };

// const handleAddJob = (job:any) => {
//   const currentJobs = task_edit_form.getValues("job");
//   const currentJobIds = task_edit_form.getValues("jobidbyarray");
//   const currentSchoolNames = task_edit_form.getValues("school_name");
  


// console.log(" what is :",job);  

//   const date = new Date(job.job_day.split('T')[0]);
//   const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
//   // 取得星期幾
// const dayOfWeek = date.toLocaleDateString('zh-TW', { weekday: 'long' });

// const currentjobname = `${job.job_code}-${job.job_school_name}-${job.job_subject}-${job.job_day.split('T')[0]} `


// const currentjobnameWithWeekday = `${currentjobname}- ${formattedDate} -${dayOfWeek}`;

//   // 檢查是否已經存在
//   if (currentJobs.includes(currentjobnameWithWeekday)) {
//     alert("該任務已存在！"); // 或使用 toast 提示
//     return;
//   }


//     const updatedValues = [...currentJobs, currentjobnameWithWeekday];
//     const updatedValuesid = [...currentJobIds, job.id];

//     task_edit_form.setValue("job", updatedValues);
//     task_edit_form.setValue("jobidbyarray", updatedValuesid);
  
//     // 更新 school_name
//     const updatedSchoolNames = Array.from(new Set([...currentSchoolNames, job.job_school_name]));
//     task_edit_form.setValue("school_name", updatedSchoolNames);


//   console.log("已加入任務:", job.job_code , " 已加入ID " ,updatedValuesid );


// }



// useEffect(()=>{
//     const fetchgettaskbyid = async (id: string) => {
//         const res = await fetch(`/api/Task_Lists_by_ID/${id}`) ;
//         const data = await res.json() ;
//         setGetTaskById(data) ;
//     }
//     fetchgettaskbyid(targettaskId)

// },[targettaskId])

// console.log("GetTaskdyId " , GetTaskById)

// const [ task_title , settask_title ] = useState('');
// const [ task_subject , settask_subject ] = useState('');
// const [ task_contect , settask_contect ] = useState('');
// const [ task_code , settask_code ] = useState('');
// const [ task_address , settask_address ] = useState('');
// const [ task_area , settask_area ] = useState('');
// const [ task_price , settask_price ] = useState(0);
// const [ showprice , setshowprice ] = useState<boolean>();
// const [ school_name , setschool_name ] = useState([]);
// const [ task_public , settask_public ] = useState<boolean>();
// const [ jobidbyarray , setjobidbyarray ] = useState([]);
// const [ job , setjob ] = useState([]);
// const [ teacher , setteacher ] = useState();
// const [ completed , setcompleted ] = useState<boolean>();
// const [ task_apply , settask_apply] = useState<boolean>();


//   const task_edit_form = useForm<z.infer<typeof Edit_Task_Schema>>({
//     resolver: zodResolver(Edit_Task_Schema),
//     defaultValues: {
//       userId: UserId,
//       targettaskId: targettaskId,
//       task_title: task_title,
//       task_subject: task_subject,
//       task_contect: task_contect,
//       task_code: task_code,
//       task_address: task_address,
//       task_area: task_area,
//       task_price: task_price,
//       task_public: task_public,
//       showprice: showprice,
//       school_name: school_name,
//       job: job,
//       jobidbyarray:[],
//       teacher: teacher,
//       completed: completed,
//       task_apply: task_apply
//     }
//   })

//   useEffect(() => {
//     const Task = GetTaskById[0];

//     if(Task){
//         task_edit_form.setValue('userId' , UserId);
//         task_edit_form.setValue('targettaskId' , targettaskId);
//         settask_title(Task.task_title);
//         task_edit_form.setValue('task_title' , Task.task_title);
//         settask_subject(Task.task_subject);
//         task_edit_form.setValue('task_subject' , Task.task_subject);
//         settask_contect(Task.task_contect);
//         task_edit_form.setValue('task_contect' , Task.task_contect);
//         settask_code(Task.task_code);
//         task_edit_form.setValue('task_code' , Task.task_code);
//         settask_address(Task.task_address);
//         task_edit_form.setValue('task_address' , Task.task_address);
//         settask_area(Task.task_area);
//         task_edit_form.setValue('task_area' , Task.task_area);
//         settask_price(Task.task_price);
//         task_edit_form.setValue('task_price' , Task.task_price);
//         setshowprice(Task.showprice);
//         task_edit_form.setValue('showprice' , Task.showprice);
//         setschool_name(Task.School_name);
//         task_edit_form.setValue('school_name' , Task.School_name);
//         settask_public(Task.task_public);
//         task_edit_form.setValue('task_public' , Task.task_public);
//         setjob(Task.job);
//         task_edit_form.setValue('job' , Task.job);

//         setteacher(Task.teacher);
//         task_edit_form.setValue('teacher' , Task.teacher);

//         setcompleted(Task.completed);
//         task_edit_form.setValue('completed' , Task.completed);

//         settask_apply(Task.task_apply);
//         task_edit_form.setValue('task_apply' , Task.task_apply);


//         setshowprice(Task.showprice);
//         settask_public(Task.task_public);

//     }

//   },[GetTaskById])

// console.log("Check Data : ", task_edit_form.getValues() , " --- END ---")

// console.log("Error :", task_edit_form.formState.errors , " --- END ---")


// useEffect(() => {
//   const Task = GetTaskById[0];
//   if (Task) {
//     // 格式化 job 欄位
//     const formattedJobs = Task.job.map((job: any) => {
//       const date = new Date(job.job_day.split('T')[0]);
//       const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
//       const dayOfWeek = date.toLocaleDateString('zh-TW', { weekday: 'long' });
//       return `${job.job_code} - ${job.job_school_name} - ${job.job_subject} - ${formattedDate} (${dayOfWeek})`;
//     });

//     task_edit_form.setValue("job", formattedJobs);
//   }
// }, [GetTaskById]);

//   const task_edit_form_onSubmit = (values: z.infer<typeof Edit_Task_Schema>) => {
//     console.log("-- task_input_data -- :",values,"-- End --" );
//     startTransition(() => {
//         Edit_Task_Action(values)
//     })

//   }
// const selecteJobs = task_edit_form.watch("job");

// console.log(school_name)


//   return (
//     <div>
//       <Form {...task_edit_form}>
//           <form onSubmit={task_edit_form.handleSubmit(task_edit_form_onSubmit)}>

//           <div className="mb-4">
//             <FormField
//               control={task_edit_form.control}
//               name="task_title"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>task_title</FormLabel>
//                   <FormControl>
//                     <Input placeholder="task_title" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={task_edit_form.control}
//               name="task_subject"
//               render={({ field  , fieldState }) => (
//                 <FormItem>
//                   <FormLabel>task_subject</FormLabel>
//                   <FormControl>
//                   <SWR_Subject_Select_noUserSubject field={field} fieldState={fieldState}/>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={task_edit_form.control}
//               name="task_contect"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>task_contect</FormLabel>
//                   <FormControl>
//                     <Input placeholder="task_contect" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={task_edit_form.control}
//               name="task_code"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>task_code</FormLabel>
//                   <FormControl>
//                     <Input placeholder="task_code" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={task_edit_form.control}
//               name="task_address"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>task_address</FormLabel>
//                   <FormControl>
//                     <Input placeholder="task_address" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={task_edit_form.control}
//               name="task_area"
//               render={({ field , fieldState}) => (
//                 <FormItem>
//                   <FormLabel>task_area</FormLabel>
//                   <FormControl>
//                   <SWR_Areas_Select  field={field} fieldState={fieldState} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={task_edit_form.control}
//               name="task_price"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>task_price:{task_price}</FormLabel>
//                   <FormControl>
//                   <Input
//             placeholder="task_price"
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
//             <FormField
//               control={task_edit_form.control}
//               name="task_public"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>task_public</FormLabel>
//                   <FormControl>
//                   <Switch  checked={field.value}  onCheckedChange={
//                     (value)=>{
//                         field.onChange(value)
//                         settask_public(value)
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
//               control={task_edit_form.control}
//               name="showprice"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>showprice</FormLabel>
//                   <FormControl>
//                   <Switch  checked={field.value}  onCheckedChange={
//                     (value) => {
//                         field.onChange(value)
//                         setshowprice(value)
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
//               control={task_edit_form.control}
//               name="school_name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>school_name</FormLabel>
//                   <FormControl>
//                     <Input 
//                     placeholder="school_name" 
//                     {...field}
//                     value={school_name.map((job:any) => job).join(", ")} // 顯示 job_school_name
//                     readOnly
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>
            

//             <div className="mb-4">
//             <FormField
//               control={task_edit_form.control}
//               name="job"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>
//                     job
//                   </FormLabel>
//                   <FormControl>
//                       <Input 
//                       placeholder="job"
//                       {...field} 
//                       onFocus={handleInputFocus}

//               value={selecteJobs.join(", ")} // 將陣列轉換為字串
//                       readOnly
//                       />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             </div>

//             <div className="mb-4">
//             <FormField
//               control={task_edit_form.control}
//               name="teacher"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>teacher</FormLabel>
//                   <FormControl>
//                   <Select
//                 defaultValue={String(field.value)}
//                 onValueChange={(value) => field.onChange(value) }
//             >
//                 <SelectTrigger>
//                     <SelectValue>{ field.value || "選擇教師" }</SelectValue>
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
//             {isPopupVisible && (
//   <div className="popup-overlay fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
//     <div className="popup-content bg-white p-6 rounded-lg shadow-lg max-w-[90%] max-h-[90%] overflow-auto">
//       <div className="mb-4">
//         <div className="flex items-center space-x-2">
//           <input
//             type="text"
//             placeholder="輸入搜索內容..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full"
//           />
//           <select
//             value={searchField}
//             onChange={(e) => setSearchField(e.target.value)}
//           >
//             <option value="all">所有字段</option>
//             <option value="job_code">任務編號</option>
//             <option value="job_school_name">學校名稱</option>
//             <option value="job_subject">科目</option>
//             <option value="job_area">地區</option>
//             <option value="job_time">時間</option>
//             <option value="job_day">日期</option>
//             <option value="showprice">顯示價格</option>
//           </select>
//           <Button onClick={handleSearch}>搜索</Button>
//         </div>

//         {searchResults.map((job: any) => {
//           const date = new Date(job.job_day.split('T')[0]);
//           const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
//           const dayOfWeek = date.toLocaleDateString('zh-TW', { weekday: 'long' });
//           const jobDisplayString = `${job.job_code} - ${job.job_school_name} - ${job.job_subject} - ${formattedDate} (${dayOfWeek})`;

//           return (
//             <div key={job.id}>
//               <p>結果</p>
//               <div key={job.id}>
//                 {jobDisplayString}
//                 <button type="button" onClick={() => handleAddJob(job)}>加入任務</button>
//               </div>
//             </div>
//           );
//         })}

//         {GetJobLists.map((d: any) => {
//           const date = new Date(d.job_day.split('T')[0]);
//           const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
//           const dayOfWeek = date.toLocaleDateString('zh-TW', { weekday: 'long' });
//           const jobDisplayString = `${d.job_code} - ${d.job_school_name} - ${d.job_subject} - ${formattedDate} (${dayOfWeek})`;

//           return (
//             <div key={d.id}>
//               {jobDisplayString}
//               <button type="button" onClick={() => handleAddJob(d)}>加入任務</button>
//             </div>
//           );
//         })}

//         <button
//           onClick={handleClosePopup}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         >
//           關閉
//         </button>
//       </div>
//     </div>
//   </div>
// )}

//              <Button type="submit" className="w-full">
//                 Create
//               </Button>

//           </form>
//       </Form>
//     </div>
//   );
// };

// export default EditTaskForm;

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
import { SWR_Subject_Select_noUserSubject } from "../fatchdata/swr_subject_select_noUserSubject";
import { SWR_Areas_Select } from "../fatchdata/swr_areas_select";
import { useParams } from "next/navigation";
import { Edit_Task_Schema } from "@/actions/Edit-Task/schema";
import { Edit_Task_Action } from "@/actions/Edit-Task";

interface JobData {
  id: string;
  job_code: string;
  job_school_name: string;
  job_subject: string;
  job_day: string;
}

interface TaskData {
  task_title: string;
  task_subject: string;
  task_contect: string;
  task_code: string;
  task_address: string;
  task_area: string;
  task_price: number;
  showprice: boolean;
  School_name: string[];
  task_public: boolean;
  job: JobData[];
  jobidbyarray?: string[];
  teacher: string | null;
  completed: boolean;
  task_apply: boolean;
}

interface TeacherData {
  id: string;
  username: string;
  nickname: string;
  role: string;
}

const EditTaskForm = () => {
  const param = useParams();
  const UserId = param?.id as string;
  const targettaskId = param?.taskListsid as string;
  const [isPending, startTransition] = useTransition();
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<JobData[]>([]);
  const [GetJobLists, setGetJobLists] = useState<JobData[]>([]);
  const [searchField, setSearchField] = useState("all");
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  const [getTeacher, setGetTeacher] = useState<TeacherData[]>([]);
  const [GetTaskById, setGetTaskById] = useState<TaskData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const task_edit_form = useForm<z.infer<typeof Edit_Task_Schema>>({
    resolver: zodResolver(Edit_Task_Schema),
    defaultValues: {
      userId: UserId,
      targettaskId: targettaskId,
      task_title: "",
      task_subject: "",
      task_contect: "",
      task_code: "",
      task_address: "",
      task_area: "",
      task_price: 0,
      task_public: false,
      showprice: false,
      school_name: [],
      job: [],
      jobidbyarray: [],
      teacher: "",
      completed: false,
      task_apply: false,
    },
  });

  const selecteJobs = task_edit_form.watch("job");

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchjoblistsdata = async () => {
      try {
        const res = await fetch(`/api/Job_Lists`);
        if (!res.ok) throw new Error("無法獲取任務列表");
        const data = await res.json();
        setGetJobLists(data);
      } catch (error) {
        console.error("獲取任務列表失敗：", error);
      }
    };
    fetchjoblistsdata();
  }, []);

  useEffect(() => {
    const fetchteacherdata = async () => {
      try {
        const res = await fetch(`/api/User_Lists`);
        if (!res.ok) throw new Error("無法獲取教師列表");
        const data = await res.json();
        setGetTeacher(data);
      } catch (error) {
        console.error("獲取教師列表失敗：", error);
      }
    };
    fetchteacherdata();
  }, []);

  useEffect(() => {
    const fetchgettaskbyid = async (id: string) => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/Task_Lists_by_ID/${id}`);
        if (!res.ok) throw new Error("無法獲取任務資料");
        const data = await res.json();
        setGetTaskById(Array.isArray(data) ? data : [data]);
        setError(null);
      } catch (error) {
        console.error("獲取任務資料失敗：", error);
        setError("無法載入任務資料，請稍後再試");
        setGetTaskById([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchgettaskbyid(targettaskId);
  }, [targettaskId]);

  useEffect(() => {
    const Task = GetTaskById[0];
    if (Task) {
      task_edit_form.setValue('userId', UserId);
      task_edit_form.setValue('targettaskId', targettaskId);
      task_edit_form.setValue('task_title', Task.task_title);
      task_edit_form.setValue('task_subject', Task.task_subject);
      task_edit_form.setValue('task_contect', Task.task_contect);
      task_edit_form.setValue('task_code', Task.task_code);
      task_edit_form.setValue('task_address', Task.task_address);
      task_edit_form.setValue('task_area', Task.task_area);
      task_edit_form.setValue('task_price', Task.task_price);
      task_edit_form.setValue('showprice', Task.showprice);
      task_edit_form.setValue('school_name', Task.School_name);
      task_edit_form.setValue('task_public', Task.task_public);
      task_edit_form.setValue('jobidbyarray', Task.jobidbyarray || []);
      task_edit_form.setValue('teacher', Task.teacher || "");
      task_edit_form.setValue('completed', Task.completed);
      task_edit_form.setValue('task_apply', Task.task_apply);

      const formattedJobs = Task.job.map((job: JobData) => {
        const date = new Date(job.job_day.split('T')[0]);
        const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const dayOfWeek = date.toLocaleDateString('zh-TW', { weekday: 'long' });
        return `${job.job_code} - ${job.job_school_name} - ${job.job_subject} - ${formattedDate} (${dayOfWeek})`;
      });
      task_edit_form.setValue('job', formattedJobs);
    }
  }, [GetTaskById, task_edit_form, UserId, targettaskId]);

  const handleInputFocus = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/Job_Lists_search?query=${searchQuery}&field=${searchField}`);
      if (!response.ok) throw new Error("搜尋失敗");
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("搜尋失敗:", error);
    }
  };

  const handleAddJob = (job: JobData) => {
    const currentJobs = task_edit_form.getValues("job");
    const currentJobIds = task_edit_form.getValues("jobidbyarray");
    const currentSchoolNames = task_edit_form.getValues("school_name");

    const date = new Date(job.job_day.split('T')[0]);
    const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const dayOfWeek = date.toLocaleDateString('zh-TW', { weekday: 'long' });
    const currentjobname = `${job.job_code}-${job.job_school_name}-${job.job_subject}-${job.job_day.split('T')[0]}`;
    const currentjobnameWithWeekday = `${currentjobname} - ${formattedDate} -${dayOfWeek}`;

    if (currentJobs.includes(currentjobnameWithWeekday)) {
      alert("該任務已存在！");
      return;
    }

    const updatedValues = [...currentJobs, currentjobnameWithWeekday];
    const updatedValuesid = [...currentJobIds, job.id];
    const updatedSchoolNames = Array.from(new Set([...currentSchoolNames, job.job_school_name]));

    task_edit_form.setValue("job", updatedValues);
    task_edit_form.setValue("jobidbyarray", updatedValuesid);
    task_edit_form.setValue("school_name", updatedSchoolNames);
  };

  const task_edit_form_onSubmit = (values: z.infer<typeof Edit_Task_Schema>) => {
    console.log("-- task_input_data -- :", values, "-- End --");
    startTransition(() => {
      Edit_Task_Action(values);
    });
  };

  if (isLoading) return <div>載入中...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Form {...task_edit_form}>
        <form onSubmit={task_edit_form.handleSubmit(task_edit_form_onSubmit)} className="space-y-4">
          <FormField
            control={task_edit_form.control}
            name="task_title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>任務標題</FormLabel>
                <FormControl>
                  <Input placeholder="輸入任務標題" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={task_edit_form.control}
            name="task_subject"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>任務科目</FormLabel>
                <FormControl>
                  <SWR_Subject_Select_noUserSubject field={field} fieldState={fieldState} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={task_edit_form.control}
            name="task_contect"
            render={({ field }) => (
              <FormItem>
                <FormLabel>任務內容</FormLabel>
                <FormControl>
                  <Input placeholder="輸入任務內容" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={task_edit_form.control}
            name="task_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>任務編號</FormLabel>
                <FormControl>
                  <Input placeholder="輸入任務編號" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={task_edit_form.control}
            name="task_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>任務地址</FormLabel>
                <FormControl>
                  <Input placeholder="輸入任務地址" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={task_edit_form.control}
            name="task_area"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>任務地區</FormLabel>
                <FormControl>
                  <SWR_Areas_Select field={field} fieldState={fieldState} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={task_edit_form.control}
            name="task_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>任務價格</FormLabel>
                <FormControl>
                  <Input
                    placeholder="輸入任務價格"
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
            control={task_edit_form.control}
            name="task_public"
            render={({ field }) => (
              <FormItem>
                <FormLabel>公開任務</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={task_edit_form.control}
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
            control={task_edit_form.control}
            name="school_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>學校名稱</FormLabel>
                <FormControl>
                  <Input
                    placeholder="學校名稱"
                    value={field.value.join(", ")}
                    readOnly
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={task_edit_form.control}
            name="job"
            render={({ field }) => (
              <FormItem>
                <FormLabel>任務列表</FormLabel>
                <FormControl>
                  <Input
                    placeholder="任務列表"
                    value={selecteJobs.join(", ")}
                    onFocus={handleInputFocus}
                    readOnly
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={task_edit_form.control}
            name="teacher"
            render={({ field }) => (
              <FormItem>
                <FormLabel>教師</FormLabel>
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
            control={task_edit_form.control}
            name="completed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>任務完成</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={task_edit_form.control}
            name="task_apply"
            render={({ field }) => (
              <FormItem>
                <FormLabel>任務申請</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {isPopupVisible && (
            <div className="popup-overlay fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="popup-content bg-white p-6 rounded-lg shadow-lg max-w-[90%] max-h-[90%] overflow-auto">
                <div className="mb-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="輸入搜索內容..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full p-2 border rounded"
                    />
                    <select
                      value={searchField}
                      onChange={(e) => setSearchField(e.target.value)}
                      className="p-2 border rounded"
                    >
                      <option value="all">所有字段</option>
                      <option value="job_code">任務編號</option>
                      <option value="job_school_name">學校名稱</option>
                      <option value="job_subject">科目</option>
                      <option value="job_area">地區</option>
                      <option value="job_time">時間</option>
                      <option value="job_day">日期</option>
                      <option value="showprice">顯示價格</option>
                    </select>
                    <Button onClick={handleSearch}>搜索</Button>
                  </div>

                  {searchResults.length === 0 && GetJobLists.length === 0 && (
                    <p className="mt-2">無可用任務</p>
                  )}

                  {searchResults.map((job) => {
                    const date = new Date(job.job_day.split('T')[0]);
                    const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
                    const dayOfWeek = date.toLocaleDateString('zh-TW', { weekday: 'long' });
                    const jobDisplayString = `${job.job_code} - ${job.job_school_name} - ${job.job_subject} - ${formattedDate} (${dayOfWeek})`;

                    return (
                      <div key={job.id} className="mt-2 flex items-center">
                        <p>{jobDisplayString}</p>
                        <Button type="button" onClick={() => handleAddJob(job)} className="ml-2">
                          加入任務
                        </Button>
                      </div>
                    );
                  })}

                  {searchResults.length === 0 && GetJobLists.map((job) => {
                    const date = new Date(job.job_day.split('T')[0]);
                    const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
                    const dayOfWeek = date.toLocaleDateString('zh-TW', { weekday: 'long' });
                    const jobDisplayString = `${job.job_code} - ${job.job_school_name} - ${job.job_subject} - ${formattedDate} (${dayOfWeek})`;

                    return (
                      <div key={job.id} className="mt-2 flex items-center">
                        <p>{jobDisplayString}</p>
                        <Button type="button" onClick={() => handleAddJob(job)} className="ml-2">
                          加入任務
                        </Button>
                      </div>
                    );
                  })}

                  <Button
                    onClick={handleClosePopup}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    關閉
                  </Button>
                </div>
              </div>
            </div>
          )}

          {selecteJobs.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold">已選任務：</p>
              {selecteJobs.map((job, index) => (
                <div key={index} className="flex items-center mt-1">
                  <span>{job}</span>
                  <Button
                    type="button"
                    onClick={() => {
                      const newJobs = selecteJobs.filter((_, i) => i !== index);
                      const newJobIds = task_edit_form.getValues("jobidbyarray").filter((_, i) => i !== index);
                      task_edit_form.setValue("job", newJobs);
                      task_edit_form.setValue("jobidbyarray", newJobIds);
                    }}
                    className="ml-2 text-red-500"
                  >
                    移除
                  </Button>
                </div>
              ))}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "提交中..." : "提交"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default EditTaskForm;
