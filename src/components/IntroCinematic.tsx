import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Code, Brain, Layout, Zap, Sparkles } from "lucide-react";
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

// Safe localStorage helper to prevent SecurityError exceptions in sandboxed iframes
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

  // Mouse move parallax state
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isWarping) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1; // [-1, 1]
      const y = (e.clientY / window.innerHeight) * 2 - 1; // [-1, 1]
      setMousePos({ x, y });
      canvasMousePosRef.current = { x, y };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isWarping]);

  // High-performance 3D space stargate & warp speed particle canvas engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Initialize 3D projection star coords
    const numStars = 150;
    const stars: Star[] = [];
    const colors = ["#818cf8", "#c084fc", "#22d3ee", "#38bdf8", "#e879f9", "#ffffff"];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 1200,
        y: (Math.random() - 0.5) * 1200,
        z: Math.random() * 1000 + 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 2 + 1,
      });
    }

    let warpSpeed = 1.5;
    let currentXOffset = 0;
    let currentYOffset = 0;

    const render = () => {
      if (!ctx || !canvas) return;

      // Draw semi-transparent background to create star streaks when warping
      if (isWarping) {
        ctx.fillStyle = "rgba(2, 6, 23, 0.15)";
        ctx.fillRect(0, 0, width, height);
        warpSpeed = Math.min(warpSpeed + 1.2, 45); // Exponential accelerate fly-through speed
      } else {
        ctx.clearRect(0, 0, width, height);
        warpSpeed = 1.2;
      }

      // Smooth cursor feedback momentum interpolation
      currentXOffset += (canvasMousePosRef.current.x * 65 - currentXOffset) * 0.08;
      currentYOffset += (canvasMousePosRef.current.y * 65 - currentYOffset) * 0.08;

      const centerX = width / 2 + currentXOffset;
      const centerY = height / 2 + currentYOffset;

      for (let i = 0; i < numStars; i++) {
        const star = stars[i];
        
        // Push stars closer to the screen (viewer moves forward)
        star.z -= warpSpeed;

        // Reset stars that pass behind the viewport
        if (star.z <= 0) {
          star.z = 1000;
          star.x = (Math.random() - 0.5) * 1200;
          star.y = (Math.random() - 0.5) * 1200;
        }

        // 3D coordinate projection formulas
        const k = 400 / star.z;
        const px = star.x * k + centerX;
        const py = star.y * k + centerY;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          // Calculate variable size based on proximity depth (guaranteed positive to prevent negative radius DOMException in ctx.arc)
          const size = Math.max(0.1, (1 - star.z / 1000) * star.size * (isWarping ? 2.5 : 1.5));
          
          // Draw streak paths or glowing particles
          ctx.beginPath();
          if (isWarping) {
            // Draw stunning streak lines radiating outwards during warp
            const prevK = 400 / (star.z + warpSpeed * 1.8);
            const prevPx = star.x * prevK + centerX;
            const prevPy = star.y * prevK + centerY;

            ctx.moveTo(prevPx, prevPy);
            ctx.lineTo(px, py);
            ctx.strokeStyle = star.color;
            ctx.lineWidth = size * 0.8;
            ctx.stroke();
          } else {
            // Draw crisp high-performance particles
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fillStyle = star.color;
            ctx.shadowBlur = size * 2;
            ctx.shadowColor = star.color;
            ctx.fill();
            ctx.shadowBlur = 0; // Reset shadow for performance
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
  }, [isWarping]);

  const handleToggle = () => {
    const newValue = !cinematicEnabled;
    setCinematicEnabled(newValue);
    safeLocalStorage.setItem("introCinematicEnabled", String(newValue));
  };

  const handleEnter = () => {
    setIsWarping(true);
    setIsExiting(true);
    
    // Smooth multi-stage warp camera simulation
    setTimeout(() => {
      onEnter();
    }, 1100); // Wait for the high-fidelity space warp transition to complete
  };

  return (
    <motion.div
      id="intro-cinematic-overlay"
      className="fixed inset-0 z-[9999] overflow-y-auto overflow-x-hidden flex flex-col justify-start lg:justify-center items-center p-4 sm:p-6 md:p-8 select-none bg-slate-950 text-slate-100"
      initial={{ opacity: 1 }}
      animate={isWarping ? { 
        backgroundColor: "rgba(2, 6, 23, 1)",
        transition: { duration: 1.1, ease: "easeInOut" }
      } : { opacity: 1 }}
    >
      {/* 1. Real-time Canvas-based 3D Stargate Particle Vortex */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full pointer-events-none z-0 block bg-slate-950" 
      />

      {/* Auxiliary Cosmic Nebula Dust Backdrops */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-50 mix-blend-screen">
        {/* Separated translation parallax container and motion animate container to avoid Framer Motion transform clashing */}
        <div 
          className="absolute -top-20 -left-20"
          style={{
            transform: `translate(${mousePos.x * -35}px, ${mousePos.y * -35}px)`,
          }}
        >
          <motion.div 
            className="w-[550px] h-[550px] rounded-full bg-indigo-600/15 blur-[120px]"
            animate={isWarping ? {
              scale: [1, 6],
              opacity: [0.7, 0],
            } : {
              scale: [1, 1.15, 1],
              opacity: [0.6, 0.8, 0.6],
            }}
            transition={isWarping ? {
              duration: 1.1,
              ease: "easeIn"
            } : {
              scale: { duration: 12, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 12, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        </div>

        <div 
          className="absolute -bottom-40 -right-20"
          style={{
            transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`,
          }}
        >
          <motion.div 
            className="w-[650px] h-[650px] rounded-full bg-purple-600/15 blur-[140px]"
            animate={isWarping ? {
              scale: [1, 6],
              opacity: [0.5, 0],
            } : {
              scale: [1.1, 0.95, 1.1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={isWarping ? {
              duration: 1.1,
              ease: "easeIn"
            } : {
              scale: { duration: 15, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 15, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        </div>
      </div>

      {/* 2. Top Header Navigation (Interactive toggles) */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center z-20">
        <div className="flex items-center gap-2">
          {/* Cleared system loader indicators as requested to keep UI pristine */}
        </div>
      </div>

      {/* 3. Main Responsive Stage Container */}
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center z-10 py-12 lg:py-12 my-auto mt-20 lg:mt-0">
        
        {/* A. Left Segment: Welcoming Typography */}
        <motion.div 
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1 px-4 sm:px-6"
          animate={isWarping ? {
            opacity: 0,
            x: -250,
            scale: 0.8,
            filter: "blur(10px)",
            transition: { duration: 0.9, ease: [0.32, 0, 0.67, 0] }
          } : {}}
        >
          
          {/* Small pre-heading */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-2 mb-3 sm:mb-4"
          >
            <Sparkles size={14} className="text-indigo-400 animate-pulse" />
            <span className="font-mono text-xs sm:text-sm text-indigo-300/90 font-bold tracking-[0.25em] uppercase">
              WELCOME TO
            </span>
          </motion.div>

          {/* Primary Name Display */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black font-sans tracking-tight text-white mb-4 leading-none"
          >
            KHUSHI <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-pink-500 bg-clip-text text-transparent drop-shadow-sm">SHARMA</span>
          </motion.h1>

          {/* Subtitle capsule role */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="inline-block px-4 py-1.5 rounded-lg border border-indigo-500/35 bg-indigo-950/85 text-indigo-300 font-mono text-[11px] sm:text-xs tracking-[0.2em] uppercase font-extrabold mb-6 sm:mb-8 shadow-inner shadow-indigo-500/5"
          >
            FULL-STACK DEVELOPER
          </motion.div>

          {/* Intro Description statement */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mb-8 sm:mb-10 font-sans px-2 sm:px-0"
          >
            Exploring the intersection of artificial intelligence, scalable full-stack architectures, and intuitive web systems
            to build robust, high-performance applications for tomorrow.
          </motion.p>

          {/* Interactive ENTER button with simulated camera progression */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8 sm:mb-12 w-full sm:w-auto px-4 sm:px-0"
          >
            <button
              id="intro-enter-portfolio-btn"
              onClick={handleEnter}
              className="w-full sm:w-auto group relative px-8 py-4 sm:px-10 sm:py-4.5 rounded-xl border border-indigo-400/50 bg-slate-950/80 text-white font-mono text-sm font-bold tracking-widest hover:border-cyan-400 transition-all cursor-pointer overflow-hidden shadow-[0_0_25px_rgba(99,102,241,0.25)] hover:shadow-[0_0_40px_rgba(34,211,238,0.45)] active:scale-[0.98]"
            >
              {/* Inner glowing hover background */}
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/35 to-cyan-500/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="relative z-10 flex items-center justify-center gap-3">
                <span>ENTER PORTFOLIO</span>
                <ArrowRight size={16} className="text-indigo-400 group-hover:text-cyan-400 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </button>
          </motion.div>

          {/* Feature badges row - Responsive layout grids */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-4 sm:gap-6 border-t border-slate-800/80 pt-6 sm:pt-8 w-full max-w-xl justify-center lg:justify-start">
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-slate-400 bg-slate-900/40 px-3 py-1.5 rounded-md border border-slate-800/40">
              <Code size={13} className="text-cyan-400" />
              <span className="font-extrabold uppercase">DEVELOPER</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-slate-400 bg-slate-900/40 px-3 py-1.5 rounded-md border border-slate-800/40">
              <Brain size={13} className="text-pink-400" />
              <span className="font-extrabold uppercase">AI ENTHUSIAST</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-slate-400 bg-slate-900/40 px-3 py-1.5 rounded-md border border-slate-800/40">
              <Layout size={13} className="text-emerald-400" />
              <span className="font-extrabold uppercase">UI DESIGNER</span>
            </div>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-slate-400 bg-slate-900/40 px-3 py-1.5 rounded-md border border-slate-800/40">
              <Zap size={13} className="text-amber-400" />
              <span className="font-extrabold uppercase">PROBLEM SOLVER</span>
            </div>
          </div>

          {/* Quotes at the bottom */}
          <div className="mt-8 text-center lg:text-left w-full max-w-md px-4 sm:px-0">
            <p className="text-xs italic text-slate-400 font-serif">
              "Code. Learn. Build. Repeat."
            </p>
            <span className="block text-[10px] font-mono text-indigo-400 uppercase tracking-widest mt-1">
              — Khushi Sharma
            </span>
          </div>

        </motion.div>

        {/* B. Right Segment: Dynamic Portrait Solar System Orbit Layout with 3D Mouse Parallax Tilt & Warp Pull-In */}
        <div className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2 px-6">
          {/* Separated motion.div (which animates scale/opacity during warp/entrance) from inner normal div (which handles 3D tilt style) to avoid transform attribute clashing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isWarping ? {
              scale: 14,
              opacity: [1, 0.8, 0],
              rotateZ: 60,
              filter: "blur(15px)",
              transition: { duration: 1.1, ease: [0.32, 0, 0.67, 0] } // Rapid visual camera flight forward
            } : {
              opacity: 1,
              scale: 1,
              rotateZ: 0,
              filter: "blur(0px)"
            }}
            className="relative w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px] flex items-center justify-center"
          >
            <div
              className="relative w-full h-full flex items-center justify-center"
              style={{
                transform: isWarping 
                  ? "perspective(1000px) rotateY(0deg) rotateX(0deg) translate3d(0px, 0px, 0px)" 
                  : `perspective(1000px) rotateY(${mousePos.x * 15}deg) rotateX(${mousePos.y * -15}deg) translate3d(${mousePos.x * 8}px, ${mousePos.y * 8}px, 0px)`,
              }}
            >
              {/* Outer space atmospheric blue/indigo glow aura behind portrait */}
              <div className="absolute w-[80%] h-[80%] rounded-full bg-indigo-500/10 dark:bg-indigo-500/8 blur-[45px] pointer-events-none" />

              {/* Orbit lines spinning around the portrait */}
              <div className="absolute inset-0 pointer-events-none rounded-full border border-indigo-500/20 scale-[1.05] animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-0 pointer-events-none rounded-full border border-dashed border-cyan-400/15 scale-[1.12] animate-[spin_55s_linear_reverse_infinite]" />

              {/* Interactive orbit planet rolling around the portrait border */}
              <motion.div
                className="absolute w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] pointer-events-none z-10"
                animate={isWarping ? {
                  scale: 0,
                  opacity: 0
                } : {
                  x: [0, 160, 0, -160, 0],
                  y: [-160, 0, 160, 0, -160],
                }}
                transition={isWarping ? { duration: 0.3 } : {
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Secondary tiny micro-moon orbital planet */}
              <motion.div
                className="absolute w-2.5 h-2.5 rounded-full bg-pink-500 shadow-[0_0_10px_#ec4899] pointer-events-none z-10"
                animate={isWarping ? {
                  scale: 0,
                  opacity: 0
                } : {
                  x: [0, -200, 0, 200, 0],
                  y: [200, 0, -200, 0, 200],
                }}
                transition={isWarping ? { duration: 0.3 } : {
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Main Avatar boundary mask */}
              <div className="relative w-[180px] h-[180px] sm:w-[250px] sm:h-[250px] md:w-[280px] md:h-[280px] rounded-full p-1.5 bg-gradient-to-tr from-indigo-500 via-transparent to-cyan-400 shadow-[0_0_35px_rgba(99,102,241,0.25)] overflow-hidden">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-slate-950 relative group">
                  <img
                    src={profileAvatar}
                    alt={personalInfo.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Cyber Scanner light line sweep */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent shadow-[0_0_8px_#22d3ee] animate-[bounce_6s_infinite_linear]" />
                </div>
              </div>

              {/* Earth horizon curve line indicator */}
              <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full border border-dashed border-slate-700/60 opacity-30 pointer-events-none" />
            </div>
          </motion.div>
        </div>

      </div>

      {/* High-speed lens flare white flash peak transition overlay */}
      <AnimatePresence>
        {isWarping && (
          <motion.div 
            className="absolute inset-0 bg-white z-[10000] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0, 0.45, 1, 1], // Peaks at exactly 0.95s to 1.1s duration
            }}
            transition={{
              times: [0, 0.4, 0.8, 0.95, 1],
              duration: 1.1,
              ease: "easeInOut"
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
