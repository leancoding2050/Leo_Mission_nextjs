"use client";

import { useEffect, useState } from "react";

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [ message , setMessage ] = useState('');
    const [ error , setError ] = useState('');

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        setMessage("");
        setError("");

        const res = await fetch('/api/Send_reset_email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });

        const data = await res.json();

        if (data.success) {
            setMessage("重設密碼郵件已發送到您的信箱！");
        } else {
            setError(data.error || "發送失敗，請稍後再試");
        }

    };

    return (
        <div>
        <h1>忘記密碼</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="請輸入您的電子郵件"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">發送重設連結</button>
        </form>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div> 
    );


}