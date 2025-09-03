"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
  const [GetSalaryLists, setGetSalaryLists] = useState<Salary[]>([]);

  useEffect(() => {
    const fetchSalaryLists = async () => {
      const res = await fetch(`/api/Salary_Lists`);
      const data = await res.json();
      setGetSalaryLists(data);
    };
    fetchSalaryLists();
  }, []);

  const uniqueUsernames = [...new Set(GetSalaryLists.map((item) => item.username))];

  return (
    <div className="font-noto-sans-tc p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl text-primary-1 font-bold mb-4">薪資管理</h1>
      <Link
        href="/LeomonthlyrecordsPath/createsalary"
        className="inline-block bg-primary-1 text-white py-2 px-4 rounded hover:bg-grey-2 transition-colors duration-200 mb-6"
      >
        創建薪資
      </Link>

      <div className="grid gap-4">
        {uniqueUsernames.map((username, index) => (
          <Link
            key={index}
            href={`/LeomonthlyrecordsPath/salaryLists/${username}`}
            className="block"
          >
            <div className="p-4 border border-grey-2 rounded-md hover:bg-grey-2 transition-colors duration-200 text-primary-1 text-base sm:text-lg">
              {username}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LeoSalaryPathPage;

// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";

// // 定義 Salary 模型的 TypeScript 類型，根據 Prisma 模型
// interface Salary {
//   id: string;
//   name: string;
//   username: string;
//   salary: number;
//   phone: string;
//   Salary_title: string;
//   job_day: string;
//   start_time: string;
//   fin_time: string;
//   job_code: string;
//   job_school: string;
//   job_address: string;
//   add: number;
//   reduce: number;
//   total: number;
//   SalaryRemake?: { id: string; remake: string; SalaryRemakeId: string }[];
//   user?: { id: string; username: string }[];
//   job?: { id: string; job_code: string }[];
// }

// const LeoSalaryPathPage = () => {
//   // 為 useState 指定類型為 Salary[]
//   const [GetSalaryLists, setGetSalaryLists] = useState<Salary[]>([]);

//   useEffect(() => {
//     const fetchSalaryLists = async () => {
//       const res = await fetch(`/api/Salary_Lists`);
//       const data = await res.json();
//       setGetSalaryLists(data);
//     };
//     fetchSalaryLists();
//   }, []);

//   console.log("GetSalaryLists : ", GetSalaryLists);

//   // 從數據中提取唯一的 username
//   const uniqueUsernames = [...new Set(GetSalaryLists.map((item) => item.username))];

//   return (
//     <div>
//       <h1>LeoSalaryPathPage</h1>
//       <Link href={"/LeomonthlyrecordsPath/createsalary"}>CreateSalary</Link>

//       {/* 為每個唯一的 username 生成 div 和 Link */}
//       {uniqueUsernames.map((username, index) => (
//         <div key={index}>
//           <Link href={`/LeomonthlyrecordsPath/salaryLists/${username}`}>
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