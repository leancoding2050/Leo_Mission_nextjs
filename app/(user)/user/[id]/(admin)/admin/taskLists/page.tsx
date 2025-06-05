// "use client";

// import { Button } from "@/components/ui/button";
// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// const TaskLists = () => {
//     const session = useSession();
//     const userId = session.data?.user?.id;
//     const [GettaskLists, setGetTaskLists] = useState([]);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [searchResults, setSearchResults] = useState([]);
//     const [searchField, setSearchField] = useState("all");
//     const [sortBy, setSortBy] = useState<"task_admin_createdAt" | "job_day" | null>(null);
//     const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

//     useEffect(() => {
//         const fetchTaskListsData = async () => {
//             const res = await fetch(`/api/Task_Lists`);
//             const data = await res.json();
//             if (data.message === "沒有數據") {
//                 setGetTaskLists([]);
//             } else {
//                 setGetTaskLists(data);
//             }
//         };
//         fetchTaskListsData();
//     }, []);

//     // 排序函數
//     const sortData = (data) => {
//         return [...data].sort((a, b) => {
//             if (sortBy === "task_admin_createdAt") {
//                 const dateA = new Date(a.task_admin_createdAt).getTime();
//                 const dateB = new Date(b.task_admin_createdAt).getTime();
//                 return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
//             } else if (sortBy === "job_day") {
//                 const dateA = a.job.length > 0 ? new Date(a.job[0].job_day).getTime() : 0;
//                 const dateB = b.job.length > 0 ? new Date(b.job[0].job_day).getTime() : 0;
//                 return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
//             }
//             return 0; // 無排序時保持原序
//         });
//     };

//     // 處理排序按鈕點擊
//     const handleSort = (field: "task_admin_createdAt" | "job_day") => {
//         if (sortBy === field) {
//             setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
//         } else {
//             setSortBy(field);
//             setSortOrder("desc");
//         }
//     };

//     // 獲取排序後的數據
//     const getSortedData = (data) => {
//         if (!sortBy) return data;
//         return sortData(data);
//     };

//     // 搜索功能
//     const handleSearch = async () => {
//         try {
//             const response = await fetch(`/api/Task_Lists_search?query=${searchQuery}&field=${searchField}`);
//             const data = await response.json();
//             if (data.message === "沒有數據") {
//                 setSearchResults([]);
//             } else {
//                 setSearchResults(data);
//             }
//         } catch (error) {
//             console.error("搜尋失敗:", error);
//         }
//     };

//     // 渲染任務列表的通用函數
//     const renderTaskList = (data) => {
//         return getSortedData(data)?.map((task) => (
//             <div key={task.id}>
//                 <Link href={`/user/${userId}/admin/taskLists/${task.id}`}>
//                     TaskTitle: {task.task_title}
//                     <br />
//                     Task主題: {task.task_subject}
//                     <br />
//                     TaskCode: {task.task_code}
//                     <br />
//                     Taskarea: {task.task_area}
//                     <br />
//                     schoolName: {task.School_name.join(", ")}
//                     <br />
//                     價錢: {task.task_price}
//                     <br />
//                     是否完成: {task.completed ? "完成" : "未完成"}
//                     <br />
//                     是否公開: {task.task_public ? "公開" : "不公開"}
//                     <br />
//                     是否公開價錢: {task.showprice ? "公開" : "不公開"}
//                     <br />
//                     工作數量: {task.job.length}
//                     <br />
//                     老師: {task.teacher || "無"}
//                     <br />
//                     {task.job.length > 0 && (
//                         <>
//                             第一個工作日期: {new Date(task.job[0].job_day).toLocaleDateString()}
//                             <br />
//                         </>
//                     )}
//                 </Link>
//             </div>
//         ));
//     };

//     return (
//         <>
//             <Link href={`/user/${userId}/admin`}> Admin主頁 </Link>
//             <div>
//                 <Link href={`/user/${userId}/admin/taskLists/createtask`}>CreateTask</Link>
//             </div>
//             <br />
//             <h1>TaskLists</h1>

