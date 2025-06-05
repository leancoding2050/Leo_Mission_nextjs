"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
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

const JobLists = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

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

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/Job_Lists_search?query=${searchQuery}&field=${searchField}`);
      const data: Job[] = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("搜尋失敗:", error);
    }
  };

  const renderJobList = (data: Job[]) => {
    return (
     
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="p-3 font-medium">任務編號</th>
              <th className="p-3 font-medium">學校名稱</th>
              <th className="p-3 font-medium">科目</th>
              <th className="p-3 font-medium">地區</th>
              <th className="p-3 font-medium">時間</th>
              <th className="p-3 font-medium">日期</th>
              <th className="p-3 font-medium">建立日期</th>
              <th className="p-3 font-medium">顯示價格</th>
            </tr>
          </thead>
          <tbody>
            {getSortedData(data)?.map((job: Job) => (
              <tr key={job.id} className="border-t border-gray-200">
                <td className="p-3">
                  <Link
                    href={`/user/${userId}/admin/jobLists/${job.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {job.job_code}
                  </Link>
                </td>
                <td className="p-3">{job.job_school_name}</td>
                <td className="p-3">{job.job_subject}</td>
                <td className="p-3">{job.job_area}</td>
                <td className="p-3">{job.job_time_h}</td>
                <td className="p-3">{job.job_day.split("T")[0]}</td>
                <td className="p-3">{new Date(job.job_admin_createdAt).toLocaleDateString()}</td>
                <td className="p-3">{job.showprice ? "顯示價格" : "隱藏價格"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <Link
          href={`/user/${userId}/admin`}
          className="text-blue-600 hover:underline text-lg"
        >
          Admin主頁
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 text-center mt-4">
          工作列表
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <Link href={`/user/${userId}/admin/jobLists/createJob`}>
          <button className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-4 py-2">
            + 建立工作
          </button>
        </Link>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={() => handleSort("job_day")}
            className={`${
              sortBy === "job_day"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
            } rounded-md px-4 py-2`}
          >
            工作日期排序 {sortBy === "job_day" && `(${sortOrder === "asc" ? "↑" : "↓"})`}
          </Button>
          <Button
            onClick={() => handleSort("job_admin_createdAt")}
            className={`${
              sortBy === "job_admin_createdAt"
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
            } rounded-md px-4 py-2`}
          >
            建立日期排序 {sortBy === "job_admin_createdAt" && `(${sortOrder === "asc" ? "↑" : "↓"})`}
          </Button>
        </div>
      </div>
      <form className="mb-6">
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="輸入搜索內容..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-md border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">所有字段</option>
            <option value="job_code">任務編號</option>
            <option value="job_school_name">學校名稱</option>
            <option value="job_subject">科目</option>
            <option value="job_area">地區</option>
            <option value="job_time">時間</option>
            <option value="job_day">日期</option>
            <option value="showprice">顯示價格</option>
          </select>
          <Button
            onClick={handleSearch}
            className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-4 py-2"
          >
            搜索
          </Button>
        </div>
      </form>
      {status === "loading" ? (
        <div className="text-center text-gray-700 text-lg">載入中...</div>
      ) : searchResults.length > 0 ? (
        renderJobList(searchResults)
      ) : GetJobLists.length === 0 ? (
        <p className="text-gray-700 text-center">沒有數據</p>
      ) : (
        renderJobList(GetJobLists)
      )}
    </div>
  );
};

export default JobLists;





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