import React, { useEffect, useState } from "react";
import { banners } from "../data/banner";

type Props = {
  onBannerClick: (file: string) => void;
};



const BannerSlider: React.FC<Props> = ({ onBannerClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.outer}>
      <div style={styles.sliderContainer}>
        <div
          style={{
            ...styles.slider,
            width: `${banners.length * 100}%`,
            transform: `translateX(-${currentIndex * 1000}px)`,
          }}
        >
          {banners.map((banner) => (
            <div
              key={banner.id}
              style={styles.slide}
              onClick={() => onBannerClick(banner.file)} // ✅ onClick added here
            >
              <div
                style={{
                  ...styles.banner,
                  backgroundImage: `url(${banner.image})`,
                  cursor: "pointer",
                }}
              >
                <h2 style={styles.title}>{banner.title}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  outer: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#000",
    padding: "1rem",
  },
  sliderContainer: {
    width: "1000px",
    height: "400px",                  // This is your max height
    overflow: "hidden",               // Ensures no overflow
    position: "relative",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
  },
  slider: {
    display: "flex",
    height: "100%",
    transition: "transform 0.5s ease-in-out",
  },
  slide: {
    width: "1000px", // 👈 match sliderContainer width
    flexShrink: 0,
    height: "100%",
  },
  banner: {
    width: "100%",
    height: "100%",
    backgroundSize: "cover",           // Ensures the image scales to cover the entire container
    backgroundPosition: "center",      // Centers the image
    backgroundRepeat: "no-repeat",     // Prevents tiling
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    padding: "1rem",
    boxSizing: "border-box",
    overflow: "hidden",                // ⬅️ Prevents any overflow
  },  
  title: {
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "#fff",
    padding: "0.5rem 1rem",
    fontSize: "1.5rem",
    borderRadius: "4px",
  },
};

export default BannerSlider;
