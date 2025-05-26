// "use client";

// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// const ApplyListsPage = () => {
//     const param = useParams();
//     console.log(param);
//     const UserId = param?.id as string;

//     const [GetApplyList, setGetJobLists] = useState([]);

//     const [ searchQuery , setSearchQuery ] = useState("");
//     const [searchResults, setSearchResults] = useState([]);
//     const [ searchField , setSearchField ] = useState("all");

//     useEffect(() => {
//         const fetchapplylistsdata = async () => {
//             const res = await fetch(`/api/Apply_Lists`);
//             const data = await res.json();
//             setGetJobLists(data);
//         };
//         fetchapplylistsdata();
//     }, []);

//     console.log(GetApplyList);

//     const handleSearch =  async (event: React.ChangeEvent<HTMLInputElement>) => {
//       try {
//         const response = await fetch(`/api/Apply_Lists_search?query=${searchQuery}&field=${searchField}`);
//         const data = await response.json();
//         setSearchResults(data);
//       } catch (error) {
//         console.error("搜尋失敗:", error)
//       }
//     };
//       console.log("searchResults : ",searchResults)
//     return (
//         <>
//             applylist

//             <div className="flex items-center space-x-2">
//                           <input 
//                             type="text" 
//                             placeholder="輸入搜索內容..."
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             className="flex-1"
//                           />
//                                 <select
//                                   value={searchField}
//                                   onChange={(e) => setSearchField(e.target.value)}
//                                 >
//                                   <option value="all">所有字段</option>
//                                   <option value="apply_title">申請標題</option>
//                                   <option value="apply_task_code">申請Task_code</option>
//                                   <option value="apply_job_code">申請job_code</option>
//                                   <option value="apply_contect">申請內容</option>
//                                   <option value="apply_code">申請code</option>
//                                   <option value="applicant_name">申請人名稱</option>
//                                   <option value="apply_status">申請人狀態</option>
//                                 </select>

//                           <Button onClick={handleSearch} > 搜索 </Button>
//                         </div>
//                         {searchResults.map((apply:any)=>{
//                       return(
//                         <div  key={apply.id} >
//                         <p>結果</p>
//                         <div key={apply.id} >
//                         <Link href={`/user/${UserId}/admin/applyLists/${apply.id}`}> 
//                         申請標題 : {apply.apply_title}, 
//                         申請Task_code : {apply.apply_task_code} , 
//                         申請job_code :  {apply.apply_job_code} , 
//                         申請內容: {apply.apply_contect} , 
//                         申請code :  {apply.apply_code} , 
//                         申請人名稱:  {apply.applicant_name} ,
//                         申請人狀態:   {apply.apply_status ? "已審" : "未審"}
//                         </Link>

//                         </div>
//                         </div>

//                       )
//                     })}


//             {GetApplyList?.map((d: any) => {
//                 if (d.apply_user_id === UserId) {
//                     return (
//                         <Link href={`/user/${UserId}/applyLists/${d.id}`} key={d.id}>
//                             <div>
//                                 {d.apply_code}
//                                 <br />
//                                 {d.apply_title}
//                                 <br />
//                                 {d.apply_contect}
//                                 <br />
//                                 {d.apply_task}
//                             </div>
//                         </Link>
//                     );
//                 }
//                 return null; // 如果條件不滿足，返回 null
//             })}
//         </>
//     );
// };

// export default ApplyListsPage;


"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { useState } from "react";

interface Apply {
  id: string;
  apply_user_id: string;
  apply_code: string;
  apply_title: string;
  apply_contect: string;
  apply_task: string;
  apply_task_code: string;
  apply_job_code: string;
  applicant_name: string;
  apply_status: boolean;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("獲取申請列表失敗");
  return res.json();
};

const ApplyListsPage = () => {
  const param = useParams();
  const UserId = param?.id as string;

  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("all");
  const [searchResults, setSearchResults] = useState<Apply[]>([]);

  // 使用 SWR 獲取申請列表
  const { data: GetApplyList, error } = useSWR<Apply[]>(
    `http://127.0.0.1:8000/api/apply/lists/`,
    fetcher,
    { revalidateOnFocus: false }
  );

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/apply/lists/search?query=${encodeURIComponent(
          searchQuery
        )}&field=${encodeURIComponent(searchField)}`
      );
      if (!response.ok) throw new Error("搜尋失敗");
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("搜尋失敗:", error);
    }
  };

  if (error) return <div>無法載入申請列表</div>;
  if (!GetApplyList) return <div>載入中...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">申請列表</h1>

      {/* 搜尋區域 */}
      <div className="flex items-center space-x-2 mb-4">
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
          <option value="apply_title">申請標題</option>
          <option value="apply_task_code">申請Task_code</option>
          <option value="apply_job_code">申請job_code</option>
          <option value="apply_contect">申請內容</option>
          <option value="apply_code">申請code</option>
          <option value="applicant_name">申請人名稱</option>
          <option value="apply_status">申請人狀態</option>
        </select>
        <Button onClick={handleSearch}>搜索</Button>
      </div>

      {/* 搜尋結果 */}
      {searchResults.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">搜尋結果</h2>
          {searchResults.map((apply) => (
            <Link
              href={`/user/${UserId}/admin/applyLists/${apply.id}`}
              key={apply.id}
            >
              <div className="p-4 mb-2 border rounded hover:bg-gray-100">
                <p>申請標題: {apply.apply_title}</p>
                <p>申請Task_code: {apply.apply_task_code}</p>
                <p>申請job_code: {apply.apply_job_code}</p>
                <p>申請內容: {apply.apply_contect}</p>
                <p>申請code: {apply.apply_code}</p>
                <p>申請人名稱: {apply.applicant_name}</p>
                <p>申請人狀態: {apply.apply_status ? "已審" : "未審"}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* 所有申請列表 */}
      <h2 className="text-xl font-semibold mb-2">我的申請</h2>
      {GetApplyList.filter((d) => d.apply_user_id === UserId).length === 0 && (
        <p>無申請記錄</p>
      )}
      {GetApplyList.filter((d) => d.apply_user_id === UserId).map((d) => (
        <Link href={`/user/${UserId}/applyLists/${d.id}`} key={d.id}>
          <div className="p-4 mb-2 border rounded hover:bg-gray-100">
            <p>申請code: {d.apply_code}</p>
            <p>申請標題: {d.apply_title}</p>
            <p>申請內容: {d.apply_contect}</p>
            <p>申請任務: {d.apply_task}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ApplyListsPage;