import React from "react";
import { useAuth } from "./LoginContex";

const SubscribeButton = () => {
  const { userId, setIsSubscribed, isSubscribed } = useAuth();

  const handleSubscribe = async () => {
    if (!userId) return;

    const res = await fetch(`https://localhost:7223/api/video/${userId}/subscribe`, {
      method: "POST"
    });

    if (res.ok) {
      setIsSubscribed(true);
      alert("Subscription successful!");
    }
  };

  if (isSubscribed) return null;

  return <button onClick={handleSubscribe}>Subscribe to Watch Full Video</button>;
};

export default SubscribeButton;
