import { Project, Experience, Education, Certification, SkillCategory } from "./types";

export const personalInfo = {
  name: "Khushi Sharma",
  role: "Full-Stack Developer",
  location: "Palwal, Haryana, India",
  email: "khushi905sharma@gmail.com",
  linkedin: "https://www.linkedin.com/in/khushi-sharma-45215a399",
  github: "https://github.com/Khushi-ux123",
  bio: "Final-year B.Tech IT student specializing in building scalable web applications and AI-powered solutions. Passionate about Full-Stack Development, artificial intelligence, and problem-solving, with a strong academic foundation in algorithms and modern web frameworks.",
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
    title: "Mindwell AI",
    description: "Developed responsive frontend interfaces using React.js and TypeScript. Built reusable components and implemented efficient state management to enhance user experience.",
    technologies: ["React.js", "TypeScript", "HTML", "CSS"],
    githubUrl: "https://github.com/Khushi-ux123",
    liveUrl: "https://github.com/Khushi-ux123",
    imageUrl: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "signbridge-ai",
    title: "SignBridge AI",
    description: "Developed a real-time Indian Sign Language Translator using Python, OpenCV, and Machine Learning. Implemented gesture detection and hand-tracking for text conversion.",
    technologies: ["Python", "OpenCV", "Machine Learning"],
    githubUrl: "https://github.com/Khushi-ux123",
    liveUrl: "https://github.com/Khushi-ux123/SignBridge-AI",
    imageUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "project-dashboard",
    title: "Project Management Dashboard",
    description: "Developed a full-stack project and task management platform with authentication, role-based access, comprehensive user progress dashboards, and low-latency REST APIs.",
    technologies: ["React.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/Khushi-ux123",
    liveUrl: "https://github.com/Khushi-ux123",
    imageUrl: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "ecommerce-market",
    title: "E-Commerce Market (Multi-vendor)",
    description: "Developed a multi-vendor marketplace featuring dynamic product catalog management, persistence shopping carts, real-time checkout updates, and scalable background database APIs.",
    technologies: ["React.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    githubUrl: "https://github.com/Khushi-ux123",
    liveUrl: "https://github.com/Khushi-ux123",
    imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=800"
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
