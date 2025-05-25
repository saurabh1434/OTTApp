import React from "react";

type Props = {
  onCardClick: (videoFileName: string) => void;
};


const cards = [
  { image: "/banner1.jpg", video: "BannerVideo1.mp4", title: "Card 1" },
  { image: "/banner5.jpg", video: "BannerVideo1.mp4", title: "Card 2" },
];

const Home: React.FC<Props> = ({ onCardClick }) => {
  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      {cards.map((card, idx) => (
        <div key={idx} onClick={() => onCardClick(card.video)} style={{ cursor: "pointer" }}>
          <img src={card.image} alt={card.title} style={{ width: 200, height: 120, objectFit: "cover" }} />
          <p style={{ textAlign: "center" }}>{card.title}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
