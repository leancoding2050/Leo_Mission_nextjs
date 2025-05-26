"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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

const TaskboardListPage = () => {
  const param = useParams();
  const UserId = param?.id as string;

  const [GettaskLists, setGetTaskLists] = useState<Task[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Task[]>([]);
  const [searchField, setSearchField] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchtasklistsdata = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/Task_Lists`);
        if (!res.ok) {
          throw new Error("無法獲取任務數據");
        }
        const data = await res.json();
        setGetTaskLists(data);
      } catch (error) {
        setError("無法載入數據");
      } finally {
        setIsLoading(false);
      }
    };
    fetchtasklistsdata();
  }, []);

  const performSearch = async () => {
    try {
      const response = await fetch(`/api/Job_Lists_search_User?query=${searchQuery}&field=${searchField}`);
      if (!response.ok) {
        throw new Error("搜索請求失敗");
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("搜尋失敗:", error);
    }
  };

  const handleSearch = (event: React.MouseEvent<HTMLButtonElement>) => {
    performSearch();
  };

  if (isLoading) {
    return <div>載入中...</div>;
  }

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  if (!UserId) {
    return <div>無效的用戶 ID</div>;
  }

  const displayData = searchResults.length > 0 ? searchResults : GettaskLists;

  return (
    <>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="輸入搜索內容..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <select value={searchField} onChange={(e) => setSearchField(e.target.value)}>
          <option value="all">所有字段</option>
          <option value="task_title">task_標題</option>
          <option value="task_subject">task_科目</option>
          <option value="task_contect">task_內容</option>
          <option value="task_code">task_code</option>
          <option value="task_address">task地址</option>
          <option value="task_area">task地區</option>
          <option value="task_price">task_價錢</option>
          <option value="School_name">學校名</option>
        </select>
        <Button onClick={handleSearch}>搜索</Button>
      </div>

      {displayData.length === 0 ? (
        <p>沒有數據</p>
      ) : (
        displayData.map((task) => (
          <div key={task.id}>
            <p>結果</p>
            <Link href={`/user/${UserId}/taskLists/${task.id}`}>
              <p>TaskTitle: {task.task_title}</p>
              <p>Task主題: {task.task_subject}</p>
              <p>TaskCode: {task.task_code}</p>
              <p>Taskarea: {task.task_area}</p>
              <p>schoolName: {task.School_name.join(", ")}</p>
              <p>價錢: {task.showprice ? task.task_price : "價格隱藏"}</p>
              <p>工作數量: {task.job.length}</p>
              <p>老師: {task.teacher || "無"}</p>
            </Link>
          </div>
        ))
      )}
    </>
  );
};

export default TaskboardListPage;