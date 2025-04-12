"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const TaskLists = () => {
    const session = useSession();
    const userId = session.data?.user?.id;
    const [GettaskLists, setGetTaskLists] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchField, setSearchField] = useState("all");
    const [sortBy, setSortBy] = useState<"task_admin_createdAt" | "job_day" | null>(null);
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

    useEffect(() => {
        const fetchTaskListsData = async () => {
            const res = await fetch(`/api/Task_Lists`);
            const data = await res.json();
            if (data.message === "沒有數據") {
                setGetTaskLists([]);
            } else {
                setGetTaskLists(data);
            }
        };
        fetchTaskListsData();
    }, []);

    // 排序函數
    const sortData = (data: any[]) => {
        return [...data].sort((a, b) => {
            if (sortBy === "task_admin_createdAt") {
                const dateA = new Date(a.task_admin_createdAt).getTime();
                const dateB = new Date(b.task_admin_createdAt).getTime();
                return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
            } else if (sortBy === "job_day") {
                const dateA = a.job.length > 0 ? new Date(a.job[0].job_day).getTime() : 0;
                const dateB = b.job.length > 0 ? new Date(b.job[0].job_day).getTime() : 0;
                return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
            }
            return 0; // 無排序時保持原序
        });
    };

    // 處理排序按鈕點擊
    const handleSort = (field: "task_admin_createdAt" | "job_day") => {
        if (sortBy === field) {
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortBy(field);
            setSortOrder("desc");
        }
    };

    // 獲取排序後的數據
    const getSortedData = (data: any[]) => {
        if (!sortBy) return data;
        return sortData(data);
    };

    // 搜索功能
    const handleSearch = async () => {
        try {
            const response = await fetch(`/api/Task_Lists_search?query=${searchQuery}&field=${searchField}`);
            const data = await response.json();
            if (data.message === "沒有數據") {
                setSearchResults([]);
            } else {
                setSearchResults(data);
            }
        } catch (error) {
            console.error("搜尋失敗:", error);
        }
    };

    // 渲染任務列表的通用函數
    const renderTaskList = (data: any[]) => {
        return getSortedData(data)?.map((task: any) => (
            <div key={task.id}>
                <Link href={`/user/${userId}/admin/taskLists/${task.id}`}>
                    TaskTitle: {task.task_title}
                    <br />
                    Task主題: {task.task_subject}
                    <br />
                    TaskCode: {task.task_code}
                    <br />
                    Taskarea: {task.task_area}
                    <br />
                    schoolName: {task.School_name.join(", ")}
                    <br />
                    價錢: {task.task_price}
                    <br />
                    是否完成: {task.completed ? "完成" : "未完成"}
                    <br />
                    是否公開: {task.task_public ? "公開" : "不公開"}
                    <br />
                    是否公開價錢: {task.showprice ? "公開" : "不公開"}
                    <br />
                    工作數量: {task.job.length}
                    <br />
                    老師: {task.teacher || "無"}
                    <br />
                    {task.job.length > 0 && (
                        <>
                            第一個工作日期: {new Date(task.job[0].job_day).toLocaleDateString()}
                            <br />
                        </>
                    )}
                </Link>
            </div>
        ));
    };

    return (
        <>
            <Link href={`/user/${userId}/admin`}> Admin主頁 </Link>
            <div>
                <Link href={`/user/${userId}/admin/taskLists/createtask`}>CreateTask</Link>
            </div>
            <br />
            <h1>TaskLists</h1>

            <div className="sort-buttons">
                <Button
                    onClick={() => handleSort("task_admin_createdAt")}
                    variant={sortBy === "task_admin_createdAt" ? "default" : "outline"}
                >
                    建立時間排序 {sortBy === "task_admin_createdAt" && `(${sortOrder === "asc" ? "↑" : "↓"})`}
                </Button>
                <Button
                    onClick={() => handleSort("job_day")}
                    variant={sortBy === "job_day" ? "default" : "outline"}
                >
                    工作時間排序 {sortBy === "job_day" && `(${sortOrder === "asc" ? "↑" : "↓"})`}
                </Button>
            </div>

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
                    <option value="task_apply">task_申請狀態</option>
                    <option value="showprice">task_顯示價錢</option>
                    <option value="School_name">學校名</option>
                    <option value="completed">是否完成</option>
                    <option value="task_public">是否公開</option>
                    <option value="teacher">老師</option>
                </select>
                <Button onClick={handleSearch}>搜索</Button>
            </div>

            {/* 顯示搜索結果 */}
            {searchResults.length > 0 ? (
                <>
                    <p>搜索結果</p>
                    {renderTaskList(searchResults)}
                </>
            ) : searchResults.length === 0 && searchQuery ? (
                <p>沒有搜索結果</p>
            ) : null}

            {/* 顯示初始數據 */}
            {GettaskLists.length === 0 ? (
                <p>沒有數據</p>
            ) : (
                renderTaskList(GettaskLists)
            )}
        </>
    );
};

export default TaskLists;