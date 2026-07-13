import { Project, Experience, Education, Certification, SkillCategory } from "./types";

export const personalInfo = {
  name: "Khushi Sharma",
  role: "Full-Stack Developer",
  location: "Palwal, Haryana, India",
  email: "khushi905sharma@gmail.com",
  linkedin: "https://www.linkedin.com/in/khushi-sharma-45215a399",
  github: "https://github.com/Khushi-ux123",
  bio: "Crafting intelligent digital experiences that blend engineering, creativity, and artificial intelligence.",
  resumeUrl: "#", // Placeholders or standard dynamic triggers can be used for resume download
};

export const skillsData: SkillCategory[] = [
  {
    category: "Frontend Development",
    skills: ["React.js", "Angular", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
  },
  {
    category: "Backend Development",
    skills: ["Node.js", "Express.js"],
  },
  {
    category: "Databases",
    skills: ["MongoDB", "SQL"],
  },
  {
    category: "Programming Languages",
    skills: ["Java", "Python", "JavaScript", "TypeScript"],
  },
  {
    category: "Tools & Version Control",
    skills: ["Git", "GitHub", "VS Code"],
  },
];

export const experienceData: Experience[] = [
  {
    id: "exp-1",
    company: "OGES Solutions Pvt. Ltd.",
    role: "Frontend Developer Intern",
    period: "Jan 2026 – Mar 2026",
    achievements: [
      "Developed responsive applications using React.js and Angular, ensuring pixel-perfect layout execution and seamless user navigation.",
      "Built highly reusable UI components, optimizing internal design systems and accelerating feature delivery across projects.",
      "Worked collaboratively in Agile sprint teams utilizing Git for source control and routine peer code reviews.",
      "Participated actively in testing, regression debugging, and resolving front-end compatibility challenges across modern platforms."
    ]
  },
  {
    id: "exp-2",
    company: "Smart Learning Academy",
    role: "Programming Intern",
    period: "Mar 2025 – Aug 2025",
    achievements: [
      "Worked extensively with HTML, CSS, JavaScript, and Java to execute user interfaces and procedural scripting workflows.",
      "Applied strict Object-Oriented Programming (OOP) methodologies and data structures to deliver reliable and secure codebase bases.",
      "Built numerous mini-projects designed targeting real-world algorithmic challenges and problem-solving requirements."
    ]
  }
];

export const projectData: Project[] = [
  {
    id: "mindwell-ai",
    title: "MindWell AI",
    description: "Developed responsive frontend interfaces using React.js and TypeScript. Built reusable components and implemented efficient state management to enhance user experience.",
    technologies: ["React.js", "TypeScript", "HTML", "CSS"],
    githubUrl: "https://github.com/Khushi-ux123",
    liveUrl: "https://github.com/Khushi-ux123",
    imageUrl: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&q=80&w=800",
    overview: "An AI-powered mental wellness ecosystem offering personalized therapy simulations, emotional logging, cognitive health analytics, and instant state trackers.",
    problem: "Mental health resources are often inaccessible, expensive, or carry a social stigma, preventing users from receiving immediate grounding support during high-stress moments.",
    solution: "Built a private, instant, client-first AI-powered mental wellness suite that assists with stress regulation, meditation scheduling, and real-time positive feedback loops.",
    features: [
      "AI Cognitive Therapy Chatbot Simulation",
      "Dynamic Mood Analysis & Historical Tracker",
      "Interactive Guided Meditation Sessions",
      "Encrypted Journal & Log Vault",
      "Calming Sound Synthesis Module"
    ],
    architecture: "React component tree using local storage persistence, responsive client-side routing, and interactive motion vectors for relaxed breathing patterns.",
    challenges: "Achieving absolute local privacy while keeping breathing animations smooth during long rendering states; solved by isolating local states and utilizing GPU-accelerated Tailwind transitions."
  },
  {
    id: "signbridge-ai",
    title: "SignBridge AI",
    description: "Developed a real-time Indian Sign Language Translator using Python, OpenCV, and Machine Learning. Implemented gesture detection and hand-tracking for text conversion.",
    technologies: ["Python", "OpenCV", "Machine Learning"],
    githubUrl: "https://github.com/Khushi-ux123",
    liveUrl: "https://github.com/Khushi-ux123/SignBridge-AI",
    imageUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800",
    overview: "A real-time Indian Sign Language (ISL) Translator bridging communication gaps for deaf and hard-of-hearing communities using computer vision.",
    problem: "The severe lack of standard real-time translators makes daily interactions difficult for hearing-impaired individuals in commercial or public environments.",
    solution: "Built a high-speed machine learning model that parses camera frames to recognize and translate sign gestures into fluid, readable text instantly.",
    features: [
      "Real-time Multi-Hand Tracking Feed",
      "Indian Sign Language Gesture Recognition Core",
      "Low-Latency Text Overlay Feed on Frame",
      "Contextual Auto-Sentence Assembler",
      "Custom Speech-Synthesis Audio Output"
    ],
    architecture: "Python-based OpenCV video pipeline integrated with a MediaPipe hand tracking framework and custom Deep Learning classification models.",
    challenges: "Translating micro-finger movements accurately under poor lighting conditions; mitigated by calibrating color thresholds and training models on diverse datasets."
  },
  {
    id: "project-dashboard",
    title: "FlowForge (Dashboard)",
    description: "Developed a full-stack project and task management platform with authentication, role-based access, comprehensive user progress dashboards, and low-latency REST APIs.",
    technologies: ["React.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/Khushi-ux123",
    liveUrl: "https://flowforge-project-management.onrender.com/",
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800",
    overview: "A high-performance, role-based project and task management dashboard tailored for agile development cycles and team telemetry.",
    problem: "Traditional management trackers are cluttered, slow to synchronize, and lack intuitive visual statistics for fast-moving developers.",
    solution: "Engineered a high-speed MERN dashboard with instant state updates, dynamic visual charts, role protections, and a clean workflow interface.",
    features: [
      "Role-Based Secure User Authentication",
      "Interactive Drag-and-Drop Task Boards",
      "Team Collaboration Rails & Activity Logs",
      "Real-Time Project Health Analytics & Charts",
      "High-Speed Backend REST APIs"
    ],
    architecture: "React.js and TypeScript frontend served by an Express/Node.js API layer with secure JSON Web Tokens (JWT) and a MongoDB data cluster.",
    challenges: "Preventing race conditions when multiple users update task nodes simultaneously; handled by optimizing Mongo aggregations and using socket-ready hooks."
  },
  {
    id: "ecommerce-market",
    title: "ShopSphere (Marketplace)",
    description: "Developed a multi-vendor marketplace featuring dynamic product catalog management, persistence shopping carts, real-time checkout updates, and scalable background database APIs.",
    technologies: ["React.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/Khushi-ux123",
    liveUrl: "https://multi-vendor-marketplace-978813914012.asia-southeast1.run.app/",
    imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800",
    overview: "A highly scalable multi-vendor marketplace featuring dual merchant dashboards, rich product listings, and streamlined user transactional feeds.",
    problem: "Building a reliable multi-vendor workflow is complex, requiring secure authorization levels, inventory state controls, and rapid loading times.",
    solution: "Built a comprehensive full-stack ecosystem managing independent product files, checkout sequences, and merchant statistics in real-time.",
    features: [
      "Multi-Vendor Portal Dashboards",
      "Dynamic Product Catalog Management & Search",
      "Persistent Client Shopping Carts",
      "Secure Sandbox Checkout Gateways",
      "User Wishlists & Order Histories"
    ],
    architecture: "React SPA frontend communicating with a scalable Node.js backend using MongoDB indexes and express router architectures.",
    challenges: "Managing inventory synchronization across multiple active buyers; resolved by implementing transactional locks and mongoose aggregate middleware."
  }
];

export const educationData: Education = {
  degree: "B.Tech Information Technology",
  institution: "Bhagat Phool Singh Mahila Vishwavidyalaya",
  period: "2022 – 2026",
  gpaOrCgpa: "8.95 CGPA"
};

export const certificationsData: Certification[] = [
  {
    name: "Cisco Cybersecurity Essentials",
    issuer: "Cisco Networking Academy"
  },
  {
    name: "Cisco Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy"
  },
  {
    name: "HTML, CSS & JavaScript Programming Certification",
    issuer: "Smart Learning Academy"
  },
  {
    name: "Java & Python Programming Certification",
    issuer: "Smart Learning Academy"
  }
];
