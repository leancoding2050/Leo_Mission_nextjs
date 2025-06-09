      "use client"; // 標記此元件為客戶端元件（Next.js 特性）
      
      import { savePreviousDayJobToSalary } from "@/actions/Auto-Create-Salary";
      import { CreateSendWhatappsLists } from "@/actions/Create-SendWhatappsLists";
import { UpdataConfirmJob } from "@/actions/UPDATA-Confirm-Job";
      import Link from "next/link";
      import { useParams } from "next/navigation";
      import { useEffect, useState, useCallback } from "react";
      

    interface User {
  id: string;
  username: string;
  job?: { id: string; job_day: string }[]; // 根據上下文推測 job 結構
}

interface Job {
  id: string;
  job_code: string;
  job_place: string;
  job_time: string;
  job_price: number;
  showprice: boolean;
  job_day: string;
  job_school_name: string;
  job_area: string;
}

const JobListById = () => {
  const param = useParams();
  const userId = param.id as string;

  const [GetUserListsDatabyId, setGetUserListsDatabyId] = useState<User[]>([]); // 改為 User[]
  const [showAlertButton, setShowAlertButton] = useState(false);
  const [GetJobdetailbyId, setGetJobdetailbyId] = useState<Job[]>([]); // 改為 Job[]
  const [Jobday, setJobday] = useState<string | null>(null);
      
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
          // const timeUntilMidnight = midnight.getTime() - now.getTime();
      
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
      
            {GetJobdetailbyId?.map((d) => (
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

// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useEffect, useState, useCallback, useMemo } from "react";
// import { format, subDays, isBefore, differenceInMilliseconds } from "date-fns"; // For date handling
// import { savePreviousDayJobToSalary } from "@/actions/Auto-Create-Salary";
// import { CreateSendWhatsAppLists } from "@/actions/Create-SendWhatsAppLists"; // Fixed typo
// import { UpdateConfirmJob } from "@/actions/Update-Confirm-Job"; // Fixed naming
// import { Button } from "@/components/ui/button"; // Assuming you have a UI library

// interface Job {
//   id: string;
//   job_code: string;
//   job_place: string;
//   job_time_start: string;
//   job_time_end: string;
//   job_price: number;
//   job_day: string;
//   job_school_name: string;
//   job_area: string;
//   showprice: boolean;
// }

// interface User {
//   id: string;
//   username: string;
//   job: Job[];
// }

// const JobListById = () => {
//   const { id: userId } = useParams<{ id: string }>();
//   const [userData, setUserData] = useState<User | null>(null);
//   const [jobDetails, setJobDetails] = useState<Job[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [showAlertButton, setShowAlertButton] = useState(false);

//   // Fetch user data
//   const fetchUserData = useCallback(async (id: string) => {
//     try {
//       const res = await fetch(`/api/User_Lists_by_ID/${id}`);
//       if (!res.ok) throw new Error("Failed to fetch user data");
//       const result = await res.json();
//       setUserData(result[0] || null);
//     } catch (err) {
//       setError("Unable to load user data. Please try again later.");
//       console.error(err);
//     }
//   }, []);

//   // Fetch job details
//   const fetchJobDetails = useCallback(async (jobId: string) => {
//     try {
//       const res = await fetch(`/api/Job_Lists_by_ID/${jobId}`);
//       if (!res.ok) throw new Error("Failed to fetch job details");
//       const result = await res.json();
//       setJobDetails(result);
//     } catch (err) {
//       setError("Unable to load job details. Please try again later.");
//       console.error(err);
//     }
//   }, []);

//   // Load user data on mount
//   useEffect(() => {
//     if (userId) fetchUserData(userId);
//   }, [userId, fetchUserData]);

//   // Load job details when user data is available
//   useEffect(() => {
//     if (userData?.job?.[0]?.id) {
//       fetchJobDetails(userData.job[0].id);
//     }
//   }, [userData, fetchJobDetails]);

//   // Handle WhatsApp message and alert button logic
//   useEffect(() => {
//     if (!userData?.job?.[0]?.job_day) return;

//     const jobDay = new Date(userData.job[0].job_day);
//     const alertDate = subDays(jobDay, 1);
//     alertDate.setHours(9, 0, 0, 0);

//     const now = new Date();
//     const timeToAlert = differenceInMilliseconds(alertDate, now);

//     if (timeToAlert > 0) {
//       const timeoutId = setTimeout(() => {
//         CreateSendWhatsAppLists(userData.job[0].id)
//           .then(() => console.log("WhatsApp message sent"))
//           .catch((err) => console.error("Failed to send WhatsApp message:", err));
//         setShowAlertButton(true);
//       }, timeToAlert);

//       return () => clearTimeout(timeoutId);
//     } else {
//       setShowAlertButton(true);
//       const timeSinceAlert = differenceInMilliseconds(now, alertDate);
//       if (timeSinceAlert > 24 * 60 * 60 * 1000) {
//         setShowAlertButton(false);
//       }
//     }
//   }, [userData]);

//   // Schedule daily job save to Salary
//   const scheduleDailyJobSave = useCallback((userId: string) => {
//     const now = new Date();
//     const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
//     const midnight = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 0, 0, 0);
//     const timeUntilMidnight = differenceInMilliseconds(midnight, now);

//     const timeoutId = setTimeout(() => {
//       savePreviousDayJobToSalary(userId)
//         .then(() => console.log("Previous day's job saved to Salary"))
//         .catch((err) => console.error("Failed to save job to Salary:", err));
//     }, timeUntilMidnight); // Use 5000 for testing, timeUntilMidnight for production

//     return () => clearTimeout(timeoutId);
//   }, []);

//   useEffect(() => {
//     if (userId) {
//       const cleanup = scheduleDailyJobSave(userId);
//       return cleanup;
//     }
//   }, [userId, scheduleDailyJobSave]);

//   // Handle job confirmation
//   const handleConfirmJob = async (jobId: string) => {
//     try {
//       await UpdateConfirmJob(jobId);
//       setShowAlertButton(false);
//       alert("Job confirmed successfully!");
//     } catch (err) {
//       console.error("Failed to confirm job:", err);
//       alert("Failed to confirm job. Please try again.");
//     }
//   };

//   // Check if button should be disabled
//   const isButtonDisabled = useMemo(() => {
//     if (!userData?.job?.[0]?.job_day) return true;
//     const jobDay = new Date(userData.job[0].job_day);
//     const alertTime = subDays(jobDay, 1).setHours(9, 0, 0, 0);
//     return isBefore(new Date(), new Date(alertTime));
//   }, [userData]);

//   if (error) return <div className="p-4 text-red-500">{error}</div>;
//   if (!userData || !jobDetails.length) return <div className="p-4">Loading...</div>;

//   return (
//     <div className="p-4">
//       <Link href={`/user/${userId}/profiles/jobprogressLists`} className="text-blue-500 hover:underline">
//         上一頁
//       </Link>
//       <h1 className="text-2xl font-bold mb-4">Job Details</h1>

//       {jobDetails.map((job) => (
//         <div key={job.id} className="border p-4 rounded-md mb-4">
//           <p><strong>Job Code:</strong> {job.job_code}</p>
//           <p><strong>Place:</strong> {job.job_place}</p>
//           <p><strong>Time:</strong> {job.job_time_start} - {job.job_time_end}</p>
//           <p><strong>Price:</strong> {job.job_price}</p>
//           {job.showprice && <p><strong>Day:</strong> {format(new Date(job.job_day), "yyyy-MM-dd")}</p>}
//           <p><strong>School:</strong> {job.job_school_name}</p>
//           <p><strong>Area:</strong> {job.job_area}</p>

//           {showAlertButton && (
//             <Button
//               className={isButtonDisabled ? "bg-gray-300 text-gray-500" : "bg-red-500 text-white hover:bg-red-600"}
//               disabled={isButtonDisabled}
//               onClick={() => handleConfirmJob(job.id)}
//             >
//               {isButtonDisabled ? "已過期" : "確認工作"}
//             </Button>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default JobListById;