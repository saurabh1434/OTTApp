import React from "react";

type InfoModalProps = {
  isOpen: boolean;
  title: string;
  content: React.ReactNode;
  onClose: () => void;
};

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, title, content, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeBtn}>×</button>
        <h2 style={styles.heading}>{title}</h2>
        <div style={styles.content}>{content}</div>
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
    background: "#1c1c1c",
    padding: "2rem",
    borderRadius: "12px",
    width: "90%",
    maxWidth: "600px",
    color: "#fff",
    textAlign: "left",
    position: "relative",
    maxHeight: "80vh",
    overflowY: "auto",
  },
  heading: {
    fontSize: "1.8rem",
    marginBottom: "1rem",
  },
  content: {
    fontSize: "0.95rem",
    lineHeight: "1.6",
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

export default InfoModal;
