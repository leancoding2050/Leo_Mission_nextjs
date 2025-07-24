// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useEffect , useState } from "react";

// const userListsbyId = () => {

//     const params = useParams();
//     console.log(params);
//     const adminId = params?.id as string ;
//     const targetuserId = params?.userListsid as string ;
//     const [  GetUserListsById , setGetUserListsById ] = useState([]);
//     // const [ GetRemake , setGetRemake ] = useState([]);

//     useEffect(() => {
//         const getUserListsDataById = async () => {
//             const res = await fetch(`/api/User_Lists_by_ID/${targetuserId}`);
//             if (!res) {
//                 throw new Error("斷線!");
//             }
//             const result = await res.json();
//             setGetUserListsById(result);
//         }
//         getUserListsDataById();

//     }, [targetuserId]);

//     console.log( "GetUserListsById : ", GetUserListsById);


//     return (
//         <div>
//         <Link href={`/user/${adminId}/admin/userLists`}>
//         上一頁
//         </Link>
        
//             userListsbyId
//             { GetUserListsById.map((d) => {
//                 return(
//                     <div key={d.id}>
//                         <p>email : {d.email}</p>
//                         <p>username : {d.username}</p>
//                         <p>nickname : {d.nickname}</p>
//                         <p>Role : {d.role}</p>

//                         <img src={d.image[0]?.path} alt="" />
//                         <p>Area : {d.area} </p>
//                         <p>place : {d.place}</p>
//                         <p>phone : {d.phone}</p>
//                         <p>subject : {d.subject}</p>
//                         <p>SCRC : {d.SCRC}</p>
//                         <div>
//             <span>Color: </span>
//             <div 
//               className="w-6 h-6 rounded border border-gray-200 shadow-sm inline-block"
//               style={{ backgroundColor: d.color }}
//             />
//             <span> {d.color}</span>
//           </div>
//         </div> 
//                 )
//             }) }
//             <br />

//             <Link href={`/user/${adminId}/admin/userLists/${targetuserId}/edit`} > Edit </Link>
//             <br />

//             <Link href={`/user/${adminId}/admin/userLists/${targetuserId}/taskprogressLists `}> 任務進度列表 </Link>
//             <br />
//             <Link href={`/user/${adminId}/admin/userLists/${targetuserId}/jobprogressLists `}> 工作進度列表 </Link>
//             <br />
//             <Link href={`/user/${adminId}/admin/userLists/${targetuserId}/createRemake `}> 建立評論/備注 </Link>


// {GetUserListsById.map((d) => (
//   <div key={d.id || d.nickname}> {/* Use a unique identifier like id */}
//     {d.remakes.map((ds) => (
//       <div key={ds.id || ds.createAt}> {/* Use a unique identifier like id or timestamp */}
//         <p>{ds.content}</p>
//         <p>作者：{ds.authorname}</p>
//         <p>時間：{ds.createAt}</p>
//       </div>
//     ))}
//   </div>
// ))}

//         </div>
//     )
// }

// export default userListsbyId




// "use client";

// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// // 定義 User 和 Remake 類型，根據 Prisma 模型
// interface Remake {
//   id: string;
//   content: string;
//   authorname: string;
//   createAt: string;
// }

// interface User {
//   id: string;
//   email: string;
//   username: string;
//   nickname: string;
//   role: "ADMIN" | "TEACHER";
//   image: { path: string }[];
//   area: string;
//   place: string;
//   phone: string;
//   subject: string;
//   SCRC: string;
//   color: string;
//   isAdmin: boolean;
//   remakes: Remake[];
// }

// const UserListById = () => {
//   const params = useParams();
//   const adminId = params?.id as string | undefined;
//   const targetUserId = params?.userListsid as string | undefined;

//   const [getUserData, setGetUserData] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const getUserListsDataById = async () => {
//       try {
//         if (!targetUserId) throw new Error("無效的用戶 ID");
//         const res = await fetch(`/api/User_Lists_by_ID/${targetUserId}`);
//         if (!res.ok) throw new Error(`請求失敗: ${res.status}`);
//         const result: User = await res.json();
//         setGetUserData(result);
//         setError("");
//       } catch (err: unknown) {
//         setError(err instanceof Error ? err.message : "無法加載用戶數據");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     getUserListsDataById();
//   }, [targetUserId]);

//   if (isLoading) return <div className="p-4 text-gray-500">正在加載...</div>;
//   if (error) return <div className="p-4 text-red-500">錯誤: {error}</div>;
//   if (!getUserData) return <div className="p-4 text-gray-500">無用戶數據</div>;

//   return (
//     <div className="p-4">
//       <Link href={`/user/${adminId}/admin/userLists`} className="text-blue-500 hover:underline">
//         上一頁
//       </Link>
//       <h1 className="text-xl font-bold mt-4">用戶詳情</h1>

//       <div className="mt-4 p-4 border rounded-lg shadow-sm">
//         <p>電子郵件: {getUserData.email}</p>
//         <p>用戶名稱: {getUserData.username}</p>
//         <p>暱稱: {getUserData.nickname}</p>
//         <p>權限: {getUserData.role}</p>
//         {getUserData.image?.[0]?.path ? (
//           <img src={getUserData.image[0].path} alt="用戶頭像" className="w-24 h-24 object-cover rounded" />
//         ) : (
//           <p>無頭像</p>
//         )}
//         <p>地區: {getUserData.area}</p>
//         <p>地點: {getUserData.place}</p>
//         <p>電話: {getUserData.phone}</p>
//         <p>科目: {getUserData.subject}</p>
//         <p>SCRC: {getUserData.SCRC}</p>
//         <div>
//           <span>顏色: </span>
//           <div
//             className="w-6 h-6 rounded border border-gray-200 shadow-sm inline-block"
//             style={{ backgroundColor: getUserData.color }}
//           />
//           <span> {getUserData.color}</span>
//         </div>
//       </div>

