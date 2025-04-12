"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const  TaskListById = () =>{
  const param = useParams();
  const userId = param.id as string;
  const taskId = param.taskprogressListsid as string;
  console.log(param)

  const [ GetUserListsDatabyId , setGetUserListsDatabyId ] = useState([]) ;  
  
  useEffect(()=>{
    const getUserListsDatabyId = async (id : string) => { 
      const res = await fetch(`/api/User_Lists_by_ID/${id}`) ;
      if(!res){
        throw new Error("斷線!")
      }
      const result = await res.json();
      setGetUserListsDatabyId(result);
    }

    getUserListsDatabyId(userId)
  },[userId])

  console.log(GetUserListsDatabyId)

  const TaskData = GetUserListsDatabyId[0]?.task ;

  console.log("TaskData :",TaskData)


  return (
    <>
            <Link href={`/user/${userId}/profiles/taskprogressLists`}>
            上一頁
            </Link>

    <div>TaskListById</div>


    {TaskData?.map((d:any)=>{
      return(
        <div key={d.id}>
        TASk
        
        title: {d. task_title}
        <br />
        subject: {d. task_subject}
        <br />
            工作:
        <br />
        {d.job.map((j:any)=>{
          return(
            <div key={j.id}>
            
            <Link href={`/user/${userId}/profiles/taskprogressLists/${taskId}/${j.id}`}>
          job code: {j.job_code}
            <p>
          {d.job_place}
          </p>
          <p>
          {d.job_time}
          </p>
          <p>
          {d.showprice && d.job_price}
          </p>
          <p>
          {d.job_day}
          </p>
          <p>
          {d.job_school_name}
          </p>
          <p>
          {d.job_area}
          </p>

            </Link>
            

            
          </div>
          )
        })}

        </div>
      )

    })}


</>


  )
}

export default TaskListById