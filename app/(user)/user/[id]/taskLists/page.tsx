// "use client";

// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// interface Task {
//   id: string;
//   task_title: string;
//   task_subject: string;
//   task_code: string;
//   task_area: string;
//   School_name: string[];
//   task_price: number;
//   showprice: boolean;
//   job: { id: string }[];
//   teacher?: string;
// }

// const TaskboardListPage = () => {
//   const param = useParams();
//   const UserId = param?.id as string;

//   const [GettaskLists, setGetTaskLists] = useState<Task[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<Task[]>([]);
//   const [searchField, setSearchField] = useState("all");
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchtasklistsdata = async () => {
//       setIsLoading(true);
//       try {
//         const res = await fetch(`/api/Task_Lists`);
//         if (!res.ok) {
//           throw new Error("無法獲取任務數據");
//         }
//         const data = await res.json();
//         setGetTaskLists(data);
//       } catch (error) {
//         setError("無法載入數據");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchtasklistsdata();
//   }, []);

//   const performSearch = async () => {
//     try {
//       const response = await fetch(`/api/Job_Lists_search_User?query=${searchQuery}&field=${searchField}`);
//       if (!response.ok) {
//         throw new Error("搜索請求失敗");
//       }
//       const data = await response.json();
//       setSearchResults(data);
//     } catch (error) {
//       console.error("搜尋失敗:", error);
//     }
//   };

//   const handleSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
//     performSearch();
//   };

//   if (isLoading) {
//     return <div>載入中...</div>;
//   }

//   if (error) {
//     return <div style={{ color: "red" }}>{error}</div>;
//   }

//   if (!UserId) {
//     return <div>無效的用戶 ID</div>;
//   }

//   const displayData = searchResults.length > 0 ? searchResults : GettaskLists;

//   return (
//     <>
//         <Link href={`/user/${UserId}/`}>
//       返回首頁
//     </Link>
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
//           <option value="task_title">task_標題</option>
//           <option value="task_subject">task_科目</option>
//           <option value="task_contect">task_內容</option>
//           <option value="task_code">task_code</option>
//           <option value="task_address">task地址</option>
//           <option value="task_area">task地區</option>
//           <option value="task_price">task_價錢</option>
//           <option value="School_name">學校名</option>
//         </select>
//         <Button onClick={handleSearch}>搜索</Button>
//       </div>

//       {displayData.length === 0 ? (
//         <p>沒有數據</p>
//       ) : (
//         displayData.map((task) => (
//           <div key={task.id}>
//             <p>結果</p>
//             <Link href={`/user/${UserId}/taskLists/${task.id}`}>
//               <p>TaskTitle: {task.task_title}</p>
//               <p>Task主題: {task.task_subject}</p>
//               <p>TaskCode: {task.task_code}</p>
//               <p>Taskarea: {task.task_area}</p>
//               <p>schoolName: {task.School_name.join(", ")}</p>
//               <p>價錢: {task.showprice ? task.task_price : "價格隱藏"}</p>
//               <p>工作數量: {task.job.length}</p>
//               <p>老師: {task.teacher || "無"}</p>
//             </Link>
//           </div>
//         ))
//       )}
//     </>
//   );
// };

// export default TaskboardListPage;



// "use client";

// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// import Navbar from "@/components/Navbar";

// interface Task {
//   id: string;
//   task_title: string;
//   task_subject: string;
//   task_code: string;
//   task_area: string;
//   School_name: string[];
//   task_price: number;
//   showprice: boolean;
//   job: { id: string }[];
//   teacher?: string;
// }

// const TaskboardListPage = () => {
//   const param = useParams();
//   const UserId = param?.id as string;

//   const [GettaskLists, setGetTaskLists] = useState<Task[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<Task[]>([]);
//   const [searchField, setSearchField] = useState("all");
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchTaskListsData = async () => {
//       setIsLoading(true);
//       try {
//         const res = await fetch(`/api/Task_Lists`, { cache: "no-store" });
//         if (!res.ok) {
//           throw new Error("無法獲取任務數據");
//         }
//         const data: Task[] = await res.json();
//         setGetTaskLists(data || []);
//       } catch (error) {
//         setError("無法載入數據");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchTaskListsData();
//   }, []);

//   const performSearch = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(
//         `/api/Task_Lists_search?query=${encodeURIComponent(searchQuery)}&field=${encodeURIComponent(searchField)}`,
//         { cache: "no-store" }
//       );
//       if (!response.ok) {
//         throw new Error("搜索請求失敗");
//       }
//       const data: Task[] = await response.json();
//       setSearchResults(data || []);
//     } catch (error) {
//       console.error("搜尋失敗:", error);
//       setSearchResults([]);
//     }
//   };

//   // if (isLoading) {
//   //   return (
//   //     <div className="flex w-full">
//   //       <Navbar />
//   //       <div className="ml-[var(--navbar-width)] w-[95%] p-4 text-sm text-center">
//   //         載入中...
//   //       </div>
//   //     </div>
//   //   );
//   // }

//   // if (error) {
//   //   return (
//   //     <div className="flex w-full">
//   //       <Navbar />
//   //       <div className="ml-[var(--navbar-width)] w-[95%] p-4 text-sm text-red text-center">
//   //         {error}
//   //       </div>
//   //     </div>
//   //   );
//   // }

//   // if (!UserId) {
//   //   return (
//   //     <div className="flex w-full">
//   //       <Navbar />
//   //       <div className="ml-[var(--navbar-width)] w-[95%] p-4 text-sm text-center">
//   //         無效的用戶 ID
//   //       </div>
//   //     </div>
//   //   );
//   // }

//   const displayData = searchResults.length > 0 ? searchResults : GettaskLists;

//   return (
    
//     <div className="flex w-full">
//       <div className="ml-[var(--navbar-width)] w-[95%] p-4 text-sm">
//         {/* 返回首頁 */}
//         <Link href={`/user/${UserId}/`} className="text-primary2 hover:underline mb-4 inline-block">
//           返回首頁
//         </Link>

//         {/* 搜索欄 */}
//         <form onSubmit={performSearch} className="py-2">
//           <div className="flex items-center gap-2">
//             <input
//               type="text"
//               placeholder="搜尋關鍵字"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-96 h-8 border border-grey2 rounded-md px-2 focus:outline-none focus:ring-2 focus:ring-primary2"
//               required
//             />
//             <select
//               value={searchField}
//               onChange={(e) => setSearchField(e.target.value)}
//               className="h-8 border border-grey2 rounded-md px-2 focus:outline-none focus:ring-2 focus:ring-primary2"
//             >
//               <option value="all">所有字段</option>
//               <option value="task_title">任務標題</option>
//               <option value="task_subject">任務科目</option>
//               <option value="task_code">任務編號</option>
//               <option value="task_area">任務地區</option>
//               <option value="task_price">任務價錢</option>
//               <option value="School_name">學校名稱</option>
//             </select>
//             <Button
//               type="submit"
//               className="bg-primary2 text-white px-4 py-2 rounded-md text-sm hover:bg-black transition-all duration-300"
//             >
//               搜尋
//             </Button>
//           </div>
//         </form>

//         {/* 創建任務 */}
//         <div className="flex items-center py-2 px-5 gap-2">
//           <Link href={`/user/${UserId}/create-task`}>
//             <Button className="bg-primary2 text-white px-4 py-2 rounded-md text-base hover:bg-black transition-all duration-300">
//               + 建立任務
//             </Button>
//           </Link>
//         </div>

//         {/* 數據表格 */}
//         <div className="w-full overflow-x-auto">
//           <div className="grid grid-cols-[200px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] text-sm min-w-[800px]">
//             <div className="border border-boardWhite bg-grey2 text-black p-2 text-center font-bold">
//               學校名稱
//             </div>
//             <div className="border border-boardWhite bg-grey2 text-black p-2 text-center font-bold">
//               任務標題
//             </div>
//             <div className="border border-boardWhite bg-grey2 text-black p-2 text-center font-bold">
//               任務科目
//             </div>
//             <div className="border border-boardWhite bg-grey2 text-black p-2 text-center font-bold">
//               任務編號
//             </div>
//             <div className="border border-boardWhite bg-grey2 text-black p-2 text-center font-bold">
//               地區
//             </div>
//             <div className="border border-boardWhite bg-grey2 text-black p-2 text-center font-bold">
//               價錢
//             </div>
//             <div className="border border-boardWhite bg-grey2 text-black p-2 text-center font-bold">
//               工作數量
//             </div>
//             <div className="border border-boardWhite bg-grey2 text-black p-2 text-center font-bold">
//               老師
//             </div>

//             {displayData.length === 0 ? (
//               <div className="col-span-8 text-center p-4 bg-white border border-boardWhite">
//                 沒有數據
//               </div>
//             ) : (
//               displayData.map((task) => (
//                 <Link
//                   key={task.id}
//                   href={`/user/${UserId}/taskLists/${task.id}`}
//                   className="contents"
//                 >
//                   <div className="border border-boardWhite bg-white p-2 text-center">
//                     {task.School_name.join(", ")}
//                   </div>
//                   <div className="border border-boardWhite bg-white p-2 text-center">
//                     {task.task_title}
//                   </div>
//                   <div className="border border-boardWhite bg-white p-2 text-center">
//                     {task.task_subject}
//                   </div>
//                   <div className="border border-boardWhite bg-white p-2 text-center">
//                     {task.task_code}
//                   </div>
//                   <div className="border border-boardWhite bg-white p-2 text-center">
//                     {task.task_area}
//                   </div>
//                   <div className="border border-boardWhite bg-white p-2 text-center">
//                     {task.showprice ? task.task_price : "價格隱藏"}
//                   </div>
//                   <div className="border border-boardWhite bg-white p-2 text-center">
//                     {task.job.length}
//                   </div>
//                   <div className="border border-boardWhite bg-white p-2 text-center">
//                     {task.teacher || "無"}
//                   </div>
//                 </Link>
//               ))
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskboardListPage;

"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";

interface Task {
  id: string;
  task_title: string;
  task_subject: string;
  task_code: string;
  task_area: string;
  School_name: string[];
  task_price: number;
  showprice: boolean;
  job: { id: string }[];
  teacher?: string;
}

export default function TaskboardListPage() {
  const { data: session, status } = useSession();
  const params = useParams();
  const UserId = params?.id as string;

  const [taskLists, setTaskLists] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Task[]>([]);
  const [searchField, setSearchField] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`/api/Task_Lists`, { cache: "no-store" });
        if (!res.ok) throw new Error(`無法取得數據: ${res.status}`);
        const data: Task[] = await res.json();
        setTaskLists(data as Task[] || []);
        setError("");
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "未知錯誤");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/Task_Lists_search?query=${encodeURIComponent(searchQuery)}&field=${encodeURIComponent(searchField)}`,
        { cache: "no-store" }
      );
      if (!response.ok) throw new Error(`搜尋失敗: ${response.status}`);
      const data: Task[] = await response.json();
      setSearchResults(data as Task[] || []);
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "搜尋失敗");
    }
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#d7e1e9] to-[#d7e1e9] bg-opacity-60 font-noto-sans-tc">
        <Navbar session={null} />
        <div className="ml-[50px] p-4 text-[#1D475D] text-sm text-center">
          載入中...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#d7e1e9] to-[#d7e1e9] bg-opacity-60 font-noto-sans-tc">
        <Navbar session={session} />
        <div className="ml-[50px] p-4 text-[#FF0000] text-sm text-center">
          錯誤: {error}
        </div>
      </div>
    );
  }

  if (!UserId) {
    return (
      <div className="min-h-screen bg-gradient-to-r from-[#d7e1e9] to-[#d7e1e9] bg-opacity-60 font-noto-sans-tc">
        <Navbar session={session} />
        <div className="ml-[50px] p-4 text-[#1D475D] text-sm text-center">
          無效的用戶 ID
        </div>
      </div>
    );
  }

  const displayData = searchResults.length > 0 ? searchResults : taskLists;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#d7e1e9] to-[#d7e1e9] bg-opacity-60 font-noto-sans-tc">
      <Navbar session={session} />
      <div className="ml-[50px] w-[95%] p-4 text-sm">
        <Link
          href={`/user/${UserId}/`}
          className="text-[#0071AC] hover:text-black transition-all duration-300 mb-4 inline-block"
        >
          返回首頁
        </Link>

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
              <option value="task_title">任務標題</option>
              <option value="task_subject">任務科目</option>
              <option value="task_code">任務編號</option>
              <option value="task_area">任務地區</option>
              <option value="task_price">任務價錢</option>
              <option value="School_name">學校名稱</option>
            </select>
            <Button
              type="submit"
              className="bg-[#0071AC] text-white px-4 py-2 rounded-md text-sm hover:bg-black transition-all duration-300"
            >
              搜尋
            </Button>
          </div>
        </form>

        <div className="flex items-center py-2 gap-2">

        </div>

        <div className="w-full overflow-x-auto">
          <div className="grid grid-cols-[200px_1fr_1fr_1fr_1fr_1fr_1fr_1fr] text-sm min-w-[800px]">
            <div className="border border-[rgba(255,255,255,0.5)] bg-gray-200 text-[#1D475D] p-2 text-center font-bold">
              學校名稱
            </div>
            <div className="border border-[rgba(255,255,255,0.5)] bg-gray-200 text-[#1D475D] p-2 text-center font-bold">
              任務標題
            </div>
            <div className="border border-[rgba(255,255,255,0.5)] bg-gray-200 text-[#1D475D] p-2 text-center font-bold">
              任務科目
            </div>
            <div className="border border-[rgba(255,255,255,0.5)] bg-gray-200 text-[#1D475D] p-2 text-center font-bold">
              任務編號
            </div>
            <div className="border border-[rgba(255,255,255,0.5)] bg-gray-200 text-[#1D475D] p-2 text-center font-bold">
              地區
            </div>
            <div className="border border-[rgba(255,255,255,0.5)] bg-gray-200 text-[#1D475D] p-2 text-center font-bold">
              價錢
            </div>
            <div className="border border-[rgba(255,255,255,0.5)] bg-gray-200 text-[#1D475D] p-2 text-center font-bold">
              工作數量
            </div>
            <div className="border border-[rgba(255,255,255,0.5)] bg-gray-200 text-[#1D475D] p-2 text-center font-bold">
              老師
            </div>

            {displayData.length === 0 ? (
              <div className="col-span-8 text-center p-4 bg-white border border-[rgba(255,255,255,0.5)] text-[#1D475D]">
                沒有數據
              </div>
            ) : (
              displayData.map((task) => (
                <Link
                  key={task.id}
                  href={`/user/${UserId}/taskLists/${task.id}`}
                  className="contents"
                >
                  <div className="border border-[rgba(255,255,255,0.5)] bg-white p-2 text-center text-[#1D475D]">
                    {task.School_name.join(", ") || "無"}
                  </div>
                  <div className="border border-[rgba(255,255,255,0.5)] bg-white p-2 text-center text-[#1D475D]">
                    {task.task_title || "無"}
                  </div>
                  <div className="border border-[rgba(255,255,255,0.5)] bg-white p-2 text-center text-[#1D475D]">
                    {task.task_subject || "無"}
                  </div>
                  <div className="border border-[rgba(255,255,255,0.5)] bg-white p-2 text-center text-[#1D475D]">
                    {task.task_code || "無"}
                  </div>
                  <div className="border border-[rgba(255,255,255,0.5)] bg-white p-2 text-center text-[#1D475D]">
                    {task.task_area || "無"}
                  </div>
                  <div className="border border-[rgba(255,255,255,0.5)] bg-white p-2 text-center text-[#1D475D]">
                    {task.showprice ? task.task_price : "價格隱藏"}
                  </div>
                  <div className="border border-[rgba(255,255,255,0.5)] bg-white p-2 text-center text-[#1D475D]">
                    {task.job.length}
                  </div>
                  <div className="border border-[rgba(255,255,255,0.5)] bg-white p-2 text-center text-[#1D475D]">
                    {task.teacher || "無"}
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}