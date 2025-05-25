import React, { useEffect, useRef, useState } from "react";
import SubscriptionModal from "./SubscriptionModal";

type Props = {
  videoUrl: string;
  isSubscribed: boolean;
  onClose: () => void;
};

const VideoPopup: React.FC<Props> = ({ videoUrl, isSubscribed, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isSubscribed) {
      const timer = setTimeout(() => {
        videoRef.current?.pause();
        setShowModal(true);
      }, 30000);
      return () => clearTimeout(timer);
    }
  }, [isSubscribed]);

  return (
    <div style={styles.overlay}>
      <div style={styles.container}>
        <button onClick={onClose} style={styles.closeButton}>×</button>
        <video ref={videoRef} width="100%" controls autoPlay style={styles.video}>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <SubscriptionModal
  isOpen={showModal}
  onClose={() => {
    setShowModal(false);
    onClose(); // ⬅️ This line ensures the videoUrl is cleared
  }}
/>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9999,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    position: "relative",
    width: "80%",
    maxWidth: "800px",
    backgroundColor: "#000",
    borderRadius: "10px",
    overflow: "hidden",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "15px",
    fontSize: "1.5rem",
    background: "none",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    zIndex: 10000,
  },
  video: {
    width: "100%",
    height: "600px",
  },
};

export default VideoPopup;
