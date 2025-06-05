// "use client";

// import WhatsAppButton from "@/components/whatappsButton/whatappsbtn";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// const SendwhatsappLists = () => {
//   const param = useParams();
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(`/api/SendWhatsapp_Lists`);
//         if (!res.ok) throw new Error(`Request failed: ${res.status}`);

//         const result = await res.json();

//         if (!result.every((item) => item?.id)) {
//           throw new Error("Invalid data format: missing 'id' field");
//         }

//         // 按 isSend 排序：false 在前，true 在後
//         const sortedResult = result.sort((a: any, b: any) => {
//           return a.isSend === b.isSend ? 0 : a.isSend ? 1 : -1;
//         });

//         setData(sortedResult);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (isLoading) return <div className="p-4 text-gray-500">Loading messages...</div>;
//   if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
//   if (!data.length) return <div className="p-4 text-gray-500">No messages available</div>;

//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-bold mb-4">WhatsApp Messages</h1>

//       <div className="space-y-4">
//         {data.map((message: any) => (
//           <div
//             key={message.id}
//             className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
//           >
//             <div className="font-medium">{message.username}</div>
//             <div className="text-sm text-gray-500">
//               Date: {new Date(message.date).toLocaleDateString()}
//             </div>

//             <WhatsAppButton whatappmessage={message} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SendwhatsappLists;

// "use client";

// import WhatsAppButton from "@/components/whatappsButton/whatappsbtn";
// import Link from "next/link";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// // 定義 SendWhatsAppMessage 類型，根據 Prisma 模型
// interface SendWhatsAppMessage {
//   id: string;
//   message: string;
//   username: string;
//   phone: string;
//   date: string;
//   isSend: boolean;
// }

// const SendWhatsAppLists = () => {
//   const params = useParams();
//   const [data, setData] = useState<SendWhatsAppMessage[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");
//   const UserId = params.id as string;



//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await fetch(`/api/SendWhatsapp_Lists`);
//         if (!res.ok) throw new Error(`請求失敗: ${res.status}`);

//         const result: SendWhatsAppMessage[] = await res.json();

//         if (!result.every((item) => item?.id)) {
//           throw new Error("無效的數據格式：缺少 'id' 字段");
//         }

//         const sortedResult = result.sort((a, b) => {
//           return a.isSend === b.isSend ? 0 : a.isSend ? 1 : -1;
//         });

//         setData(sortedResult);
//       } catch (err: unknown) {
//         if (err instanceof Error) {
//           setError(err.message);
//         } else {
//           setError("未知錯誤");
//         }
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   if (isLoading) return <div className="p-4 text-gray-500">正在加載訊息...</div>;
//   if (error) return <div className="p-4 text-red-500">錯誤: {error}</div>;
//   if (!data.length) return <div className="p-4 text-gray-500">無可用訊息</div>;

//   return (

    

//     <div className="p-4">
// <Link href={`/user/${UserId}/admin/`} className="text-blue-500 hover:underline">
// 返回Admin
// </Link>

//       <h1 className="text-xl font-bold mb-4">WhatsApp 訊息列表</h1>
//       <div className="space-y-4">
//         {data.map((message) => (
//           <div
//             key={message.id}
//             className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
//           >
//             <div className="font-medium">用戶: {message.username}</div>
//             <div className="text-sm text-gray-500">
//               日期: {new Date(message.date).toLocaleDateString()}
//             </div>
//             <div className="text-sm text-gray-600">訊息內容: {message.message}</div>
//             <div className="text-sm text-gray-600">電話: {message.phone}</div>
//             <div className="text-sm text-gray-600">
//               狀態: {message.isSend ? "已發送" : "未發送"}
//             </div>
//             <WhatsAppButton whatappmessage={message} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SendWhatsAppLists;


"use client";

import WhatsAppButton from "@/components/whatappsButton/whatappsbtn";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface SendWhatsAppMessage {
  id: string;
  message: string;
  username: string;
  phone: string;
  date: string;
  isSend: boolean;
}

export default function SendWhatsAppLists() {
  const params = useParams();
  const [data, setData] = useState<SendWhatsAppMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const UserId = params.id as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/SendWhatsapp_Lists`, { cache: "no-store" });
        if (!res.ok) throw new Error(`請求失敗: ${res.status}`);
        const result: SendWhatsAppMessage[] = await res.json();
        if (!result.every((item) => item?.id)) {
          throw new Error("無效的數據格式：缺少 'id' 字段");
        }
        const sortedResult = result.sort((a, b) => (a.isSend === b.isSend ? 0 : a.isSend ? 1 : -1));
        setData(sortedResult);
        setError("");
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "未知錯誤");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) throw new Error("無效日期");
      return date.toLocaleDateString("zh-TW", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\./g, "-");
    } catch {
      return "N/A";
    }
  };

  if (isLoading)
    return (
      <div className="ml-[50px] p-4 text-[#1D475D] font-noto-sans-tc">正在加載訊息...</div>
    );
  if (error)
    return (
      <div className="ml-[50px] p-4 text-[#FF0000] font-noto-sans-tc">錯誤: {error}</div>
    );
  if (!data.length)
    return (
      <div className="ml-[50px] p-4 text-[#1D475D] font-noto-sans-tc">無可用訊息</div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#d7e1e9] to-[#d7e1e9] bg-opacity-60 font-noto-sans-tc">
      <div className="ml-[50px] p-4">
        <div className="space-y-2">
          <Link
            href={`/user/${UserId}/admin`}
            className="text-[#0071AC] hover:text-black transition-all duration-300"
          >
            返回 Admin 主頁
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-[#1D475D] mt-4">WhatsApp 訊息列表</h1>
        <div className="mt-4 space-y-4">
          {data.map((message) => (
            <div
              key={message.id}
              className="p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              <div className="font-medium text-[#1D475D]">用戶: {message.username}</div>
              <div className="text-sm text-[#1D475D]">日期: {formatDate(message.date)}</div>
              <div className="text-sm text-[#1D475D]">訊息內容: {message.message}</div>
              <div className="text-sm text-[#1D475D]">電話: {message.phone}</div>
              <div className="text-sm text-[#1D475D]">
                狀態: {message.isSend ? "已發送" : "未發送"}
              </div>
              <div className="mt-2">
                <WhatsAppButton whatappmessage={message} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}