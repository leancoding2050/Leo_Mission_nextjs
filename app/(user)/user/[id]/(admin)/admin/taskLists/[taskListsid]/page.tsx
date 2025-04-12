"use client";

import { useParams } from "next/navigation";
import { useEffect, useState,useTransition  } from "react";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { Delete_Job_Schema } from "@/actions/Delete-Job(備用)/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";


const TaskdetailbyId = () => {
    const param = useParams();
    
    const UserId = param?.id as string;
    const TaskId = param?.taskListsid as string;

    const [GetTaskdetailbyId, setGetTaskdetailbyId] = useState([]);
    const [ isPending , startTransition ] =useTransition();



    useEffect(() => {
        const fetchTaskdetailbyId = async (TaskId: string) => {
            const res = await fetch(`/api/Task_Lists_by_ID/${TaskId}`);
            const data = await res.json();
            setGetTaskdetailbyId(data);
        };
        fetchTaskdetailbyId(TaskId);
    }, [TaskId]);

    console.log(GetTaskdetailbyId);

    // const delete_job_task = useForm<z.infer<typeof Delete_Job_Schema>>({
    //     resolver: zodResolver(Delete_Job_Schema),
    //     defaultValues: {
    //         id: "",
    //     },
    // });
    // const del_job = (values:z.infer<typeof Delete_Job_Schema>) => {
    //     startTransition(() => {
    //         deleteJob_task(values)
    //     })
    // }


  return (
    <>
    {GetTaskdetailbyId?.map((d:any)=>{
        return(
            
            <div key={d.id}>
            <Link href={`/user/${UserId}/admin/taskLists/`} >
            返回
            </Link>
<br />
            <Link href={`/user/${UserId}/admin/taskLists/${d.id}/edit`}>
            更改
            </Link>
            <br />
            
                TaskTitle: {d.task_title}
                <br />
                Task主題: {d.task_subject}
                <br />
                TaskCode: {d.task_code}
                <br />
                Taskarea: {d.task_area}
                <br />
                schoolName: {d.School_name}
                <br />
                價錢: {d.task_price}
                <br />
                是否完成: {d.completed ? "完成" : "未完成"}
                <br />
                是否公開: {d.task_public ? "公開" : "不公開"}
                <br />
                是否公開價錢: {d.showprice ? "公開" : "不公開"}
                <br />
                工作數量: {d.job.length}
                <br />
                老師: {d.teacher}
                <br />
            
                工作: {d.job.map((j:any)=>(
         
                    <div key={j.id}>
                        <br />
                        工作編號:{ j.job_code }
                        <br />  
                        工作地方:{ j.job_place }
                        <br />
                        工作時間:{ j.job_time }
                        <br />
                        工作價錢:{ j.job_price }
                        <br />
                        工作日期:{ j.job_day }
                        <br />
                        工作是否完成: {j.job_complate}
                        <br />
                        TaskCode : {j.task_code}
                        <br />
                        工作學校名:{ j.job_school_name }
                        <br />
                        工作地區 : {j.job_area}
                    </div>



    ))}
                
                    {/* <form onSubmit={del_job}>
                        <Button>移除工作</Button>
                    </form> */}

                 




        </div>

        
        )
    })}
    </>
  )
};  

export default TaskdetailbyId;