import React, { useState } from "react";

type Props = {
  onAuthSuccess: (userId: string, isAdmin: boolean) => void;
};

const SignInScreen: React.FC<Props> = ({ onAuthSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // For sign-up only
  const [fullName, setFullName] = useState(""); // Optional
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async () => {
    if (isSignUp) {
      // Sign up flow
      const res = await fetch("https://localhost:7223/api/video/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, email, fullName }),
      });

      if (res.ok) {
        alert("Account created! Please sign in.");
        setIsSignUp(false); // switch back to login
      } else {
        alert("Sign up failed");
      }
    } else {
      // Sign in flow
      const res = await fetch("https://localhost:7223/api/video/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        const data = await res.json();
        onAuthSuccess(data.userId, data.isAdmin);
      } else {
        alert("Invalid credentials");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>{isSignUp ? "Create Account" : "Sign In to Rasaflix"}</h2>

        {isSignUp && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              style={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </>
        )}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleSubmit} style={styles.button}>
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>

        <p style={styles.toggle}>
          {isSignUp ? "Already have an account?" : "New here?"}{" "}
          <span onClick={() => setIsSignUp(!isSignUp)} style={styles.link}>
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
  card: {
    backgroundColor: "#1c1c1c",
    padding: "2rem",
    borderRadius: "10px",
    width: "300px",
    textAlign: "center",
  },
  title: {
    marginBottom: "1rem",
    fontSize: "1.5rem",
  },
  input: {
    width: "100%",
    margin: "0.5rem 0",
    padding: "0.75rem",
    borderRadius: "5px",
    border: "1px solid #444",
    backgroundColor: "#2a2a2a",
    color: "#fff",
  },
  button: {
    width: "100%",
    padding: "0.75rem",
    marginTop: "1rem",
    backgroundColor: "#e50914",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  toggle: {
    marginTop: "1rem",
    fontSize: "0.9rem",
  },
  link: {
    color: "#e50914",
    cursor: "pointer",
    textDecoration: "underline",
    marginLeft: "0.3rem",
  },
};

export default SignInScreen;
