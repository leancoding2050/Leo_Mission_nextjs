"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // 使用 useSearchParams 获取查询参数

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams(); // 获取查询参数
    const token = searchParams.get("token"); // 获取 token 参数

    console.log(token)

    useEffect(() => {
        if (!token) {
            setError("無效的重設連結");
        }
    }, [token]);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const response = await fetch(`/api/Reset_Password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, newPassword }),
        });

        const data = await response.json();
        if (data.success) {
            setMessage("密碼已成功更新，請登入！");
            setTimeout(() => router.push("/"), 2000);
        } else {
            setError(data.error || "重設密碼失敗");
        }
    };

    return (
        <div>
            <h1>重設密碼</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="輸入新密碼"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">更新密碼</button>
            </form>
            {message && <p style={{ color: "green" }}>{message}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}