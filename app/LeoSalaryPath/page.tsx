// "use client"

// import Link from "next/link";
// import { useEffect, useState } from "react";

// const LeoSalaryPathPage = () => {
//   const [ GetSalaryLists , setGetSalaryLists ] = useState([]);

//   useEffect(() => {
//     const fetchSalaryLists = async () => {
//       const res = await fetch(`/api/Salary_Lists`) ;
//       const data = await res.json() ;
//       setGetSalaryLists(data) ;
//     }
//     fetchSalaryLists()
//   },[])

//   console.log("GetSalaryLists : ",GetSalaryLists)

//     // 從數據中提取唯一的 username
//     const uniqueUsernames = [...new Set(GetSalaryLists.map((item ) => item.username))];


//   return (
//     <div>
//       <h1>LeoSalaryPathPage</h1>
//       <Link href={"/LeoSalaryPath/createsalary"}>
//         CreateSalary
//       </Link>

//       {/* 為每個唯一的 username 生成 div 和 Link */}
//       {uniqueUsernames.map((username, index) => (
//         <div key={index}>
//           <Link href={`/LeoSalaryPath/salaryLists/${username}`}>
//             <div style={{ padding: "10px", border: "1px solid #ccc", margin: "5px" }}>
//               {username}
//             </div>
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default LeoSalaryPathPage;

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// 定義 Salary 模型的 TypeScript 類型，根據 Prisma 模型
interface Salary {
  id: string;
  name: string;
  username: string;
  salary: number;
  phone: string;
  Salary_title: string;
  job_day: string;
  start_time: string;
  fin_time: string;
  job_code: string;
  job_school: string;
  job_address: string;
  add: number;
  reduce: number;
  total: number;
  SalaryRemake?: { id: string; remake: string; SalaryRemakeId: string }[];
  user?: { id: string; username: string }[];
  job?: { id: string; job_code: string }[];
}

const LeoSalaryPathPage = () => {
  // 為 useState 指定類型為 Salary[]
  const [GetSalaryLists, setGetSalaryLists] = useState<Salary[]>([]);

  useEffect(() => {
    const fetchSalaryLists = async () => {
      const res = await fetch(`/api/Salary_Lists`);
      const data = await res.json();
      setGetSalaryLists(data);
    };
    fetchSalaryLists();
  }, []);

  console.log("GetSalaryLists : ", GetSalaryLists);

  // 從數據中提取唯一的 username
  const uniqueUsernames = [...new Set(GetSalaryLists.map((item) => item.username))];

  return (
    <div>
      <h1>LeoSalaryPathPage</h1>
      <Link href={"/LeoSalaryPath/createsalary"}>CreateSalary</Link>

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