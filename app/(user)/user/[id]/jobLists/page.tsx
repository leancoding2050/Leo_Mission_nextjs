// "use client";

// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import useSWR from "swr";
// import { useState } from "react";

// interface Job {
//   id: string;
//   job_code: string;
//   job_school_name: string;
//   job_subject: string;
//   job_area: string[];
//   job_time: string;
//   job_day: string;
//   job_in_task: boolean;
// }

// const fetcher = async (url: string) => {
//   const res = await fetch(url);
//   if (!res.ok) throw new Error("獲取工作列表失敗");
//   return res.json();
// };

// const JobListsPage = () => {
//   const param = useParams();
//   const UserId = param?.id as string;

//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchField, setSearchField] = useState("all");
//   const [searchResults, setSearchResults] = useState<Job[]>([]);

//   // 使用 SWR 獲取工作列表
//   const { data: GetJobLists, error } = useSWR<Job[]>(
//     `http://127.0.0.1:8000/api/job/lists/`,
//     fetcher,
//     { revalidateOnFocus: false }
//   );

//   const handleSearch = async () => {
//     try {
//       const response = await fetch(
//         `http://127.0.0.1:8000/api/job/lists/search?query=${encodeURIComponent(
//           searchQuery
//         )}&field=${encodeURIComponent(searchField)}`
//       );
//       if (!response.ok) throw new Error("搜尋失敗");
//       const data = await response.json();
//       setSearchResults(data);
//     } catch (error) {
//       console.error("搜尋失敗:", error);
//     }
//   };

//   if (error) return <div className="text-red-500">無法載入工作列表</div>;
//   if (!GetJobLists) return <div>載入中...</div>;

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">工作列表</h1>

//       {/* 搜尋區域 */}
//       <div className="flex items-center space-x-2 mb-4">
//         <input
//           type="text"
//           placeholder="輸入搜索內容..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="flex-1 p-2 border rounded"
//         />
//         <select
//           value={searchField}
//           onChange={(e) => setSearchField(e.target.value)}
//           className="p-2 border rounded"
//         >
//           <option value="all">所有字段</option>
//           <option value="job_code">任務編號</option>
//           <option value="job_school_name">學校名稱</option>
//           <option value="job_subject">科目</option>
//           <option value="job_area">地區</option>
//           <option value="job_time">時間</option>
//           <option value="job_day">日期</option>
//         </select>
//         <Button onClick={handleSearch}>搜索</Button>
//       </div>

//       {/* 搜尋結果 */}
//       {searchResults.length > 0 && (
//         <div className="mb-4">
//           <h2 className="text-xl font-semibold">搜尋結果</h2>
//           {searchResults.map((job) => (
//             <Link
//               href={`/user/${UserId}/jobLists/${job.id}`}
//               key={job.id}
//             >
//               <div className="p-4 mb-2 border rounded hover:bg-gray-100">
//                 <p>任務編號: {job.job_code}</p>
//                 <p>學校名稱: {job.job_school_name}</p>
//                 <p>科目: {job.job_subject}</p>
//                 <p>地區: {job.job_area.join(", ")}</p>
//                 <p>時間: {job.job_time}</p>
//                 <p>日期: {job.job_day.split("T")[0]}</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       )}

//       {/* 所有工作列表 */}
//       <h2 className="text-xl font-semibold mb-2">我的工作</h2>
//       {GetJobLists.filter((d) => !d.job_in_task).length === 0 && (
//         <p>無工作記錄</p>
//       )}
//       {GetJobLists.filter((d) => !d.job_in_task).map((data) => (
//         <Link
//           href={`/user/${UserId}/jobLists/${data.id}`}
//           key={data.id}
//         >
//           <div className="p-4 mb-2 border rounded hover:bg-gray-100">
//             <p>任務編號: {data.job_code}</p>
//             <p>學校名稱: {data.job_school_name}</p>
//             <p>科目: {data.job_subject}</p>
//             <p>地區: {data.job_area.join(", ")}</p>
//             <p>時間: {data.job_time}</p>
//             <p>日期: {data.job_day.split("T")[0]}</p>
//           </div>
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default JobListsPage;


// "use client";

