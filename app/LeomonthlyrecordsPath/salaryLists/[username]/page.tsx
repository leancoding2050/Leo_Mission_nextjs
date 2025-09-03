// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// interface SalaryRemake {
//   id: string;
//   remake: string;
// }

// interface SalaryItem {
//   id: string;
//   job_day: string;
//   start_time: string;
//   fin_time: string;
//   salary: number;
//   job_code: string;
//   job_school: string;
//   job_address: string;
//   SalaryRemake: SalaryRemake[];
//   add: number;
//   reduce: number;
//   total: number;
// }

// const SalaryListsPage = () => {
//   const [salaryLists, setSalaryLists] = useState<SalaryItem[]>([]);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//   const [editField, setEditField] = useState<{ id: string; field: string } | null>(null);
//   const [editValue, setEditValue] = useState("");
//   const [GetSalaryListsbyUsername, setGetSalaryListsbyUsername] = useState<SalaryItem[]>([]);

//   const param = useParams();
//   const username = param.username as string;

//   // 獲取所有薪資列表
//   useEffect(() => {
//     const fetchSalaryListsbyUsername = async (username: string) => {
//       const res = await fetch(`/api/Salary_Lists_by_username/${username}`);
//       const data: SalaryItem[] = await res.json();
//       setGetSalaryListsbyUsername(data);
//       setSalaryLists(data);
//     };
//     fetchSalaryListsbyUsername(username);
//   }, [username]);

//   // 計算工作時數
//   const calculateWorkHours = (startTime: string, endTime: string) => {
//     const start = parseInt(startTime);
//     const end = parseInt(endTime);
//     const startHours = Math.floor(start / 100);
//     const startMinutes = start % 100;
//     const endHours = Math.floor(end / 100);
//     const endMinutes = end % 100;
//     const totalStartMinutes = startHours * 60 + startMinutes;
//     const totalEndMinutes = endHours * 60 + endMinutes;
//     const diffMinutes = totalEndMinutes - totalStartMinutes;
//     const diffHours = Math.floor(diffMinutes / 60);
//     const remainingMinutes = diffMinutes % 60;
//     return `${diffHours} 小時 ${remainingMinutes} 分鐘`;
//   };

//   // 過濾指定年月的數據
//   const filteredSalaryLists = salaryLists.filter((d: SalaryItem) => {
//     const date = new Date(d.job_day);
//     return date.getFullYear() === selectedYear && date.getMonth() + 1 === selectedMonth;
//   });

//   // 計算當月總薪資
//   const monthlyTotal = filteredSalaryLists.reduce((acc: number, cur: SalaryItem) => acc + cur.total, 0);

//   // 處理加值/減值的點擊
//   const handleValueClick = (id: string, field: string, currentValue: number) => {
//     setEditField({ id, field });
//     setEditValue(currentValue.toString());
//   };

//   // 更新加值/減值並重新計算總數
//   const handleValueConfirm = async (item: SalaryItem) => {
//     if (!editField) return;

//     const newValue = parseInt(editValue) || 0;
//     const updatedFields = {
//       [editField.field]: newValue,
//       total:
//         item.salary +
//         (editField.field === "add" ? newValue : item.add || 0) -
//         (editField.field === "reduce" ? newValue : item.reduce || 0),
//     };

//     // 只傳送需要更新的字段
//     await fetch(`/api/Salary_Lists_by_username_id/${username}/${item.id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(updatedFields),
//     });

//     // 更新本地狀態
//     const updatedItem = { ...item, ...updatedFields };
//     setSalaryLists((prev) => prev.map((d) => (d.id === item.id ? updatedItem : d)));
//     setGetSalaryListsbyUsername((prev) => prev.map((d) => (d.id === item.id ? updatedItem : d)));
//     setEditField(null);
//     setEditValue("");
//   };

//   // 加入運算的處理函數
//   const handleAddToCalculation = (item: SalaryItem) => {
//     const date = new Date(item.job_day);
//     setSelectedYear(date.getFullYear());
//     setSelectedMonth(date.getMonth() + 1);
//   };

//   return (
//     <>
//       <div>salaryListsPage</div>

