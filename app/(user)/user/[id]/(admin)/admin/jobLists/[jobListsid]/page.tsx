// "use client";

// // import { useSession } from "next-auth/react";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useEffect , useState } from "react";


// const jobDetail = () => {
//     const params = useParams();
//     const userId = params.id as string;
//     const JobId = params.jobListsid as string ;
//     console.log(params);
//     const [ GetJobById , setGetJobById ] = useState([]);

//     useEffect(() => {
//         const fetchgetjobbyid = async (id: string) => {
//             const res = await fetch(`/api/Job_Lists_by_ID/${id}`) ;
//             const data = await res.json() ;
//             setGetJobById(data) ;
//         }
//         fetchgetjobbyid(JobId);
//     }, [JobId])
//     // console.log(" GetJobById : ",GetJobById,"-- End --")

//     return(
//         <div>
            
//             <Link href={`/user/${userId}/admin/jobLists`} > 上一頁 </Link>
//                 <br />
//                 <Link href={`/user/${userId}/admin/jobLists/${JobId}/edit`} >更改</Link>
//             <div>
                


//                 { GetJobById.map((d) => {
//                     return(
//                         <div key={d.id}>
//                             {d.job_code},
//                             {d.job_school_name},
//                             {d.job_area},
//                             {d.job_time},
//                             {d.job_subject},
//                             {d.job_place},
//                             {d.job_price},
//                             {d.job_day.split('T')[0]},
//                             {d.showprice ? "顯示價格" : "隱藏價格"}

//                         </div>
//                     )
//                 }) }
//             </div>


//         </div>
//     )
// }

// export default jobDetail

"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// 定義 Job 類型
interface Job {
  id: string;
  job_code: string;
  job_school_name: string;
  job_area: string;
  job_time_h: string;
  job_subject: string;
  job_place: string;
  job_price: number;
  job_day: string;
  showprice: boolean;
}

const JobDetail = () => {
  const params = useParams();
  const userId = params.id as string;
  const jobId = params.jobListsid as string;

  // 狀態類型為 Job[]
  const [getJobById, setGetJobById] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobById = async (id: string) => {
      try {
        const res = await fetch(`/api/Job_Lists_by_ID/${id}`);
        if (!res.ok) {
          throw new Error("無法獲取工作詳情");
        }
        const data: Job[] = await res.json();
        setGetJobById(data);
      } catch (error) {
        console.error("獲取工作詳情失敗:", error);
      }
    };
    if (jobId) {
      fetchJobById(jobId);
    }
  }, [jobId]);

  return (
    <div>
      <Link href={`/user/${userId}/admin/jobLists`}>上一頁</Link>
      <br />
      <Link href={`/user/${userId}/admin/jobLists/${jobId}/edit`}>更改</Link>
      <div>
        {getJobById.length > 0 ? (
          getJobById.map((d) => (
            <div key={d.id}>
              任務編號: {d.job_code}<br />
              學校名稱: {d.job_school_name}<br />
              地區: {d.job_area}<br />
              時間: {d.job_time_h}<br />
              科目: {d.job_subject}<br />
              地點: {d.job_place}<br />
              價格: {d.job_price}<br />
              日期: {d.job_day.split("T")[0]}<br />
              價格顯示: {d.showprice ? "顯示價格" : "隱藏價格"}
            </div>
          ))
        ) : (
          <p>正在加載或無數據...</p>
        )}
      </div>
    </div>
  );
};

export default JobDetail;