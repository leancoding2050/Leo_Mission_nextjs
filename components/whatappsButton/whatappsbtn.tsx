"use client";

import { UpdataIsSendWhatapps } from "@/actions/UPDATA-IsSend-whatsapp";
import { useState } from "react";

interface WhatsAppMessage {
  id: string;
  phone: string;
  message: string;
  isSend: boolean;
}

interface WhatsAppButtonProps {
  whatsappmessage: WhatsAppMessage;
}

const WhatsAppButton = ({ whatsappmessage }: WhatsAppButtonProps) => {
  const { id, phone, message } = whatsappmessage; // 移除了 isPending
  const [isSend, setIsSend] = useState<boolean>(whatsappmessage.isSend ?? false); // 預設為 false

  console.log("whatsappmessage :", whatsappmessage);
  console.log("phone :", phone, "message :", message);

  const whatsappLink = `https://api.whatsapp.com/send?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(message)}`;

  const handleClick = async () => {
    try {
      await UpdataIsSendWhatapps(id); // 更新後端 isSend
      setIsSend(true); // 更新本地狀態
      window.open(whatsappLink, "_blank", "noopener,noreferrer"); // 打開 WhatsApp
    } catch (error) {
      console.error("更新 WhatsApp 狀態失敗:", error);
      alert("發送失敗，請稍後再試！"); // 可替換為 toast
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`font-bold py-2 px-4 rounded ${
        isSend ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 text-white"
      }`}
      disabled={isSend}
      aria-label={isSend ? "已發送 WhatsApp 訊息" : "發送 WhatsApp 訊息"}
    >
      {isSend ? "已發送" : "WhatsApp"}
    </button>
  );
};

export default WhatsAppButton;

// "use client";


// import { UpdataIsSendWhatapps } from "@/actions/UPDATA-IsSend-whatsapp";
// import { useState } from "react";

// const WhatsAppButton = ({ whatappmessage }: any) => {
//   console.log("whatappmessage :", whatappmessage);
//   const phoneNumber = whatappmessage.phone;
//   const message = whatappmessage.message;
//   const whpId = whatappmessage.id;
//   const [isSend, setIsSend] = useState(whatappmessage.isSend); // 本地狀態追踪 isSend

//   console.log("phoneNumber :", phoneNumber, "message :", message);

//   const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

//   const handleClick = async () => {
//     try {
//       await UpdataIsSendWhatapps(whpId); // 調用服務端函數更新 isSend
//       setIsSend(true); // 更新本地狀態
//       window.open(whatsappLink, "_blank", "noopener,noreferrer"); // 打開 WhatsApp 連結
//     } catch (error) {
//       console.error("更新 WhatsApp 狀態失敗:", error);
//       alert("發送失敗，請稍後再試！");
//     }
//   };

//   return (
//     <button
//       onClick={handleClick}
//       className={`font-bold py-2 px-4 rounded ${
//         isSend ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 text-white"
//       }`}
//       disabled={isSend} // 如果已發送，禁用按鈕
//     >
//       {isSend ? "已發送" : "WhatsApp"}
//     </button>
//   );
// };

// export default WhatsAppButton;

// import Link from "next/link";

// const WhatsAppButton = (whatappmessage:any) => {

//   console.log( "whatappmessage :", whatappmessage)
//   const phoneNumber = whatappmessage.whatappmessage.phone
//   const message = whatappmessage.whatappmessage.message;


//   console.log("phoneNumber :", phoneNumber  ,"message :", message )

//   const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;

//   return (
//     <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
//       <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
//         WhatsApp
//       </button>
//     </Link>
//   )
// }

// export default WhatsAppButton

