// "use client";

// import { Button } from "@/components/ui/button";
// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import { useEffect , useState } from "react";

// const userLists = () => {

//         const session = useSession() ;
//         const userId = session.data?.user?.id ;
//         const [ GetUserLists , setGetUserLists ] = useState([]) ;   
        
//         const [ searchQuery , setSearchQuery ] = useState("");
//         const [searchResults, setSearchResults] = useState([]);
//         const [ searchField , setSearchField ] = useState("all");

//         useEffect(()=>{
//             const getUserListsData = async () => {
//                 const res = await fetch('/api/User_Lists');
//                 if(!res){
//                     throw new Error("斷線!")
//                 }
//                 const result = await res.json() ;
//                 setGetUserLists(result) ;
//             }
//             getUserListsData()
//         },[userId])

//         console.log("GetUserLists:",GetUserLists) ;

//         const handleSearch =  async (event: React.ChangeEvent<HTMLInputElement>) => {
//             try {
//               const response = await fetch(`/api/User_Lists_search?query=${searchQuery}&field=${searchField}`);
//               const data = await response.json();
//               setSearchResults(data);
//             } catch (error) {
//               console.error("搜尋失敗:", error)
//             }
//           } ;

//           console.log("searchResults : ",searchResults)
//                 return (
//                 <div>
//                     <Link href={`/user/${userId}/admin`}> Admin主頁 </Link>

//                     <Link href={`/user/${userId}/admin/userLists/createuser`}> CreateUser </Link>
                    
//                     <br />
//                     userLists
//                     <br />


//                     <div className="flex items-center space-x-2">
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
//                                   <option value="username">用戶名稱</option>
//                                   <option value="nickname">暱稱</option>
//                                   <option value="email">電子郵件</option>
//                                   <option value="role">權限</option>
//                                   <option value="phone">電話</option>
//                                   <option value="area">地區</option>
//                                   <option value="place">地方</option>
//                                   <option value="subject">科目</option>
//                                   <option value="SCRC">SCRC</option>
//                                   <option value="isLogin">是否登入</option>
//                                   <option value="isStaff">是否職員</option>
//                                 </select>

//                           <Button onClick={handleSearch} > 搜索 </Button>
//                         </div>
//                         {searchResults?.map((job)=>{
//                       return(
//                         <div  key={job.id} >
//                         <p>結果</p>
//                         <div key={job.id} >
//                             用戶名稱 : {job.username} , 
//                             暱稱 :  {job.nickname} , 
//                             電子郵件: {job.email} , 
//                             權限 :  {job.role} , 
//                             電話:  {job.phone} ,
//                             地區:   {job.area}
//                             地方 : {job.place} , 
//                             科目 :  {job.subject} , 
//                             SCRC: {job.area} , 
//                             是否登入 :  {job.isLogin} , 
//                             是否職員:  {job.isStaff} ,


//                         </div>
//                         </div>

//                       )
//                     })}


//                     {
                    
//                     GetUserLists?.map((d)=>{
//                         if(d.isAdmin === false || d.isStaff === false ){
//                             return(
//                                 <div key={d.id}>
//                                     <Link href={`/user/${userId}/admin/userLists/${d.id}`}> 用戶名稱 : {d.username}  | nickname : {d.nickname} </Link>
//                                 </div>
//                             ) 
//                         }

//                     })
                    
//                     }

                    

//                 </div>
//             )
        
    

// }

// export default userLists

// "use client";

// import { Button } from "@/components/ui/button";
// import { useSession } from "next-auth/react";
// import Link from "next/link";
// import { useEffect, useState } from "react";

// // 定義 User 類型，根據 Prisma 模型
// interface User {
//   id: string;
//   username: string;
//   nickname: string;
//   email: string;
//   role: "ADMIN" | "TEACHER";
//   phone: string;
//   area: string;
//   place: string;
//   subject: string;
//   SCRC: string;
//   isLogin: boolean;
//   isStaff: boolean;
//   isAdmin: boolean;
// }

