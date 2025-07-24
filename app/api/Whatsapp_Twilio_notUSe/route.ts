import twilio from "twilio";

// 從環境變數中獲取 Twilio 憑證
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// 檢查環境變數是否已定義
if (!accountSid || !authToken || !process.env.TWILIO_WHATSAPP_NUMBER || !process.env.YOUR_PHONE_NUMBER) {
  throw new Error("缺少必要的環境變數");
}

// 處理 POST 請求
export async function POST(req: Request) {
  const { message } = await req.json();

  if (!message) {
    return new Response(JSON.stringify({ error: "訊息內容為必填項" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_WHATSAPP_NUMBER!, // Twilio WhatsApp 號碼
      to: process.env.YOUR_PHONE_NUMBER!,        // 接收者號碼
    });

    return new Response(JSON.stringify({ success: true, sid: response.sid }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("發送 WhatsApp 訊息時出錯:", error);
    return new Response(JSON.stringify({ error: "訊息發送失敗" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// 可選：處理其他方法（例如 GET）
export async function GET() {
  return new Response(JSON.stringify({ error: "不支援此方法" }), {
    status: 405,
    headers: { "Content-Type": "application/json" },
  });
}