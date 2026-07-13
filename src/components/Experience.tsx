import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { 
  Calendar, 
  MapPin, 
  Compass, 
  Terminal, 
  ArrowRight,
  Shield,
  Award
} from "lucide-react";

interface ExperienceItem {
  id: string;
  missionNumber: string;
  missionType: string;
  role: string;
  company: string;
  duration: string;
  location: string;
  employmentType: string;
  techStack: string[];
  contributions: string[];
  achievement: string;
  color: string;
  glowColor: string;
  borderColor: string;
}

// ═════════════════════════════════════════════════════════════
// 3D TILT GLASS CARD COMPONENT
// ═════════════════════════════════════════════════════════════
function ExperienceCard({ exp, isDarkMode }: { exp: ExperienceItem; isDarkMode: boolean }) {
  const [tiltStyle, setTiltStyle] = useState({ transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)" });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Limit rotation to 6 degrees max for elegance
    const rotateX = -(y / rect.height) * 6;
    const rotateY = (x / rect.width) * 6;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ 
        transform: tiltStyle.transform,
        transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        borderColor: isHovered 
          ? exp.borderColor 
          : isDarkMode ? "rgba(255, 255, 255, 0.04)" : "rgba(148, 163, 184, 0.2)",
        boxShadow: isHovered 
          ? isDarkMode 
            ? `0 30px 60px rgba(0,0,0,0.85), 0 0 40px -5px ${exp.glowColor}` 
            : `0 20px 40px rgba(15, 23, 42, 0.08), 0 0 25px -5px ${exp.glowColor}`
          : isDarkMode 
          ? "0 15px 35px rgba(0,0,0,0.5)" 
          : "0 8px 25px rgba(15, 23, 42, 0.03)"
      }}
      className={`w-full p-6 sm:p-7 rounded-[24px] border backdrop-blur-[30px] text-left relative overflow-hidden transition-all duration-300 ${
        isHovered 
          ? isDarkMode ? `bg-[#0a0a0f]/90` : `bg-white`
          : isDarkMode 
            ? "bg-white/[0.01] border-white/[0.04] shadow-[0_15px_35px_rgba(0,0,0,0.5)]" 
            : "bg-white/80 border-slate-200/70 shadow-[0_10px_25px_rgba(0,0,0,0.02)]"
      }`}
    >
      {/* Decorative top colored strip */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${exp.color}`} />
      
      {/* Animated ambient glow element inside card on hover */}
      <div 
        className="absolute -right-20 -top-20 w-44 h-44 rounded-full opacity-[0.03] group-hover:opacity-[0.08] pointer-events-none filter blur-2xl transition-opacity duration-500" 
        style={{ backgroundColor: exp.glowColor }}
      />

      {/* Card Header Info */}
      <div className="flex items-center justify-between mb-4 font-mono text-[9px] text-slate-500">
        <span className="flex items-center gap-1.5 uppercase font-bold tracking-[0.15em]">
          <Terminal size={11} className="text-indigo-500" /> MISSION_STATION // {exp.missionNumber}
        </span>
        <span className={`px-2 py-0.5 rounded-full border tracking-wider ${
          isDarkMode 
            ? "border-white/[0.05] bg-white/[0.01] text-slate-300" 
            : "border-slate-200 bg-slate-50 text-slate-600"
        }`}>
          {exp.employmentType.toUpperCase()}
        </span>
      </div>

      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3 className={`text-lg sm:text-xl font-black uppercase tracking-tight font-sans leading-tight ${
            isDarkMode ? "text-white" : "text-slate-900"
          }`}>
            {exp.role}
          </h3>
          <p className={`text-sm font-bold mt-1 flex items-center gap-1.5 ${
            isDarkMode ? "text-slate-300" : "text-slate-700"
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            {exp.company}
          </p>
        </div>
        
        {/* Company Icon Badge */}
        <div className={`w-11 h-11 rounded-xl border flex items-center justify-center font-mono text-xs font-black transition-colors ${
          isDarkMode 
            ? "bg-white/[0.02] border-white/[0.06] text-slate-400" 
            : "bg-slate-50 border-slate-200 text-slate-500"
        }`}>
          {exp.company.substring(0, 2).toUpperCase()}
        </div>
      </div>

      {/* Meta Location & Period */}
      <div className={`flex flex-wrap gap-x-4 gap-y-1.5 mb-5 text-[11px] font-mono border-b border-dashed pb-4 ${
        isDarkMode 
          ? "text-slate-400 border-white/[0.04]" 
          : "text-slate-500 border-slate-200"
      }`}>
        <span className="flex items-center gap-1">
          <Calendar size={11} className="text-indigo-500" />
          {exp.duration}
        </span>
        <span className="flex items-center gap-1">
          <MapPin size={11} className="text-indigo-500" />
          {exp.location}
        </span>
      </div>

      {/* Core Contributions */}
      <div className="space-y-2.5 mb-5">
        <h4 className="text-[9px] font-mono font-bold tracking-[0.2em] text-slate-500 uppercase">
          MISSION TASKS LOADED:
        </h4>
        <ul className={`space-y-2 text-xs leading-relaxed font-sans ${
          isDarkMode ? "text-slate-300" : "text-slate-600"
        }`}>
          {exp.contributions.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-1 h-1 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0 shadow-[0_0_4px_rgba(129,140,248,0.8)]" />
              <p>{bullet}</p>
            </li>
          ))}
        </ul>
      </div>



      {/* Tech Stack Pills */}
      <div>
        <h4 className="text-[9px] font-mono font-bold tracking-[0.2em] text-slate-500 uppercase mb-2">
          MODULES INTEGRATED:
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {exp.techStack.map((tech) => (
            <span 
              key={tech} 
              className={`px-2 py-0.5 rounded font-mono text-[9px] font-bold ${
                isDarkMode 
                  ? "text-indigo-300 bg-indigo-950/20 border border-indigo-500/10" 
                  : "text-indigo-750 bg-indigo-50/70 border border-indigo-100"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════
// MAIN EXPERIENCE STORYTELLING SECTION
// ═════════════════════════════════════════════════════════════
export default function Experience({ isDarkMode }: { isDarkMode: boolean }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Experience Data with visual styling mappings
  const missions: ExperienceItem[] = [
    {
      id: "oges-solutions",
      missionNumber: "MISSION_01",
      missionType: "Frontend Engineering",
      role: "Frontend Developer Intern",
      company: "OGES Solutions Pvt. Ltd.",
      duration: "Jan 2026 – Mar 2026",
      location: "Gurugram, Haryana",
      employmentType: "Internship",
      techStack: ["React.js", "Angular", "TypeScript", "JavaScript", "HTML", "CSS", "REST APIs", "Git"],
      contributions: [
        "Built responsive and reusable UI components.",
        "Improved application responsiveness.",
        "Integrated REST APIs into frontend modules.",
        "Collaborated with developers using Git workflows.",
        "Enhanced user experience through modern frontend practices.",
        "Worked with Angular and React applications."
      ],
      achievement: "Successfully delivered responsive frontend features following industry development practices.",
      color: "from-cyan-500 via-blue-500 to-indigo-500",
      glowColor: "rgba(6, 182, 212, 0.25)",
      borderColor: "rgba(6, 182, 212, 0.4)"
    },
    {
      id: "smart-learning",
      missionNumber: "MISSION_02",
      missionType: "Full Stack Development",
      role: "Software Development Intern",
      company: "Smart Learning Academy",
      duration: "Mar 2025 – Aug 2025",
      location: "Remote",
      employmentType: "Remote Internship",
      techStack: ["React", "Node.js", "MongoDB", "JavaScript", "GitHub", "Java", "HTML/CSS"],
      contributions: [
        "Developed responsive web interfaces.",
        "Participated in feature development.",
        "Improved debugging and testing skills.",
        "Worked on collaborative development.",
        "Gained experience with software development lifecycle."
      ],
      achievement: "Strengthened practical full-stack development skills while working on real-world applications.",
      color: "from-purple-500 via-pink-500 to-rose-500",
      glowColor: "rgba(168, 85, 247, 0.25)",
      borderColor: "rgba(168, 85, 247, 0.4)"
    }
  ];

  // Track vertical scroll within container to animate the central lane progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Handle Mouse movement for interactive radial spotlight
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <section 
      ref={containerRef}
      id="experience" 
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden select-none font-sans py-24 sm:py-32 transition-colors duration-300 ${
        isDarkMode ? "bg-[#050505] text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      
      {/* CINEMATIC BACKGROUND LAYER: Aurora, mesh grid & floating particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Soft grid */}
        <div className={`absolute inset-0 bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] ${
          isDarkMode 
            ? "bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)]" 
            : "bg-[linear-gradient(to_right,rgba(15,23,42,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)]"
        }`} />
        
        {/* Ambient Auroras */}
        <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full filter blur-[150px] mix-blend-screen transition-opacity duration-500 ${
          isDarkMode ? "bg-cyan-500/10 opacity-30" : "bg-cyan-500/5 opacity-40"
        }`} />
        <div className={`absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full filter blur-[150px] mix-blend-screen transition-opacity duration-500 ${
          isDarkMode ? "bg-purple-500/10 opacity-30" : "bg-purple-500/5 opacity-40"
        }`} />

        {/* Spotlight following cursor */}
        <div 
          className={`absolute w-[450px] h-[450px] rounded-full filter blur-[100px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
            isDarkMode ? "bg-indigo-500/[0.04]" : "bg-indigo-500/[0.02]"
          }`}
          style={{
            left: mousePosition.x,
            top: mousePosition.y
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0 z-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 rounded-full blur-[0.5px] ${
                isDarkMode ? "bg-white/20" : "bg-indigo-600/10"
              }`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`
              }}
              animate={{
                y: [0, -55, 0],
                opacity: [0.15, 0.7, 0.15]
              }}
              transition={{
                duration: 6 + Math.random() * 9,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 5
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        {/* ==================== SECTION INTRODUCTION ==================== */}
        <div className="max-w-4xl mb-16 mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className={`text-4xl sm:text-6xl font-black tracking-tighter uppercase leading-none font-sans ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            Experience
          </motion.h2>
          <div className="h-1 bg-indigo-600 w-16 mx-auto rounded-full mt-4 animate-pulse" />
        </div>

        {/* =================================================════ */}
        {/* SIDE-BY-SIDE GRID OF INTERNSHIPS                      */}
        {/* =================================================════ */}
        <div className="max-w-5xl mx-auto py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {missions.map((exp, idx) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="w-full"
              >
                <div className="mb-4">
                  <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-widest block">
                    INTERNSHIP 0{idx + 1}
                  </span>
                  <span className={`text-xs font-black font-sans uppercase tracking-tight flex items-center gap-1.5 mt-0.5 ${
                    isDarkMode ? "text-white" : "text-slate-800"
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: idx === 0 ? "#06b6d4" : "#a855f7" }} />
                    {exp.missionType}
                  </span>
                </div>
                <ExperienceCard exp={exp} isDarkMode={isDarkMode} />
              </motion.div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}
