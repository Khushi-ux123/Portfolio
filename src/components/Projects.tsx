import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import mindwellImage from "../assets/images/mindwell_ai_1783921691508.jpg";
import flowforgeImage from "../assets/images/flowforge_dashboard_1783921707398.jpg";
import shopsphereImage from "../assets/images/shopsphere_marketplace_1783921721522.jpg";
import signbridgeImage from "../assets/images/signbridge_ai_gesture_1783921735077.jpg";
import { 
  Github, 
  ExternalLink, 
  ArrowUpRight, 
  Cpu, 
  Layers, 
  CheckCircle,
  Code2,
  GitBranch,
  Terminal,
  Activity,
  Laptop,
  Tablet,
  Smartphone,
  Play,
  Settings,
  ChevronRight,
  Sparkles,
  Info,
  Lightbulb,
  X
} from "lucide-react";

// Types mapping directly to full-fidelity case study data
interface ProjectStats {
  techUsed: number;
  componentsBuilt: number;
  featuresDelivered: number;
  repositories: number;
  deploymentStatus: string;
  duration: string;
  linesOfCode: string;
}

interface ProjectData {
  id: string;
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: string[];
  architecture: string;
  role: string;
  challenges: string;
  whatILearned: string;
  githubUrl: string;
  liveUrl: string;
  colorFrom: string;
  colorTo: string;
  glowColor: string;
  bgGradient: string;
  stats: ProjectStats;
  codeSnippet: string;
  architectureNodes: string[];
  image: string;
}

