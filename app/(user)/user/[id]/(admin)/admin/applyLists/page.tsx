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


// "use client";

// import { Button } from "@/components/ui/button";
// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// // 定義 Apply 介面，與 API 數據結構對應
// interface Apply {
//   id: string;
//   apply_user_id: string;
//   apply_code: string;
//   apply_title: string;
//   apply_contect: string;
//   apply_task: string;
//   apply_task_code: string;
//   apply_job_code: string;
//   applicant_name: string;
//   apply_status: boolean;
//   apply_question: number; // 假設這是申請問題數量
//   apply_total_job_in_task: number; // 假設這是任務中的工作總數
// }

// const ApplyLists = () => {
//   const session = useSession();
//   const userId = session.data?.user?.id;

//   const [GetApplyLists, setGetApplyLists] = useState<Apply[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<Apply[]>([]);
//   const [searchField, setSearchField] = useState("all");
//   const [groupedData, setGroupedData] = useState<Record<string, Apply[]>>({});
//   const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

//   useEffect(() => {
//     const getApplyListsData = async () => {
//       try {
//         const res = await fetch(`/api/Apply_Lists`);
//         if (!res.ok) {
//           throw new Error(`請求失敗: ${res.status}`);
//         }
//         const result: Apply[] = await res.json();
//         setGetApplyLists(result);
//       } catch (error) {
//         console.error("獲取申請列表失敗:", error);
//       }
//     };
//     getApplyListsData();
//   }, []);

//   // 當數據更新時進行分組
//   useEffect(() => {
//     const groupData = () => {
//       const grouped = GetApplyLists.reduce((acc, item) => {
//         // 決定使用哪個 code 作為分組依據
//         const code =
//           item.apply_job_code && item.apply_job_code !== "null"
//             ? item.apply_job_code
//             : item.apply_task_code && item.apply_task_code !== "null"
//             ? item.apply_task_code
//             : "ungrouped";

//         if (!acc[code]) {
//           acc[code] = [];
//         }
//         acc[code].push(item);
//         return acc;
//       }, {} as Record<string, Apply[]>);

//       setGroupedData(grouped);
//     };

//     if (GetApplyLists.length > 0) {
//       groupData();
//     }
//   }, [GetApplyLists]);

//   const toggleGroup = (code: string) => {
//     setExpandedGroups((prev) => {
//       const newSet = new Set(prev);
//       if (newSet.has(code)) {
//         newSet.delete(code);
//       } else {
//         newSet.add(code);
//       }
//       return newSet;
//     });
//   };

//   // 修改 handleSearch，移除 event 參數並處理 MouseEvent
//   const handleSearch = async () => {
//     try {
//       const response = await fetch(
//         `/api/Apply_Lists_search?query=${encodeURIComponent(searchQuery)}&field=${encodeURIComponent(searchField)}`
//       );
//       if (!response.ok) {
//         throw new Error(`搜尋失敗: ${response.status}`);
//       }
//       const data: Apply[] = await response.json();
//       setSearchResults(data);
//     } catch (error) {
//       console.error("搜尋失敗:", error);
//     }
//   };

//   console.log("GetApplyLists:", GetApplyLists);
//   console.log("searchResults:", searchResults);

//   return (
//     <>
//       <Link href={`/user/${userId}/admin`}>Admin主頁</Link>
//       <div>ApplyLists</div>

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
//           <option value="apply_title">申請標題</option>
//           <option value="apply_task_code">申請Task_code</option>
//           <option value="apply_job_code">申請job_code</option>
//           <option value="apply_contect">申請內容</option>
//           <option value="apply_code">申請code</option>
//           <option value="applicant_name">申請人名稱</option>
//           <option value="apply_status">申請人狀態</option>
//         </select>

//         <Button onClick={handleSearch}>搜索</Button>
//       </div>

//       {searchResults.length > 0 ? (
//         searchResults.map((apply) => (
//           <div key={apply.id}>
//             <p>結果</p>
//             <Link href={`/user/${userId}/admin/applyLists/${apply.id}`}>
//               申請標題: {apply.apply_title}, 申請Task_code: {apply.apply_task_code}, 申請job_code: {apply.apply_job_code}, 申請內容: {apply.apply_contect}, 申請code: {apply.apply_code}, 申請人名稱: {apply.applicant_name}, 申請人狀態: {apply.apply_status ? "已審" : "未審"}
//             </Link>
//           </div>
//         ))
//       ) : (
//         <p>無搜索結果</p>
//       )}

//       {Object.keys(groupedData).length === 0 ? (
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
//     </>
//   );
// };

// export default ApplyLists;


"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  apply_question: number;
  apply_total_job_in_task: number;
}

