import React from "react";
import { motion } from "motion/react";
import { GraduationCap, Award, Calendar, BookOpen } from "lucide-react";
import { educationData } from "../data";

interface EducationProps {
  isDarkMode: boolean;
}

export default function Education({ isDarkMode }: EducationProps) {
  return (
    <section id="education" className="py-20 relative overflow-hidden">
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
            Academic Education
          </motion.h2>
          <div className="h-1.5 w-16 bg-indigo-600 mx-auto rounded-full mb-6" />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`text-base font-sans leading-relaxed ${
              isDarkMode ? "text-slate-400" : "text-slate-650"
            }`}
          >
            Engineering qualification, university credentials, and academic standing.
          </motion.p>
        </div>

        {/* Education Highlight Cards Pile */}
        <div className="max-w-3xl mx-auto space-y-8">
          {[
            {
              degree: "Bachelor of Technology in Information Technology",
              institution: "Bhagat Phool Singh Mahila Vishwavidyalaya, Sonipat, Haryana",
              period: "Oct 2022 – May 2026",
              score: "CGPA: 8.95 (Till 7th Semester)",
              subjects: ["Algorithms", "SQL & NoSQL Databases", "Computer Networks", "OOP in Java", "Operating Systems", "DSA"],
            },
            {
              degree: "Senior Secondary Education (Class XII), CBSE",
              institution: "DRP Public School, Palwal, Haryana",
              period: "Graduated July 2022",
              score: "Score: 97%",
              subjects: ["Physics", "Chemistry", "Mathematics", "English"],
            },
            {
              degree: "Secondary Education (Class X), CBSE",
              institution: "S P S International School, Palwal, Haryana",
              period: "Graduated July 2020",
              score: "Score: 96%",
              subjects: ["Science", "Mathematics", "Social Sciences", "Information Technology"],
            },
          ].map((school, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative rounded-2xl border p-6 sm:p-8 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-indigo-500/20 ${
                isDarkMode
                  ? "bg-slate-900/40 border-slate-800 shadow-xl shadow-slate-950/20"
                  : "bg-white border-slate-200 shadow-md shadow-slate-200/10"
              }`}
            >
              {/* Design accents */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full filter blur-xl pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-start gap-6 relative z-10">
                {/* Institution Icon */}
                <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex-shrink-0 self-start">
                  <GraduationCap size={32} />
                </div>

                {/* Information body */}
                <div className="flex-grow space-y-4">
                  <div>
                    <h3
                      className={`text-xl sm:text-2xl font-bold font-sans tracking-tight ${
                        isDarkMode ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {school.degree}
                    </h3>
                    <p className="text-indigo-500 font-semibold font-sans mt-0.5 sm:mt-1">
                      {school.institution}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-1">
                    {/* Period */}
                    <div className="flex items-center gap-2 text-sm text-slate-505 dark:text-slate-400 font-sans">
                      <Calendar size={16} className="text-slate-400 flex-shrink-0" />
                      <span>{school.period}</span>
                    </div>

                    {/* Performance Score */}
                    <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 font-bold font-sans">
                      <Award size={16} className="flex-shrink-0" />
                      <span>{school.score}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                    <h4
                      className={`text-sm font-bold uppercase tracking-wider mb-2 ${
                        isDarkMode ? "text-slate-300" : "text-slate-700"
                      }`}
                    >
                      Subject Concentrations & Highlights:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {school.subjects.map((subject) => (
                        <span
                          key={subject}
                          className={`text-xs px-2.5 py-1.5 rounded-lg border font-mono ${
                            isDarkMode
                              ? "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                              : "bg-slate-50 border-slate-200 text-slate-650 hover:bg-indigo-50 hover:border-indigo-100"
                          }`}
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
