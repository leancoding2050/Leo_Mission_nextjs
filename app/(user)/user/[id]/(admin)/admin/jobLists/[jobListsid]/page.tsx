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
  const userId = params?.id as string | undefined;
  const jobId = params?.jobListsid as string | undefined;

  // 更新狀態類型為 Job | null，允許單個工作或 null
  const [getJobById, setGetJobById] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobById = async (id: string) => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/Job_Lists_by_ID/${id}`);
        if (!res.ok) {
          throw new Error(`請求失敗: ${res.status}`);
        }
        const data = await res.json();
        // 檢查數據是否為有效的 Job 物件
        if (data && typeof data === "object" && "id" in data) {
          setGetJobById(data as Job);
        } else {
          throw new Error("無效的工作數據格式");
        }
        setError(null);
      } catch (err: unknown) {
        console.error("獲取工作詳情失敗:", err);
        setError(err instanceof Error ? err.message : "未知錯誤");
        setGetJobById(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (jobId) {
      fetchJobById(jobId);
    } else {
      setError("無效的工作 ID");
      setIsLoading(false);
    }
  }, [jobId]);

  if (isLoading)
    return (
      <div className="flex-1 sm:ml-12 md:ml-16 p-4 text-gray-500 font-noto-sans-tc">
        正在加載...
      </div>
    );
  if (error)
    return (
      <div className="flex-1 sm:ml-12 md:ml-16 p-4 text-red-500 font-noto-sans-tc">
        錯誤: {error}
      </div>
    );
  if (!getJobById)
    return (
      <div className="flex-1 sm:ml-12 md:ml-16 p-4 text-gray-500 font-noto-sans-tc">
        無工作數據
      </div>
    );

  return (
    <div className="flex-1 sm:ml-12 md:ml-16 p-4 min-h-screen bg-gray-50 font-noto-sans-tc">
      <div className="max-w-4xl mx-auto">
        {/* 導航連結 */}
        <div className="flex space-x-4 mb-6">
          <Link
            href={`/user/${userId}/admin/jobLists`}
            className="text-primary-1 hover:underline text-sm md:text-base"
            aria-label="返回工作列表"
          >
            返回
          </Link>
          <Link
            href={`/user/${userId}/admin/jobLists/${jobId}/edit`}
            className="text-primary-1 hover:underline text-sm md:text-base"
            aria-label={`編輯工作 ${getJobById.job_code}`}
          >
            更改
          </Link>
        </div>

        {/* 工作詳情 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-xl md:text-2xl font-bold text-primary-1">工作詳情</h1>
          <div className="mt-4 space-y-2 text-sm md:text-base text-gray-700">
            <p>
              <span className="font-semibold">工作編號:</span> {getJobById.job_code}
            </p>
            <p>
              <span className="font-semibold">學校名稱:</span> {getJobById.job_school_name}
            </p>
            <p>
              <span className="font-semibold">地區:</span> {getJobById.job_area}
            </p>
            <p>
              <span className="font-semibold">時間:</span> {getJobById.job_time_h}
            </p>
            <p>
              <span className="font-semibold">科目:</span> {getJobById.job_subject}
            </p>
            <p>
              <span className="font-semibold">地點:</span> {getJobById.job_place}
            </p>
            <p>
              <span className="font-semibold">價格:</span> {getJobById.job_price}
            </p>
            <p>
              <span className="font-semibold">日期:</span>{" "}
              {new Date(getJobById.job_day).toLocaleDateString()}
            </p>
            <p>
              <span className="font-semibold">價格顯示:</span>{" "}
              {getJobById.showprice ? "顯示價格" : "隱藏價格"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;