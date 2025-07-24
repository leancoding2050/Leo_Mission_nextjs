"use server";

import { signOut } from "@/auth";

export const logout_action = async () => {
  try {
    await signOut({ redirect: false });
    return { success: true, redirectTo: "/" }; // 重定向到登錄頁面
  } catch (error) {
    console.error("登出失敗:", error);
    return { success: false, error: String(error) };
  }
};