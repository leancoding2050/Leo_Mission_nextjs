// "use client";

// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// const Admin_TaskList_User =() => {
//   const param = useParams();
//   const userId = param.id as string;
//   const targetuserId = param?.userListsid as string ;
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

//     getUserListsDatabyId(targetuserId)
//   },[targetuserId])

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

//   const nickname = GetUserListsDatabyId[0]?.nickname ;

//   return (
//     <>
//           <Link href={`/user/${userId}/admin/userLists/${targetuserId}`}>
//             上一頁
//             </Link>
//       <div>{nickname}的 TaskList</div>

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
//         searchResults.map((task) => (
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
//         TaskData?.map((d) => (
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

// export default Admin_TaskList_User

"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// 定義 User 和 Task 類型，根據 Prisma 模型
interface Task {
  id: string;
  task_title: string;
  task_subject: string;
  task_contect: string;
  task_code: string;
  task_area: string;
  teacher: string | null;
  School_name: string[];
}

interface User {
  id: string;
  nickname: string;
  task: Task[];
  isAdmin: boolean;
}

const AdminTaskListByUser = () => {
  const params = useParams();
  const adminId = params?.id as string | undefined;
  const targetUserId = params?.userListsid as string | undefined;

  const [getUserData, setGetUserData] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Task[]>([]);
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
        `/api/Task_Lists_search_User_by_id?query=${searchQuery}&field=${searchField}&userId=${targetUserId}`
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

  if (isLoading) return <div className="p-4 text-gray-500">正在加載...</div>;
  if (error) return <div className="p-4 text-red-500">錯誤: {error}</div>;
  if (!getUserData) return <div className="p-4 text-gray-500">無用戶數據</div>;

  const taskData = getUserData.task ?? [];

  return (
    <div className="p-4">
      <Link href={`/user/${adminId}/admin/userLists/taskprogressLists`} className="text-blue-500 hover:underline">
        上一頁
      </Link>
      <h1 className="text-xl font-bold mt-4">{getUserData.nickname} 的任務列表</h1>

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

      {searchResults.length > 0 ? (
        <div className="mt-4">
          <p className="font-semibold">搜索結果</p>
          {searchResults.map((task) => (
            <div key={task.id} className="p-4 border rounded-lg shadow-sm mt-2">
              <Link href={`/user/${adminId}/admin/userLists/taskprogressLists/${task.id}`}>
                <p>任務標題: {task.task_title}</p>
                <p>科目: {task.task_subject}</p>
                <p>內容: {task.task_contect}</p>
                <p>代碼: {task.task_code}</p>
                <p>地區: {task.task_area}</p>
                <p>老師: {task.teacher ?? "無"}</p>
                <p>學校名稱: {task.School_name?.join(", ") ?? "無"}</p>
              </Link>
            </div>
          ))}
        </div>
      ) : searchQuery ? (
        <p className="mt-4 text-gray-500">沒有搜索結果</p>
      ) : null}

      <div className="mt-4">
        <p className="font-semibold">所有任務</p>
        {taskData.length > 0 ? (
          taskData.map((task) => (
            <div key={task.id} className="p-4 border rounded-lg shadow-sm mt-2">
              <Link href={`/user/${adminId}/admin/userLists/taskprogressLists/${task.id}`}>
                <p>任務標題: {task.task_title}</p>
                <p>科目: {task.task_subject}</p>
                <p>內容: {task.task_contect}</p>
                <p>代碼: {task.task_code}</p>
                <p>地區: {task.task_area}</p>
                <p>老師: {task.teacher ?? "無"}</p>
                <p>學校名稱: {task.School_name?.join(", ") ?? "無"}</p>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500">沒有任務數據</p>
        )}
      </div>
    </div>
  );
};

export default AdminTaskListByUser;