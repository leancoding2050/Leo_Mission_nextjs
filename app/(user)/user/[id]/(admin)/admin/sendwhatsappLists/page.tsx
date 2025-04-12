"use client";

import WhatsAppButton from "@/components/whatappsButton/whatappsbtn";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SendwhatsappLists = () => {
  const param = useParams();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/SendWhatsapp_Lists`);
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);

        const result = await res.json();

        if (!result.every((item) => item?.id)) {
          throw new Error("Invalid data format: missing 'id' field");
        }

        // 按 isSend 排序：false 在前，true 在後
        const sortedResult = result.sort((a: any, b: any) => {
          return a.isSend === b.isSend ? 0 : a.isSend ? 1 : -1;
        });

        setData(sortedResult);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  if (isLoading) return <div className="p-4 text-gray-500">Loading messages...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!data.length) return <div className="p-4 text-gray-500">No messages available</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">WhatsApp Messages</h1>

      <div className="space-y-4">
        {data.map((message: any) => (
          <div
            key={message.id}
            className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="font-medium">{message.username}</div>
            <div className="text-sm text-gray-500">
              Date: {new Date(message.date).toLocaleDateString()}
            </div>

            <WhatsAppButton whatappmessage={message} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SendwhatsappLists;


// "use client";

// import { UpdataIsSendWhatapps } from "@/actions/UPDATA-IsSend-whatsapp";
// import WhatsAppButton from "@/components/whatappsButton/whatappsbtn";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";



// const SendwhatsappLists = () => {
//     const param = useParams();
//     const [data, setData] = useState([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const res = await fetch(`/api/SendWhatsapp_Lists`);
//                 if (!res.ok) throw new Error(`Request failed: ${res.status}`);
                
//                 const result = await res.json();
                
//                 if (!result.every(item => item?.id)) {
//                     throw new Error("Invalid data format: missing 'id' field");
//                 }

//                 setData(result);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         fetchData();
//     }, []);

//     if (isLoading) return <div className="p-4 text-gray-500">Loading messages...</div>;
//     if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
//     if (!data.length) return <div className="p-4 text-gray-500">No messages available</div>;

//     return (
//         <div className="p-4">
//             <h1 className="text-xl font-bold mb-4">WhatsApp Messages</h1>
            
//             <div className="space-y-4">
//                 {data.map((message: any) => (
//                     <div 
//                         key={message.id}
//                         className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
//                     >
//                         <div className="font-medium">{message.username}</div>
//                         <div className="text-sm text-gray-500">
//                             Date: {new Date(message.date).toLocaleDateString()}
//                         </div>

//                         <WhatsAppButton whatappmessage={message} />
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default SendwhatsappLists;