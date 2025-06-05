// // "use client";

// // import Link from "next/link";
// // import { Logout_Button } from "./logout_button";
// // import { useSession } from "next-auth/react";
// // import { useEffect, useState } from "react";
// // import { savePreviousDayJobToSalary } from "@/actions/Create-Salary";

// // const Navbar = () => {
// //     const session = useSession();
// //     const userId = session.data?.user?.id;
// //     const UserRole = session.data?.user?.role;

// // //     const [ GetUserListsDatabyId , setGetUserListsDatabyId ] = useState([]);
// // //     const [showAlertButton, setShowAlertButton] = useState(false);

// // //     useEffect(()=>{
// // //         const getUserListsDatabyId = async (id) => { 
// // //             const res = await fetch(`/api/User_Lists_by_ID/${id}`);
// // //             if(!res.ok){
// // //                 throw new Error("斷線!");
// // //             }
// // //             const result = await res.json();
// // //             setGetUserListsDatabyId(result);
// // //         }
// // //         getUserListsDatabyId(userId);
// // //     }, [userId]);
    
// // //     //console.log("In NavBar :", GetUserListsDatabyId);

// // //     useEffect(() => {
// // //         const UserJobs = GetUserListsDatabyId[0]?.job;
// // //         const Jobday = UserJobs && UserJobs.length > 0 ? UserJobs[0]?.job_day : null;
// // // //        console.log("UserJobs:",  UserJobs );
// // // //        console.log("Jobday:", Jobday);  
        
// // //         if(Jobday) {
// // //             //之後會用(18/2/2025) 25/2/2025 用
// // //             // const targetTime = new Date(Jobday).getTime();
// // //             // const alertTime = targetTime + 24 * 60 * 60 * 1000; // 24小時的毫秒數
// // //             const targetTime = new Date().getTime();
// // //             const alertTime = targetTime + 5000; // 24小時的毫秒數
// // //             const currentTime = new Date().getTime();
// // //             const timeToAlert = alertTime - currentTime;

// // //             if (timeToAlert > 0) {
// // //                 const timeoutId = setTimeout(() => {
// // //                     console.log("時間到了！");
// // //                     setShowAlertButton(true); // 設置按鈕顯示
// // //                 }, timeToAlert);

// // //                 return () => clearTimeout(timeoutId);
// // //             } else {
// // //                 console.log("時間已到！");
// // //                 setShowAlertButton(true); // 立即設置按鈕顯示
// // //             }
// // //         }
// // //     }, [GetUserListsDatabyId]);

// // //     useEffect(() => {
// // //         // 獲取當前時間
// // //         const now = new Date();
    
// // //         // 計算明天的日期（當前日期的下一天）
// // //         const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    
// // //         // 計算明天的午夜時間（即明天的 00:00:00）
// // //         const midnight = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 0, 0, 0);
    
// // //         // 計算從現在到午夜的時間差（以毫秒為單位）
// // //         const timeUntilMidnight = midnight.getTime() - now.getTime();
    
// // //         // 設置一個定時器，在午夜時執行以下操作
// // //         const timeoutId = setTimeout(() => {
// // //             // 將前一天的 Job 數據保存到 Salary
// // //             savePreviousDayJobToSalary(userId);
// // //             // 重新安排下一次的每日保存任務
// // //             scheduleDailyJobSave(userId);
// // //         }, timeUntilMidnight);
    
// // //         // 清理函數：在組件卸載或 userId 變化時清除定時器，避免內存洩漏
// // //         return () => clearTimeout(timeoutId);
// // //     }, [userId]); // 依賴項：當 userId 變化時，重新執行 useEffect
    
// // //     const scheduleDailyJobSave = (userId: string) => {
// // //         // 獲取當前時間
// // //         const now = new Date();
    
