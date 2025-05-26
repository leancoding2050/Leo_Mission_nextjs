// "use client";

// import { Button } from "@/components/ui/button";
// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import { useEffect , useState } from "react";
// const ApplyLists = () => {

//     const session = useSession() ;
//     const userId = session.data?.user?.id ;
//     const [ GetApplyLists , setGetApplyLists ] = useState([]) ;  

//     const [ searchQuery , setSearchQuery ] = useState("");
//     const [searchResults, setSearchResults] = useState([]);
//     const [ searchField , setSearchField ] = useState("all");

//     const [groupedData, setGroupedData] = useState<any>({});
//   const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

//     useEffect(() => {

//         const getApplyListsData = async () => {
//             const res = await fetch(`/api/Apply_Lists`);
//             if(!res){
//                 throw new Error("斷線!")
//             }
//             const result = await res.json() ;
//             setGetApplyLists(result) ;
//         }
//         getApplyListsData()
//     }, [])

//     console.log("GetApplyLists : ",GetApplyLists)

// // 當數據更新時進行分組
// useEffect(() => {
//   const groupData = () => {
//     const grouped = GetApplyLists.reduce((acc, item:any) => {
//       // 決定使用哪個code作為分組依據
//       const code =
//         item.apply_job_code && item.apply_job_code !== "null"
//           ? item.apply_job_code
//           : item.apply_task_code && item.apply_task_code !== "null"
//           ? item.apply_task_code
//           : "ungrouped";

//       if (!acc[code]) {
//         acc[code] = [];
//       }
//       acc[code].push(item);
//       return acc;
//     }, {} as Record<string, any[]>);

//     setGroupedData(grouped);
//   };

//   if (GetApplyLists.length > 0) {
//     groupData();
//   }
// }, [GetApplyLists]);

// const toggleGroup = (code: string) => {
//   setExpandedGroups((prev) => {
//     const newSet = new Set(prev);
//     if (newSet.has(code)) {
//       newSet.delete(code);
//     } else {
//       newSet.add(code);
//     }
//     return newSet;
//   });
// };
//     const handleSearch =  async (event: React.ChangeEvent<HTMLInputElement>) => {
//         try {
//           const response = await fetch(`/api/Apply_Lists_search?query=${searchQuery}&field=${searchField}`);
//           const data = await response.json();
//           setSearchResults(data);
//         } catch (error) {
//           console.error("搜尋失敗:", error)
//         }
//       };

//       console.log("searchResults : ",searchResults)

//     return(
//         <>
//         <Link href={`/user/${userId}/admin`}> Admin主頁 </Link>
//             ApplyLists

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
//                         {searchResults.map((apply)=>{
//                       return(
//                         <div  key={apply.id} >
//                         <p>結果</p>
//                         <div key={apply.id} >
//                         <Link href={`/user/${userId}/admin/applyLists/${apply.id}`}> 
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

// {Object.keys(groupedData).length === 0 ? (
//         <p>沒有數據</p>
//       ) : (
//         Object.entries(groupedData).map(([code, items]) => (
//           <div key={code} className="mb-4 border-b pb-2">
//             <div className="flex items-center justify-between">
//               <h3>
//                 {code === "ungrouped"
//                   ? "未分類申請"
//                   : `代碼: ${code} 共(${items.length} 個申請)`}
//               </h3>
//               {code !== "ungrouped" && (
//                 <Button
//                   onClick={() => toggleGroup(code)}
//                   variant="outline"
//                   size="sm"
//                 >
//                   {expandedGroups.has(code) ? "收起" : "打開"}
//                 </Button>
//               )}
//             </div>

//             {expandedGroups.has(code) && (
//               <div className="mt-2 pl-4">
//                 {items.map((item) => (
//                   <div key={item.id} className="py-1">
//                     <Link
//                       href={`/user/${userId}/admin/applyLists/${item.id}`}
//                       className="hover:underline"
//                     >
//                       <div>
//                         申請標題: {item.apply_title}
//                         <br />
//                         申請編號: {item.apply_code}
//                         <br />
//                         申請狀態: {item.apply_status ? "已審" : "未審"}
//                         <br />
//                         申請工作總數: {item.apply_question}/ {item.apply_total_job_in_task}
//                       </div>
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))
//       )}

