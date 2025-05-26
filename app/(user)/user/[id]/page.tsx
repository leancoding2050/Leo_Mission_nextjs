// "use client";

// import ShowCalendar from "@/components/calendar/ShowCalendar";
// // import { Logout_Button } from "@/components/logout_button";
// // import Navbar from "@/components/Navbar";
// import { useSession } from "next-auth/react";
// // import Link from "next/link";
// import { useEffect, useState } from "react";

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

"use client";

import ShowCalendar from "@/components/calendar/ShowCalendar";
import { Logout_Button } from "@/components/logout_button";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
// import Link from "next/link";
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
  job_task_id?: string;
  job_task_code: string;
  job_subject: string;
  is_confirm: boolean;
  teacher?: string;
}

interface User {
  id: string;
  job: Job[];
}

interface JobEvent {
  job_day: string;
  job_time_start: string;
  job_time_end: string;
  job_title: string;
  is_confirm: boolean;
}

const UserTeacherPage = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;
  const UserRole = session?.user?.role;

  const [GetUserdata, setGetUserdata] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserdata = async (Id: string) => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/User_Lists_by_ID/${Id}`);
        if (!res.ok) {
          throw new Error("無法獲取用戶數據");
        }
        const data = await res.json();
        setGetUserdata(data);
      } catch (error) {
        setError("無法載入數據");
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      fetchUserdata(userId);
    } else {
      setError("無效的用戶 ID");
      setIsLoading(false);
    }
  }, [userId]);

  if (status === "loading") {
    return <div>載入中...</div>;
  }

  if (status !== "authenticated") {
    return <div>請先登入</div>;
  }

  if (UserRole !== "TEACHER") {
    return <div>僅限教師角色訪問</div>;
  }

  if (isLoading) {
    return <div>載入中...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  if (!GetUserdata.length) {
    return <div>未找到用戶數據</div>;
  }

  const Events: JobEvent[] = GetUserdata[0]?.job?.map((job) => {
    const [start, end] = job.job_time_h?.split("-") || ["0900", "1700"];
    return {
      job_day: job.job_day || "",
      job_time_start: start || "0900",
      job_time_end: end || "1700",
      job_title: job.job_subject || job.job_code || "未命名",
      is_confirm: job.is_confirm || false,
    };
  }) || [];

  return (
    <>
      <Navbar />
      <h1>Teacher Page</h1>
      <ShowCalendar events={Events} />
      <Logout_Button />
    </>
  );
};

export default UserTeacherPage;