import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const SubscriptionModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.heading}>Subscribe to Watch Full Video</h2>
        <p style={styles.message}>Only a 5-second preview is available for unsubscribed users.</p>
        <button style={styles.button} onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    background: "rgba(0, 0, 0, 0.85)",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 9999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#111",
    padding: "2rem",
    borderRadius: "12px",
    maxWidth: "400px",
    width: "90%",
    textAlign: "center",
    color: "#fff",
    boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)",
  },
  heading: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
  message: {
    fontSize: "1rem",
    color: "#ccc",
    marginBottom: "1.5rem",
  },
  button: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#e50914",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background 0.3s",
  },
};

export default SubscriptionModal;
