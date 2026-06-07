import React, { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Github, Linkedin, Mail } from "lucide-react";
import { personalInfo } from "../data";

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export default function Navbar({ isDarkMode, toggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Education", href: "#education" },
    { name: "Certifications", href: "#certifications" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? isDarkMode
            ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60 shadow-lg shadow-slate-950/20"
            : "bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-md shadow-slate-200/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Branding */}
          <div className="flex-shrink-0">
            <a
              id="nav-logo"
              href="#"
              className={`font-sans font-extrabold text-xl tracking-tight transition-colors ${
                isDarkMode ? "text-white hover:text-indigo-400" : "text-slate-900 hover:text-indigo-600"
              }`}
            >
              KS<span className="text-indigo-500">.</span>
            </a>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                id={`nav-link-${link.name.toLowerCase()}`}
                key={link.name}
                href={link.href}
                className={`px-3 py-2 rounded-md font-sans text-sm font-medium transition-colors ${
                  isDarkMode
                    ? "text-slate-300 hover:text-indigo-400 hover:bg-slate-900/45"
                    : "text-slate-600 hover:text-indigo-600 hover:bg-slate-100"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle Button */}
            <button
              id="theme-toggle-desktop"
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors cursor-pointer ${
                isDarkMode
                  ? "text-yellow-400 hover:bg-slate-900 hover:text-yellow-300"
                  : "text-slate-600 hover:bg-slate-100 hover:text-indigo-600"
              }`}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Social Buttons */}
            <span className={`w-px h-5 ${isDarkMode ? "bg-slate-800" : "bg-slate-300"}`} />

            <div className="flex items-center space-x-2">
              <a
                id="social-github-desktop"
                href={personalInfo.github}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode ? "text-slate-300 hover:text-white hover:bg-slate-900" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                <Github size={18} />
              </a>
              <a
                id="social-linkedin-desktop"
                href={personalInfo.linkedin}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-colors ${
                  isDarkMode ? "text-slate-300 hover:text-white hover:bg-slate-900" : "text-slate-600 hover:text-indigo-600 hover:bg-slate-100"
                }`}
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              id="theme-toggle-mobile"
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode ? "text-yellow-400" : "text-slate-600"
              }`}
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode
                  ? "text-slate-300 hover:text-white hover:bg-slate-900"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div
          id="mobile-nav-panel"
          className={`md:hidden transition-all duration-300 ${
            isDarkMode ? "bg-slate-950 border-b border-slate-800" : "bg-white border-b border-slate-200"
          }`}
        >
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                id={`mobile-nav-link-${link.name.toLowerCase()}`}
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md font-sans text-base font-medium transition-colors ${
                  isDarkMode
                    ? "text-slate-300 hover:text-indigo-400 hover:bg-slate-900"
                    : "text-slate-600 hover:text-indigo-600 hover:bg-slate-100"
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 pb-1 border-t border-slate-200 dark:border-slate-800 flex items-center justify-around">
              <a
                id="social-github-mobile"
                href={personalInfo.github}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className={`p-2 rounded-full ${isDarkMode ? "text-slate-300 bg-slate-900 hover:text-white" : "text-slate-600 bg-slate-100 hover:text-slate-900"}`}
              >
                <Github size={20} />
              </a>
              <a
                id="social-linkedin-mobile"
                href={personalInfo.linkedin}
                target="_blank"
                referrerPolicy="no-referrer"
                rel="noopener noreferrer"
                className={`p-2 rounded-full ${isDarkMode ? "text-slate-300 bg-slate-900 hover:text-white" : "text-slate-600 bg-slate-100 hover:text-indigo-600"}`}
              >
                <Linkedin size={20} />
              </a>
              <a
                id="social-mail-mobile"
                href={`mailto:${personalInfo.email}`}
                className={`p-2 rounded-full ${isDarkMode ? "text-slate-300 bg-slate-900 hover:text-white" : "text-slate-600 bg-slate-100 hover:text-indigo-600"}`}
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
