/**
 * portfolioData.js — Centralized Portfolio Data Source
 *
 * This is the SINGLE SOURCE OF TRUTH for all portfolio content.
 * Used by:
 *  - UI components (Projects, Skills, Certifications, etc.)
 *  - The AI "Ask My Portfolio" assistant (as context)
 *
 * DO NOT invent or add information that isn't real.
 */

export const portfolioData = {
  personal: {
    name: 'Harsh Tiwari',
    title: 'B.Tech Student | Front-End Developer | Programmer',
    email: 'mt63767199@gmail.com',
    phone: '+91 63772 26860',
    location: 'Jaipur, Rajasthan, India',
    bio: 'A passionate B.Tech student with a strong interest in web development, programming, and technology. I enjoy creating responsive websites and solving real-world problems through innovative software solutions.',
    tagline: 'Building Innovative Digital Solutions Through Code and Creativity.',
    linkedin: 'https://www.linkedin.com/in/harsh-tiwari-127192329',
    instagram: 'https://www.instagram.com/iharrxh',
    livePortfolio: 'https://portfolioowebb.netlify.app/',
  },

  education: [
    {
      id: 1,
      institution: 'Arya College of Engineering and IT',
      degree: 'B.Tech',
      field: 'Electronics and Communication Engineering (ECE)',
      duration: '2024 – Present',
      status: 'Ongoing',
    },
    {
      id: 2,
      institution: 'Jai Durga Senior Secondary School',
      degree: 'Class XII',
      field: 'Science',
      duration: '2023 – 2024',
      percentage: '75.20%',
    },
    {
      id: 3,
      institution: 'Sunrise Children Academy',
      degree: 'Class X',
      field: 'General',
      duration: '2021 – 2022',
      percentage: '76.17%',
    },
  ],

  experience: [
    {
      id: 1,
      role: 'Artificial Intelligence Intern',
      company: 'VISHVENA Techno Solutions Pvt. Ltd.',
      location: 'Hyderabad, Telangana (Remote/Campus)',
      duration: '15 Dec 2025 – 15 Mar 2026',
      durationMonths: '3 Months',
      programName: 'Artificial Intelligence – Vibe Coding Internship Program',
      contributions: [
        'Successfully completed the Artificial Intelligence – Vibe Coding Internship Program, learning and applying modern AI concepts.',
        'Developed intelligent software applications by integrating machine learning models with front-end code.',
        'Demonstrated excellent learning ability, coding efficiency, and dedication in completing assigned algorithmic and system tasks.',
        'Worked on neural network basics, NLP pipelines, and data preprocessing to solve real-world technical problems.',
      ],
    },
  ],

  skills: {
    programming: [
      { name: 'C / C++', level: 85 },
      { name: 'Java', level: 80 },
      { name: 'Python', level: 75 },
      { name: 'JavaScript', level: 80 },
    ],
    webDevelopment: [
      { name: 'HTML5', level: 90 },
      { name: 'CSS3', level: 85 },
      { name: 'React.js', level: 80 },
      { name: 'Bootstrap', level: 75 },
      { name: 'Tailwind CSS', level: 85 },
    ],
    databases: [
      { name: 'MySQL', level: 78 },
      { name: 'MongoDB', level: 70 },
    ],
    tools: [
      { name: 'Git', level: 80 },
      { name: 'GitHub', level: 85 },
      { name: 'VS Code', level: 90 },
    ],
  },

  projects: [
    {
      id: 1,
      title: 'Personal Portfolio Website',
      description:
        'The modern capstone portfolio of Harsh Tiwari featuring a glassmorphic dark-mode UI, fluid Framer Motion animations, AOS scroll triggers, and a serverless Google Gemini-powered "Ask My Portfolio" AI assistant.',
      technologies: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Google Gemini API', 'JavaScript'],
      category: ['frontend', 'React', 'AI', 'web'],
      liveLink: 'https://portfolioowebb.netlify.app/',
      githubLink: 'https://github.com/harsh12067/DecodeLabs-Internship',
      highlights: [
        'Glassmorphic dark-mode design with Tailwind CSS',
        'Framer Motion & AOS scroll animations',
        'Serverless Gemini "Ask My Portfolio" AI assistant',
        'Accessible (WCAG 2.1 AA compliant) responsive layout',
        'Comprehensive automated test suite (Vitest + RTL)',
      ],
    },
    {
      id: 2,
      title: 'SkillSwap Platform',
      description:
        'A peer-to-peer learning and skill exchange web application built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS. Features dynamic profile matching, user dashboards, interactive skill search registry, and real-time chat mockups.',
      technologies: ['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      category: ['fullstack', 'Next.js', 'React', 'web'],
      liveLink: 'https://skillswap-next-rho.vercel.app/',
      githubLink: 'https://github.com/harsh12067/skillswap-next',
      highlights: [
        'Next.js 16 App Router architecture with React 19',
        'Dynamic swapper matching & interactive skill registry',
        'Responsive dashboard, chat interface, and scheduling calendar',
        'TypeScript type safety & modern Tailwind CSS v4 styling',
      ],
    },
    {
      id: 3,
      title: 'AetherFlow Landing Page',
      description:
        'A modern, professional, and fully responsive SaaS landing page for engineering and product teams built completely from scratch using semantic HTML5, pure CSS3 with glassmorphism, and Vanilla JavaScript.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Glassmorphism', 'Flexbox & Grid'],
      category: ['frontend', 'web', 'UI/UX', 'JavaScript'],
      liveLink: 'https://antherlandingpage.netlify.app/',
      githubLink: 'https://github.com/harsh12067/DecodeLabs-Internship/tree/main/aetherflow-landing-page',
      highlights: [
        '10 semantic sections with responsive layout (Mobile to Desktop)',
        'Pure CSS3 glassmorphic design and centralized CSS variables',
        'Vanilla JS interactivity: FAQ accordion, scroll-reveal, modals, and validation',
        'Zero external libraries or CSS frameworks',
      ],
    },
    {
      id: 4,
      title: 'Backend API',
      description:
        'A complete, modular, and lightweight Backend RESTful API built with Node.js and Express.js implementing a full User Management system with CRUD endpoints, asynchronous JSON file storage, and custom input validation middleware.',
      technologies: ['Node.js', 'Express.js', 'REST API', 'JavaScript', 'Postman'],
      category: ['backend', 'Node.js', 'API', 'REST'],
      liveLink: null,
      githubLink: 'https://github.com/harsh12067/DecodeLabs-Internship/tree/main/Backend-API',
      highlights: [
        'RESTful API endpoints for full user management (/users)',
        'Custom input validation middleware with error reporting',
        'Asynchronous file I/O operations with Node.js fs/promises',
        'Modular MVC (Model-View-Controller) architecture',
        'Standardized JSON response models and HTTP status codes',
      ],
    },
  ],

  certifications: [
    {
      id: 1,
      title: 'Python (Basic) Skill Certification',
      issuer: 'HackerRank',
      date: '05 Oct 2025',
      credentialId: 'C5D3E43AB02C',
      verifyLink: 'https://www.hackerrank.com/certificates/c5d3e43ab02c',
    },
    {
      id: 2,
      title: 'C Essentials 1 Certification',
      issuer: 'Cisco Networking Academy & C++ Institute (via Credly)',
      date: '30 Jun 2025',
      credentialId: '79226ced-3a3c-4031-a42e-cffa1189194e',
      verifyLink: 'https://www.credly.com/users/harsh-tiwari.f2bef479',
    },
    {
      id: 3,
      title: 'MERN Full Stack Developer Certification',
      issuer: 'Unstop',
      date: '2025',
      credentialId: '0465abca-1ca9-491d-ad60-f2c11f2ff539',
      verifyLink:
        'https://unstop.com/certificate-preview/0465abca-1ca9-491d-ad60-f2c11f2ff539?utm_campaign=site-emails',
    },
    {
      id: 4,
      title: 'Claude 101 Certification',
      issuer: 'Anthropic (Skilljar)',
      date: '2025',
      credentialId: '3c5y767w56es',
      verifyLink: 'https://verify.skilljar.com/c/3c5y767w56es',
    },
  ],

  achievements: [
    { label: 'Projects Built', value: 3 },
    { label: 'Certifications', value: 4 },
    { label: 'Internship Months', value: 3 },
    { label: 'Skills Mastered', value: 14 },
  ],

  services: [
    {
      title: 'Web Development',
      description:
        'Building responsive, performant, and accessible websites using React, Tailwind CSS, and modern frontend technologies.',
    },
    {
      title: 'UI/UX Design',
      description:
        'Crafting clean and intuitive interfaces with modern design patterns including glassmorphism and fluid animations.',
    },
    {
      title: 'Website Maintenance',
      description:
        'Providing ongoing support, updates, and optimization for existing web applications.',
    },
  ],
};

export default portfolioData;
