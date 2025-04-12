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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import DatePicker from "react-multi-date-picker";
import { SWR_SchoolName } from "../fatchdata/swr_schoolname";
import { SWR_Subject_Select } from "../fatchdata/swr_subject_select";
import { SWR_Place_Select } from "../fatchdata/swr_place_select";
import { SWR_Areas_Select } from "../fatchdata/swr_areas_select";
import { useParams } from "next/navigation";
import { Edit_Job_schema } from "@/actions/Edit-Job/schema";
import { Edit_Job_Action } from "@/actions/Edit-Job";


const EditJobForm = () => {

  const param = useParams();
//   console.log(param)
  const UserId = param?.id as string;
  const JobId = param?.jobListsid as string;
 const [ GetJobById , setGetJobById ] = useState([]);

    useEffect(() => {
        const fetchgetjobbyid = async (id: string) => {
            const res = await fetch(`/api/Job_Lists_by_ID/${id}`) ;
            const data = await res.json() ;
            setGetJobById(data) ;
        }
        fetchgetjobbyid(JobId);
    },[JobId])

    console.log(" GetJobById : ",GetJobById[0])


    const [ jobcode , setjobcode ] = useState('');
    const [ jobsubject , setjobsubject ] = useState('');
    const [ jobplace , setjobplace ] = useState('');
    const [ jobarea , setjobarea ] = useState('');
    const [ jobschoolname , setjobschoolname ] = useState('');
    const [ jobtime , setjobtime ] = useState('');
    const [ jobprice , setjobprice ] = useState(0);
    const [ jobday , setjobday ] = useState('');
    const [ jobpublic , setjobpublic ] = useState<boolean>();
    const [ showprice , setshowprice ] = useState<boolean>();
    const [ teacher , setteacher ] = useState("null");
    const [ getTeacher , setGetTeacher ] = useState([]);

  const [ isPending , startTransition ] = useTransition();



  const job_edit_form = useForm<z.infer<typeof Edit_Job_schema>>({
    resolver: zodResolver(Edit_Job_schema),
    defaultValues:{
      userId: UserId,
      targetjobId:JobId || "",
      job_code:jobcode || "",
      job_subject : jobsubject || "",
      job_place:jobplace || "",
      job_area: jobarea || "",
      job_school_name:jobschoolname || "",
      job_time:jobtime || "",
      job_price: jobprice || 0 ,
      job_day: jobday || "",
      job_public : jobpublic,
      showprice: showprice ,
      teacher: teacher || "",
    }
  })

  useEffect(() => {
    const fetchteacherdata = async() =>{
      const res = await fetch(`/api/User_Lists`);
      const data = await res.json();
      setGetTeacher(data);
    }
    fetchteacherdata();
  },[])

 useEffect(() => {
   if(GetJobById[0]){
        setjobcode(GetJobById[0].job_code);
        job_edit_form.setValue("job_code",GetJobById[0].job_code)

        setjobsubject(GetJobById[0].job_subject);
        job_edit_form.setValue("job_subject",GetJobById[0].job_subject)

        setjobplace(GetJobById[0].job_place);
        job_edit_form.setValue("job_place",GetJobById[0].job_place)

        setjobarea(GetJobById[0].job_area);
        job_edit_form.setValue("job_area",GetJobById[0].job_area)

        setjobschoolname(GetJobById[0].job_school_name);
        job_edit_form.setValue("job_school_name",GetJobById[0].job_school_name)
    
        setjobtime(GetJobById[0].job_time);
        job_edit_form.setValue('job_time',GetJobById[0].job_time)

        setjobprice(GetJobById[0].job_price);
        job_edit_form.setValue('job_price',GetJobById[0].job_price)

        setjobday(GetJobById[0].job_day);
        job_edit_form.setValue('job_day',GetJobById[0].job_day)

        setjobpublic(GetJobById[0].job_public);
        job_edit_form.setValue('job_public',GetJobById[0].job_public )

        setshowprice(GetJobById[0].show_price);
        job_edit_form.setValue('showprice',GetJobById[0].showprice )

        
        setjobpublic(GetJobById[0].job_public );
        setshowprice(GetJobById[0].showprice );

        const teacherValue = GetJobById[0]?.teacher || "";
        setteacher(teacherValue);
        job_edit_form.setValue('teacher', teacherValue);
   }
 
  }, [GetJobById]);

  
  console.log(showprice)
  


  const job_edit_form_onSubmit = (values:z.infer<typeof Edit_Job_schema>) => {
    console.log("-- job_input_data -- :",values,"-- End --" );
    startTransition(() => {
      Edit_Job_Action(values);
    })

  }


  return (
    <div>
      EditJobForm
        <Form {...job_edit_form}>
          <form onSubmit={job_edit_form.handleSubmit(job_edit_form_onSubmit)}>

            <div className="mb-4">
            <FormField
              control={job_edit_form.control}
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
              control={job_edit_form.control}
              name="job_subject"
              render={({ field , fieldState}) => (
                <FormItem>
                  <FormLabel>job_subject</FormLabel>
                  <FormControl>
                    <SWR_Subject_Select field={field} fieldState={fieldState}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>

            <div className="mb-4">
            <FormField
              control={job_edit_form.control}
              name="job_place"
              render={({ field , fieldState}) => (
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
              control={job_edit_form.control}
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
              control={job_edit_form.control}
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
              control={job_edit_form.control}
              name="job_time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>job_time</FormLabel>
                  <FormControl>
                    <Input placeholder="job_time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>

            <div className="mb-4">
            <FormField
              control={job_edit_form.control}
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
              control={job_edit_form.control}
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
              control={job_edit_form.control}
              name="teacher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>teacher</FormLabel>
                  <FormControl>
                  <Select
                defaultValue={String(field.value) || ""}
                onValueChange={(value) => field.onChange(value) }
            >
                <SelectTrigger>
                    <SelectValue placeholder={ field.value || "選擇教師" }>{ field.value || "選擇教師" }</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    {
                        getTeacher?.map((datas:any) => {
                            return(
                                <SelectItem value={String(datas.username)} key={datas.id}>
                                    {datas.nickname} : role {datas.role}
                                </SelectItem>
                            )
                        })
                    }

                </SelectContent>
            </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>

            <div className="mb-4">
            <FormField
              control={job_edit_form.control}
              name="showprice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>showprice</FormLabel>
                  <FormControl>
                  <Switch  checked={field.value}  onCheckedChange={
                    (value)=>{
                    field.onChange(value)
                    setshowprice(value)    
                    }

                    } />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>

            <div className="mb-4">
            <FormField
              control={job_edit_form.control}
              name="job_public"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>是否公開</FormLabel>
                  <FormControl>
                  <Switch  checked={field.value}  onCheckedChange={
                    (value)=>{
                        field.onChange(value)
                        setjobpublic(value)
                    }
                    
                    } />
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
export default EditJobForm