// const UserLists = () => {
//   const session = useSession();
//   const userId = session.data?.user?.id as string | undefined;

//   const [getUserLists, setGetUserLists] = useState<User[]>([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<User[]>([]);
//   const [searchField, setSearchField] = useState("all");
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const getUserListsData = async () => {
//       try {
//         const res = await fetch("/api/User_Lists");
//         if (!res.ok) throw new Error(`請求失敗: ${res.status}`);
//         const result: User[] = await res.json();
//         setGetUserLists(result);
//         setError("");
//       } catch (err: unknown) {
//         setError(err instanceof Error ? err.message : "無法加載用戶列表");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     getUserListsData();
//   }, []); // 移除 userId 依賴，因為 API 不使用 userId

//   const handleSearch = async () => {
//     try {
//       const response = await fetch(`/api/User_Lists_search?query=${searchQuery}&field=${searchField}`);
//       if (!response.ok) throw new Error(`搜索失敗: ${response.status}`);
//       const data: User[] = await response.json();
//       setSearchResults(data);
//       setError("");
//     } catch (err: unknown) {
//       setError(err instanceof Error ? err.message : "搜索失敗");
//     }
//   };

//   if (session.status === "loading") return <div className="p-4 text-gray-500">正在驗證用戶...</div>;
//   if (session.status === "unauthenticated") return <div className="p-4 text-red-500">請先登錄</div>;
//   if (isLoading) return <div className="p-4 text-gray-500">正在加載...</div>;
//   if (error) return <div className="p-4 text-red-500">錯誤: {error}</div>;

//   return (
//     <div className="p-4">
//       <Link href={`/user/${userId}/admin`} className="text-blue-500 hover:underline">
//         Admin主頁
//       </Link>
//       <div className="mt-2">
//         <Link href={`/user/${userId}/admin/userLists/createuser`} className="text-blue-500 hover:underline">
//           創建用戶
//         </Link>
//       </div>
//       <h1 className="text-xl font-bold mt-4">用戶列表</h1>

//       <div className="flex items-center space-x-2 mt-4">
//         <input
//           type="text"
//           placeholder="輸入搜索內容..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="flex-1 p-2 border rounded"
//         />
//         <select
//           value={searchField}
//           onChange={(e) => setSearchField(e.target.value)}
//           className="p-2 border rounded"
//         >
//           <option value="all">所有字段</option>
//           <option value="username">用戶名稱</option>
//           <option value="nickname">暱稱</option>
//           <option value="email">電子郵件</option>
//           <option value="role">權限</option>
//           <option value="phone">電話</option>
//           <option value="area">地區</option>
//           <option value="place">地點</option>
//           <option value="subject">科目</option>
//           <option value="SCRC">SCRC</option>
//           <option value="isLogin">是否登錄</option>
//           <option value="isStaff">是否職員</option>
//         </select>
//         <Button onClick={handleSearch}>搜索</Button>
//       </div>

//       {searchResults.length > 0 ? (
//         <div className="mt-4">
//           <p className="font-semibold">搜索結果</p>
//           {searchResults.map((user) => (
//             <div key={user.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
//               <p>用戶名稱: {user.username}</p>
//               <p>暱稱: {user.nickname}</p>
//               <p>電子郵件: {user.email}</p>
//               <p>權限: {user.role}</p>
//               <p>電話: {user.phone}</p>
//               <p>地區: {user.area}</p>
//               <p>地點: {user.place}</p>
//               <p>科目: {user.subject}</p>
//               <p>SCRC: {user.SCRC}</p>
//               <p>是否登錄: {user.isLogin ? "是" : "否"}</p>
//               <p>是否職員: {user.isStaff ? "是" : "否"}</p>
//             </div>
//           ))}
//         </div>
//       ) : searchQuery ? (
//         <p className="mt-4 text-gray-500">沒有搜索結果</p>
//       ) : null}

//       {getUserLists.length === 0 ? (
//         <p className="mt-4 text-gray-500">沒有用戶數據</p>
//       ) : (
//         <div className="mt-4">
//           {getUserLists.map((user) => {
//             // 僅顯示非管理員和非職員的用戶
//             if (!user.isAdmin && !user.isStaff) {
//               return (
//                 <div
//                   key={user.id}
//                   className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
//                 >
//                   <Link href={`/user/${userId}/admin/userLists/${user.id}`}>
//                     用戶名稱: {user.username} | 暱稱: {user.nickname}
//                   </Link>
//                 </div>
//               );
//             }
//             return null;
//           })}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserLists;



"use client";

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faUser, faClipboardCheck, faRectangleList, faClock } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