// import { Button } from "@/components/ui/button";
// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// // 定義 Job 類型
// interface Job {
//   id: string;
//   job_code: string;
//   job_school_name: string;
//   job_subject: string;
//   job_area: string;
//   job_time_h: string;
//   job_day: string;
//   job_admin_createdAt: string;
//   showprice: boolean;
// }

// const JobLists = () => {
//   const session = useSession();
//   const userId = session.data?.user?.id;

//   // 指定狀態類型為 Job[]（Job 數組）
//   const [GetJobLists, setGetJobLists] = useState<Job[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<Job[]>([]);
//   const [searchField, setSearchField] = useState("all");
//   const [sortBy, setSortBy] = useState<"job_day" | "job_admin_createdAt" | null>(null);
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

//   useEffect(() => {
//     const fetchJobListsData = async () => {
//       const res = await fetch(`/api/Job_Lists`);
//       if (!res.ok) {
//         throw new Error("斷線!");
//       }
//       const data: Job[] = await res.json();
//       setGetJobLists(data);
//     };
//     fetchJobListsData();
//   }, []);

//   // 排序函數，指定 data 和返回值類型
//   const sortData = (data: Job[], field: "job_day" | "job_admin_createdAt"): Job[] => {
//     return [...data].sort((a, b) => {
//       const dateA = new Date(a[field]).getTime();
//       const dateB = new Date(b[field]).getTime();
//       return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
//     });
//   };

//   // 處理排序按鈕點擊
//   const handleSort = (field: "job_day" | "job_admin_createdAt") => {
//     if (sortBy === field) {
//       setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
//     } else {
//       setSortBy(field);
//       setSortOrder("desc");
//     }
//   };

//   // 獲取排序後的數據
//   const getSortedData = (data: Job[]): Job[] => {
//     if (!sortBy) return data;
//     return sortData(data, sortBy);
//   };

//   // 搜索功能
//   const handleSearch = async () => {
//     try {
//       const response = await fetch(`/api/Job_Lists_search?query=${searchQuery}&field=${searchField}`);
//       const data: Job[] = await response.json();
//       setSearchResults(data);
//     } catch (error) {
//       console.error("搜尋失敗:", error);
//     }
//   };

//   // 渲染列表的通用函數
//   const renderJobList = (data: Job[]) => {
//     return getSortedData(data)?.map((job: Job) => (
//       <div key={job.id}>
//         <Link href={`/user/${userId}/jobLists/${job.id}`}>
//           code: {job.job_code}, school_name: {job.job_school_name}, subject: {job.job_subject}, area: {job.job_area}, 
//           job_time: {job.job_time_h}, day: {job.job_day.split("T")[0]}, 
//           建立日期: {new Date(job.job_admin_createdAt).toLocaleDateString()}, 
//           {/* 顯示: {job.showprice ? "顯示價格" : "隱藏價格"} */}
//         </Link>
//       </div>
//     ));
//   };

//   return (
//     <>
//       <Link href={`/user/${userId}`}> 主頁 </Link>
//       <div>

//       </div>

//       <h1>JobLists</h1>

//       <div className="sort-buttons">
//         <Button
//           onClick={() => handleSort("job_day")}
//           variant={sortBy === "job_day" ? "default" : "outline"}
//         >
//           工作日期排序 {sortBy === "job_day" && `(${sortOrder === "asc" ? "↑" : "↓"})`}
//         </Button>
//         <Button
//           onClick={() => handleSort("job_admin_createdAt")}
//           variant={sortBy === "job_admin_createdAt" ? "default" : "outline"}
//         >
//           建立日期排序 {sortBy === "job_admin_createdAt" && `(${sortOrder === "asc" ? "↑" : "↓"})`}
//         </Button>
//       </div>

//       <div className="flex items-center space-x-2">
//         <input
//           type="text"
//           placeholder="輸入搜索內容..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="flex-1"
//         />
//         <select value={searchField} onChange={(e) => setSearchField(e.target.value)}>
//           <option value="all">所有字段</option>
//           <option value="job_code">任務編號</option>
//           <option value="job_school_name">學校名稱</option>
//           <option value="job_subject">科目</option>
//           <option value="job_area">地區</option>
//           <option value="job_time">時間</option>
//           <option value="job_day">日期</option>
//           <option value="showprice">顯示價格</option>
//         </select>
//         <Button onClick={handleSearch}>搜索</Button>
//       </div>