//       {/* 顯示所有薪資列表並添加「加入運算」按鈕 */}
//       {GetSalaryListsbyUsername?.map((d: SalaryItem) => (
//         <div key={d.id}>
//           <br />
//           日期：{d.job_day}
//           <br />
//           開始時間：{d.start_time}
//           <br />
//           結束時間：{d.fin_time}
//           <br />
//           薪資：{d.salary}
//           <br />
//           工時：{calculateWorkHours(d.start_time, d.fin_time)}
//           <br />
//           工作編號: {d.job_code}
//           <br />
//           學校名稱：{d.job_school}
//           <br />
//           地址：{d.job_address}
//           <br />
//           {d.SalaryRemake.length === 0 ? (
//             <Link href={`/LeomonthlyrecordsPath/salaryLists/${username}/${d.id}/createSalaryRemake`}>
//               備注: 無備注
//             </Link>
//           ) : (
//             <Link href={`/LeomonthlyrecordsPath/salaryLists/${username}/${d.id}/${d.SalaryRemake[0].id}/edit`}>
//               備注:
//               {d.SalaryRemake.map((SR: SalaryRemake) => (
//                 <div key={SR.id}>{SR.remake}</div>
//               ))}
//             </Link>
//           )}
//           <br />
//           加值：{d.add}
//           <br />
//           減值：{d.reduce}
//           <br />
//           總數：{d.total}
//           <br />
//           <button onClick={() => handleAddToCalculation(d)}>加入運算</button>
//           <br />
//         </div>
//       ))}

//       {/* 年月選擇器 */}
//       <div>
//         <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
//           {Array.from({ length: 5 }, (_, i) => (
//             <option key={i} value={2023 + i}>
//               {2023 + i}年
//             </option>
//           ))}
//         </select>
//         <select value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
//           {Array.from({ length: 12 }, (_, i) => (
//             <option key={i} value={i + 1}>
//               {i + 1}月
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* 過濾後的薪資列表 */}
//       {filteredSalaryLists.map((d: SalaryItem) => (
//         <div key={d.id}>
//           <br />
//           日期：{new Date(d.job_day).toLocaleDateString()}
//           <br />
//           開始時間：{d.start_time}
//           <br />
//           結束時間：{d.fin_time}
//           <br />
//           薪資：{d.salary}
//           <br />
//           工時：{calculateWorkHours(d.start_time, d.fin_time)}
//           <br />
//           工作編號: {d.job_code}
//           <br />
//           學校名稱：{d.job_school}
//           <br />
//           地址：{d.job_address}
//           <br />
//           {d.SalaryRemake.length === 0 ? (
//             <Link href={`/LeomonthlyrecordsPath/salaryLists/${username}/${d.id}/createSalaryRemake`}>
//               備注: 無備注
//             </Link>
//           ) : (
//             <Link href={`/LeomonthlyrecordsPath/salaryLists/${username}/${d.id}/${d.SalaryRemake[0].id}/edit`}>
//               備注:
//               {d.SalaryRemake.map((SR: SalaryRemake) => (
//                 <div key={SR.id}>{SR.remake}</div>
//               ))}
//             </Link>
//           )}
//           <br />
//           <div onClick={() => handleValueClick(d.id, "add", d.add)}>
//             加值：{d.add}
//           </div>
//           <div onClick={() => handleValueClick(d.id, "reduce", d.reduce)}>
//             減值：{d.reduce}
//           </div>
//           {editField?.id === d.id && (
//             <div>
//               <input
//                 type="number"
//                 value={editValue}
//                 onChange={(e) => setEditValue(e.target.value)}
//               />
//               <button onClick={() => handleValueConfirm(d)}>確定</button>
//             </div>
//           )}
//           <br />
//           總數：{d.total}
//           <br />
//         </div>
//       ))}

//       {/* 當月總計 */}
//       <div>這月總數薪：{monthlyTotal}</div>
//     </>
//   );
// };

// export default SalaryListsPage;



"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface SalaryRemake {
  id: string;
  remake: string;
}

interface SalaryItem {
  id: string;
  job_day: string;
  start_time: string;
  fin_time: string;
  salary: number;
  job_code: string;
  job_school: string;
  job_address: string;
  SalaryRemake: SalaryRemake[];
  add: number;
  reduce: number;
  total: number;
}