//             <div className="sort-buttons">
//                 <Button
//                     onClick={() => handleSort("task_admin_createdAt")}
//                     variant={sortBy === "task_admin_createdAt" ? "default" : "outline"}
//                 >
//                     建立時間排序 {sortBy === "task_admin_createdAt" && `(${sortOrder === "asc" ? "↑" : "↓"})`}
//                 </Button>
//                 <Button
//                     onClick={() => handleSort("job_day")}
//                     variant={sortBy === "job_day" ? "default" : "outline"}
//                 >
//                     工作時間排序 {sortBy === "job_day" && `(${sortOrder === "asc" ? "↑" : "↓"})`}
//                 </Button>
//             </div>

//             <div className="flex items-center space-x-2">
//                 <input
//                     type="text"
//                     placeholder="輸入搜索內容..."
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     className="flex-1"
//                 />
//                 <select
//                     value={searchField}
//                     onChange={(e) => setSearchField(e.target.value)}
//                 >
//                     <option value="all">所有字段</option>
//                     <option value="task_title">task_標題</option>
//                     <option value="task_subject">task_科目</option>
//                     <option value="task_contect">task_內容</option>
//                     <option value="task_code">task_code</option>
//                     <option value="task_address">task地址</option>
//                     <option value="task_area">task地區</option>
//                     <option value="task_price">task_價錢</option>
//                     <option value="task_apply">task_申請狀態</option>
//                     <option value="showprice">task_顯示價錢</option>
//                     <option value="School_name">學校名</option>
//                     <option value="completed">是否完成</option>
//                     <option value="task_public">是否公開</option>
//                     <option value="teacher">老師</option>
//                 </select>
//                 <Button onClick={handleSearch}>搜索</Button>
//             </div>

//             {/* 顯示搜索結果 */}
//             {searchResults.length > 0 ? (
//                 <>
//                     <p>搜索結果</p>
//                     {renderTaskList(searchResults)}
//                 </>
//             ) : searchResults.length === 0 && searchQuery ? (
//                 <p>沒有搜索結果</p>
//             ) : null}

//             {/* 顯示初始數據 */}
//             {GettaskLists.length === 0 ? (
//                 <p>沒有數據</p>
//             ) : (
//                 renderTaskList(GettaskLists)
//             )}
//         </>
//     );
// };

// export default TaskLists;

// "use client";

// import { Button } from "@/components/ui/button";
// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// // 定義 Task 和 Job 類型，根據 Prisma 模型
// interface Job {
//   id: string;
//   job_day: string;
// }

// interface Task {
//   id: string;
//   task_title: string;
//   task_subject: string;
//   task_code: string;
//   task_area: string;
//   School_name: string[];
//   task_price: number;
//   completed: boolean;
//   task_public: boolean;
//   showprice: boolean;
//   teacher: string | null;
//   job: Job[];
//   task_admin_createdAt: string;
// }

