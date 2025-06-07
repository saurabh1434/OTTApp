import React, { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (userId: string) => void; // ✅ Accepts userId from API response
};

const AuthModal: React.FC<Props> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    fullName: "",
  });

  if (!isOpen) return null;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const url = isSignUp
      ? "https://localhost:7223/api/video/signup"
      : "https://localhost:7223/api/video/login";

    const payload = isSignUp
      ? form
      : { username: form.username, password: form.password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        onAuthSuccess(data.userId); // ✅ Send userId back
        onClose();
      } else {
        alert("Authentication failed");
      }
    } catch (err) {
      console.error("Error during authentication:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>{isSignUp ? "Create Account" : "Welcome Back"}</h2>

        {isSignUp && (
          <>
            <input
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              style={styles.input}
            />
            <input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              style={styles.input}
            />
          </>
        )}

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          style={styles.input}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          style={styles.input}
        />

        <button onClick={handleSubmit} style={styles.primaryBtn}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>

        <p style={{ color: "#ccc", marginTop: "1rem" }}>
          {isSignUp ? "Already have an account?" : "New here?"}{" "}
          <span onClick={() => setIsSignUp(!isSignUp)} style={styles.link}>
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>

        <button onClick={onClose} style={styles.closeBtn}>
          ×
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999,
  },
  modal: {
    position: "relative",
    background: "#1c1c1c",
    padding: "2rem",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "400px",
    color: "#fff",
    textAlign: "center",
  },
  input: {
    width: "100%",
    margin: "0.5rem 0",
    padding: "0.75rem",
    borderRadius: "6px",
    border: "1px solid #444",
    backgroundColor: "#2a2a2a",
    color: "#fff",
  },
  primaryBtn: {
    width: "100%",
    marginTop: "1rem",
    padding: "0.75rem",
    backgroundColor: "#e50914",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  link: {
    color: "#e50914",
    cursor: "pointer",
    textDecoration: "underline",
  },
  closeBtn: {
    position: "absolute",
    top: "1rem",
    right: "1rem",
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: "1.5rem",
    cursor: "pointer",
  },
};

export default AuthModal;
