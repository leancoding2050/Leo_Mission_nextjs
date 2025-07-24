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

  // 更新狀態類型為 Task | null，允許單個任務或 null
  const [getTaskDetailById, setGetTaskDetailById] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTaskDetailById = async (id: string) => {
      try {
        const res = await fetch(`/api/Task_Lists_by_ID/${id}`);
        if (!res.ok) {
          throw new Error(`請求失敗: ${res.status}`);
        }
        // 使用 any 避免強制 Task[]，後續檢查數據格式
        const data = await res.json();
        // 檢查數據是否為有效的 Task 物件
        if (data && typeof data === "object" && "id" in data) {
          setGetTaskDetailById(data as Task);
        } else {
          throw new Error("無效的任務數據格式");
        }
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

  if (isLoading)
    return (
      <div className="flex-1 sm:ml-12 md:ml-16 p-4 text-gray-500">
        正在加載...
      </div>
    );
  if (error)
    return (
      <div className="flex-1 sm:ml-12 md:ml-16 p-4 text-red-500">
        錯誤: {error}
      </div>
    );
  if (!getTaskDetailById)
    return (
      <div className="flex-1 sm:ml-12 md:ml-16 p-4 text-gray-500">
        無任務數據
      </div>
    );

  // 直接使用 getTaskDetailById（單個 Task 物件）
  const task = getTaskDetailById;

  return (
    <div className="flex-1 sm:ml-12 md:ml-16 p-4 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* 導航連結 */}
        <div className="flex space-x-4 mb-6">
          <Link
            href={`/user/${userId}/admin/taskLists`}
            className="text-primary-1 hover:underline text-sm md:text-base"
            aria-label="返回任務列表"
          >
            返回
          </Link>
          <Link
            href={`/user/${userId}/admin/taskLists/${task.id}/edit`}
            className="text-primary-1 hover:underline text-sm md:text-base"
            aria-label={`編輯任務 ${task.task_title}`}
          >
            更改
          </Link>
        </div>

        {/* 任務詳情 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-xl md:text-2xl font-bold text-primary-1">
            任務詳情
          </h1>
          <div className="mt-4 space-y-2 text-sm md:text-base text-gray-700">
            <p>
              <span className="font-semibold">任務標題:</span>{" "}
              {task.task_title}
            </p>
            <p>
              <span className="font-semibold">任務主題:</span>{" "}
              {task.task_subject}
            </p>
            <p>
              <span className="font-semibold">任務編號:</span>{" "}
              {task.task_code}
            </p>
            <p>
              <span className="font-semibold">任務地區:</span>{" "}
              {task.task_area}
            </p>
            <p>
              <span className="font-semibold">學校名稱:</span>{" "}
              {task.School_name?.join(", ")}
            </p>
            <p>
              <span className="font-semibold">價格:</span> {task.task_price}
            </p>
            <p>
              <span className="font-semibold">是否完成:</span>{" "}
              {task.completed ? "完成" : "未完成"}
            </p>
            <p>
              <span className="font-semibold">是否公開:</span>{" "}
              {task.task_public ? "公開" : "不公開"}
            </p>
            <p>
              <span className="font-semibold">是否公開價格:</span>{" "}
              {task.showprice ? "公開" : "不公開"}
            </p>
            <p>
              <span className="font-semibold">工作數量:</span>{" "}
              {task.job?.length}
            </p>
            <p>
              <span className="font-semibold">老師:</span>{" "}
              {task.teacher ?? "無"}
            </p>
          </div>

          {/* 相關工作 */}
          <h2 className="text-lg md:text-xl font-semibold mt-6 text-primary-1">
            相關工作
          </h2>
          {task.job?.length > 0 ? (
            <div className="mt-4 space-y-4">
              {task.job.map((j) => (
                <div
                  key={j.id}
                  className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-grey-2 transition-colors"
                >
                  <p>
                    <span className="font-semibold">工作編號:</span>{" "}
                    {j.job_code}
                  </p>
                  <p>
                    <span className="font-semibold">工作地點:</span>{" "}
                    {j.job_place}
                  </p>
                  <p>
                    <span className="font-semibold">工作時間:</span>{" "}
                    {j.job_time_h}
                  </p>
                  <p>
                    <span className="font-semibold">工作價格:</span>{" "}
                    {j.job_price}
                  </p>
                  <p>
                    <span className="font-semibold">工作日期:</span>{" "}
                    {new Date(j.job_day).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-semibold">工作是否完成:</span>{" "}
                    {j.job_complete ? "完成" : "未完成"}
                  </p>
                  <p>
                    <span className="font-semibold">任務編號:</span>{" "}
                    {j.task_code}
                  </p>
                  <p>
                    <span className="font-semibold">工作學校名稱:</span>{" "}
                    {j.job_school_name}
                  </p>
                  <p>
                    <span className="font-semibold">工作地區:</span>{" "}
                    {j.job_area}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 mt-2">無相關工作</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetailById;