import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Terminal, 
  Cpu, 
  Database, 
  BookOpen, 
  GraduationCap, 
  CheckCircle, 
  Activity, 
  Layers, 
  Code, 
  Server, 
  ShieldCheck, 
  Network
} from "lucide-react";

interface AboutProps {
  isDarkMode: boolean;
}

// ═════════════════════════════════════════════════════════════
// COMPONENT FOR SMOOTH STATS COUNT UP NUMBERS
// ═════════════════════════════════════════════════════════════
function CountUpNumber({ value, suffix = "", delayMs = 0 }: { value: number; suffix?: string; delayMs?: number }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;
    
    let start = 0;
    const end = value;
    if (start === end) {
      setCount(end);
      return;
    }
    
    const duration = 1.2; // seconds
    const totalMiliseconds = duration * 1000;
    const stepTime = Math.max(Math.floor(totalMiliseconds / end), 25);
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      }
    }, stepTime);
    
    return () => clearInterval(timer);
  }, [value, hasStarted]);

  return (
    <motion.span
      onViewportEnter={() => {
        setTimeout(() => {
          setHasStarted(true);
        }, delayMs);
      }}
      viewport={{ once: true }}
    >
      {count}
      {suffix}
    </motion.span>
  );
}

// ═════════════════════════════════════════════════════════════
// REDESIGNED ABOUT COMPONENT WITH INTEGRATED BOOT SEQUENCE
// ═════════════════════════════════════════════════════════════
export default function About({ isDarkMode }: AboutProps) {
  const [cubeTilt, setCubeTilt] = useState({ x: 0, y: 0 });
  const [isHoveredCube, setIsHoveredCube] = useState(false);

  // States for sequential boot sequence
  const [activeBootIndex, setActiveBootIndex] = useState(-1);
  const [bootComplete, setBootComplete] = useState(false);
  const [hasBooted, setHasBooted] = useState(false);

  const bootModules = [
    {
      key: "identity",
      label: "Identity Loaded",
      value: "Khushi Sharma",
      system: "SYS_ID_DECRYPT",
      color: "from-indigo-500 to-indigo-400"
    },
    {
      key: "role",
      label: "Role Detected",
      value: "Software Engineer",
      system: "SYS_ROLE_MAPPING",
      color: "from-cyan-500 to-cyan-400"
    },
    {
      key: "skills",
      label: "Core Skills Activated",
      value: "React, Node.js, MongoDB, Python",
      system: "SYS_SKILL_MATRIX",
      color: "from-purple-500 to-purple-400"
    },
    {
      key: "projects",
      label: "Projects Indexed",
      value: "MindWell AI, SignBridge AI, FlowForge, ShopSphere",
      system: "SYS_PROJECTS_DB",
      color: "from-emerald-500 to-emerald-400"
    },
    {
      key: "status",
      label: "Current Status",
      value: "Open to Opportunities",
      system: "SYS_STATUS_PING",
      color: "from-amber-500 to-amber-400"
    },
    {
      key: "mission",
      label: "Mission Statement",
      value: "Building scalable, AI-powered digital products",
      system: "SYS_MISSION_LOADER",
      color: "from-rose-500 to-rose-400"
    }
  ];

  const handleViewportEnter = () => {
    if (hasBooted) return;
    setHasBooted(true);
    setActiveBootIndex(0);
  };

  useEffect(() => {
    if (activeBootIndex < 0) return;
    
    if (activeBootIndex < bootModules.length) {
      const timer = setTimeout(() => {
        setActiveBootIndex((prev) => prev + 1);
      }, 700); // Quick professional 700ms stagger
      return () => clearTimeout(timer);
    } else {
      setBootComplete(true);
    }
  }, [activeBootIndex]);

  const handleCubeMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - card.left) / card.width - 0.5;
    const y = (e.clientY - card.top) / card.height - 0.5;
    setCubeTilt({ x: x * 12, y: y * -12 });
  };

  const handleCubeMouseLeave = () => {
    setCubeTilt({ x: 0, y: 0 });
    setIsHoveredCube(false);
  };

  return (
    <section id="about" className={`py-24 relative overflow-hidden min-h-screen select-none transition-colors duration-300 ${
      isDarkMode ? "bg-[#050505] text-white" : "bg-slate-50 text-slate-900"
    }`}>
      
      {/* Cinematic Glowing Background Gradients */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full filter blur-[160px] bg-indigo-500/10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[550px] h-[550px] rounded-full filter blur-[190px] bg-purple-500/10 animate-pulse delay-700" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ==================== SECTION HEADER ==================== */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`text-4xl sm:text-6xl font-black tracking-tighter mb-4 font-sans uppercase bg-clip-text text-transparent ${
              isDarkMode 
                ? "bg-gradient-to-r from-white via-slate-100 to-slate-400" 
                : "bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500"
            }`}
          >
            About Me
          </motion.h2>
          <div className="h-1 bg-indigo-600 w-16 mx-auto rounded-full mb-6 animate-pulse" />
        </div>

        {/* ==================== BENTO ROW 1: BOOT SEQUENCE & PROFILE BIOGRAPHY ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-8">
          
          {/* LEFT COMPONENT: STAGGERED COCKPIT BOOT CONSOLE */}
          <div className="lg:col-span-7 flex flex-col">
            <motion.div
              onViewportEnter={handleViewportEnter}
              viewport={{ once: true, amount: 0.1 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={`border rounded-2xl overflow-hidden font-mono text-xs w-full flex-grow flex flex-col justify-between transition-colors duration-300 ${
                isDarkMode 
                  ? "border-white/[0.08] bg-[#07070a]/90 backdrop-blur-xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-slate-300" 
                  : "border-slate-200 bg-white shadow-[0_15px_45px_rgba(0,0,0,0.06)] text-slate-700"
              }`}
            >
              {/* Console Header */}
              <div className={`px-5 py-3.5 border-b flex items-center justify-between flex-shrink-0 ${
                isDarkMode ? "border-white/[0.06] bg-white/[0.01]" : "border-slate-100 bg-slate-50"
              }`}>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <span className="text-[9px] sm:text-[10px] text-slate-500 font-bold uppercase tracking-wider">sharma_boot_sequence.bin</span>
                <Terminal size={14} className="text-indigo-400" />
              </div>

              {/* Console Rows */}
              <div className="p-4 sm:p-6 space-y-3 flex-grow flex flex-col justify-center">
                {bootModules.map((mod, idx) => {
                  const isPending = activeBootIndex < idx;
                  const isScanning = activeBootIndex === idx;
                  const isCompleted = activeBootIndex > idx;

                  return (
                    <div 
                      key={mod.key} 
                      className={`p-3 rounded-xl border transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                        isScanning 
                          ? isDarkMode
                            ? "bg-indigo-950/20 border-indigo-500/35 shadow-[0_0_15px_rgba(99,102,241,0.06)]"
                            : "bg-indigo-50 border-indigo-300 shadow-sm"
                          : isCompleted 
                          ? isDarkMode
                            ? "bg-white/[0.01] border-white/[0.04]" 
                            : "bg-slate-50 border-slate-100"
                          : "bg-transparent border-transparent opacity-30"
                      }`}
                    >
                      {/* Left: Status & Technical tags */}
                      <div className="flex items-center gap-3">
                        {/* Status indicator badge */}
                        <div className="w-24 sm:w-28 flex-shrink-0">
                          {isPending && (
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold border ${
                              isDarkMode 
                                ? "text-slate-600 bg-slate-900/60 border-slate-800/40" 
                                : "text-slate-500 bg-slate-100 border-slate-200"
                            }`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                              STANDBY
                            </span>
                          )}
                          {isScanning && (
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold animate-pulse border ${
                              isDarkMode 
                                ? "text-cyan-400 bg-cyan-950/30 border-cyan-500/20" 
                                : "text-cyan-600 bg-cyan-50 border-cyan-200"
                            }`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                              BOOTING...
                            </span>
                          )}
                          {isCompleted && (
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold border ${
                              isDarkMode 
                                ? "text-emerald-400 bg-emerald-950/30 border-emerald-500/20" 
                                : "text-emerald-600 bg-emerald-50 border-emerald-200"
                            }`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              SUCCESS
                            </span>
                          )}
                        </div>

                        {/* Labels */}
                        <div className="text-left font-sans">
                          <p className="text-[8px] text-slate-500 uppercase tracking-widest font-mono font-bold leading-none mb-1">{mod.system}</p>
                          <h4 className={`text-xs font-bold leading-none ${
                            isCompleted 
                              ? isDarkMode ? "text-slate-300 font-extrabold" : "text-slate-700 font-extrabold"
                              : isScanning 
                              ? "text-indigo-400 font-black" 
                              : isDarkMode ? "text-slate-600" : "text-slate-400"
                          }`}>
                            {mod.label}
                          </h4>
                        </div>
                      </div>

                      {/* Right: Typing sequence or Output Value */}
                      <div className="flex-grow md:max-w-xs flex flex-col gap-1.5 text-left md:text-right">
                        {isScanning && (
                          <div className="w-full">
                            <div className="flex justify-between font-mono text-[8px] text-cyan-400 mb-1 leading-none">
                              <span>INDEXING LOGS</span>
                              <span>Scanning...</span>
                            </div>
                            <div className={`w-full h-1 rounded-full overflow-hidden border ${
                              isDarkMode ? "bg-slate-950 border-white/[0.02]" : "bg-slate-100 border-slate-200"
                            }`}>
                              <motion.div 
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 0.7, ease: "linear" }}
                                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400"
                              />
                            </div>
                          </div>
                        )}

                        {isCompleted && (
                          <motion.div
                            initial={{ opacity: 0, x: -6, filter: "blur(3px)" }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                            className={`font-bold text-xs sm:text-sm font-mono tracking-tight ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}
                          >
                            <span className="text-indigo-500 font-bold mr-1.5 font-sans">→</span>
                            {mod.value}
                          </motion.div>
                        )}

                        {isPending && (
                          <span className={isDarkMode ? "text-slate-800 tracking-wider" : "text-slate-200 tracking-wider"}>----------</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Console Footer */}
              <div className={`px-5 py-3 border-t text-[9px] flex flex-wrap items-center justify-between gap-2 flex-shrink-0 ${
                isDarkMode ? "border-white/[0.04] bg-white/[0.01] text-slate-500" : "border-slate-100 bg-slate-50 text-slate-400"
              }`}>
                <span className="flex items-center gap-1 font-mono font-bold">
                  <Cpu size={11} className="text-slate-500 animate-spin" style={{ animationDuration: "5s" }} />
                  PROCESSOR: PORTFOLIO_COCKPIT_V3
                </span>
                {bootComplete ? (
                  <span className="text-emerald-400 font-black tracking-widest flex items-center gap-1 uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    CORES SECURED (STABLE)
                  </span>
                ) : (
                  <span className="text-cyan-400 font-bold tracking-widest flex items-center gap-1 animate-pulse uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    COMPILING MODULES...
                  </span>
                )}
              </div>
            </motion.div>
          </div>

          {/* RIGHT COMPONENT: DETAILED BIOGRAPHY CARD */}
          <div className="lg:col-span-5 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className={`border backdrop-blur-[10px] rounded-2xl p-6 sm:p-8 shadow-xl flex-grow flex flex-col justify-between text-left relative overflow-hidden group transition-colors duration-300 ${
                isDarkMode 
                  ? "border-white/[0.06] bg-white/[0.01]" 
                  : "border-slate-200 bg-white"
              }`}
            >
              {/* Subtle top-right background vector accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full filter blur-3xl pointer-events-none group-hover:bg-indigo-500/10 transition-colors duration-500" />
              
              <div className="space-y-6">
                <div className={`flex items-center gap-3 pb-4 border-b ${isDarkMode ? "border-white/[0.04]" : "border-slate-100"}`}>
                  <div className={`p-2.5 rounded-xl border ${
                    isDarkMode 
                      ? "bg-indigo-950 text-indigo-400 border-indigo-500/10" 
                      : "bg-indigo-50 text-indigo-600 border-indigo-200"
                  }`}>
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h3 className={`text-base sm:text-lg font-black uppercase tracking-tight font-sans ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                      Academic Focus & Foundations
                    </h3>
                    <p className="text-[10px] sm:text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider mt-0.5">
                      B.Tech in Information Technology // 2022 - 2026
                    </p>
                  </div>
                </div>

                <div className={`space-y-4 font-sans text-sm leading-relaxed font-light ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                  <p>
                    Hi, I'm <strong className={`font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>Khushi Sharma</strong>. I am a software engineer dedicated to building clean, scalable software systems. Undergoing B.Tech specialization in Information Technology, I am refining my core knowledge in Data Structures, Algorithms, Operating Systems, and Object-Oriented Architectures.
                  </p>
                  <p>
                    My philosophy as a developer is rooted in eliminating unnecessary complexity. I enjoy building rich, fluid frontend interfaces, proxying secure micro-services, and implementing intelligent algorithms to solve daily user friction.
                  </p>
                </div>
              </div>

              {/* Status display at bottom of profile block */}
              <div className={`mt-8 pt-4 border-t flex items-center justify-between ${isDarkMode ? "border-white/[0.04]" : "border-slate-100"}`}>
                <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">
                  DEVELOPER FILE / PROFILE_01
                </span>
                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-widest border ${
                  isDarkMode 
                    ? "bg-emerald-950/30 text-emerald-400 border-emerald-500/10" 
                    : "bg-emerald-50 text-emerald-600 border-emerald-200"
                }`}>
                  ACTIVE PIPELINE
                </span>
              </div>
            </motion.div>
          </div>

        </div>

        {/* ==================== BENTO ROW 2: CORE ARCHITECTURAL VALUES ==================== */}
        <div className="w-full">
          
          {/* FULL WIDTH COLUMN: CORE VALUES (Interactive 3D Matrix block) */}
          <div className="w-full flex flex-col">
            <div
              onMouseMove={handleCubeMouseMove}
              onMouseLeave={handleCubeMouseLeave}
              onMouseEnter={() => setIsHoveredCube(true)}
              style={{
                transform: `perspective(1000px) rotateX(${cubeTilt.y}deg) rotateY(${cubeTilt.x}deg)`,
                transition: isHoveredCube ? "none" : "transform 0.4s ease-out"
              }}
              className={`rounded-2xl border backdrop-blur-[10px] p-6 sm:p-8 shadow-xl flex-grow flex flex-col justify-between text-left relative overflow-hidden group cursor-all-scroll transition-colors duration-300 ${
                isDarkMode 
                  ? "bg-[#07070a]/40 border-white/[0.06]" 
                  : "bg-white border-slate-200"
              }`}
            >
              {/* Dynamic hover lighting overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/0 via-indigo-500/[0.01] to-purple-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div>
                <div className={`flex items-center justify-between mb-5 border-b pb-3.5 ${isDarkMode ? "border-white/[0.04]" : "border-slate-100"}`}>
                  <h4 className="text-[10px] sm:text-xs font-black uppercase tracking-widest font-mono text-indigo-400">
                    Core Architectural Values
                  </h4>
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    { label: "Innovation", text: "Forward thinking" },
                    { label: "Consistency", text: "Resilient shipping" },
                    { label: "Curiosity", text: "Continuous focus" },
                    { label: "Collaboration", text: "Team alignment" },
                    { label: "Creativity", text: "Intuitive designs" },
                    { label: "Growth", text: "Endless learning" }
                  ].map((val) => (
                    <div
                      key={val.label}
                      className={`px-4 py-3 rounded-xl border text-left transition-all duration-300 ${
                        isDarkMode 
                          ? "border-white/[0.04] bg-white/[0.01] hover:border-indigo-500/20 hover:bg-indigo-950/10" 
                          : "border-slate-100 bg-slate-50/50 hover:border-indigo-500/20 hover:bg-indigo-50"
                      }`}
                    >
                      <span className={`font-mono text-xs font-black block ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>
                        {val.label}
                      </span>
                      <span className="text-[10px] font-sans text-slate-500 font-medium block mt-1">
                        {val.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`mt-8 pt-4 border-t text-[8px] font-mono uppercase tracking-[0.2em] text-slate-500 text-center ${isDarkMode ? "border-white/[0.04]" : "border-slate-100"}`}>
                Interactive 3D Grid Matrix // Drag Mouse To Tilt
              </div>
            </div>
          </div>

        </div>

        {/* ==================== MOTIVATIONAL FOOTER BANNER ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto text-center space-y-2 pt-16"
        >
          <h5 className={`text-base sm:text-lg font-bold tracking-tight font-sans italic leading-relaxed ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>
            "I don't just build websites—I craft resilient digital systems that solve user friction and create measurable impact."
          </h5>
          <p className="text-[9px] font-mono text-indigo-400 font-bold tracking-[0.25em] uppercase">
            Khushi Sharma // Engineer & Builder
          </p>
        </motion.div>

      </div>
    </section>
  );
}