// const TaskLists = () => {
//   const session = useSession();
//   const userId = session.data?.user?.id;
//   const [getTaskLists, setGetTaskLists] = useState<Task[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<Task[]>([]);
//   const [searchField, setSearchField] = useState("all");
//   const [sortBy, setSortBy] = useState<"task_admin_createdAt" | "job_day" | null>(null);
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchTaskListsData = async () => {
//       try {
//         const res = await fetch(`/api/Task_Lists`);
//         if (!res.ok) throw new Error(`請求失敗: ${res.status}`);
//         const data: Task[] | { message: string } = await res.json();
//         if ("message" in data && data.message === "沒有數據") {
//           setGetTaskLists([]);
//         } else {
//           setGetTaskLists(data as Task[]);
//         }
//         setError("");
//       } catch (err: unknown) {
//         setError(err instanceof Error ? err.message : "未知錯誤");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchTaskListsData();
//   }, []);

//   // 排序函數
//   const sortData = (data: Task[]): Task[] => {
//     if (!sortBy) return data;
//     return [...data].sort((a, b) => {
//       if (sortBy === "task_admin_createdAt") {
//         const dateA = new Date(a.task_admin_createdAt).getTime();
//         const dateB = new Date(b.task_admin_createdAt).getTime();
//         return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
//       } else if (sortBy === "job_day") {
//         const dateA = a.job.length > 0 ? new Date(a.job[0].job_day).getTime() : Infinity;
//         const dateB = b.job.length > 0 ? new Date(b.job[0].job_day).getTime() : Infinity;
//         return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
//       }
//       return 0;
//     });
//   };

//   // 處理排序按鈕點擊
//   const handleSort = (field: "task_admin_createdAt" | "job_day") => {
//     if (sortBy === field) {
//       setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
//     } else {
//       setSortBy(field);
//       setSortOrder("desc");
//     }
//   };

//   // 獲取排序後的數據
//   const getSortedData = (data: Task[]): Task[] => {
//     return sortData(data);
//   };

//   // 搜索功能
//   const handleSearch = async () => {
//     try {
//       const response = await fetch(`/api/Task_Lists_search?query=${searchQuery}&field=${searchField}`);
//       if (!response.ok) throw new Error(`搜索失敗: ${response.status}`);
//       const data: Task[] | { message: string } = await response.json();
//       if ("message" in data && data.message === "沒有數據") {
//         setSearchResults([]);
//       } else {
//         setSearchResults(data as Task[]);
//       }
//       setError("");
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "搜索失敗");
//     }
//   };

//   // 渲染任務列表
//   const renderTaskList = (data: Task[]) => {
//     return getSortedData(data).map((task) => (
//       <div key={task.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
//         <Link href={`/user/${userId}/admin/taskLists/${task.id}`}>
//           <p>任務標題: {task.task_title}</p>
//           <p>任務主題: {task.task_subject}</p>
//           <p>任務編號: {task.task_code}</p>
//           <p>任務地區: {task.task_area}</p>
//           <p>學校名稱: {task.School_name.length > 0 ? task.School_name.join(", ") : "無"}</p>
//           <p>價格: {task.task_price}</p>
//           <p>是否完成: {task.completed ? "完成" : "未完成"}</p>
//           <p>是否公開: {task.task_public ? "公開" : "不公開"}</p>
//           <p>是否公開價格: {task.showprice ? "公開" : "不公開"}</p>
//           <p>工作數量: {task.job.length}</p>
//           <p>老師: {task.teacher ?? "無"}</p>
//           {task.job.length > 0 && (
//             <p>第一個工作日期: {new Date(task.job[0].job_day).toLocaleDateString()}</p>
//           )}
//         </Link>
//       </div>
//     ));
//   };

//   if (isLoading) return <div className="p-4 text-gray-500">正在加載...</div>;
//   if (error) return <div className="p-4 text-red-500">錯誤: {error}</div>;

//   return (
//     <div className="p-4">
//       <Link href={`/user/${userId}/admin`} className="text-blue-500 hover:underline">
//         Admin主頁
//       </Link>
//       <div className="mt-2">
//         <Link href={`/user/${userId}/admin/taskLists/createtask`} className="text-blue-500 hover:underline">
//           創建任務
//         </Link>
//       </div>
//       <h1 className="text-xl font-bold mt-4">任務列表</h1>

//       <div className="sort-buttons mt-4 flex space-x-2">
//         <Button
//           onClick={() => handleSort("task_admin_createdAt")}
//           variant={sortBy === "task_admin_createdAt" ? "default" : "outline"}
//         >
//           建立時間排序 {sortBy === "task_admin_createdAt" && `(${sortOrder === "asc" ? "↑" : "↓"})`}
//         </Button>
//         <Button
//           onClick={() => handleSort("job_day")}
//           variant={sortBy === "job_day" ? "default" : "outline"}
//         >
//           工作時間排序 {sortBy === "job_day" && `(${sortOrder === "asc" ? "↑" : "↓"})`}
//         </Button>
//       </div>

