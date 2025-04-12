import nodemailer from "nodemailer";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function POST(req: Request) {
  // 解析請求主體
  const { email } = await req.json();

  if (!email) {
    return new Response(JSON.stringify({ error: "電子郵件為必填項" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return new Response(
      JSON.stringify({ error: "此電子郵件未註冊" }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // 生成重設密碼 token
  const resetToken = Math.random().toString(36).slice(2);
  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

  // 儲存 token 到資料庫，設置 1 小時過期時間
  await prisma.passwordResetToken.create({
    data: {
      token: resetToken,
      email: email,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000), // 1 小時後過期
    },
  });

  // 配置 Nodemailer 使用 Gmail SMTP
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST, // smtp.gmail.com
    port: Number(process.env.EMAIL_PORT), // 587
    secure: false, // 使用 TLS
    auth: {
      user: process.env.EMAIL_USER, // lhpbtk@gmail.com
      pass: process.env.EMAIL_PASS, // cdiqeioeeakmsgzv
    },
  });

  // 定義郵件內容
  const mailOptions = {
    from: `"你的MAIL" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "重設您的密碼",
    text: `您好！請點擊以下連結重設您的密碼：${resetLink}\n如果您未發起此請求，請忽略此郵件。`,
    html: `
      <h2>重設密碼</h2>
      <p>您好！請點擊以下按鈕重設您的密碼：</p>
      <a href="${resetLink}" style="padding: 10px 20px; background-color: #0070f3; color: white; text-decoration: none; border-radius: 5px;">重設密碼</a>
      <p>如果您未發起此請求，請忽略此郵件。</p>
    `,
  };

  try {
    // 發送郵件
    await transporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({ success: true, message: "郵件已發送" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ error: "無法發送郵件" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}