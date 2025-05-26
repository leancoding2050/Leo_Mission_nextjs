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
// import { Create_Job_schema } from "@/actions/Create-Job/schema";
// import { Switch } from "@/components/ui/switch";
// import DatePicker from "react-multi-date-picker";
// import { SWR_SchoolName } from "../fatchdata/swr_schoolname";
// import { SWR_Subject_Select } from "../fatchdata/swr_subject_select";
// import { SWR_Place_Select } from "../fatchdata/swr_place_select";
// import { SWR_Areas_Select } from "../fatchdata/swr_areas_select";
// import { Create_Job_Action } from "@/actions/Create-Job";
// import { useParams } from "next/navigation";

// const CreateJobForm = () => {

//   const param = useParams();
//   // console.log(param)
//   const UserId = param?.id as string;
//   const [ getUserdata , setGetUserdata ] = useState([]);
//   const [ TimeH , setTimeH ] = useState(0);

//   useEffect(()=>{
//     const fetchUserdata = async (UserId: string) => {
//       const res = await fetch(`/api/User_Lists_by_ID/${UserId}`);
//       const data = await res.json();
//       setGetUserdata(data);
//     };
//     fetchUserdata(UserId);
//   },[UserId])

//   // console.log( " getUserdata : ", getUserdata)

//   const UserSubject = getUserdata[0]?.subject;

//   const [ isPending , startTransition ] = useTransition();

//   const job_create_form = useForm<z.infer<typeof Create_Job_schema>>({
//     resolver: zodResolver(Create_Job_schema),
//     defaultValues: {
//       userId: UserId,
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
//       job_time_start: "",
//       job_time_end: "",
//       job_time_h: 0, // 确保默认值是数字
//       job_contect:""
//     }
// })

// useEffect(() => {
//   const startTimeValue = job_create_form.watch(`job_time_start`);
//   const endTimeValue = job_create_form.watch(`job_time_end`);
  
//   if (startTimeValue && endTimeValue) {
//     const startTime = new Date(`1970-01-01T${startTimeValue.slice(0, 2)}:${startTimeValue.slice(2)}`);
//     const endTime = new Date(`1970-01-01T${endTimeValue.slice(0, 2)}:${endTimeValue.slice(2)}`);

//     // 检查 startTime 和 endTime 是否为有效日期
//     if (!isNaN(startTime.getTime()) && !isNaN(endTime.getTime())) {
//       const timeDiffInHours = (endTime - startTime) / (1000 * 60 * 60);

//       // 格式化为两位小数并转换为数字
//       const formattedTimeDiff = parseFloat(timeDiffInHours.toFixed(2));

//       setTimeH(formattedTimeDiff);
//       job_create_form.setValue(`job_time_h`, formattedTimeDiff); // 设置 job_time_h 的值为数字
//     } else {
//       // 如果 startTime 或 endTime 无效，将 job_time_h 设置为 0 或其他默认值
//       setTimeH(0);
//       job_create_form.setValue(`job_time_h`, 0);
//     }
//   } else {
//     // 如果 startTimeValue 或 endTimeValue 为空，将 job_time_h 设置为 0 或其他默认值
//     setTimeH(0);
//     job_create_form.setValue(`job_time_h`, 0);
//   }
// }, [job_create_form.watch(`job_time_start`), job_create_form.watch(`job_time_end`)])

//   const job_create_form_onSubmit = (values:z.infer<typeof Create_Job_schema>) => {
//     console.log("-- job_input_data -- :",values,"-- End --" );
//     startTransition(() => {
//       Create_Job_Action(values);
//     })

//   }

//   return (
//     <div>
//       CreateJobForm
//         <Form {...job_create_form}>
//           <form onSubmit={job_create_form.handleSubmit(job_create_form_onSubmit)}>

