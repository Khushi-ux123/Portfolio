export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl: string;
  overview?: string;
  problem?: string;
  solution?: string;
  features?: string[];
  architecture?: string;
  challenges?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  achievements: string[];
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  gpaOrCgpa: string;
}

export interface Certification {
  name: string;
  issuer: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}
