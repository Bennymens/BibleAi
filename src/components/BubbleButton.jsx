import React, { useState } from "react";

export default function BubbleButton({ onClick, label = "Start Listening" }) {
  const [ripples, setRipples] = useState([]);
  const isMobile =
    typeof window !== "undefined" &&
    (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    ) ||
      window.innerWidth < 768);

  const createRipple = (e) => {
    onClick?.(e);

    // Skip ripple effect on mobile for performance
    if (isMobile) return;

    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { x, y, id: Date.now() };
    setRipples([...ripples, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 800);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap');
        
        @keyframes shimmer {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        
        @media (max-width: 768px) {
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-3px); }
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.2); }
          50% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.5), 0 0 60px rgba(255, 255, 255, 0.3); }
        }
        
        @keyframes ripple {
          0% {
            transform: scale(0);
            opacity: 0.6;
          }
          100% {
            transform: scale(4);
            opacity: 0;
          }
        }
        
        .bubble-button {
          position: relative;
          padding: 1.5rem 3.5rem;
          font-size: 1.25rem;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          letter-spacing: 0.5px;
          color: #fff;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(200, 200, 200, 0.3) 25%, rgba(100, 100, 100, 0.2) 75%, rgba(10, 10, 10, 0.1) 100%);
          backdrop-filter: blur(20px) saturate(180%);
          -webkit-backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 9999px;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation: float 3s ease-in-out infinite, pulse-glow 2s ease-in-out infinite;
          box-shadow: 
            0 8px 32px rgba(255, 255, 255, 0.1),
            inset 0 1px 0 rgba(255, 255, 255, 0.6),
            inset 0 -1px 0 rgba(0, 0, 0, 0.2);
          margin-top: 2rem;
          min-height: 56px;
          min-width: 220px;
        }
        
        @media (min-width: 480px) {
          .bubble-button {
            padding: 1.6rem 3.75rem;
            font-size: 1.35rem;
            margin-top: 3rem;
          }
        }
        
        @media (min-width: 768px) {
          .bubble-button {
            padding: 1.75rem 4rem;
            font-size: 1.5rem;
            margin-top: 4rem;
          }
        }
        
        @media (max-width: 768px) {
          .bubble-button {
            backdrop-filter: blur(10px) saturate(150%);
            -webkit-backdrop-filter: blur(10px) saturate(150%);
            animation: float 4s ease-in-out infinite;
            will-change: auto;
          }
        }
        
        .bubble-button:hover {
          transform: scale(1.08) translateY(-5px);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.5) 0%, rgba(220, 220, 220, 0.4) 25%, rgba(120, 120, 120, 0.3) 75%, rgba(20, 20, 20, 0.2) 100%);
          backdrop-filter: blur(25px) saturate(200%);
          -webkit-backdrop-filter: blur(25px) saturate(200%);
          border-color: rgba(255, 255, 255, 0.5);
          box-shadow: 
            0 20px 60px rgba(255, 255, 255, 0.2), 
            0 0 80px rgba(255, 255, 255, 0.15),
            inset 0 1px 0 rgba(255, 255, 255, 0.8),
            inset 0 -1px 0 rgba(0, 0, 0, 0.3);
        }
        
        .bubble-button:active {
          transform: scale(0.98);
          transition: all 0.1s ease;
        }
        
        .shimmer-overlay {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 30%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 70%
          );
          animation: shimmer 3s infinite;
        }
        
        @media (max-width: 768px) {
          .shimmer-overlay {
            display: none;
          }
        }
        
        .inner-glow {
          position: absolute;
          inset: 2px;
          border-radius: 9999px;
          background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3), transparent 50%);
          pointer-events: none;
          opacity: 0.7;
        }
        
        .ripple {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          animation: ripple 0.8s ease-out;
          pointer-events: none;
        }
      `}</style>

      <button className="bubble-button" onClick={createRipple}>
        {!isMobile && <div className="shimmer-overlay"></div>}
        <div className="inner-glow"></div>
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: "20px",
              height: "20px",
              marginLeft: "-10px",
              marginTop: "-10px",
            }}
          />
        ))}
        <span style={{ position: "relative", zIndex: 10 }}>{label}</span>
      </button>
    </>
  );
}