// 定義 User 類型，根據 Prisma 模型
interface User {
  id: string;
  username: string;
  nickname: string;
  email: string;
  role: 'ADMIN' | 'TEACHER';
  phone: string;
  area: string;
  place: string;
  subject: string;
  SCRC: string;
  isLogin: boolean;
  isStaff: boolean;
  isAdmin: boolean;
}

export default function UserList() {
  const session = useSession();
  const userId = session.data?.user?.id as string | undefined;

  const [getUserLists, setGetUserLists] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [searchField, setSearchField] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getUserListsData = async () => {
      try {
        const res = await fetch('/api/User_Lists');
        if (!res.ok) throw new Error(`請求失敗: ${res.status}`);
        const result: User[] = await res.json();
        setGetUserLists(result);
        setError('');
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : '無法加載用戶列表');
      } finally {
        setIsLoading(false);
      }
    };
    getUserListsData();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/User_Lists_search?query=${searchQuery}&field=${searchField}`);
      if (!response.ok) throw new Error(`搜索失敗: ${response.status}`);
      const data: User[] = await response.json();
      setSearchResults(data);
      setError('');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '搜索失敗');
    }
  };

  if (session.status === 'loading') return <div className="p-4 text-gray-500">正在驗證用戶...</div>;
  if (session.status === 'unauthenticated') return <div className="p-4 text-red-500">請先登錄</div>;
  if (isLoading) return <div className="p-4 text-gray-500">正在加載...</div>;
  if (error) return <div className="p-4 text-red-500">錯誤: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#004C7B] to-[#0E8D7C] bg-opacity-60">
      {/* 左側導航欄 */}
      <div className="fixed left-0 w-10 h-full bg-white text-center">
        <div className="mt-12">
          <Link href="/Calendar">
            <div className="w-10 h-[60px] mt-1 hover:bg-gray-300 flex flex-col items-center justify-center">
              <FontAwesomeIcon icon={faCalendarDays} className="text-[1.3rem] text-[#1D475D] mt-2" />
              <span className="text-xs">日歷</span>
            </div>
          </Link>
          <Link href="/User">
            <div className="w-10 h-[60px] mt-1 bg-[#5f7f9495] hover:bg-gray-300 flex flex-col items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="text-[1.3rem] text-[#1D475D] mt-2" />
              <span className="text-xs">用戶</span>
            </div>
          </Link>
          <Link href="/Job">
            <div className="w-10 h-[60px] mt-1 hover:bg-gray-300 flex flex-col items-center justify-center">
              <FontAwesomeIcon icon={faClipboardCheck} className="text-[1.3rem] text-[#1D475D] mt-2" />
              <span className="text-xs">工作</span>
            </div>
          </Link>
          <Link href="/Task">
            <div className="w-10 h-[60px] mt-1 hover:bg-gray-300 flex flex-col items-center justify-center">
              <FontAwesomeIcon icon={faRectangleList} className="text-[1.3rem] text-[#1D475D] mt-2" />
              <span className="text-xs">任務</span>
            </div>
          </Link>
          <Link href="/Application">
            <div className="w-10 h-[60px] mt-1 hover:bg-gray-300 flex flex-col items-center justify-center">
              <FontAwesomeIcon icon={faClock} className="text-[1.3rem] text-[#1D475D] mt-2" />
              <span className="text-xs">申請</span>
            </div>
          </Link>
        </div>
      </div>

      {/* 右側內容 */}
      <div className="ml-10 w-[90%] text-center text-sm">
        {/* 搜索欄 */}
        <div className="py-2">
          <div className="flex items-center justify-center gap-2">
            <input
              type="text"
              name="search-bar"
              id="search-bar"
              placeholder="搜尋關鍵字"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-[25rem] h-7 border border-gray-300 rounded-md px-2 focus:outline-none"
            />
            <select
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
              className="h-7 border border-gray-300 rounded-md px-2 focus:outline-none"
            >
              <option value="all">所有字段</option>
              <option value="username">用戶名稱</option>
              <option value="nickname">暱稱</option>
              <option value="email">電子郵件</option>
              <option value="role">權限</option>
              <option value="phone">電話</option>
              <option value="area">地區</option>
              <option value="place">地點</option>
              <option value="subject">科目</option>
              <option value="SCRC">SCRC</option>
              <option value="isLogin">是否登錄</option>
              <option value="isStaff">是否職員</option>
            </select>
            <Button
              onClick={handleSearch}
              className="bg-[#0071AC] text-white text-sm px-3 py-1 rounded-md hover:bg-black"
            >
              搜尋
            </Button>
            <Button className="bg-[#0071AC] text-white text-sm px-3 py-1 rounded-md hover:bg-black">
              Filter
            </Button>
          </div>
        </div>

        {/* 創建用戶 */}
        <div className="flex px-5 py-2">
      <Link href={`/user/${userId}/admin`} className="text-blue-500 hover:underline">
        Admin主頁
      </Link>

          <Link href={`/user/${userId}/admin/userLists/createuser`}>
            <Button className="bg-[#1D475D] text-white text-base px-4 py-2 rounded-md hover:bg-black">
              + 建立用戶
            </Button>
          </Link>
        </div>

        {/* 數據表格 */}
        <div className="w-[80%] mx-auto">
          <div className="grid grid-cols-4 gap-2 bg-gray-200 text-black">
            <div className="border border-[rgba(255,255,255,0.5)] p-2">會員編號</div>
            <div className="border border-[rgba(255,255,255,0.5)] p-2">姓名</div>
            <div className="border border-[rgba(255,255,255,0.5)] p-2">電話號碼</div>
            <div className="border border-[rgba(255,255,255,0.5)] p-2">SCRC性罪核</div>
          </div>
          {searchResults.length > 0 ? (
            searchResults.map((user) => (
              <div key={user.id} className="grid grid-cols-4 gap-2 bg-white">
                <Link href={`/user/${userId}/admin/userLists/${user.id}`}>
                  <div className="border border-[rgba(255,255,255,0.5)] p-2">{user.id}</div>
                </Link>
                <div className="border border-[rgba(255,255,255,0.5)] p-2">{user.nickname}</div>
                <div className="border border-[rgba(255,255,255,0.5)] p-2">{user.phone}</div>
                <div className="border border-[rgba(255,255,255,0.5)] p-2">{user.SCRC}</div>
              </div>
            ))
          ) : (
            getUserLists
              .filter((user) => !user.isAdmin && !user.isStaff)
              .map((user) => (
                <div key={user.id} className="grid grid-cols-4 gap-2 bg-white">
                  <Link href={`/user/${userId}/admin/userLists/${user.id}`}>
                    <div className="border border-[rgba(255,255,255,0.5)] p-2">{user.id}</div>
                  </Link>
                  <div className="border border-[rgba(255,255,255,0.5)] p-2">{user.nickname}</div>
                  <div className="border border-[rgba(255,255,255,0.5)] p-2">{user.phone}</div>
                  <div className="border border-[rgba(255,255,255,0.5)] p-2">{user.SCRC}</div>
                </div>
              ))
          )}
          {searchResults.length === 0 && getUserLists.length === 0 && (
            <p className="mt-4 text-gray-500">沒有用戶數據</p>
          )}
          {searchResults.length === 0 && searchQuery && (
            <p className="mt-4 text-gray-500">沒有搜索結果</p>
          )}
        </div>
      </div>
    </div>
  );
}