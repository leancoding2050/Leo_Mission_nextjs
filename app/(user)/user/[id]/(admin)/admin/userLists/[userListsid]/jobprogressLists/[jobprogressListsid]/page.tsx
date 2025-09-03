// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// const  JobListById = () => {

//   const param = useParams();
//   const userId = param.id as string;
//   console.log(userId)

//   const [ GetUserListsDatabyId , setGetUserListsDatabyId ] = useState([]) ;  
  
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


//   return (
//     <>
    
    
    
    
//     <div>JobListById</div>

    
    

//   {JobData?.map((d)=>{
//     return(
//       <div key={d.id}>
//         <Link href={`/user/${userId}/profiles/jobprogressLists/${d.id}`}>
//           <p>{d.job_code}</p>
//           <p>
//           {d.job_place}
//           </p>
//           <p>
//           {d.job_time}
//           </p>
//           <p>
//           {d.job_price}
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
        
//         </Link>
//       </div>
//     )
// })}
//   </>
//   )
// }

// export default JobListById

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// 定義 User 和 Job 類型，根據 Prisma 模型
interface Job {
  id: string;
  job_code: string;
  job_place: string;
  job_time_h: string; // 假設使用 job_time_h，與之前的模型一致
  job_price: number;
  job_day: string;
  job_school_name: string;
  job_area: string;
}

interface User {
  id: string;
  job: Job[];
}

const JobListById = () => {
  const params = useParams();
  const userId = params?.id as string | undefined;
  const userListsid = params?.userListsid as string | undefined;

  const [getUserData, setGetUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUserListsDataById = async (id: string) => {
      try {
        const res = await fetch(`/api/User_Lists_by_ID/${id}`);
        if (!res.ok) throw new Error(`請求失敗: ${res.status}`);
        const result: User = await res.json();
        setGetUserData(result);
        setError("");
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "無法加載用戶數據");
      } finally {
        setIsLoading(false);
      }
    };

    if (userId) {
      getUserListsDataById(userId);
    } else {
      setError("無效的用戶 ID");
      setIsLoading(false);
    }
  }, [userId]);

  const jobData = getUserData?.job ?? [];

  if (isLoading) return <div className="p-4 text-gray-500">正在加載...</div>;
  if (error) return <div className="p-4 text-red-500">錯誤: {error}</div>;
  if (!getUserData) return <div className="p-4 text-gray-500">無用戶數據</div>;

  return (
    <div className="p-4">
      <Link href={`/user/${userId}/admin/userLists/${userListsid}/jobprogressLists`} className="text-blue-500 hover:underline">
        上一頁
      </Link>
      <h1 className="text-xl font-bold mt-4">工作列表</h1>

      {jobData.length > 0 ? (
        <div className="mt-4 space-y-4">
          {jobData.map((job) => (
            <div key={job.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Link href={`/user/${userId}/admin/userLists/${userListsid}/jobprogressLists/${job.id}`}>
                <p>任務編號: {job.job_code}</p>
                <p>地點: {job.job_place}</p>
                <p>時間: {job.job_time_h}</p>
                <p>價格: {job.job_price}</p>
                <p>日期: {job.job_day.split("T")[0]}</p>
                <p>學校名稱: {job.job_school_name}</p>
                <p>地區: {job.job_area}</p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4 text-gray-500">沒有工作數據</p>
      )}
    </div>
  );
};

export default JobListById;