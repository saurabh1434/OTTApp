import React, { useState } from "react";
import AuthModal from "./AuthModal";
import BannerSlider from "./BannerSlider";
import InfoModal from "./InfoModal";
import SigninScreen from "./SigninScreen";
import VideoPopup from "./VideoPopup";
import { banners } from "../data/banner";

const AltStyledFrontPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const handleSignIn = () => setShowAuthModal(true);
  const handleSignUp = () => setShowAuthModal(true);
  const [infoModal, setInfoModal] = useState<{ title: string; content: React.ReactNode } | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");


  const handleAuthSuccess = (id: string, admin: boolean) => {
    setUserId(id);
    setIsAuthenticated(true);
    setIsAdmin(admin);
    if (!admin) fetchSubscriptionStatus(id);
  };
  const handleSignOut = () => {
    alert("Signed out");
    setUserId(null);
    setIsAuthenticated(false);
    setIsSubscribed(false);
  };
  const handleBannerClick = async (file: string) => {
    const res = await fetch(`https://localhost:7223/api/video/token?file=${file}`);
    const data = await res.json();
    setVideoUrl(data.signedUrl); // ✅ Use signed URL from backend
  };
  const openInfoModal = (title: string, content: React.ReactNode) => {
    setInfoModal({ title, content });
  };

  const handleSubscribe = async () => {
    if (!userId) return;

    const res = await fetch(`https://localhost:7223/api/video/user/${userId}/subscribe`, {
      method: "POST"
    });

    if (res.ok) {
      setIsSubscribed(true);
      alert("Subscribed successfully!");
    }
  };

  const fetchSubscriptionStatus = async (id: string) => {
    const res = await fetch(`https://localhost:7223/api/video/${id}`);
    const data = await res.json();
    setIsSubscribed(data.isSubscribed);
  };
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <img src="/Rasaflix.png" alt="Logo" style={styles.logo} />

        <input
  type="text"
  placeholder="Search for shows, movies..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  style={styles.searchBar}
