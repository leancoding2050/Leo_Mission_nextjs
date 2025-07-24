// "use client";

// import ShowCalendar from "@/components/calendar/ShowCalendar";
// // import { Logout_Button } from "@/components/logout_button";
// // import Navbar from "@/components/Navbar";
// import { useSession } from "next-auth/react";
// // import Link from "next/link";
// import { useEffect, useState } from "react";


// interface Job {
//   id: string;
//   job_code: string;
//   job_place: string;
//   job_time_h: string;
//   job_price: number;
//   showprice: boolean;
//   job_day: string;
//   job_school_name: string;
//   job_area: string;
//   job_task_id?: string;
//   job_task_code: string;
//   job_subject: string;
//   is_confirm: boolean;
//   teacher?: string;
// }

// interface User {
//   id: string;
//   job: Job[];
// }

// interface JobEvent {
//   job_day: string;
//   job_time_start: string;
//   job_time_end: string;
//   job_title: string;
//   is_confirm: boolean;
// }


// const UserTeacherPage = () =>{
//         const session = useSession() ;
//         const userId = session.data?.user?.id as string ;
//         const UserRole = session.data?.user?.role ;

//         const [GetUserdata , setGetUserdata] = useState([]);

//         useEffect(()=>{
//                 const fetchUserdata = async (Id: string) => {
//                   const res = await fetch(`/api/User_Lists_by_ID/${Id}`);
//                   const data = await res.json();
//                   setGetUserdata(data);
//                 };
//                 fetchUserdata(userId);

//         },[userId])


//         const Events = GetUserdata[0]?.job ;

 

// return(
//         <>
//         <h1> Teacher Page </h1>
//         <ShowCalendar events={Events}/>        
//         </>

// )


// }

// export default UserTeacherPage

// "use client";

// import ShowCalendar from "@/components/calendar/ShowCalendar";
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";

// interface Job {
//   id: string;
//   job_code: string;
//   job_place: string;
//   job_time_h: string;
//   job_price: number;
//   showprice: boolean;
//   job_day: string;
//   job_school_name: string;
//   job_area: string;
//   job_task_id?: string;
//   job_task_code: string;
//   job_subject: string;
//   is_confirm: boolean;
//   teacher?: string;
//   job_time_start?: string;
//   job_time_end?: string;
//   job_title?: string;
// }

// interface User {
//   id: string;
//   job: Job[];
// }

// const UserTeacherPage = () => {
//   const { data: session, status } = useSession();
//   const userId = session?.user?.id as string | undefined;
//   // const UserRole = session?.user?.role;

//   const [GetUserdata, setGetUserdata] = useState<User[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchUserdata = async (Id: string) => {
//       setIsLoading(true);
//       try {
//         const res = await fetch(`/api/User_Lists_by_ID/${Id}`);
//         if (!res.ok) {
//           throw new Error("無法獲取用戶數據");
//         }
//         const data: User[] = await res.json();
//         console.log("API 返回的數據:", data); // 添加日誌
//         setGetUserdata(data);
//       } catch (error) {
//         setError("獲取數據失敗，請稍後重試");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     if (userId) {
//       fetchUserdata(userId);
//     }
//   }, [userId]);

//   const Events = GetUserdata[0]?.job || [];

//   if (status === "loading") return <div>載入 session 中...</div>;
//   if (!userId) return <div>請先登入</div>;
//   if (isLoading) return <div>載入中...</div>;
//   if (error) return <div>錯誤：{error}</div>;
//   if (!GetUserdata.length) return <div>無用戶數據</div>;

//   return (
//     <>
//       <h1>Teacher Page</h1>
//       <ShowCalendar events={Events} />
//     </>
//   );
// };

// export default UserTeacherPage;


// 'use client';

// import ShowCalendar from '@/components/calendar/ShowCalendar';
// import { useSession } from 'next-auth/react';
// import { useEffect, useState } from 'react';