// // //         // 計算明天的日期（當前日期的下一天）
// // //         const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    
// // //         // 計算明天的午夜時間（即明天的 00:00:00）
// // //         const midnight = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 0, 0, 0);
    
// // //         // 計算從現在到午夜的時間差（以毫秒為單位）
// // //         const timeUntilMidnight = midnight.getTime() - now.getTime();
    
// // //         // 設置一個定時器，在午夜時執行以下操作
// // //         setTimeout(() => {
// // //             // 將前一天的 Job 數據保存到 Salary
// // //             savePreviousDayJobToSalary(userId);
// // //             // 重新安排下一次的每日保存任務（遞歸調用）
// // //             scheduleDailyJobSave(userId);
// // //         }, timeUntilMidnight);
// // //     };
// //     if (UserRole === "ADMIN") {
// //         return (
// //             <nav className="bg-gray-800">
// //                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //                     <div className="flex items-center justify-between h-16">
// //                         <div className="flex items-center">
// //                             <div className="flex-shrink-0">
// //                                 <ul className="flex space-x-6">
// //                                     <li>
// //                                         <Link href={`/user/${userId}/admin`} className="text-white font-bold text-xl hover:text-yellow-500 transition duration-300">
// //                                             Admin
// //                                         </Link>
// //                                     </li>
// //                                     <li>
// //                                         <Link href={`/user/${userId}/`} className="text-white font-bold text-xl hover:text-yellow-500 transition duration-300">
// //                                             首頁
// //                                         </Link>
// //                                     </li>
// //                                     <li>
// //                                         <Link href={`/user/${userId}/profiles`} className="text-white font-bold text-xl hover:text-yellow-500 transition duration-300">
// //                                             用戶資料
// //                                         </Link>
// //                                     </li>
// //                                     <li>
// //                                         <Link href={`/user/${userId}/jobLists`} className="text-white font-bold text-xl hover:text-yellow-500 transition duration-300">
// //                                             工作版
// //                                         </Link>
// //                                     </li>
// //                                     <li>
// //                                         <Link href={`/user/${userId}/taskLists`} className="text-white font-bold text-xl hover:text-yellow-500 transition duration-300">
// //                                             任務版
// //                                         </Link>
// //                                     </li>
// //                                     <li>
// //                                         <Link href={`/user/${userId}/applyLists`} className="text-white font-bold text-xl hover:text-yellow-500 transition duration-300">
// //                                             申請列表
// //                                         </Link>
// //                                     </li>
// //                                 </ul>
// //                             </div>
// //                         </div>
// //                         <div>
// //                             <Logout_Button />
// //                             {/* {
// //                                 showAlertButton && (
// //                                     <button
// //                                         className="bg-red-500 text-white px-4 py-2 rounded"
// //                                         onClick={() => setShowAlertButton(false)}
// //                                     >
// //                                         時間到了
// //                                     </button>
// //                                 )
// //                             } */}
// //                         </div>
// //                     </div>
// //                 </div>
// //             </nav>
// //         );
// //     } else if (UserRole === "TEACHER") {
// //         return (
// //             <nav className="bg-gray-800">
// //                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //                     <div className="flex items-center justify-between h-16">
// //                         <div className="flex items-center">
// //                             <div className="flex-shrink-0">
// //                                 <ul className="flex space-x-6">
// //                                     <li>
// //                                         <Link href={`/user/${userId}/`} className="text-white font-bold text-xl hover:text-yellow-500 transition duration-300">
// //                                             首頁
// //                                         </Link>
// //                                     </li>
// //                                     <li>
// //                                         <Link href={`/user/${userId}/profiles`} className="text-white font-bold text-xl hover:text-yellow-500 transition duration-300">
// //                                             用戶資料
// //                                         </Link>
// //                                     </li>
// //                                     <li>
// //                                         <Link href={`/user/${userId}/jobLists`} className="text-white font-bold text-xl hover:text-yellow-500 transition duration-300">
// //                                             工作版
// //                                         </Link>
// //                                     </li>
// //                                     <li>
// //                                         <Link href={`/user/${userId}/taskboard`} className="text-white font-bold text-xl hover:text-yellow-500 transition duration-300">
// //                                             任務版
// //                                         </Link>
// //                                     </li>
// //                                     <li>
// //                                         <Link href={`/user/${userId}/applyLists`} className="text-white font-bold text-xl hover:text-yellow-500 transition duration-300">
// //                                             申請列表
// //                                         </Link>
// //                                     </li>
// //                                 </ul>
// //                             </div>
// //                         </div>
// //                         <div>
// //                             <Logout_Button />
// //                             {/* {
// //                                 showAlertButton && (
// //                                     <button
// //                                         className="bg-red-500 text-white px-4 py-2 rounded"
// //                                         onClick={() => setShowAlertButton(false)}
// //                                     >
// //                                         時間到了
// //                                     </button>
// //                                 )
// //                             } */}
// //                         </div>
// //                     </div>
// //                 </div>
// //             </nav>
// //         );
// //     }

