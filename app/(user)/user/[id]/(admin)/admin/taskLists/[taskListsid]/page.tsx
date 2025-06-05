// "use client";

// import { useParams } from "next/navigation";
// import { useEffect, useState,
//     // useTransition  
// } from "react";
// // import { Button } from "@/components/ui/button";

// // import { useForm } from "react-hook-form";
// // import { z } from "zod";
// // import { Delete_Job_Schema } from "@/actions/Delete-Job(備用)/schema";
// // import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";


// const TaskdetailbyId = () => {
//     const param = useParams();
    
//     const UserId = param?.id as string;
//     const TaskId = param?.taskListsid as string;

//     const [GetTaskdetailbyId, setGetTaskdetailbyId] = useState([]);
//     // const [ isPending , startTransition ] =useTransition();



//     useEffect(() => {
//         const fetchTaskdetailbyId = async (TaskId: string) => {
//             const res = await fetch(`/api/Task_Lists_by_ID/${TaskId}`);
//             const data = await res.json();
//             setGetTaskdetailbyId(data);
//         };
//         fetchTaskdetailbyId(TaskId);
//     }, [TaskId]);

//     console.log(GetTaskdetailbyId);

//     // const delete_job_task = useForm<z.infer<typeof Delete_Job_Schema>>({
//     //     resolver: zodResolver(Delete_Job_Schema),
//     //     defaultValues: {
//     //         id: "",
//     //     },
//     // });
//     // const del_job = (values:z.infer<typeof Delete_Job_Schema>) => {
//     //     startTransition(() => {
//     //         deleteJob_task(values)
//     //     })
//     // }


//   return (
//     <>
//     {GetTaskdetailbyId?.map((d)=>{
//         return(
            
//             <div key={d.id}>
//             <Link href={`/user/${UserId}/admin/taskLists/`} >
//             返回
//             </Link>
// <br />
//             <Link href={`/user/${UserId}/admin/taskLists/${d.id}/edit`}>
//             更改
//             </Link>
//             <br />
            
//                 TaskTitle: {d.task_title}
//                 <br />
//                 Task主題: {d.task_subject}
//                 <br />
//                 TaskCode: {d.task_code}
//                 <br />
//                 Taskarea: {d.task_area}
//                 <br />
//                 schoolName: {d.School_name}
//                 <br />
//                 價錢: {d.task_price}
//                 <br />
//                 是否完成: {d.completed ? "完成" : "未完成"}
//                 <br />
//                 是否公開: {d.task_public ? "公開" : "不公開"}
//                 <br />
//                 是否公開價錢: {d.showprice ? "公開" : "不公開"}
//                 <br />
//                 工作數量: {d.job.length}
//                 <br />
//                 老師: {d.teacher}
//                 <br />
            
//                 工作: {d.job.map((j)=>(
         
//                     <div key={j.id}>
//                         <br />
//                         工作編號:{ j.job_code }
//                         <br />  
//                         工作地方:{ j.job_place }
//                         <br />
//                         工作時間:{ j.job_time }
//                         <br />
//                         工作價錢:{ j.job_price }
//                         <br />
//                         工作日期:{ j.job_day }
//                         <br />
//                         工作是否完成: {j.job_complate}
//                         <br />
//                         TaskCode : {j.task_code}
//                         <br />
//                         工作學校名:{ j.job_school_name }
//                         <br />
//                         工作地區 : {j.job_area}
//                     </div>



//     ))}
                
//                     {/* <form onSubmit={del_job}>
//                         <Button>移除工作</Button>
//                     </form> */}

                 




//         </div>

        
//         )
//     })}
//     </>
//   )
// };  

// export default TaskdetailbyId;






"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// 定義 Job 和 Task 類型，根據 Prisma 模型
interface Job {
  id: string;
  job_code: string;
  job_place: string;
  job_time_h: string;
  job_price: number;
  job_day: string;
  job_complete: boolean;
  job_school_name: string;
  job_area: string;
  task_code: string;
}

interface Task {
  id: string;
  task_title: string;
  task_subject: string;
  task_code: string;
  task_area: string;
  School_name: string[];
  task_price: number;
  completed: boolean;
  task_public: boolean;
  showprice: boolean;
  teacher: string | null;
  job: Job[];
}

const TaskDetailById = () => {
  const params = useParams();
  const userId = params?.id as string | undefined;
  const taskId = params?.taskListsid as string | undefined;

  // 狀態類型設為 Task[]，因為 API 返回陣列
  const [getTaskDetailById, setGetTaskDetailById] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTaskDetailById = async (id: string) => {
      try {
        const res = await fetch(`/api/Task_Lists_by_ID/${id}`);
        if (!res.ok) {
          throw new Error(`請求失敗: ${res.status}`);
        }
        const data: Task[] = await res.json(); // 預期回傳 Task 陣列
        setGetTaskDetailById(data);
        setError("");
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "未知錯誤");
      } finally {
        setIsLoading(false);
      }
    };

    if (taskId) {
      fetchTaskDetailById(taskId);
    } else {
      setError("無效的任務 ID");
      setIsLoading(false);
    }
  }, [taskId]);

  if (isLoading) return <div className="p-4 text-gray-500">正在加載...</div>;
  if (error) return <div className="p-4 text-red-500">錯誤: {error}</div>;
  if (!getTaskDetailById || getTaskDetailById.length === 0)
    return <div className="p-4 text-gray-500">無任務數據</div>;

  // 提取第一個 Task 物件
  const task = getTaskDetailById[0];

  return (
    <div className="p-4">
      <Link href={`/user/${userId}/admin/taskLists`} className="text-blue-500 hover:underline">
        返回
      </Link>
      <br />
      <Link
        href={`/user/${userId}/admin/taskLists/${task.id}/edit`}
        className="text-blue-500 hover:underline"
      >
        更改
      </Link>
      <div className="mt-4">
        <h1 className="text-xl font-bold">任務詳情</h1>
        <div className="mt-2">
          <p>任務標題: {task.task_title}</p>
          <p>任務主題: {task.task_subject}</p>
          <p>任務編號: {task.task_code}</p>
          <p>任務地區: {task.task_area}</p>
          <p>學校名稱: {task.School_name?.join(", ")}</p>
          <p>價格: {task.task_price}</p>
          <p>是否完成: {task.completed ? "完成" : "未完成"}</p>
          <p>是否公開: {task.task_public ? "公開" : "不公開"}</p>
          <p>是否公開價格: {task.showprice ? "公開" : "不公開"}</p>
          <p>工作數量: {task.job?.length}</p>
          <p>老師: {task.teacher ?? "無"}</p>
        </div>

        <h2 className="text-lg font-semibold mt-4">相關工作</h2>
        {task.job?.length > 0 ? (
          <div className="space-y-4 mt-2">
            {task.job.map((j) => (
              <div key={j.id} className="p-4 border rounded-lg shadow-sm">
                <p>工作編號: {j.job_code}</p>
                <p>工作地點: {j.job_place}</p>
                <p>工作時間: {j.job_time_h}</p>
                <p>工作價格: {j.job_price}</p>
                <p>工作日期: {new Date(j.job_day).toLocaleDateString()}</p>
                <p>工作是否完成: {j.job_complete ? "完成" : "未完成"}</p>
                <p>任務編號: {j.task_code}</p>
                <p>工作學校名稱: {j.job_school_name}</p>
                <p>工作地區: {j.job_area}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">無相關工作</p>
        )}
      </div>
    </div>
  );
};

export default TaskDetailById;