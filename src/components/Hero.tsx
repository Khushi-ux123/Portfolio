import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  FileText, 
  Mail, 
  Terminal, 
  Activity, 
  Cpu, 
  Database, 
  Shield, 
  Sparkles, 
  Code, 
  GitBranch, 
  Layers, 
  Globe
} from "lucide-react";
import HeroMovingBackground from "./HeroMovingBackground";

interface HeroProps {
  isDarkMode: boolean;
}

// ═════════════════════════════════════════════════════════════
// PREMIUM MAGNETIC BUTTON WITH CUSTOM RIPPLE & GLOW
// ═════════════════════════════════════════════════════════════
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  id?: string;
}

function MagneticButton({ 
  children, 
  className = "", 
  glowColor = "rgba(99,102,241,0.25)", 
  href, 
  onClick, 
  id,
  ...props 
}: MagneticButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Smooth magnetic pull strength
    const pullFactor = 0.35;
    setPosition({ x: x * pullFactor, y: y * pullFactor });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };

    setRipples((prev) => [...prev, newRipple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 800);

    if (onClick) {
      onClick(e);
    }
  };

  const buttonContent = (
    <motion.button
      id={id}
      onClick={handleClick}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 180, damping: 12, mass: 0.1 }}
      className={`relative overflow-hidden cursor-pointer transition-all ${className}`}
      {...props}
    >
      {/* Glow shadow dynamic overlay */}
      <span
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
        style={{ background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)` }}
      />

      {/* Click Ripples */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full bg-white/20 animate-ping pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{
            left: r.x,
            top: r.y,
            width: "140px",
            height: "140px",
            animationDuration: "0.8s"
          }}
        />
      ))}

      {/* Text wrapper */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block group"
    >
      {href ? (
        <a href={href} className="block w-full">
          {buttonContent}
        </a>
      ) : (
        buttonContent
      )}
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// CORE HERO SECTION COMPONENT
// ═════════════════════════════════════════════════════════════
export default function Hero({ isDarkMode }: HeroProps) {
  const [roleIdx, setRoleIdx] = useState(0);
  const [sceneRotation, setSceneRotation] = useState({ x: 0, y: 0 });
  const [mouseCoords, setMouseCoords] = useState({ x: -100, y: -100 });
  const [isMouseInHero, setIsMouseInHero] = useState(false);
  const [activeConsoleLog, setActiveConsoleLog] = useState<string>("Portfolio ready.");
  const heroRef = useRef<HTMLDivElement>(null);

  const roles = [
    "Software Engineer",
    "Full Stack Developer",
    "Frontend Specialist",
    "AI Enthusiast",
    "Continuous Learner"
  ];

  const lines = ["Khushi Sharma"];

  const techStack = [
    "React", "Next.js", "TypeScript", "Node.js", "MongoDB",
    "Python", "Java", "Express", "Git", "Firebase"
  ];

  // Doubled array for continuous scrolling marquee
  const marqueeItems = [...techStack, ...techStack, ...techStack];

  // Rotate roles every 3s
  useEffect(() => {
    const roleTimer = setInterval(() => {
      setRoleIdx((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(roleTimer);
  }, []);

  // Update console logging details to simulate dynamic workspace activity
  useEffect(() => {
    const logs = [
      "Initializing AI models...",
      "OpenCV gesture tracker ready.",
      "Socket connected on Port 3000.",
      "MERN framework loading complete.",
      "Neural weights calculated. [STABLE]",
      "Compiled successfully. Live."
    ];
    let logCounter = 0;
    const logTimer = setInterval(() => {
      logCounter = (logCounter + 1) % logs.length;
      setActiveConsoleLog(logs[logCounter]);
    }, 4000);
    return () => clearInterval(logTimer);
  }, []);

  // Mouse Movement handlers for Parallax & Spotlight Follower
  const handleHeroMouseMove = (e: React.MouseEvent) => {
    setMouseCoords({ x: e.clientX, y: e.clientY });

    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      const xRatio = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const yRatio = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

      // Calculate scene rotation angles
      setSceneRotation({
        x: xRatio * 28, // horizontal tilt
        y: yRatio * -28  // vertical tilt
      });
    }
  };

  const handleHeroMouseLeave = () => {
    setIsMouseInHero(false);
    setSceneRotation({ x: 0, y: 0 });
  };

  // Opens high-fidelity print/PDF mode in a new window
  const handleDownloadResume = () => {
    try {
      const printUrl = window.location.origin + window.location.pathname + "?print=true";
      window.open(printUrl, "_blank");
    } catch (e) {
      console.warn("Popup blocked by sandbox/iframe limits. Falling back:", e);
      window.location.search = "?print=true";
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleHeroMouseMove}
      onMouseEnter={() => setIsMouseInHero(true)}
      onMouseLeave={handleHeroMouseLeave}
      className={`relative h-dvh min-h-[560px] flex flex-col overflow-hidden select-none pt-16 sm:pt-20 lg:pt-24 pb-0 transition-colors duration-300 ${
        isDarkMode ? "bg-[#050505] text-white" : "bg-slate-50 text-slate-900"
      }`}
    >

      {/* 1. Cinematic Background Layer: Canvas Grid & Ribbon Waves */}
      <HeroMovingBackground isDarkMode={isDarkMode} />

      {/* 2. Ambient Gradient Blobs & Floating Lights */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/12 w-[500px] h-[500px] rounded-full filter blur-[180px] bg-indigo-900/15 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/12 w-[600px] h-[600px] rounded-full filter blur-[200px] bg-purple-900/15 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full filter blur-[220px] bg-cyan-950/10" />
      </div>

      {/* 3. Mouse follow Spotlight Effect (desktop only — avoids odd fixed-position artifacts on touch) */}
      {isMouseInHero && (
        <motion.div
          animate={{ x: mouseCoords.x - 180, y: mouseCoords.y - 180 }}
          transition={{ type: "spring", stiffness: 180, damping: 25, mass: 0.1 }}
          className="hidden lg:block fixed top-0 left-0 w-[360px] h-[360px] rounded-full bg-indigo-500/5 filter blur-[60px] pointer-events-none z-10 mix-blend-screen"
        />
      )}

      {/* 4. Main Contents Split Grid — this block owns all remaining height */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full flex-1 min-h-0 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-12 items-center w-full h-full lg:h-auto">

          {/* ==================== LEFT SIDE: STORYTELLING ==================== */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-3 sm:space-y-4 lg:space-y-6 lg:pr-6 min-h-0 w-full">

            {/* Glowing Availability Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex"
            >
              <div className={`inline-flex items-center gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[8px] sm:text-[9px] lg:text-xs font-mono font-black tracking-widest uppercase border animate-pulse flex-wrap justify-center sm:justify-start transition-all duration-300 ${
                isDarkMode
                  ? "bg-emerald-950/20 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                  : "bg-emerald-50/90 text-emerald-700 border-emerald-200/80 shadow-[0_2px_8px_rgba(16,185,129,0.08)]"
              }`}>
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 relative flex-shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                </span>
                <span className="hidden sm:inline">AVAILABLE FOR SOFTWARE ENGINEERING OPPORTUNITIES</span>
                <span className="sm:hidden">AVAILABLE FOR OPPORTUNITIES</span>
              </div>
            </motion.div>

            {/* Headline (Linear / visionOS Style Reveal) */}
            <div className="flex flex-col tracking-tighter leading-none select-none">
              {lines.map((line, idx) => (
                <div key={idx} className="overflow-hidden py-0.5 sm:py-1">
                  <motion.div
                    initial={{ y: "115%", filter: "blur(8px)", opacity: 0 }}
                    animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: idx * 0.12,
                      ease: [0.16, 1, 0.3, 1] // modern expo-out curve
                    }}
                    className={`text-2xl min-[360px]:text-3xl sm:text-5xl lg:text-7xl font-black uppercase break-words tracking-tight ${
                      idx === 0 || idx >= 4
                        ? "bg-gradient-to-r from-indigo-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent"
                        : isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {line}
                  </motion.div>
                </div>
              ))}
            </div>

            {/* Introduction Card Block */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="space-y-1.5 sm:space-y-2 lg:space-y-4 max-w-xl"
            >
              <h3 className={`text-base sm:text-xl lg:text-2xl font-extrabold font-sans tracking-tight ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}>
                Full-Stack Software Engineer
              </h3>
              <p className={`hidden sm:block text-sm lg:text-base leading-relaxed font-light font-sans line-clamp-3 lg:line-clamp-none ${
                isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}>
                Passionate about transforming ideas into modern web applications and AI-powered products. I combine clean architecture, thoughtful design, and scalable engineering to create experiences that people genuinely enjoy using.
              </p>
            </motion.div>

            {/* Rotating Title Core */}
            <div className="h-7 sm:h-8 lg:h-10 flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={roleIdx}
                  initial={{ y: 12, opacity: 0, filter: "blur(4px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -12, opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-xl border font-mono text-[10px] sm:text-xs lg:text-sm font-bold uppercase tracking-wider ${
                    isDarkMode
                      ? "border-indigo-500/10 bg-indigo-950/20 text-indigo-400"
                      : "border-indigo-200/50 bg-indigo-50/50 text-indigo-600"
                  }`}
                >
                  <Sparkles size={12} className="text-indigo-400 animate-spin" style={{ animationDuration: "5s" }} />
                  {roles[roleIdx]}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Magnetic CTA Buttons Section — all three stay on one line */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="flex flex-nowrap items-center gap-1.5 sm:gap-2.5 lg:gap-4 pt-1 lg:pt-4 w-full"
            >
              <MagneticButton
                id="cta-explore-work"
                href="#projects"
                className="flex-1 sm:flex-none px-2.5 py-2 sm:px-5 sm:py-3 lg:px-6 lg:py-3.5 rounded-lg sm:rounded-xl text-[9px] sm:text-xs lg:text-sm font-bold uppercase tracking-wider bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.25)] border border-indigo-400/20 hover:shadow-indigo-500/40 whitespace-nowrap"
              >
                <span className="sm:hidden">Work</span>
                <span className="hidden sm:inline">Explore My Work</span>
                <ArrowRight size={14} className="hidden sm:inline text-white group-hover:translate-x-1 transition-transform" />
              </MagneticButton>

              <MagneticButton
                id="cta-download-resume"
                onClick={handleDownloadResume}
                className={`flex-1 sm:flex-none px-2.5 py-2 sm:px-5 sm:py-3 lg:px-6 lg:py-3.5 rounded-lg sm:rounded-xl text-[9px] sm:text-xs lg:text-sm font-bold uppercase tracking-wider border shadow-md whitespace-nowrap ${
                  isDarkMode
                    ? "bg-white/[0.03] hover:bg-white/[0.08] text-white border-white/10 hover:border-white/20"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200 hover:border-slate-300"
                }`}
              >
                <FileText size={14} className={`hidden sm:inline ${isDarkMode ? "text-slate-400" : "text-slate-600"}`} />
                <span className="sm:hidden">Resume</span>
                <span className="hidden sm:inline">Download Resume</span>
              </MagneticButton>

              <MagneticButton
                id="cta-lets-connect"
                href="#contact"
                className={`flex-1 sm:flex-none px-2.5 py-2 sm:px-5 sm:py-3 lg:px-6 lg:py-3.5 rounded-lg sm:rounded-xl text-[9px] sm:text-xs lg:text-sm font-bold uppercase tracking-wider bg-transparent border shadow-sm whitespace-nowrap ${
                  isDarkMode
                    ? "text-indigo-400 hover:text-indigo-300 border-indigo-500/10 hover:border-indigo-500/25"
                    : "text-indigo-600 hover:text-indigo-700 border-indigo-200/50 hover:border-indigo-300/50"
                }`}
              >
                <Mail size={14} className="hidden sm:inline" />
                <span className="sm:hidden">Connect</span>
                <span className="hidden sm:inline">Let's Connect</span>
              </MagneticButton>
            </motion.div>

          </div>

          {/* ==================== RIGHT SIDE: FUTURE INTERACTIVE WORKSPACE ==================== */}
          {/* Visible at every breakpoint now — a small static status card on mobile,
              scaling up to the full floating-module 3D scene at lg+. */}
          <div className="lg:col-span-6 flex items-center justify-center relative min-h-0 h-full lg:h-auto">

            {/* ---- COMPACT CARD (below lg): small, single terminal panel only ---- */}
            <div className="lg:hidden w-full max-w-[280px] sm:max-w-[320px] mx-auto border border-white/[0.08] bg-[#07070a]/90 backdrop-blur-xl rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.6)] overflow-hidden font-mono text-[9px] text-slate-300">
              <div className="px-2.5 py-1.5 border-b border-white/[0.06] bg-white/[0.01] flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[7px] text-slate-500 font-bold uppercase tracking-wider">sharma_core.sh</span>
                <Terminal size={10} className="text-indigo-400" />
              </div>
              <div className="p-2.5 space-y-1.5 text-left leading-relaxed">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Shield size={8} className="animate-pulse flex-shrink-0" />
                  <span className="truncate">Security: Auth Guard [OK]</span>
                </div>
                <div className="flex items-start gap-1.5 text-cyan-400 bg-cyan-950/25 border border-cyan-500/25 p-1.5 rounded-lg text-[8px] animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-0.5 animate-ping flex-shrink-0" />
                  <span className="truncate">{activeConsoleLog}</span>
                </div>
                <div className="pt-1 border-t border-white/[0.04] text-[7px] text-slate-500 flex items-center justify-between">
                  <span>PORT: 3000</span>
                  <span className="text-emerald-500">PING: 18ms</span>
                </div>
              </div>
            </div>

            {/* ---- FULL 3D PERSPECTIVE SCENE (lg and up only) ---- */}
            <div className="hidden lg:flex relative w-full max-w-lg aspect-square items-center justify-center [perspective:1400px] scale-100 origin-center">

              <motion.div
                style={{
                  rotateX: sceneRotation.y,
                  rotateY: sceneRotation.x,
                  transformStyle: "preserve-3d"
                }}
                className="relative w-full h-[400px] flex items-center justify-center transition-transform duration-300 ease-out"
              >

                {/* 3D BACKGROUND LAYER — Glowing wireframe circular nodes */}
                <div
                  style={{ transform: "translateZ(-40px)", animationDuration: "120s" }}
                  className="absolute w-80 h-80 rounded-full border border-dashed border-white/[0.03] animate-spin flex items-center justify-center pointer-events-none"
                >
                  <div className="w-56 h-56 rounded-full border border-indigo-500/[0.04] flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full border border-purple-500/[0.03]" />
                  </div>
                </div>

                {/* MODULE A: HOLOGRAPHIC TERMINAL PANEL (Main Centerpiece) */}
                <motion.div
                  style={{ transform: "translateZ(30px)" }}
                  className="absolute w-full max-w-[340px] border border-white/[0.08] bg-[#07070a]/90 backdrop-blur-xl rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden font-mono text-[10px] text-slate-300 group z-20"
                >
                  {/* Terminal Header */}
                  <div className="px-4 py-2.5 border-b border-white/[0.06] bg-white/[0.01] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">sharma_core.sh</span>
                    <Terminal size={12} className="text-indigo-400" />
                  </div>

                  {/* Terminal Logs */}
                  <div className="p-4 space-y-2.5 text-left leading-relaxed">
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-500 font-bold">&gt;</span>
                      <span className="text-slate-400">npm run build --mode=production</span>
                    </div>
                    <div className="text-slate-500">
                      &gt; loading pipeline assets...
                    </div>
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <Shield size={10} className="animate-pulse" />
                      <span>Security: JWT & Auth Guard [OK]</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-indigo-400 font-bold">
                      <Cpu size={10} className="animate-spin" style={{ animationDuration: "3s" }} />
                      <span>API Gateway Status: Operational</span>
                    </div>

                    {/* Live cycling pipeline tracker line */}
                    <div className="flex items-start gap-1.5 text-cyan-400 bg-cyan-950/25 border border-cyan-500/25 p-2 rounded-lg text-[9px] animate-pulse">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1 animate-ping" />
                      <span>{activeConsoleLog}</span>
                    </div>

                    <div className="pt-2 border-t border-white/[0.04] text-[9px] text-slate-500 flex items-center justify-between">
                      <span>PORT: 3000</span>
                      <span className="text-emerald-500">PING: 18ms</span>
                    </div>
                  </div>
                </motion.div>

                {/* MODULE B: AI NEURAL NETWORK PANEL (Top-Right Floating) */}
                <motion.div
                  style={{ transform: "translateZ(80px)" }}
                  className="absolute top-0 right-[-15px] w-48 border border-indigo-500/20 bg-indigo-950/30 backdrop-blur-lg rounded-xl p-3 shadow-2xl flex flex-col gap-2.5 text-left z-30 pointer-events-none"
                >
                  <div className="flex items-center justify-between pb-1.5 border-b border-indigo-500/10">
                    <span className="font-mono text-[9px] font-black text-indigo-400 uppercase tracking-widest">ai_synapse_matrix</span>
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                  </div>

                  {/* SVG Neural Connections Visual */}
                  <svg className="w-full h-16" viewBox="0 0 160 60">
                    <g fill="#818cf8" stroke="#818cf8" strokeWidth="1" strokeOpacity="0.2">
                      {/* Connections */}
                      <line x1="20" y1="30" x2="60" y2="15" />
                      <line x1="20" y1="30" x2="60" y2="45" />
                      <line x1="60" y1="15" x2="100" y2="15" />
                      <line x1="60" y1="15" x2="100" y2="30" />
                      <line x1="60" y1="45" x2="100" y2="30" />
                      <line x1="60" y1="45" x2="100" y2="45" />
                      <line x1="100" y1="15" x2="140" y2="30" />
                      <line x1="100" y1="30" x2="140" y2="30" />
                      <line x1="100" y1="45" x2="140" y2="30" />

                      {/* Input nodes */}
                      <circle cx="20" cy="30" r="3" fill="#6366f1" />

                      {/* Hidden layer nodes */}
                      <circle cx="60" cy="15" r="3" fill="#a855f7" />
                      <circle cx="60" cy="45" r="3" fill="#a855f7" />

                      {/* Active Synapse fires */}
                      <circle cx="100" cy="15" r="3.5" fill="#22d3ee">
                        <animate attributeName="opacity" values="0.2;1;0.2" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="100" cy="30" r="3.5" fill="#22d3ee">
                        <animate attributeName="opacity" values="1;0.2;1" dur="1.5s" repeatCount="indefinite" />
                      </circle>
                      <circle cx="100" cy="45" r="3" fill="#a855f7" />

                      {/* Output node */}
                      <circle cx="140" cy="30" r="4.5" fill="#ec4899">
                        <animate attributeName="r" values="3.5;5;3.5" dur="3s" repeatCount="indefinite" />
                      </circle>
                    </g>
                  </svg>
                  <p className="font-mono text-[8px] text-indigo-300 font-bold tracking-widest text-right">OPTIMIZER: ADAM</p>
                </motion.div>

                {/* MODULE C: GITHUB CONTRIBUTION MATRIX (Bottom-Left Floating) */}
                <motion.div
                  style={{ transform: "translateZ(65px)" }}
                  className="absolute bottom-4 left-[-20px] w-56 border border-emerald-500/20 bg-emerald-950/20 backdrop-blur-lg rounded-xl p-3 shadow-2xl flex flex-col gap-2 text-left z-30 pointer-events-none"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] font-black text-emerald-400 uppercase tracking-widest">git_commits.log</span>
                    <span className="text-[8px] font-mono text-slate-500">2026 ACTIVE</span>
                  </div>

                  {/* Contribution Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {[
                      0, 4, 2, 0, 1, 3, 4,
                      2, 1, 0, 4, 3, 2, 0,
                      3, 0, 1, 2, 4, 3, 2,
                      0, 4, 3, 1, 0, 2, 4
                    ].map((val, cellIdx) => {
                      const colors = [
                        "bg-slate-900 border-white/[0.02]",
                        "bg-emerald-950/60 border-emerald-900/10",
                        "bg-emerald-800/60 border-emerald-700/10",
                        "bg-emerald-600/70 border-emerald-500/10",
                        "bg-emerald-400/90 border-emerald-300/10"
                      ];
                      return (
                        <div
                          key={cellIdx}
                          className={`w-[18px] h-[18px] rounded border ${colors[val]} transition-colors duration-500 relative`}
                        >
                          {/* Live commit pulsing dots randomly */}
                          {val === 4 && cellIdx % 3 === 0 && (
                            <span className="absolute inset-0 bg-emerald-400/50 rounded animate-ping pointer-events-none" style={{ animationDuration: "2s" }} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between text-[8px] font-mono text-emerald-400 font-bold uppercase tracking-wider pt-1">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      Live Stream Listening
                    </span>
                    <span>942 Commits</span>
                  </div>
                </motion.div>

                {/* MODULE D: FULLSTACK ARCHITECTURE MAPPING (Top-Left Floating Overlay) */}
                <motion.div
                  style={{ transform: "translateZ(15px)" }}
                  className="absolute top-8 left-[-35px] border border-white/[0.05] bg-black/80 backdrop-blur-md rounded-xl p-3 shadow-lg flex flex-col gap-2.5 text-left w-48 pointer-events-none"
                >
                  <div className="flex items-center gap-1 text-[9px] font-mono text-slate-400">
                    <Layers size={10} className="text-purple-400" />
                    <span className="font-bold tracking-widest uppercase">System Layout</span>
                  </div>

                  {/* Nodes diagram */}
                  <div className="space-y-1.5 font-mono text-[8px]">
                    <div className="px-2 py-1 rounded bg-indigo-950/30 border border-indigo-500/20 text-indigo-300 flex items-center justify-between">
                      <span>CLIENT VIEW // REACT</span>
                      <Activity size={8} className="text-indigo-400 animate-pulse" />
                    </div>
                    <div className="text-center text-slate-600 font-bold">↓</div>
                    <div className="px-2 py-1 rounded bg-purple-950/30 border border-purple-500/20 text-purple-300 flex items-center justify-between">
                      <span>API CORE // EXPRESS</span>
                      <Globe size={8} className="text-purple-400 animate-spin" style={{ animationDuration: "4s" }} />
                    </div>
                    <div className="text-center text-slate-600 font-bold">↓</div>
                    <div className="px-2 py-1 rounded bg-cyan-950/30 border border-cyan-500/20 text-cyan-300 flex items-center justify-between">
                      <span>DATABASE // MONGODB</span>
                      <Database size={8} className="text-cyan-400" />
                    </div>
                  </div>
                </motion.div>

                {/* MODULE E: PERFORMANCE METRICS (Bottom-Right Floating Badge) */}
                <motion.div
                  style={{ transform: "translateZ(95px)", animationDuration: "6s" }}
                  className="absolute bottom-10 right-[-10px] border border-pink-500/30 bg-pink-950/20 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-2 pointer-events-none z-30 animate-bounce"
                >
                  <Activity size={12} className="text-pink-400 animate-pulse" />
                  <div className="font-mono text-left">
                    <p className="text-[8px] text-pink-300 uppercase tracking-widest font-black leading-none">Latency</p>
                    <p className="text-[11px] text-white font-extrabold leading-none mt-1">18ms Stable</p>
                  </div>
                </motion.div>

              </motion.div>

            </div>

          </div>

        </div>
      </div>

      {/* ==================== BOTTOM AREA: HORIZONTAL FLOATING TECH STACK ==================== */}
      {/* Compact on phones, roomier from sm up, full on lg+ */}
      <div className="relative w-full z-20 flex-shrink-0 bg-[#050505]/60 border-t border-b border-white/[0.04] backdrop-blur-xl py-2 sm:py-2.5 lg:py-4 overflow-hidden">
        {/* Mirror fades on edges */}
        <div className="absolute inset-y-0 left-0 w-16 lg:w-24 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 lg:w-24 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

        {/* Continuous sliding marquee with Framer Motion */}
        <motion.div
          animate={{ x: [0, "-33.333%"] }}
          transition={{
            ease: "linear",
            duration: 22,
            repeat: Infinity
          }}
          className="flex gap-5 lg:gap-8 whitespace-nowrap w-max"
        >
          {marqueeItems.map((tech, idx) => (
            <div
              key={idx}
              className="px-3 py-1.5 lg:px-4.5 lg:py-2.5 rounded-xl border border-white/[0.05] bg-white/[0.01] hover:border-indigo-500/30 hover:bg-indigo-950/15 text-slate-300 font-mono text-[10px] lg:text-sm font-bold flex items-center gap-2 lg:gap-2.5 transition-all cursor-pointer group shadow-[0_0_15px_rgba(255,255,255,0.01)]"
            >
              <Code size={11} className="text-indigo-500 group-hover:rotate-12 transition-transform" />
              <span>{tech}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ==================== BOTTOM SCROLL INDICATOR ==================== */}
      {/* Desktop-only — on smaller screens every pixel of vertical space goes to content instead */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="hidden lg:flex relative z-20 flex-shrink-0 py-3 flex-col items-center justify-center gap-1.5 text-center font-mono text-[9px] text-slate-500 tracking-[0.2em] uppercase cursor-pointer"
        onClick={() => {
          const aboutSection = document.getElementById("about");
          if (aboutSection) aboutSection.scrollIntoView({ behavior: "smooth" });
        }}
      >
        {/* Animated glowing mouse icon */}
        <div className="w-5 h-8 rounded-full border-2 border-slate-700 p-1 flex justify-center items-start shadow-inner bg-slate-950/20">
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0.4, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]"
          />
        </div>
        <span className="font-black text-indigo-400 mt-1 animate-pulse">Discover My Journey</span>
      </motion.div>

    </section>
  );
}
