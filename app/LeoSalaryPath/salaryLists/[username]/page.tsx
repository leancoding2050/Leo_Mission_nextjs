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

  // 獲取所有薪資列表
  useEffect(() => {
    const fetchSalaryListsbyUsername = async (username: string) => {
      const res = await fetch(`/api/Salary_Lists_by_username/${username}`);
      const data: SalaryItem[] = await res.json();
      setGetSalaryListsbyUsername(data);
      setSalaryLists(data);
    };
    fetchSalaryListsbyUsername(username);
  }, [username]);

  // 計算工作時數
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

  // 過濾指定年月的數據
  const filteredSalaryLists = salaryLists.filter((d: SalaryItem) => {
    const date = new Date(d.job_day);
    return date.getFullYear() === selectedYear && date.getMonth() + 1 === selectedMonth;
  });

  // 計算當月總薪資
  const monthlyTotal = filteredSalaryLists.reduce((acc: number, cur: SalaryItem) => acc + cur.total, 0);

  // 處理加值/減值的點擊
  const handleValueClick = (id: string, field: string, currentValue: number) => {
    setEditField({ id, field });
    setEditValue(currentValue.toString());
  };

  // 更新加值/減值並重新計算總數
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

    // 只傳送需要更新的字段
    await fetch(`/api/Salary_Lists_by_username_id/${username}/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields),
    });

    // 更新本地狀態
    const updatedItem = { ...item, ...updatedFields };
    setSalaryLists((prev) => prev.map((d) => (d.id === item.id ? updatedItem : d)));
    setGetSalaryListsbyUsername((prev) => prev.map((d) => (d.id === item.id ? updatedItem : d)));
    setEditField(null);
    setEditValue("");
  };

  // 加入運算的處理函數
  const handleAddToCalculation = (item: SalaryItem) => {
    const date = new Date(item.job_day);
    setSelectedYear(date.getFullYear());
    setSelectedMonth(date.getMonth() + 1);
  };

  return (
    <>
      <div>salaryListsPage</div>

      {/* 顯示所有薪資列表並添加「加入運算」按鈕 */}
      {GetSalaryListsbyUsername?.map((d: SalaryItem) => (
        <div key={d.id}>
          <br />
          日期：{d.job_day}
          <br />
          開始時間：{d.start_time}
          <br />
          結束時間：{d.fin_time}
          <br />
          薪資：{d.salary}
          <br />
          工時：{calculateWorkHours(d.start_time, d.fin_time)}
          <br />
          工作編號: {d.job_code}
          <br />
          學校名稱：{d.job_school}
          <br />
          地址：{d.job_address}
          <br />
          {d.SalaryRemake.length === 0 ? (
            <Link href={`/LeoSalaryPath/salaryLists/${username}/${d.id}/createSalaryRemake`}>
              備注: 無備注
            </Link>
          ) : (
            <Link href={`/LeoSalaryPath/salaryLists/${username}/${d.id}/${d.SalaryRemake[0].id}/edit`}>
              備注:
              {d.SalaryRemake.map((SR: SalaryRemake) => (
                <div key={SR.id}>{SR.remake}</div>
              ))}
            </Link>
          )}
          <br />
          加值：{d.add}
          <br />
          減值：{d.reduce}
          <br />
          總數：{d.total}
          <br />
          <button onClick={() => handleAddToCalculation(d)}>加入運算</button>
          <br />
        </div>
      ))}

      {/* 年月選擇器 */}
      <div>
        <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
          {Array.from({ length: 5 }, (_, i) => (
            <option key={i} value={2023 + i}>
              {2023 + i}年
            </option>
          ))}
        </select>
        <select value={selectedMonth} onChange={(e) => setSelectedMonth(parseInt(e.target.value))}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i + 1}>
              {i + 1}月
            </option>
          ))}
        </select>
      </div>

      {/* 過濾後的薪資列表 */}
      {filteredSalaryLists.map((d: SalaryItem) => (
        <div key={d.id}>
          <br />
          日期：{new Date(d.job_day).toLocaleDateString()}
          <br />
          開始時間：{d.start_time}
          <br />
          結束時間：{d.fin_time}
          <br />
          薪資：{d.salary}
          <br />
          工時：{calculateWorkHours(d.start_time, d.fin_time)}
          <br />
          工作編號: {d.job_code}
          <br />
          學校名稱：{d.job_school}
          <br />
          地址：{d.job_address}
          <br />
          {d.SalaryRemake.length === 0 ? (
            <Link href={`/LeoSalaryPath/salaryLists/${username}/${d.id}/createSalaryRemake`}>
              備注: 無備注
            </Link>
          ) : (
            <Link href={`/LeoSalaryPath/salaryLists/${username}/${d.id}/${d.SalaryRemake[0].id}/edit`}>
              備注:
              {d.SalaryRemake.map((SR: SalaryRemake) => (
                <div key={SR.id}>{SR.remake}</div>
              ))}
            </Link>
          )}
          <br />
          <div onClick={() => handleValueClick(d.id, "add", d.add)}>
            加值：{d.add}
          </div>
          <div onClick={() => handleValueClick(d.id, "reduce", d.reduce)}>
            減值：{d.reduce}
          </div>
          {editField?.id === d.id && (
            <div>
              <input
                type="number"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
              />
              <button onClick={() => handleValueConfirm(d)}>確定</button>
            </div>
          )}
          <br />
          總數：{d.total}
          <br />
        </div>
      ))}

      {/* 當月總計 */}
      <div>這月總數薪：{monthlyTotal}</div>
    </>
  );
};

export default SalaryListsPage;




// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// const SalaryListsPage = () => {
//   const [salaryLists, setSalaryLists] = useState([]);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
//   const [editField, setEditField] = useState<{ id: string; field: string } | null>(null);
//   const [editValue, setEditValue] = useState("");
//   const [GetSalaryListsbyUsername, setGetSalaryListsbyUsername] = useState([]);

//   const param = useParams();
//   const username = param.username as string;

//   // 獲取所有薪資列表
//   useEffect(() => {
//     const fetchSalaryListsbyUsername = async (username: string) => {
//       const res = await fetch(`/api/Salary_Lists_by_username/${username}`);
//       const data = await res.json();
//       setGetSalaryListsbyUsername(data);
//       setSalaryLists(data); // 同步更新 salaryLists
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
//   const filteredSalaryLists = salaryLists.filter((d: any) => {
//     const date = new Date(d.job_day);
//     return (
//       date.getFullYear() === selectedYear &&
//       date.getMonth() + 1 === selectedMonth
//     );
//   });

//   // 計算當月總薪資
//   const monthlyTotal = filteredSalaryLists.reduce((acc: number, cur: any) => acc + cur.total, 0);

//   // 處理加值/減值的點擊
//   const handleValueClick = (id: string, field: string, currentValue: number) => {
//     setEditField({ id, field });
//     setEditValue(currentValue.toString());
//   };

//   // // 更新加值/減值並重新計算總數
//   // const handleValueConfirm = async (item: any) => {
//   //   if (!editField) return;

//   //   const newValue = parseInt(editValue) || 0;
//   //   const updatedItem = {
//   //     ...item,
//   //     [editField.field]: newValue,
//   //     // 修正計算邏輯：salary + add - reduce
//   //     total: item.salary + (editField.field === "add" ? newValue : item.add || 0) - 
//   //            (editField.field === "reduce" ? newValue : item.reduce || 0),
//   //   };

//   //   await fetch(`/api/Salary_Lists_by_username_id/${username}/${item.id}`, {
//   //     method: "PUT",
//   //     headers: { "Content-Type": "application/json" },
//   //     body: JSON.stringify(updatedItem),
//   //   });
//   //   setSalaryLists((prev: any) =>
//   //     prev.map((d: any) => (d.id === item.id ? updatedItem : d))
//   //   );
//   //   setGetSalaryListsbyUsername((prev: any) =>
//   //     prev.map((d: any) => (d.id === item.id ? updatedItem : d))
//   //   );
//   //   setEditField(null);
//   //   setEditValue("");
//   // };
// // 更新加值/減值並重新計算總數
// const handleValueConfirm = async (item: any) => {
//   if (!editField) return;

//   const newValue = parseInt(editValue) || 0;
//   const updatedFields = {
//     [editField.field]: newValue,
//     total: item.salary + (editField.field === "add" ? newValue : item.add || 0) - 
//            (editField.field === "reduce" ? newValue : item.reduce || 0),
//   };

//   // 只傳送需要更新的字段
//   await fetch(`/api/Salary_Lists_by_username_id/${username}/${item.id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(updatedFields),
//   });

//   // 更新本地狀態
//   const updatedItem = { ...item, ...updatedFields };
//   setSalaryLists((prev: any) =>
//     prev.map((d: any) => (d.id === item.id ? updatedItem : d))
//   );
//   setGetSalaryListsbyUsername((prev: any) =>
//     prev.map((d: any) => (d.id === item.id ? updatedItem : d))
//   );
//   setEditField(null);
//   setEditValue("");
// };




//   // 加入運算的處理函數
//   const handleAddToCalculation = (item: any) => {
//     const date = new Date(item.job_day);
//     setSelectedYear(date.getFullYear());
//     setSelectedMonth(date.getMonth() + 1);
//   };

//   return (
//     <>
//       <div>salaryListsPage</div>

//       {/* 顯示所有薪資列表並添加「加入運算」按鈕 */}
//       {GetSalaryListsbyUsername?.map((d: any) => (
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
//             <Link href={`/LeoSalaryPath/salaryLists/${username}/${d.id}/createSalaryRemake`}>
//               備注: 無備注
//             </Link>
//           ) : (
//             <Link href={`/LeoSalaryPath/salaryLists/${username}/${d.id}/${d.SalaryRemake[0].id}/edit`}>
//               備注:
//               {d.SalaryRemake.map((SR: any) => (
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
//         <select
//           value={selectedYear}
//           onChange={(e) => setSelectedYear(parseInt(e.target.value))}
//         >
//           {Array.from({ length: 5 }, (_, i) => (
//             <option key={i} value={2023 + i}>
//               {2023 + i}年
//             </option>
//           ))}
//         </select>
//         <select
//           value={selectedMonth}
//           onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
//         >
//           {Array.from({ length: 12 }, (_, i) => (
//             <option key={i} value={i + 1}>
//               {i + 1}月
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* 過濾後的薪資列表 */}
//       {filteredSalaryLists.map((d: any) => (
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
//             <Link href={`/LeoSalaryPath/salaryLists/${username}/${d.id}/createSalaryRemake`}>
//               備注: 無備注
//             </Link>
//           ) : (
//             <Link href={`/LeoSalaryPath/salaryLists/${username}/${d.id}/${d.SalaryRemake[0].id}/edit`}>
//               備注:
//               {d.SalaryRemake.map((SR: any) => (
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

// '





// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// const SalaryListsPage = () => {
//   const [GetSalaryListsbyUsername, setGetSalaryListsbyUsername] = useState([]);
//   const param = useParams();

//   const username = param.username as string;

//   useEffect(() => {
//     const fetchSalaryListsbyUsername = async (username: string) => {
//       const res = await fetch(`/api/Salary_Lists_by_username/${username}`);
//       const data = await res.json();
//       setGetSalaryListsbyUsername(data);
//     };
//     fetchSalaryListsbyUsername(username);
//   }, [username]);

//   console.log("GetSalaryListsbyUsername : ", GetSalaryListsbyUsername);

//   const calculateWorkHours = (startTime: string, endTime:string) => {
//     // 轉換時間字符串為數字
//     const start = parseInt(startTime);
//     const end = parseInt(endTime);

  
//     // 計算小時和分鐘差值
//     const startHours = Math.floor(start / 100);
//     const startMinutes = start % 100;
//     const endHours = Math.floor(end / 100);
//     const endMinutes = end % 100;

//     // 計算總分鐘數
//     const totalStartMinutes = startHours * 60 + startMinutes;
//     const totalEndMinutes = endHours * 60 + endMinutes;

//     // 計算差值
//     const diffMinutes = totalEndMinutes - totalStartMinutes;
//     const diffHours = Math.floor(diffMinutes / 60);
//     const remainingMinutes = diffMinutes % 60;

//     return `${diffHours} 小時 ${remainingMinutes} 分鐘`;
//   };


//   return (
//     <>
//       <div>salaryListsPage</div>
      
//       {GetSalaryListsbyUsername?.map((d: any) => {
//         return (
//           <div key={d.id}>
//             <br />
//             日期：{d.job_day}
//             <br />
//             開始時間：{d.start_time}
//             <br />
//             結束時間：{d.fin_time}
//             <br />
//             薪資：{d.salary}
//             <br />
//             工時：{calculateWorkHours(d.start_time, d.fin_time)}
//             <br />
//             工作編號: {d.job_code}
//             <br />
//             學校名稱：{d.job_school}
//             <br />
//             地址：{d.job_address}
//             <br />
            
//             {/* 根據 SalaryRemake 是否有內容來設置 Link 的 href */}
//             {d.SalaryRemake.length === 0 ? (
//               // 如果 SalaryRemake 沒有內容，指向 createSalaryRemake
//               <Link href={`/LeoSalaryPath/salaryLists/${username}/${d.id}/createSalaryRemake`}>
//                 備注: 無備注
//               </Link>
//             ) : (
//               // 如果 SalaryRemake 有內容，指向第一個備注的編輯頁面
//               <Link href={`/LeoSalaryPath/salaryLists/${username}/${d.id}/${d.SalaryRemake[0].id}/edit`}>
//                 備注:
//                 {d.SalaryRemake.map((SR: any) => (
//                   <div key={SR.id}>{SR.remake}</div>
//                 ))}
//               </Link>
//             )}
//             <br />
//             加值：{d.add}
//             <br />
//             減值：{d.reduce}
//             <br />
//             總數：{d.total}
//             <br />
//           </div>
//         );
//       })}

//       這月總數薪：{GetSalaryListsbyUsername?.reduce((acc: any, cur: any) => acc + cur.total, 0)}

//     </>
//   );
// };

// export default SalaryListsPage;