//       <div className="flex items-center space-x-2 mt-4">
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
//           <option value="task_title">任務標題</option>
//           <option value="task_subject">任務科目</option>
//           <option value="task_contect">任務內容</option>
//           <option value="task_code">任務編號</option>
//           <option value="task_address">任務地址</option>
//           <option value="task_area">任務地區</option>
//           <option value="task_price">任務價格</option>
//           <option value="task_apply">申請狀態</option>
//           <option value="showprice">顯示價格</option>
//           <option value="School_name">學校名稱</option>
//           <option value="completed">是否完成</option>
//           <option value="task_public">是否公開</option>
//           <option value="teacher">老師</option>
//         </select>
//         <Button onClick={handleSearch}>搜索</Button>
//       </div>

//       {searchResults.length > 0 ? (
//         <div className="mt-4">
//           <p className="font-semibold">搜索結果</p>
//           {renderTaskList(searchResults)}
//         </div>
//       ) : searchResults.length === 0 && searchQuery ? (
//         <p className="mt-4 text-gray-500">沒有搜索結果</p>
//       ) : getTaskLists.length === 0 ? (
//         <p className="mt-4 text-gray-500">沒有數據</p>
//       ) : (
//         <div className="mt-4">{renderTaskList(getTaskLists)}</div>
//       )}
//     </div>
//   );
// };

// export default TaskLists;


"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Job {
  id: string;
  job_day: string;
}

interface Task {
  id: string;
  task_title: string;
  task_subject: string;
  task_code: string;
  task_area: string;
  School_name: string[];
  task_price: number;
  completed: boolean;
  task_public: boolean;
  showprice: boolean;
  teacher: string | null;
  job: Job[];
  task_admin_createdAt: string;
}