//       {/* 渲染搜索結果或原始數據 */}
//       {searchResults.length > 0 ? (
//         renderJobList(searchResults)
//       ) : GetJobLists.length === 0 ? (
//         <p>沒有數據</p>
//       ) : (
//         renderJobList(GetJobLists)
//       )}
//     </>
//   );
// };

// export default JobLists;


// "use client";

// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// // 定義 Job 類型
// interface Job {
//   id: string;
//   job_code: string;
//   job_school_name: string;
//   job_subject: string;
//   job_area: string;
//   job_time_h: string;
//   job_day: string;
//   job_admin_createdAt: string;
//   showprice: boolean;
// }

// interface JobListsProps {
//   userId?: string;
//   initialJobs: Job[];
// }

// const JobLists = ({ userId, initialJobs = [] }: JobListsProps) => {
//   const [GetJobLists, setGetJobLists] = useState<Job[]>(initialJobs || []);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<Job[]>([]);
//   const [searchField, setSearchField] = useState("all");
//   const [sortBy, setSortBy] = useState<"job_day" | "job_admin_createdAt" | null>(null);
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

//   useEffect(() => {
//     if (!GetJobLists?.length && !initialJobs?.length) {
//       const fetchJobListsData = async () => {
//         try {
//           const res = await fetch(`/api/Job_Lists`, { cache: "no-store" });
//           if (!res.ok) throw new Error("Failed to fetch job lists");
//           const data: Job[] = await res.json();
//           setGetJobLists(data || []);
//         } catch (error) {
//           console.error("獲取工作列表數據失敗:", error);
//           setGetJobLists([]);
//         }
//       };
//       fetchJobListsData();
//     }
//   }, [GetJobLists?.length, initialJobs?.length]);

//   // 排序函數
//   const sortData = (data: Job[], field: "job_day" | "job_admin_createdAt"): Job[] => {
//     return [...data].sort((a, b) => {
//       const dateA = new Date(a[field]).getTime();
//       const dateB = new Date(b[field]).getTime();
//       return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
//     });
//   };

//   // 處理排序按鈕點擊
//   const handleSort = (field: "job_day" | "job_admin_createdAt") => {
//     if (sortBy === field) {
//       setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
//     } else {
//       setSortBy(field);
//       setSortOrder("desc");
//     }
//   };

//   // 獲取排序後的數據
//   const getSortedData = (data: Job[]): Job[] => {
//     if (!sortBy) return data;
//     return sortData(data, sortBy);
//   };

//   // 搜索功能
//   const handleSearch = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`/api/Job_Lists_search?query=${encodeURIComponent(searchQuery)}&field=${encodeURIComponent(searchField)}`);
//       if (!response.ok) throw new Error("Search failed");
//       const data: Job[] = await response.json();
//       setSearchResults(data || []);
//     } catch (error) {
//       console.error("搜尋失敗:", error);
//       setSearchResults([]);
//     }
//   };

//   // 格式化日期
//   const formatDate = (dateString: string) => {
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) throw new Error("無效日期");
//       return date.toLocaleDateString("zh-TW", {
//         year: "numeric",
//         month: "2-digit",
//         day: "2-digit",
//       }).replace(/\./g, "-");
//     } catch (error) {
//       console.error("無效日期:", dateString);
//       return "N/A";
//     }
//   };

//   // 渲染列表
//   const renderJobList = (data: any[]) => {
//     return getSortedData(data).map((job: Job) => (
//       <Link key={job.id} href={`/user/${userId}/jobLists/${job.id}`} className="contents">
//         <div className="border border-[rgba(255,255,255,0.5)] bg-white p-2 text-center">{job.job_school_name}</div>
//         <div className="border border-[rgba(255,255,255,0.5)] bg-white p-2 text-center">{formatDate(job.job_day)}</div>
//         <div className="border border-[rgba(255,255,255,0.5)] bg-white p-2 text-center">{job.job_time_h}</div>
//         <div className="border border-[rgba(255,255,255,0.5)] bg-white p-2 text-center">{job.job_area}</div>
//         <div className="border border-[rgba(255,255,255,0.5)] bg-white p-2 text-center">{job.showprice ? "顯示價格" : "隱藏價格"}</div>
//         <div className="border border-[rgba(255,255,255,0.5)] bg-white p-2 text-center">{job.job_subject}</div>
//         <div className="border border-[rgba(255,255,255,0.5)] bg-white p-2 text-center">{formatDate(job.job_admin_createdAt)}</div>
//       </Link>
//     ));
//   };

