// "use client"; // 標記此元件為客戶端元件（Next.js 特性）

// import { savePreviousDayJobToSalary } from "@/actions/Auto-Create-Salary";// 導入自定義函數，用於將 Job 資料存入 Salary

// import Link from "next/link"; // 導入 Next.js 的 Link 元件，用於客戶端導航
// import { useParams } from "next/navigation"; // 導入 useParams Hook，用於獲取路由參數
// import { useEffect, useState, useCallback } from "react"; // 導入 React 的常用 Hook

// const TaskJobListById = () => {
//   // 使用 useParams 獲取路由參數
//   const param = useParams();
//   // 從路由參數中提取 userId，並將其類型斷言為字串
//   const userId = param.id as string;
//   const tasktargetId = param.taskprogressListsid as string;

//   // 使用 useState 定義狀態：GetUserListsDatabyId 用於存儲用戶數據，showAlertButton 用於控制提醒按鈕的顯示
//   const [GetUserListsDatabyId, setGetUserListsDatabyId] = useState([]);
//   const [showAlertButton, setShowAlertButton] = useState(false);

//   // 定義一個獲取用戶數據的函數，並使用 useCallback 包裹以優化性能
//   const getUserListsDatabyId = useCallback(async (id: string) => {
//     try {
//       // 發送請求獲取用戶數據
//       const res = await fetch(`/api/User_Lists_by_ID/${id}`);
//       // 如果請求失敗，拋出錯誤
//       if (!res.ok) {
//         throw new Error("斷線！");
//       }
//       // 將響應解析為 JSON 格式
//       const result = await res.json();
//       // 將獲取的數據存入狀態
//       setGetUserListsDatabyId(result);
//     } catch (error) {
//       // 捕獲並處理錯誤
//       console.error("獲取用戶數據失敗：", error);
//     }
//   }, []); // 空依賴數組，確保函數只創建一次

//   // 使用 useEffect 在元件初始化時獲取用戶數據
//   useEffect(() => {
//     getUserListsDatabyId(userId);
//   }, [userId, getUserListsDatabyId]); // 依賴 userId 和 getUserListsDatabyId，當它們變化時重新執行

//   // 從獲取的用戶數據中提取 Job 數據
//   const JobData = GetUserListsDatabyId[0]?.job;

//   // 使用 useEffect 處理 Job 時間提醒邏輯
//   useEffect(() => {
//     // 從用戶數據中提取 Job 列表
//     const UserJobs = GetUserListsDatabyId[0]?.job;
//     // 提取第一個 Job 的日期，如果沒有則為 null
//     const Jobday = UserJobs && UserJobs.length > 0 ? UserJobs[0]?.job_day : null;

//     // 如果 Jobday 存在，設置提醒
//     if (Jobday) {
//         // const targetTime = new Date(Jobday).getTime();
//         // const alertTime = targetTime + 24 * 60 * 60 * 1000; // 24小時的毫秒數
//       // 獲取當前時間的時間戳
//       const targetTime = new Date().getTime();
//       // 設置提醒時間（測試用 5 秒，實際可用 24 小時的毫秒數）
//       const alertTime = targetTime + 5000;
//       // 獲取當前時間的時間戳
//       const currentTime = new Date().getTime();
//       // 計算距離提醒的時間差
//       const timeToAlert = alertTime - currentTime;

//       // 如果時間差大於 0，設置定時器
//       if (timeToAlert > 0) {
//         const timeoutId = setTimeout(() => {
//           console.log("時間到了！");
//           setShowAlertButton(true); // 顯示提醒按鈕
//         }, timeToAlert);

//         // 清理函數：在元件卸載或依賴變化時清除定時器
//         return () => clearTimeout(timeoutId);
//       } else {
//         // 如果時間已到，立即顯示提醒按鈕
//         console.log("時間已到！");
//         setShowAlertButton(true);
//       }
//     }
//   }, [GetUserListsDatabyId]); // 依賴 GetUserListsDatabyId，當其變化時重新執行

// //   // 定義每日午夜儲存前一天 Job 資料到 Salary 的函數，並使用 useCallback 包裹
// //   const scheduleDailyJobSave = useCallback((userId: string) => {
// //     // 獲取當前時間
// //     const now = new Date();
// //     // 計算明天的日期（當前日期的下一天）
// //     const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
// //     // 計算明天的午夜時間（00:00:00）
// //     const midnight = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 0, 0, 0);
// //     // 計算從現在到午夜的時間差（以毫秒為單位）
// //     const timeUntilMidnight = midnight.getTime() - now.getTime();
  
// //     // 設置一個定時器，在午夜時執行以下操作
// //     const timeoutId = setTimeout(() => {
// //       // 調用 savePreviousDayJobToSalary 函數，將前一天的 Job 資料存入 Salary
// //       savePreviousDayJobToSalary(userId)
// //         .then(() => {
// //           console.log("前一天的 Job 資料已存入 Salary");
// //           // 重新排程下一天的任務（只在午夜時重新排程）
// //           scheduleDailyJobSave(userId);
// //         })
// //         .catch((error) => {
// //           // 如果出錯，記錄錯誤並重新排程
// //           console.error("儲存前一天 Job 資料到 Salary 失敗：", error);
// //           scheduleDailyJobSave(userId);
// //         });
// //     }, 5000); // 測試用 5 秒，實際應使用 timeUntilMidnight
  
// //     // 返回清理函數，用於清除定時器
// //     return () => clearTimeout(timeoutId);
// //   }, []); // 空依賴數組，確保函數只創建一次


// const scheduleDailyJobSave = useCallback((userId: string) => {
//     const now = new Date();
//     const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
//     const midnight = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 0, 0, 0);
//     const timeUntilMidnight = midnight.getTime() - now.getTime();
  
//     const timeoutId = setTimeout(() => {
//       savePreviousDayJobToSalary(userId)
//         .then(() => {
//           console.log("前一天的 Job 資料已存入 Salary");
//         })
//         .catch((error) => {
//           console.error("儲存前一天 Job 資料到 Salary 失敗：", error);
//         });
//     }, 5000); // 測試時用 5000，實際可用 timeUntilMidnight
  
//     return () => clearTimeout(timeoutId);
//   }, []);

//   // 使用 useEffect 啟動每日儲存任務
//   useEffect(() => {
//     // 調用 scheduleDailyJobSave 函數，並獲取清理函數
//     const cleanup = scheduleDailyJobSave(userId);
//     // 返回清理函數，在元件卸載或 userId 改變時清除定時器
//     return cleanup;
//   }, [userId, scheduleDailyJobSave]); // 依賴 userId 和 scheduleDailyJobSave，當它們變化時重新執行

//   // 返回元件的 JSX 結構
//   return (
//     <>
//       {/* 使用 Link 元件創建導航按鈕 */}
//       <Link href={`/user/${userId}/profiles/jobprogressLists`}>上一頁</Link>
//       <div>JobListById</div>

//       {/* 遍歷 JobData 並渲染每個 Job 的詳細信息 */}
//       {JobData?.map((d) => (
//         <div key={d.id}>
//           <p>{d.job_code}</p>
//           <p>{d.job_place}</p>
//           <p>{d.job_time}</p>
//           <p>{d.job_price}</p>
//           <p>{d.showprice && d.job_day}</p>
//           <p>{d.job_school_name}</p>
//           <p>{d.job_area}</p>

//           {/* 如果 showAlertButton 為 true，顯示提醒按鈕 */}
//           {showAlertButton && (
//             <button
//               className="bg-red-500 text-white px-4 py-2 rounded"
//               onClick={() => setShowAlertButton(false)}
//             >
//               時間到了
//             </button>
//           )}
//         </div>
//       ))}
//     </>
//   );
// };

// // 導出元件
// export default TaskJobListById;




// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import { savePreviousDayJobToSalary } from "@/actions/Create-Salary";
// const  TaskJobListById = () => {

//   const param = useParams();
//   const userId = param.id as string;
//   const tasktargetId = param.taskprogressListsid as string;
//   console.log(param)

//   const [ GetUserListsDatabyId , setGetUserListsDatabyId ] = useState([]) ;  

//   const [showAlertButton, setShowAlertButton] = useState(false);

  
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

//   const JobData = GetUserListsDatabyId[0]?.job ;



//   useEffect(()=>{
//       const getUserListsDatabyId = async (id: any) => { 
//           const res = await fetch(`/api/User_Lists_by_ID/${id}`);
//           if(!res.ok){
//               throw new Error("斷線!");
//           }
//           const result = await res.json();
//           setGetUserListsDatabyId(result);
//       }
//       getUserListsDatabyId(userId);
//   }, [userId]);
  
//   //console.log("In NavBar :", GetUserListsDatabyId);

//   useEffect(() => {
//       const UserJobs = GetUserListsDatabyId[0]?.job;
//       const Jobday = UserJobs && UserJobs.length > 0 ? UserJobs[0]?.job_day : null;
// //        console.log("UserJobs:",  UserJobs );
// //        console.log("Jobday:", Jobday);  
      
//       if(Jobday) {
//           //之後會用(18/2/2025) 25/2/2025 用
//           // const targetTime = new Date(Jobday).getTime();
//           // const alertTime = targetTime + 24 * 60 * 60 * 1000; // 24小時的毫秒數
//           const targetTime = new Date().getTime();
//           const alertTime = targetTime + 5000; // 24小時的毫秒數
//           const currentTime = new Date().getTime();
//           const timeToAlert = alertTime - currentTime;

//           if (timeToAlert > 0) {
//               const timeoutId = setTimeout(() => {
//                   console.log("時間到了！");
//                   setShowAlertButton(true); // 設置按鈕顯示
//               }, timeToAlert);

//               return () => clearTimeout(timeoutId);
//           } else {
//               console.log("時間已到！");
//               setShowAlertButton(true); // 立即設置按鈕顯示
//           }
//       }
//   }, [GetUserListsDatabyId]);

//   useEffect(() => {
//       // 獲取當前時間
//       const now = new Date();
  
