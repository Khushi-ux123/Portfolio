import React from "react";
import { motion } from "motion/react";
import { Github, ExternalLink, ArrowUpRight } from "lucide-react";
import { projectData } from "../data";

interface ProjectsProps {
  isDarkMode: boolean;
}

export default function Projects({ isDarkMode }: ProjectsProps) {
  return (
    <section id="projects" className="py-20 relative bg-slate-50/50 dark:bg-slate-900/20">
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
            Featured Engineering Projects
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
            A curated showcase of dynamic full-stack software, mobile-ready toolkits, and machine learning models.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {projectData.map((project, projIdx) => (
            <motion.div
              id={`project-card-${projIdx}`}
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: projIdx * 0.05 }}
              className={`group flex flex-col rounded-2xl border overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                isDarkMode
                  ? "bg-slate-900/40 border-slate-800/80 hover:bg-slate-900 hover:border-indigo-500/20 shadow-slate-950/20"
                  : "bg-white border-slate-200 hover:bg-slate-55 hover:border-indigo-500/10 shadow-lg shadow-slate-250/5"
              }`}
            >
              {/* Image Banner */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  referrerPolicy="no-referrer"
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Tech Badges floating tag list */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 max-w-[90%] pointer-events-none">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold font-mono uppercase bg-slate-900/90 text-white backdrop-blur-sm"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-slate-900/95 text-indigo-300 backdrop-blur-sm">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-grow flex flex-col justify-between">
                <div>
                  <h3
                    className={`text-xl font-bold font-sans tracking-tight mb-2 flex items-center gap-2 group-hover:text-indigo-505 transition-colors ${
                      isDarkMode ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {project.title}
                    <ArrowUpRight
                      size={16}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-indigo-550"
                    />
                  </h3>

                  <p
                    className={`text-sm sm:text-base leading-relaxed mb-6 font-sans ${
                      isDarkMode ? "text-slate-400" : "text-slate-650"
                    }`}
                  >
                    {project.description}
                  </p>
                </div>

                {/* Card Footer / Navigation Links */}
                <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                  {/* Detailed list of all Tech stack tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`text-[11px] font-semibold font-mono tracking-wide px-2 py-0.5 rounded-md ${
                          isDarkMode ? "bg-slate-950 text-slate-400" : "bg-slate-50 text-slate-600 border border-slate-150"
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    {/* Live Demo */}
                    <a
                      id={`project-${project.id}-live`}
                      href={project.liveUrl}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>

                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-750" />

                    {/* GitHub Code */}
                    <a
                      id={`project-${project.id}-github`}
                      href={project.githubUrl}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-650 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                    >
                      <Github size={16} />
                      GitHub Code
                    </a>
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
