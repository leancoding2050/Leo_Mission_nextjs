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
    return <div>載入中...</div>;
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
    <div>
      <h1 className="text-3xl font-bold text-center">Profiles Page</h1>
      {GetUserListsDatabyId?.map((d) => (
        <div key={d.id}>
          <p>email: {d.email}</p>
          <p>nickname: {d.nickname}</p>
          <p>username: {d.username}</p>
          <img src={d.image[0]?.path} alt="user image" />
          <p>area: {d.area.join(", ")}</p>
          <p>place: {d.place.join(", ")}</p>
          <p>phone: {d.phone}</p>
          <p>subject: {d.subject.join(", ")}</p>
          <p style={{ color: isSCRCExpired(d.SCRC) ? "red" : "black" }}>
            SCRC: {formatDateString(d.SCRC)}
          </p>
          {isSCRCExpired(d.SCRC) && (
            <p style={{ color: "red" }}>請更新SCRC</p>
          )}
          <br />
          <Link href={`/user/${d.id}/profiles/jobprogressLists`}>
            <Button>個人JOB列表</Button>
          </Link>
          <Link href={`/user/${d.id}/profiles/taskprogressLists`}>
            <Button>個人Task列表</Button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProfilesPage;


// "use client";

// import Link from "next/link";
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";

// const ProfilesPage = () => {
//   const session = useSession();
//   const userId = session.data?.user?.id;

//   const [GetUserListsDatabyId, setGetUserListsDatabyId] = useState([]);

//   useEffect(() => {
//     const getUserListsDatabyId = async (id: string) => {
//       const res = await fetch(`/api/User_Lists_by_ID/${id}`);
//       if (!res) {
//         throw new Error("斷線!");
//       }
//       const result = await res.json();
//       setGetUserListsDatabyId(result);
//     };

//     getUserListsDatabyId(userId);
//   }, [userId]);

//   console.log(GetUserListsDatabyId);

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
//       weekday: "short"
//     };
//     return date.toLocaleDateString("zh-HK", options).replace(/\//g, "-");
//   };

//   return (
//     <div>
//       <h1 className="text-3xl font-bold text-center">
//         Profiles Page
//         {GetUserListsDatabyId?.map((d: any) => {
//           return (
//             <div key={d.id}>
//               <p>email: {d.email}</p>
//               <p>nickname: {d.nickname}</p>
//               <p>username: {d.username}</p>
             
//               <img src={d.image[0].path} alt="some" />
//               <p>area: {d.area}</p>
//               <p>place: {d.place}</p>
//               <p>phone: {d.phone}</p>
//               <p>subject: {d.subject}</p>
//               <p style={{ color: isSCRCExpired(d.SCRC) ? 'red' : 'black' }}>
//                 SCRC: {formatDateString(d.SCRC)}
//               </p>
//               {isSCRCExpired(d.SCRC) && (
//                 <p style={{ color: 'red' }}>請更新SCRC</p>
//               )}
//               <br />
//               <Link href={`/user/${d.id}/profiles/jobprogressLists`}>
//                 <Button>
//                   個人JOB列表
//                 </Button>
//               </Link>
//               <Link href={`/user/${d.id}/profiles/taskprogressLists`}>
//                 <Button>
//                   個人Task列表
//                 </Button>
//               </Link>
//             </div>
//           );
//         })}
//       </h1>
//     </div>
//   );
// };

// export default ProfilesPage;
