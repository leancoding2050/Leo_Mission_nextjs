// "use client";
// const taskprogressListsbyId = () => {
//   return (
//     <div>taskprogressListsbyId</div>
//   )
// }

// export default taskprogressListsbyId






"use client";

import { savePreviousDayJobToSalary } from "@/actions/Auto-Create-Salary";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";

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

const TaskJobListById = () => {
  const param = useParams();
  const userId = param.id as string;
  const tasktargetId = param.taskprogressListsid as string;

  const [GetUserListsDatabyId, setGetUserListsDatabyId] = useState<User[]>([]);
  // const [showAlertButton, setShowAlertButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getUserListsDatabyId = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/User_Lists_by_ID/${id}`);
      if (!res.ok) {
        throw new Error("無法獲取用戶數據");
      }
      const result = await res.json();
      setGetUserListsDatabyId(result);
    } catch (error) {
      console.error("無法載入數據:", error);
      setError("無法載入數據");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getUserListsDatabyId(userId);
  }, [userId, getUserListsDatabyId]);

  const TaskData = useMemo(
    () => GetUserListsDatabyId[0]?.task?.find((task) => task.id === tasktargetId),
    [GetUserListsDatabyId, tasktargetId]
  );
  const JobData = useMemo(() => TaskData?.job || [], [TaskData]);

  // useEffect(() => {
  //   const Jobday = JobData && JobData.length > 0 ? JobData[0]?.job_day : null;

  //   if (Jobday) {
  //     const targetTime = new Date().getTime();
  //     const alertTime = targetTime + 5000; // 測試用 5 秒，實際可用 24 小時
  //     const currentTime = new Date().getTime();
  //     const timeToAlert = alertTime - currentTime;

  //     if (timeToAlert > 0) {
  //       const timeoutId = setTimeout(() => {
  //         console.log("時間到了！");
  //         setShowAlertButton(true);
  //       }, timeToAlert);

  //       return () => clearTimeout(timeoutId);
  //     } else {
  //       console.log("時間已到！");
  //       setShowAlertButton(true);
  //     }
  //   }
  // }, [JobData]);

  // const scheduleDailyJobSave = useCallback((userId: string) => {
  //   const timeoutId = setTimeout(() => {
  //     savePreviousDayJobToSalary(userId)
  //       .then(() => {
  //         console.log("前一天的 Job 資料已存入 Salary");
  //       })
  //       .catch((error) => {
  //         console.error("儲存前一天 Job 資料到 Salary 失敗：", error);
  //       });
  //   }, 5000);

  //   return () => clearTimeout(timeoutId);
  // }, []);

  // useEffect(() => {
  //   const cleanup = scheduleDailyJobSave(userId);
  //   return cleanup;
  // }, [userId, scheduleDailyJobSave]);

  if (isLoading) {
    return <div>載入中...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  if (!GetUserListsDatabyId.length) {
    return <div>未找到用戶數據</div>;
  }

  if (!TaskData) {
    return <div>未找到任務</div>;
  }

  return (
    <>
      <Link href={`/user/${userId}/admin/userLists/taskprogressLists`}>上一頁</Link>
      <div>JobListById</div>
      {JobData.length === 0 ? (
        <p>沒有工作數據</p>
      ) : (
        JobData.map((d) => (
          <div key={d.id}>
            <p>{d.job_code}</p>
            <p>{d.job_place}</p>
            <p>{d.job_time_h}</p>
            <p>{d.showprice ? d.job_price : "價格隱藏"}</p>
            <p>{d.job_day}</p>
            <p>{d.job_school_name}</p>
            <p>{d.job_area}</p>
            {/* {showAlertButton && (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => setShowAlertButton(false)}
              >
                時間到了
              </button>
            )} */}
          </div>
        ))
      )}
    </>
  );
};

export default TaskJobListById;