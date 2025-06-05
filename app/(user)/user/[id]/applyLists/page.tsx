// "use client";

// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

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
//     const param = useParams();
//     console.log(param);
//     const UserId = param?.id as string;

//     const [GetApplyList, setGetJobLists] = useState<Apply[]>([]);

//     const [ searchQuery , setSearchQuery ] = useState("");
//     const [searchResults, setSearchResults] = useState([]);
//     const [ searchField , setSearchField ] = useState("all");

//     useEffect(() => {
//         const fetchapplylistsdata = async () => {
//             const res = await fetch(`/api/Apply_Lists`);
//             const data = await res.json();
//             setGetJobLists(data);
//         };
//         fetchapplylistsdata();
//     }, []);

//     console.log(GetApplyList);

//     const handleSearch =  async (event: React.ChangeEvent<HTMLInputElement>) => {
//       try {
//         const response = await fetch(`/api/Apply_Lists_search?query=${searchQuery}&field=${searchField}`);
//         const data = await response.json();
//         setSearchResults(data);
//       } catch (error) {
//         console.error("搜尋失敗:", error)
//       }
//     };
//       console.log("searchResults : ",searchResults)
//     return (
//         <>
//             applylist

//             <div className="flex items-center space-x-2">
//                           <input 
//                             type="text" 
//                             placeholder="輸入搜索內容..."
//                             value={searchQuery}
//                             onChange={(e) => setSearchQuery(e.target.value)}
//                             className="flex-1"
//                           />
//                                 <select
//                                   value={searchField}
//                                   onChange={(e) => setSearchField(e.target.value)}
//                                 >
//                                   <option value="all">所有字段</option>
//                                   <option value="apply_title">申請標題</option>
//                                   <option value="apply_task_code">申請Task_code</option>
//                                   <option value="apply_job_code">申請job_code</option>
//                                   <option value="apply_contect">申請內容</option>
//                                   <option value="apply_code">申請code</option>
//                                   <option value="applicant_name">申請人名稱</option>
//                                   <option value="apply_status">申請人狀態</option>
//                                 </select>

//                           <Button onClick={handleSearch} > 搜索 </Button>
//                         </div>
//                         {searchResults.map((apply:any)=>{
//                       return(
//                         <div  key={apply.id} >
//                         <p>結果</p>
//                         <div key={apply.id} >
//                         <Link href={`/user/${UserId}/admin/applyLists/${apply.id}`}> 
//                         申請標題 : {apply.apply_title}, 
//                         申請Task_code : {apply.apply_task_code} , 
//                         申請job_code :  {apply.apply_job_code} , 
//                         申請內容: {apply.apply_contect} , 
//                         申請code :  {apply.apply_code} , 
//                         申請人名稱:  {apply.applicant_name} ,
//                         申請人狀態:   {apply.apply_status ? "已審" : "未審"}
//                         </Link>

//                         </div>
//                         </div>

//                       )
//                     })}


//             {GetApplyList?.map((d) => {
//                 if (d.apply_user_id === UserId) {
//                     return (
//                         <Link href={`/user/${UserId}/applyLists/${d.id}`} key={d.id}>
//                             <div>
//                                 {d.apply_code}
//                                 <br />
//                                 {d.apply_title}
//                                 <br />
//                                 {d.apply_contect}
//                                 <br />
//                                 {d.apply_task}
//                             </div>
//                         </Link>
//                     );
//                 }
//                 return null; // 如果條件不滿足，返回 null
//             })}
//         </>
//     );
// };

// export default ApplyListsPage;


// "use client";

// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

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
//   console.log(param);
//   const UserId = param?.id as string;

//   const [GetApplyList, setGetApplyList] = useState<Apply[]>([]); // 修正：變數名稱應為 setGetApplyList
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<Apply[]>([]);
//   const [searchField, setSearchField] = useState("all");

//   useEffect(() => {
//     const fetchApplyListsData = async () => {
//       try {
//         const res = await fetch(`/api/Apply_Lists`);
//         if (!res.ok) {
//           throw new Error(`請求失敗: ${res.status}`);
//         }
//         const data: Apply[] = await res.json();
//         setGetApplyList(data); // 修正：使用 setGetApplyList
//       } catch (error) {
//         console.error("獲取申請列表失敗:", error);
//       }
//     };
//     fetchApplyListsData();
//   }, []);

//   console.log("GetApplyList:", GetApplyList);