//       // 計算明天的日期（當前日期的下一天）
//       const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  
//       // 計算明天的午夜時間（即明天的 00:00:00）
//       const midnight = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 0, 0, 0);
  
//       // 計算從現在到午夜的時間差（以毫秒為單位）
//       const timeUntilMidnight = midnight.getTime() - now.getTime();
  
//       // 設置一個定時器，在午夜時執行以下操作
//       const timeoutId = setTimeout(() => {
//           // 將前一天的 Job 數據保存到 Salary
//           savePreviousDayJobToSalary(userId);
//           // 重新安排下一次的每日保存任務
//           scheduleDailyJobSave(userId);
//       }, timeUntilMidnight);
  
//       // 清理函數：在組件卸載或 userId 變化時清除定時器，避免內存洩漏
//       return () => clearTimeout(timeoutId);
//   }, [userId]); // 依賴項：當 userId 變化時，重新執行 useEffect
  
//   const scheduleDailyJobSave = (userId: string) => {
//       // 獲取當前時間
//       const now = new Date();
  
//       // 計算明天的日期（當前日期的下一天）
//       const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  
//       // 計算明天的午夜時間（即明天的 00:00:00）
//       const midnight = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 0, 0, 0);
  
//       // 計算從現在到午夜的時間差（以毫秒為單位）
//       const timeUntilMidnight = midnight.getTime() - now.getTime();
  
//       // 設置一個定時器，在午夜時執行以下操作
//       setTimeout(() => {
//           // 將前一天的 Job 數據保存到 Salary
//           savePreviousDayJobToSalary(userId);
//           // 重新安排下一次的每日保存任務（遞歸調用）
//           scheduleDailyJobSave(userId);
//       }, timeUntilMidnight);
//   };


  


//   return (
//     <>
    
    
//     <Link href={`/user/${userId}/profiles/taskprogressLists/${tasktargetId}`}>
//             上一頁
//             </Link>
    
//     <div>JobListById</div>

    
    

//   {JobData?.map((d:any)=>{
//     return(
//       <div key={d.id}>

//           <p>{d.job_code}</p>
//           <p>
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
        
        

//         {
//           showAlertButton && (
//                                     <button
//                                         className="bg-red-500 text-white px-4 py-2 rounded"
//                                         onClick={() => setShowAlertButton(false)}
//                                     >
//           時間到了
//           </button>
//                                 )
//                             }
//       </div>
//     )
// })}
//   </>
//   )
// }

// export default TaskJobListById


"use client";

import { savePreviousDayJobToSalary } from "@/actions/Auto-Create-Salary";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

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
  const [showAlertButton, setShowAlertButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // const getUserListsDatabyId = useCallback(async (id: string) => {
  //   setIsLoading(true);
  //   try {
  //     const res = await fetch(`/api/User_Lists_by_ID/${id}`);
  //     if (!res.ok) {
  //       throw new Error("無法獲取用戶數據");
  //     }
  //     const result = await res.json();
  //     setGetUserListsDatabyId(result);
  //   } catch (error) {
  //     setError("無法載入數據");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []);

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
    console.error("無法載入數據:", error); // 記錄錯誤詳情
    setError("無法載入數據");
  } finally {
    setIsLoading(false);
  }
}, []);

  useEffect(() => {
    getUserListsDatabyId(userId);
  }, [userId, getUserListsDatabyId]);

  const TaskData = GetUserListsDatabyId[0]?.task?.find((task) => task.id === tasktargetId);
  const JobData = TaskData?.job || [];

  useEffect(() => {
    const Jobday = JobData && JobData.length > 0 ? JobData[0]?.job_day : null;

    if (Jobday) {
      const targetTime = new Date().getTime();
      const alertTime = targetTime + 5000; // 測試用 5 秒，實際可用 24 小時
      const currentTime = new Date().getTime();
      const timeToAlert = alertTime - currentTime;

      if (timeToAlert > 0) {
        const timeoutId = setTimeout(() => {
          console.log("時間到了！");
          setShowAlertButton(true);
        }, timeToAlert);

        return () => clearTimeout(timeoutId);
      } else {
        console.log("時間已到！");
        setShowAlertButton(true);
      }
    }
  }, [JobData]);

  const scheduleDailyJobSave = useCallback((userId: string) => {
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const midnight = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 0, 0, 0);
    // const timeUntilMidnight = midnight.getTime() - now.getTime();

    const timeoutId = setTimeout(() => {
      savePreviousDayJobToSalary(userId)
        .then(() => {
          console.log("前一天的 Job 資料已存入 Salary");
        })
        .catch((error) => {
          console.error("儲存前一天 Job 資料到 Salary 失敗：", error);
        });
    }, 5000); // 測試用 5000，實際可用 timeUntilMidnight

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const cleanup = scheduleDailyJobSave(userId);
    return cleanup;
  }, [userId, scheduleDailyJobSave]);

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
      <Link href={`/user/${userId}/profiles/jobprogressLists`}>上一頁</Link>
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
            {showAlertButton && (
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => setShowAlertButton(false)}
              >
                時間到了
              </button>
            )}
          </div>
        ))
      )}
    </>
  );
};

export default TaskJobListById;