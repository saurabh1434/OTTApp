import React, { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

const SignUpModal: React.FC<Props> = ({ isOpen, onClose, onSuccess }) => {
  const [form, setForm] = useState({ username: "", email: "", password: "", fullName: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    const response = await fetch("https://localhost:7223/api/video/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (response.ok) {
      alert("Sign up successful!");
      onSuccess();
      onClose();
    } else {
      alert("Sign up failed!");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>Sign Up</h2>
      {["username", "email", "password", "fullName"].map((field) => (
        <input
          key={field}
          name={field}
          placeholder={field}
          type={field === "password" ? "password" : "text"}
          onChange={handleChange}
        />
      ))}
      <button onClick={handleSubmit}>Register</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default SignUpModal;
