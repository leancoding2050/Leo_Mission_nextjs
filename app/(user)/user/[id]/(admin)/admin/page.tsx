// "use client";
// // import ShowCalendar from "@/components/calendar/ShowCalendar";
// import ShowCalendar_Admin from "@/components/calendar/ShowCalendar_Admin";
// // import WhatsappTwilio from "@/components/whatsapp_twilio/whatspp_twilio";
// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import { useEffect, useState } from "react";


// const AdminPage = () => {
//     const session = useSession() ;
//     const userId = session.data?.user?.id as string ;

//     const [ GetUserdata , setGetUserdata ] = useState([])  ;

//     useEffect(() => {
//         const fetchUserdata = async (Id: string) => {
//             const res = await fetch(`/api/User_Lists_by_ID/${Id}`);
//             const data = await res.json();
//             setGetUserdata(data);
//         };
//         fetchUserdata(userId);
//     }, [userId])
    
//     console.log("Session : ", session.data?.user , "-- End --") 
//     console.log("UserId : ", userId,"-- End --")

//     const Events = GetUserdata[0]?.job ;

//     console.log("Events : ", Events , "-- End --")

//     return(
//         <>
//         <Link href={`/user/${userId}/admin/userLists`}> UserLists </Link>
//         <br />
//         <Link href={`/user/${userId}/admin/taskLists`}> TaskLists </Link>
//         <br />
//         <Link href={`/user/${userId}/admin/jobLists`}> JobLists </Link>
//         <br />
//         <Link href={`/user/${userId}/admin/applyLists`}> ApplyLists </Link>
//         <br />
//         <Link href={`/user/${userId}/admin/colorLists`}> ColorLists </Link>
//         <br />
//         <Link href={`/user/${userId}/admin/AllJobLists`}> AllJobLists </Link>
//         <br />
//         <Link href={`/user/${userId}/admin/sendwhatsappLists`}> SendWhatsAppLists </Link>
//         <br />
//         <br />
//             AdminPage


//             <ShowCalendar_Admin events={Events}/>   





//         </>
//     )
// }

// export default AdminPage


"use client";

import ShowCalendar_Admin from "@/components/calendar/ShowCalendar_Admin";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

// 定義 Job 類型，根據 Prisma 模型
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
  is_confirm: boolean; // 添加以匹配 JobEvent
  job_title?: string; // 可選字段，根據需要設置
}

// 定義 User 類型
interface User {
  id: string;
  email: string;
  nickname: string;
  username: string;
  role: "ADMIN" | "TEACHER";
  isAdmin: boolean;
  job: Job[];
}

// 定義 JobEvent 類型，與 ShowCalendar_Admin 一致
interface JobEvent {
  job_day: string;
  job_time_start: string;
  job_time_end: string;
  job_title: string;
  is_confirm: boolean;
}

const AdminPage = () => {
  const session = useSession();
  const userId = session.data?.user?.id as string | undefined;

  const [getUserData, setGetUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async (id: string) => {
      try {
        const res = await fetch(`/api/User_Lists_by_ID/${id}`);
        if (!res.ok) throw new Error(`請求失敗: ${res.status}`);
        const data: User = await res.json();
        if (!data.isAdmin) throw new Error("無管理員權限");
        setGetUserData(data);
        setError("");
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "未知錯誤");
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUserData(userId);
    } else {
      setError("未登錄或無效的用戶 ID");
      setIsLoading(false);
    }
  }, [userId]);

  // 將 Job[] 轉換為 JobEvent[]
  const events: JobEvent[] = getUserData?.job.map((job) => ({
    job_day: job.job_day,
    job_time_start: job.job_time_h.split("-")[0] || "09:00", // 假設 job_time_h 是 "09:00-17:00"
    job_time_end: job.job_time_h.split("-")[1] || "17:00",
    job_title: job.job_title || job.job_code, // 使用 job_code 作為回退
    is_confirm: job.is_confirm ?? false,
  })) ?? [];

  if (isLoading) return <div className="p-4 text-gray-500">正在加載...</div>;
  if (error) return <div className="p-4 text-red-500">錯誤: {error}</div>;
  if (!getUserData) return <div className="p-4 text-gray-500">無用戶數據</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">管理員頁面</h1>
      <div className="space-y-2">
        <Link href={`/user/${userId}/admin/userLists`} className="block text-blue-500 hover:underline">
          用戶列表
        </Link>
        <Link href={`/user/${userId}/admin/taskLists`} className="block text-blue-500 hover:underline">
          任務列表
        </Link>
        <Link href={`/user/${userId}/admin/jobLists`} className="block text-blue-500 hover:underline">
          工作列表
        </Link>
        <Link href={`/user/${userId}/admin/applyLists`} className="block text-blue-500 hover:underline">
          申請列表
        </Link>
        <Link href={`/user/${userId}/admin/colorLists`} className="block text-blue-500 hover:underline">
          顏色列表
        </Link>
        <Link href={`/user/${userId}/admin/AllJobLists`} className="block text-blue-500 hover:underline">
          所有工作列表
        </Link>
        <Link href={`/user/${userId}/admin/sendwhatsappLists`} className="block text-blue-500 hover:underline">
          WhatsApp 訊息列表
        </Link>
      </div>

      <div className="mt-4">
        <ShowCalendar_Admin events={events} />
      </div>
    </div>
  );
};

export default AdminPage;