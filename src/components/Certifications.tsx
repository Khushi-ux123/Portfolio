import React from "react";
import { motion } from "motion/react";
import { Award, ShieldCheck, FileCheck, CheckCircle2 } from "lucide-react";
import { certificationsData } from "../data";

interface CertificationsProps {
  isDarkMode: boolean;
}

export default function Certifications({ isDarkMode }: CertificationsProps) {
  // Map index to different graphic badges
  const getCertIcon = (idx: number) => {
    switch (idx) {
      case 0:
      case 1:
        return <ShieldCheck size={24} className="text-emerald-500" />;
      default:
        return <FileCheck size={24} className="text-indigo-500" />;
    }
  };

  return (
    <section id="certifications" className="py-20 relative bg-slate-50/50 dark:bg-slate-900/20">
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
            Certifications
          </motion.h2>
          <div className="h-1.5 w-16 bg-indigo-600 mx-auto rounded-full mb-6" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {certificationsData.map((cert, idx) => (
            <motion.div
              id={`certification-card-${idx}`}
              key={cert.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className={`p-6 rounded-2xl border flex items-start gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                isDarkMode
                  ? "bg-slate-900/40 border-slate-800 hover:bg-slate-900 hover:border-indigo-500/30"
                  : "bg-white border-slate-200 hover:bg-slate-50 hover:border-indigo-500/20"
              }`}
            >
              {/* Badge Icon */}
              <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 flex-shrink-0">
                {getCertIcon(idx)}
              </div>

              {/* Text content */}
              <div className="space-y-1">
                <h3
                  className={`text-sm sm:text-base font-bold font-sans tracking-tight leading-snug ${
                    isDarkMode ? "text-white" : "text-slate-900"
                  }`}
                >
                  {cert.name}
                </h3>
                <p
                  className={`text-xs font-semibold ${
                    isDarkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {cert.issuer}
                </p>

                <div className="flex items-center gap-1.5 pt-2 text-[10px] sm:text-xs font-mono font-bold text-emerald-500">
                  <CheckCircle2 size={12} className="flex-shrink-0" />
                  <span>Credential Verified</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
