"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Admin_TaskList_User =() => {
  const param = useParams();
  const userId = param.id as string;
  const targetuserId = param?.userListsid as string ;
  console.log(userId)

  const [ GetUserListsDatabyId , setGetUserListsDatabyId ] = useState([]) ;
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchField, setSearchField] = useState("all");  
  
  useEffect(()=>{
    const getUserListsDatabyId = async (id : string) => { 
      const res = await fetch(`/api/User_Lists_by_ID/${id}`) ;
      if(!res){
        throw new Error("斷線!")
      }
      const result = await res.json();
      setGetUserListsDatabyId(result);
    }

    getUserListsDatabyId(targetuserId)
  },[targetuserId])

  console.log(GetUserListsDatabyId)

  const TaskData = GetUserListsDatabyId[0]?.task ;

  console.log("TaskData :",TaskData)

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const response = await fetch(
        `/api/Task_Lists_search_User_by_id?query=${searchQuery}&field=${searchField}&userId=${userId}`
      );
      const data = await response.json();
      if (data.message === "沒有數據") {
        setSearchResults([]); // 设置为一个空数组，以便前端显示 "没有数据"
      } else {
        setSearchResults(data);
      }
    } catch (error) {
      console.error("搜尋失敗:", error);
    }
  };

  const nickname = GetUserListsDatabyId[0]?.nickname ;

  return (
    <>
          <Link href={`/user/${userId}/admin/userLists/${targetuserId}`}>
            上一頁
            </Link>
      <div>{nickname}的 TaskList</div>

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

      {searchResults.length === 0 ? (
        <p>沒有數據</p>
      ) : (
        searchResults.map((task: any) => (
          <div key={task.id}>
            TASK
            <Link href={`/user/${userId}/profiles/taskprogressLists/${task.id}`}>
              {task.task_title} {task.task_subject}
            </Link>
          </div>
        ))
      )}

      {TaskData?.length === 0 ? (
        <p>沒有數據</p>
      ) : (
        TaskData?.map((d: any) => (
          <div key={d.id}>
            TASK
            <Link href={`/user/${userId}/profiles/taskprogressLists/${d.id}`}>
              {d.task_title} {d.task_subject}
            </Link>
          </div>
        ))
      )}
    </>
  );
}

export default Admin_TaskList_User