export default function ApplyLists() {
  const session = useSession();
  const userId = session.data?.user?.id;

  const [GetApplyLists, setGetApplyLists] = useState<Apply[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Apply[]>([]);
  const [searchField, setSearchField] = useState("all");
  const [groupedData, setGroupedData] = useState<Record<string, Apply[]>>({});
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getApplyListsData = async () => {
      try {
        const res = await fetch(`/api/Apply_Lists`, { cache: "no-store" });
        if (!res.ok) throw new Error(`請求失敗: ${res.status}`);
        const result: Apply[] | { message: string } = await res.json();
        if ("message" in result && result.message === "沒有數據") {
          setGetApplyLists([]);
        } else {
          setGetApplyLists(result as Apply[]);
        }
        setError("");
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "未知錯誤");
      } finally {
        setIsLoading(false);
      }
    };
    getApplyListsData();
  }, []);

  useEffect(() => {
    const groupData = () => {
      const grouped = GetApplyLists.reduce((acc, item) => {
        const code =
          item.apply_job_code && item.apply_job_code !== "null"
            ? item.apply_job_code
            : item.apply_task_code && item.apply_task_code !== "null"
            ? item.apply_task_code
            : "ungrouped";
        if (!acc[code]) acc[code] = [];
        acc[code].push(item);
        return acc;
      }, {} as Record<string, Apply[]>);
      setGroupedData(grouped);
    };
    if (GetApplyLists.length > 0) groupData();
  }, [GetApplyLists]);

  const toggleGroup = (code: string) => {
    setExpandedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(code)) newSet.delete(code);
      else newSet.add(code);
      return newSet;
    });
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/Apply_Lists_search?query=${encodeURIComponent(searchQuery)}&field=${encodeURIComponent(searchField)}`
      );
      if (!response.ok) throw new Error(`搜尋失敗: ${response.status}`);
      const data: Apply[] | { message: string } = await response.json();
      if ("message" in data && data.message === "沒有數據") {
        setSearchResults([]);
      } else {
        setSearchResults(data as Apply[]);
      }
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "搜尋失敗");
    }
  };

  if (isLoading)
    return (
      <div className="ml-[50px] p-4 text-[#1D475D] font-noto-sans-tc">正在加載...</div>
    );
  if (error)
    return (
      <div className="ml-[50px] p-4 text-[#FF0000] font-noto-sans-tc">錯誤: {error}</div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#d7e1e9] to-[#d7e1e9] bg-opacity-60 font-noto-sans-tc">
      <div className="ml-[50px] p-4">
        <div className="space-y-2">
          <Link
            href={`/user/${userId}/admin`}
            className="text-[#0071AC] hover:text-black transition-all duration-300"
          >
            Admin 主頁
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-[#1D475D] mt-4">申請列表</h1>

        <form onSubmit={handleSearch} className="flex items-center gap-2 py-2">
          <input
            type="text"
            placeholder="搜尋關鍵字"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-96 h-8 border border-gray-300 rounded-md px-2 focus:outline-none focus:ring-2 focus:ring-[#0071AC]"
          />
          <select
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            className="h-8 border border-gray-300 rounded-md px-2 focus:outline-none focus:ring-2 focus:ring-[#0071AC]"
          >
            <option value="all">所有字段</option>
            <option value="apply_title">申請標題</option>
            <option value="apply_task_code">申請任務編號</option>
            <option value="apply_job_code">申請工作編號</option>
            <option value="apply_contect">申請內容</option>
            <option value="apply_code">申請編號</option>
            <option value="applicant_name">申請人名稱</option>
            <option value="apply_status">申請狀態</option>
          </select>
          <Button
            type="submit"
            className="bg-[#0071AC] text-white px-4 py-2 rounded-md text-sm hover:bg-black transition-all duration-300"
          >
            搜尋
          </Button>
        </form>

        {searchResults.length > 0 ? (
          <div className="mt-4 space-y-4">
            <p className="font-semibold text-[#1D475D]">搜尋結果</p>
            {searchResults.map((apply) => (
              <Link
                key={apply.id}
                href={`/user/${userId}/admin/applyLists/${apply.id}`}
                className="block p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
              >
                <p className="text-[#1D475D]">申請標題: {apply.apply_title}</p>
                <p className="text-[#1D475D]">申請任務編號: {apply.apply_task_code || "無"}</p>
                <p className="text-[#1D475D]">申請工作編號: {apply.apply_job_code || "無"}</p>
                <p className="text-[#1D475D]">申請內容: {apply.apply_contect || "無"}</p>
                <p className="text-[#1D475D]">申請編號: {apply.apply_code}</p>
                <p className="text-[#1D475D]">申請人名稱: {apply.applicant_name || "無"}</p>
                <p className="text-[#1D475D]">
                  申請狀態: {apply.apply_status ? "已審核" : "未審核"}
                </p>
                <p className="text-[#1D475D]">
                  申請問題數/工作總數: {apply.apply_question}/{apply.apply_total_job_in_task}
                </p>
              </Link>
            ))}
          </div>
        ) : searchResults.length === 0 && searchQuery ? (
          <p className="mt-4 text-[#1D475D]">沒有搜尋結果</p>
        ) : null}

        {Object.keys(groupedData).length === 0 ? (
          <p className="mt-4 text-[#1D475D]">沒有數據</p>
        ) : (
          <div className="mt-4 space-y-4">
            <p className="font-semibold text-[#1D475D]">申請分組</p>
            {Object.entries(groupedData).map(([code, items]) => (
              <div key={code} className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-[#1D475D]">
                    {code === "ungrouped"
                      ? "未分類申請"
                      : `代碼: ${code} (共 ${items.length} 個申請)`}
                  </h3>
                  {code !== "ungrouped" && (
                    <Button
                      onClick={() => toggleGroup(code)}
                      className="bg-gray-200 text-black px-4 py-2 rounded-md text-sm hover:bg-[#0071AC] hover:text-white transition-all duration-300"
                    >
                      {expandedGroups.has(code) ? "收起" : "展開"}
                    </Button>
                  )}
                </div>
                {expandedGroups.has(code) && (
                  <div className="mt-2 space-y-2">
                    {items.map((item) => (
                      <Link
                        key={item.id}
                        href={`/user/${userId}/admin/applyLists/${item.id}`}
                        className="block p-3 border border-gray-200 rounded-md hover:bg-gray-100 transition-all"
                      >
                        <p className="text-[#1D475D]">申請標題: {item.apply_title}</p>
                        <p className="text-[#1D475D]">申請編號: {item.apply_code}</p>
                        <p className="text-[#1D475D]">
                          申請狀態: {item.apply_status ? "已審核" : "未審核"}
                        </p>
                        <p className="text-[#1D475D]">
                          申請問題數/工作總數: {item.apply_question}/{item.apply_total_job_in_task}
                        </p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}