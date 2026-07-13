import React from "react";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { personalInfo } from "../data";

interface FooterProps {
  isDarkMode: boolean;
}

export default function Footer({ isDarkMode }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={`border-t py-12 transition-all duration-300 relative overflow-hidden ${
        isDarkMode
          ? "bg-[#050505] border-slate-900 text-slate-400"
          : "bg-slate-50 border-slate-200 text-slate-600"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          {/* Column 1: Branding */}
          <div>
            <h3
              className={`font-sans font-extrabold text-lg tracking-tight ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}
            >
              Khushi Sharma<span className="text-indigo-500">.</span>
            </h3>
            <p className="text-xs sm:text-sm font-sans mt-2">
              Full-Stack Developer building modern, scalable digital environments.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-sans font-medium">
            <a href="#about" className="hover:text-indigo-500 transition-colors">About</a>
            <a href="#skills" className="hover:text-indigo-500 transition-colors">Skills</a>
            <a href="#experience" className="hover:text-indigo-500 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-indigo-500 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-indigo-500 transition-colors">Contact</a>
          </div>

          {/* Column 3: Social Links & Floating top button */}
          <div className="flex md:flex-col items-center md:items-end justify-center md:justify-start gap-4">
            <div className="flex items-center space-x-3.5">
              <a
                id="footer-github"
                href={personalInfo.github}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode ? "text-slate-400 hover:text-white hover:bg-slate-900" : "text-slate-500 hover:text-slate-900 hover:bg-slate-200"
                }`}
                aria-label="GitHub-Profile"
              >
                <Github size={18} />
              </a>
              <a
                id="footer-linkedin"
                href={personalInfo.linkedin}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode ? "text-slate-400 hover:text-white hover:bg-slate-900" : "text-slate-500 hover:text-indigo-600 hover:bg-slate-200"
                }`}
                aria-label="LinkedIn-Profile"
              >
                <Linkedin size={18} />
              </a>
              <a
                id="footer-email"
                href={`mailto:${personalInfo.email}`}
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode ? "text-slate-400 hover:text-white hover:bg-slate-900" : "text-slate-500 hover:text-indigo-600 hover:bg-slate-200"
                }`}
                aria-label="Email-Contact"
              >
                <Mail size={18} />
              </a>
            </div>

          
            
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="font-mono">
            &copy; {currentYear} Khushi Sharma. All rights reserved.
          </p>
          <p className="font-mono flex items-center gap-1">
            Built with React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  );
}
