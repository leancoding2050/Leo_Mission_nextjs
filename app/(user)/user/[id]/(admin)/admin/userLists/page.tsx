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

"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

// 定義 User 類型，根據 Prisma 模型
interface User {
  id: string;
  username: string;
  nickname: string;
  email: string;
  role: "ADMIN" | "TEACHER";
  phone: string;
  area: string;
  place: string;
  subject: string;
  SCRC: string;
  isLogin: boolean;
  isStaff: boolean;
  isAdmin: boolean;
}

const UserLists = () => {
  const session = useSession();
  const userId = session.data?.user?.id as string | undefined;

  const [getUserLists, setGetUserLists] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [searchField, setSearchField] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUserListsData = async () => {
      try {
        const res = await fetch("/api/User_Lists");
        if (!res.ok) throw new Error(`請求失敗: ${res.status}`);
        const result: User[] = await res.json();
        setGetUserLists(result);
        setError("");
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "無法加載用戶列表");
      } finally {
        setIsLoading(false);
      }
    };
    getUserListsData();
  }, []); // 移除 userId 依賴，因為 API 不使用 userId

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/User_Lists_search?query=${searchQuery}&field=${searchField}`);
      if (!response.ok) throw new Error(`搜索失敗: ${response.status}`);
      const data: User[] = await response.json();
      setSearchResults(data);
      setError("");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "搜索失敗");
    }
  };

  if (session.status === "loading") return <div className="p-4 text-gray-500">正在驗證用戶...</div>;
  if (session.status === "unauthenticated") return <div className="p-4 text-red-500">請先登錄</div>;
  if (isLoading) return <div className="p-4 text-gray-500">正在加載...</div>;
  if (error) return <div className="p-4 text-red-500">錯誤: {error}</div>;

  return (
    <div className="p-4">
      <Link href={`/user/${userId}/admin`} className="text-blue-500 hover:underline">
        Admin主頁
      </Link>
      <div className="mt-2">
        <Link href={`/user/${userId}/admin/userLists/createuser`} className="text-blue-500 hover:underline">
          創建用戶
        </Link>
      </div>
      <h1 className="text-xl font-bold mt-4">用戶列表</h1>

      <div className="flex items-center space-x-2 mt-4">
        <input
          type="text"
          placeholder="輸入搜索內容..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          className="p-2 border rounded"
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
        <Button onClick={handleSearch}>搜索</Button>
      </div>

      {searchResults.length > 0 ? (
        <div className="mt-4">
          <p className="font-semibold">搜索結果</p>
          {searchResults.map((user) => (
            <div key={user.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <p>用戶名稱: {user.username}</p>
              <p>暱稱: {user.nickname}</p>
              <p>電子郵件: {user.email}</p>
              <p>權限: {user.role}</p>
              <p>電話: {user.phone}</p>
              <p>地區: {user.area}</p>
              <p>地點: {user.place}</p>
              <p>科目: {user.subject}</p>
              <p>SCRC: {user.SCRC}</p>
              <p>是否登錄: {user.isLogin ? "是" : "否"}</p>
              <p>是否職員: {user.isStaff ? "是" : "否"}</p>
            </div>
          ))}
        </div>
      ) : searchQuery ? (
        <p className="mt-4 text-gray-500">沒有搜索結果</p>
      ) : null}

      {getUserLists.length === 0 ? (
        <p className="mt-4 text-gray-500">沒有用戶數據</p>
      ) : (
        <div className="mt-4">
          {getUserLists.map((user) => {
            // 僅顯示非管理員和非職員的用戶
            if (!user.isAdmin && !user.isStaff) {
              return (
                <div
                  key={user.id}
                  className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <Link href={`/user/${userId}/admin/userLists/${user.id}`}>
                    用戶名稱: {user.username} | 暱稱: {user.nickname}
                  </Link>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

export default UserLists;