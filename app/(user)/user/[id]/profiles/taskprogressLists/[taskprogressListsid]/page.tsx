// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// const  TaskListById = () =>{
//   const param = useParams();
//   const userId = param.id as string;
//   const taskId = param.taskprogressListsid as string;
//   console.log(param)

//   const [ GetUserListsDatabyId , setGetUserListsDatabyId ] = useState([]) ;  
  
//   useEffect(()=>{
//     const getUserListsDatabyId = async (id : string) => { 
//       const res = await fetch(`/api/User_Lists_by_ID/${id}`) ;
//       if(!res){
//         throw new Error("斷線!")
//       }
//       const result = await res.json();
//       setGetUserListsDatabyId(result);
//     }

//     getUserListsDatabyId(userId)
//   },[userId])

//   console.log(GetUserListsDatabyId)

//   const TaskData = GetUserListsDatabyId[0]?.task ;

//   console.log("TaskData :",TaskData)


//   return (
//     <>
//             <Link href={`/user/${userId}/profiles/taskprogressLists`}>
//             上一頁
//             </Link>

//     <div>TaskListById</div>


//     {TaskData?.map((d:any)=>{
//       return(
//         <div key={d.id}>
//         TASk
        
//         title: {d. task_title}
//         <br />
//         subject: {d. task_subject}
//         <br />
//             工作:
//         <br />
//         {d.job.map((j:any)=>{
//           return(
//             <div key={j.id}>
            
//             <Link href={`/user/${userId}/profiles/taskprogressLists/${taskId}/${j.id}`}>
//           job code: {j.job_code}
//             <p>
//           {d.job_place}
//           </p>
//           <p>
//           {d.job_time}
//           </p>
//           <p>
//           {d.showprice && d.job_price}
//           </p>
//           <p>
//           {d.job_day}
//           </p>
//           <p>
//           {d.job_school_name}
//           </p>
//           <p>
//           {d.job_area}
//           </p>

//             </Link>
            

            
//           </div>
//           )
//         })}

//         </div>
//       )

//     })}


// </>


//   )
// }

// export default TaskListById

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Job {
  id: string;
  job_code: string;
  job_place: string;
  job_time_h: string;
  job_price: number;
  showprice: boolean;
  job_day: string;
  job_school_name: string;
  job_area: string;
}

interface Task {
  id: string;
  task_title: string;
  task_subject: string;
  job: Job[];
}

interface User {
  id: string;
  task: Task[];
}

const TaskListById = () => {
  const param = useParams();
  const userId = param.id as string;
  const taskId = param.taskprogressListsid as string;

  const [GetUserListsDatabyId, setGetUserListsDatabyId] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserListsDatabyId = async (id: string) => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/User_Lists_by_ID/${id}`);
        if (!res.ok) {
          throw new Error("無法獲取用戶數據");
        }
        const result = await res.json();
        setGetUserListsDatabyId(result);
      } catch (error) {
        setError("無法載入數據");
      } finally {
        setIsLoading(false);
      }
    };

    getUserListsDatabyId(userId);
  }, [userId]);

  if (isLoading) {
    return <div>載入中...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  if (!GetUserListsDatabyId.length) {
    return <div>未找到用戶數據</div>;
  }

  const TaskData = GetUserListsDatabyId[0]?.task?.find((task) => task.id === taskId);

  if (!TaskData) {
    return <div>未找到任務</div>;
  }

  return (
    <>
      <Link href={`/user/${userId}/profiles/taskprogressLists`}>上一頁</Link>
      <div>TaskListById</div>
      <div key={TaskData.id}>
        TASk
        <p>title: {TaskData.task_title}</p>
        <p>subject: {TaskData.task_subject}</p>
        <p>工作:</p>
        {TaskData.job.map((j) => (
          <div key={j.id}>
            <Link href={`/user/${userId}/profiles/taskprogressLists/${taskId}/${j.id}`}>
              <p>job code: {j.job_code}</p>
              <p>{j.job_place}</p>
              <p>{j.job_time_h}</p>
              <p>{j.showprice && j.job_price}</p>
              <p>{j.job_day}</p>
              <p>{j.job_school_name}</p>
              <p>{j.job_area}</p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default TaskListById;