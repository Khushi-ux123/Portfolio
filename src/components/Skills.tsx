import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Cpu, 
  Database, 
  Code, 
  Server, 
  Wrench, 
  Layers, 
  Terminal, 
  Zap, 
  Globe, 
  Activity, 
  Compass, 
  RotateCcw, 
  Play, 
  Pause,
  ArrowRight,
  Brain,
  Laptop
} from "lucide-react";

// ═════════════════════════════════════════════════════════════
// TYPINGS AND INTERFACES FOR ECOSYSTEM
// ═════════════════════════════════════════════════════════════
interface SkillItem {
  name: string;
  level: "Advanced" | "Intermediate" | "Learning";
  code: string;
}

interface SkillCategory {
  id: string;
  title: string;
  description: string;
  color: string;
  glowColor: string;
  themeColor: string;
  skills: SkillItem[];
}

// ═════════════════════════════════════════════════════════════
// PREMIUM REDESIGNED SKILLS COMPONENT - THE TECH UNIVERSE
// ═════════════════════════════════════════════════════════════
export default function Skills({ isDarkMode }: { isDarkMode: boolean }) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("frontend");
  const [hoveredCategoryId, setHoveredCategoryId] = useState<string | null>(null);
  const [isOrbiting, setIsOrbiting] = useState(true);
  const [orbitSpeedFactor, setOrbitSpeedFactor] = useState(1);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const [isMouseOverSection, setIsMouseOverSection] = useState(false);

  // Orbit angles state for 6 categories (staggered equally around 360 deg)
  const [angles, setAngles] = useState<number[]>([
    0, 
    1.047, // 60 deg
    2.094, // 120 deg
    3.141, // 180 deg
    4.188, // 240 deg
    5.235  // 300 deg
  ]);

  // Categories data
  const categories: SkillCategory[] = [
    {
      id: "frontend",
      title: "Frontend Development",
      description: "Creating fast, responsive, and visually engaging user interfaces with modern frontend technologies.",
      color: "from-cyan-500 via-blue-500 to-indigo-500",
      glowColor: "rgba(6, 182, 212, 0.4)",
      themeColor: "text-cyan-400",
      skills: [
        { name: "React.js", level: "Advanced", code: "Re" },
        { name: "Next.js", level: "Intermediate", code: "Nx" },
        { name: "TypeScript", level: "Advanced", code: "TS" },
        { name: "JavaScript", level: "Advanced", code: "JS" },
        { name: "HTML5", level: "Advanced", code: "H5" },
        { name: "CSS3", level: "Advanced", code: "C3" },
        { name: "Tailwind CSS", level: "Advanced", code: "TW" },
        { name: "Framer Motion", level: "Intermediate", code: "FM" }
      ]
    },
    {
      id: "backend",
      title: "Backend Development",
      description: "Building secure, scalable, and efficient server-side applications.",
      color: "from-emerald-500 via-teal-400 to-cyan-500",
      glowColor: "rgba(16, 185, 129, 0.4)",
      themeColor: "text-emerald-400",
      skills: [
        { name: "Node.js", level: "Advanced", code: "Nd" },
        { name: "Express.js", level: "Advanced", code: "Ex" },
        { name: "REST APIs", level: "Intermediate", code: "AP" }
      ]
    },
    {
      id: "languages",
      title: "Programming Languages",
      description: "Writing clean, maintainable, and efficient code across multiple languages.",
      color: "from-purple-500 via-indigo-400 to-pink-500",
      glowColor: "rgba(168, 85, 247, 0.4)",
      themeColor: "text-purple-400",
      skills: [
        { name: "Java", level: "Intermediate", code: "Jv" },
        { name: "Python", level: "Intermediate", code: "Py" },
        { name: "JavaScript", level: "Advanced", code: "JS" },
        { name: "TypeScript", level: "Advanced", code: "TS" }
      ]
    },
    {
      id: "databases",
      title: "Databases",
      description: "Designing flexible and scalable data storage solutions.",
      color: "from-amber-500 via-orange-400 to-yellow-500",
      glowColor: "rgba(245, 158, 11, 0.4)",
      themeColor: "text-amber-400",
      skills: [
        { name: "MongoDB", level: "Intermediate", code: "DB" },
        { name: "MySQL", level: "Intermediate", code: "My" }
      ]
    },
    {
      id: "ai-ml",
      title: "AI & Machine Learning",
      description: "Developing intelligent features that enhance user experiences through AI.",
      color: "from-pink-500 via-rose-400 to-purple-500",
      glowColor: "rgba(236, 72, 153, 0.4)",
      themeColor: "text-pink-400",
      skills: [
        { name: "OpenCV", level: "Intermediate", code: "CV" },
        { name: "Hugging Face APIs", level: "Learning", code: "HF" },
        { name: "Gemini API", level: "Intermediate", code: "Ge" },
        { name: "Prompt Engineering", level: "Intermediate", code: "PE" },
        { name: "AI Chatbot Integration", level: "Intermediate", code: "CB" }
      ]
    },
    {
      id: "tools",
      title: "Tools & Platforms",
      description: "Leveraging industry-standard tools for collaboration, testing, deployment, and development.",
      color: "from-indigo-500 via-blue-500 to-cyan-500",
      glowColor: "rgba(99, 102, 241, 0.4)",
      themeColor: "text-indigo-400",
      skills: [
        { name: "Git", level: "Advanced", code: "Gt" },
        { name: "GitHub", level: "Advanced", code: "GH" },
        { name: "VS Code", level: "Advanced", code: "VS" },
        { name: "Postman", level: "Intermediate", code: "PM" },
        { name: "Firebase", level: "Intermediate", code: "Fb" },
        { name: "Vercel", level: "Intermediate", code: "Vc" }
      ]
    }
  ];

  const getCategoryIcon = (id: string, className: string = "w-5 h-5") => {
    switch (id) {
      case "frontend":
        return <Laptop className={className} />;
      case "backend":
        return <Server className={className} />;
      case "languages":
        return <Code className={className} />;
      case "databases":
        return <Database className={className} />;
      case "ai-ml":
        return <Brain className={className} />;
      default:
        return <Wrench className={className} />;
    }
  };

  // Distinct orbital radii and speeds for planets to create dynamic depths
  const radii = [115, 155, 195, 235, 275, 315];
  const baseSpeeds = [0.007, 0.0055, 0.0045, 0.0035, 0.0028, 0.002];

  // Tick physics simulation using requestAnimationFrame
  useEffect(() => {
    if (!isOrbiting) return;

    let frameId: number;
    const tick = () => {
      setAngles((prev) =>
        prev.map((angle, idx) => {
          // Pause if this specific category is hovered
          const isThisHovered = hoveredCategoryId === categories[idx].id;
          if (isThisHovered) return angle;
          
          const speed = baseSpeeds[idx] * orbitSpeedFactor;
          return (angle + speed) % (Math.PI * 2);
        })
      );
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isOrbiting, hoveredCategoryId, orbitSpeedFactor]);

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId) || categories[0];

  return (
    <section 
      id="skills" 
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMouseCoords({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onMouseEnter={() => setIsMouseOverSection(true)}
      onMouseLeave={() => setIsMouseOverSection(false)}
      className={`py-24 relative overflow-hidden min-h-screen select-none font-sans transition-colors duration-300 ${
        isDarkMode ? "bg-[#050505] text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* 1. Cinematic Background Layer: Aurora lighting & moving particles */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Neon blurred blobs */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full filter blur-[150px] bg-cyan-500/10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full filter blur-[170px] bg-purple-500/10 animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full filter blur-[180px] bg-indigo-500/5" />

        {/* Floating particles */}
        <motion.div 
          animate={{ x: [0, 40, -20, 0], y: [0, -60, 40, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-12 w-2 h-2 rounded-full bg-cyan-400/30 blur-[1px] shadow-[0_0_12px_#22d3ee]"
        />
        <motion.div 
          animate={{ x: [0, -35, 55, 0], y: [0, 70, -35, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 right-16 w-3 h-3 rounded-full bg-purple-400/25 blur-[1px] shadow-[0_0_12px_#c084fc]"
        />
        <motion.div 
          animate={{ x: [0, 45, -45, 0], y: [0, -40, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-2/3 left-1/3 w-1.5 h-1.5 rounded-full bg-indigo-400/25 blur-[1px] shadow-[0_0_10px_#818cf8]"
        />
      </div>

      {/* 2. Interactive Spotlight Gradient */}
      {isMouseOverSection && (
        <div 
          className="absolute pointer-events-none z-0 w-[450px] h-[450px] rounded-full bg-indigo-500/5 filter blur-[110px] mix-blend-screen transition-opacity duration-500"
          style={{
            left: mouseCoords.x - 225,
            top: mouseCoords.y - 225
          }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ==================== SECTION INTRODUCTION ==================== */}
        <div className="max-w-4xl mb-16 text-left">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`text-4xl sm:text-6xl font-black tracking-tighter uppercase leading-none font-sans ${isDarkMode ? "text-white" : "text-slate-900"}`}
          >
            My Skills
          </motion.h2>
          <div className="h-1 bg-indigo-600 w-16 rounded-full mt-4 animate-pulse" />
        </div>

        {/* ==================== MAIN DESKTOP ORBIT ECOSYSTEM ==================== */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* LEFT COLUMN: THE PLANETARY ORBIT CANVAS (60%) */}
          <div className={`col-span-7 flex flex-col items-center justify-center relative min-h-[580px] border backdrop-blur-xl rounded-3xl p-4 overflow-hidden shadow-2xl transition-colors duration-300 ${
            isDarkMode 
              ? "border-white/[0.04] bg-[#07070a]/50" 
              : "border-slate-200 bg-white"
          }`}>
            
            {/* Ambient Target Grid Indicators */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.12] flex items-center justify-center font-mono text-[9px] text-indigo-500">
              <div className="absolute w-[92%] h-[92%] border border-dashed border-indigo-500/50 rounded-full" />
              <div className="absolute w-[65%] h-[65%] border border-dashed border-indigo-500/40 rounded-full animate-[spin_160s_linear_infinite]" />
              <div className="absolute w-[35%] h-[35%] border border-dashed border-indigo-500/30 rounded-full animate-[spin_100s_linear_reverse_infinite]" />
              <div className="absolute w-px h-full bg-indigo-500/40" />
              <div className="absolute h-px w-full bg-indigo-500/40" />
              
              <span className="absolute top-3 left-1/2 -translate-x-1/2 tracking-[0.25em]">TECH_CONSTELLATION_SYS_V2</span>
              <span className="absolute bottom-3 left-1/2 -translate-x-1/2 tracking-[0.1em]">GRID_COORD_LOCK: SEC_06</span>
            </div>

            {/* Static dashed circular tracks */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              {categories.map((cat, idx) => {
                const radius = radii[idx];
                const isSelected = selectedCategoryId === cat.id;
                const isHovered = hoveredCategoryId === cat.id;
                return (
                  <div 
                    key={`track-${cat.id}`}
                    className="absolute rounded-full border transition-all duration-500"
                    style={{
                      width: radius * 2,
                      height: radius * 2,
                      borderColor: isSelected 
                        ? "rgba(129, 140, 248, 0.25)" 
                        : isHovered 
                        ? "rgba(129, 140, 248, 0.15)" 
                        : isDarkMode ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.05)",
                      borderStyle: isSelected || isHovered ? "dashed" : "solid",
                      borderWidth: isSelected ? "1.5px" : "1px",
                      boxShadow: isSelected ? `0 0 25px rgba(129, 140, 248, 0.05)` : "none"
                    }}
                  />
                );
              })}
            </div>

            {/* 2. CENTRAL GLOWING SPHERE (The Software Engineer Sun) */}
            <div className={`absolute w-36 h-36 rounded-full border flex flex-col items-center justify-center z-20 text-center group transition-colors duration-300 ${
              isDarkMode 
                ? "bg-[#08080c]/90 border-white/[0.08] shadow-[0_0_60px_rgba(99,102,241,0.18)]" 
                : "bg-white border-slate-200 shadow-[0_10px_35px_rgba(99,102,241,0.12)]"
            }`}>
              {/* Pulsing solar wind rings */}
              <div className="absolute inset-0 rounded-full bg-indigo-500/8 animate-ping" style={{ animationDuration: "4s" }} />
              <div className="absolute -inset-2 rounded-full border border-indigo-500/5 animate-[spin_20s_linear_infinite]" />
              
              <div className={`p-2.5 rounded-full mb-1 border group-hover:scale-110 transition-all duration-300 ${
                isDarkMode 
                  ? "bg-indigo-950/40 text-indigo-400 border-indigo-500/15 group-hover:bg-indigo-900/30" 
                  : "bg-indigo-50 text-indigo-600 border-indigo-200 group-hover:bg-indigo-100"
              }`}>
                <Cpu className="w-5 h-5 animate-pulse" />
              </div>
              <span className="font-mono text-[8px] tracking-[0.3em] text-slate-500 uppercase leading-none mb-1">CORE MATRIX</span>
              <span className={`font-sans font-black text-xs uppercase tracking-tighter px-3 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                Software Engineer
              </span>
            </div>

            {/* 3. ORBITING PLANET CARDS */}
            {categories.map((cat, idx) => {
              const angle = angles[idx];
              const radius = radii[idx];
              
              // Calculate x and y offset from center
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              const isSelected = selectedCategoryId === cat.id;
              const isHovered = hoveredCategoryId === cat.id;

              return (
                <div
                  key={cat.id}
                  className="absolute z-10"
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                    transition: isOrbiting ? "none" : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                >
                  <motion.div
                    onMouseEnter={() => setHoveredCategoryId(cat.id)}
                    onMouseLeave={() => setHoveredCategoryId(null)}
                    onClick={() => {
                      setSelectedCategoryId(cat.id);
                      setIsOrbiting(false); // Stop orbit temporarily to focus
                    }}
                    whileHover={{ scale: 1.08 }}
                    className={`cursor-pointer w-40 p-3.5 rounded-2xl transition-all duration-300 text-left relative group backdrop-blur-md ${
                      isSelected 
                        ? isDarkMode
                          ? `bg-gradient-to-br from-indigo-950/40 to-slate-900/60 border border-indigo-500/40 shadow-[0_0_25px_rgba(99,102,241,0.2)]`
                          : `bg-gradient-to-br from-indigo-50 to-white border border-indigo-400 shadow-[0_5px_15px_rgba(99,102,241,0.15)]`
                        : isHovered 
                        ? isDarkMode
                          ? "bg-white/[0.04] border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                          : "bg-slate-100/80 border border-slate-200 shadow-[0_4px_10px_rgba(0,0,0,0.05)]"
                        : isDarkMode
                        ? "bg-[#07070a]/70 border border-white/[0.04]"
                        : "bg-white/80 border border-slate-100 shadow-sm"
                    }`}
                  >
                    {/* Glowing highlight point on orbit card */}
                    <div className={`absolute top-0.5 right-2 w-1.5 h-1.5 rounded-full ${isSelected ? "bg-indigo-400 animate-pulse" : "bg-white/10"}`} />
                    
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className={`p-1.5 rounded-lg border flex-shrink-0 ${
                        isSelected 
                          ? isDarkMode 
                            ? "bg-indigo-900/30 text-indigo-400 border-indigo-500/20" 
                            : "bg-indigo-100 text-indigo-700 border-indigo-200"
                          : isDarkMode 
                          ? "bg-white/[0.03] text-slate-400 border-white/[0.04]"
                          : "bg-slate-50 text-slate-500 border-slate-200"
                      }`}>
                        {getCategoryIcon(cat.id, "w-4 h-4")}
                      </div>
                      <span className="font-mono text-[9px] text-slate-500 font-bold uppercase tracking-widest leading-none">SECTOR 0{idx+1}</span>
                    </div>

                    <h4 className={`text-xs font-black font-sans uppercase tracking-tight transition-colors duration-200 ${
                      isSelected 
                        ? isDarkMode ? "text-white" : "text-indigo-950" 
                        : isDarkMode ? "text-slate-200 group-hover:text-indigo-400" : "text-slate-700 group-hover:text-indigo-600"
                    }`}>
                      {cat.title}
                    </h4>

                    {/* Simple node count inside card */}
                    <div className="mt-2.5 flex items-center justify-between text-[8px] font-mono text-slate-500">
                      <span>STATION_LINK</span>
                      <span className={`font-bold ${isSelected ? "text-indigo-400" : ""}`}>{cat.skills.length} TOOLS</span>
                    </div>
                  </motion.div>
                </div>
              );
            })}

            {/* Orbit Constellation Simulator Dashboard Console HUD Controls */}
            <div className={`absolute bottom-5 left-5 right-5 p-3 rounded-2xl border backdrop-blur-md flex items-center justify-between font-mono text-[10px] transition-colors duration-300 ${
              isDarkMode 
                ? "border-white/[0.05] bg-slate-950/60 text-slate-400" 
                : "border-slate-200 bg-white/90 text-slate-600 shadow-sm"
            }`}>
              <div className="flex items-center gap-2">
                <button
                  id="skills-orbit-toggle"
                  onClick={() => setIsOrbiting(!isOrbiting)}
                  className={`p-2 rounded-lg flex items-center justify-center cursor-pointer transition-all ${
                    isOrbiting 
                      ? "bg-cyan-600 text-white" 
                      : "bg-indigo-600 text-white"
                  }`}
                  title={isOrbiting ? "Pause Orbital System" : "Resume Orbital System"}
                >
                  {isOrbiting ? <Pause size={11} /> : <Play size={11} />}
                </button>

                <button
                  id="skills-orbit-reset"
                  onClick={() => {
                    setAngles([0, 1.047, 2.094, 3.141, 4.188, 5.235]);
                    setIsOrbiting(true);
                  }}
                  className={`p-2 rounded-lg flex items-center justify-center cursor-pointer border transition-colors ${
                    isDarkMode 
                      ? "border-white/[0.08] hover:bg-white/[0.04]" 
                      : "border-slate-200 hover:bg-slate-100"
                  }`}
                  title="Align Orbits"
                >
                  <RotateCcw size={11} />
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <Compass size={11} className={isOrbiting ? "animate-spin text-cyan-400" : "text-slate-500"} style={{ animationDuration: "10s" }} />
                <span>GRAVITY CONST:</span>
                <input
                  type="range"
                  min="0.2"
                  max="2.5"
                  step="0.1"
                  value={orbitSpeedFactor}
                  onChange={(e) => setOrbitSpeedFactor(parseFloat(e.target.value))}
                  className="w-16 sm:w-20 accent-indigo-500 cursor-pointer h-1 rounded-full bg-slate-800"
                />
                <span>{orbitSpeedFactor.toFixed(1)}x</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: THE HOLOGRAPHIC TECH HUD DETAILED CONTROL PANEL (40%) */}
          <div className="col-span-5 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory.id}
                initial={{ opacity: 0, x: 25, filter: "blur(10px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -25, filter: "blur(10px)" }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`p-8 rounded-3xl border relative overflow-hidden min-h-[580px] flex flex-col justify-between transition-colors duration-300 ${
                  isDarkMode 
                    ? "bg-gradient-to-br from-slate-950/80 to-[#08080c]/90 border-white/[0.06] shadow-2xl text-slate-300" 
                    : "bg-white border-slate-200 shadow-xl text-slate-700"
                }`}
                style={{
                  boxShadow: isDarkMode 
                    ? `0 25px 60px rgba(0,0,0,0.8), 0 0 30px -10px ${selectedCategory.glowColor}`
                    : `0 15px 45px rgba(0,0,0,0.06), 0 0 25px -10px ${selectedCategory.glowColor}`
                }}
              >
                {/* Visual Top Decorative Gradient Strip */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${selectedCategory.color}`} />
                
                {/* Background ambient light */}
                <div className="absolute -right-16 -top-16 w-32 h-32 rounded-full opacity-[0.08] pointer-events-none filter blur-2xl" style={{ backgroundColor: selectedCategory.glowColor }} />
                
                <div>
                  {/* Telemetry metadata block */}
                  <div className="flex items-center justify-between mb-6 font-mono text-[9px] text-slate-500">
                    <span className="flex items-center gap-1.5 uppercase font-bold text-[10px]">
                      <Terminal size={12} className={selectedCategory.themeColor} /> SYSTEM_LINK_HUD
                    </span>
                    <span className={`px-2 py-0.5 rounded-full font-bold border ${isDarkMode ? "border-white/[0.05] bg-white/[0.01]" : "border-slate-200 bg-slate-50"}`}>
                      SECTOR_ACTIVE
                    </span>
                  </div>

                  {/* Header Title & Details */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`p-3 rounded-xl border flex-shrink-0 ${
                      isDarkMode 
                        ? "bg-white/[0.02] text-slate-200 border-white/[0.06]" 
                        : "bg-slate-50 text-slate-700 border-slate-200"
                    }`}>
                      {getCategoryIcon(selectedCategory.id, "w-6 h-6")}
                    </div>
                    <div>
                      <h3 className={`text-xl font-black uppercase tracking-tight font-sans ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                        {selectedCategory.title}
                      </h3>
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-0.5">
                        Ecosystem Group ID: {selectedCategory.id}_SYS
                      </p>
                    </div>
                  </div>

                  {/* Description summary */}
                  <p className={`text-xs font-light leading-relaxed mb-8 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                    {selectedCategory.description}
                  </p>

                  {/* Skill nodes & circular glowing rings */}
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                      TECHNOLOGY ECOSYSTEM INTEGRITY:
                    </h4>

                    <div className="grid grid-cols-2 gap-4 max-h-[260px] overflow-y-auto pr-1">
                      {selectedCategory.skills.map((skill, index) => (
                        <motion.div
                          key={skill.name}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`flex items-center gap-3 p-3 rounded-2xl border transition-all duration-300 ${
                            isDarkMode 
                              ? "bg-white/[0.01] border-white/[0.03] hover:border-white/10 hover:bg-white/[0.02]" 
                              : "bg-slate-50/50 border-slate-100 hover:border-indigo-500/20 hover:bg-indigo-50"
                          }`}
                        >
                          {/* Circle Icon Ring */}
                          <div className={`relative w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${isDarkMode ? "bg-slate-950" : "bg-white"}`}>
                            {/* Circle glowing ring depending on proficiency */}
                            <div 
                              className={`absolute inset-0 rounded-full border-2 ${
                                skill.level === "Advanced"
                                  ? "border-cyan-500/80 shadow-[0_0_12px_rgba(34,211,238,0.7)] animate-[pulse_2s_infinite]"
                                  : skill.level === "Intermediate"
                                  ? "border-purple-500/60 shadow-[0_0_8px_rgba(168,85,247,0.4)] animate-[pulse_3s_infinite]"
                                  : "border-indigo-400/30 shadow-[0_0_4px_rgba(129,140,248,0.2)] animate-[pulse_4s_infinite]"
                              }`}
                            />
                            <span className={`relative z-10 font-mono font-black text-xs ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>
                              {skill.code}
                            </span>
                          </div>

                          {/* Tech description and level */}
                          <div className="text-left font-sans">
                            <p className={`text-xs font-bold leading-tight truncate max-w-[120px] ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>{skill.name}</p>
                            <span className={`text-[9px] font-mono block mt-0.5 ${
                              skill.level === "Advanced" 
                                ? "text-cyan-400 font-bold" 
                                : skill.level === "Intermediate" 
                                ? "text-purple-400" 
                                : "text-indigo-400"
                            }`}>
                              {skill.level}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Legend displaying glow intensities */}
                <div className={`mt-6 pt-4 border-t border-dashed flex items-center justify-between text-[9px] font-mono text-slate-500 ${isDarkMode ? "border-white/[0.05]" : "border-slate-200"}`}>
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                      Advanced
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]" />
                      Intermediate
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400/50 shadow-[0_0_8px_#818cf8]" />
                      Learning
                    </span>
                  </div>
                  <span>Select sector to unlock HUD payload</span>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

        {/* ==================== TABLET LAYOUT: CIRCULAR GROUPED CARDS ==================== */}
        <div className="hidden sm:grid lg:hidden grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          {categories.map((cat, idx) => {
            const isSelected = selectedCategoryId === cat.id;
            return (
              <motion.div
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                whileHover={{ y: -5 }}
                className={`p-6 rounded-3xl border cursor-pointer text-left backdrop-blur-md transition-all duration-300 relative overflow-hidden ${
                  isSelected 
                    ? isDarkMode 
                      ? `bg-slate-950/80 border-indigo-500/30 shadow-[0_0_25px_rgba(99,102,241,0.15)]`
                      : `bg-white border-indigo-400 shadow-[0_5px_15px_rgba(99,102,241,0.1)]`
                    : isDarkMode 
                    ? "bg-white/[0.01] border-white/[0.04]" 
                    : "bg-white border-slate-200 shadow-sm"
                }`}
              >
                {/* Side glow strip */}
                <div className={`absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b ${cat.color}`} />
                
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-xl border ${
                    isDarkMode 
                      ? "bg-white/[0.02] border-white/[0.05]" 
                      : "bg-slate-50 border-slate-200"
                  }`}>
                    {getCategoryIcon(cat.id, "w-5 h-5 text-indigo-400")}
                  </div>
                  <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">SECTOR 0{idx+1}</span>
                </div>

                <h3 className={`text-base font-extrabold uppercase tracking-tight font-sans ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>
                  {cat.title}
                </h3>
                <p className={`text-[11px] font-light mt-1.5 leading-snug truncate ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                  {cat.description}
                </p>

                <div className={`mt-4 pt-3 border-t flex items-center justify-between text-[9px] font-mono text-slate-500 ${isDarkMode ? "border-white/[0.03]" : "border-slate-100"}`}>
                  <span>{cat.skills.length} MODULES IN STOCK</span>
                  <span className={`font-bold uppercase ${isSelected ? "text-indigo-400" : ""}`}>
                    {isSelected ? "ACTIVE" : "DETAILS →"}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ==================== MOBILE LAYOUT: STACKED GLASS CARDS WITH SWIPE ==================== */}
        <div className="flex sm:hidden flex-col gap-6 mb-12">
          <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-none snap-x snap-mandatory">
            {categories.map((cat, idx) => {
              const isSelected = selectedCategoryId === cat.id;
              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`snap-center shrink-0 w-[290px] p-6 rounded-3xl border text-left backdrop-blur-md relative overflow-hidden ${
                    isSelected 
                      ? isDarkMode 
                        ? "bg-slate-950/80 border-indigo-500/40 shadow-[0_0_20px_rgba(99,102,241,0.15)]" 
                        : "bg-white border-indigo-400 shadow-[0_5px_15px_rgba(99,102,241,0.1)]"
                      : isDarkMode 
                      ? "bg-white/[0.01] border-white/[0.04]" 
                      : "bg-white border-slate-200 shadow-sm"
                  }`}
                >
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${cat.color}`} />

                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-xl border ${
                      isDarkMode 
                        ? "bg-white/[0.02] border-white/[0.05]" 
                        : "bg-slate-50 border-slate-200"
                    }`}>
                      {getCategoryIcon(cat.id, "w-4 h-4 text-indigo-400")}
                    </div>
                    <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">SECTOR 0{idx+1}</span>
                  </div>

                  <h3 className={`text-sm font-extrabold uppercase tracking-tight mb-1 ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                    {cat.title}
                  </h3>
                  <p className={`text-[10px] font-light leading-relaxed mb-4 line-clamp-2 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                    {cat.description}
                  </p>

                  <div className={`flex items-center justify-between text-[9px] font-mono text-slate-500 border-t pt-3 mt-3 ${isDarkMode ? "border-white/[0.03]" : "border-slate-100"}`}>
                    <span>{cat.skills.length} CORE UTILITIES</span>
                    <span className={`font-bold ${isSelected ? "text-indigo-400" : isDarkMode ? "text-slate-400" : "text-slate-500"}`}>
                      {isSelected ? "SELECTED" : "TAP TO LOAD"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==================== INTERACTIVE HUD DISPLAY PANEL FOR TABLET & MOBILE ==================== */}
        <div className="block lg:hidden mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`hologram-${selectedCategory.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className={`p-6 sm:p-8 rounded-3xl border shadow-2xl text-left transition-colors duration-300 ${
                isDarkMode 
                  ? "bg-slate-950/80 border-white/[0.05]" 
                  : "bg-white border-slate-200"
              }`}
              style={{
                boxShadow: isDarkMode 
                  ? `0 20px 45px rgba(0,0,0,0.8), 0 0 25px -10px ${selectedCategory.glowColor}`
                  : `0 10px 30px rgba(0,0,0,0.05), 0 0 20px -10px ${selectedCategory.glowColor}`
              }}
            >
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b ${isDarkMode ? "border-white/[0.04]" : "border-slate-100"}`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl border ${isDarkMode ? "bg-white/[0.02] border-white/[0.04]" : "bg-slate-50 border-slate-200"}`}>
                    {getCategoryIcon(selectedCategory.id, "w-5 h-5 text-indigo-400")}
                  </div>
                  <div>
                    <h3 className={`text-lg font-extrabold uppercase font-sans ${isDarkMode ? "text-white" : "text-slate-800"}`}>
                      {selectedCategory.title}
                    </h3>
                    <p className="text-[9px] font-mono text-indigo-400 font-bold uppercase tracking-widest">
                      HUD MODULE: {selectedCategory.id}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 font-mono text-[9px]">
                  <span className="flex items-center gap-1 text-cyan-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" /> Advanced
                  </span>
                  <span className="flex items-center gap-1 text-purple-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" /> Intermediate
                  </span>
                  <span className="flex items-center gap-1 text-indigo-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" /> Learning
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 min-[440px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3.5">
                {selectedCategory.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className={`flex flex-col items-center p-3.5 rounded-2xl border transition-all duration-300 ${
                      isDarkMode 
                        ? "bg-white/[0.01] border-white/[0.03]" 
                        : "bg-slate-50 border-slate-100"
                    }`}
                  >
                    <div className={`relative w-11 h-11 rounded-full flex items-center justify-center mb-2 ${isDarkMode ? "bg-slate-950" : "bg-white"}`}>
                      <div 
                        className={`absolute inset-0 rounded-full border ${
                          skill.level === "Advanced"
                            ? "border-cyan-500/80 shadow-[0_0_10px_rgba(34,211,238,0.6)]"
                            : skill.level === "Intermediate"
                            ? "border-purple-500/50 shadow-[0_0_6px_rgba(168,85,247,0.3)]"
                            : "border-indigo-400/30"
                        }`}
                      />
                      <span className={`relative z-10 font-mono font-black text-xs ${isDarkMode ? "text-slate-200" : "text-slate-800"}`}>{skill.code}</span>
                    </div>
                    <span className={`text-[11px] font-bold text-center truncate max-w-[100px] ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}>{skill.name}</span>
                    <span className={`text-[8px] font-mono mt-0.5 ${
                      skill.level === "Advanced" ? "text-cyan-400" : skill.level === "Intermediate" ? "text-purple-400" : "text-indigo-400"
                    }`}>{skill.level}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>


        {/* ==================== BOTTOM HIGHLIGHT BANNER ==================== */}
        <div className="max-w-3xl mx-auto pt-24 pb-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`p-8.5 rounded-3xl border backdrop-blur-xl shadow-xl relative overflow-hidden group transition-colors duration-300 ${
              isDarkMode 
                ? "border-white/[0.03] bg-gradient-to-br from-[#060609]/80 to-[#0c0c11]/80" 
                : "border-slate-200 bg-white"
            }`}
          >
            {/* Ambient hover glowing backdrop strip */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/0 via-indigo-500/[0.01] to-purple-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <motion.h4
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
              className={`inline-block p-2.5 rounded-full border mb-5 relative transition-colors ${
                isDarkMode 
                  ? "bg-white/[0.02] border-white/[0.05] text-slate-400 group-hover:bg-indigo-950/20 group-hover:text-indigo-400" 
                  : "bg-slate-50 border-slate-200 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600"
              }`}
            >
              <Compass size={20} className="animate-spin" style={{ animationDuration: "12s" }} />
            </motion.h4>

            <blockquote className={`text-base sm:text-xl font-bold tracking-tight font-sans italic leading-relaxed max-w-2xl mx-auto ${
              isDarkMode ? "text-slate-300" : "text-slate-700"
            }`}>
              "Technology evolves every day—and so do I. I continuously learn, experiment, and adapt to build better software."
            </blockquote>

            <p className="text-[9px] font-mono text-cyan-400 font-bold tracking-[0.25em] uppercase mt-5">
              ADAPTABILITY // LIFELONG LEARNING // GROWTH MINDSET
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