//   return (

//     <div className=" min-h-screen bg-gradient-to-r from-[#d7e1e9] to-[#d7e1e9] opacity-60">
//       <div className="ml-10 w-[95%] p-4">
//         {/* 搜索欄 */}
//         <form onSubmit={handleSearch} className="py-2">
//           <div className="flex items-center gap-2">
//             <input
//               type="text"
//               placeholder="搜尋關鍵字"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-96 h-8 border border-gray-300 rounded-md px-2 focus:outline-none focus:ring-2 focus:ring-[#0071AC]"
//               required
//             />
//             <select
//               value={searchField}
//               onChange={(e) => setSearchField(e.target.value)}
//               className="h-8 border border-gray-gray-300 rounded-md px-2 focus:outline-none focus:ring-2 focus:ring-[#0071AC]"
//             >
//               <option value="all">所有字段</option>
//               <option value="job_code">任務編號</option>
//               <option value="job-school_name">學校名稱</option>
//               <option value="job_subject">科目</option>
//               <option value="job_area">地區</option>
//               <option value="job_time">時間</option>
//               <option value="job_day">日期</option>
//               <option value="showprice">顯示價格</option>
//             </select>
//             <Button
//               type="submit"
//               className="bg-[#0071AC] text-white px-4 py-2 rounded-md text-sm hover:bg-black transition-all duration-300"
//             >
//               搜尋
//             </Button>
//           </div>
//         </form>

//         {/* 排序按鈕 */}
//         <div className="flex items-center py-2 px-5 gap-2">
//           <Link href="/create-job">
//             <Button className="bg-[#1D475D] text-white px-4 py-2 rounded-md text-base hover:bg-black transition-all duration-300">
//               + 建立工作
//             </Button>
//           </Link>
//           <Button
//             onClick={() => handleSort("job_day")}
//             className={`${
//               sortBy === "job_day" ? "bg-[#0071AC] text-white" : "bg-gray-200 text-black"
//             } px-4 py-2 rounded-md text-sm hover:bg-black hover:text-white transition-all duration-300`}
//           >
//             工作日期排序 {sortBy === "job_day" && `(${sortOrder === "asc" ? "↑" : "↓"})`}
//           </Button>
//           <Button
//             onClick={() => handleSort("job_admin_createdAt")}
//             className={`${
//               sortBy === "job_admin_createdAt" ? "bg-[#0071AC] text-white" : "bg-gray-200 text-black"
//             } px-4 py-2 rounded-md text-sm hover:bg-black hover:text-white transition-all duration-300`}
//           >
//             建立日期排序 {sortBy === "job_admin_createdAt" && `(${sortOrder === "asc" ? "↑" : "↓"})`}
//           </Button>
//         </div>

//         {/* 數據表格 */}
//         <div className="w-full overflow-x-auto">
//           <div className="grid grid-cols-[200px_80px_1fr_1fr_1fr_1fr_1fr] text-sm min-w-[800px]">
//             <div className="border border-[rgba(255,255,255,0.5)] bg-gray-200 text-black p-2 text-center font-bold">
//               學校名稱
//             </div>
//             <div className="border border-[rgba(255,255,255,0.5)] bg-gray-200 text-black p-2 text-center font-bold">
//               日期
//             </div>
//             <div className="border border-[rgba(255,255,255,0.5)] bg-gray-200 text-black p-2 text-center font-bold">
//               時間
//             </div>
//             <div className="border border-[rgba(255,255,255,0.5)] bg-gray-200 text-black p-2 text-center font-bold">
//               地區
//             </div>
//             <div className="border border-[rgba(255,255,255,0.5)] bg-gray-200 text-black p-2 text-center font-bold">
//               價格
//             </div>
//             <div className="border border-[rgba(255,255,255,0.5)] bg-gray-200 text-black p-2 text-center font-bold">
//               科目
//             </div>
//             <div className="border border-[rgba(255,255,255,0.5)] bg-gray-200 text-black p-2 text-center font-bold">
//               建立日期
//             </div>
//             {searchResults.length > 0 ? (
//               renderJobList(searchResults)
//             ) : GetJobLists.length === 0 ? (
//               <div className="col-span-7 text-center p-4 bg-white border border-[rgba(255,255,255,0.5)]">
//                 沒有數據
//               </div>
//             ) : (
//               renderJobList(GetJobLists)
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobLists;


