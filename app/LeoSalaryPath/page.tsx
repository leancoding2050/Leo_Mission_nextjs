"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

const LeoSalaryPathPage = () => {
  const [ GetSalaryLists , setGetSalaryLists ] = useState([]);

  useEffect(() => {
    const fetchSalaryLists = async () => {
      const res = await fetch(`/api/Salary_Lists`) ;
      const data = await res.json() ;
      setGetSalaryLists(data) ;
    }
    fetchSalaryLists()
  },[])

  console.log("GetSalaryLists : ",GetSalaryLists)

    // 從數據中提取唯一的 username
    const uniqueUsernames = [...new Set(GetSalaryLists.map((item :any) => item.username))];


  return (
    <div>
      <h1>LeoSalaryPathPage</h1>
      <Link href={"/LeoSalaryPath/createsalary"}>
        CreateSalary
      </Link>

      {/* 為每個唯一的 username 生成 div 和 Link */}
      {uniqueUsernames.map((username, index) => (
        <div key={index}>
          <Link href={`/LeoSalaryPath/salaryLists/${username}`}>
            <div style={{ padding: "10px", border: "1px solid #ccc", margin: "5px" }}>
              {username}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default LeoSalaryPathPage;