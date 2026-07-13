import React, { useState, useEffect, useRef } from "react";
import { Search, Terminal, Sparkles, Command, Sliders, Moon, Sun, ArrowRight, Eye, Volume2, Gamepad2, Gift, Orbit, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface CommandPaletteProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: "navigation" | "utilities" | "easter-eggs";
  icon: React.ReactNode;
  action: () => void;
}

export default function CommandPalette({ isDarkMode, toggleTheme }: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({ message: "", visible: false });
  const inputRef = useRef<HTMLInputElement>(null);

  // Trigger feedback tone if Web Audio is active
  const triggerTick = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch (e) {
      // Audio context block
    }
  };

  // Listen for Cmd+K, Ctrl+K, or / keypress
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        triggerTick();
      } else if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    (window as any).toggleCommandPalette = () => {
      setIsOpen((prev) => !prev);
      triggerTick();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      (window as any).toggleCommandPalette = undefined;
    };
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setSearchQuery("");
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  };

  // Easter eggs lists
  const developerFortunes = [
    "🚀 'There are 10 types of people in the world: those who understand binary, and those who don't.'",
    "💻 'Deleted code is debugged code.'",
    "☕ 'A programmer is a machine that turns coffee into code.'",
    "🐛 'It's not a bug. It's an undocumented feature!'",
    "💡 'Before software can be reusable it first has to be usable.'"
  ];

  // Safe alert function using custom Toast to prevent DOMException / SecurityError in sandboxed iframes
  const safeAlert = (message: string) => {
    setToast({ message, visible: true });
    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      setToast(prev => {
        if (prev.message === message) {
          return { ...prev, visible: false };
        }
        return prev;
      });
    }, 4000);
  };

  const triggerFortune = () => {
    const randomFortune = developerFortunes[Math.floor(Math.random() * developerFortunes.length)];
    safeAlert(randomFortune);
    setIsOpen(false);
  };

  const toggleMatrix = () => {
    (window as any).matrixRainActive = !(window as any).matrixRainActive;
    triggerTick();
    setIsOpen(false);
  };

  const toggleGodMode = () => {
    const root = document.getElementById("portfolio-root");
    if (root) {
      root.classList.toggle("cyber-neon-glow-active");
      const isActive = root.classList.contains("cyber-neon-glow-active");
      
      // Inject styled neon classes to cards
      const cards = document.querySelectorAll(".rounded-2xl, .rounded-xl");
      cards.forEach(card => {
        if (isActive) {
          card.classList.add("border-indigo-500", "shadow-[0_0_15px_rgba(99,102,241,0.2)]");
        } else {
          card.classList.remove("border-indigo-500", "shadow-[0_0_15px_rgba(99,102,241,0.2)]");
        }
      });

      safeAlert(isActive ? "⚠️ God Mode Activated: Neon Overdrive Engaged!" : "God Mode Deactivated.");
    }
    setIsOpen(false);
  };

  const commands: CommandItem[] = [
    // 1. Navigation
    {
      id: "nav-about",
      title: "Jump to About Section",
      subtitle: "Read academic details & frontend career background",
      category: "navigation",
      icon: <Eye size={16} className="text-blue-500" />,
      action: () => scrollToSection("about"),
    },
    {
      id: "nav-skills",
      title: "Jump to Technical Skills",
      subtitle: "View core tech stacks & programming languages",
      category: "navigation",
      icon: <Sliders size={16} className="text-emerald-500" />,
      action: () => scrollToSection("skills"),
    },
    {
      id: "nav-projects",
      title: "Jump to Projects Portfolio",
      subtitle: "Explore innovative AI systems like SignBridge AI",
      category: "navigation",
      icon: <Gamepad2 size={16} className="text-pink-500" />,
      action: () => scrollToSection("projects"),
    },
    {
      id: "nav-contact",
      title: "Jump to Contact Desk",
      subtitle: "Get in touch with Khushi Sharma",
      category: "navigation",
      icon: <Command size={16} className="text-indigo-500" />,
      action: () => scrollToSection("contact"),
    },

    // 2. Interactive Utilities
    {
      id: "util-theme",
      title: "Shift Dimensions (Theme Toggle)",
      subtitle: `Switch current UI display to ${isDarkMode ? "Light Mode" : "Dark Mode"}`,
      category: "utilities",
      icon: isDarkMode ? <Sun size={16} className="text-yellow-400" /> : <Moon size={16} className="text-indigo-600" />,
      action: () => {
        toggleTheme();
        setIsOpen(false);
      },
    },
    {
      id: "util-orbit-view",
      title: "Activate Skill Orbit System",
      subtitle: "Switch skills layout to interactive gravitational planetary orbits",
      category: "utilities",
      icon: <Sparkles size={16} className="text-indigo-400" />,
      action: () => {
        document.getElementById("skills-view-orbit-btn")?.click();
        scrollToSection("skills");
      },
    },
    {
      id: "util-grid-view",
      title: "Activate Bento Grid Skills Layout",
      subtitle: "Switch skills layout to standard, highly scannable grid cards",
      category: "utilities",
      icon: <Sliders size={16} className="text-emerald-400" />,
      action: () => {
        document.getElementById("skills-view-grid-btn")?.click();
        scrollToSection("skills");
      },
    },
    {
      id: "util-conjunction",
      title: "Trigger Cosmic Planet Alignment",
      subtitle: "Force all orbital planets into a straight conjunction line",
      category: "utilities",
      icon: <Command size={16} className="text-pink-500" />,
      action: () => {
        document.getElementById("skills-view-orbit-btn")?.click();
        setTimeout(() => {
          document.getElementById("orbit-control-align")?.click();
        }, 150);
        scrollToSection("skills");
      },
    },
    {
      id: "util-intro-cinematic",
      title: "Launch Space Intro Cinematic",
      subtitle: "Re-trigger the immersive galactic solar system entry splash overlay",
      category: "utilities",
      icon: <Orbit size={16} className="text-pink-500 animate-spin" />,
      action: () => {
        (window as any).showIntroCinematic?.();
        setIsOpen(false);
      },
    },
    {
      id: "util-matrix",
      title: "Toggle Matrix Code Rain Effect",
      subtitle: "Activate hacker digital glyph streams on canvas background",
      category: "utilities",
      icon: <Terminal size={16} className="text-emerald-400" />,
      action: toggleMatrix,
    },

    // 3. Fun Easter Eggs
    {
      id: "egg-god",
      title: "Activate God Mode / Neon Overdrive",
      subtitle: "Engage extreme cybernetic neon border lighting",
      category: "easter-eggs",
      icon: <Sparkles size={16} className="text-indigo-500" />,
      action: toggleGodMode,
    },
    {
      id: "egg-fortune",
      title: "Generate Dev Fortune Cookie",
      subtitle: "Receive a random dose of programmer philosophy",
      category: "easter-eggs",
      icon: <Gift size={16} className="text-amber-500" />,
      action: triggerFortune,
    },
  ];

  // Filter commands based on search query
  const filteredCommands = commands.filter((cmd) =>
    cmd.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cmd.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cmd.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Reset active index on filter change
  useEffect(() => {
    setActiveIndex(0);
  }, [searchQuery]);

  // Handle keyboard traversal inside the HUD list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredCommands.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filteredCommands.length);
      triggerTick();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      triggerTick();
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredCommands[activeIndex]) {
        filteredCommands[activeIndex].action();
      }
    }
  };

  return (
    <>
      {/* 1. Glass Floating Command Launcher Trigger Capsule */}
      <div className="fixed top-20 right-6 z-40 hidden lg:block font-mono">
        <motion.button
          onClick={() => {
            setIsOpen(true);
            triggerTick();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-xl backdrop-blur-md text-xs cursor-pointer ${
            isDarkMode
              ? "bg-slate-900/85 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 shadow-slate-950"
              : "bg-white/85 border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 shadow-slate-200"
          }`}
          title="Open futuristic command launcher (or press Ctrl + K)"
        >
          <Search size={12} className="text-indigo-500" />
          <span className="font-semibold uppercase tracking-wider text-[10px]">Console Hub</span>
          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
            isDarkMode ? "bg-slate-850 text-slate-300" : "bg-slate-100 text-slate-500"
          }`}>
            Ctrl K
          </span>
        </motion.button>
      </div>

      {/* 2. Interactive Backdrop & Command Palette Overlay Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 font-mono">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-950/65 backdrop-blur-sm"
            />

            {/* Main Interactive Floating Console Window */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className={`w-full max-w-xl rounded-2xl border shadow-2xl overflow-hidden relative backdrop-blur-xl ${
                isDarkMode
                  ? "bg-slate-950/95 border-slate-800 text-slate-200 shadow-slate-950"
                  : "bg-white/95 border-slate-200 text-slate-700 shadow-slate-300"
              }`}
            >
              {/* Terminal top header tabs bar */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200/50 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider ml-2">
                    Command Console HUD
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 dark:text-slate-500">ESC to exit</span>
              </div>

              {/* Dynamic Input Search Field */}
              <div className="relative p-4 border-b border-slate-200/50 dark:border-slate-800/80">
                <Search className="absolute left-7 top-7 text-slate-400" size={18} />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search commands, sections, or easter eggs..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border bg-slate-50/50 dark:bg-slate-950/50 outline-none text-sm transition-all border-slate-200 dark:border-slate-800 focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 text-slate-900 dark:text-white"
                />
              </div>

              {/* Scrollable Command List */}
              <div className="max-h-[300px] overflow-y-auto p-2">
                {filteredCommands.length > 0 ? (
                  <div className="space-y-1">
                    {/* Active list renderer */}
                    {filteredCommands.map((cmd, idx) => {
                      const isActive = idx === activeIndex;
                      return (
                        <button
                          key={cmd.id}
                          onClick={() => {
                            triggerTick();
                            cmd.action();
                          }}
                          onMouseEnter={() => setActiveIndex(idx)}
                          className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-all cursor-pointer ${
                            isActive
                              ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/15 scale-[1.01]"
                              : "hover:bg-slate-100/50 dark:hover:bg-slate-900/40 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${isActive ? "bg-white/15 text-white" : "bg-slate-100 dark:bg-slate-900"}`}>
                              {cmd.icon}
                            </div>
                            <div>
                              <p className={`text-xs font-bold leading-none ${isActive ? "text-white" : "text-slate-900 dark:text-white"}`}>
                                {cmd.title}
                              </p>
                              <p className={`text-[10px] mt-1 ${isActive ? "text-indigo-100" : "text-slate-400 dark:text-slate-500"}`}>
                                {cmd.subtitle}
                              </p>
                            </div>
                          </div>
                          
                          {isActive && (
                            <motion.div
                              layoutId="active-arrow"
                              transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            >
                              <ArrowRight size={14} className="text-indigo-200 animate-pulse" />
                            </motion.div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-8 text-center text-slate-500 dark:text-slate-600">
                    <p className="text-xs">No matching cybernetic commands found.</p>
                  </div>
                )}
              </div>

              {/* Console Footing Status bar */}
              <div className="p-3 border-t border-slate-200/50 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between text-[9px] text-slate-400 dark:text-slate-500">
                <div className="flex items-center gap-3">
                  <span>↑↓ Nav</span>
                  <span>↵ Select</span>
                </div>
                <span>Active Core: Offline-Synth Ready</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-6 right-6 z-[99999] max-w-sm w-full bg-slate-900/95 dark:bg-slate-950/95 border border-indigo-500/35 dark:border-indigo-500/20 text-white rounded-xl shadow-2xl p-4 backdrop-blur-md flex items-start gap-3"
          >
            <div className="p-1.5 rounded-lg bg-indigo-600/20 text-indigo-400">
              <Sparkles size={16} className="animate-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold font-mono text-indigo-300 uppercase tracking-wider">SYSTEM NOTICE</p>
              <p className="text-xs text-slate-200 mt-1 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => setToast(prev => ({ ...prev, visible: false }))}
              className="text-slate-400 hover:text-white transition cursor-pointer p-0.5 rounded-lg hover:bg-slate-800/50"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
