import React, { useState } from "react";
import { useAuth } from "./LoginContex";

const LoginModal = () => {
  const { setUserId, setIsSubscribed } = useAuth();
  const [username, setUsername] = useState("");

  const handleLogin = async () => {
    const res = await fetch("https://localhost:7223/api/video/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }) // add password if needed
    });
  
    if (res.ok) {
      const data = await res.json();
      setUserId(data.userId);
      setIsSubscribed(data.isSubscribed);
    } else {
      alert("Login failed");
    }
  };

  return (
    <div>
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginModal;