//             <div className="mb-4">
//             <FormField
//               control={job_create_form.control}
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
//               control={job_create_form.control}
//               name="job_subject"
//               render={({ field , fieldState }) => (
//                 <FormItem>
//                   <FormLabel>job_subject</FormLabel>
//                   <FormControl>
//                     <SWR_Subject_Select field={field} fieldState={fieldState}  UserSubject={UserSubject}/>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={job_create_form.control}
//               name="job_contect"
//               render={({ field , fieldState }) => (
//                 <FormItem>
//                   <FormLabel>job_contect</FormLabel>
//                   <FormControl>
//                   <Input
//                       placeholder="job_contect"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={job_create_form.control}
//               name="job_place"
//               render={({ field , fieldState }) => (
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
//               control={job_create_form.control}
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
//               control={job_create_form.control}
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
//               control={job_create_form.control}
//               name="job_time_start"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>job_time_start</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="job_time_start"
//                       {...field}
//                       // 添加正则表达式限制输入
//                       pattern="\b([01]\d|2[0-3])([0-5]\d)\b"
//                       maxLength={4}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={job_create_form.control}
//               name="job_time_end"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>job_time_end</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="job_time_end"
//                       {...field}
//                       // 添加正则表达式限制输入
//                       pattern="\b([01]\d|2[0-3])([0-5]\d)\b"
//                       maxLength={4}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>            

//             <div className="mb-4">
//             <FormField
//               control={job_create_form.control}
//               name="job_time_h"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>job_time_h</FormLabel>
//                   <FormControl>
//                     <Input placeholder="job_time_h" 
//                     {...field} 
//                     value={field.value}
//                     readOnly // 设置为只读
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>


//             <div className="mb-4">
//             <FormField
//               control={job_create_form.control}
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
//                     <FormField
//                         control={job_create_form.control}
//                         name="job_day"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>工作日期</FormLabel>
//                                 <FormControl>
//                                     <DatePicker
//                                         value={field.value ? new Date(field.value) : null}
//                                         onChange={(date) => {
//                                             const formattedDate = date && !Array.isArray(date) ? date.toDate().toISOString() : "";
//                                             field.onChange(formattedDate);
//                                         }}
//                                         format="YYYY-MM-DD" // ✅ 使用 format 替代 dateFormat
//                                         placeholder="工作日期"
//                                         disabled={isPending}
//                                     />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={job_create_form.control}
//               name="showprice"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>showprice</FormLabel>
//                   <FormControl>
//                   <Switch  checked={field.value}  onCheckedChange={field.onChange} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             </div>

//             <div className="mb-4">
//             <FormField
//               control={job_create_form.control}
//               name="job_public"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>是否公開</FormLabel>
//                   <FormControl>
//                   <Switch  checked={field.value}  onCheckedChange={field.onChange} />
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
// export default CreateJobForm

"use client";

import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Create_Job_schema } from "@/actions/Create-Job/schema";
import { Switch } from "@/components/ui/switch";
import DatePicker from "react-multi-date-picker";
import { SWR_SchoolName_Multi } from "../fatchdata/swr_schoolname";
import { SWR_Subject_Select } from "../fatchdata/swr_subject_select";
import { SWR_Place_Select } from "../fatchdata/swr_place_select";
import { SWR_Areas_Select } from "../fatchdata/swr_areas_select";
import { Create_Job_Action } from "@/actions/Create-Job";
import { useParams } from "next/navigation";

interface UserData {
  id: string;
  subject: string[];
}