// //     return null;
// // };

// // export default Navbar;


// "use client";

// import Link from "next/link";
// import { Logout_Button } from "./logout_button";
// import { useSession } from "next-auth/react";
// // import { useEffect, useState } from "react";
// // import { savePreviousDayJobToSalary } from "@/actions/Create-Salary";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { 
//     // faCalendarDays, 
//     faUser, faClipboardCheck, faRectangleList, faClock } from '@fortawesome/free-solid-svg-icons';

// const Navbar = () => {
//     const session = useSession();
//     const userId = session.data?.user?.id;
//     const UserRole = session.data?.user?.role;

// //     const [ GetUserListsDatabyId , setGetUserListsDatabyId ] = useState([]);
// //     const [showAlertButton, setShowAlertButton] = useState(false);

// //     useEffect(()=>{
// //         const getUserListsDatabyId = async (id) => { 
// //             const res = await fetch(`/api/User_Lists_by_ID/${id}`);
// //             if(!res.ok){
// //                 throw new Error("斷線!");
// //             }
// //             const result = await res.json();
// //             setGetUserListsDatabyId(result);
// //         }
// //         getUserListsDatabyId(userId);
// //     }, [userId]);
    
// //     //console.log("In NavBar :", GetUserListsDatabyId);

// //     useEffect(() => {
// //         const UserJobs = GetUserListsDatabyId[0]?.job;
// //         const Jobday = UserJobs && UserJobs.length > 0 ? UserJobs[0]?.job_day : null;
// // //        console.log("UserJobs:",  UserJobs );
// // //        console.log("Jobday:", Jobday);  
        
// //         if(Jobday) {
// //             //之後會用(18/2/2025) 25/2/2025 用
// //             // const targetTime = new Date(Jobday).getTime();
// //             // const alertTime = targetTime + 24 * 60 * 60 * 1000; // 24小時的毫秒數
// //             const targetTime = new Date().getTime();
// //             const alertTime = targetTime + 5000; // 24小時的毫秒數
// //             const currentTime = new Date().getTime();
// //             const timeToAlert = alertTime - currentTime;

// //             if (timeToAlert > 0) {
// //                 const timeoutId = setTimeout(() => {
// //                     console.log("時間到了！");
// //                     setShowAlertButton(true); // 設置按鈕顯示
// //                 }, timeToAlert);

// //                 return () => clearTimeout(timeoutId);
// //             } else {
// //                 console.log("時間已到！");
// //                 setShowAlertButton(true); // 立即設置按鈕顯示
// //             }
// //         }
// //     }, [GetUserListsDatabyId]);

// //     useEffect(() => {
// //         // 獲取當前時間
// //         const now = new Date();
    
// //         // 計算明天的日期（當前日期的下一天）
// //         const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    
// //         // 計算明天的午夜時間（即明天的 00:00:00）
// //         const midnight = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 0, 0, 0);
    
