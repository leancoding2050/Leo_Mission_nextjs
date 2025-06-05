// "use client";

// import Link from "next/link";
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";

// interface User {
//   id: string;
//   email: string;
//   nickname: string;
//   username: string;
//   area: string[];
//   place: string[];
//   phone: string;
//   subject: string[];
//   SCRC: string;
//   image: { path: string }[];
// }

// const ProfilesPage = () => {
//   const { data: session, status } = useSession();
//   const userId = session?.user?.id;

//   const [GetUserListsDatabyId, setGetUserListsDatabyId] = useState<User[]>([]);

//   useEffect(() => {
//     const getUserListsDatabyId = async (id: string) => {
//       const res = await fetch(`/api/User_Lists_by_ID/${id}`);
//       if (!res.ok) {
//         throw new Error("無法獲取用戶數據");
//       }
//       const result = await res.json();
//       setGetUserListsDatabyId(result);
//     };

//     if (status === "authenticated" && userId) {
//       getUserListsDatabyId(userId);
//     }
//   }, [status, userId]);

//   if (status === "loading") {
//     return <div>載入中...</div>;
//   }

//   const isSCRCExpired = (dateString: string) => {
//     const date = new Date(dateString);
//     const currentDate = new Date();
//     return date <= currentDate;
//   };

//   const formatDateString = (dateString: string) => {
//     const date = new Date(dateString);
//     const options: Intl.DateTimeFormatOptions = {
//       year: "numeric",
//       month: "2-digit",
//       day: "2-digit",
//       weekday: "short",
//     };
//     return date.toLocaleDateString("zh-HK", options).replace(/\//g, "-");
//   };

//   return (
    
//     <div>
//           <Link href={`/user/${userId}/`}>
//       返回首頁
//     </Link>

//       <h1 className="text-3xl font-bold text-center">Profiles Page</h1>
//       {GetUserListsDatabyId?.map((d) => (
//         <div key={d.id}>
//           <p>email: {d.email}</p>
//           <p>nickname: {d.nickname}</p>
//           <p>username: {d.username}</p>
//           <img src={d.image[0]?.path} alt="user image" />
//           <p>area: {d.area.join(", ")}</p>
//           <p>place: {d.place.join(", ")}</p>
//           <p>phone: {d.phone}</p>
//           <p>subject: {d.subject.join(", ")}</p>
//           <p style={{ color: isSCRCExpired(d.SCRC) ? "red" : "black" }}>
//             SCRC: {formatDateString(d.SCRC)}
//           </p>
//           {isSCRCExpired(d.SCRC) && (
//             <p style={{ color: "red" }}>請更新SCRC</p>
//           )}
//           <br />
//           <Link href={`/user/${d.id}/profiles/jobprogressLists`}>
//             <Button>個人JOB列表</Button>
//           </Link>
//           <Link href={`/user/${d.id}/profiles/taskprogressLists`}>
//             <Button>個人Task列表</Button>
//           </Link>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ProfilesPage;


"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

interface User {
  id: string;
  email: string;
  nickname: string;
  username: string;
  area: string[];
  place: string[];
  phone: string;
  subject: string[];
  SCRC: string;
  image: { path: string }[];
}

const ProfilesPage = () => {
  const { data: session, status } = useSession();
  const userId = session?.user?.id;

  const [GetUserListsDatabyId, setGetUserListsDatabyId] = useState<User[]>([]);

  useEffect(() => {
    const getUserListsDatabyId = async (id: string) => {
      const res = await fetch(`/api/User_Lists_by_ID/${id}`);
      if (!res.ok) {
        throw new Error("無法獲取用戶數據");
      }
      const result = await res.json();
      setGetUserListsDatabyId(result);
    };

    if (status === "authenticated" && userId) {
      getUserListsDatabyId(userId);
    }
  }, [status, userId]);

  if (status === "loading") {
    return <div className="text-center text-gray-700 text-lg">載入中...</div>;
  }

  const isSCRCExpired = (dateString: string) => {
    const date = new Date(dateString);
    const currentDate = new Date();
    return date <= currentDate;
  };

  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
    };
    return date.toLocaleDateString("zh-HK", options).replace(/\//g, "-");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Link
          href={`/user/${userId}/`}
          className="text-blue-600 hover:underline text-lg"
        >
          返回首頁
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 text-center mt-4">
          用戶資料
        </h1>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        {GetUserListsDatabyId?.map((d) => (
          <div key={d.id} className="mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="text-gray-700 font-medium">電郵</div>
              <div className="text-gray-700">{d.email}</div>
              <div className="text-gray-700 font-medium">暱稱</div>
              <div className="text-gray-700">{d.nickname}</div>
              <div className="text-gray-700 font-medium">用戶名</div>
              <div className="text-gray-700">{d.username}</div>
              <div className="text-gray-700 font-medium">電話號碼</div>
              <div className="text-gray-700">{d.phone}</div>
              <div className="text-gray-700 font-medium">科目</div>
              <div className="text-gray-700">{d.subject.join(", ")}</div>
              <div className="text-gray-700 font-medium">地區</div>
              <div className="text-gray-700">{d.area.join(", ")}</div>
              <div className="text-gray-700 font-medium">地方</div>
              <div className="text-gray-700">{d.place.join(", ")}</div>
              <div className="text-gray-700 font-medium">SCRC 有效日期</div>
              <div
                className={`${
                  isSCRCExpired(d.SCRC) ? "text-red-600" : "text-gray-700"
                }`}
              >
                {formatDateString(d.SCRC)}
              </div>
            </div>
            {isSCRCExpired(d.SCRC) && (
              <p className="text-red-600 mt-2">請更新SCRC</p>
            )}
            <div className="mt-4">
              <img
                src={d.image[0]?.path}
                alt="user image"
                className="w-48 h-48 object-cover rounded-md"
              />
            </div>
            <div className="mt-4 flex gap-4">
              <Link href={`/user/${d.id}/profiles/jobprogressLists`}>
                <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-4 py-2">
                  個人JOB列表
                </Button>
              </Link>
              <Link href={`/user/${d.id}/profiles/taskprogressLists`}>
                <Button className="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-4 py-2">
                  個人Task列表
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilesPage;