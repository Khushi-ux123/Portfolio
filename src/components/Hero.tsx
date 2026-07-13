import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Code, Brain, Layout, Zap, Sparkles, Eye, EyeOff } from "lucide-react";
import { personalInfo } from "../data";
import profileAvatar from "../assets/images/p_image.png";

interface IntroCinematicProps {
  isDarkMode: boolean;
  onEnter: () => void;
}

interface Star {
  x: number;
  y: number;
  z: number;
  color: string;
  size: number;
}

const safeLocalStorage = {
  getItem: (key: string): string | null => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn("Storage access denied:", e);
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn("Storage write denied:", e);
    }
  }
};

export default function IntroCinematic({ isDarkMode, onEnter }: IntroCinematicProps) {
  const [cinematicEnabled, setCinematicEnabled] = useState(() => {
    return safeLocalStorage.getItem("introCinematicEnabled") !== "false";
  });
  
  const [isExiting, setIsExiting] = useState(false);
  const [isWarping, setIsWarping] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const canvasMousePosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isWarping) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
      canvasMousePosRef.current = { x, y };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isWarping]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const numStars = cinematicEnabled ? 120 : 30; // Reduce stars dynamically if disabled
    const stars: Star[] = [];
    const colors = ["#818cf8", "#c084fc", "#22d3ee", "#38bdf8", "#e879f9", "#ffffff"];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 1200,
        y: (Math.random() - 0.5) * 1200,
        z: Math.random() * 1000 + 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 1.5 + 1,
      });
    }

    let warpSpeed = 1.5;
    let currentXOffset = 0;
    let currentYOffset = 0;

    const render = () => {
      if (!ctx || !canvas) return;

      if (isWarping) {
        ctx.fillStyle = "rgba(2, 6, 23, 0.15)";
        ctx.fillRect(0, 0, width, height);
        warpSpeed = Math.min(warpSpeed + 1.2, 45);
      } else {
        ctx.clearRect(0, 0, width, height);
        warpSpeed = cinematicEnabled ? 1.0 : 0.2; // Slow down background drift if disabled
      }

      currentXOffset += (canvasMousePosRef.current.x * 45 - currentXOffset) * 0.08;
      currentYOffset += (canvasMousePosRef.current.y * 45 - currentYOffset) * 0.08;

      const centerX = width / 2 + currentXOffset;
      const centerY = height / 2 + currentYOffset;

      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        star.z -= warpSpeed;

        if (star.z <= 0) {
          star.z = 1000;
          star.x = (Math.random() - 0.5) * 1200;
          star.y = (Math.random() - 0.5) * 1200;
        }

        const k = 400 / star.z;
        const px = star.x * k + centerX;
        const py = star.y * k + centerY;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const size = Math.max(0.1, (1 - star.z / 1000) * star.size * (isWarping ? 2.5 : 1.2));
          
          ctx.beginPath();
          if (isWarping) {
            const prevK = 400 / (star.z + warpSpeed * 1.8);
            const prevPx = star.x * prevK + centerX;
            const prevPy = star.y * prevK + centerY;

            ctx.moveTo(prevPx, prevPy);
            ctx.lineTo(px, py);
            ctx.strokeStyle = star.color;
            ctx.lineWidth = size * 0.8;
            ctx.stroke();
          } else {
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            if (cinematicEnabled) {
              ctx.shadowBlur = size * 1.5;
              ctx.shadowColor = star.color;
            }
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isWarping, cinematicEnabled]);

  const handleToggle = () => {
    const newValue = !cinematicEnabled;
    setCinematicEnabled(newValue);
    safeLocalStorage.setItem("introCinematicEnabled", String(newValue));
  };

  const handleEnter = () => {
    setIsWarping(true);
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 1100);
  };

  return (
    <motion.div
      id="intro-cinematic-overlay"
      className="fixed inset-0 z-[9999] h-screen w-screen overflow-hidden flex flex-col justify-center items-center p-4 select-none bg-slate-950 text-slate-100"
      initial={{ opacity: 1 }}
      animate={isWarping ? { 
        backgroundColor: "rgba(2, 6, 23, 1)",
        transition: { duration: 1.1, ease: "easeInOut" }
      } : { opacity: 1 }}
    >
      {/* 1. Canvas Dynamic FX */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0 block bg-slate-950" 
      />

      {/* Atmospheric Nebula Backdrops (Only active if cinematic enabled) */}
      {cinematicEnabled && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-40 mix-blend-screen">
          <div 
            className="absolute -top-20 -left-20"
            style={{ transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)` }}
          >
            <motion.div 
              className="w-[450px] h-[450px] rounded-full bg-indigo-600/10 blur-[100px]"
              animate={isWarping ? { scale: [1, 5], opacity: [0.6, 0] } : { scale: [1, 1.1, 1] }}
              transition={{ duration: isWarping ? 1.1 : 10, repeat: isWarping ? 0 : Infinity, ease: "easeInOut" }}
            />
          </div>
          <div 
            className="absolute -bottom-40 -right-20"
            style={{ transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)` }}
          >
            <motion.div 
              className="w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px]"
              animate={isWarping ? { scale: [1, 5], opacity: [0.5, 0] } : { scale: [1.05, 0.95, 1.05] }}
              transition={{ duration: isWarping ? 1.1 : 12, repeat: isWarping ? 0 : Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      )}

      {/* 2. Main Centered Core Layout (Strict Single-Screen Viewport Construction) */}
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center text-center z-10 space-y-5 md:space-y-6">
        
        {/* Dynamic Portrait Space Setup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isWarping ? {
            scale: 12,
            opacity: [1, 0.8, 0],
            rotateZ: 45,
            filter: "blur(12px)",
            transition: { duration: 1.1, ease: [0.32, 0, 0.67, 0] }
          } : { opacity: 1, scale: 1, rotateZ: 0, filter: "blur(0px)" }}
          className="relative w-[140px] h-[140px] sm:w-[170px] sm:h-[170px] flex items-center justify-center layout-portrait-wrapper"
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{
              transform: isWarping 
                ? "perspective(1000px) rotateY(0deg) rotateX(0deg)" 
                : `perspective(1000px) rotateY(${mousePos.x * 10}deg) rotateX(${mousePos.y * -10}deg)`,
            }}
          >
            <div className="absolute w-[90%] h-[90%] rounded-full bg-indigo-500/5 blur-[30px] pointer-events-none" />
            <div className="absolute inset-0 pointer-events-none rounded-full border border-indigo-500/20 scale-[1.06] animate-[spin_50s_linear_infinite]" />
            
            {cinematicEnabled && (
              <>
                <motion.div
                  className="absolute w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] pointer-events-none z-10"
                  animate={{ x: [0, 85, 0, -85, 0], y: [-85, 0, 85, 0, -85] }}
                  transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute w-2 h-2 rounded-full bg-pink-500 shadow-[0_0_6px_#ec4899] pointer-events-none z-10"
                  animate={{ x: [0, -105, 0, 105, 0], y: [105, 0, -105, 0, 105] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </>
            )}

            <div className="relative w-[110px] h-[110px] sm:w-[140px] sm:h-[140px] rounded-full p-1 bg-gradient-to-tr from-indigo-500 via-transparent to-cyan-400 shadow-[0_0_20px_rgba(99,102,241,0.15)] overflow-hidden">
              <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border border-slate-950 relative group">
                <img
                  src={profileAvatar}
                  alt={personalInfo.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center scale-105"
                />
                {cinematicEnabled && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent shadow-[0_0_6px_#22d3ee] animate-[bounce_5s_infinite_linear]" />
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Header Micro Typography */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex items-center gap-1.5 mb-1.5"
          >
            <Sparkles size={12} className="text-indigo-400 animate-pulse" />
            <span className="font-mono text-[10px] sm:text-xs text-indigo-300/90 font-bold tracking-[0.2em] uppercase">
              WELCOME TO
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight text-white mb-2"
          >
            KHUSHI <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">SHARMA</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="inline-block px-3 py-1 rounded-md border border-indigo-500/25 bg-indigo-950/70 text-indigo-300 font-mono text-[10px] tracking-[0.15em] uppercase font-bold"
          >
            FULL-STACK DEVELOPER
          </motion.div>
        </div>

        {/* Shortened Description to keep strict visual scale constraint */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-md px-4 font-sans"
        >
          Exploring the intersection of artificial intelligence, scalable full-stack architectures, and intuitive web systems.
        </motion.p>

        {/* 3. Action Single-Line Row Container (Two buttons unified inline side-by-side) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="flex flex-row items-center justify-center gap-3 w-full px-4 max-w-md"
        >
          {/* Primary Action Button */}
          <button
            id="intro-enter-portfolio-btn"
            onClick={handleEnter}
            className="flex-1 group relative py-3 px-4 rounded-xl border border-indigo-400/50 bg-slate-950/80 text-white font-mono text-xs font-bold tracking-wider hover:border-cyan-400 transition-all cursor-pointer overflow-hidden shadow-[0_0_15px_rgba(99,102,241,0.15)] hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span>ENTER PORTFOLIO</span>
              <ArrowRight size={14} className="text-indigo-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Secondary Action Control Toggle Button */}
          <button
            onClick={handleToggle}
            className={`px-4 py-3 rounded-xl border font-mono text-xs font-bold tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-[0.98] ${
              cinematicEnabled 
                ? "border-slate-800 bg-slate-900/60 text-slate-400 hover:text-slate-200 hover:bg-slate-900" 
                : "border-amber-500/35 bg-amber-950/20 text-amber-400 hover:bg-amber-950/40"
            }`}
            title={cinematicEnabled ? "Disable cinematic elements" : "Enable cinematic elements"}
          >
            {cinematicEnabled ? <EyeOff size={14} /> : <Eye size={14} />}
            <span className="hidden sm:inline">{cinematicEnabled ? "FX ON" : "FX OFF"}</span>
          </button>
        </motion.div>

        {/* Clean Signature Quote Segment */}
        <div className="text-center pt-2">
          <p className="text-[11px] italic text-slate-400 font-serif">
            "Code. Learn. Build. Repeat."
          </p>
          <span className="block text-[9px] font-mono text-indigo-400 uppercase tracking-widest mt-0.5">
            — Khushi Sharma
          </span>
        </div>

      </div>

      {/* Screen flash overlay component mapping code block */}
      <AnimatePresence>
        {isWarping && (
          <motion.div 
            className="absolute inset-0 bg-white z-[10000] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0, 0.45, 1, 1] }}
            transition={{ times: [0, 0.4, 0.8, 0.95, 1], duration: 1.1, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