// //         // 計算從現在到午夜的時間差（以毫秒為單位）
// //         const timeUntilMidnight = midnight.getTime() - now.getTime();
    
// //         // 設置一個定時器，在午夜時執行以下操作
// //         const timeoutId = setTimeout(() => {
// //             // 將前一天的 Job 數據保存到 Salary
// //             savePreviousDayJobToSalary(userId);
// //             // 重新安排下一次的每日保存任務
// //             scheduleDailyJobSave(userId);
// //         }, timeUntilMidnight);
    
// //         // 清理函數：在組件卸載或 userId 變化時清除定時器，避免內存洩漏
// //         return () => clearTimeout(timeoutId);
// //     }, [userId]); // 依賴項：當 userId 變化時，重新執行 useEffect
    
// //     const scheduleDailyJobSave = (userId: string) => {
// //         // 獲取當前時間
// //         const now = new Date();
    
// //         // 計算明天的日期（當前日期的下一天）
// //         const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    
// //         // 計算明天的午夜時間（即明天的 00:00:00）
// //         const midnight = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 0, 0, 0);
    
// //         // 計算從現在到午夜的時間差（以毫秒為單位）
// //         const timeUntilMidnight = midnight.getTime() - now.getTime();
    
// //         // 設置一個定時器，在午夜時執行以下操作
// //         setTimeout(() => {
// //             // 將前一天的 Job 數據保存到 Salary
// //             savePreviousDayJobToSalary(userId);
// //             // 重新安排下一次的每日保存任務（遞歸調用）
// //             scheduleDailyJobSave(userId);
// //         }, timeUntilMidnight);
// //     };
//     if (UserRole === "ADMIN") {
//         return (
//       <div className="fixed left-0 w-10 h-full bg-white text-center">
//         <div className="mt-12">
//           <Link href={`/user/${userId}/admin`} className="text-white font-bold text-xl hover:text-yellow-500 transition duration-300">
//             <div className="w-10 h-[60px] mt-1 hover:bg-gray-300 flex flex-col items-center justify-center">
//                 <FontAwesomeIcon icon={faUser} className="text-[1.3rem] text-[#1D475D] mt-2" />
//               <span className="text-xs">Admin</span>
//             </div>
//           </Link>
//           <Link href={`/user/${userId}/`} className="text-white font-bold text-xl hover:text-yellow-500 transition duration-300">
//             <div className="w-10 h-[60px] mt-1 bg-[#5f7f9495] hover:bg-gray-300 flex flex-col items-center justify-center">
//               <FontAwesomeIcon icon={faUser} className="text-[1.3rem] text-[#1D475D] mt-2" />
//               <span className="text-xs">首頁</span>
//             </div>
//           </Link>
//           <Link href={`/user/${userId}/profiles`} className="text-white font-bold text-xl hover:text-yellow-500 transition duration-300">
//             <div className="w-10 h-[60px] mt-1 hover:bg-gray-300 flex flex-col items-center justify-center">
//               <FontAwesomeIcon icon={faClipboardCheck} className="text-[1.3rem] text-[#1D475D] mt-2" />
//               <span className="text-xs">用戶資料</span>
//             </div>
//           </Link>
//           <Link href={`/user/${userId}/jobLists`} className="text-white font-bold text-xl hover:text-yellow-500 transition duration-300">
//             <div className="w-10 h-[60px] mt-1 hover:bg-gray-300 flex flex-col items-center justify-center">
//               <FontAwesomeIcon icon={faRectangleList} className="text-[1.3rem] text-[#1D475D] mt-2" />
//               <span className="text-xs"> 工作版</span>
//             </div>
//           </Link>
//           <Link href={`/user/${userId}/taskLists`} className="text-white font-bold text-xl hover:text-yellow-500 transition duration-300">
//             <div className="w-10 h-[60px] mt-1 hover:bg-gray-300 flex flex-col items-center justify-center">
//               <FontAwesomeIcon icon={faClock} className="text-[1.3rem] text-[#1D475D] mt-2" />
//               <span className="text-xs">任務版</span>
//             </div>
//           </Link>
//           <Link href={`/user/${userId}/taskLists`} className="text-white font-bold text-xl hover:text-yellow-500 transition duration-300">
//             <div className="w-10 h-[60px] mt-1 hover:bg-gray-300 flex flex-col items-center justify-center">
//               <FontAwesomeIcon icon={faClock} className="text-[1.3rem] text-[#1D475D] mt-2" />
//               <span className="text-xs">申請列表</span>
//             </div>
//           </Link>

