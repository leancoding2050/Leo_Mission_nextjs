"use client";

import { useState } from "react";

const WhatsappTwilio = function () {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("/api/Whatsapp_Twilio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(`Message sent successfully! SID: ${data.sid}`);
      } else {
        setError(data.error);
      }
    } catch (err) {
        console.error("Error:", err);
      setError("Something went wrong!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Send WhatsApp Message</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
          style={{ marginRight: "10px", padding: "5px" }}
        />
        <button type="submit" style={{ padding: "5px 10px" }}>
          Send
        </button>
      </form>
      {response && <p style={{ color: "green" }}>{response}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default WhatsappTwilio;