//       <div className="mt-4 space-y-2">
//         <Link href={`/user/${adminId}/admin/userLists/${targetUserId}/edit`} className="block text-blue-500 hover:underline">
//           編輯用戶
//         </Link>
//         <Link
//           href={`/user/${adminId}/admin/userLists/${targetUserId}/taskprogressLists`}
//           className="block text-blue-500 hover:underline"
//         >
//           任務進度列表
//         </Link>
//         <Link
//           href={`/user/${adminId}/admin/userLists/${targetUserId}/jobprogressLists`}
//           className="block text-blue-500 hover:underline"
//         >
//           工作進度列表
//         </Link>
//         <Link
//           href={`/user/${adminId}/admin/userLists/${targetUserId}/createRemake`}
//           className="block text-blue-500 hover:underline"
//         >
//           建立評論/備註
//         </Link>
//       </div>

//       <div className="mt-4">
//         <h2 className="text-lg font-semibold">評論/備註</h2>
//         {getUserData.remakes?.length > 0 ? (
//           getUserData.remakes.map((remake) => (
//             <div key={remake.id} className="p-4 border rounded-lg shadow-sm mt-2">
//               <p>內容: {remake.content}</p>
//               <p>作者: {remake.authorname}</p>
//               <p>時間: {new Date(remake.createAt).toLocaleString()}</p>
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-500">無評論或備註</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserListById;


"use client";

import Link from "next/link";
import Image from "next/image"; // 導入 Image 組件
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// 定義 User 和 Remake 類型，根據 Prisma 模型
interface Remake {
  id: string;
  content: string;
  authorname: string;
  createAt: string;
}

interface User {
  id: string;
  email: string;
  username: string;
  nickname: string;
  role: "ADMIN" | "TEACHER";
  image: { path: string }[];
  area: string;
  place: string;
  phone: string;
  subject: string;
  SCRC: string;
  color: string;
  isAdmin: boolean;
  remakes: Remake[];
}

const UserListById = () => {
  const params = useParams();
  const adminId = params?.id as string | undefined;
  const targetUserId = params?.userListsid as string | undefined;

  const [getUserData, setGetUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUserListsDataById = async () => {
      try {
        if (!targetUserId) throw new Error("無效的用戶 ID");
        const res = await fetch(`/api/User_Lists_by_ID/${targetUserId}`);
        if (!res.ok) throw new Error(`請求失敗: ${res.status}`);
        const result: User = await res.json();
        setGetUserData(result);
        setError("");
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "無法加載用戶數據");
      } finally {
        setIsLoading(false);
      }
    };
    getUserListsDataById();
  }, [targetUserId]);

  if (isLoading) return <div className="p-4 text-gray-500">正在加載...</div>;
  if (error) return <div className="p-4 text-red-500">錯誤: {error}</div>;
  if (!getUserData) return <div className="p-4 text-gray-500">無用戶數據</div>;

  return (
    <div className="p-4  ml-[50px]">
      <Link href={`/user/${adminId}/admin/userLists`} className="text-blue-500 hover:underline">
        上一頁
      </Link>
      <h1 className="text-xl font-bold mt-4">用戶詳情</h1>

      <div className="mt-4 p-4 border rounded-lg shadow-sm">
        <p>電子郵件: {getUserData.email}</p>
        <p>用戶名稱: {getUserData.username}</p>
        <p>暱稱: {getUserData.nickname}</p>
        <p>權限: {getUserData.role}</p>
        {getUserData.image?.[0]?.path ? (
          <Image
            src={getUserData.image[0].path}
            alt="用戶頭像"
            width={96} // 對應 w-24 (24 * 4 = 96px)
            height={96} // 對應 h-24 (24 * 4 = 96px)
            className="object-cover rounded"
          />
        ) : (
          <p>無頭像</p>
        )}
        <p>地區: {getUserData.area}</p>
        <p>地點: {getUserData.place}</p>
        <p>電話: {getUserData.phone}</p>
        <p>科目: {getUserData.subject}</p>
        <p>SCRC: {getUserData.SCRC}</p>
        <div>
          <span>顏色: </span>
          <div
            className="w-6 h-6 rounded border border-gray-200 shadow-sm inline-block"
            style={{ backgroundColor: getUserData.color }}
          />
          <span> {getUserData.color}</span>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <Link href={`/user/${adminId}/admin/userLists/${targetUserId}/edit`} className="block text-blue-500 hover:underline">
          編輯用戶
        </Link>
        <Link
          href={`/user/${adminId}/admin/userLists/${targetUserId}/taskprogressLists`}
          className="block text-blue-500 hover:underline"
        >
          任務進度列表
        </Link>
        <Link
          href={`/user/${adminId}/admin/userLists/${targetUserId}/jobprogressLists`}
          className="block text-blue-500 hover:underline"
        >
          工作進度列表
        </Link>
        <Link
          href={`/user/${adminId}/admin/userLists/${targetUserId}/createRemake`}
          className="block text-blue-500 hover:underline"
        >
          建立評論/備註
        </Link>
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">評論/備註</h2>
        {getUserData.remakes?.length > 0 ? (
          getUserData.remakes.map((remake) => (
            <div key={remake.id} className="p-4 border rounded-lg shadow-sm mt-2">
              <p>內容: {remake.content}</p>
              <p>作者: {remake.authorname}</p>
              <p>時間: {new Date(remake.createAt).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">無評論或備註</p>
        )}
      </div>
    </div>
  );
};

export default UserListById;