// "use client";

// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// const TaskList =() => {
//   const param = useParams();
//   const userId = param.id as string;
//   console.log(userId)

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

//   const TaskData = GetUserListsDatabyId[0]?.task ;

//   console.log("TaskData :",TaskData)

//   const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
//     try {
//       const response = await fetch(
//         `/api/Task_Lists_search_User_by_id?query=${searchQuery}&field=${searchField}&userId=${userId}`
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

//   return (
//     <>
//             <Link href={`/user/${userId}/profiles`}>
//             上一頁
//             </Link>

//       <div>TaskList</div>

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
//           <option value="task_title">任務標題</option>
//           <option value="task_subject">任務科目</option>
//           <option value="task_contect">任務內容</option>
//           <option value="task_code">任務代碼</option>
//           <option value="task_area">任務地區</option>
//           <option value="teacher">老師</option>
//           <option value="School_name">學校名稱</option>
//         </select>
//         <Button onClick={handleSearch}>搜索</Button>
//       </div>

//       {searchResults.length === 0 ? (
//         <p>沒有數據</p>
//       ) : (
//         searchResults.map((task: any) => (
//           <div key={task.id}>
//             TASK
//             <Link href={`/user/${userId}/profiles/taskprogressLists/${task.id}`}>
//               {task.task_title} {task.task_subject}
//             </Link>
//           </div>
//         ))
//       )}

//       {TaskData?.length === 0 ? (
//         <p>沒有數據</p>
//       ) : (
//         TaskData?.map((d: any) => (
//           <div key={d.id}>
//             TASK
//             <Link href={`/user/${userId}/profiles/taskprogressLists/${d.id}`}>
//               {d.task_title} {d.task_subject}
//             </Link>
//           </div>
//         ))
//       )}
//     </>
//   );
// }

// export default TaskList

// "use client";

// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// interface Task {
//   id: string;
//   task_title: string;
//   task_subject: string;
//   task_contect: string;
//   task_code: string;
//   task_address: string;
//   task_area: string;
//   task_price: number;
//   task_apply: boolean;
//   showprice: boolean;
//   School_name: string[];
//   completed: boolean;
//   task_admin_createdAt: Date;
//   task_public: boolean;
//   teacher?: string;
// }

// interface User {
//   id: string;
//   task: Task[];
// }

// const TaskList = () => {
//   const param = useParams();
//   const userId = param.id as string;

//   const [GetUserListsDatabyId, setGetUserListsDatabyId] = useState<User[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<Task[]>([]);
//   const [searchField, setSearchField] = useState("all");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const getUserListsDatabyId = async (id: string) => {
//       setIsLoading(true);
//       try {
//         const res = await fetch(`/api/User_Lists_by_ID/${id}`);
//         if (!res.ok) {
//           throw new Error("無法獲取用戶數據");
//         }
//         const result = await res.json();
//         setGetUserListsDatabyId(result);
//       } catch (error) {
//         setError("無法載入用戶數據");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     getUserListsDatabyId(userId);
//   }, [userId]);

//   const performSearch = async () => {
//     setIsLoading(true);
//     setError(null);
//     try {
//       const response = await fetch(
//         `/api/Task_Lists_search_User_by_id?query=${searchQuery}&field=${searchField}&userId=${userId}`
//       );
//       if (!response.ok) {
//         throw new Error("搜索請求失敗");
//       }
//       const data = await response.json();
//       if (data.message === "沒有數據") {
//         setSearchResults([]);
//       } else {
//         setSearchResults(data);
//       }
//     } catch (error) {
//       console.error("搜尋失敗:", error);
//       setError("搜尋失敗，請稍後重試");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
//     performSearch();
//   };

//   if (isLoading) {
//     return <p>載入中...</p>;
//   }

//   if (error) {
//     return <p style={{ color: "red" }}>{error}</p>;
//   }

//   const TaskData = GetUserListsDatabyId[0]?.task || [];

//   return (
//     <>
//       <Link href={`/user/${userId}/profiles`}>上一頁</Link>