//         </>
//     )
// }

// export default ApplyLists


"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import useSWR from "swr";
import { useState } from "react";

interface Apply {
  id: string;
  apply_user_id: string;
  apply_code: string;
  apply_title: string;
  apply_contect: string;
  apply_task_code: string | null;
  apply_job_code: string | null;
  applicant_name: string;
  apply_status: boolean;
  apply_question: number;
  apply_total_job_in_task: number;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("獲取申請列表失敗");
  return res.json();
};

const ApplyLists = () => {
  const session = useSession();
  const userId = session.data?.user?.id;

  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("all");
  const [searchResults, setSearchResults] = useState<Apply[]>([]);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  // 使用 SWR 獲取申請列表
  const { data: GetApplyLists, error } = useSWR<Apply[]>(
    `http://127.0.0.1:8000/api/apply/lists/`,
    fetcher,
    { revalidateOnFocus: false }
  );

  // 分組邏輯
  const groupedData = GetApplyLists?.reduce((acc, item) => {
    const code =
      item.apply_job_code && item.apply_job_code !== "null"
        ? item.apply_job_code
        : item.apply_task_code && item.apply_task_code !== "null"
        ? item.apply_task_code
        : "ungrouped";

    if (!acc[code]) {
      acc[code] = [];
    }
    acc[code].push(item);
    return acc;
  }, {} as Record<string, Apply[]>) || {};

  const toggleGroup = (code: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(code)) {
        newSet.delete(code);
      } else {
        newSet.add(code);
      }
      return newSet;
    });
  };

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

  if (error) return <div className="text-red-500">無法載入申請列表</div>;
  if (!GetApplyLists) return <div>載入中...</div>;

  return (
    <div className="p-4">
      <Link href={`/user/${userId}/admin`} className="text-blue-500 hover:underline">
        Admin主頁
      </Link>
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
              href={`/user/${userId}/admin/applyLists/${apply.id}`}
              key={apply.id}
            >
              <div className="p-4 mb-2 border rounded hover:bg-gray-100">
                <p>申請標題: {apply.apply_title}</p>
                <p>申請Task_code: {apply.apply_task_code || "無"}</p>
                <p>申請job_code: {apply.apply_job_code || "無"}</p>
                <p>申請內容: {apply.apply_contect}</p>
                <p>申請code: {apply.apply_code}</p>
                <p>申請人名稱: {apply.applicant_name}</p>
                <p>申請人狀態: {apply.apply_status ? "已審" : "未審"}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* 分組申請列表 */}
      <h2 className="text-xl font-semibold mb-2">所有申請</h2>
      {Object.keys(groupedData).length === 0 ? (
        <p>無申請記錄</p>
      ) : (
        Object.entries(groupedData).map(([code, items]) => (
          <div key={code} className="mb-4 border-b pb-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">
                {code === "ungrouped"
                  ? "未分類申請"
                  : `代碼: ${code} 共(${items.length} 個申請)`}
              </h3>
              {code !== "ungrouped" && (
                <Button
                  onClick={() => toggleGroup(code)}
                  variant="outline"
                  size="sm"
                >
                  {expandedGroups.has(code) ? "收起" : "打開"}
                </Button>
              )}
            </div>

            {expandedGroups.has(code) && (
              <div className="mt-2 pl-4">
                {items.map((item) => (
                  <Link
                    href={`/user/${userId}/admin/applyLists/${item.id}`}
                    key={item.id}
                    className="block py-1 hover:underline"
                  >
                    <div className="p-2 border rounded">
                      <p>申請標題: {item.apply_title}</p>
                      <p>申請編號: {item.apply_code}</p>
                      <p>申請狀態: {item.apply_status ? "已審" : "未審"}</p>
                      <p>
                        申請工作總數: {item.apply_question} /{" "}
                        {item.apply_total_job_in_task}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ApplyLists;