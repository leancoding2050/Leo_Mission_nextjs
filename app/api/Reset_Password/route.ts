import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { token, newPassword } = await req.json();

  if (!token || !newPassword) {
    return new Response(
      JSON.stringify({ error: "Token 和新密碼為必填項" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    // 檢查 token 是否有效
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true }, // 包含關聯的用戶資料
    });

    if (!resetToken || resetToken.expiresAt < new Date()) {
      return new Response(
        JSON.stringify({ error: "無效或已過期的重設連結" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // 加密新密碼
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 更新用戶密碼
    await prisma.user.update({
      where: { email: resetToken.email },
      data: { password: hashedPassword },
    });

    // 刪除已使用的 token
    await prisma.passwordResetToken.delete({
      where: { token },
    });

    return new Response(
      JSON.stringify({ success: true, message: "密碼已更新" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error resetting password:", error);
    return new Response(
      JSON.stringify({ error: "無法更新密碼" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}