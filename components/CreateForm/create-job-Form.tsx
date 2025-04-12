"use client";

import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { 
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage 
} from "@/components/ui/form";
import { Create_Job_schema } from "@/actions/Create-Job/schema";
import { Switch } from "@/components/ui/switch";
import DatePicker from "react-multi-date-picker";
import { SWR_SchoolName } from "../fatchdata/swr_schoolname";
import { SWR_Subject_Select } from "../fatchdata/swr_subject_select";
import { SWR_Place_Select } from "../fatchdata/swr_place_select";
import { SWR_Areas_Select } from "../fatchdata/swr_areas_select";
import { Create_Job_Action } from "@/actions/Create-Job";
import { useParams } from "next/navigation";

const CreateJobForm = () => {

  const param = useParams();
  // console.log(param)
  const UserId = param?.id as string;
  const [ getUserdata , setGetUserdata ] = useState([]);
  const [ TimeH , setTimeH ] = useState(0);

  useEffect(()=>{
    const fetchUserdata = async (UserId: string) => {
      const res = await fetch(`/api/User_Lists_by_ID/${UserId}`);
      const data = await res.json();
      setGetUserdata(data);
    };
    fetchUserdata(UserId);
  },[UserId])

  // console.log( " getUserdata : ", getUserdata)

  const UserSubject = getUserdata[0]?.subject;

  const [ isPending , startTransition ] = useTransition();

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
      job_time_h: 0, // 确保默认值是数字
      job_contect:""
    }
})

useEffect(() => {
  const startTimeValue = job_create_form.watch(`job_time_start`);
  const endTimeValue = job_create_form.watch(`job_time_end`);
  
  if (startTimeValue && endTimeValue) {
    const startTime = new Date(`1970-01-01T${startTimeValue.slice(0, 2)}:${startTimeValue.slice(2)}`);
    const endTime = new Date(`1970-01-01T${endTimeValue.slice(0, 2)}:${endTimeValue.slice(2)}`);

    // 检查 startTime 和 endTime 是否为有效日期
    if (!isNaN(startTime.getTime()) && !isNaN(endTime.getTime())) {
      const timeDiffInHours = (endTime - startTime) / (1000 * 60 * 60);

      // 格式化为两位小数并转换为数字
      const formattedTimeDiff = parseFloat(timeDiffInHours.toFixed(2));

      setTimeH(formattedTimeDiff);
      job_create_form.setValue(`job_time_h`, formattedTimeDiff); // 设置 job_time_h 的值为数字
    } else {
      // 如果 startTime 或 endTime 无效，将 job_time_h 设置为 0 或其他默认值
      setTimeH(0);
      job_create_form.setValue(`job_time_h`, 0);
    }
  } else {
    // 如果 startTimeValue 或 endTimeValue 为空，将 job_time_h 设置为 0 或其他默认值
    setTimeH(0);
    job_create_form.setValue(`job_time_h`, 0);
  }
}, [job_create_form.watch(`job_time_start`), job_create_form.watch(`job_time_end`)])

  const job_create_form_onSubmit = (values:z.infer<typeof Create_Job_schema>) => {
    console.log("-- job_input_data -- :",values,"-- End --" );
    startTransition(() => {
      Create_Job_Action(values);
    })

  }

  return (
    <div>
      CreateJobForm
        <Form {...job_create_form}>
          <form onSubmit={job_create_form.handleSubmit(job_create_form_onSubmit)}>

            <div className="mb-4">
            <FormField
              control={job_create_form.control}
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
              control={job_create_form.control}
              name="job_subject"
              render={({ field , fieldState }) => (
                <FormItem>
                  <FormLabel>job_subject</FormLabel>
                  <FormControl>
                    <SWR_Subject_Select field={field} fieldState={fieldState}  UserSubject={UserSubject}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>

            <div className="mb-4">
            <FormField
              control={job_create_form.control}
              name="job_contect"
              render={({ field , fieldState }) => (
                <FormItem>
                  <FormLabel>job_contect</FormLabel>
                  <FormControl>
                  <Input
                      placeholder="job_contect"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>

            <div className="mb-4">
            <FormField
              control={job_create_form.control}
              name="job_place"
              render={({ field , fieldState }) => (
                <FormItem>
                  <FormLabel>job_place</FormLabel>
                  <FormControl>
                    <SWR_Place_Select field={field} fieldState={fieldState}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>

            <div className="mb-4">
            <FormField
              control={job_create_form.control}
              name="job_area"
              render={({ field  , fieldState}) => (
                <FormItem>
                  <FormLabel>job_area</FormLabel>
                  <FormControl>
                    <SWR_Areas_Select  field={field} fieldState={fieldState} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>

            <div className="mb-4">
            <FormField
              control={job_create_form.control}
              name="job_school_name"
              render={({ field , fieldState}) => (
                <FormItem>
                  <FormLabel>job_school_name</FormLabel>
                  <FormControl>
                    <SWR_SchoolName field={field} fieldState={fieldState} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>

            <div className="mb-4">
            <FormField
              control={job_create_form.control}
              name="job_time_start"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>job_time_start</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="job_time_start"
                      {...field}
                      // 添加正则表达式限制输入
                      pattern="\b([01]\d|2[0-3])([0-5]\d)\b"
                      maxLength={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>

            <div className="mb-4">
            <FormField
              control={job_create_form.control}
              name="job_time_end"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>job_time_end</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="job_time_end"
                      {...field}
                      // 添加正则表达式限制输入
                      pattern="\b([01]\d|2[0-3])([0-5]\d)\b"
                      maxLength={4}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>            

            <div className="mb-4">
            <FormField
              control={job_create_form.control}
              name="job_time_h"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>job_time_h</FormLabel>
                  <FormControl>
                    <Input placeholder="job_time_h" 
                    {...field} 
                    value={field.value}
                    readOnly // 设置为只读
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>


            <div className="mb-4">
            <FormField
              control={job_create_form.control}
              name="job_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>job_price</FormLabel>
                  <FormControl>
                  <Input
            placeholder="job_price"
                defaultValue={field.value != null ? Number(field.value) : 0}
                onChange={(e) => {
                  const newValue = Number(e.target.value);
                  field.onChange(isNaN(newValue) ? 0 : newValue);
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
              control={job_create_form.control}
              name="job_day"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>job_day</FormLabel>
                  <FormControl>
                  <DatePicker 
                      placeholder="job_day" 
                      {...field} 
                      selected={field.value ? new Date(field.value) : null}
                      onChange={(date) =>{
                          const formattedDate = date instanceof Date ? date.toISOString() : new Date(date).toISOString();
                          field.onChange(formattedDate)   
                      }}
                      dateFormat="yyyy-MM-dd"
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>

            <div className="mb-4">
            <FormField
              control={job_create_form.control}
              name="showprice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>showprice</FormLabel>
                  <FormControl>
                  <Switch  checked={field.value}  onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>

            <div className="mb-4">
            <FormField
              control={job_create_form.control}
              name="job_public"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>是否公開</FormLabel>
                  <FormControl>
                  <Switch  checked={field.value}  onCheckedChange={field.onChange} />
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
  )
}
export default CreateJobForm