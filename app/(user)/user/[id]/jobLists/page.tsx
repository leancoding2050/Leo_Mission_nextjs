"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import useSWR from "swr";
import { useState } from "react";

interface Job {
  id: string;
  job_code: string;
  job_school_name: string;
  job_subject: string;
  job_area: string[];
  job_time: string;
  job_day: string;
  job_in_task: boolean;
}

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("獲取工作列表失敗");
  return res.json();
};

const JobListsPage = () => {
  const param = useParams();
  const UserId = param?.id as string;

  const [searchQuery, setSearchQuery] = useState("");
  const [searchField, setSearchField] = useState("all");
  const [searchResults, setSearchResults] = useState<Job[]>([]);

  // 使用 SWR 獲取工作列表
  const { data: GetJobLists, error } = useSWR<Job[]>(
    `http://127.0.0.1:8000/api/job/lists/`,
    fetcher,
    { revalidateOnFocus: false }
  );

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/job/lists/search?query=${encodeURIComponent(
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

  if (error) return <div className="text-red-500">無法載入工作列表</div>;
  if (!GetJobLists) return <div>載入中...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">工作列表</h1>

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
          <option value="job_code">任務編號</option>
          <option value="job_school_name">學校名稱</option>
          <option value="job_subject">科目</option>
          <option value="job_area">地區</option>
          <option value="job_time">時間</option>
          <option value="job_day">日期</option>
        </select>
        <Button onClick={handleSearch}>搜索</Button>
      </div>

      {/* 搜尋結果 */}
      {searchResults.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">搜尋結果</h2>
          {searchResults.map((job) => (
            <Link
              href={`/user/${UserId}/jobLists/${job.id}`}
              key={job.id}
            >
              <div className="p-4 mb-2 border rounded hover:bg-gray-100">
                <p>任務編號: {job.job_code}</p>
                <p>學校名稱: {job.job_school_name}</p>
                <p>科目: {job.job_subject}</p>
                <p>地區: {job.job_area.join(", ")}</p>
                <p>時間: {job.job_time}</p>
                <p>日期: {job.job_day.split("T")[0]}</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* 所有工作列表 */}
      <h2 className="text-xl font-semibold mb-2">我的工作</h2>
      {GetJobLists.filter((d) => !d.job_in_task).length === 0 && (
        <p>無工作記錄</p>
      )}
      {GetJobLists.filter((d) => !d.job_in_task).map((data) => (
        <Link
          href={`/user/${UserId}/jobLists/${data.id}`}
          key={data.id}
        >
          <div className="p-4 mb-2 border rounded hover:bg-gray-100">
            <p>任務編號: {data.job_code}</p>
            <p>學校名稱: {data.job_school_name}</p>
            <p>科目: {data.job_subject}</p>
            <p>地區: {data.job_area.join(", ")}</p>
            <p>時間: {data.job_time}</p>
            <p>日期: {data.job_day.split("T")[0]}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default JobListsPage;