// interface Job {
//   id: string;
//   job_code: string;
//   job_place: string;
//   job_time_h: string;
//   job_price: number;
//   showprice: boolean;
//   job_day: string;
//   job_school_name: string;
//   job_area: string;
//   job_task_id?: string;
//   job_task_code: string;
//   job_subject: string;
//   is_confirm: boolean;
//   teacher?: string;
//   job_time_start?: string;
//   job_time_end?: string;
//   job_title?: string;
// }

// interface User {
//   id: string;
//   job: Job[];
// }

// const UserTeacherPage = () => {
//   const { data: session, status } = useSession();
//   const userId = session?.user?.id as string | undefined;

//   const [GetUserdata, setGetUserdata] = useState<User[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchUserdata = async (Id: string) => {
//       setIsLoading(true);
//       try {
//         const res = await fetch(`/api/User_Lists_by_ID/${Id}`);
//         if (!res.ok) {
//           throw new Error('無法獲取用戶數據');
//         }
//         const data: User[] = await res.json();
//         console.log('API 返回的數據:', data);
//         setGetUserdata(data);
//       } catch (error) {
//         setError('獲取數據失敗，請稍後重試');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     if (userId) {
//       fetchUserdata(userId);
//     }
//   }, [userId]);

//   const Events = GetUserdata[0]?.job || [];

//   if (status === 'loading') return <div className="text-center text-[#1D475D] font-noto-tc">載入 session 中...</div>;
//   if (!userId) return <div className="text-center text-[#1D475D] font-noto-tc">請先登入</div>;
//   if (isLoading) return <div className="text-center text-[#1D475D] font-noto-tc">載入中...</div>;
//   if (error) return <div className="text-center text-[#FF0000] font-noto-tc">錯誤：{error}</div>;
//   if (!GetUserdata.length) return <div className="text-center text-[#1D475D] font-noto-tc">無用戶數據</div>;

//   return (
//     <div className="container mx-auto px-4 sm:px-6 lg:px-8 font-noto-tc">
//       <h1 className="text-2xl font-bold text-[#1D475D] mb-4">教師頁面</h1>
//       <ShowCalendar events={Events} />
//     </div>
//   );
// };

// export default UserTeacherPage;


// 'use client';

// import ShowCalendar from '@/components/calendar/ShowCalendar';
// import { useSession } from 'next-auth/react';
// import { useEffect, useState } from 'react';

// interface Job {
//   id: string;
//   job_code: string;
//   job_place: string;
//   job_time_h: string;
//   job_price: number;
//   showprice: boolean;
//   job_day: string;
//   job_school_name: string;
//   job_area: string;
//   job_task_id?: string;
//   job_task_code: string;
//   job_subject: string;
//   is_confirm: boolean;
//   teacher?: string;
//   job_time_start?: string;
//   job_time_end?: string;
//   job_title?: string;
// }

// interface User {
//   id: string;
//   job: Job[];
// }

// const UserTeacherPage = () => {
//   const { data: session, status } = useSession();

//   const userId = session?.user?.id;

//   const [GetUserdata, setGetUserdata] = useState<User[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchUserdata = async (Id: string) => {
//       setIsLoading(true);
//       try {
//         const res = await fetch(`/api/User_Lists_by_ID/${Id}`);
//         if (!res.ok) {
//           throw new Error('無法獲取用戶數據');
//         }
//         const data: User[] = await res.json();
//         setGetUserdata(data);
//       } catch (error) {
//         setError('獲取數據失敗，請稍後重試');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     if (userId) {
//       fetchUserdata(userId);
//     }
//   }, [userId]);

//   if (status === 'loading') return <div className="text-center text-primary-1">載入 session 中...</div>;
//   if (!userId) return <div className="text-center text-primary-1">請先登入</div>;
//   if (isLoading) return <div className="text-center text-primary-1">載入中...</div>;
//   if (error) return <div className="text-center text-red">錯誤：{error}</div>;
//   if (!GetUserdata.length) return <div className="text-center text-primary-1">無用戶數據</div>;

