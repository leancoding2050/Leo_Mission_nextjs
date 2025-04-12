"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
const JobList = () =>{
  const param = useParams();
  const userId = param.id as string;
  console.log(param)

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

    getUserListsDatabyId(userId)
  },[userId])

  console.log(GetUserListsDatabyId)

  const JobData = GetUserListsDatabyId[0]?.job ;

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const response = await fetch(
        `/api/Job_Lists_search_User_by_id?query=${searchQuery}&field=${searchField}&userId=${userId}`
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

  console.log("searchResults : ", searchResults);

  return (
    <>
            <Link href={`/user/${userId}/profiles`}>
            上一頁
            </Link>
      <div>JobList</div>
  
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
          <option value="job_code">任務編號</option>
          <option value="job_school_name">學校名稱</option>
          <option value="job_subject">科目</option>
          <option value="job_area">地區</option>
          <option value="job_time_h">時間</option>
          <option value="job_day">日期</option>
        </select>
        <Button onClick={handleSearch}>搜索</Button>
      </div>
  
      {searchResults.length === 0 ? (
        <p>沒有數據</p>
      ) : (
        searchResults.map((job: any) => (
          <div key={job.id}>
            <p>任務編號:{job.job_code}</p>
            <p>時間:{job.job_time_h}</p>
            <p>日期:{job.job_day.split('T')[0]}</p>
            <p>學校名稱:{job.job_school_name}</p>
            <p>地區:{job.job_area}</p>
          </div>
        ))
      )}
  
      {JobData?.length === 0 ? (
        <p>沒有數據</p>
      ) : (
        JobData?.map((d: any) => (
          <Link href={`/user/${userId}/profiles/jobprogressLists/${d.id}`} key={d.id}>
            <div>
              <p>任務編號:{d.job_code}</p>
              <p>時間:{d.job_time_h}</p>
              <p>日期:{d.job_day.split('T')[0]}</p>
              <p>學校名稱:{d.job_school_name}</p>
              <p>地區:{d.job_area}</p>
            </div>
          </Link>
        ))
      )}
    </>
  );
}

export default JobList