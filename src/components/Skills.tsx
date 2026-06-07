import React from "react";
import { motion } from "motion/react";
import { Cpu, Layout, Server, Database, Code, Wrench } from "lucide-react";
import { skillsData } from "../data";

interface SkillsProps {
  isDarkMode: boolean;
}

export default function Skills({ isDarkMode }: SkillsProps) {
  // Map index to specific visual categories and icons for professional layout
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend Development":
        return <Layout size={20} className="text-blue-500" />;
      case "Backend Development":
        return <Server size={20} className="text-emerald-500" />;
      case "Databases":
        return <Database size={20} className="text-amber-500" />;
      case "Programming Languages":
        return <Code size={20} className="text-pink-500" />;
      default:
        return <Wrench size={20} className="text-indigo-500" />;
    }
  };

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case "Frontend Development":
        return "hover:border-blue-500/30 dark:hover:border-blue-500/20";
      case "Backend Development":
        return "hover:border-emerald-500/30 dark:hover:border-emerald-500/20";
      case "Databases":
        return "hover:border-amber-500/30 dark:hover:border-amber-500/20";
      case "Programming Languages":
        return "hover:border-pink-500/30 dark:hover:border-pink-500/20";
      default:
        return "hover:border-indigo-500/30 dark:hover:border-indigo-500/20";
    }
  };

  return (
    <section id="skills" className="py-20 relative bg-slate-50/50 dark:bg-slate-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            Technical Expertise
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
            My specialized technology stack, framework tools, and languages used to build multi-tier applications.
          </motion.p>
        </div>

        {/* Categories Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillsData.map((categoryGroup, catIdx) => (
            <motion.div
              id={`skills-category-${catIdx}`}
              key={categoryGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: catIdx * 0.05 }}
              className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 hover:shadow-lg ${getCategoryTheme(
                categoryGroup.category
              )} ${
                isDarkMode
                  ? "bg-slate-900/40 border-slate-800 shadow-xl shadow-slate-950/10"
                  : "bg-white border-slate-200 shadow-md shadow-slate-200/5"
              }`}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2.5 rounded-lg bg-slate-100 dark:bg-slate-850 flex-shrink-0`}>
                  {getCategoryIcon(categoryGroup.category)}
                </div>
                <h3
                  className={`text-base sm:text-lg font-bold font-sans ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {categoryGroup.category}
                </h3>
              </div>

              {/* Skills badges */}
              <div className="flex flex-wrap gap-2.5">
                {categoryGroup.skills.map((skill, skillIdx) => (
                  <motion.span
                    id={`skill-badge-${catIdx}-${skillIdx}`}
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-mono tracking-tight border transition-colors ${
                      isDarkMode
                        ? "bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white"
                        : "bg-slate-50 text-slate-700 border-slate-150 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-100"
                    }`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