export default function TaskLists() {
  const session = useSession();
  const userId = session.data?.user?.id;

  const [getTaskLists, setGetTaskLists] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Task[]>([]);
  const [searchField, setSearchField] = useState("all");
  const [sortBy, setSortBy] = useState<"task_admin_createdAt" | "job_day" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTaskListsData = async () => {
      try {
        const res = await fetch(`/api/Task_Lists`, { cache: "no-store" });
        if (!res.ok) throw new Error(`請求失敗: ${res.status}`);
        const data: Task[] | { message: string } = await res.json();
        if ("message" in data && data.message === "沒有數據") {
          setGetTaskLists([]);
        } else {
          setGetTaskLists(data as Task[]);
        }
        setError("");
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "未知錯誤");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTaskListsData();
  }, []);

  const sortData = (data: Task[]): Task[] => {
    if (!sortBy) return data;
    return [...data].sort((a, b) => {
      if (sortBy === "task_admin_createdAt") {
        const dateA = new Date(a.task_admin_createdAt).getTime();
        const dateB = new Date(b.task_admin_createdAt).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      } else if (sortBy === "job_day") {
        const dateA = a.job.length > 0 ? new Date(a.job[0].job_day).getTime() : Infinity;
        const dateB = b.job.length > 0 ? new Date(b.job[0].job_day).getTime() : Infinity;
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      }
      return 0;
    });
  };

  const handleSort = (field: "task_admin_createdAt" | "job_day") => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const getSortedData = (data: Task[]): Task[] => {
    return sortData(data);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `/api/Task_Lists_search?query=${encodeURIComponent(searchQuery)}&field=${encodeURIComponent(searchField)}`
      );
      if (!response.ok) throw new Error(`搜索失敗: ${response.status}`);
      const data: Task[] | { message: string } = await response.json();
      if ("message" in data && data.message === "沒有數據") {
        setSearchResults([]);
      } else {
        setSearchResults(data as Task[]);
      }
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "搜索失敗");
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) throw new Error("無效日期");
      return date.toLocaleDateString("zh-TW", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\./g, "-");
    } catch {
      return "N/A";
    }
  };

  const renderTaskList = (data: Task[]) => {
    return getSortedData(data).map((task) => (
      <Link
        key={task.id}
        href={`/user/${userId}/admin/taskLists/${task.id}`}
        className="block p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
      >
        <p className="text-[#1D475D]">任務標題: {task.task_title}</p>
        <p className="text-[#1D475D]">任務主題: {task.task_subject}</p>
        <p className="text-[#1D475D]">任務編號: {task.task_code}</p>
        <p className="text-[#1D475D]">任務地區: {task.task_area}</p>
        <p className="text-[#1D475D]">
          學校名稱: {task.School_name.length > 0 ? task.School_name.join(", ") : "無"}
        </p>
        <p className="text-[#1D475D]">價格: {task.task_price}</p>
        <p className="text-[#1D475D]">是否完成: {task.completed ? "完成" : "未完成"}</p>
        <p className="text-[#1D475D]">是否公開: {task.task_public ? "公開" : "不公開"}</p>
        <p className="text-[#1D475D]">是否公開價格: {task.showprice ? "公開" : "不公開"}</p>
        <p className="text-[#1D475D]">工作數量: {task.job.length}</p>
        <p className="text-[#1D475D]">老師: {task.teacher ?? "無"}</p>
        {task.job.length > 0 && (
          <p className="text-[#1D475D]">第一個工作日期: {formatDate(task.job[0].job_day)}</p>
        )}
      </Link>
    ));
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
          <Link
            href={`/user/${userId}/admin/taskLists/createtask`}
            className="block text-[#0071AC] hover:text-black transition-all duration-300"
          >
            創建任務
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-[#1D475D] mt-4">任務列表</h1>

        <div className="flex items-center gap-2 py-2">
          <Button
            onClick={() => handleSort("task_admin_createdAt")}
            className={`${
              sortBy === "task_admin_createdAt" ? "bg-[#0071AC] text-white" : "bg-gray-200 text-black"
            } px-4 py-2 rounded-md text-sm hover:bg-black hover:text-white transition-all duration-300`}
          >
            建立時間排序 {sortBy === "task_admin_createdAt" && `(${sortOrder === "asc" ? "↑" : "↓"})`}
          </Button>
          <Button
            onClick={() => handleSort("job_day")}
            className={`${
              sortBy === "job_day" ? "bg-[#0071AC] text-white" : "bg-gray-200 text-black"
            } px-4 py-2 rounded-md text-sm hover:bg-black hover:text-white transition-all duration-300`}
          >
            工作時間排序 {sortBy === "job_day" && `(${sortOrder === "asc" ? "↑" : "↓"})`}
          </Button>
        </div>

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
            <option value="task_title">任務標題</option>
            <option value="task_subject">任務科目</option>
            <option value="task_contect">任務內容</option>
            <option value="task_code">任務編號</option>
            <option value="task_address">任務地址</option>
            <option value="task_area">任務地區</option>
            <option value="task_price">任務價格</option>
            <option value="task_apply">申請狀態</option>
            <option value="showprice">顯示價格</option>
            <option value="School_name">學校名稱</option>
            <option value="completed">是否完成</option>
            <option value="task_public">是否公開</option>
            <option value="teacher">老師</option>
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
            <p className="font-semibold text-[#1D475D]">搜索結果</p>
            {renderTaskList(searchResults)}
          </div>
        ) : searchResults.length === 0 && searchQuery ? (
          <p className="mt-4 text-[#1D475D]">沒有搜索結果</p>
        ) : getTaskLists.length === 0 ? (
          <p className="mt-4 text-[#1D475D]">沒有數據</p>
        ) : (
          <div className="mt-4 space-y-4">{renderTaskList(getTaskLists)}</div>
        )}
      </div>
    </div>
  );
}