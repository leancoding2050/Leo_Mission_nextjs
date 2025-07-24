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


// "use client";

// import ShowCalendar_Admin from "@/components/calendar/ShowCalendar_Admin";
// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// interface Job {
//   id: string;
//   job_code: string;
//   job_place: string;
//   job_time_h: string;
//   job_time_start: string;
//   job_time_end: string;
//   job_price: number;
//   job_day: string;
//   job_complete: boolean;
//   job_school_name: string;
//   job_area: string;
//   task_code: string;
//   is_confirm: boolean;
//   job_title: string;
//   job_subject: string;
// }

// interface User {
//   id: string;
//   email: string;
//   nickname: string;
//   username: string;
//   role: "ADMIN" | "TEACHER";
//   isAdmin: boolean;
//   job: Job[];
// }

// const AdminPage = () => {
//   const session = useSession();
//   const userId = session.data?.user?.id as string | undefined;

//   const [getUserData, setGetUserData] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchUserData = async (id: string) => {
//       try {
//         const res = await fetch(`/api/User_Lists_by_ID/${id}`);
//         if (!res.ok) throw new Error(`請求失敗: ${res.status}`);
//         const data: User[] = await res.json();
//         console.log("API 返回的數據:", JSON.stringify(data, null, 2));
//         if (!data || data.length === 0) throw new Error("無用戶數據");
//         const user = data[0];
//         console.log("用戶數據:", JSON.stringify(user, null, 2));
//         console.log("工作數據:", JSON.stringify(user.job, null, 2));
//         if (!user.isAdmin) throw new Error("無管理員權限");
//         setGetUserData(user);
//         setError("");
//       } catch (err: unknown) {
//         setError(err instanceof Error ? err.message : "未知錯誤");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (userId) {
//       fetchUserData(userId);
//     } else {
//       setError("未登錄或無效的用戶 ID");
//       setIsLoading(false);
//     }
//   }, [userId]);

//   const events = getUserData?.job || [];

//   if (isLoading) return <div className="p-4 text-gray-500">正在加載...</div>;
//   if (error) return <div className="p-4 text-red-500">錯誤: {error}</div>;
//   if (!getUserData) return <div className="p-4 text-gray-500">無用戶數據</div>;

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">管理員頁面</h1>
//       <div className="space-y-2">
//         <Link href={`/user/${userId}/`} className="block text-blue-500 hover:underline">
//           返回普通用戶頁面
//         </Link>
//         <Link href={`/user/${userId}/admin/userLists`} className="block text-blue-500 hover:underline">
//           用戶列表
//         </Link>
//         <Link href={`/user/${userId}/admin/taskLists`} className="block text-blue-500 hover:underline">
//           任務列表
//         </Link>
//         <Link href={`/user/${userId}/admin/jobLists`} className="block text-blue-500 hover:underline">
//           工作列表
//         </Link>
//         <Link href={`/user/${userId}/admin/applyLists`} className="block text-blue-500 hover:underline">
//           申請列表
//         </Link>
//         <Link href={`/user/${userId}/admin/colorLists`} className="block text-blue-500 hover:underline">
//           顏色列表
//         </Link>
//         <Link href={`/user/${userId}/admin/sendwhatsappLists`} className="block text-blue-500 hover:underline">
//           WhatsApp 訊息列表
//         </Link>
//       </div>
//       <div className="mt-4">
//         <ShowCalendar_Admin events={events} />
//       </div>
//     </div>
//   );
// };

// export default AdminPage;


"use client";

import ShowCalendar_Admin from "@/components/calendar/ShowCalendar_Admin";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Job {
  id: string;
  job_code: string;
  job_place: string;
  job_time_h: string;
  job_time_start: string;
  job_time_end: string;
  job_price: number;
  job_day: string;
  job_complete: boolean;
  job_school_name: string;
  job_area: string;
  task_code: string;
  is_confirm: boolean;
  job_title: string;
  job_subject: string;
}

interface User {
  id: string;
  email: string;
  nickname: string;
  username: string;
  role: "ADMIN" | "TEACHER";
  isAdmin: boolean;
  job: Job[];
}

export default function AdminPage() {
  const session = useSession();
  const userId = session.data?.user?.id as string | undefined;

  const [getUserData, setGetUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
const fetchUserData = async (id: string) => {
  try {
    const res = await fetch(`/api/User_Lists_by_ID/${id}`);
    console.log("API 請求成功");
    if (!res.ok) throw new Error(`請求失敗: ${res.status}`);
    const data = await res.json();
    console.log("API 回傳數據:", data);
    
    // 假設後端回傳單個 User 物件
    const user: User = data;
    if (!user) throw new Error("無用戶數據");
    if (!user.isAdmin) throw new Error("無管理員權限");
    
    setGetUserData(user);
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

  console.log("getUserData : ",getUserData)

  const events = getUserData?.job || [];

  if (isLoading)
    return (
      <div className="ml-[50px] p-4 text-[#1D475D] font-noto-sans-tc">正在加載...</div>
    );
  if (error)
    return (
      <div className="ml-[50px] p-4 text-[#FF0000] font-noto-sans-tc">錯誤: {error}</div>
    );
  if (!getUserData)
    return (
      <div className="ml-[50px] p-4 text-[#1D475D] font-noto-sans-tc">無用戶數據</div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#d7e1e9] to-[#d7e1e9] bg-opacity-60 font-noto-sans-tc">
      <div className="ml-[50px] p-4">
        <h1 className="text-2xl font-bold text-[#1D475D] mb-4">管理員頁面</h1>
        <div className="space-y-2">
          <Link
            href={`/user/${userId}/`}
            className="block text-[#0071AC] hover:text-black transition-all duration-300"
          >
            返回普通用戶頁面
          </Link>
          <Link
            href={`/user/${userId}/admin/userLists`}
            className="block text-[#0071AC] hover:text-black transition-all duration-300"
          >
            用戶列表
          </Link>
          <Link
            href={`/user/${userId}/admin/taskLists`}
            className="block text-[#0071AC] hover:text-black transition-all duration-300"
          >
            任務列表
          </Link>
          <Link
            href={`/user/${userId}/admin/jobLists`}
            className="block text-[#0071AC] hover:text-black transition-all duration-300"
          >
            工作列表
          </Link>
          <Link
            href={`/user/${userId}/admin/applyLists`}
            className="block text-[#0071AC] hover:text-black transition-all duration-300"
          >
            申請列表
          </Link>
          <Link
            href={`/user/${userId}/admin/colorLists`}
            className="block text-[#0071AC] hover:text-black transition-all duration-300"
          >
            顏色列表
          </Link>
          <Link
            href={`/user/${userId}/admin/sendwhatsappLists`}
            className="block text-[#0071AC] hover:text-black transition-all duration-300"
          >
            WhatsApp 訊息列表
          </Link>
        </div>
        <div className="mt-4">
          <ShowCalendar_Admin events={events} />
        </div>
      </div>
    </div>
  );
}