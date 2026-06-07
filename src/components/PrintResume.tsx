import React, { useEffect } from "react";
import { personalInfo, educationData } from "../data";
import { Printer, ArrowLeft, Info, Sparkles } from "lucide-react";

interface PrintResumeProps {
  isPrintView?: boolean;
  onExit?: () => void;
}

export default function PrintResume({ isPrintView = false, onExit }: PrintResumeProps) {
  const handleManualPrint = () => {
    window.print();
  };

  return (
    <div 
      className={isPrintView ? "min-h-screen bg-slate-100 flex flex-col pt-24 pb-12 print:pt-0 print:pb-0 print:bg-white" : "contents"}
    >
      {/* Dynamic Top Printing Assistant Helper Bar */}
      {isPrintView && (
        <div 
          id="print-assistant-bar"
          className="fixed top-0 left-0 w-full bg-slate-900 border-b border-slate-850 text-white py-3.5 px-4 sm:px-6 flex flex-wrap items-center justify-between gap-4 z-50 shadow-xl print:hidden font-sans"
        >
          <div className="flex items-center gap-3">
            <button
              onClick={onExit}
              className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg border border-slate-700 transition cursor-pointer"
              title="Return to standard view"
            >
              <ArrowLeft size={16} />
              <span>Exit Preview</span>
            </button>
            <div className="h-4 w-px bg-slate-800 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-indigo-400 animate-pulse" />
              <p className="text-xs sm:text-sm font-semibold tracking-tight">
                Khushi Sharma's Resume <span className="text-slate-400 font-normal hidden sm:inline">(PDF Ready)</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-slate-400 text-xs text-right mr-2 bg-slate-950/40 px-3 py-1.5 rounded-lg border border-slate-800">
              <Info size={14} className="text-indigo-400 flex-shrink-0" />
              <span>Tip: Set <strong>Margins</strong> to 'Default' or 'Minimum', and enable <strong>Background graphics</strong>!</span>
            </div>

            <button
              onClick={handleManualPrint}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-505 text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-lg border border-indigo-500 transition shadow-lg shadow-indigo-600/20 cursor-pointer"
            >
              <Printer size={16} />
              Print / Save PDF
            </button>
          </div>
        </div>
      )}

      {/* Main Resume Sheet */}
      <div
        id="print-resume-container"
        className={`${
          isPrintView 
            ? "block shadow-2xl border border-gray-200 rounded-xl print:shadow-none print:border-none print:rounded-none" 
            : "hidden print:block"
        } text-black bg-white p-6 sm:p-10 max-w-[8.5in] w-full mx-auto leading-relaxed text-sm font-sans relative z-10 transition-all`}
        style={{ color: "#111", background: "#fff", fontFamily: "Arial, sans-serif" }}
      >
      {/* Header */}
      <header className="text-center border-b pb-4 mb-5">
        <h1 className="text-3xl font-extrabold tracking-tight uppercase" style={{ color: "#000" }}>
          Khushi Sharma
        </h1>
        <p className="text-xs mt-1 text-gray-700">
          Palwal, Haryana • +91 9053273309 •{" "}
          <a href={`mailto:${personalInfo.email}`} className="underline">
            {personalInfo.email}
          </a>
        </p>
        <div className="text-xs mt-1 text-gray-700 flex justify-center gap-3">
          <a href={personalInfo.linkedin} className="underline" target="_blank" rel="noopener noreferrer">
            {personalInfo.linkedin}
          </a>
          <span>•</span>
          <a href={personalInfo.github} className="underline" target="_blank" rel="noopener noreferrer">
            {personalInfo.github}
          </a>
        </div>
      </header>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-base font-bold border-b border-gray-300 uppercase pb-1 mb-3 text-indigo-900" style={{ color: "#1e3a8a" }}>
          Education
        </h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between font-bold text-sm">
              <span>Bhagat Phool Singh Mahila Vishwavidyalaya</span>
              <span className="text-gray-600 font-normal">Sonipat, Haryana</span>
            </div>
            <div className="flex justify-between text-xs text-gray-700 mt-0.5">
              <span>Bachelor of Technology in Information Technology</span>
              <span>Oct 2022 – May 2026</span>
            </div>
            <p className="text-xs font-semibold text-gray-800 mt-1">
              CGPA: 8.95 (Till 7th Semester)
            </p>
          </div>

          <div>
            <div className="flex justify-between font-bold text-sm">
              <span>DRP Public School</span>
              <span className="text-gray-600 font-normal">Palwal, Haryana</span>
            </div>
            <div className="flex justify-between text-xs text-gray-700 mt-0.5">
              <span>Senior Secondary Education, CBSE</span>
              <span>July 2022</span>
            </div>
            <p className="text-xs font-semibold text-gray-800 mt-1">
              Score: 97%
            </p>
          </div>

          <div>
            <div className="flex justify-between font-bold text-sm">
              <span>S P S International School</span>
              <span className="text-gray-600 font-normal">Palwal, Haryana</span>
            </div>
            <div className="flex justify-between text-xs text-gray-700 mt-0.5">
              <span>Secondary Education, CBSE</span>
              <span>July 2020</span>
            </div>
            <p className="text-xs font-semibold text-gray-800 mt-1">
              Score: 96%
            </p>
          </div>
        </div>
      </section>

      {/* Internships */}
      <section className="mb-6">
        <h2 className="text-base font-bold border-b border-gray-300 uppercase pb-1 mb-3 text-indigo-900" style={{ color: "#1e3a8a" }}>
          Internships
        </h2>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between font-bold text-sm">
              <span>OGES Solutions Pvt. Ltd.</span>
              <span className="text-gray-600 font-normal">Gurugram, Haryana</span>
            </div>
            <div className="flex justify-between text-xs text-gray-700 mt-0.5 italic">
              <span>Trainee Project Engineer (Frontend Developer Intern)</span>
              <span>Jan 2026 – Mar 2026</span>
            </div>
            <ul className="list-disc pl-5 text-xs text-gray-800 mt-2 space-y-1">
              <li>Developed responsive web applications using Angular and React.js.</li>
              <li>Built reusable UI components and integrated frontend features.</li>
              <li>Collaborated with developers in Agile workflows using Git and participated in testing, debugging, and code reviews.</li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between font-bold text-sm">
              <span>Smart Learning Academy</span>
              <span className="text-gray-600 font-normal">Palwal, Haryana</span>
            </div>
            <div className="flex justify-between text-xs text-gray-700 mt-0.5 italic">
              <span>HTML, CSS, JavaScript & Java Programming Intern</span>
              <span>Mar 2025 – Aug 2025</span>
            </div>
            <ul className="list-disc pl-5 text-xs text-gray-800 mt-2 space-y-1">
              <li>Developed frontend applications using HTML, CSS, JavaScript, and Java.</li>
              <li>Applied data structures, file handling, and OOP concepts.</li>
              <li>Built small projects to strengthen problem-solving and coding skills.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mb-6">
        <h2 className="text-base font-bold border-b border-gray-300 uppercase pb-1 mb-3 text-indigo-900" style={{ color: "#1e3a8a" }}>
          Skills & Achievements
        </h2>
        <div className="grid grid-cols-1 gap-1.5 text-xs text-gray-800">
          <p><strong>Programming Languages:</strong> JavaScript, TypeScript, Python, Java, SQL</p>
          <p><strong>Frontend:</strong> React.js, Angular, HTML, CSS, Tailwind CSS</p>
          <p><strong>Backend:</strong> Node.js, Express.js</p>
          <p><strong>Database:</strong> MongoDB, SQL</p>
          <p><strong>Tools:</strong> Git, VS Code, Microsoft Office</p>
          <p><strong>Coursework:</strong> DSA, OOP, DBMS, OS, CN, IoT</p>
        </div>
      </section>

      {/* Projects */}
      <section className="mb-6 page-break-before">
        <h2 className="text-base font-bold border-b border-gray-300 uppercase pb-1 mb-3 text-indigo-900" style={{ color: "#1e3a8a" }}>
          Projects
        </h2>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between font-bold text-sm">
              <span>Mindwell AI</span>
              <span className="text-xs text-gray-650 font-normal font-mono">React.js, TypeScript, HTML, CSS</span>
            </div>
            <ul className="list-disc pl-5 text-xs text-gray-800 mt-1 space-y-0.5">
              <li>Developed responsive frontend interfaces using React.js and TypeScript.</li>
              <li>Built reusable components and implemented efficient state management.</li>
              <li>Enhanced user experience through responsive and interactive UI design.</li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between font-bold text-sm">
              <span>SignBridge AI</span>
              <span className="text-xs text-gray-650 font-normal font-mono">Python, OpenCV, Machine Learning</span>
            </div>
            <ul className="list-disc pl-5 text-xs text-gray-800 mt-1 space-y-0.5">
              <li>Developed a real-time Indian Sign Language Translator using computer vision.</li>
              <li>Implemented gesture detection and hand-tracking for text conversion.</li>
              <li>Improved communication accessibility through accurate gesture recognition.</li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between font-bold text-sm">
              <span>Project Management Dashboard</span>
              <span className="text-xs text-gray-650 font-normal font-mono">React.js, TypeScript, Node.js, Express.js, MongoDB, Tailwind CSS</span>
            </div>
            <ul className="list-disc pl-5 text-xs text-gray-800 mt-1 space-y-0.5">
              <li>Developed a full-stack task and project management platform.</li>
              <li>Implemented authentication, role-based access and task tracking.</li>
              <li>Built dashboards and REST APIs for project monitoring.</li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between font-bold text-sm">
              <span>E-Commerce Market (Multi-vendor)</span>
              <span className="text-xs text-gray-650 font-normal font-mono">React.js, TypeScript, Node.js, Express.js, MongoDB, Tailwind CSS</span>
            </div>
            <ul className="list-disc pl-5 text-xs text-gray-800 mt-1 space-y-0.5">
              <li>Developed a multi-vendor e-commerce marketplace.</li>
              <li>Implemented product management, shopping cart, and order processing.</li>
              <li>Built scalable APIs and responsive user interfaces.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section>
        <h2 className="text-base font-bold border-b border-gray-300 uppercase pb-1 mb-3 text-indigo-900" style={{ color: "#1e3a8a" }}>
          Certificates
        </h2>
        <ul className="list-disc pl-5 text-xs text-gray-800 space-y-1">
          <li>Cisco Cybersecurity Essentials</li>
          <li>Cisco Introduction to Cybersecurity</li>
          <li>HTML, CSS & JavaScript Programming Certification</li>
          <li>Java & Python Programming Certification</li>
        </ul>
      </section>
    </div>
    </div>
  );
}
