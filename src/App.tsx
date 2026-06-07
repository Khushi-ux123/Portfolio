/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import PrintResume from "./components/PrintResume";
import ScrollToTop from "./components/ScrollToTop";
import SkeletonLoader from "./components/SkeletonLoader";

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isPrintView, setIsPrintView] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Simulated initialization of heavy asset trees or animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Check URL parameters or Hash to enter high-fidelity standalone print preview mode
  useEffect(() => {
    const checkPrintView = () => {
      const params = new URLSearchParams(window.location.search);
      const hasPrintQuery = params.get("print") === "true";
      const hasPrintHash = window.location.hash === "#print";
      setIsPrintView(hasPrintQuery || hasPrintHash);
    };

    checkPrintView();
    window.addEventListener("hashchange", checkPrintView);
    return () => window.removeEventListener("hashchange", checkPrintView);
  }, []);

  // Synchronize the dark mode state with document.documentElement
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const exitPrintPreview = () => {
    // Remove query parameter without page reload
    const url = new URL(window.location.href);
    url.searchParams.delete("print");
    window.history.pushState({}, "", url.pathname);
    window.location.hash = "";
    setIsPrintView(false);
  };

  if (isPrintView) {
    return (
      <>
        <title>Khushi Sharma - Resume (PDF Version)</title>
        <meta name="description" content="View or print the high-fidelity professional resume of Khushi Sharma, B.Tech IT Graduate & Frontend Developer." />
        <meta name="robots" content="noindex, follow" />
        <PrintResume isPrintView={true} onExit={exitPrintPreview} />
      </>
    );
  }

  return (
    <div
      id="portfolio-root"
      className={`min-h-screen transition-colors duration-300 font-sans selection:bg-indigo-505 selection:text-white ${
        isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-900"
      }`}
    >
      <title>Khushi Sharma | Frontend Developer & IT Engineer Portfolio</title>
      <meta name="description" content="Explore the portfolio of Khushi Sharma, B.Tech IT Graduate & Frontend Developer Intern. Featuring projects like Mindwell AI, SignBridge AI, and scalable React and Angular web systems." />
      <meta name="keywords" content="Khushi Sharma, Portfolio, Frontend Developer, B.Tech IT, Angular, React, Software Engineer, Palwal, Haryana, Mindwell AI, SignBridge AI, Web Developer" />
      
      {/* OpenGraph Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Khushi Sharma | Frontend Developer & IT Engineer Portfolio" />
      <meta property="og:description" content="Explore dynamic IT projects, professional internships, and skills in React, Angular, TypeScript, and Java." />
      <meta property="og:site_name" content="Khushi Sharma Portfolio" />
      
      {/* Twitter Tags */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content="Khushi Sharma | Frontend Developer & IT Engineer Portfolio" />
      <meta name="twitter:description" content="Explore dynamic IT projects, professional internships, and skills in React, Angular, TypeScript, and Java." />

      {/* High-fidelity PDF-replica resume layout - visible strictly during browser print */}
      <PrintResume />

      {/* Main interactive application - nested under print:hidden to hide website decorations when printing */}
      <div className="print:hidden">
        {isLoading ? (
          <SkeletonLoader isDarkMode={isDarkMode} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Scroll Progress Bar */}
            <motion.div
              id="scroll-progress-bar"
              className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 origin-[0%] z-[100]"
              style={{ scaleX }}
            />

            {/* Navigation */}
            <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

            {/* Sections Wrapper */}
            <main className="relative">
              {/* Hero Section */}
              <Hero isDarkMode={isDarkMode} />

              {/* Section Break Divider */}
              <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
                <div className={`h-px ${isDarkMode ? "bg-slate-900" : "bg-slate-200"}`} />
              </div>

              {/* About Section */}
              <About isDarkMode={isDarkMode} />

              {/* Section Break Divider */}
              <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
                <div className={`h-px ${isDarkMode ? "bg-slate-900" : "bg-slate-200"}`} />
              </div>

              {/* Skills Section */}
              <Skills isDarkMode={isDarkMode} />

              {/* Section Break Divider */}
              <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
                <div className={`h-px ${isDarkMode ? "bg-slate-905" : "bg-slate-200"}`} />
              </div>

              {/* Experience Section */}
              <Experience isDarkMode={isDarkMode} />

              {/* Section Break Divider */}
              <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
                <div className={`h-px ${isDarkMode ? "bg-slate-900" : "bg-slate-200"}`} />
              </div>

              {/* Projects Section */}
              <Projects isDarkMode={isDarkMode} />

              {/* Section Break Divider */}
              <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
                <div className={`h-px ${isDarkMode ? "bg-slate-900" : "bg-slate-200"}`} />
              </div>

              {/* Education Section */}
              <Education isDarkMode={isDarkMode} />

              {/* Section Break Divider */}
              <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
                <div className={`h-px ${isDarkMode ? "bg-slate-900" : "bg-slate-200"}`} />
              </div>

              {/* Certifications Section */}
              <Certifications isDarkMode={isDarkMode} />

              {/* Section Break Divider */}
              <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
                <div className={`h-px ${isDarkMode ? "bg-slate-900" : "bg-slate-200"}`} />
              </div>

              {/* Contact Section */}
              <Contact isDarkMode={isDarkMode} />
            </main>

            {/* Footer */}
            <Footer isDarkMode={isDarkMode} />

            {/* Scroll to Top floating action button */}
            <ScrollToTop />
          </motion.div>
        )}
      </div>
    </div>
  );
}
