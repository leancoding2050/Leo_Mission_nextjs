// "use client";

// import { Button } from "@/components/ui/button";
// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// const JobLists = () => {
//   const session = useSession();
//   const userId = session.data?.user?.id;

//   const [GetJobLists, setGetJobLists] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [searchField, setSearchField] = useState("all");
//   const [sortBy, setSortBy] = useState<"job_day" | "job_admin_createdAt" | null>(null);
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

//   useEffect(() => {
//     const fetchJobListsData = async () => {
//       const res = await fetch(`/api/Job_Lists`);
//       if (!res.ok) {
//         throw new Error("斷線!");
//       }
//       const data = await res.json();
//       setGetJobLists(data);
//     };
//     fetchJobListsData();
//   }, []);

//   // 排序函數
//   const sortData = (data, field: "job_day" | "job_admin_createdAt") => { //:any[]
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
//   const getSortedData = (data) => { //:any[]
//     if (!sortBy) return data;
//     return sortData(data, sortBy);
//   };

//   // 搜索功能
//   const handleSearch = async () => {
//     try {
//       const response = await fetch(`/api/Job_Lists_search?query=${searchQuery}&field=${searchField}`);
//       const data = await response.json();
//       setSearchResults(data);
//     } catch (error) {
//       console.error("搜尋失敗:", error);
//     }
//   };

//   // 渲染列表的通用函數
//   const renderJobList = (data) => { //:any[]
//     return getSortedData(data)?.map((job) => (
//       <div key={job.id}>
//         <Link href={`/user/${userId}/admin/jobLists/${job.id}`}>
//           code: {job.job_code}, school_name: {job.job_school_name}, subject: {job.job_subject}, area: {job.job_area}, 
//           job_time: {job.job_time_h}, day: {job.job_day.split("T")[0]}, 
//           建立日期: {new Date(job.job_admin_createdAt).toLocaleDateString()}, 
//           顯示: {job.showprice ? "顯示價格" : "隱藏價格"}
//         </Link>
//       </div>
//     ));
//   };

//   return (
//     <>
//       <Link href={`/user/${userId}/admin`}> Admin主頁 </Link>
//       <div>
//         <Link href={`/user/${userId}/admin/jobLists/createJob`}>CreateJob</Link>
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




"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

// 定義 Job 類型
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

const JobLists = () => {
  const session = useSession();
  const userId = session.data?.user?.id;

  // 指定狀態類型為 Job[]（Job 數組）
  const [GetJobLists, setGetJobLists] = useState<Job[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Job[]>([]);
  const [searchField, setSearchField] = useState("all");
  const [sortBy, setSortBy] = useState<"job_day" | "job_admin_createdAt" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    const fetchJobListsData = async () => {
      const res = await fetch(`/api/Job_Lists`);
      if (!res.ok) {
        throw new Error("斷線!");
      }
      const data: Job[] = await res.json();
      setGetJobLists(data);
    };
    fetchJobListsData();
  }, []);

  // 排序函數，指定 data 和返回值類型
  const sortData = (data: Job[], field: "job_day" | "job_admin_createdAt"): Job[] => {
    return [...data].sort((a, b) => {
      const dateA = new Date(a[field]).getTime();
      const dateB = new Date(b[field]).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });
  };

  // 處理排序按鈕點擊
  const handleSort = (field: "job_day" | "job_admin_createdAt") => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  // 獲取排序後的數據
  const getSortedData = (data: Job[]): Job[] => {
    if (!sortBy) return data;
    return sortData(data, sortBy);
  };

  // 搜索功能
  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/Job_Lists_search?query=${searchQuery}&field=${searchField}`);
      const data: Job[] = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("搜尋失敗:", error);
    }
  };

  // 渲染列表的通用函數
  const renderJobList = (data: Job[]) => {
    return getSortedData(data)?.map((job: Job) => (
      <div key={job.id}>
        <Link href={`/user/${userId}/admin/jobLists/${job.id}`}>
          code: {job.job_code}, school_name: {job.job_school_name}, subject: {job.job_subject}, area: {job.job_area}, 
          job_time: {job.job_time_h}, day: {job.job_day.split("T")[0]}, 
          建立日期: {new Date(job.job_admin_createdAt).toLocaleDateString()}, 
          顯示: {job.showprice ? "顯示價格" : "隱藏價格"}
        </Link>
      </div>
    ));
  };

  return (
    <>
      <Link href={`/user/${userId}/admin`}> Admin主頁 </Link>
      <div>
        <Link href={`/user/${userId}/admin/jobLists/createJob`}>CreateJob</Link>
      </div>

      <h1>JobLists</h1>

      <div className="sort-buttons">
        <Button
          onClick={() => handleSort("job_day")}
          variant={sortBy === "job_day" ? "default" : "outline"}
        >
          工作日期排序 {sortBy === "job_day" && `(${sortOrder === "asc" ? "↑" : "↓"})`}
        </Button>
        <Button
          onClick={() => handleSort("job_admin_createdAt")}
          variant={sortBy === "job_admin_createdAt" ? "default" : "outline"}
        >
          建立日期排序 {sortBy === "job_admin_createdAt" && `(${sortOrder === "asc" ? "↑" : "↓"})`}
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="輸入搜索內容..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <select value={searchField} onChange={(e) => setSearchField(e.target.value)}>
          <option value="all">所有字段</option>
          <option value="job_code">任務編號</option>
          <option value="job_school_name">學校名稱</option>
          <option value="job_subject">科目</option>
          <option value="job_area">地區</option>
          <option value="job_time">時間</option>
          <option value="job_day">日期</option>
          <option value="showprice">顯示價格</option>
        </select>
        <Button onClick={handleSearch}>搜索</Button>
      </div>

      {/* 渲染搜索結果或原始數據 */}
      {searchResults.length > 0 ? (
        renderJobList(searchResults)
      ) : GetJobLists.length === 0 ? (
        <p>沒有數據</p>
      ) : (
        renderJobList(GetJobLists)
      )}
    </>
  );
};

export default JobLists;