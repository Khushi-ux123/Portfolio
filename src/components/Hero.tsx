import React from "react";
import { motion } from "motion/react";
import { ArrowRight, Download, Mail, Terminal, Shield, Database, Cpu, FileText } from "lucide-react";
import { personalInfo } from "../data";

interface HeroProps {
  isDarkMode: boolean;
}

export default function Hero({ isDarkMode }: HeroProps) {
  // Opens the high-fidelity print layout in a new tab to bypass iframe sandboxing
  const handleDownloadResume = () => {
    const printUrl = window.location.origin + window.location.pathname + "?print=true";
    window.open(printUrl, "_blank");
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Dynamic Ambient Background Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-30 animate-pulse transition-colors ${
            isDarkMode ? "bg-indigo-600/40" : "bg-indigo-300/45"
          }`}
        />
        <div
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full filter blur-3xl opacity-30 animate-pulse transition-colors delay-1000 ${
            isDarkMode ? "bg-emerald-600/30" : "bg-emerald-200/40"
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Content */}
          <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left">
            {/* Quick Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center lg:justify-start mb-6"
            >
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold tracking-wide border font-mono ${
                  isDarkMode
                    ? "bg-indigo-950/40 text-indigo-300 border-indigo-800/50"
                    : "bg-indigo-55 text-indigo-650 border-indigo-100"
                }`}
              >
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2 animate-ping" />
                Available for Opportunities
              </span>
            </motion.div>

            {/* Intro text */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`text-sm tracking-widest uppercase font-mono font-bold mb-3 ${
                isDarkMode ? "text-indigo-400" : "text-indigo-600"
              }`}
            >
              Hi there, I am
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={`text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              {personalInfo.name}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className={`text-2xl sm:text-3xl font-bold mb-6 flex items-center justify-center lg:justify-start gap-2 ${
                isDarkMode ? "text-slate-200" : "text-slate-700"
              }`}
            >
              <span className={`text-indigo-500`}>{personalInfo.role}</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className={`text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed font-sans ${
                isDarkMode ? "text-slate-400" : "text-slate-650"
              }`}
            >
              {personalInfo.bio}
            </motion.p>

            {/* CTA Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <a
                id="cta-view-projects"
                href="#projects"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg hover:shadow-indigo-600/30 font-sans shadow-md"
              >
                View Projects
                <ArrowRight size={18} />
              </a>

              <button
                id="cta-view-resume"
                onClick={handleDownloadResume}
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer font-sans border shadow-sm ${
                  isDarkMode
                    ? "border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <FileText size={18} />
                View Resume
              </button>

              <a
                id="cta-contact-me"
                href="#contact"
                className={`w-full sm:w-auto px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all font-sans border shadow-sm ${
                  isDarkMode
                    ? "border-indigo-900/30 bg-indigo-950/20 text-indigo-400 hover:bg-indigo-950/40"
                    : "border-indigo-100 bg-indigo-50/50 text-indigo-650 hover:bg-indigo-50"
                }`}
              >
                <Mail size={18} />
                Contact Me
              </a>
            </motion.div>
          </div>

          {/* Code Mockup / Visual Developer Representation */}
          <div className="lg:col-span-5 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="w-full max-w-md"
            >
              {/* Main Frame window representing deep dev skills */}
              <div
                className={`rounded-2xl border overflow-hidden shadow-2xl ${
                  isDarkMode
                    ? "bg-slate-900 border-slate-800 shadow-slate-950/70"
                    : "bg-white border-slate-200 shadow-xl"
                }`}
              >
                {/* Window header */}
                <div
                  className={`px-4 py-3 border-b flex items-center justify-between font-mono text-xs ${
                    isDarkMode ? "bg-slate-950 border-slate-800 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-500"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500" />
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span>khushi_sharma.tsx</span>
                  <span className="opacity-0 lg:opacity-100">TypeScript</span>
                </div>

                {/* Window body containing code mock markup */}
                <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
                  <pre
                    className={`whitespace-pre transition-colors ${
                      isDarkMode ? "text-slate-300" : "text-slate-700"
                    }`}
                  >
                    <code>
                      <span className="text-pink-500">import</span>{" "}
                      <span className="text-cyan-400">React</span>{" "}
                      <span className="text-pink-500">from</span>{" "}
                      <span className="text-emerald-400">"react"</span>;{"\n"}
                      <span className="text-pink-500">import</span>{" "}
                      {"{"} <span className="text-cyan-400">Developer</span>,{" "}
                      <span className="text-cyan-400">AI</span> {"}"}{" "}
                      <span className="text-pink-500">from</span>{" "}
                      <span className="text-emerald-400">"personal-tech"</span>;{"\n\n"}
                      <span className="text-indigo-400 font-bold">const</span>{" "}
                      <span className="text-blue-400">khushi</span>:{" "}
                      <span className="text-cyan-400">Developer</span> = {"{"}{"\n"}
                      {"  "}name: <span className="text-emerald-400">"Khushi Sharma"</span>,{"\n"}
                      {"  "}role: <span className="text-emerald-400">"Full-Stack Dev"</span>,{"\n"}
                      {"  "}degree: <span className="text-orange-400">"B.Tech (IT)"</span>,{"\n"}
                      {"  "}currentCGPA: <span className="text-purple-400">8.95</span>,{"\n"}
                      {"  "}passions: [
                      <span className="text-emerald-400">"AI"</span>,{" "}
                      <span className="text-emerald-400">"Scalability"</span>],{"\n"}
                      {"  "}tech: {"{"}{"\n"}
                      {"    "}frontend: [<span className="text-emerald-400">"React.js"</span>,{" "}
                      <span className="text-emerald-400">"Angular"</span>],{"\n"}
                      {"    "}backend: [<span className="text-emerald-400">"Node.js"</span>,{" "}
                      <span className="text-emerald-400">"Exp"</span>],{"\n"}
                      {"    "}databases: [<span className="text-emerald-400">"MongoDB"</span>,{" "}<span className="text-emerald-400">"SQL"</span>],{"\n"}
                      {"  "}{"}"},{"\n"}
                      {"  "}lovesProblemSolving: <span className="text-amber-500">true</span>{"\n"}
                      {"}"};{"\n\n"}
                      <span className="text-indigo-400 font-bold">export default</span>{" "}
                      khushi;
                    </code>
                  </pre>
                </div>

                {/* Simulated Server Stats Bar */}
                <div
                  className={`p-3 border-t flex flex-wrap gap-2 items-center justify-between font-mono text-[10px] sm:text-xs ${
                    isDarkMode ? "bg-slate-950/50 border-slate-850/80 text-slate-400" : "bg-slate-50/80 border-slate-150/80 text-slate-500"
                  }`}
                >
                  <p className="flex items-center gap-1.5 font-bold">
                    <Terminal size={12} className="text-indigo-500" /> env: Node.js 19+
                  </p>
                  <p className="flex items-center gap-1.5 text-indigo-500 font-bold">
                    <Cpu size={12} /> CGPA: 8.95
                  </p>
                  <p className="flex items-center gap-1.5 text-emerald-500 font-bold">
                    <Shield size={12} fill="currentColor" fillOpacity={0.1} /> Verified Portfolio
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
