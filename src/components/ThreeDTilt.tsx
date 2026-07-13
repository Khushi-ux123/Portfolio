import React, { useState, useRef } from "react";

interface ThreeDTiltProps {
  children: React.ReactNode;
  maxTilt?: number;
  className?: string;
}

export default function ThreeDTilt({ children, maxTilt = 12, className = "" }: ThreeDTiltProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    if (width === 0 || height === 0) return;
    
    // Calculate mouse position relative to the card's center (coordinates from -width/2 to +width/2)
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Convert to percentage/ratio (-1 to 1) and apply max tilt limits
    const rotX = (mouseY / (height / 2)) * -maxTilt;
    const rotY = (mouseX / (width / 2)) * maxTilt;
    
    // Track percentage for light reflections (0 to 100)
    const shineX = ((e.clientX - rect.left) / width) * 100;
    const shineY = ((e.clientY - rect.top) / height) * 100;
    
    setRotation({ x: rotX, y: rotY });
    setShine({ x: shineX, y: shineY });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
      className={`relative select-none ${className}`}
    >
      <div
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${
            isHovered ? 1.025 : 1
          }, ${isHovered ? 1.025 : 1}, 1)`,
          transformStyle: "preserve-3d",
        }}
        className="w-full h-full transition-transform duration-150 ease-out relative rounded-2xl"
      >
        {/* Shadow effect that shifts slightly in the opposite direction */}
        <div
          style={{
            transform: `translate3d(${-rotation.y * 0.8}px, ${rotation.x * 0.8}px, -20px)`,
            opacity: isHovered ? 0.45 : 0,
          }}
          className="absolute inset-4 -z-10 rounded-2xl bg-indigo-600/40 blur-2xl transition-opacity duration-300 pointer-events-none"
        />

        {/* Inner children wrapper with standard transformStyle to allow 3D depth inside */}
        <div className="w-full h-full" style={{ transformStyle: "preserve-3d" }}>
          {children}
        </div>

        {/* 3D specular highlight / spotlight reflection overlay */}
        <div
          style={{
            background: `radial-gradient(circle 180px at ${shine.x}% ${shine.y}%, rgba(255, 255, 255, ${isHovered ? 0.12 : 0}), transparent)`,
            transform: "translateZ(1px)",
          }}
          className="absolute inset-0 pointer-events-none mix-blend-overlay rounded-2xl transition-all duration-150 ease-out"
        />
      </div>
    </div>
  );
}
