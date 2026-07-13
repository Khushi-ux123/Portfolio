import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Play, Pause, Zap, Compass, RotateCcw, Award, Sparkles, 
  Terminal, Globe, Cpu, Database, Layout, ShieldAlert 
} from "lucide-react";
import { skillsData, projectData, experienceData, certificationsData } from "../data";

interface SkillOrbitSystemProps {
  isDarkMode: boolean;
}

interface OrbitDefinition {
  id: string;
  name: string;
  displayName: string;
  radius: number;
  color: string;
  baseSpeed: number; // Radian increment per frame
  planetSize: number;
  planetColor: string;
  icon: React.ReactNode;
  telemetry: {
    status: string;
    description: string;
    items: string[];
    details?: { title: string; subtitle: string; desc: string }[];
  };
}

export default function SkillOrbitSystem({ isDarkMode }: SkillOrbitSystemProps) {
  // State for Orbit simulation parameters
  const [isPlaying, setIsPlaying] = useState(true);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [isReversed, setIsReversed] = useState(false);
  const [isAligned, setIsAligned] = useState(false);
  
  // Angle states for each orbit planet (in radians)
  const [angles, setAngles] = useState<number[]>([0.2, 1.5, 3.1, 4.2, 5.5]);
  const [activeOrbitId, setActiveOrbitId] = useState<string>("orbit-1");
  const [hoveredOrbitId, setHoveredOrbitId] = useState<string | null>(null);

  // Animation Frame reference
  const requestRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  // Orbits definitions reflecting actual tech stack & projects
  const orbits: OrbitDefinition[] = [
    {
      id: "orbit-1",
      name: "Programming Core",
      displayName: "Orbit Alpha: Lang Core",
      radius: 65,
      color: "rgba(99, 102, 241, 0.45)", // Indigo
      baseSpeed: 0.012,
      planetSize: 14,
      planetColor: "#6366f1",
      icon: <Cpu size={14} className="text-indigo-400" />,
      telemetry: {
        status: "STABLE ORBIT",
        description: "Foundational programming paradigms and languages utilized in standard system logic.",
        items: ["Java (OOP)", "Python (Data/ML)", "JavaScript (ES6+)", "TypeScript (Typesafe)"]
      }
    },
    {
      id: "orbit-2",
      name: "Frontend Sector",
      displayName: "Orbit Beta: Frontend UI",
      radius: 110,
      color: "rgba(16, 185, 129, 0.45)", // Emerald
      baseSpeed: 0.008,
      planetSize: 18,
      planetColor: "#10b981",
      icon: <Layout size={14} className="text-emerald-400" />,
      telemetry: {
        status: "ACTIVE SYNC",
        description: "Modern single-page-app declarative frameworks and semantic utility tooling.",
        items: ["React.js", "Angular 18", "Tailwind CSS", "TypeScript", "HTML5 & CSS3"]
      }
    },
    {
      id: "orbit-3",
      name: "Backend Hub",
      displayName: "Orbit Gamma: Backend",
      radius: 155,
      color: "rgba(245, 158, 11, 0.45)", // Amber
      baseSpeed: 0.006,
      planetSize: 16,
      planetColor: "#f59e0b",
      icon: <Database size={14} className="text-amber-400" />,
      telemetry: {
        status: "NOMINAL INTEGRITY",
        description: "Server architecture, low-latency REST APIs, and multi-paradigm database storage.",
        items: ["Node.js (V8)", "Express.js", "MongoDB (NoSQL)", "SQL (Relational)"]
      }
    },
    {
      id: "orbit-4",
      name: "AI & Innovation",
      displayName: "Orbit Delta: Projects",
      radius: 205,
      color: "rgba(236, 72, 153, 0.45)", // Pink
      baseSpeed: 0.004,
      planetSize: 22,
      planetColor: "#ec4899",
      icon: <Sparkles size={14} className="text-pink-400" />,
      telemetry: {
        status: "HIGH FLUX",
        description: "Interactive real-world deployment portals and algorithmic engineering.",
        items: [
          "Mindwell AI (React & TS)",
          "SignBridge AI (Python & CV)",
          "E-Commerce Marketplace (Node & Mongo)",
          "FlowForge Dashboard"
        ],
        details: [
          { title: "SignBridge AI", subtitle: "Machine Learning / Computer Vision", desc: "Real-time Indian Sign Language translator built with OpenCV and Hand-Tracking." },
          { title: "Mindwell AI", subtitle: "Cognitive Web Assistant", desc: "Responsive AI-assistant web interfaces utilizing clean local states and Tailwind UI." },
          { title: "FlowForge Dashboard", subtitle: "Enterprise SaaS Interface", desc: "Full-stack project and task management client with live telemetry metrics." }
        ]
      }
    },
    {
      id: "orbit-5",
      name: "Experience & Credentials",
      displayName: "Orbit Epsilon: Achievements",
      radius: 255,
      color: "rgba(168, 85, 247, 0.45)", // Purple
      baseSpeed: 0.0025,
      planetSize: 20,
      planetColor: "#a855f7",
      icon: <Award size={14} className="text-purple-400" />,
      telemetry: {
        status: "VERIFIED",
        description: "Industry internships, formal academies, and cybersecurity validation.",
        items: [
          "OGES Solutions (Frontend Intern)",
          "Smart Learning Academy (Programming)",
          "Cisco Cybersecurity Essentials",
          "Cisco Intro to Cybersecurity"
        ]
      }
    }
  ];

  // Tick physics simulation using requestAnimationFrame
  useEffect(() => {
    const tick = () => {
      if (isPlaying && !isAligned) {
        setAngles((prevAngles) =>
          prevAngles.map((angle, idx) => {
            const speed = orbits[idx].baseSpeed * speedMultiplier;
            const direction = isReversed ? -1 : 1;
            return (angle + speed * direction) % (Math.PI * 2);
          })
        );
      }
      requestRef.current = requestAnimationFrame(tick);
    };

    requestRef.current = requestAnimationFrame(tick);
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPlaying, speedMultiplier, isReversed, isAligned]);

  // Aligns all planets into a linear conjunction eclipse pattern
  const handleAlignPlanets = () => {
    if (isAligned) {
      setIsAligned(false);
    } else {
      setIsAligned(true);
      // Align all to identical starting radial line (0 radians)
      setAngles([0, 0, 0, 0, 0]);
    }
  };

  const activeOrbit = orbits.find((o) => o.id === activeOrbitId) || orbits[0];
  const displayedOrbit = hoveredOrbitId 
    ? (orbits.find((o) => o.id === hoveredOrbitId) || activeOrbit)
    : activeOrbit;

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6">
      {/* 1. Left Hand Side: The Planetary SVG Space Canvas */}
      <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
        
        {/* Orbital Center Dashboard Container */}
        <div className="w-full aspect-square max-w-[530px] relative rounded-3xl border border-slate-200/40 dark:border-slate-800/60 bg-slate-100/10 dark:bg-slate-950/20 backdrop-blur-md overflow-hidden flex items-center justify-center p-4">
          
          {/* Subtle decorative target scope gridlines */}
          <div className="absolute inset-0 pointer-events-none opacity-10 dark:opacity-20 flex items-center justify-center font-mono text-[9px] text-indigo-500">
            <div className="absolute w-[90%] h-[90%] border border-dashed border-indigo-500 rounded-full" />
            <div className="absolute w-[60%] h-[60%] border border-dashed border-indigo-500 rounded-full animate-[spin_120s_linear_infinite]" />
            <div className="absolute w-[30%] h-[30%] border border-dashed border-indigo-500 rounded-full" />
            <div className="absolute w-px h-full bg-indigo-500" />
            <div className="absolute h-px w-full bg-indigo-500" />
            
            <span className="absolute top-2 left-1/2 -translate-x-1/2">GRID: NEST-5</span>
            <span className="absolute right-2 top-1/2 -translate-y-1/2">LAT: 28.15°</span>
            <span className="absolute bottom-2 left-1/2 -translate-x-1/2">HELIOCENTRIC_MD</span>
          </div>

          {/* Interactive SVG Viewport */}
          <svg
            viewBox="0 0 540 540"
            className="w-full h-full relative z-10 select-none overflow-visible"
          >
            {/* Define glowing neon filters */}
            <defs>
              <filter id="glow-indigo" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="glow-emerald" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="glow-amber" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="glow-pink" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="glow-purple" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <filter id="core-sun-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="12" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* A. RENDER THE STATIC ORBIT PATHS (Dashed Rings) */}
            {orbits.map((orbit) => (
              <circle
                key={`path-${orbit.id}`}
                cx="270"
                cy="270"
                r={orbit.radius}
                fill="none"
                stroke={orbit.color}
                strokeWidth={
                  activeOrbitId === orbit.id || hoveredOrbitId === orbit.id ? 2 : 1.2
                }
                strokeDasharray={
                  activeOrbitId === orbit.id || hoveredOrbitId === orbit.id ? "6, 4" : "4, 6"
                }
                className="transition-all duration-300"
                style={{
                  opacity: hoveredOrbitId === orbit.id ? 1 : 0.65,
                }}
              />
            ))}

            {/* B. CENTRAL STAR: Khushi IT core (The Sun) */}
            <g
              className="cursor-pointer group"
              onClick={() => setActiveOrbitId("orbit-1")}
            >
              {/* Massive Outer ambient pulse */}
              <circle
                cx="270"
                cy="270"
                r="36"
                fill="rgba(79, 70, 229, 0.12)"
                className="animate-ping"
                style={{ animationDuration: "4s" }}
              />
              {/* core sun glow */}
              <circle
                cx="270"
                cy="270"
                r="26"
                fill="url(#core-sun-gradient)"
                className="shadow-2xl"
                filter="url(#core-sun-glow)"
              />
              {/* Inner physical body */}
              <circle
                cx="270"
                cy="270"
                r="22"
                fill="#4f46e5"
                className="transition-transform group-hover:scale-105 duration-300"
              />
              {/* Dynamic symbol inside core sun */}
              <text
                x="270"
                y="274"
                textAnchor="middle"
                fill="#ffffff"
                className="font-mono font-bold text-[10px] tracking-wide"
              >
                IT
              </text>

              <radialGradient id="core-sun-gradient">
                <stop offset="0%" stopColor="#818cf8" />
                <stop offset="70%" stopColor="#4f46e5" />
                <stop offset="100%" stopColor="#312e81" />
              </radialGradient>
            </g>

            {/* C. RENDER REVOLVING PLANETS & HOVER SCOPES */}
            {orbits.map((orbit, idx) => {
              const angle = angles[idx];
              // Compute (x, y) coordinates of planet
              const px = 270 + orbit.radius * Math.cos(angle);
              const py = 270 + orbit.radius * Math.sin(angle);

              // Get glow filter ID depending on category
              let glowId = "glow-indigo";
              if (orbit.id === "orbit-2") glowId = "glow-emerald";
              if (orbit.id === "orbit-3") glowId = "glow-amber";
              if (orbit.id === "orbit-4") glowId = "glow-pink";
              if (orbit.id === "orbit-5") glowId = "glow-purple";

              const isCurrentActive = activeOrbitId === orbit.id;
              const isCurrentHovered = hoveredOrbitId === orbit.id;

              return (
                <g
                  key={`planet-${orbit.id}`}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredOrbitId(orbit.id)}
                  onMouseLeave={() => setHoveredOrbitId(null)}
                  onClick={() => setActiveOrbitId(orbit.id)}
                >
                  {/* Subtle target crosshairs if hovered or active */}
                  {(isCurrentActive || isCurrentHovered) && (
                    <g>
                      <circle
                        cx={px}
                        cy={py}
                        r={orbit.planetSize + 8}
                        fill="none"
                        stroke={orbit.planetColor}
                        strokeWidth="0.8"
                        strokeDasharray="2, 2"
                        className="animate-[spin_10s_linear_infinite]"
                      />
                      <line
                        x1={px - orbit.planetSize - 12}
                        y1={py}
                        x2={px + orbit.planetSize + 12}
                        y2={py}
                        stroke={orbit.planetColor}
                        strokeWidth="0.6"
                        opacity="0.5"
                      />
                      <line
                        x1={px}
                        y1={py - orbit.planetSize - 12}
                        x2={px}
                        y2={py + orbit.planetSize + 12}
                        stroke={orbit.planetColor}
                        strokeWidth="0.6"
                        opacity="0.5"
                      />
                    </g>
                  )}

                  {/* Planet body */}
                  <circle
                    cx={px}
                    cy={py}
                    r={orbit.planetSize}
                    fill={orbit.planetColor}
                    filter={`url(#${glowId})`}
                    className="transition-all duration-300 hover:scale-110"
                    style={{
                      transformOrigin: `${px}px ${py}px`,
                    }}
                  />

                  {/* Special planetary detail: Saturn style beautiful ring structure for Orbit 5 */}
                  {orbit.id === "orbit-5" && (
                    <ellipse
                      cx={px}
                      cy={py}
                      rx={orbit.planetSize + 10}
                      ry="4"
                      fill="none"
                      stroke="rgba(168, 85, 247, 0.7)"
                      strokeWidth="2.5"
                      transform={`rotate(-20, ${px}, ${py})`}
                      className="pointer-events-none"
                    />
                  )}

                  {/* Special planetary detail: Jupiter ring for Orbit 4 */}
                  {orbit.id === "orbit-4" && (
                    <ellipse
                      cx={px}
                      cy={py}
                      rx={orbit.planetSize + 8}
                      ry="3.5"
                      fill="none"
                      stroke="rgba(236, 72, 153, 0.6)"
                      strokeWidth="1.5"
                      transform={`rotate(15, ${px}, ${py})`}
                      className="pointer-events-none"
                    />
                  )}

                  {/* Floating micro planet number text label */}
                  <text
                    x={px}
                    y={py + 3.5}
                    textAnchor="middle"
                    fill="#ffffff"
                    className="font-mono text-[8px] font-extrabold select-none pointer-events-none"
                  >
                    {idx + 1}
                  </text>

                  {/* Orbit Label tag floating slightly above/below the planet */}
                  {(isCurrentActive || isCurrentHovered) && (
                    <g className="pointer-events-none select-none">
                      {/* background tooltip pill */}
                      <rect
                        x={px - 50}
                        y={py - orbit.planetSize - 22}
                        width="100"
                        height="15"
                        rx="4"
                        fill={isDarkMode ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.95)"}
                        stroke={orbit.planetColor}
                        strokeWidth="1"
                        className="shadow-xl"
                      />
                      <text
                        x={px}
                        y={py - orbit.planetSize - 12}
                        textAnchor="middle"
                        fill={isDarkMode ? "#cbd5e1" : "#1e293b"}
                        className="font-mono text-[8px] font-bold tracking-tight"
                      >
                        {orbit.name}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* 2. Interactive Orbit Simulator Dashboard Panel Controls */}
        <div className={`mt-5 p-3.5 rounded-2xl border w-full max-w-[500px] flex flex-wrap gap-3 items-center justify-between font-mono text-[10px] ${
          isDarkMode ? "bg-slate-900/50 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-700"
        }`}>
          <div className="flex items-center gap-2">
            <button
              id="orbit-control-play-pause"
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-2 rounded-lg flex items-center justify-center cursor-pointer transition-all ${
                isPlaying 
                  ? "bg-amber-600 text-white" 
                  : "bg-indigo-600 text-white"
              }`}
              title={isPlaying ? "Pause orbit revolution" : "Play orbit revolution"}
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            </button>

            <button
              id="orbit-control-reverse"
              onClick={() => setIsReversed(!isReversed)}
              className={`p-2 rounded-lg flex items-center justify-center cursor-pointer border ${
                isDarkMode ? "border-slate-800 hover:bg-slate-800" : "border-slate-200 hover:bg-slate-100"
              }`}
              title="Reverse planetary orbital rotation"
            >
              <RotateCcw size={12} className={isReversed ? "rotate-180 transition-transform" : "transition-transform"} />
            </button>

            <button
              id="orbit-control-align"
              onClick={handleAlignPlanets}
              className={`px-2.5 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer border font-bold ${
                isAligned 
                  ? "bg-pink-600 text-white border-pink-500" 
                  : isDarkMode ? "border-slate-800 hover:bg-slate-800 text-slate-300" : "border-slate-200 hover:bg-slate-100 text-slate-700"
              }`}
              title="Align all planets to linear conjunction coordinate"
            >
              <Compass size={12} className={isAligned ? "animate-spin" : ""} />
              {isAligned ? "CONJUNCTION_ON" : "ALIGN"}
            </button>
          </div>

          {/* Speed slider representing gravitational constant */}
          <div className="flex items-center gap-2 flex-grow sm:flex-none justify-end">
            <Zap size={11} className="text-amber-500" />
            <span>GRAVITY: {speedMultiplier.toFixed(1)}x</span>
            <input
              id="orbit-gravity-speed-slider"
              type="range"
              min="0.2"
              max="2.5"
              step="0.1"
              value={speedMultiplier}
              onChange={(e) => {
                setSpeedMultiplier(parseFloat(e.target.value));
                if (isAligned) setIsAligned(false);
              }}
              className="w-20 sm:w-24 accent-indigo-600 cursor-pointer h-1.5 rounded-lg bg-slate-200 dark:bg-slate-800"
            />
          </div>
        </div>

      </div>

      {/* 2. Right Hand Side: Interactive Holographic Telemetry Controls Panel */}
      <div className="lg:col-span-5 flex flex-col h-full justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={displayedOrbit.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className={`p-6 sm:p-8 rounded-3xl border flex flex-col h-full justify-between transition-all duration-300 min-h-[380px] shadow-xl relative overflow-hidden ${
              isDarkMode
                ? "bg-slate-900/60 border-slate-800 shadow-slate-950/40"
                : "bg-white border-slate-200 shadow-slate-200/50"
            }`}
            style={{
              borderColor: displayedOrbit.color,
              boxShadow: isDarkMode 
                ? `0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 20px -5px ${displayedOrbit.color.replace("0.45", "0.08")}`
                : `0 10px 30px -10px rgba(148, 163, 184, 0.12), 0 0 20px -5px ${displayedOrbit.color.replace("0.45", "0.05")}`
            }}
          >
            {/* Ambient decorative layout backdrop item */}
            <div 
              className="absolute -right-16 -top-16 w-32 h-32 rounded-full opacity-10 pointer-events-none filter blur-2xl"
              style={{ backgroundColor: displayedOrbit.planetColor }}
            />

            <div>
              {/* Telemetry metadata block */}
              <div className="flex items-center justify-between mb-5 font-mono text-[9px] text-slate-400">
                <span className="flex items-center gap-1.5 uppercase font-bold text-[10px]">
                  <Terminal size={12} style={{ color: displayedOrbit.planetColor }} /> Telemetry HUD Sector
                </span>
                <span 
                  className="px-2 py-0.5 rounded-full font-bold border"
                  style={{ 
                    color: displayedOrbit.planetColor,
                    borderColor: displayedOrbit.planetColor,
                    backgroundColor: `${displayedOrbit.planetColor}15`
                  }}
                >
                  {displayedOrbit.telemetry.status}
                </span>
              </div>

              {/* Header Title with relative icon */}
              <div className="flex items-center gap-3.5 mb-4">
                <div 
                  className="p-3 rounded-xl flex-shrink-0"
                  style={{ backgroundColor: `${displayedOrbit.planetColor}18` }}
                >
                  {displayedOrbit.icon}
                </div>
                <div>
                  <h3 className={`text-xl font-bold font-sans ${isDarkMode ? "text-white" : "text-slate-900"}`}>
                    {displayedOrbit.name}
                  </h3>
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-0.5">
                    {displayedOrbit.displayName}
                  </p>
                </div>
              </div>

              {/* Description summary */}
              <p className={`text-xs font-sans leading-relaxed mb-6 ${isDarkMode ? "text-slate-300" : "text-slate-600"}`}>
                {displayedOrbit.telemetry.description}
              </p>

              {/* Render dynamic skill nodes or project specifications */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">
                  Orbit Payload nodes:
                </h4>

                {displayedOrbit.telemetry.details ? (
                  /* Render deep projects sub-items details */
                  <div className="space-y-3.5 max-h-[180px] overflow-y-auto pr-1">
                    {displayedOrbit.telemetry.details.map((detail, dIdx) => (
                      <div 
                        key={dIdx}
                        className={`p-3 rounded-xl border text-left font-sans ${
                          isDarkMode ? "bg-slate-950/65 border-slate-800" : "bg-slate-50 border-slate-200"
                        }`}
                      >
                        <p className={`text-xs font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>{detail.title}</p>
                        <p className="text-[10px] font-mono text-indigo-400 font-bold mt-0.5">{detail.subtitle}</p>
                        <p className={`text-[10px] mt-1.5 leading-relaxed ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>{detail.desc}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Render standard skill nodes list badges */
                  <div className="flex flex-wrap gap-2">
                    {displayedOrbit.telemetry.items.map((item, itemIdx) => (
                      <span
                        key={itemIdx}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-mono tracking-tight border transition-colors ${
                          isDarkMode
                            ? "bg-slate-950 text-slate-300 border-slate-800 hover:text-white"
                            : "bg-slate-50 text-slate-700 border-slate-200"
                        }`}
                        style={{
                          borderColor: hoveredOrbitId === displayedOrbit.id || activeOrbitId === displayedOrbit.id
                            ? `${displayedOrbit.planetColor}30` 
                            : undefined
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Sector Guidance system */}
            <div className={`mt-8 pt-4 border-t border-dashed flex items-center justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500`}>
              <div className="flex items-center gap-1.5">
                <Globe size={12} className="text-slate-400 animate-spin" style={{ animationDuration: "20s" }} />
                <span>INDEX_COORD: 0.{displayedOrbit.radius}AU</span>
              </div>
              <span className="text-right">Click planets to lock orbit telemetry</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