//   // 修改 handleSearch，不依賴 event 參數
//   const handleSearch = async () => {
//     try {
//       const response = await fetch(`/api/Apply_Lists_search?query=${encodeURIComponent(searchQuery)}&field=${encodeURIComponent(searchField)}`);
//       if (!response.ok) {
//         throw new Error(`搜尋失敗: ${response.status}`);
//       }
//       const data: Apply[] = await response.json();
//       setSearchResults(data);
//     } catch (error) {
//       console.error("搜尋失敗:", error);
//     }
//   };

//   console.log("searchResults:", searchResults);

//   return (
//     <>
//     <Link href={`/user/${UserId}/`}>
//       返回首頁
//     </Link>

//       <div>applylist</div>

//       <div className="flex items-center space-x-2">
//         <input
//           type="text"
//           placeholder="輸入搜索內容..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="flex-1"
//         />
//         <select
//           value={searchField}
//           onChange={(e) => setSearchField(e.target.value)}
//         >
//           <option value="all">所有字段</option>
//           <option value="apply_title">申請標題</option>
//           <option value="apply_task_code">申請Task_code</option>
//           <option value="apply_job_code">申請job_code</option>
//           <option value="apply_contect">申請內容</option>
//           <option value="apply_code">申請code</option>
//           <option value="applicant_name">申請人名稱</option>
//           <option value="apply_status">申請人狀態</option>
//         </select>

//         <Button onClick={handleSearch}>搜索</Button>
//       </div>

//       {searchResults.length > 0 ? (
//         searchResults.map((apply) => (
//           <div key={apply.id}>
//             <p>結果</p>
//             <Link href={`/user/${UserId}/admin/applyLists/${apply.id}`}>
//               申請標題: {apply.apply_title}, 申請Task_code: {apply.apply_task_code}, 申請job_code: {apply.apply_job_code}, 申請內容: {apply.apply_contect}, 申請code: {apply.apply_code}, 申請人名稱: {apply.applicant_name}, 申請人狀態: {apply.apply_status ? "已審" : "未審"}
//             </Link>
//           </div>
//         ))
//       ) : (
//         <p>無搜索結果</p>
//       )}

//       {GetApplyList?.map((d) => {
//         if (d.apply_user_id === UserId) {
//           return (
//             <Link href={`/user/${UserId}/applyLists/${d.id}`} key={d.id}>
//               <div>
//                 {d.apply_code}
//                 <br />
//                 {d.apply_title}
//                 <br />
//                 {d.apply_contect}
//                 <br />
//                 {d.apply_task}
//               </div>
//             </Link>
//           );
//         }
//         return null;
//       })}
//     </>
//   );
// };

// export default ApplyListsPage;


"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faUser,
  faClipboardCheck,
  faRectangleList,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

interface Apply {
  id: string;
  apply_user_id: string;
  apply_code: string;
  apply_title: string;
  apply_contect: string;
  apply_task: string;
  apply_task_code: string;
  apply_job_code: string;
  applicant_name: string;
  apply_status: boolean;
}

