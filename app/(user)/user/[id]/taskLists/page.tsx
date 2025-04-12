"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const TaskboardListPage = () => {
    const param = useParams();

    const UserId = param?.id as string;

    const [GettaskLists, setGetTaskLists] = useState([]);

    const [ searchQuery , setSearchQuery ] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [ searchField , setSearchField ] = useState("all");

    useEffect(() => {
        const fetchtasklistsdata = async () => {
            const res = await fetch(`/api/Task_Lists`);
            const data = await res.json();
            setGetTaskLists(data);
        };
        fetchtasklistsdata();
    }, []);

    console.log(GettaskLists);

    const handleSearch =  async (event: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const response = await fetch(`/api/Job_Lists_search_User?query=${searchQuery}&field=${searchField}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("搜尋失敗:", error)
      }
    };
    console.log("searchResults : ",searchResults)
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
                <select
                    value={searchField}
                    onChange={(e) => setSearchField(e.target.value)}
                >
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

            {/* 顯示搜索結果或 "沒有數據" */}
            {searchResults.length === 0 ? (
                <p>沒有數據 </p>
            ) : (
                searchResults?.map((task: any) => (
                    <div key={task.id}>
                        <p>結果</p>
                        <div key={task.id}>
                            <Link href={`/user/${UserId}/taskLists/${task.id}`}>
                                TaskTitle: {task.task_title}

                                <br />
                                Task主題: {task.task_subject}

                                <br />
                                TaskCode: {task.task_code}

                                <br />
                                Taskarea: {task.task_area}

                                <br />
                                schoolName: {task.School_name}

                                <br />
                                價錢: {task.showprice && task.task_price}

                                <br />
                                工作數量: {task.job.length}

                                <br />
                                老師: {task.teacher}
                            </Link>
                        </div>
                    </div>
                ))
            )}

            {/* 顯示初始數據或 "沒有數據" */}
            {GettaskLists.length === 0 ? (
                <p>沒有數據</p>
            ) : (
                GettaskLists?.map((d: any) => (
                    <div key={d.id}>
                        <Link href={`/user/${UserId}/taskLists/${d.id}`}>
                            TaskTitle: {d.task_title}
                            <br />
                            Task主題: {d.task_subject}
                            <br />
                            TaskCode: {d.task_code}
                            <br />
                            Taskarea: {d.task_area}
                            <br />
                            schoolName: {d.School_name}
                            <br />
                            價錢: {d.task_price}
                            <br />
                            <br />
                            工作數量: {d.job.length}
                            <br />
                            老師: {d.teacher}
                            <br />
                        </Link>
                    </div>
                ))
            )}

            <br />
        </>
      );
      

}

export default TaskboardListPage