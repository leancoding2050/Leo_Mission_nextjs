      "use client"; // 標記此元件為客戶端元件（Next.js 特性）
      
      import { savePreviousDayJobToSalary } from "@/actions/Auto-Create-Salary";
      import { CreateSendWhatappsLists } from "@/actions/Create-SendWhatappsLists";
import { UpdataConfirmJob } from "@/actions/UPDATA-Confirm-Job";
      import Link from "next/link";
      import { useParams } from "next/navigation";
      import { useEffect, useState, useCallback } from "react";
      

      const JobListById = () => {
        const param = useParams();
        const userId = param.id as string;
      
        const [GetUserListsDatabyId, setGetUserListsDatabyId] = useState<any[]>([]);
        const [showAlertButton, setShowAlertButton] = useState(false);
        const [GetJobdetailbyId, setGetJobdetailbyId] = useState<any[]>([]);
        const [Jobday, setJobday] = useState<string | null>(null); // 新增狀態以存儲 Jobday
      
        const getUserListsDatabyId = useCallback(async (id: string) => {
          try {
            const res = await fetch(`/api/User_Lists_by_ID/${id}`);
            if (!res.ok) {
              throw new Error("斷線！");
            }
            const result = await res.json();
            setGetUserListsDatabyId(result);
          } catch (error) {
            console.error("獲取用戶數據失敗：", error);
          }
        }, []);
      
        useEffect(() => {
          getUserListsDatabyId(userId);
        }, [userId, getUserListsDatabyId]);
      
        const JobData = GetUserListsDatabyId[0]?.job;
      
        useEffect(() => {
          if (JobData) {
            const JobDataById = JobData[0]?.id;
            const GetJobdetailbyId = async (id: string) => {
              const res = await fetch(`/api/Job_Lists_by_ID/${id}`);
              if (!res.ok) {
                throw new Error("斷線!");
              }
              const result = await res.json();
              setGetJobdetailbyId(result);
            };
            GetJobdetailbyId(JobDataById);
      
            // 提取 Jobday 並設置到狀態中
            const jobDay = JobData[0]?.job_day || null;
            setJobday(jobDay);
          }
        }, [JobData]);
      
        useEffect(() => {
          const UserJobs = GetUserListsDatabyId[0]?.job;
          const JobdayFromState = UserJobs && UserJobs.length > 0 ? UserJobs[0]?.job_day : null;
      
          if (UserJobs && JobdayFromState) {
            const JobDataById = UserJobs[0]?.id;
      
            const jobDate = new Date(JobdayFromState);
            const alertDate = new Date(jobDate);
            alertDate.setDate(jobDate.getDate() - 1);
            alertDate.setHours(9, 0, 0, 0);
      
            const currentTime = new Date().getTime();
            const alertTime = alertDate.getTime();
      
            const timeToAlert = alertTime - currentTime;
      
            if (timeToAlert > 0) {
              const timeoutId = setTimeout(() => {
                console.log("時間到了！");
                CreateSendWhatappsLists(JobDataById);
                setShowAlertButton(true);
              }, timeToAlert);
      
              return () => clearTimeout(timeoutId);
            } else {
              console.log("時間已過！");
              setShowAlertButton(true);
      
              const timeSinceAlert = currentTime - alertTime;
              const twentyFourHours = 24 * 60 * 60 * 1000;
      
              if (timeSinceAlert > twentyFourHours) {
                setShowAlertButton(false);
              }
            }
          }
        }, [GetUserListsDatabyId]);
      
        const scheduleDailyJobSave = useCallback((userId: string) => {
          const now = new Date();
          const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
          const midnight = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 0, 0, 0);
          const timeUntilMidnight = midnight.getTime() - now.getTime();
      
          const timeoutId = setTimeout(() => {
            savePreviousDayJobToSalary(userId)
              .then(() => {
                console.log("前一天的 Job 資料已存入 Salary");
              })
              .catch((error) => {
                console.error("儲存前一天 Job 資料到 Salary 失敗：", error);
              });
          }, 5000); // 測試時用 5000，實際可用 timeUntilMidnight
      
          return () => clearTimeout(timeoutId);
        }, []);
      
        useEffect(() => {
          const cleanup = scheduleDailyJobSave(userId);
          return cleanup;
        }, [userId, scheduleDailyJobSave]);
      
        // 處理按鈕點擊並調用 UpdataConfirmJob
        const handleConfirmJob = async (jobId: string) => {
          try {
            await UpdataConfirmJob(jobId); // 調用服務端函數
            console.log(`Job ${jobId} 已確認`);
            setShowAlertButton(false); // 成功後隱藏按鈕
          } catch (error) {
            console.error("確認 Job 失敗：", error);
            alert("確認失敗，請稍後再試！");
          }
        };

        return (
          <>
            <Link href={`/user/${userId}/profiles/jobprogressLists`}>上一頁</Link>
            <div>JobListById</div>
      
            {GetJobdetailbyId?.map((d: any) => (
              <div key={d.id}>
                <p>{d.job_code}</p>
                <p>{d.job_place}</p>
                <p>{d.job_time}</p>
                <p>{d.job_price}</p>
                <p>{d.showprice && d.job_day}</p>
                <p>{d.job_school_name}</p>
                <p>{d.job_area}</p>
      
                {showAlertButton && Jobday && ( // 確保 Jobday 存在
                  <button
                    className={`px-4 py-2 rounded ${
                      new Date().getTime() > new Date(Jobday).getTime() - 86400000 + 32400000
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                    onClick={() => {
                      if (new Date().getTime() <= new Date(Jobday).getTime() - 86400000 + 32400000) {
                        setShowAlertButton(false);
                        handleConfirmJob(d.id); // 調用確認函數並傳遞 jobId
                      }
                    }}
                    disabled={new Date().getTime() > new Date(Jobday).getTime() - 86400000 + 32400000}
                  >
                    {new Date().getTime() > new Date(Jobday).getTime() - 86400000 + 32400000
                      ? "已過期"
                      : "時間到了"}
                  </button>
                )}
              </div>
            ))}
          </>
        );
      };
      
      export default JobListById;