const SalaryListsPage = () => {
  const [salaryLists, setSalaryLists] = useState<SalaryItem[]>([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [editField, setEditField] = useState<{ id: string; field: string } | null>(null);
  const [editValue, setEditValue] = useState("");
  const [GetSalaryListsbyUsername, setGetSalaryListsbyUsername] = useState<SalaryItem[]>([]);

  const param = useParams();
  const username = param.username as string;

  useEffect(() => {
    const fetchSalaryListsbyUsername = async (username: string) => {
      const res = await fetch(`/api/Salary_Lists_by_username/${username}`);
      const data: SalaryItem[] = await res.json();
      setGetSalaryListsbyUsername(data);
      setSalaryLists(data);
    };
    fetchSalaryListsbyUsername(username);
  }, [username]);

  const calculateWorkHours = (startTime: string, endTime: string) => {
    const start = parseInt(startTime);
    const end = parseInt(endTime);
    const startHours = Math.floor(start / 100);
    const startMinutes = start % 100;
    const endHours = Math.floor(end / 100);
    const endMinutes = end % 100;
    const totalStartMinutes = startHours * 60 + startMinutes;
    const totalEndMinutes = endHours * 60 + endMinutes;
    const diffMinutes = totalEndMinutes - totalStartMinutes;
    const diffHours = Math.floor(diffMinutes / 60);
    const remainingMinutes = diffMinutes % 60;
    return `${diffHours} 小時 ${remainingMinutes} 分鐘`;
  };

  const filteredSalaryLists = salaryLists.filter((d: SalaryItem) => {
    const date = new Date(d.job_day);
    return date.getFullYear() === selectedYear && date.getMonth() + 1 === selectedMonth;
  });

  const monthlyTotal = filteredSalaryLists.reduce((acc: number, cur: SalaryItem) => acc + cur.total, 0);

  const handleValueClick = (id: string, field: string, currentValue: number) => {
    setEditField({ id, field });
    setEditValue(currentValue.toString());
  };

  const handleValueConfirm = async (item: SalaryItem) => {
    if (!editField) return;

    const newValue = parseInt(editValue) || 0;
    const updatedFields = {
      [editField.field]: newValue,
      total:
        item.salary +
        (editField.field === "add" ? newValue : item.add || 0) -
        (editField.field === "reduce" ? newValue : item.reduce || 0),
    };

    await fetch(`/api/Salary_Lists_by_username_id/${username}/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    });

    const updatedItem = { ...item, ...updatedFields };
    setSalaryLists((prev) => prev.map((d) => (d.id === item.id ? updatedItem : d)));
    setGetSalaryListsbyUsername((prev) => prev.map((d) => (d.id === item.id ? updatedItem : d)));
    setEditField(null);
    setEditValue("");
  };

  const handleAddToCalculation = (item: SalaryItem) => {
    const date = new Date(item.job_day);
    setSelectedYear(date.getFullYear());
    setSelectedMonth(date.getMonth() + 1);
  };

  return (
    <div className="font-noto-sans-tc p-4 sm:p-6 md:p-8">
      <Link href={`/LeomonthlyrecordsPath/`}>
        返回
      </Link>
      <h1 className="text-2xl sm:text-3xl text-primary-1 font-bold mb-4">薪資列表 - {username}</h1>

      {/* 年月選擇器 */}
      <div className="flex space-x-4 mb-6">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          className="border border-grey-2 rounded-md p-2 text-primary-1 focus:outline-none focus:ring-2 focus:ring-primary-1"
        >
          {Array.from({ length: 5 }, (_, i) => (
            <option key={i} value={2023 + i}>
              {2023 + i}年
            </option>
          ))}
        </select>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          className="border border-grey-2 rounded-md p-2 text-primary-1 focus:outline-none focus:ring-2 focus:ring-primary-1"
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}月
            </option>
          ))}
        </select>
      </div>

      {/* 所有薪資列表 */}
      <div className="grid gap-6">
        {GetSalaryListsbyUsername?.map((d: SalaryItem) => (
          <div
            key={d.id}
            className="p-4 border border-grey-2 rounded-md hover:bg-grey-2 transition-colors duration-200"
          >
            <div className="text-primary-1 text-base sm:text-lg">
              <p><strong>日期：</strong>{d.job_day}</p>
              <p><strong>開始時間：</strong>{d.start_time}</p>
              <p><strong>結束時間：</strong>{d.fin_time}</p>
              <p><strong>工時：</strong>{calculateWorkHours(d.start_time, d.fin_time)}</p>
              <p><strong>薪資：</strong>{d.salary}</p>
              <p><strong>工作編號：</strong>{d.job_code}</p>
              <p><strong>學校名稱：</strong>{d.job_school}</p>
              <p><strong>地址：</strong>{d.job_address}</p>
              <p>
                <strong>備注：</strong>
                {d.SalaryRemake.length === 0 ? (
                  <Link
                    href={`/LeomonthlyrecordsPath/salaryLists/${username}/${d.id}/createSalaryRemake`}
                    className="text-primary-1 hover:underline"
                  >
                    無備注
                  </Link>
                ) : (
                  <Link
                    href={`/LeomonthlyrecordsPath/salaryLists/${username}/${d.id}/${d.SalaryRemake[0].id}/edit`}
                    className="text-primary-1 hover:underline"
                  >
                    {d.SalaryRemake.map((SR: SalaryRemake) => (
                      <span key={SR.id}>{SR.remake}</span>
                    ))}
                  </Link>
                )}
              </p>
              <p><strong>加值：</strong>{d.add}</p>
              <p><strong>減值：</strong>{d.reduce}</p>
              <p><strong>總數：</strong>{d.total}</p>
            </div>
            <button
              onClick={() => handleAddToCalculation(d)}
              className="mt-2 bg-primary-1 text-white py-2 px-4 rounded hover:bg-grey-2 transition-colors duration-200"
            >
              加入運算
            </button>
          </div>
        ))}
      </div>

      {/* 過濾後的薪資列表 */}
      <h2 className="text-xl sm:text-2xl text-primary-1 font-semibold mt-8 mb-4">
        {selectedYear}年{selectedMonth}月薪資記錄
      </h2>
      <div className="grid gap-6">
        {filteredSalaryLists.map((d: SalaryItem) => (
          <div
            key={d.id}
            className="p-4 border border-grey-2 rounded-md hover:bg-grey-2 transition-colors duration-200"
          >
            <div className="text-primary-1 text-base sm:text-lg">
              <p><strong>日期：</strong>{new Date(d.job_day).toLocaleDateString()}</p>
              <p><strong>開始時間：</strong>{d.start_time}</p>
              <p><strong>結束時間：</strong>{d.fin_time}</p>
              <p><strong>工時：</strong>{calculateWorkHours(d.start_time, d.fin_time)}</p>
              <p><strong>薪資：</strong>{d.salary}</p>
              <p><strong>工作編號：</strong>{d.job_code}</p>
              <p><strong>學校名稱：</strong>{d.job_school}</p>
              <p><strong>地址：</strong>{d.job_address}</p>
              <p>
                <strong>備注：</strong>
                {d.SalaryRemake.length === 0 ? (
                  <Link
                    href={`/LeomonthlyrecordsPath/salaryLists/${username}/${d.id}/createSalaryRemake`}
                    className="text-primary-1 hover:underline"
                  >
                    無備注
                  </Link>
                ) : (
                  <Link
                    href={`/LeomonthlyrecordsPath/salaryLists/${username}/${d.id}/${d.SalaryRemake[0].id}/edit`}
                    className="text-primary-1 hover:underline"
                  >
                    {d.SalaryRemake.map((SR: SalaryRemake) => (
                      <div key={SR.id}>{SR.remake}</div>
                    ))}
                  </Link>
                )}
              </p>
              <div
                onClick={() => handleValueClick(d.id, "add", d.add)}
                className="cursor-pointer hover:underline"
              >
                <strong>加值：</strong>{d.add}
              </div>
              <div
                onClick={() => handleValueClick(d.id, "reduce", d.reduce)}
                className="cursor-pointer hover:underline"
              >
                <strong>減值：</strong>{d.reduce}
              </div>
              {editField?.id === d.id && (
                <div className="mt-2 flex space-x-2">
                  <input
                    type="number"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="border border-grey-2 rounded-md p-2 text-primary-1 focus:outline-none focus:ring-2 focus:ring-primary-1"
                  />
                  <button
                    onClick={() => handleValueConfirm(d)}
                    className="bg-primary-1 text-white py-2 px-4 rounded hover:bg-grey-2 transition-colors duration-200"
                  >
                    確定
                  </button>
                </div>
              )}
              <p><strong>總數：</strong>{d.total}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 當月總計 */}
      <div className="mt-6 text-xl sm:text-2xl text-primary-1 font-semibold">
        {selectedYear}年{selectedMonth}月總薪資：{monthlyTotal}
      </div>
    </div>
  );
};

export default SalaryListsPage;