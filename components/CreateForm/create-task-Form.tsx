"use client";
import * as z from "zod";
import { use, useEffect, useState, useTransition } from "react";
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

import { Create_Task_Schema } from "@/actions/Create-Task/schema";
import { Switch } from "@/components/ui/switch";
import { SWR_Subject_Select } from "../fatchdata/swr_subject_select";
import { SWR_Areas_Select } from "../fatchdata/swr_areas_select";
import { useParams } from "next/navigation";
import { Create_Task_Action } from "@/actions/Create-Task";
const CreateTaskForm = () => {
  const param = useParams();
  const UserId = param?.id as string;
  const [ isPpending , startTransition ] = useTransition();
  const [ isPopupVisible , setPopupVisible ] = useState(false);
  const [ searchQuery , setSearchQuery ] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [ GetJobLists , setGetJobLists ] = useState([]) ;
  const [ searchField , setSearchField ] = useState("all");
  const [ windowSize , setWindowSize ] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })
  const [ getTeacher , setGetTeacher ] = useState([]);


  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  useEffect(()=>{
    const fetchjoblistsdata = async () => {
      const res = await fetch(`/api/Job_Lists`) ;
      const data = await res.json() ;
      setGetJobLists(data) ;
    }
    fetchjoblistsdata()
  },[])
  // console.log(" GetJobLists : ",GetJobLists," -- End -- ") ;


  useEffect(() => {
    const fetchteacherdata = async() =>{
      const res = await fetch(`/api/User_Lists`);
      const data = await res.json();
      setGetTeacher(data);
    }
    fetchteacherdata();
  },[])

  // console.log("Teacher : ",getTeacher, " -- End --")
  const handleInputFocus = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleSearch =  async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const response = await fetch(`/api/Job_Lists_search?query=${searchQuery}&field=${searchField}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("搜尋失敗:", error)
    }
  };

const handleAddJob = (job:any) => {
  const currentJobs = task_create_form.getValues("job");
  const currentJobIds = task_create_form.getValues("jobidbyarray");
  const currentSchoolNames = task_create_form.getValues("school_name");
  console.log(" what is :",job);  

  const currentjobname = `${job.job_school_name}-${job.job_subject}-${job.job_day.split('T')[0]} `

  const date = new Date(job.job_day.split('T')[0]);

  // 取得星期幾
const dayOfWeek = date.toLocaleDateString('zh-TW', { weekday: 'long' });

const currentjobnameWithWeekday = `${currentjobname}-${dayOfWeek}`;

  if (!currentJobs.includes(job.id)) {
    const updatedValues = [...currentJobs, currentjobnameWithWeekday];
    const updatedValuesid = [...currentJobIds, job.id];

    task_create_form.setValue("job", updatedValues);
    task_create_form.setValue("jobidbyarray", updatedValuesid);
  
    // 更新 school_name
    const updatedSchoolNames = Array.from(new Set([...currentSchoolNames, job.job_school_name]));
    task_create_form.setValue("school_name", updatedSchoolNames);


  console.log("已加入任務:", job.job_code , " 已加入ID " ,updatedValuesid );
} else {
  console.log("任務已存在:", job.job_code);
}

}



  const task_create_form = useForm<z.infer<typeof Create_Task_Schema>>({
    resolver: zodResolver(Create_Task_Schema),
    defaultValues: {
      userId: UserId,
      task_title: "",
      task_subject: "",
      task_contect: "",
      task_code: "",
      task_address: "",
      task_area: "",
      task_price: 0,
      task_public: false,
      task_apply: false,
      showprice: false,
      school_name: [],
      completed: false,
      job: [],
      jobidbyarray:[],
      teacher: "",
    }
  })



  const task_create_form_onSubmit = (values: z.infer<typeof Create_Task_Schema>) => {
    console.log("-- task_input_data -- :",values,"-- End --" );
    startTransition(() => {
      Create_Task_Action(values)
    })

  }
const selecteJobs = task_create_form.watch("job");

  return (
    <>
      <div>CreateTask</div>
      <Form {...task_create_form}>
          <form onSubmit={task_create_form.handleSubmit(task_create_form_onSubmit)}>

          <div className="mb-4">
            <FormField
              control={task_create_form.control}
              name="task_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>task_title</FormLabel>
                  <FormControl>
                    <Input placeholder="task_title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>

            <div className="mb-4">
            <FormField
              control={task_create_form.control}
              name="task_subject"
              render={({ field  , fieldState }) => (
                <FormItem>
                  <FormLabel>task_subject</FormLabel>
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
              control={task_create_form.control}
              name="task_contect"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>task_contect</FormLabel>
                  <FormControl>
                    <Input placeholder="task_contect" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>

            <div className="mb-4">
            <FormField
              control={task_create_form.control}
              name="task_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>task_code</FormLabel>
                  <FormControl>
                    <Input placeholder="task_code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>

            <div className="mb-4">
            <FormField
              control={task_create_form.control}
              name="task_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>task_address</FormLabel>
                  <FormControl>
                    <Input placeholder="task_address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>

            <div className="mb-4">
            <FormField
              control={task_create_form.control}
              name="task_area"
              render={({ field , fieldState}) => (
                <FormItem>
                  <FormLabel>task_area</FormLabel>
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
              control={task_create_form.control}
              name="task_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>task_price</FormLabel>
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
              control={task_create_form.control}
              name="task_public"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>task_public</FormLabel>
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
              control={task_create_form.control}
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
              control={task_create_form.control}
              name="school_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>school_name</FormLabel>
                  <FormControl>
                    <Input 
                    placeholder="school_name" 
                    {...field}
                    value={field.value.join(", ")} // 將陣列轉為字串
                    readOnly
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>



            <div className="mb-4">
            <FormField
              control={task_create_form.control}
              name="job"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>job</FormLabel>
                  <FormControl>
                      <Input 
                      placeholder="job" 
                      {...field} 
                      onFocus={handleInputFocus}
                      value={selecteJobs.join(", ")}
                      readOnly
                      
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>

            <div className="mb-4">
            <FormField
              control={task_create_form.control}
              name="teacher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>teacher</FormLabel>
                  <FormControl>
                  <Select
                defaultValue={String(field.value)}
                onValueChange={(value) => field.onChange(value) }
            >
                <SelectTrigger>
                    <SelectValue placeholder={field.value || "選擇教師"}>{ field.value || "選擇教師" }</SelectValue>
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





              {isPopupVisible && (

              <div  className="popup-overlay fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="popup-content bg-white p-6 rounded-lg shadow-lg max-w-[90%] max-h-[90%] overflow-auto">
                  <div className="mb-4"> 


                  <div className="flex items-center space-x-2">
                          <input 
                            type="text" 
                            placeholder="輸入搜索內容..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex-1"
                          />
                                <select
                                  value={searchField}
                                  onChange={(e) => setSearchField(e.target.value)}
                                >
                                  <option value="all">所有字段</option>
                                  <option value="job_code">任務編號</option>
                                  <option value="job_school_name">學校名稱</option>
                                  <option value="job_subject">科目</option>
                                  <option value="job_area">地區</option>
                                  <option value="job_time_h">時間</option>
                                  <option value="job_day">日期</option>
                                  <option value="showprice">顯示價格</option>
                                </select>

                          <Button onClick={handleSearch} > 搜索 </Button>
                        </div>

                    
                    {searchResults.map((job:any)=>{
                      return(
                        <div  key={job.id} >
                        <p>結果</p>
                        <div key={job.id} >
                            code : {job.job_code}, 
                           school_name : {job.job_school_name} , 
                           subject :  {job.job_subject} , 
                            area: {job.job_area} , 
                            job_time :  {job.job_time_h} , 
                           day:  {job.job_day.split('T')[0]} ,
                           顯示:   {job.showprice ? "顯示價格" : "隱藏價格"}

                          <button type="button" onClick={() => handleAddJob(job)} >加入任務</button>

                        </div>
                        </div>

                      )
                    })}

------

                    {GetJobLists.map((d:any)=>{
                      return(

                        <div key={d.id} >
                            code : {d.job_code}, 
                           school_name : {d.job_school_name} , 
                           subject :  {d.job_subject} , 
                            area: {d.job_area} , 
                            job :  {d.job_time_h} , 
                           day:  {d.job_day.split('T')[0]} ,
                           顯示:   {d.showprice ? "顯示價格" : "隱藏價格"}

                           <button type="button" onClick={() => handleAddJob(d)} >加入任務</button>
                        </div>

                       
                      )
                    })}






                    <button 
                    onClick={handleClosePopup} 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    > close </button>
                  </div>
                </div>
              </div>
            
            )}


            <Button type="submit" className="w-full">
                Create
              </Button>


          </form>
      </Form>
    </>
  );
};

export default CreateTaskForm;