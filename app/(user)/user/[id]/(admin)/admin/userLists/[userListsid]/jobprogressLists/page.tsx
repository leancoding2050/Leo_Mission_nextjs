// "use client";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// const Admin_JobList_User = () =>{
//   const param = useParams();
//   const userId = param.id as string;
//   const targetuserId = param?.userListsid as string ;
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

//     getUserListsDatabyId(targetuserId)
//   },[targetuserId])

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

//   const nickname = GetUserListsDatabyId[0]?.nickname ;

//   return (
//     <>
//       <Link href={`/user/${userId}/admin/userLists/${targetuserId}`}>
//             上一頁
//             </Link>
//       <div>{nickname}的 JobList</div>

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
//           <div key={d.id}>
//             <p>任務編號:{d.job_code}</p>
//             <p>時間:{d.job_time_h}</p>
//             <p>日期:{d.job_day.split('T')[0]}</p>
//             <p>學校名稱:{d.job_school_name}</p>
//             <p>地區:{d.job_area}</p>
//           </div>
//         ))
//       )}
//     </>
//   );
// }

// export default Admin_JobList_User

"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// 定義 User 和 Job 類型，根據 Prisma 模型
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
  nickname: string;
  job: Job[];
  isAdmin: boolean;
}

const AdminJobListByUser = () => {
  const params = useParams();
  const adminId = params?.id as string | undefined;
  const targetUserId = params?.userListsid as string | undefined;

  const [getUserData, setGetUserData] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Job[]>([]);
  const [searchField, setSearchField] = useState("all");
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

    if (targetUserId) {
      getUserListsDataById(targetUserId);
    } else {
      setError("無效的用戶 ID");
      setIsLoading(false);
    }
  }, [targetUserId]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `/api/Job_Lists_search_User_by_id?query=${searchQuery}&field=${searchField}&userId=${targetUserId}`
      );
      if (!response.ok) throw new Error(`搜索失敗: ${response.status}`);
      const data: Job[] | { message: string } = await response.json();
      if ("message" in data && data.message === "沒有數據") {
        setSearchResults([]);
      } else {
        setSearchResults(data as Job[]);
      }
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "搜索失敗");
    }
  };

  if (isLoading) return <div className="p-4 text-gray-500">正在加載...</div>;
  if (error) return <div className="p-4 text-red-500">錯誤: {error}</div>;
  if (!getUserData) return <div className="p-4 text-gray-500">無用戶數據</div>;

  const jobData = getUserData.job ?? [];

  return (
    <div className="p-4">
      <Link href={`/user/${adminId}/admin/userLists/${targetUserId}`} className="text-blue-500 hover:underline">
        上一頁
      </Link>
      <h1 className="text-xl font-bold mt-4">{getUserData.nickname} 的工作列表</h1>

      <div className="flex items-center space-x-2 mt-4">
        <input
          type="text"
          placeholder="輸入搜索內容..."
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
        <Button onClick={handleSearch}>搜索</Button>
      </div>

      {searchResults.length > 0 ? (
        <div className="mt-4">
          <p className="font-semibold">搜索結果</p>
          {searchResults.map((job) => (
            <div key={job.id} className="p-4 border rounded-lg shadow-sm mt-2">
              <p>任務編號: {job.job_code}</p>
              <p>時間: {job.job_time_h}</p>
              <p>日期: {job.job_day.split("T")[0]}</p>
              <p>學校名稱: {job.job_school_name}</p>
              <p>地區: {job.job_area}</p>
            </div>
          ))}
        </div>
      ) : searchQuery ? (
        <p className="mt-4 text-gray-500">沒有搜索結果</p>
      ) : null}

      <div className="mt-4">
        <p className="font-semibold">所有工作</p>
        {jobData.length > 0 ? (
          jobData.map((job) => (
            <div key={job.id} className="p-4 border rounded-lg shadow-sm mt-2">
              <p>任務編號: {job.job_code}</p>
              <p>時間: {job.job_time_h}</p>
              <p>日期: {job.job_day.split("T")[0]}</p>
              <p>學校名稱: {job.job_school_name}</p>
              <p>地區: {job.job_area}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">沒有工作數據</p>
        )}
      </div>
    </div>
  );
};

export default AdminJobListByUser;