//   return (
//     <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//       <h1 className="text-2xl font-bold text-primary-1 mb-4">教師頁面</h1>
//       <ShowCalendar events={GetUserdata[0].job} />
//     </div>
//   );
// };

// export default UserTeacherPage;



"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ShowCalendar from "@/components/calendar/ShowCalendar";

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
  job_task_id?: string;
  job_task_code: string;
  job_subject: string;
  is_confirm: boolean;
  teacher?: string;
  job_time_start?: string;
  job_time_end?: string;
  job_title?: string;
}

interface User {
  id: string;
  job: Job[];
}

export default function UserTeacherPage() {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const [GetUserdata, setGetUserdata] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserdata = async (Id: string) => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/User_Lists_by_ID/${Id}`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("無法獲取用戶數據");
        }
        const data: User[] = await res.json();
        setGetUserdata(Array.isArray(data) ? data[0] : data);
      } catch (error) {
        console.error("獲取用戶數據失敗:", error);
        setError("獲取數據失敗，請稍後重試");
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUserdata(userId);
    }
  }, [userId]);

  if (status === "loading")
    return (
      <div className="text-center text-primary-1 font-noto-sans-tc">
        載入 session 中...
      </div>
    );
  if (isLoading)
    return (
      <div className="text-center text-primary-1 font-noto-sans-tc">
        載入中...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red font-noto-sans-tc">錯誤：{error}</div>
    );
  if (!GetUserdata)
    return (
      <div className="text-center text-primary-1 font-noto-sans-tc">
        無用戶數據
      </div>
    );

  console.log("GetUserdata :", GetUserdata);

  return (
    <div className="min-h-screen bg-white font-noto-sans-tc z-40">
      <div className="ml-[48px] sm:ml-12 md:ml-16 container mx-auto px-4 sm:px-6 lg:px-8 mt-2.5">
        <h1 className="text-2xl font-bold text-primary-1 mb-4">教師頁面</h1>
        <ShowCalendar events={GetUserdata.job || []} />
      </div>
    </div>
  );
}



// // app/teacher/page.tsx
// import { Suspense } from "react";
// import { auth } from "@/auth";
// import ShowCalendar from "@/components/calendar/ShowCalendar";

// interface Job {
//   id: string;
//   job_code: string;
//   job_place: string;
//   job_time_h: string;
//   job_price: number;
//   showprice: boolean;
//   job_day: string;
//   job_school_name: string;
//   job_area: string;
//   job_task_id?: string;
//   job_task_code: string;
//   job_subject: string;
//   is_confirm: boolean;
//   teacher?: string;
//   job_time_start?: string;
//   job_time_end?: string;
//   job_title?: string;
// }

// interface User {
//   id: string;
//   job: Job[];
// }

// async function UserData({ userId }: { userId: string }) {
//   // 使用 NEXT_PUBLIC_API_URL，因為後端可能運行在 8082 端口
//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
//   console.log(" URL " , baseUrl,"-- end --")
//   try {
//     const res = await fetch(`${baseUrl}/api/User_Lists_by_ID/${userId}`, {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       throw new Error(`HTTP 錯誤：${res.status} - ${res.statusText}`);
//     }

//     const userData: User[] = await res.json();

//     if (!userData || userData.length === 0) {
//       return (
//         <div className="text-center text-[#1D475D] font-noto-sans-tc">
//           無用戶數據
//         </div>
//       );
//     }

//     return <ShowCalendar events={userData[0]?.job || []} />;
//   } catch (error) {
//     console.error("獲取用戶數據失敗:", error);
//     return (
//       <div className="text-center text-[#FF0000] font-noto-sans-tc">
//         錯誤：無法獲取用戶數據 - {(error as Error).message}
//       </div>
//     );
//   }
// }

// export default async function UserTeacherPage() {
//   const session = await auth();

//   if (!session?.user?.id) {
//     return (
//       <div className="text-center text-[#1D475D] font-noto-sans-tc">
//         請先登入
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-[#d7e1e9] to-[#d7e1e9] bg-opacity-60 font-noto-sans-tc">
//       <div className="ml-[50px] container mx-auto px-4 sm:px-6 lg:px-8 mt-2.5">
//         <h1 className="text-2xl font-bold text-[#1D475D] mb-4">教師頁面</h1>
//         <Suspense
//           fallback={
//             <div className="text-center text-[#1D475D] font-noto-sans-tc">
//               載入中...
//             </div>
//           }
//         >
//           <UserData userId={session.user.id} />
//         </Suspense>
//       </div>
//     </div>
//   );
// }


// app/teacher/page.tsx
// "use client";

// import { useState, useEffect } from "react";
// import ShowCalendar from "@/components/calendar/ShowCalendar";
// import { useSession } from "next-auth/react";

// interface Job {
//   id: string;
//   job_code: string;
//   job_place: string;
//   job_time_h: string;
//   job_price: number;
//   showprice: boolean;
//   job_day: string;
//   job_school_name: string;
//   job_area: string;
//   job_task_id?: string;
//   job_task_code: string;
//   job_subject: string;
//   is_confirm: boolean;
//   teacher?: string;
//   job_time_start?: string;
//   job_time_end?: string;
//   job_title?: string;
// }

// interface User {
//   id: string;
//   job: Job[];
// }

// function UserData({ userId }: { userId: string }) {
//   const [userData, setUserData] = useState<User[] | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);

//   const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       setError(null); // 重置錯誤狀態
//       try {
//         console.log("Fetching URL:", `${baseUrl}/api/User_Lists_by_ID/${userId}`);
//         const res = await fetch(`${baseUrl}/api/User_Lists_by_ID/${userId}`, {
//           cache: "no-store",
//           credentials: "include", // 如果需要傳送 cookie 或認證信息
//         });

//         if (!res.ok) {
//           throw new Error(`HTTP 錯誤：${res.status} - ${await res.text()}`);
//         }

//         const data: User[] = await res.json();
//         setUserData(data);
//       } catch (err) {
//         console.error("獲取用戶數據失敗:", err);
//         setError(err instanceof Error ? err.message : "未知錯誤");
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) {
//       fetchData();
//     } else {
//       setError("無效的用戶 ID");
//       setLoading(false);
//     }
//   }, [userId, baseUrl]);

//   console.log("UserData:", userData);

//   if (loading) {
//     return (
//       <div className="text-center text-[#1D475D] font-noto-sans-tc">
//         載入中...
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center text-[#FF0000] font-noto-sans-tc">
//         錯誤：無法獲取用戶數據 - {error}
//       </div>
//     );
//   }

//   if (!userData || userData.length === 0) {
//     return (
//       <div className="text-center text-[#1D475D] font-noto-sans-tc">
//         無用戶數據
//       </div>
//     );
//   }

//   return <ShowCalendar events={userData[0]?.job || []} />;
// }



// export default function UserTeacherPage() {
//   const { data: session, status } = useSession();

//   if (status === "loading") {
//     return (
//       <div className="text-center text-[#1D475D] font-noto-sans-tc">
//         載入中...
//       </div>
//     );
//   }

//   if (!session?.user?.id) {
//     return (
//       <div className="text-center text-[#1D475D] font-noto-sans-tc">
//         請先登入
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-r from-[#d7e1e9] to-[#d7e1e9] bg-opacity-60 font-noto-sans-tc">
//       <div className="ml-[50px] container mx-auto px-4 sm:px-6 lg:px-8 mt-2.5">
//         <h1 className="text-2xl font-bold text-[#1D475D] mb-4">教師頁面</h1>
//         <UserData userId={session.user.id} />
//       </div>
//     </div>
//   );
// }