const CreateJobForm = () => {
  const param = useParams();
  const UserId = param?.id as string;
  const [getUserdata, setGetUserdata] = useState<UserData[]>([]);
  const [TimeH, setTimeH] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchUserdata = async (UserId: string) => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/User_Lists_by_ID/${UserId}`);
        if (!res.ok) throw new Error("無法獲取用戶資料");
        const data = await res.json();
        setGetUserdata(Array.isArray(data) ? data : [data]);
        setError(null);
      } catch (error) {
        console.error("獲取用戶資料失敗：", error);
        setError("無法載入用戶資料，請稍後再試");
        setGetUserdata([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserdata(UserId);
  }, [UserId]);

  const UserSubject = getUserdata[0]?.subject || [];

  const job_create_form = useForm<z.infer<typeof Create_Job_schema>>({
    resolver: zodResolver(Create_Job_schema),
    defaultValues: {
      userId: UserId,
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
      job_time_start: "",
      job_time_end: "",
      job_time_h: 0,
      job_contect: "",
    },
  });

  useEffect(() => {
    const startTimeValue = job_create_form.watch("job_time_start");
    const endTimeValue = job_create_form.watch("job_time_end");

    const isValidTimeFormat = (time: string) => /^\d{4}$/.test(time) && parseInt(time.slice(0, 2)) < 24 && parseInt(time.slice(2)) < 60;

    if (startTimeValue && endTimeValue && isValidTimeFormat(startTimeValue) && isValidTimeFormat(endTimeValue)) {
      const startTime = new Date(`1970-01-01T${startTimeValue.slice(0, 2)}:${startTimeValue.slice(2)}`);
      const endTime = new Date(`1970-01-01T${endTimeValue.slice(0, 2)}:${endTimeValue.slice(2)}`);

      if (!isNaN(startTime.getTime()) && !isNaN(endTime.getTime())) {
        const timeDiffInHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60);
        const formattedTimeDiff = parseFloat(timeDiffInHours.toFixed(2));

        setTimeH(formattedTimeDiff);
        job_create_form.setValue("job_time_h", formattedTimeDiff);
      } else {
        setTimeH(0);
        job_create_form.setValue("job_time_h", 0);
      }
    } else {
      setTimeH(0);
      job_create_form.setValue("job_time_h", 0);
    }
  }, [job_create_form.watch("job_time_start"), job_create_form.watch("job_time_end"), job_create_form]);

  const job_create_form_onSubmit = (values: z.infer<typeof Create_Job_schema>) => {
    console.log("-- job_input_data -- :", values, "-- End --");
    startTransition(() => {
      Create_Job_Action(values);
    });
  };

  if (isLoading) return <div>載入中...</div>;
  if (error) return <div>{error}</div>;

  


  return (
    <div>
      <h2>創建工作表單</h2>
      <Form {...job_create_form}>
        <form onSubmit={job_create_form.handleSubmit(job_create_form_onSubmit)} className="space-y-4">
          <FormField
            control={job_create_form.control}
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
            control={job_create_form.control}
            name="job_subject"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>科目</FormLabel>
                <FormControl>
                  <SWR_Subject_Select field={field} fieldState={fieldState} UserSubject={UserSubject} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={job_create_form.control}
            name="job_contect"
            render={({ field }) => (
              <FormItem>
                <FormLabel>工作內容</FormLabel>
                <FormControl>
                  <Input placeholder="工作內容" {...field} disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={job_create_form.control}
            name="job_place"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>地點</FormLabel>
                <FormControl>
                  <SWR_Place_Select field={field} fieldState={fieldState} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={job_create_form.control}
            name="job_area"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>區域</FormLabel>
                <FormControl>
                  <SWR_Areas_Select field={field} fieldState={fieldState} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={job_create_form.control}
            name="job_school_name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>學校名稱</FormLabel>
                <FormControl>
                  <SWR_SchoolName_Multi field={field} fieldState={fieldState} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={job_create_form.control}
            name="job_time_start"
            render={({ field }) => (
              <FormItem>
                <FormLabel>開始時間 (HHMM)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="例如 0900"
                    {...field}
                    pattern="\d{4}"
                    maxLength={4}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={job_create_form.control}
            name="job_time_end"
            render={({ field }) => (
              <FormItem>
                <FormLabel>結束時間 (HHMM)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="例如 1700"
                    {...field}
                    pattern="\d{4}"
                    maxLength={4}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={job_create_form.control}
            name="job_time_h"
            render={({ field }) => (
              <FormItem>
                <FormLabel>工作時數</FormLabel>
                <FormControl>
                  <Input placeholder="工作時數" value={field.value} readOnly disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={job_create_form.control}
            name="job_price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>價格</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="價格"
                    value={field.value === 0 ? "" : field.value}
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
            control={job_create_form.control}
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
                    format="YYYY-MM-DD"
                    placeholder="工作日期"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={job_create_form.control}
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
            control={job_create_form.control}
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

export default CreateJobForm;