/>
        <div style={styles.authButtons}>
          {!isAuthenticated ? (
            <button style={styles.authBtn} onClick={handleSignIn}>
              Sign In
            </button>
          ) : (
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              {!isSubscribed && (
                <button style={styles.subscribeBtn} onClick={handleSubscribe}>
                  Subscribe
                </button>
              )}
              <button style={styles.authBtn} onClick={handleSignOut}>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      <BannerSlider onBannerClick={handleBannerClick} />

      <div style={styles.listingRow}>
  {banners
    .filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((item) => (
      <div key={item.id} style={styles.card}>
        <img
          src={item.image}
          alt="Poster"
          style={styles.cardImg}
        />
        <p style={styles.cardTitle}>{item.title}</p>
      </div>
    ))}
</div>

  <footer style={styles.footer}>
  <div style={styles.footerContent}>
  <a
  onClick={() =>
    openInfoModal("About Us", (
      <>
        <p><strong>Welcome to Rasaflix</strong> – A Next-Gen Video on Demand platform by Rasaflix Entertainment, where fantasy meets romance, and VFX breathes life into imagination.</p>

        <p>At Rasaflix, we don’t just tell stories—we craft worlds.</p>

        <p>We are a subscription-based Video on Demand (VoD) platform dedicated to bringing you never-before-seen, visually stunning tales of fantasy, romance, and emotion, all powered by cutting-edge visual effects. Every story on Rasaflix is designed to transport you beyond the screen into alternate realities—some magical, some mysterious, and all deeply moving.</p>

        <h4>✨ Why Rasaflix is Different</h4>
        <ul>
          <li>💫 <strong>Short but impactful</strong> – We value your time and your imagination.</li>
          <li>🎭 <strong>Emotionally rich</strong> – Love, longing, mystery, and magic—all blend seamlessly.</li>
          <li>🧙‍♂️ <strong>Fantasy-heavy</strong> – Think fairy tales, futuristic dimensions, and surreal romances with a twist.</li>
          <li>🔮 <strong>Visually immersive</strong> – Our in-house VFX team ensures cinematic quality, episode after episode.</li>
        </ul>

        <h4>🚀 We're Building More Than Just Stories</h4>
        <p>Our journey has just begun. Rasaflix will soon integrate exciting technologies that blur the line between viewing and experiencing. From interactive storytelling to immersive enhancements—the future is full of surprises, and Rasaflix is ready to lead the way.</p>

        <h4>📱 Coming Soon: Rasaflix Mobile App</h4>
        <p>Our mobile app is currently in development and will soon be available on 
          <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" style={{ color: "#e50914" }}> Google Play Store </a> 
          and 
          <a href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer" style={{ color: "#e50914" }}> Apple App Store</a>. 
          With the app, you’ll have your favorite Rasaflix universes at your fingertips, anywhere, anytime.
        </p>

        <h4>🎬 Quality Takes Time</h4>
        <p>We believe that greatness can't be rushed. Our content is unique and VFX-intensive, and that means we may take a little extra time between uploads—because you deserve the best — and we’re here to raise the bar with every release.</p>

        <h4>💖 Join the Rasaflix Revolution</h4>
        <p>We’re not just building a streaming platform—we’re building a creative universe. Our fans aren’t just subscribers—they’re <strong>Rasaflixians</strong>.</p>

        <p><strong>So if you're looking for content that goes beyond the ordinary—welcome home.</strong></p>

        <p style={{ fontStyle: "italic" }}>Stay curious. Stay enchanted. Stay Rasaflix.</p>
      </>
    ))
  }
  style={styles.footerLink}
>
<h4 style={styles.rightHeading}>  About Us</h4>
</a>


<a
  onClick={() =>
    openInfoModal("Terms of Use", (
      <>
        <p><strong>Terms and Conditions</strong><br />Effective Date: 24th May, 2025</p>
        <p><strong>Company Name:</strong> Rasaflix Entertainment<br />
        <strong>Platform Name:</strong> Rasaflix</p>

        <p>
          Please read these Terms and Conditions ("Terms") carefully before using the Rasaflix website,
          mobile applications, and services (collectively, the "Service") operated by Rasaflix Entertainment ("we", "us", or "our").
        </p>

        <p>By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to any part of these Terms, you may not access the Service.</p>

        <h4>1. Eligibility</h4>
        <p>You must be 18 years of age or older to access or use Rasaflix. By using this Service, you confirm that you meet the age requirement and are legally capable of entering into a binding agreement under Indian law.</p>

        <h4>2. Subscription and Payments</h4>
        <ul>
          <li>Rasaflix operates on a subscription-based model.</li>
          <li>By subscribing, you agree to pay the applicable fees as per the selected plan.</li>
          <li>All payments are non-refundable, unless required by law or offered at our discretion.</li>
          <li>We may modify our pricing, plans, or billing terms at any time, applicable after your current billing cycle.</li>
          <li>Taxes, if applicable, will be levied as per Indian taxation laws.</li>
        </ul>

        <h4>3. Content Ownership and Usage</h4>
        <ul>
          <li>All original videos and content are intellectual property of Rasaflix Entertainment.</li>
          <li>Your subscription grants a limited, non-transferable license for personal use only.</li>
          <li>Unauthorized reproduction, recording, or redistribution is strictly prohibited and may result in legal action.</li>
        </ul>

        <h4>4. Content Release and Availability</h4>
        <p>
          Rasaflix prioritizes quality over quantity. Due to VFX-heavy content, releases may be spaced apart.
          Stay updated via notifications and our official platforms.
        </p>

        <h4>5. Technology and Future Features</h4>
        <p>
          Rasaflix may roll out new features or discontinue existing ones without prior notice.
          Mobile apps for Android and iOS are under development.
        </p>

        <h4>6. User Accounts and Security</h4>
        <p>
          Users must maintain the confidentiality of their credentials. Shared or misused accounts may result in suspension.
        </p>

        <h4>7. Termination of Access</h4>
        <p>
          Rasaflix reserves the right to terminate access without refund in case of any violation of terms or harmful conduct.
        </p>

        <h4>8. Limitation of Liability</h4>
        <p>
          Rasaflix shall not be liable for any indirect, incidental, or consequential damages as per Indian law.
        </p>

        <h4>9. Changes to These Terms</h4>
        <p>
          Terms may be updated at any time. Continued usage signifies acceptance of changes.
        </p>

        <h4>10. Governing Law and Jurisdiction</h4>
        <p>
          These Terms are governed by the laws of India. Legal disputes shall fall under the jurisdiction of courts in <strong>Mumbai</strong>.
        </p>

        <h4>11. Contact Us</h4>
        <p>
          📧 Email: <a href="mailto:contact@rasaflix.in" style={{ color: "#e50914" }}>contact@rasaflix.in</a><br />
          🌐 Website: <a href="https://www.rasaflix.in" target="_blank" rel="noopener noreferrer" style={{ color: "#e50914" }}>www.rasaflix.in</a><br />
          🏢 Company: Rasaflix Entertainment<br />
          📍 Address: Mumbai
        </p>
      </>
    ))
  }
  style={styles.footerLink}
>
<h4 style={styles.rightHeading}> Terms of Use </h4>
</a>

<a
  onClick={() =>
    openInfoModal("Privacy Policy", (
      <>
        <p><strong>Privacy Policy</strong><br />Effective Date: [Insert Launch Date]</p>
        <p><strong>Company Name:</strong> Rasaflix Entertainment<br />
        <strong>Platform Name:</strong> Rasaflix</p>

        <p>This Privacy Policy outlines how Rasaflix Entertainment ("we", "us", or "our") collects, uses, discloses, and protects your personal information when you use our website, mobile application, and services (collectively, the "Service").</p>

        <p>By accessing or using Rasaflix, you agree to the collection and use of your information in accordance with this policy. If you do not agree with our policies, please do not use our Service.</p>

        <h4>1. Information We Collect</h4>
        <ul>
          <li><strong>Personal Information:</strong> Name, email address, phone number, billing information, and other details provided during registration or subscription.</li>
          <li><strong>Usage Information:</strong> IP address, browser type, device details, pages visited, and interaction logs.</li>
          <li><strong>Payment Information:</strong> Processed securely by third-party gateways. We do not store card details.</li>
        </ul>

        <h4>2. How We Use Your Information</h4>
        <ul>
          <li>Provide and maintain the Service</li>
          <li>Process subscriptions and payments</li>
          <li>Send transactional or promotional communications</li>
          <li>Improve user experience and develop new features</li>
          <li>Prevent fraud, abuse, or legal violations</li>
        </ul>

        <h4>3. Sharing Your Information</h4>
        <p>
          We do not sell or rent your data. We may share it with:
          <ul>
            <li>Trusted service providers (e.g., payments, analytics) under confidentiality agreements</li>
            <li>Legal authorities if required by law or to protect our legal rights</li>
          </ul>
        </p>

        <h4>4. Data Security</h4>
        <p>
          We implement industry-standard security measures. However, no system is 100% secure.
        </p>

        <h4>5. Cookies and Tracking Technologies</h4>
        <p>
          We use cookies to personalize content, analyze traffic, and improve our Service. Control cookies in your browser settings.
        </p>

        <h4>6. Your Rights and Choices</h4>
        <ul>
          <li>You can update your personal data via account settings.</li>
          <li>You can unsubscribe from promotional emails anytime.</li>
          <li>You can request account deletion by contacting us.</li>
        </ul>

        <h4>7. Children’s Privacy</h4>
        <p>
          Rasaflix is not for individuals under 18. We do not knowingly collect data from children.
        </p>

        <h4>8. Third-Party Links</h4>
        <p>
          Rasaflix may contain links to third-party sites. We are not responsible for their privacy practices or content.
        </p>

        <h4>9. Changes to This Privacy Policy</h4>
        <p>
          Updates will be posted here with a new effective date. Continued use means acceptance of changes.
        </p>

        <h4>10. Contact Us</h4>
        <p>
          📧 Email: <a href="mailto:contact@rasaflix.in" style={{ color: "#e50914" }}>contact@rasaflix.in</a><br />
          🌐 Website: <a href="https://www.rasaflix.in" target="_blank" rel="noopener noreferrer" style={{ color: "#e50914" }}>www.rasaflix.in</a><br />
          🏢 Company: Rasaflix Entertainment<br />
          📍 Address: Mumbai
        </p>
      </>
    ))
  }
  style={styles.footerLink}
>
<h4 style={styles.rightHeading}> Privacy Policy</h4>
</a>

<a
  onClick={() =>
    openInfoModal("Contact Us", (
      <>
        <p>For any queries or support, please email us at:</p>
        <p>
          📧 <a href="mailto:contact@rasaflix.in" style={{ color: "#e50914", fontWeight: "bold" }}>
            contact@rasaflix.in
          </a>
        </p>
        <p>We usually respond within 24 hours.</p>
      </>
    ))
  }
  style={styles.footerLink}
>
<h4 style={styles.rightHeading}>Contact Us</h4>
</a>


  <div style={styles.footerRight}>
      <h4 style={styles.rightHeading}>Connect with Us</h4>
      <div style={styles.socialIcons}>
  <a href="https://www.instagram.com/rasaflix" target="_blank" rel="noopener noreferrer">
    <img src="/Insta Logo.png" alt="Instagram" style={styles.socialIconImage} />
  </a>
  <a href="https://www.facebook.com/rasaflix" target="_blank" rel="noopener noreferrer">
    <img src="/Facebook Logo.png" alt="Facebook" style={styles.socialIconImage} />
  </a>
  <a href="https://twitter.com/rasaflix" target="_blank" rel="noopener noreferrer">
    <img src="/X Logo.png" alt="Twitter" style={styles.socialIconImage} />
  </a>
  <a href="https://www.youtube.com/@rasaflix" target="_blank" rel="noopener noreferrer">
    <img src="/Youtube logo.png" alt="YouTube" style={styles.socialIconImage} />
  </a>
</div>
  </div>
  <div style={styles.footerRight}>
  <h4 style={styles.rightHeading}>Get the App</h4>
      <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" >
      <img src="/PlayStore.png" alt="Twitter" style={styles.socialIconImageApp} />
      </a>
    </div>
  </div>
  


  <div style={styles.footerCopyright}>
    © {new Date().getFullYear()} Rasaflix. All rights reserved.
  </div>
</footer>


      {/* AuthModal receives callback on success */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={(id: string) => {
          setUserId(id);
          setIsAuthenticated(true);
          fetchSubscriptionStatus(id);
        }}
      />
      {infoModal && (
  <InfoModal
    isOpen={true}
    title={infoModal.title}
    content={infoModal.content}
    onClose={() => setInfoModal(null)}
  />
)}
{videoUrl && (
  <VideoPopup
    videoUrl={videoUrl}
    isSubscribed={isSubscribed}
    onClose={() => setVideoUrl(null)}
  />
)}
    </div>
  );

};


const styles: { [key: string]: React.CSSProperties } = {
  footer: {
    backgroundColor: "#0b0b0b",
    padding: "2rem 1rem",
    textAlign: "left",
    color: "#999",
    fontSize: "0.85rem",
  },
  socialIconImage: {
    width: "28px",
    height: "28px",
    objectFit: "contain",
    filter: "brightness(0.9)",
    transition: "transform 0.2s ease",
    cursor: "pointer",
  },
  socialIconImageApp: {
    width: "75px",
    height: "50px",
    objectFit: "contain",
    filter: "brightness(0.9)",
    transition: "transform 0.2s ease",
    cursor: "pointer",
  },
  
  
  
  footerContent: {
    display: "flex",
    justifyContent: "left",
    flexWrap: "wrap",
    gap: "6.5rem",
    marginBottom: "1rem",
  },
  
  footerLink: {
    color: "#aaa",
    textDecoration: "none",
    cursor: "pointer",
    transition: "color 0.2s",
  },
  
  socialIcons: {
    display: "flex",
    justifyContent: "center",
    gap: "1.5rem",
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
  
  icon: {
    color: "#e50914",
    textDecoration: "none",
    transition: "transform 0.2s",
  },
  
  iconHover: {
    transform: "scale(1.2)",
  },
  
  footerCopyright: {
    color: "#666",
    fontSize: "0.8rem",
  },
 
 
  page: {
    backgroundColor: "#000",
    color: "#fff",
    fontFamily: "'Segoe UI', sans-serif",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#111",
  },
  logo: {
    height: "140px",
  },
  searchBar: {
    padding: "0.5rem 1rem",
    borderRadius: "20px",
    border: "1px solid #444",
    backgroundColor: "#222",
    color: "#fff",
    width: "200px",
  },
  authButtons: {
    display: "flex",
    gap: "0.5rem",
  },
  authBtn: {
    backgroundColor: "#e50914",
    border: "none",
    padding: "0.5rem 1rem",
    color: "#fff",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  subscribeBtn: {
    backgroundColor: "#ff0055",
    border: "none",
    padding: "0.5rem 1rem",
    color: "#fff",
    borderRadius: "20px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  banner: {
    textAlign: "center",
    padding: "4rem 2rem",
    backgroundImage: "url('/banner.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  },
  subheading: {
    fontSize: "1.2rem",
    color: "#ccc",
  },
  listingSection: {
    padding: "2rem",
  },
  listingTitle: {
    fontSize: "1.5rem",
    marginBottom: "1rem",
  },
  listingRow: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  },
  card: {
    width: "150px",
    backgroundColor: "#1a1a1a",
    borderRadius: "8px",
    overflow: "hidden",
    textAlign: "center",
  },
  cardImg: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
  },
  cardTitle: {
    padding: "0.5rem",
    fontSize: "0.9rem",
  },
  rightHeading:
  {
    marginBlockStart:"0px",
  }
};

export default AltStyledFrontPage;