//                         <div className="w-10 h-[60px] mt-1 hover:bg-gray-300 flex flex-col items-center justify-center">
//                             <Logout_Button />

//                         </div>
//         </div>
//       </div>



//             // <nav className="bg-gray-800">
//             //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             //         <div className="flex items-center justify-between h-16">
//             //             <div className="flex items-center">
//             //                 <div className="flex-shrink-0">
//             //                     <ul className="flex space-x-6">
//             //                         <li>
//             //                             <Link href={`/user/${userId}/admin`} className="text-white font-bold text-xl hover:text-yellow-500 transition duration-300">
//             //                                 Admin
//             //                             </Link>
//             //                         </li>
//             //                         <li>
//             //                             <Link href={`/user/${userId}/`} className="text-white font-bold text-xl hover:text-yellow-500 transition duration-300">
//             //                                 首頁
//             //                             </Link>
//             //                         </li>
//             //                         <li>
//             //                             <Link href={`/user/${userId}/profiles`} className="text-white font-bold text-xl hover:text-yellow-500 transition duration-300">
//             //                                 用戶資料
//             //                             </Link>
//             //                         </li>
//             //                         <li>
//             //                             <Link href={`/user/${userId}/jobLists`} className="text-white font-bold text-xl hover:text-yellow-500 transition duration-300">
//             //                                 工作版
//             //                             </Link>
//             //                         </li>
//             //                         <li>
//             //                             <Link href={`/user/${userId}/taskLists`} className="text-white font-bold text-xl hover:text-yellow-500 transition duration-300">
//             //                                 任務版
//             //                             </Link>
//             //                         </li>
//             //                         <li>
//             //                             <Link href={`/user/${userId}/applyLists`} className="text-white font-bold text-xl hover:text-yellow-500 transition duration-300">
//             //                                 申請列表
//             //                             </Link>
//             //                         </li>
//             //                     </ul>
//             //                 </div>
//             //             </div>
//             //             <div>
//             //                 <Logout_Button />

//             //             </div>
//             //         </div>
//             //     </div>
//             // </nav>
//         );
//     } else if (UserRole === "TEACHER") {
//         return (
//       <div className="fixed left-0 w-10 h-full bg-white text-center">
//         <div className="mt-12">
//           <Link href={`/user/${userId}/`} className="text-white font-bold text-xl hover:text-yellow-500 transition duration-300">
//             <div className="w-10 h-[60px] mt-1 bg-[#5f7f9495] hover:bg-gray-300 flex flex-col items-center justify-center">
//               <FontAwesomeIcon icon={faUser} className="text-[1.3rem] text-[#1D475D] mt-2" />
//               <span className="text-xs">首頁</span>
//             </div>
//           </Link>
//           <Link href={`/user/${userId}/profiles`} className="text-white font-bold text-xl hover:text-yellow-500 transition duration-300">
//             <div className="w-10 h-[60px] mt-1 hover:bg-gray-300 flex flex-col items-center justify-center">
//               <FontAwesomeIcon icon={faClipboardCheck} className="text-[1.3rem] text-[#1D475D] mt-2" />
//               <span className="text-xs">用戶資料</span>
//             </div>
//           </Link>
//           <Link href={`/user/${userId}/jobLists`} className="text-white font-bold text-xl hover:text-yellow-500 transition duration-300">
//             <div className="w-10 h-[60px] mt-1 hover:bg-gray-300 flex flex-col items-center justify-center">
//               <FontAwesomeIcon icon={faRectangleList} className="text-[1.3rem] text-[#1D475D] mt-2" />
//               <span className="text-xs"> 工作版</span>
//             </div>
//           </Link>
//           <Link href={`/user/${userId}/taskLists`} className="text-white font-bold text-xl hover:text-yellow-500 transition duration-300">
//             <div className="w-10 h-[60px] mt-1 hover:bg-gray-300 flex flex-col items-center justify-center">
//               <FontAwesomeIcon icon={faClock} className="text-[1.3rem] text-[#1D475D] mt-2" />
//               <span className="text-xs">任務版</span>
//             </div>
//           </Link>
//           <Link href={`/user/${userId}/taskLists`} className="text-white font-bold text-xl hover:text-yellow-500 transition duration-300">
//             <div className="w-10 h-[60px] mt-1 hover:bg-gray-300 flex flex-col items-center justify-center">
//               <FontAwesomeIcon icon={faClock} className="text-[1.3rem] text-[#1D475D] mt-2" />
//               <span className="text-xs">申請列表</span>
//             </div>
//           </Link>

//                         <div className="w-10 h-[60px] mt-1 hover:bg-gray-300 flex flex-col items-center justify-center">
//                             <Logout_Button />

//                         </div>
//         </div>
//       </div>
//         );
//     }

//     return null;
// };

// export default Navbar;




"use client";

import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserCircle,
  faClipboardCheck,
  faTasks,
  faListCheck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import { Logout_Button } from "./logout_button";

export default function Navbar() {
  const session = useSession();
  const userId = session.data?.user?.id;
  const UserRole = session.data?.user?.role;

  const navItems = [
    {
      href: `/user/${userId}/admin`,
      icon: faUser,
      label: "Admin",
      roles: ["ADMIN"],
    },
    {
      href: `/user/${userId}/`,
      icon: faHome,
      label: "首頁",
      roles: ["ADMIN", "TEACHER"],
    },
    {
      href: `/user/${userId}/profiles`,
      icon: faUserCircle,
      label: "用戶資料",
      roles: ["ADMIN", "TEACHER"],
    },
    {
      href: `/user/${userId}/jobLists`,
      icon: faClipboardCheck,
      label: "工作版",
      roles: ["ADMIN", "TEACHER"],
    },
    {
      href: `/user/${userId}/${UserRole === "ADMIN" ? "taskLists" : "taskboard"}`,
      icon: faTasks,
      label: "任務版",
      roles: ["ADMIN", "TEACHER"],
    },
    {
      href: `/user/${userId}/applyLists`,
      icon: faListCheck,
      label: "申請列表",
      roles: ["ADMIN", "TEACHER"],
    },
  ];

  if (!UserRole) {
    return null;
  }

  return (
    <div className="fixed left-0 w-10 h-full bg-white text-center font-noto-sans-tc z-50">
      <div className="mt-12">
        {navItems
          .filter((item) => item.roles.includes(UserRole))
          .map((item, index) => (
            <Link key={index} href={item.href}>
              <div className="w-10 h-[60px] mt-1 hover:bg-gray-300 flex flex-col items-center justify-center">
                <FontAwesomeIcon icon={item.icon} className="text-[1.3rem] text-[#1D475D] mt-2" />
                <span className="text-xs">{item.label}</span>
              </div>
            </Link>
          ))}
        <div className="w-10 h-[60px] mt-1 hover:bg-gray-300 flex flex-col items-center justify-center">
          <Logout_Button />
        </div>
      </div>
    </div>
  );
}
