import React from "react";
import { motion } from "motion/react";
import { BookOpen, Award, CheckCircle, Terminal, HelpCircle, Network, ShieldCheck } from "lucide-react";
import { personalInfo, educationData } from "../data";

interface AboutProps {
  isDarkMode: boolean;
}

export default function About({ isDarkMode }: AboutProps) {
  const foundations = [
    {
      name: "Data Structures & Algorithms (DSA)",
      desc: "Strong problem-solving foundation in Java, Python, and JS with clean code paradigms.",
      icon: <Terminal size={20} className="text-indigo-500" />,
    },
    {
      name: "Database Management Systems (DBMS)",
      desc: "Robust understanding of SQL queries, normalization, and NoSQL architecture with MongoDB.",
      icon: <CheckCircle size={20} className="text-indigo-500" />,
    },
    {
      name: "Operating Systems (OS)",
      desc: "Understanding of process management, thread scheduling, memory paging, and concurrency limits.",
      icon: <ShieldCheck size={20} className="text-indigo-500" />,
    },
    {
      name: "Computer Networks (CN)",
      desc: "Familiarity with IP routing, load balancing, DNS servers, and security handshakes.",
      icon: <Network size={20} className="text-indigo-500" />,
    },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className={`text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            About Me
          </motion.h2>
          <div className="h-1.5 w-16 bg-indigo-600 mx-auto rounded-full mb-6" />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`text-base font-sans leading-relaxed ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            A closer look at my background, current studies, and engineering focus.
          </motion.p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Academic Bio Cardano style */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div
              className={`p-6 sm:p-8 rounded-2xl border ${
                isDarkMode
                  ? "bg-slate-900/60 border-slate-800 shadow-xl shadow-slate-950/20"
                  : "bg-white border-slate-200 shadow-md shadow-slate-200/20"
              }`}
            >
              <h3
                className={`text-xl font-bold font-sans mb-4 ${
                  isDarkMode ? "text-white" : "text-slate-900"
                }`}
              >
                Information Technology Student
              </h3>
              <p
                className={`text-sm sm:text-base leading-relaxed mb-6 font-sans ${
                  isDarkMode ? "text-slate-400" : "text-slate-650"
                }`}
              >
                I am currently a{" "}
                <strong className={isDarkMode ? "text-slate-250" : "text-slate-950"}>
                  final-year B.Tech Information Technology student
                </strong>{" "}
                at {educationData.institution}, maintaining a high-performance profile with an{" "}
                <span className="text-indigo-500 font-bold underline decoration-2">{educationData.gpaOrCgpa}</span>.
              </p>
              <p
                className={`text-sm sm:text-base leading-relaxed mb-6 font-sans ${
                  isDarkMode ? "text-slate-400" : "text-slate-650"
                }`}
              >
                My drive lies at the intersection of robust Full-Stack architecture and AI-powered automation. I thrive on translating ambiguous problems into responsive UI experiences and reliable containerized database APIs.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500">
                    <BookOpen size={18} />
                  </div>
                  <div>
                    <p className={`text-[11px] font-mono uppercase tracking-wide text-slate-500`}>Academic</p>
                    <p className={`text-xs font-semibold ${isDarkMode ? "text-slate-350" : "text-slate-800"}`}>B.Tech (IT)</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500">
                    <Award size={18} />
                  </div>
                  <div>
                    <p className={`text-[11px] font-mono uppercase tracking-wide text-slate-500`}>Performance</p>
                    <p className={`text-xs font-semibold ${isDarkMode ? "text-slate-350" : "text-slate-800"}`}>8.95 CGPA</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Computer Science Foundations */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <h3
              className={`text-xl font-bold font-sans ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Academic Foundations & Core Competencies
            </h3>
            <p
              className={`text-sm sm:text-base font-sans ${
                isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Recruiters value strong core foundations just as much as framework experience. Here are my academic core competencies which support scalable computer engineering:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {foundations.map((foundation, idx) => (
                <div
                  id={`about-foundation-${idx}`}
                  key={foundation.name}
                  className={`p-5 rounded-xl border transition-all duration-200 hover:-translate-y-1 ${
                    isDarkMode
                      ? "bg-slate-900/40 border-slate-800/80 hover:bg-slate-900 hover:border-indigo-500/30"
                      : "bg-white border-slate-200 hover:bg-slate-55 hover:border-indigo-500/20"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/20 text-indigo-500 flex-shrink-0">
                      {foundation.icon}
                    </div>
                    <div>
                      <h4
                        className={`text-sm font-bold font-sans mb-1.5 leading-snug ${
                          isDarkMode ? "text-slate-100" : "text-slate-800"
                        }`}
                      >
                        {foundation.name}
                      </h4>
                      <p
                        className={`text-xs leading-relaxed font-sans ${
                          isDarkMode ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        {foundation.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
