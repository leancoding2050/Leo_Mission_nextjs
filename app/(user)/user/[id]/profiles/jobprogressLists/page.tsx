// "use client";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// const JobList = () =>{
//   const param = useParams();
//   const userId = param.id as string;
//   console.log(param)

//   const [ GetUserListsDatabyId , setGetUserListsDatabyId ] = useState([]) ;  
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [searchField, setSearchField] = useState("all");
  
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

//   const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     try {
//       const response = await fetch(
//         `/api/Job_Lists_search_User_by_id?query=${searchQuery}&field=${searchField}&userId=${userId}`
//       );
//       const data = await response.json();
//       if (data.message === "沒有數據") {
//         setSearchResults([]); // 设置为一个空数组，以便前端显示 "没有数据"
//       } else {
//         setSearchResults(data);
//       }
//     } catch (error) {
//       console.error("搜尋失敗:", error);
//     }
//   };

//   console.log("searchResults : ", searchResults);

//   return (
//     <>
//             <Link href={`/user/${userId}/profiles`}>
//             上一頁
//             </Link>
//       <div>JobList</div>
  
//       <div className="flex items-center space-x-2">
//         <input
//           type="text"
//           placeholder="輸入搜索內容..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="flex-1"
//         />
//         <select
//           value={searchField}
//           onChange={(e) => setSearchField(e.target.value)}
//         >
//           <option value="all">所有字段</option>
//           <option value="job_code">任務編號</option>
//           <option value="job_school_name">學校名稱</option>
//           <option value="job_subject">科目</option>
//           <option value="job_area">地區</option>
//           <option value="job_time_h">時間</option>
//           <option value="job_day">日期</option>
//         </select>
//         <Button onClick={handleSearch}>搜索</Button>
//       </div>
  
//       {searchResults.length === 0 ? (
//         <p>沒有數據</p>
//       ) : (
//         searchResults.map((job) => (
//           <div key={job.id}>
//             <p>任務編號:{job.job_code}</p>
//             <p>時間:{job.job_time_h}</p>
//             <p>日期:{job.job_day.split('T')[0]}</p>
//             <p>學校名稱:{job.job_school_name}</p>
//             <p>地區:{job.job_area}</p>
//           </div>
//         ))
//       )}
  
//       {JobData?.length === 0 ? (
//         <p>沒有數據</p>
//       ) : (
//         JobData?.map((d) => (
//           <Link href={`/user/${userId}/profiles/jobprogressLists/${d.id}`} key={d.id}>
//             <div>
//               <p>任務編號:{d.job_code}</p>
//               <p>時間:{d.job_time_h}</p>
//               <p>日期:{d.job_day.split('T')[0]}</p>
//               <p>學校名稱:{d.job_school_name}</p>
//               <p>地區:{d.job_area}</p>
//             </div>
//           </Link>
//         ))
//       )}
//     </>
//   );
// }

// export default JobList

"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";

interface Job {
  id: string;
  job_code: string;
  job_time_h: string;
  job_day: string;
  job_school_name: string;
  job_area: string;
}

interface User {
  id: string;
  job: Job[];
}

const JobList = () => {
  const { id: userId } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Job[]>([]);
  const [searchField, setSearchField] = useState("all");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserData = useCallback(async (id: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/User_Lists_by_ID/${id}`);
      if (!res.ok) throw new Error("無法獲取用戶數據");
      const result = await res.json();

      console.log("result", result);

      setUserData(result || null);
    } catch (err) {
      setError("無法載入用戶數據，請稍後再試。");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const response = await fetch(
        `/api/Job_Lists_search_User_by_id?query=${encodeURIComponent(searchQuery)}&field=${searchField}&userId=${userId}`
      );
      if (!response.ok) throw new Error("搜尋失敗");
      const data = await response.json();
      setSearchResults(data.message === "沒有數據" ? [] : data);
    } catch (err) {
      setError("搜尋失敗，請稍後再試。");
      console.error(err);
    }
  }, [searchQuery, searchField, userId]);

  useEffect(() => {
    if (userId) fetchUserData(userId);
  }, [userId, fetchUserData]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).replace(/\//g, "-");
  };

  const renderJob = (job: Job) => (
    <Link href={`/user/${userId}/profiles/jobprogressLists/${job.id}`} key={job.id}>
      <div className="border p-4 rounded-md mb-2 hover:bg-gray-100">
        <p><strong>任務編號:</strong> {job.job_code}</p>
        <p><strong>時間:</strong> {job.job_time_h}</p>
        <p><strong>日期:</strong> {formatDate(job.job_day)}</p>
        <p><strong>學校名稱:</strong> {job.job_school_name}</p>
        <p><strong>地區:</strong> {job.job_area}</p>
      </div>
    </Link>
  );

  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (isLoading) return <div className="p-4">載入中...</div>;


  console.log("userData :" , userData)

  return (
<div className="p-4 ml-[50px]"> {/* 向右移動 50px */}
  <Link href={`/user/${userId}/profiles`} className="text-blue-500 hover:underline">
    上一頁
  </Link>
  <h1 className="text-2xl font-bold mb-4">工作清單</h1>

  <div className="flex items-center space-x-2 mb-4">
    <input
      type="text"
      placeholder="輸入搜尋內容..."
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="flex-1 p-2 border rounded"
    />
    <select
      value={searchField}
      onChange={(e) => setSearchField(e.target.value)}
      className="p-2 border rounded"
    >
      <option value="all">所有字段</option>
      <option value="job_code">任務編號</option>
      <option value="job_school_name">學校名稱</option>
      <option value="job_subject">科目</option>
      <option value="job_area">地區</option>
      <option value="job_time_h">時間</option>
      <option value="job_day">日期</option>
    </select>
    <Button
      onClick={handleSearch}
      className="bg-black text-white hover:bg-gray-800"
    >
      搜尋
    </Button>
  </div>


      {searchResults.length > 0 ? (
        <div>
          <h2 className="text-xl font-semibold mb-2">搜尋結果</h2>
          {searchResults.map(renderJob)}
        </div>
      ) : searchQuery ? (
        <p>沒有搜尋結果</p>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-2">所有工作</h2>
          {userData?.job?.length ? userData.job.map(renderJob) : <p>沒有數據</p>}
        </div>
      )}
    </div>
  );
};

export default JobList;