const projects: ProjectData[] = [
  {
    id: "mindwell-ai",
    title: "MindWell AI",
    category: "AI Powered Mental Wellness Platform",
    description: "An intelligent mental wellness platform designed to help users monitor their emotional well-being through AI-powered conversations, mood tracking, journaling, meditation, and personalized wellness insights.",
    problem: "Many people struggle to monitor their mental health consistently due to high-friction trackers or lack of immediate personalized grounding resources.",
    solution: "Built a high-performance, private, client-first AI-powered mental wellness ecosystem that facilitates positive mindfulness schedules, custom breathing guides, and encrypted journaling sessions.",
    features: [
      "AI Chat Assistant for grounding simulations",
      "Mood Tracking Dashboard with statistical filters",
      "Encrypted Daily Journal & historical vault",
      "Mindfulness Meditation Sessions with audio cues",
      "Inspirational Quote generators & widget nodes",
      "Progress Analytics for sentiment trends"
    ],
    technologies: ["React", "TypeScript", "Firebase", "Tailwind CSS", "AI APIs", "Framer Motion"],
    architecture: "Modern component-based frontend with Google cloud auth integrations, encrypted firestore collections, and optimized async pipeline triggers.",
    role: "Lead Full-Stack Developer",
    challenges: "Calibrating real-time conversational states and fluid breathing vector overlays without memory leaks or UI frame drops; resolved by isolating custom state bounds and utilizing CSS composition layers.",
    whatILearned: "Mastered responsive react component design patterns, private local client data caching, and custom GPU-accelerated motion rendering loops.",
    githubUrl: "https://github.com/Khushi-ux123",
    liveUrl: "https://github.com/Khushi-ux123",
    colorFrom: "#a855f7", // Purple
    colorTo: "#3b82f6", // Blue
    glowColor: "rgba(168, 85, 247, 0.4)",
    bgGradient: "from-purple-950/20 via-[#0a0515]/80 to-blue-950/20",
    stats: {
      techUsed: 6,
      componentsBuilt: 24,
      featuresDelivered: 8,
      repositories: 1,
      deploymentStatus: "Production Ready",
      duration: "3 Months",
      linesOfCode: "4.8K"
    },
    architectureNodes: ["React Core", "Firebase Auth", "Firestore DB", "Gemini AI Engine"],
    image: mindwellImage,
    codeSnippet: `// MindWell AI - AI Session Generator Core
export async function initializeAISession(userId: string) {
  const sessionToken = crypto.randomUUID();
  const baseVector = await fetchSentimentVector(userId);
  
  return {
    token: sessionToken,
    activePrompt: "Calibrate breathing node 1",
    weightOffset: baseVector.score > 0.7 ? 1.05 : 0.95,
    timestamp: Date.now()
  };
}`
  },
  {
    id: "flowforge",
    title: "FlowForge",
    category: "Project Management Platform",
    description: "A collaborative project management system designed for teams to efficiently manage tasks, deadlines, and workflows through role-based access and real-time dashboards.",
    problem: "Traditional management trackers are cluttered, slow to synchronize, and lack intuitive visual statistics for fast-moving developers.",
    solution: "Engineered a high-speed MERN dashboard with instant state updates, dynamic visual charts, role protections, and a clean workflow interface.",
    features: [
      "Dynamic Task Management with status lanes",
      "Real-time Team Collaboration pipelines",
      "Interactive Analytics Dashboard with recharts",
      "Role-Based Access Control and protect gates",
      "Secure Sandbox Authentication filters",
      "Granular Activity Tracking and audit logs",
      "Visual Project Timelines and milestone nodes"
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT", "Tailwind CSS"],
    architecture: "React.js and TypeScript frontend served by an Express/Node.js API layer with secure JSON Web Tokens (JWT) and a MongoDB data cluster.",
    role: "Full-Stack Developer",
    challenges: "Preventing race conditions when multiple users update task nodes simultaneously; handled by optimizing Mongo aggregate pipelines and using socket-ready hooks.",
    whatILearned: "Deepened expertise in atomic database updates, RESTful routing structures, and fluid dashboard analytics components.",
    githubUrl: "https://github.com/Khushi-ux123",
    liveUrl: "https://flowforge-project-management.onrender.com/",
    colorFrom: "#3b82f6", // Blue
    colorTo: "#06b6d4", // Cyan
    glowColor: "rgba(59, 130, 246, 0.4)",
    bgGradient: "from-blue-950/20 via-[#050b15]/80 to-cyan-950/20",
    stats: {
      techUsed: 6,
      componentsBuilt: 32,
      featuresDelivered: 10,
      repositories: 2,
      deploymentStatus: "Live & Healthy",
      duration: "5 Months",
      linesOfCode: "7.2K"
    },
    architectureNodes: ["React UI Node", "Express API Router", "JWT Auth Gate", "MongoDB Cluster"],
    image: flowforgeImage,
    codeSnippet: `// FlowForge - Real-Time Dashboard Pipeline
const taskUpdateSchema = new mongoose.Schema({
  taskId: mongoose.Schema.Types.ObjectId,
  status: { type: String, enum: ['Backlog', 'In-Progress', 'Done'] },
  updatedBy: String,
  version: { type: Number, default: 0 }
});

taskUpdateSchema.pre('save', function(next) {
  this.version += 1;
  next();
});`
  },
  {
    id: "shopsphere",
    title: "ShopSphere",
    category: "Multi Vendor Marketplace",
    description: "A modern e-commerce platform enabling multiple vendors to manage products, customers, and orders with secure authentication and responsive shopping experiences.",
    problem: "Building a reliable multi-vendor workflow is complex, requiring secure authorization levels, inventory state controls, and rapid loading times.",
    solution: "Built a comprehensive full-stack ecosystem managing independent product files, checkout sequences, and merchant statistics in real-time.",
    features: [
      "Merchant Vendor Dashboard with sales graphs",
      "Customer Dashboard with past logs",
      "Secure Multi-Role Authentication",
      "Personalized Wishlists and item caches",
      "Dynamic Product Management & tagging",
      "Instant faceted search with filters",
      "Fluid Persistent Shopping Cart nodes"
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "JWT", "Tailwind CSS"],
    architecture: "React SPA frontend communicating with a scalable Node.js backend using MongoDB indexes and express router architectures.",
    role: "Full-Stack Developer",
    challenges: "Managing inventory synchronization across multiple active buyers; resolved by implementing transactional locks and mongoose aggregate middleware.",
    whatILearned: "Learned advanced payment routing concepts, vendor data schema design, and secure merchant payload isolation.",
    githubUrl: "https://github.com/Khushi-ux123",
    liveUrl: "https://multi-vendor-marketplace-978813914012.asia-southeast1.run.app/",
    colorFrom: "#f97316", // Orange
    colorTo: "#a855f7", // Purple
    glowColor: "rgba(249, 115, 22, 0.4)",
    bgGradient: "from-orange-950/20 via-[#100715]/80 to-purple-950/20",
    stats: {
      techUsed: 6,
      componentsBuilt: 40,
      featuresDelivered: 12,
      repositories: 2,
      deploymentStatus: "Live on Cloud Run",
      duration: "4 Months",
      linesOfCode: "8.1K"
    },
    architectureNodes: ["Merchant View", "Catalog Parser", "Express Controller", "Atlas Database"],
    image: shopsphereImage,
    codeSnippet: `// ShopSphere - Multi-Vendor Transaction Shield
app.post("/api/checkout", authenticateToken, async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const inventory = await checkStocks(req.body.items, session);
    if (!inventory.valid) throw new Error("Out of stock");
    const order = await processOrder(req.user, session);
    await session.commitTransaction();
    res.json({ success: true, orderId: order._id });
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
});`
  },
  {
    id: "signbridge-ai",
    title: "SignBridge AI",
    category: "AI Sign Language Translator",
    description: "An AI-based sign language recognition system that translates hand gestures into understandable text using computer vision and machine learning.",
    problem: "The severe lack of standard real-time translators makes daily interactions difficult for hearing-impaired individuals in commercial or public environments.",
    solution: "Built a high-speed machine learning model that parses camera frames to recognize and translate sign gestures into fluid, readable text instantly.",
    features: [
      "Live Camera Detection and low-latency tracking",
      "Dynamic Indian Sign Language Gesture recognition",
      "OpenCV frame optimization algorithms",
      "Lightweight machine learning classification models",
      "Highly accessible user interface layouts"
    ],
    technologies: ["Python", "OpenCV", "Machine Learning", "NumPy", "Framer Motion"],
    architecture: "Python-based OpenCV video pipeline integrated with a MediaPipe hand tracking framework and custom Deep Learning classification models.",
    role: "Computer Vision Engineer",
    challenges: "Translating micro-finger movements accurately under poor lighting conditions; mitigated by calibrating color thresholds and training models on diverse datasets.",
    whatILearned: "Gained robust hands-on experience in computer vision, spatial data matrices, and real-time inference frameworks.",
    githubUrl: "https://github.com/Khushi-ux123",
    liveUrl: "https://github.com/Khushi-ux123/SignBridge-AI",
    colorFrom: "#10b981", // Green
    colorTo: "#06b6d4", // Cyan
    glowColor: "rgba(16, 185, 129, 0.4)",
    bgGradient: "from-emerald-950/20 via-[#05150f]/80 to-cyan-950/20",
    stats: {
      techUsed: 5,
      componentsBuilt: 16,
      featuresDelivered: 6,
      repositories: 1,
      deploymentStatus: "Prototype Stable",
      duration: "3 Months",
      linesOfCode: "3.5K"
    },
    architectureNodes: ["Camera Stream", "OpenCV Processor", "MediaPipe Tracker", "ML Classifier Model"],
    image: signbridgeImage,
    codeSnippet: `# SignBridge AI - Hand Landmark Classification Core
import cv2
import numpy as np

def extract_landmark_matrix(results):
    if not results.multi_hand_landmarks:
        return np.zeros(21 * 3)
    landmarks = []
    for lm in results.multi_hand_landmarks[0].landmark:
        landmarks.extend([lm.x, lm.y, lm.z])
    return np.array(landmarks, dtype=np.float32)`
  }
];

// Counting Animator for premium statistics
function CountingStat({ value, suffix = "", isDarkMode }: { value: number; suffix?: string; isDarkMode?: boolean }) {
  const [current, setCurrent] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(elementRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = value;
    if (start === end) return;
    
    const duration = 1500; // ms
    const increment = end / (duration / 16);
    let timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCurrent(end);
        clearInterval(timer);
      } else {
        setCurrent(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <span ref={elementRef} className={`font-mono text-3xl sm:text-4xl font-black leading-none ${isDarkMode ? "text-white" : "text-slate-900"}`}>
      {current}
      {suffix}
    </span>
  );
}

export default function Projects({ isDarkMode }: { isDarkMode: boolean }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<ProjectData | null>(null);
  const [tiltStyle, setTiltStyle] = useState({ transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)" });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const activeProj = projects[activeIdx];

  // Mouse Move tracking for section-wide aurora following and mock interactive tilt
  const handleSectionMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMockupMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / rect.height) * 8; // 8 degrees max tilt
    const rotateY = (x / rect.width) * 8;
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    });
  };

  const handleMockupMouseLeave = () => {
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)"
    });
  };

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      onMouseMove={handleSectionMouseMove}
      className={`relative min-h-screen overflow-hidden py-24 sm:py-32 font-sans transition-all duration-1000 ${
        isDarkMode ? "bg-[#030303] text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      
      {/* ═════════════════════════════════════════════════════════════
          CINEMATIC GLOBAL LAYER (Mesh Gradients, Aurora Lights & Grid)
          ═════════════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none z-0">
        
        {/* Soft elegant grid lines */}
        <div className={`absolute inset-0 bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] ${
          isDarkMode 
            ? "bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)]" 
            : "bg-[linear-gradient(to_right,rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.035)_1px,transparent_1px)]"
        }`} />

        {/* Dynamic Theme Color Spotlight */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProj.id + "_aurora_1"}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isDarkMode ? 0.35 : 0.15, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[700px] h-[700px] rounded-full filter blur-[160px] mix-blend-screen"
            style={{ background: `radial-gradient(circle, ${activeProj.glowColor} 0%, transparent 70%)` }}
          />
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeProj.id + "_aurora_2"}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isDarkMode ? 0.25 : 0.1, scale: 1.1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute bottom-1/4 right-1/4 translate-x-1/4 w-[600px] h-[600px] rounded-full filter blur-[150px] mix-blend-screen"
            style={{ background: `radial-gradient(circle, ${activeProj.colorTo}30 0%, transparent 70%)` }}
          />
        </AnimatePresence>

        {/* Light rays following actual user cursor in section background */}
        <div 
          className={`absolute w-[400px] h-[400px] rounded-full filter blur-[100px] pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300 ${
            isDarkMode ? "opacity-[0.06]" : "opacity-[0.03]"
          }`}
          style={{
            left: cursorPos.x,
            top: cursorPos.y,
            background: `radial-gradient(circle, ${activeProj.colorFrom} 0%, transparent 70%)`
          }}
        />

        {/* Floating cinematic space dust particles */}
        <div className="absolute inset-0 z-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-[2px] h-[2px] rounded-full blur-[0.5px] ${
                isDarkMode ? "bg-white/30" : "bg-indigo-600/15"
              }`}
              style={{
                top: `${(i * 7.7) % 100}%`,
                left: `${(i * 13.3) % 100}%`
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.1, 0.6, 0.1]
              }}
              transition={{
                duration: 8 + (i % 5) * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ═════════════════════════════════════════════════════════════
            SECTION INTRODUCTION (Apple / Linear style line staggered)
            ═════════════════════════════════════════════════════════════ */}
        <div className="max-w-4xl mx-auto text-center mb-16 sm:mb-24">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-7xl font-black tracking-tighter leading-[0.95] font-sans uppercase">
              <motion.span 
                initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className={`block ${isDarkMode ? "text-white" : "text-slate-900"}`}
              >
                Projects
              </motion.span>
            </h2>
            <div className="h-1 bg-indigo-600 w-16 mx-auto rounded-full mt-4 animate-pulse" />
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════
            CINEMATIC TAB NAVIGATOR (Unveiling Selector Row)
            ═════════════════════════════════════════════════════════════ */}
        <div className={`flex justify-center flex-wrap gap-2 mb-12 sm:mb-16 border-b pb-5 ${
          isDarkMode ? "border-white/[0.05]" : "border-slate-200"
        }`}>
          {projects.map((proj, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={proj.id}
                onClick={() => setActiveIdx(idx)}
                className={`relative px-5 py-3 rounded-xl font-mono text-[11px] font-extrabold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                  isActive 
                    ? isDarkMode ? "text-white" : "text-slate-900" 
                    : isDarkMode ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-700"
                }`}
              >
                {/* Background pill */}
                {isActive && (
                  <motion.div
                    layoutId="active-project-pill"
                    className={`absolute inset-0 rounded-xl z-0 ${
                      isDarkMode 
                        ? "bg-white/[0.03] border border-white/[0.08] shadow-[0_4px_20px_rgba(255,255,255,0.02)]" 
                        : "bg-slate-100 border border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
                    }`}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <span 
                    className="w-1.5 h-1.5 rounded-full transition-colors duration-300"
                    style={{ backgroundColor: isActive ? proj.colorFrom : "transparent", border: !isActive ? "1px solid #475569" : "none" }}
                  />
                  0{idx + 1} / {proj.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* ═════════════════════════════════════════════════════════════
            MAIN STORYTELLING PRODUCT SHOWCASE GRID
            ═════════════════════════════════════════════════════════════ */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProj.id}
            initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -30, filter: "blur(4px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start text-left min-h-[75vh]"
          >
            
            {/* ═════════════════════════════════════════════════════════
                LEFT SIDE: DETAILED PROJECT STORY
                ═════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-6 space-y-7 sm:space-y-8 flex flex-col justify-center">
              
              {/* Category & Badge */}
              <div className="space-y-2">
                <span className="font-mono text-[10px] uppercase tracking-widest font-bold text-slate-500">
                  PRODUCT RELEASE // 0{activeIdx + 1}
                </span>
                
                <h3 className={`text-3xl sm:text-5xl font-black font-sans uppercase tracking-tight leading-none ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}>
                  {activeProj.title}
                </h3>

                <p 
                  className="inline-block text-xs sm:text-sm font-bold uppercase tracking-wider bg-gradient-to-r bg-clip-text text-transparent font-mono"
                  style={{ backgroundImage: `linear-gradient(to_right, ${activeProj.colorFrom}, ${activeProj.colorTo})` }}
                >
                  {activeProj.category}
                </p>
              </div>

              {/* Main Description */}
              <p className={`text-base font-light leading-relaxed ${
                isDarkMode ? "text-slate-300" : "text-slate-600"
              }`}>
                {activeProj.description}
              </p>

              {/* Problem vs Solution Split Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Problem */}
                <div className={`p-5 rounded-2xl border space-y-2 relative group transition-all duration-300 ${
                  isDarkMode 
                    ? "bg-white/[0.01] border-white/[0.04] hover:bg-white/[0.02]" 
                    : "bg-white border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.02)]"
                }`}>
                  <div className="absolute top-0 left-4 right-4 h-[1px] bg-red-500/20" />
                  <div className="flex items-center gap-1.5 text-red-500 font-mono text-[9px] font-black uppercase tracking-wider">
                    <Info size={11} /> THE FRICTION
                  </div>
                  <h4 className={`text-xs font-black uppercase tracking-tight ${
                    isDarkMode ? "text-white" : "text-slate-850"
                  }`}>The Problem</h4>
                  <p className={`text-[11px] leading-normal font-light font-sans ${
                    isDarkMode ? "text-slate-400" : "text-slate-500"
                  }`}>{activeProj.problem}</p>
                </div>

                {/* Solution */}
                <div className={`p-5 rounded-2xl border space-y-2 relative group transition-all duration-300 ${
                  isDarkMode 
                    ? "bg-white/[0.01] border-white/[0.04] hover:bg-white/[0.02]" 
                    : "bg-white border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_6px_16px_rgba(0,0,0,0.02)]"
                }`}>
                  <div className="absolute top-0 left-4 right-4 h-[1px] bg-emerald-500/20" />
                  <div className="flex items-center gap-1.5 text-emerald-500 font-mono text-[9px] font-black uppercase tracking-wider">
                    <Lightbulb size={11} /> THE ARCHITECTURE
                  </div>
                  <h4 className={`text-xs font-black uppercase tracking-tight ${
                    isDarkMode ? "text-white" : "text-slate-850"
                  }`}>The Solution</h4>
                  <p className={`text-[11px] leading-normal font-light font-sans ${
                    isDarkMode ? "text-slate-400" : "text-slate-500"
                  }`}>{activeProj.solution}</p>
                </div>
              </div>

              {/* Key Features Bullet Grid */}
              <div className="space-y-3">
                <h4 className="text-[9px] font-mono font-black tracking-widest text-slate-500 uppercase">
                  ✓ CORE RELEASE CAPABILITIES
                </h4>
                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-xs font-sans font-light ${
                  isDarkMode ? "text-slate-300" : "text-slate-600"
                }`}>
                  {activeProj.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: activeProj.colorFrom }} />
                      <p>{feature}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack integrated modules */}
              <div className="space-y-2.5">
                <h4 className="text-[9px] font-mono font-black tracking-widest text-slate-500 uppercase">
                  INTEGRATED MODULES
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeProj.technologies.map((tech) => (
                    <span
                      key={tech}
                      onMouseEnter={() => setHoveredTech(tech)}
                      onMouseLeave={() => setHoveredTech(null)}
                      className={`px-3 py-1 rounded-lg font-mono text-[10px] font-bold transition-all duration-300 border ${
                        hoveredTech === tech 
                          ? isDarkMode ? "bg-white text-black border-white shadow-lg" : "bg-indigo-600 text-white border-indigo-600 shadow-lg"
                          : isDarkMode ? "bg-white/[0.02] text-indigo-300 border-white/[0.06]" : "bg-slate-100 text-indigo-700 border-slate-200"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Trigger Buttons */}
              <div className="flex flex-wrap gap-3.5 pt-3">
                <a
                  href={activeProj.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                    isDarkMode 
                      ? "text-black bg-white hover:bg-slate-200 shadow-[0_0_15px_rgba(255,255,255,0.1)]" 
                      : "text-white bg-slate-900 hover:bg-slate-800 shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
                  }`}
                >
                  Live Demo
                  <ExternalLink size={12} />
                </a>

                <a
                  href={activeProj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer border ${
                    isDarkMode 
                      ? "text-slate-300 bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.08]" 
                      : "text-slate-700 bg-white border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  GitHub Repository
                  <Github size={12} />
                </a>

                <button
                  onClick={() => setSelectedCaseStudy(activeProj)}
                  className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-mono text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer border ${
                    isDarkMode 
                      ? "text-indigo-400 bg-indigo-950/20 border-indigo-500/15 hover:bg-indigo-950/30" 
                      : "text-indigo-600 bg-indigo-50 border-indigo-200 hover:bg-indigo-100/50"
                  }`}
                >
                  Case Study
                  <ArrowUpRight size={12} />
                </button>
              </div>

            </div>

            {/* ═════════════════════════════════════════════════════════
                RIGHT SIDE: MULTI-DEVICE PRESET MOCKUPS & TILT GLASS BOARDS
                ═════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-6 flex flex-col justify-center items-center relative py-6 lg:py-0 w-full">
              
              {/* Dynamic 3D perspective block with cursor tilt interaction */}
              <div 
                onMouseMove={handleMockupMouseMove}
                onMouseLeave={handleMockupMouseLeave}
                style={{ 
                  transform: tiltStyle.transform,
                  transition: "transform 0.1s ease-out, box-shadow 0.3s ease",
                  transformStyle: "preserve-3d"
                }}
                className={`relative w-full max-w-lg aspect-[4/3] flex items-center justify-center rounded-3xl p-6 overflow-hidden group border ${
                  isDarkMode 
                    ? "bg-white/[0.01] border-white/[0.04] shadow-[0_30px_70px_rgba(0,0,0,0.8)]" 
                    : "bg-white/40 border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
                }`}
              >
                {/* Soft backdrop reflection glow */}
                <div 
                  className={`absolute inset-0 pointer-events-none group-hover:opacity-100 opacity-60 transition-opacity duration-700 ${
                    isDarkMode ? "bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent" : "bg-gradient-to-tr from-transparent via-slate-500/[0.01] to-transparent"
                  }`} 
                />

                {/* Ambient background accent orb */}
                <div 
                  className="absolute -right-24 -top-24 w-56 h-56 rounded-full blur-[80px] opacity-10 group-hover:opacity-20 transition-all duration-700"
                  style={{ backgroundColor: activeProj.colorFrom }}
                />

                {/* ═════════════════════════════════════════════════════
                    DEVICE A: PREMIUM CODING SYSTEM LAPTOP (Background)
                    ═════════════════════════════════════════════════════ */}
                <div 
                  style={{ transform: "translateZ(-30px)" }}
                  className={`absolute w-[80%] aspect-[16/10] rounded-2xl border shadow-2xl overflow-hidden left-6 top-8 transition-all duration-500 group-hover:scale-[1.01] ${
                    isDarkMode ? "border-white/[0.08] bg-[#07070a]/95" : "border-slate-200 bg-white"
                  }`}
                >
                  {/* Title tab */}
                  <div className={`px-3.5 py-2 border-b flex items-center justify-between ${
                    isDarkMode ? "border-white/[0.06] bg-white/[0.02]" : "border-slate-200/85 bg-slate-50"
                  }`}>
                    <div className="flex items-center gap-1">
                      <Laptop size={11} className="text-slate-500" />
                      <span className={`font-mono text-[8px] uppercase tracking-widest ${
                        isDarkMode ? "text-slate-400" : "text-slate-650"
                      }`}>{activeProj.title}_terminal.sh</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                    </div>
                  </div>
                  {/* Laptop Screen Content: Beautiful Project Image with high contrast */}
                  <div className={`relative w-full h-[calc(100%-28px)] overflow-hidden ${
                    isDarkMode ? "bg-[#030305]" : "bg-slate-100"
                  }`}>
                    <img 
                      src={activeProj.image} 
                      alt={activeProj.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover opacity-90 transition-all duration-500 group-hover:scale-105"
                    />
                    {/* Glassmorphism gradient overlay */}
                    <div className={`absolute inset-0 ${
                      isDarkMode 
                        ? "bg-gradient-to-t from-[#020204]/90 via-[#020204]/20 to-black/30" 
                        : "bg-gradient-to-t from-white/80 via-white/10 to-transparent"
                    }`} />
                    
                    {/* Small futuristic console prompt overlay in the corner */}
                    <div className={`absolute bottom-2 left-2 right-2 p-1.5 rounded-lg border backdrop-blur-md text-left ${
                      isDarkMode ? "bg-black/75 border-white/[0.08]" : "bg-white/85 border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
                    }`}>
                      <p className={`font-mono text-[6px] uppercase tracking-widest leading-none mb-1 ${
                        isDarkMode ? "text-indigo-400" : "text-indigo-600"
                      }`}>SYSTEM_DISPLAY_MOUNT</p>
                      <p className={`font-sans text-[8px] font-black truncate leading-none ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}>{activeProj.category}</p>
                    </div>
                  </div>
                </div>

                {/* ═════════════════════════════════════════════════════
                    DEVICE B: TABLET / SYSTEM ARCHITECTURE (Middle)
                    ═════════════════════════════════════════════════════ */}
                <div 
                  style={{ transform: "translateZ(10px)" }}
                  className={`absolute w-[50%] aspect-[4/3] rounded-xl border shadow-2xl overflow-hidden right-4 bottom-14 transition-all duration-500 group-hover:translate-x-2 ${
                    isDarkMode ? "border-white/[0.08] bg-[#0c0c12]/95" : "border-slate-200 bg-white"
                  }`}
                >
                  <div className={`px-3 py-1.5 border-b flex items-center justify-between ${
                    isDarkMode ? "border-white/[0.06] bg-white/[0.02]" : "border-slate-200/85 bg-slate-50"
                  }`}>
                    <span className={`font-mono text-[7px] tracking-wider ${
                      isDarkMode ? "text-slate-400" : "text-slate-600"
                    }`}>SYSTEM DIAGRAM //</span>
                    <Tablet size={10} className="text-slate-500" />
                  </div>
                  
                  {/* Animated Mini Node Diagram */}
                  <div className="p-3.5 h-[calc(100%-22px)] flex flex-col justify-center gap-1.5 font-mono text-[7px]">
                    {activeProj.architectureNodes.map((node, nIdx) => (
                      <div 
                        key={nIdx} 
                        className={`px-2.5 py-1.5 rounded border flex items-center justify-between ${
                          isDarkMode 
                            ? "border-white/[0.04] bg-white/[0.01] text-indigo-300" 
                            : "border-slate-100 bg-slate-50 text-indigo-650"
                        }`}
                      >
                        <span className="flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full animate-ping" style={{ backgroundColor: activeProj.colorFrom }} />
                          {node}
                        </span>
                        <ChevronRight size={8} className="text-slate-600" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* ═════════════════════════════════════════════════════
                    DEVICE C: MOBILE TELEMETRY SMARTPHONE (Foreground)
                    ═════════════════════════════════════════════════════ */}
                <div 
                  style={{ transform: "translateZ(50px)" }}
                  className={`absolute w-[32%] aspect-[9/16] rounded-[24px] border shadow-2xl overflow-hidden left-12 bottom-6 transition-all duration-500 group-hover:scale-[1.03] ${
                    isDarkMode ? "border-white/[0.12] bg-[#0a0a0f]" : "border-slate-200 bg-white"
                  }`}
                >
                  {/* Camera hole */}
                  <div className={`absolute top-2 left-1/2 -translate-x-1/2 w-8 h-3 rounded-full z-50 flex items-center justify-center border ${
                    isDarkMode ? "bg-slate-900 border-white/[0.04]" : "bg-slate-100 border-slate-200"
                  }`}>
                    <div className="w-1 h-1 rounded-full bg-blue-500/40" />
                  </div>

                  {/* Phone UI Content */}
                  <div className="h-full p-3 pt-7 text-left font-sans text-[7px] flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className={`flex items-center justify-between pb-1 border-b ${
                        isDarkMode ? "border-white/[0.05]" : "border-slate-200"
                      }`}>
                        <span className="font-mono text-[6px] font-black tracking-widest text-slate-500">TELEMETRY</span>
                        <Smartphone size={8} className="text-slate-500" />
                      </div>
                      
                      {/* Interactive mock details */}
                      <div className="space-y-1">
                        <p className={`uppercase font-bold ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>RELEASE STATUS</p>
                        <p className="text-[9px] font-black text-emerald-500 flex items-center gap-1">
                          <CheckCircle size={8} /> {activeProj.stats.deploymentStatus}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <p className={`uppercase font-bold ${isDarkMode ? "text-slate-400" : "text-slate-500"}`}>TIMELINE</p>
                        <p className={`text-[8px] font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>{activeProj.stats.duration}</p>
                      </div>
                    </div>

                    {/* Stats chart mock */}
                    <div className={`p-2 rounded flex items-center gap-1.5 border ${
                      isDarkMode ? "bg-indigo-950/20 border-indigo-500/10" : "bg-indigo-50 border-indigo-100"
                    }`}>
                      <Activity size={10} className="text-indigo-500 animate-pulse" />
                      <div className="font-mono leading-none">
                        <p className={`text-[5px] ${isDarkMode ? "text-indigo-300" : "text-indigo-600"}`}>INTEGRITY</p>
                        <p className={`text-[7px] font-extrabold mt-0.5 ${isDarkMode ? "text-white" : "text-indigo-900"}`}>100% SECURE</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* ═════════════════════════════════════════════════════
                  INTERACTIVE STATISTICS COUNTERS (Bento stats tray)
                  ═════════════════════════════════════════════════════ */}
              <div className="w-full max-w-lg grid grid-cols-3 gap-3.5 mt-8">
                {/* Tech Modules */}
                <div className={`p-4 rounded-2xl border text-center transition-all duration-300 relative overflow-hidden group ${
                  isDarkMode ? "bg-white/[0.01] border-white/[0.04] hover:bg-white/[0.02]" : "bg-white border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:bg-slate-50/50"
                }`}>
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="font-mono text-[8px] text-slate-500 uppercase tracking-widest mb-1.5">MODULES</p>
                  <CountingStat value={activeProj.stats.techUsed} suffix="+" isDarkMode={isDarkMode} />
                  <p className="text-[9px] text-slate-400 mt-1 font-sans">Technologies</p>
                </div>

                {/* Built Components */}
                <div className={`p-4 rounded-2xl border text-center transition-all duration-300 relative overflow-hidden group ${
                  isDarkMode ? "bg-white/[0.01] border-white/[0.04] hover:bg-white/[0.02]" : "bg-white border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:bg-slate-50/50"
                }`}>
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="font-mono text-[8px] text-slate-500 uppercase tracking-widest mb-1.5">COMPONENTS</p>
                  <CountingStat value={activeProj.stats.componentsBuilt} isDarkMode={isDarkMode} />
                  <p className="text-[9px] text-slate-400 mt-1 font-sans">Built & Tested</p>
                </div>

                {/* Features */}
                <div className={`p-4 rounded-2xl border text-center transition-all duration-300 relative overflow-hidden group ${
                  isDarkMode ? "bg-white/[0.01] border-white/[0.04] hover:bg-white/[0.02]" : "bg-white border-slate-200/80 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:bg-slate-50/50"
                }`}>
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <p className="font-mono text-[8px] text-slate-500 uppercase tracking-widest mb-1.5">FEATURES</p>
                  <CountingStat value={activeProj.stats.featuresDelivered} isDarkMode={isDarkMode} />
                  <p className="text-[9px] text-slate-400 mt-1 font-sans">Delivered</p>
                </div>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

        {/* ═════════════════════════════════════════════════════════════
            CINEMATIC CLOSING HERO STATEMENT (Bottom CTA)
            ═════════════════════════════════════════════════════════════ */}
        <div className="mt-28 sm:mt-40 text-center max-w-2xl mx-auto">
          <div className={`h-[1px] w-24 mx-auto mb-10 ${
            isDarkMode ? "bg-gradient-to-r from-transparent via-white/20 to-transparent" : "bg-gradient-to-r from-transparent via-slate-300 to-transparent"
          }`} />
          
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-base sm:text-lg italic font-light leading-relaxed mb-8 ${
              isDarkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            "Every project started with an idea and evolved into a meaningful digital experience. I believe the best software is built where creativity, technology, and purpose meet."
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <a
              id="cta-github-all-projects"
              href="https://github.com/Khushi-ux123"
              target="_blank"
              rel="noopener noreferrer"
              className={`group inline-flex items-center gap-2.5 px-6 py-4 rounded-xl font-mono text-xs font-black uppercase tracking-widest transition-all cursor-pointer ${
                isDarkMode 
                  ? "text-black bg-white hover:bg-slate-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]" 
                  : "text-white bg-slate-900 hover:bg-slate-800 shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
              }`}
            >
              View All Projects on GitHub
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

      </div>

      {/* ═════════════════════════════════════════════════════════════
          HIGH-FIDELITY INTERACTIVE DETAILED CASE STUDY MODAL
          ═════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {selectedCaseStudy && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-hidden">
            
            {/* Blurry cinematic drop shade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCaseStudy(null)}
              className={`absolute inset-0 backdrop-blur-md ${
                isDarkMode ? "bg-black/95" : "bg-slate-900/60"
              }`}
            />

            {/* Case study modal card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className={`w-full max-w-4xl h-full max-h-[85vh] rounded-2xl border shadow-[0_30px_80px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden relative z-10 text-left transition-colors duration-300 ${
                isDarkMode ? "border-white/[0.08] bg-[#07070a]/95 text-white" : "border-slate-200 bg-white text-slate-900"
              }`}
            >
              {/* Close Button */}
              <button
                id="close-modal-btn"
                onClick={() => setSelectedCaseStudy(null)}
                className={`absolute top-4 right-4 z-50 p-2.5 rounded-full border transition-all hover:scale-105 cursor-pointer ${
                  isDarkMode 
                    ? "border-white/[0.08] bg-[#030303]/80 hover:bg-[#1a1a24] text-slate-400 hover:text-white" 
                    : "border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900"
                }`}
                title="Close case study"
              >
                <X size={15} />
              </button>

              {/* Scrollable Container */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 custom-scrollbar">
                
                {/* Header */}
                <div className={`space-y-2 border-b pb-6 ${
                  isDarkMode ? "border-white/[0.05]" : "border-slate-150"
                }`}>
                  <span className="font-mono text-[9px] font-black tracking-widest text-indigo-550 uppercase">
                    DETAILED ENGINEERING CASE STUDY
                  </span>
                  <h3 className={`text-3xl sm:text-4xl font-black uppercase tracking-tight ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}>
                    {selectedCaseStudy.title}
                  </h3>
                  <p className={`text-sm font-bold uppercase tracking-wider ${
                    isDarkMode ? "text-slate-400" : "text-slate-500"
                  }`}>
                    {selectedCaseStudy.category}
                  </p>
                </div>

                {/* Problem vs Solution detailed breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className={`space-y-3.5 p-6 rounded-2xl border ${
                    isDarkMode ? "border-white/[0.05] bg-white/[0.01]" : "border-slate-150 bg-slate-50/50"
                  }`}>
                    <h4 className="text-[10px] font-mono font-black tracking-widest text-red-500 uppercase flex items-center gap-1.5">
                      <Info size={12} /> 01 / THE CRITICAL CHALLENGE
                    </h4>
                    <p className={`text-sm font-light leading-relaxed ${
                      isDarkMode ? "text-slate-300" : "text-slate-650"
                    }`}>
                      {selectedCaseStudy.problem}
                    </p>
                  </div>

                  <div className={`space-y-3.5 p-6 rounded-2xl border ${
                    isDarkMode ? "border-white/[0.05] bg-white/[0.01]" : "border-slate-150 bg-slate-50/50"
                  }`}>
                    <h4 className="text-[10px] font-mono font-black tracking-widest text-emerald-600 uppercase flex items-center gap-1.5">
                      <CheckCircle size={12} /> 02 / THE DEPLOYED SOLUTION
                    </h4>
                    <p className={`text-sm font-light leading-relaxed ${
                      isDarkMode ? "text-slate-300" : "text-slate-650"
                    }`}>
                      {selectedCaseStudy.solution}
                    </p>
                  </div>
                </div>

                {/* Technical Architecture */}
                <div className={`space-y-3.5 p-6 rounded-2xl border text-left ${
                  isDarkMode ? "border-white/[0.05] bg-white/[0.01]" : "border-slate-150 bg-slate-50/50"
                }`}>
                  <h4 className="text-[10px] font-mono font-black tracking-widest text-indigo-550 uppercase flex items-center gap-1.5">
                    <Layers size={12} /> 03 / SYSTEM ARCHITECTURE & INTEGRATION
                  </h4>
                  <p className={`text-sm font-light leading-relaxed ${
                    isDarkMode ? "text-slate-300" : "text-slate-650"
                  }`}>
                    {selectedCaseStudy.architecture}
                  </p>
                  
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {selectedCaseStudy.architectureNodes.map((node) => (
                      <span key={node} className={`px-2.5 py-1 rounded font-mono text-[9px] border ${
                        isDarkMode ? "bg-[#030303] border-white/[0.06] text-slate-300" : "bg-white border-slate-200 text-slate-600 shadow-[0_1px_3px_rgba(0,0,0,0.02)]"
                      }`}>
                        {node}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Challenges & What I Learned */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  {/* Challenges Overcome */}
                  <div className={`space-y-3.5 p-6 rounded-2xl border ${
                    isDarkMode ? "border-[#eab308]/15 bg-[#eab308]/5" : "border-amber-200 bg-amber-50/40"
                  }`}>
                    <h4 className="text-[10px] font-mono font-black tracking-widest text-amber-600 uppercase flex items-center gap-1.5">
                      <Settings size={12} className="animate-spin" style={{ animationDuration: "12s" }} /> 04 / COMPLEX DEPLOYMENT OBSTACLE
                    </h4>
                    <p className={`text-xs font-light leading-relaxed ${
                      isDarkMode ? "text-slate-300" : "text-slate-650"
                    }`}>
                      {selectedCaseStudy.challenges}
                    </p>
                  </div>

                  {/* What I learned */}
                  <div className={`space-y-3.5 p-6 rounded-2xl border ${
                    isDarkMode ? "border-indigo-500/15 bg-indigo-500/5" : "border-indigo-200 bg-indigo-50/40"
                  }`}>
                    <h4 className="text-[10px] font-mono font-black tracking-widest text-indigo-550 uppercase flex items-center gap-1.5">
                      <Terminal size={12} /> 05 / ENGINEERING DISCOVERIES
                    </h4>
                    <p className={`text-xs font-light leading-relaxed ${
                      isDarkMode ? "text-slate-300" : "text-slate-650"
                    }`}>
                      {selectedCaseStudy.whatILearned}
                    </p>
                  </div>
                </div>

                {/* Footer bar of case study */}
                <div className={`pt-6 border-t flex flex-wrap gap-4 items-center justify-between text-[10px] font-mono ${
                  isDarkMode ? "border-white/[0.05] text-slate-500" : "border-slate-150 text-slate-500"
                }`}>
                  <span>ROLE: {selectedCaseStudy.role}</span>
                  <span>LINES OF CODE: {selectedCaseStudy.stats.linesOfCode}</span>
                </div>

              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