const ApplyListsPage = () => {
  const param = useParams();
  const UserId = param?.id as string;

  const [GetApplyList, setGetApplyList] = useState<Apply[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Apply[]>([]);
  const [searchField, setSearchField] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApply, setSelectedApply] = useState<Apply | null>(null);

  useEffect(() => {
    const fetchApplyListsData = async () => {
      try {
        const res = await fetch(`/api/Apply_Lists`);
        if (!res.ok) {
          throw new Error(`請求失敗: ${res.status}`);
        }
        const data: Apply[] = await res.json();
        setGetApplyList(data);
      } catch (error) {
        console.error("獲取申請列表失敗:", error);
      }
    };
    fetchApplyListsData();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `/api/Apply_Lists_search?query=${encodeURIComponent(
          searchQuery
        )}&field=${encodeURIComponent(searchField)}`
      );
      if (!response.ok) {
        throw new Error(`搜尋失敗: ${response.status}`);
      }
      const data: Apply[] = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("搜尋失敗:", error);
    }
  };

  const openModal = (apply: Apply) => {
    setSelectedApply(apply);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApply(null);
  };

  return (
    
    <div className="relative min-h-screen bg-background/60">
      {/* Navbar */}


      {/* Content Right */}
      <div className="ml-10 p-4 w-[calc(100%-40px)]">
        {/* Back to Home Link */}
        <Link href={`/user/${UserId}/`} className="text-primary-1 hover:underline mb-4 inline-block">
          返回首頁
        </Link>

        {/* Search Bar */}
        <div className="flex items-center space-x-2 mb-4">
          <input
            type="text"
            placeholder="搜尋關鍵字"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 h-8 border border-gray-200 rounded-md px-2 text-sm focus:outline-none"
          />
          <select
            value={searchField}
            onChange={(e) => setSearchField(e.target.value)}
            className="h-8 border border-gray-200 rounded-md px-2 text-sm focus:outline-none"
          >
            <option value="all">所有字段</option>
            <option value="apply_title">申請標題</option>
            <option value="apply_task_code">申請Task_code</option>
            <option value="apply_job_code">申請job_code</option>
            <option value="apply_contect">申請內容</option>
            <option value="apply_code">申請code</option>
            <option value="applicant_name">申請人名稱</option>
            <option value="apply_status">申請人狀態</option>
          </select>
          <Button
            onClick={handleSearch}
            className="bg-primary-2 text-white text-sm px-4 py-1 rounded-md hover:bg-black"
          >
            搜尋
          </Button>
        </div>

        {/* Buttons and Status */}
        <div className="flex items-center mb-4">
          <Link href="#">
            <Button className="bg-primary-1 text-white text-sm px-4 py-1 rounded-md mr-2 shadow-md hover:bg-black">
              工作
            </Button>
          </Link>
          <Link href="#">
            <Button className="bg-primary-2 text-white text-sm px-4 py-1 rounded-md shadow-md hover:bg-black">
              任務
            </Button>
          </Link>
          <div className="flex items-center space-x-4 ml-4">
            <span className="text-sm text-gray-700">未批核(0)</span>
            <span className="text-sm text-green-600">已批核(0)</span>
            <span className="text-sm text-red-600">拒絕(0)</span>
          </div>
        </div>

        {/* Data Table */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="grid grid-cols-5 gap-2 bg-gray-200 text-black font-medium text-sm p-2">
            <div className="border border-white/50">工作標題</div>
            <div className="border border-white/50">學校名稱</div>
            <div className="border border-white/50">地區</div>
            <div className="border border-white/50">工作編號</div>
            <div className="border border-white/50">狀態</div>
          </div>
          {searchResults.length > 0
            ? searchResults.map((apply) => (
                <div
                  key={apply.id}
                  className="grid grid-cols-5 gap-2 bg-white text-sm p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => openModal(apply)}
                >
                  <div className="border border-white/50">{apply.apply_title}</div>
                  <div className="border border-white/50">{apply.applicant_name}</div>
                  <div className="border border-white/50">-</div>
                  <div className="border border-white/50">{apply.apply_job_code}</div>
                  <div className="border border-white/50">
                    {apply.apply_status ? "已批核" : "未批核"}
                  </div>
                </div>
              ))
            : GetApplyList.filter((d) => d.apply_user_id === UserId).map((apply) => (
                <div
                  key={apply.id}
                  className="grid grid-cols-5 gap-2 bg-white text-sm p-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => openModal(apply)}
                >
                  <div className="border border-white/50">{apply.apply_title}</div>
                  <div className="border border-white/50">{apply.applicant_name}</div>
                  <div className="border border-white/50">-</div>
                  <div className="border border-white/50">{apply.apply_job_code}</div>
                  <div className="border border-white/50">
                    {apply.apply_status ? "已批核" : "未批核"}
                  </div>
                </div>
              ))}
          {searchResults.length === 0 && GetApplyList.length === 0 && (
            <p className="text-center text-sm text-gray-500 mt-4">無搜索結果</p>
          )}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md w-4/5 max-w-lg border border-gray-300">
              <span
                className="float-right text-2xl text-gray-400 hover:text-black cursor-pointer"
                onClick={closeModal}
              >
                &times;
              </span>
              {selectedApply && (
                <div className="text-sm">
                  <p><strong>申請標題:</strong> {selectedApply.apply_title}</p>
                  <p><strong>申請人:</strong> {selectedApply.applicant_name}</p>
                  <p><strong>工作編號:</strong> {selectedApply.apply_job_code}</p>
                  <p><strong>內容:</strong> {selectedApply.apply_contect}</p>
                  <p><strong>狀態:</strong> {selectedApply.apply_status ? "已批核" : "未批核"}</p>
                  <Link
                    href={`/user/${UserId}/applyLists/${selectedApply.id}`}
                    className="text-primary-1 hover:underline mt-2 inline-block"
                  >
                    查看詳情
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplyListsPage;