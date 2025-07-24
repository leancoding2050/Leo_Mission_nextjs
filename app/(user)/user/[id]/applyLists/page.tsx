'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faRedo, faTimes, faBriefcase, faTasks } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { useParams } from 'next/navigation';

interface Apply {
  id: string;
  apply_user_id: string;
  apply_code: string;
  apply_title: string;
  apply_contect: string;
  apply_task?: string; // 可選字段
  apply_task_code: string;
  apply_job_code: string;
  applicant_name: string;
  apply_status: boolean;
}

const fetchWithFallback = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(url, { ...options, cache: 'no-store' });
    if (!response.ok) throw new Error(`請求失敗: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error(`從 ${url} 獲取數據失敗:`, err);
    throw new Error('無法獲取數據，請檢查網路或伺服器狀態。');
  }
};

const ApplyListsPage = () => {
  const { data: session } = useSession();
  const param = useParams();
  const UserId = param?.id as string;

  const [GetApplyList, setGetApplyList] = useState<Apply[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Apply[]>([]);
  const [searchField, setSearchField] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApply, setSelectedApply] = useState<Apply | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchApplyListsData = async () => {
  //     try {
  //       setIsLoading(true);
  //       const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  //       const data = await fetchWithFallback(`${baseUrl}/api/Apply_Lists`);
  //       setGetApplyList(data || []);
  //       setError(null);
  //     } catch (error) {
  //       console.error('獲取申請列表失敗:', error);
  //       setError('無法載入申請列表，請檢查網路連線或稍後重試。');
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchApplyListsData();
  // }, []);

  useEffect(() => {
  const fetchApplyListsData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/Apply_Lists`);
      if (!res.ok) {
        throw new Error("無法獲取申請列表");
      }
      const data: Apply[] = await res.json();
      setGetApplyList(data);
      setError(null);
    } catch (error) {
      console.error("獲取申請列表失敗:", error);
      setError("無法載入申請列表，請檢查網路連線或稍後重試。");
    } finally {
      setIsLoading(false);
    }
  };
  
    fetchApplyListsData();
 
}, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = await fetchWithFallback(
        `/api/Apply_Lists_search?query=${encodeURIComponent(searchQuery)}&field=${encodeURIComponent(searchField)}`
      );
      setSearchResults(data || []);
      setError(null);
    } catch (error) {
      console.error('搜尋失敗:', error);
      setError('搜尋失敗，請檢查網路連線或稍後重試。');
    } finally {
      setIsLoading(false);
    }
  };


  const handleReset = () => {
    setSearchQuery('');
    setSearchResults([]);
    setSearchField('all');
  };

  const openModal = (apply: Apply) => {
    setSelectedApply(apply);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApply(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-grey-1 bg-opacity-60 font-noto-sans-tc">
        <Navbar session={session} />
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="bg-white shadow-light rounded-lg p-4 sm:p-6">
            <div className="space-y-2 sm:space-y-3 animate-pulse">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-12 bg-grey-2 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-grey-1 bg-opacity-60 font-noto-sans-tc">
        <Navbar session={session} />
        <div className="text-center text-red text-sm sm:text-base animate-fade-in">
          {error}
        </div>
      </div>
    );
  }

  if (!UserId) {
    return (
      <div className="min-h-screen bg-grey-1 bg-opacity-60 font-noto-sans-tc">
        <Navbar session={session} />
        <div className="text-center text-grey-9 text-sm sm:text-base animate-fade-in">
          無效的用戶 ID
        </div>
      </div>
    );
  }

  const displayData = searchResults.length > 0 ? searchResults : GetApplyList.filter((d) => d.apply_user_id === UserId);

  const pendingCount = displayData.filter((apply) => !apply.apply_status).length;
  const approvedCount = displayData.filter((apply) => apply.apply_status).length;
  const rejectedCount = 0; // 假設無拒絕狀態，需根據實際數據調整


  console.log("GetApplyList : ", GetApplyList)

  return (
    <div className="min-h-screen bg-grey-1 bg-opacity-60 font-noto-sans-tc">
      <Navbar session={session} />
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="mb-4 sm:mb-6">
          <Link
            href={`/user/${UserId}/`}
            className="text-primary-2 hover:text-primary-1 text-sm sm:text-base hover:underline"
            aria-label="返回首頁"
          >
            返回首頁
          </Link>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-1 mt-2 sm:mt-4">
            申請列表
          </h1>
        </div>
        <div className="bg-white shadow-light rounded-lg p-4 sm:p-6">
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6"
          >
            <input
              type="text"
              placeholder="輸入搜尋內容..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 w-full sm:max-w-md p-2 sm:p-3 border border-grey-2 rounded-lg bg-white text-sm sm:text-base text-grey-9 focus:outline-none focus:ring-2 focus:ring-primary-2"
              aria-label="搜尋申請"
              required
            />
            <select
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
              className="w-full sm:w-40 p-2 sm:p-3 border border-grey-2 rounded-lg bg-white text-sm sm:text-base text-grey-9 focus:outline-none focus:ring-2 focus:ring-primary-2"
              aria-label="選擇搜尋字段"
            >
              <option value="all">所有字段</option>
              <option value="apply_title">申請標題</option>
              <option value="apply_task_code">申請任務編號</option>
              <option value="apply_job_code">申請工作編號</option>
              <option value="apply_contect">申請內容</option>
              <option value="apply_code">申請編號</option>
              <option value="applicant_name">申請人名稱</option>
              <option value="apply_status">申請狀態</option>
            </select>
            <div className="w-full sm:w-auto h-12 sm:h-14 flex items-center justify-center sm:flex-col px-2 sm:px-0 hover:bg-grey-2">
              <button
                type="submit"
                className="flex items-center sm:flex-col justify-center w-full h-full focus:outline-none"
              >
                <FontAwesomeIcon
                  icon={faSearch}
                  className="text-base sm:text-lg text-primary-1"
                />
                <span className="ml-2 sm:ml-0 sm:mt-1 text-xs sm:text-sm text-primary-1 hidden sm:block">
                  搜尋
                </span>
              </button>
            </div>
            <div className="w-full sm:w-auto h-12 sm:h-14 flex items-center justify-center sm:flex-col px-2 sm:px-0 hover:bg-grey-2">
              <button
                onClick={handleReset}
                className="flex items-center sm:flex-col justify-center w-full h-full focus:outline-none"
              >
                <FontAwesomeIcon
                  icon={faRedo}
                  className="text-base sm:text-lg text-primary-1"
                />
                <span className="ml-2 sm:ml-0 sm:mt-1 text-xs sm:text-sm text-primary-1 hidden sm:block">
                  重置搜尋
                </span>
              </button>
            </div>
          </form>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
            <Link href={`/user/${UserId}/jobLists`} className="w-full sm:w-auto">
              <div className="w-full sm:w-auto h-12 sm:h-14 flex items-center justify-center sm:flex-col px-2 sm:px-0 hover:bg-grey-2">
                <button className="flex items-center sm:flex-col justify-center w-full h-full focus:outline-none">
                  <FontAwesomeIcon
                    icon={faBriefcase}
                    className="text-base sm:text-lg text-primary-1"
                  />
                  <span className="ml-2 sm:ml-0 sm:mt-1 text-xs sm:text-sm text-primary-1 hidden sm:block">
                    工作
                  </span>
                </button>
              </div>
            </Link>
            <Link href={`/user/${UserId}/taskLists`} className="w-full sm:w-auto">
              <div className="w-full sm:w-auto h-12 sm:h-14 flex items-center justify-center sm:flex-col px-2 sm:px-0 hover:bg-grey-2">
                <button className="flex items-center sm:flex-col justify-center w-full h-full focus:outline-none">
                  <FontAwesomeIcon
                    icon={faTasks}
                    className="text-base sm:text-lg text-primary-1"
                  />
                  <span className="ml-2 sm:ml-0 sm:mt-1 text-xs sm:text-sm text-primary-1 hidden sm:block">
                    任務
                  </span>
                </button>
              </div>
            </Link>
            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
              <span className="text-sm sm:text-base text-grey-9">未批核 ({pendingCount})</span>
              <span className="text-sm sm:text-base text-green">已批核 ({approvedCount})</span>
              <span className="text-sm sm:text-base text-red">拒絕 ({rejectedCount})</span>
            </div>
          </div>
          {displayData.length === 0 ? (
            <div className="text-center text-grey-9 text-sm sm:text-base">
              沒有數據
            </div>
          ) : (
            <div className="space-y-2 sm:space-y-3">
              {displayData.map((apply) => (
                <div
                  key={apply.id}
                  className="border border-grey-2 p-3 sm:p-4 rounded-lg hover:bg-grey-2 cursor-pointer"
                  onClick={() => openModal(apply)}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 sm:gap-4">
                    <div className="text-grey-9 font-medium text-sm sm:text-base">申請標題</div>
                    <div className="text-grey-9 text-sm sm:text-base">{apply.apply_title}</div>
                    <div className="text-grey-9 font-medium text-sm sm:text-base">申請人</div>
                    <div className="text-grey-9 text-sm sm:text-base">{apply.applicant_name}</div>
                    <div className="text-grey-9 font-medium text-sm sm:text-base">地區</div>
                    <div className="text-grey-9 text-sm sm:text-base">-</div>
                    <div className="text-grey-9 font-medium text-sm sm:text-base">工作編號</div>
                    <div className="text-grey-9 text-sm sm:text-base">{apply.apply_job_code}</div>
                    <div className="text-grey-9 font-medium text-sm sm:text-base">狀態</div>
                    <div className="text-grey-9 text-sm sm:text-base">
                      {apply.apply_status ? '已批核' : '未批核'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {isModalOpen && selectedApply && (
        <div className="fixed inset-0 bg-grey-9/40 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white p-4 sm:p-6 rounded-lg w-full max-w-md sm:max-w-lg border border-grey-2">
            <button
              onClick={closeModal}
              className="float-right text-xl sm:text-2xl text-grey-9 hover:text-primary-1 focus:outline-none"
              aria-label="關閉模態框"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className="text-sm sm:text-base">
              <h2 className="text-lg sm:text-xl font-semibold text-primary-1 mb-2 sm:mb-3">
                申請詳情
              </h2>
              <div className="grid grid-cols-1 gap-2 sm:gap-3">
                <div className="text-grey-9 font-medium">申請標題</div>
                <div className="text-grey-9">{selectedApply.apply_title}</div>
                <div className="text-grey-9 font-medium">申請人</div>
                <div className="text-grey-9">{selectedApply.applicant_name}</div>
                <div className="text-grey-9 font-medium">工作編號</div>
                <div className="text-grey-9">{selectedApply.apply_job_code}</div>
                <div className="text-grey-9 font-medium">內容</div>
                <div className="text-grey-9">{selectedApply.apply_contect}</div>
                <div className="text-grey-9 font-medium">狀態</div>
                <div className="text-grey-9">{selectedApply.apply_status ? '已批核' : '未批核'}</div>
                {selectedApply.apply_task && (
                  <>
                    <div className="text-grey-9 font-medium">任務</div>
                    <div className="text-grey-9">{selectedApply.apply_task}</div>
                  </>
                )}
              </div>
              <Link
                href={`/user/${UserId}/applyLists/${selectedApply.id}`}
                className="text-primary-2 hover:text-primary-1 text-sm sm:text-base hover:underline mt-2 sm:mt-3 inline-block"
                aria-label={`查看申請 ${selectedApply.apply_title} 詳情`}
              >
                查看詳情
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplyListsPage;

// "use client";

// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import {
// //   faCalendarDays,
// //   faUser,
// //   faClipboardCheck,
// //   faRectangleList,
// //   faClock,
// // } from "@fortawesome/free-solid-svg-icons";

// interface Apply {
//   id: string;
//   apply_user_id: string;
//   apply_code: string;
//   apply_title: string;
//   apply_contect: string;
//   apply_task: string;
//   apply_task_code: string;
//   apply_job_code: string;
//   applicant_name: string;
//   apply_status: boolean;
// }

// const ApplyListsPage = () => {
//   const param = useParams();
//   const UserId = param?.id as string;

//   const [GetApplyList, setGetApplyList] = useState<Apply[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<Apply[]>([]);
//   const [searchField, setSearchField] = useState("all");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedApply, setSelectedApply] = useState<Apply | null>(null);

//   useEffect(() => {
//     const fetchApplyListsData = async () => {
//       try {
//         const res = await fetch(`/api/Apply_Lists`);
//         if (!res.ok) {
//           throw new Error(`請求失敗: ${res.status}`);
//         }
//         const data: Apply[] = await res.json();
//         setGetApplyList(data);
//       } catch (error) {
//         console.error("獲取申請列表失敗:", error);
//       }
//     };
//     fetchApplyListsData();
//   }, []);

//   const handleSearch = async () => {
//     try {
//       const response = await fetch(
//         `/api/Apply_Lists_search?query=${encodeURIComponent(
//           searchQuery
//         )}&field=${encodeURIComponent(searchField)}`
//       );
//       if (!response.ok) {
//         throw new Error(`搜尋失敗: ${response.status}`);
//       }
//       const data: Apply[] = await response.json();
//       setSearchResults(data);
//     } catch (error) {
//       console.error("搜尋失敗:", error);
//     }
//   };

//   const openModal = (apply: Apply) => {
//     setSelectedApply(apply);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedApply(null);
//   };

//   return (
    
//     <div className="relative min-h-screen bg-background/60">
//       {/* Navbar */}


//       {/* Content Right */}
//       <div className="ml-10 p-4 w-[calc(100%-40px)]">
//         {/* Back to Home Link */}
//         <Link href={`/user/${UserId}/`} className="text-primary-1 hover:underline mb-4 inline-block">
//           返回首頁
//         </Link>

//         {/* Search Bar */}
//         <div className="flex items-center space-x-2 mb-4">
//           <input
//             type="text"
//             placeholder="搜尋關鍵字"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-64 h-8 border border-gray-200 rounded-md px-2 text-sm focus:outline-none"
//           />
//           <select
//             value={searchField}
//             onChange={(e) => setSearchField(e.target.value)}
//             className="h-8 border border-gray-200 rounded-md px-2 text-sm focus:outline-none"
//           >
//             <option value="all">所有字段</option>
//             <option value="apply_title">申請標題</option>
//             <option value="apply_task_code">申請Task_code</option>
//             <option value="apply_job_code">申請job_code</option>
//             <option value="apply_contect">申請內容</option>
//             <option value="apply_code">申請code</option>
//             <option value="applicant_name">申請人名稱</option>
//             <option value="apply_status">申請人狀態</option>
//           </select>
//           <Button
//             onClick={handleSearch}
//             className="bg-primary-2 text-white text-sm px-4 py-1 rounded-md hover:bg-black"
//           >
//             搜尋
//           </Button>
//         </div>

//         {/* Buttons and Status */}
//         <div className="flex items-center mb-4">
//           <Link href="#">
//             <Button className="bg-primary-1 text-white text-sm px-4 py-1 rounded-md mr-2 shadow-md hover:bg-black">
//               工作
//             </Button>
//           </Link>
//           <Link href="#">
//             <Button className="bg-primary-2 text-white text-sm px-4 py-1 rounded-md shadow-md hover:bg-black">
//               任務
//             </Button>
//           </Link>
//           <div className="flex items-center space-x-4 ml-4">
//             <span className="text-sm text-gray-700">未批核(0)</span>
//             <span className="text-sm text-green-600">已批核(0)</span>
//             <span className="text-sm text-red-600">拒絕(0)</span>
//           </div>
//         </div>

//         {/* Data Table */}
//         <div className="w-full max-w-4xl mx-auto">
//           <div className="grid grid-cols-5 gap-2 bg-gray-200 text-black font-medium text-sm p-2">
//             <div className="border border-white/50">工作標題</div>
//             <div className="border border-white/50">學校名稱</div>
//             <div className="border border-white/50">地區</div>
//             <div className="border border-white/50">工作編號</div>
//             <div className="border border-white/50">狀態</div>
//           </div>
//           {searchResults.length > 0
//             ? searchResults.map((apply) => (
//                 <div
//                   key={apply.id}
//                   className="grid grid-cols-5 gap-2 bg-white text-sm p-2 cursor-pointer hover:bg-gray-100"
//                   onClick={() => openModal(apply)}
//                 >
//                   <div className="border border-white/50">{apply.apply_title}</div>
//                   <div className="border border-white/50">{apply.applicant_name}</div>
//                   <div className="border border-white/50">-</div>
//                   <div className="border border-white/50">{apply.apply_job_code}</div>
//                   <div className="border border-white/50">
//                     {apply.apply_status ? "已批核" : "未批核"}
//                   </div>
//                 </div>
//               ))
//             : GetApplyList.filter((d) => d.apply_user_id === UserId).map((apply) => (
//                 <div
//                   key={apply.id}
//                   className="grid grid-cols-5 gap-2 bg-white text-sm p-2 cursor-pointer hover:bg-gray-100"
//                   onClick={() => openModal(apply)}
//                 >
//                   <div className="border border-white/50">{apply.apply_title}</div>
//                   <div className="border border-white/50">{apply.applicant_name}</div>
//                   <div className="border border-white/50">-</div>
//                   <div className="border border-white/50">{apply.apply_job_code}</div>
//                   <div className="border border-white/50">
//                     {apply.apply_status ? "已批核" : "未批核"}
//                   </div>
//                 </div>
//               ))}
//           {searchResults.length === 0 && GetApplyList.length === 0 && (
//             <p className="text-center text-sm text-gray-500 mt-4">無搜索結果</p>
//           )}
//         </div>

//         {/* Modal */}
//         {isModalOpen && (
//           <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//             <div className="bg-white p-6 rounded-md w-4/5 max-w-lg border border-gray-300">
//               <span
//                 className="float-right text-2xl text-gray-400 hover:text-black cursor-pointer"
//                 onClick={closeModal}
//               >
//                 &times;
//               </span>
//               {selectedApply && (
//                 <div className="text-sm">
//                   <p><strong>申請標題:</strong> {selectedApply.apply_title}</p>
//                   <p><strong>申請人:</strong> {selectedApply.applicant_name}</p>
//                   <p><strong>工作編號:</strong> {selectedApply.apply_job_code}</p>
//                   <p><strong>內容:</strong> {selectedApply.apply_contect}</p>
//                   <p><strong>狀態:</strong> {selectedApply.apply_status ? "已批核" : "未批核"}</p>
//                   <Link
//                     href={`/user/${UserId}/applyLists/${selectedApply.id}`}
//                     className="text-primary-1 hover:underline mt-2 inline-block"
//                   >
//                     查看詳情
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ApplyListsPage;