"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface Job {
  id: string;
  job_code: string;
  job_school_name: string;
  job_subject: string;
  job_area: string;
  job_time_h: string;
  job_day: string;
  job_admin_createdAt: string;
  showprice: boolean;
}

interface JobListsProps {
  userId?: string;
  initialJobs?: Job[];
}

export default function JobLists({ userId: propUserId, initialJobs = [] }: JobListsProps) {
  const session = useSession();
  const userId = propUserId || session.data?.user?.id;

  const [GetJobLists, setGetJobLists] = useState<Job[]>(initialJobs);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Job[]>([]);
  const [searchField, setSearchField] = useState("all");
  const [sortBy, setSortBy] = useState<"job_day" | "job_admin_createdAt" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    if (!GetJobLists.length && !initialJobs.length) {
      const fetchJobListsData = async () => {
        try {
          const res = await fetch(`/api/Job_Lists`, { cache: "no-store" });
          if (!res.ok) throw new Error("無法獲取工作列表");
          const data: Job[] = await res.json();
          setGetJobLists(data || []);
        } catch (error) {
          console.error("獲取工作列表數據失敗:", error);
          setGetJobLists([]);
        }
      };
      fetchJobListsData();
    }
  }, [GetJobLists.length, initialJobs.length]);

  const sortData = (data: Job[], field: "job_day" | "job_admin_createdAt"): Job[] => {
    return [...data].sort((a, b) => {
      const dateA = new Date(a[field]).getTime();
      const dateB = new Date(b[field]).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  };

  const handleSort = (field: "job_day" | "job_admin_createdAt") => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const getSortedData = (data: Job[]): Job[] => {
    if (!sortBy) return data;
    return sortData(data, sortBy);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/Job_Lists_search?query=${encodeURIComponent(searchQuery)}&field=${encodeURIComponent(searchField)}`
      );
      if (!response.ok) throw new Error("搜尋失敗");
      const data: Job[] = await response.json();
      setSearchResults(data || []);
    } catch (error) {
      console.error("搜尋失敗:", error);
      setSearchResults([]);
    }
  };

  // const formatDate = (dateString: string) => {
  //   try {
  //     const date = new Date(dateString);
  //     if (isNaN(date.getTime())) throw new Error("無效日期");
  //     return date.toLocaleDateString("zh-TW", {
  //       year: "numeric",
  //       month: "2-digit",
  //       day: "2-digit",
  //     }).replace(/\./g, "-");
  //   } catch (error) {
  //     console.error("無效日期:", dateString);
  //     return "N/A";
  //   }
  // };

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) throw new Error("無效日期");
    return date.toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).replace(/\./g, "-");
  } catch (error) {
    console.error("無效日期:", dateString, error); // 記錄 error 詳情
    return "N/A";
  }
};

  const renderJobList = (data: Job[]) => {
    return getSortedData(data).map((job: Job) => (
      <Link key={job.id} href={`/user/${userId}/jobLists/${job.id}`} className="contents">
        <div className="border border-[rgba(255,255,255,0.5)] bg-white p-2 text-center">{job.job_school_name}</div>
        <div className="border border-[rgba(255,255,255,0.5)] bg-white p-2 text-center">{formatDate(job.job_day)}</div>
        <div className="border border-[rgba(255,255,255,0.5)] bg-white p-2 text-center">{job.job_time_h}</div>
        <div className="border border-[rgba(255,255,255,0.5)] bg-white p-2 text-center">{job.job_area}</div>
        <div className="border border-[rgba(255,255,255,0.5)] bg-white p-2 text-center">
          {job.showprice ? "顯示價格" : "隱藏價格"}
        </div>
        <div className="border border-[rgba(255,255,255,0.5)] bg-white p-2 text-center">{job.job_subject}</div>
        <div className="border border-[rgba(255,255,255,0.5)] bg-white p-2 text-center">
          {formatDate(job.job_admin_createdAt)}
        </div>
      </Link>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#d7e1e9] to-[#d7e1e9] bg-opacity-60 font-noto-sans-tc">
      <div className="ml-[50px] w-[95%] p-4">
        {/* 搜索欄 */}
        <form onSubmit={handleSearch} className="py-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="搜尋關鍵字"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-96 h-8 border border-gray-300 rounded-md px-2 focus:outline-none focus:ring-2 focus:ring-[#0071AC]"
              required
            />
            <select
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
              className="h-8 border border-gray-300 rounded-md px-2 focus:outline-none focus:ring-2 focus:ring-[#0071AC]"
            >
              <option value="all">所有字段</option>
              <option value="job_code">任務編號</option>
              <option value="job_school_name">學校名稱</option>
              <option value="job_subject">科目</option>
              <option value="job_area">地區</option>
              <option value="job_time_h">時間</option>
              <option value="job_day">日期</option>
              <option value="showprice">顯示價格</option>
            </select>
            <Button
              type="submit"
              className="bg-[#0071AC] text-white px-4 py-2 rounded-md text-sm hover:bg-black transition-all duration-300"
            >
              搜尋
            </Button>
          </div>
        </form>

        {/* 排序按鈕 */}
        <div className="flex items-center py-2 px-5 gap-2">
          <Link href="/create-job">
            <Button className="bg-[#1D475D] text-white px-4 py-2 rounded-md text-base hover:bg-black transition-all duration-300">
              + 建立工作
            </Button>
          </Link>
          <Button
            onClick={() => handleSort("job_day")}
            className={`${
              sortBy === "job_day" ? "bg-[#0071AC] text-white" : "bg-gray-200 text-black"
            } px-4 py-2 rounded-md text-sm hover:bg-black hover:text-white transition-all duration-300`}
          >
            工作日期排序 {sortBy === "job_day" && `(${sortOrder === "asc" ? "↑" : "↓"})`}
          </Button>
          <Button
            onClick={() => handleSort("job_admin_createdAt")}
            className={`${
              sortBy === "job_admin_createdAt" ? "bg-[#0071AC] text-white" : "bg-gray-200 text-black"
            } px-4 py-2 rounded-md text-sm hover:bg-black hover:text-white transition-all duration-300`}
          >
            建立日期排序 {sortBy === "job_admin_createdAt" && `(${sortOrder === "asc" ? "↑" : "↓"})`}
          </Button>
        </div>

        {/* 數據表格 */}
        <div className="w-full overflow-x-auto">
          <div className="grid grid-cols-[200px_100px_100px_100px_100px_100px_150px] text-sm min-w-[850px]">
            <div className="border border-[rgba(255,255,255,0.5)] bg-gray-200 text-black p-2 text-center font-bold">
              學校名稱
            </div>
            <div className="border border-[rgba(255,255,255,0.5)] bg-gray-200 text-black p-2 text-center font-bold">
              日期
            </div>
            <div className="border border-[rgba(255,255,255,0.5)] bg-gray-200 text-black p-2 text-center font-bold">
              時間
            </div>
            <div className="border border-[rgba(255,255,255,0.5)] bg-gray-200 text-black p-2 text-center font-bold">
              地區
            </div>
            <div className="border border-[rgba(255,255,255,0.5)] bg-gray-200 text-black p-2 text-center font-bold">
              價格
            </div>
            <div className="border border-[rgba(255,255,255,0.5)] bg-gray-200 text-black p-2 text-center font-bold">
              科目
            </div>
            <div className="border border-[rgba(255,255,255,0.5)] bg-gray-200 text-black p-2 text-center font-bold">
              建立日期
            </div>
            {searchResults.length > 0 ? (
              renderJobList(searchResults)
            ) : GetJobLists.length === 0 ? (
              <div className="col-span-7 text-center p-4 bg-white border border-[rgba(255,255,255,0.5)]">
                沒有數據
              </div>
            ) : (
              renderJobList(GetJobLists)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}