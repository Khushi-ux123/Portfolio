import React from "react";
import { motion } from "motion/react";
import { Calendar, Briefcase, ChevronRight, MapPin } from "lucide-react";
import { experienceData } from "../data";

interface ExperienceProps {
  isDarkMode: boolean;
}

export default function Experience({ isDarkMode }: ExperienceProps) {
  return (
    <section id="experience" className="py-20 relative overflow-hidden">
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
            Professional Experience
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
            A history of my technical internships, contributions, and professional milestones.
          </motion.p>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-4xl mx-auto pl-4 sm:pl-8 border-l-2 border-slate-200 dark:border-slate-800 space-y-12">
          {experienceData.map((exp, expIdx) => (
            <motion.div
              id={`experience-item-${expIdx}`}
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: expIdx * 0.1 }}
              className="relative"
            >
              {/* Timeline Marker (Circle dot) */}
              <div
                className={`absolute -left-8 sm:-left-12 top-1.5 w-6 h-6 rounded-full border-4 flex items-center justify-center transition-colors ${
                  isDarkMode
                    ? "bg-slate-950 border-indigo-500 text-indigo-400 shadow-lg shadow-indigo-500/20"
                    : "bg-white border-indigo-600 text-indigo-600 shadow-md shadow-indigo-600/10"
                }`}
              >
                <Briefcase size={10} />
              </div>

              {/* Box card */}
              <div
                className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 hover:shadow-xl ${
                  isDarkMode
                    ? "bg-slate-900/40 border-slate-800/80 hover:bg-slate-900 hover:border-indigo-500/20"
                    : "bg-white border-slate-200 hover:bg-slate-55 hover:border-indigo-500/10"
                }`}
              >
                {/* Meta Header block */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3
                      className={`text-lg sm:text-xl font-bold font-sans ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {exp.role}
                    </h3>
                    <p className="text-indigo-500 font-semibold font-sans mt-0.5 sm:mt-1">
                      {exp.company}
                    </p>
                  </div>

                  {/* Period Badge */}
                  <div
                    className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-mono font-semibold tracking-wide border self-start sm:self-center gap-1.5 transition-colors ${
                      isDarkMode
                        ? "bg-slate-950/40 border-slate-800 text-slate-350"
                        : "bg-slate-50 border-slate-200 text-slate-650"
                    }`}
                  >
                    <Calendar size={12} className="text-indigo-400" />
                    {exp.period}
                  </div>
                </div>

                {/* Achievements List */}
                <ul className="space-y-3.5">
                  {exp.achievements.map((achievement, bulletIdx) => (
                    <li
                      id={`exp-ach-${expIdx}-${bulletIdx}`}
                      key={bulletIdx}
                      className="flex items-start gap-3"
                    >
                      <ChevronRight
                        size={16}
                        className="text-indigo-500 mt-1 flex-shrink-0"
                      />
                      <p
                        className={`text-sm sm:text-base leading-relaxed font-sans ${
                          isDarkMode ? "text-slate-400" : "text-slate-650"
                        }`}
                      >
                        {achievement}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