//       <div>TaskList</div>

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
//           <option value="task_title">任務標題</option>
//           <option value="task_subject">任務科目</option>
//           <option value="task_contect">任務內容</option>
//           <option value="task_code">任務代碼</option>
//           <option value="task_area">任務地區</option>
//           <option value="teacher">老師</option>
//           <option value="School_name">學校名稱</option>
//         </select>
//         <Button onClick={handleSearch}>搜索</Button>
//       </div>

//       {searchResults.length === 0 && TaskData.length === 0 ? (
//         <p>沒有數據</p>
//       ) : (
//         <>
//           {searchResults.length > 0 ? (
//             searchResults.map((task) => (
//               <div key={task.id}>
//                 TASK
//                 <Link href={`/user/${userId}/profiles/taskprogressLists/${task.id}`}>
//                   {task.task_title} {task.task_subject}
//                 </Link>
//               </div>
//             ))
//           ) : (
//             TaskData.map((d) => (
//               <div key={d.id}>
//                 TASK
//                 <Link href={`/user/${userId}/profiles/taskprogressLists/${d.id}`}>
//                   {d.task_title} {d.task_subject}
//                 </Link>
//               </div>
//             ))
//           )}
//         </>
//       )}
//     </>
//   );
// };

// export default TaskList;


"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Task {
  id: string;
  task_title: string;
  task_subject: string;
  task_contect: string;
  task_code: string;
  task_address: string;
  task_area: string;
  task_price: number;
  task_apply: boolean;
  showprice: boolean;
  School_name: string[];
  completed: boolean;
  task_admin_createdAt: Date;
  task_public: boolean;
  teacher?: string;
}

interface User {
  id: string;
  task: Task[];
}

const TaskList = () => {
  const param = useParams();
  const userId = param.id as string;

  const [GetUserListsDatabyId, setGetUserListsDatabyId] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Task[]>([]);
  const [searchField, setSearchField] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUserListsDatabyId = async (id: string) => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/User_Lists_by_ID/${id}`);
        if (!res.ok) {
          throw new Error("無法獲取用戶數據");
        }
        const result = await res.json();
        setGetUserListsDatabyId(result);
      } catch (_error) { // 將 error 改為 _error
        setError("無法載入用戶數據");
      } finally {
        setIsLoading(false);
      }
    };

    getUserListsDatabyId(userId);
  }, [userId]);

  const performSearch = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/Task_Lists_search_User_by_id?query=${searchQuery}&field=${searchField}&userId=${userId}`
      );
      if (!response.ok) {
        throw new Error("搜索請求失敗");
      }
      const data = await response.json();
      if (data.message === "沒有數據") {
        setSearchResults([]);
      } else {
        setSearchResults(data);
      }
    } catch (error) {
      console.error("搜尋失敗:", error);
      setError("搜尋失敗，請稍後重試");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => { // 移除 event 參數
    performSearch();
  };

  if (isLoading) {
    return <p>載入中...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  const TaskData = GetUserListsDatabyId[0]?.task || [];

  return (
    <>
      <Link href={`/user/${userId}/profiles`}>上一頁</Link>

      <div>TaskList</div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="輸入搜索內容..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
        >
          <option value="all">所有字段</option>
          <option value="task_title">任務標題</option>
          <option value="task_subject">任務科目</option>
          <option value="task_contect">任務內容</option>
          <option value="task_code">任務代碼</option>
          <option value="task_area">任務地區</option>
          <option value="teacher">老師</option>
          <option value="School_name">學校名稱</option>
        </select>
        <Button onClick={handleSearch}>搜索</Button>
      </div>

      {searchResults.length === 0 && TaskData.length === 0 ? (
        <p>沒有數據</p>
      ) : (
        <>
          {searchResults.length > 0 ? (
            searchResults.map((task) => (
              <div key={task.id}>
                TASK
                <Link href={`/user/${userId}/profiles/taskprogressLists/${task.id}`}>
                  {task.task_title} {task.task_subject}
                </Link>
              </div>
            ))
          ) : (
            TaskData.map((d) => (
              <div key={d.id}>
                TASK
                <Link href={`/user/${userId}/profiles/taskprogressLists/${d.id}`}>
                  {d.task_title} {d.task_subject}
                </Link>
              </div>
            ))
          )}
        </>
      )}
    </>
  );
};

export default TaskList;