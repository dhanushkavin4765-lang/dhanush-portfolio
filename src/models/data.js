export const developerData = {
  profile: {
    name: "Dhanush B",
    title: "Python Full Stack Developer",
    secondaryRoles: [
      "Full Stack Web Developer",
      "FastAPI Developer",
      "React Developer",
      "Backend Engineer"
    ],
    tagline: "Building modern web solutions with Python, React, FastAPI, and innovation at the core.",
    bio: "I'm an aspiring Python Full Stack Developer and a B.Tech Information Technology student (2023-2027) at Shree Venkateshwara Hi-Tech Engineering College. I specialize in building highly responsive web applications using React, Python, FastAPI, and scalable databases. I love solving complex engineering challenges and creating modern, high-fidelity user experiences.",
    avatar: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400",
    stats: [
      { label: "IT Student (Grad)", value: "2027" },
      { label: "Full Stack Projects", value: "10+" },
      { label: "GitHub Commits", value: "120+" },
      { label: "Modern Skills", value: "15+" }
    ],
    socials: {
      github: "https://github.com/dhanushkavin4765-lang",
      linkedin: "http://www.linkedin.com/in/dhanush-b-8787bb3a9",
      email: "dhanushkavin4765@gmail.com"
    }
  },
  skills: [
    // Frontend
    { name: "HTML", category: "Frontend", level: 95, icon: "html" },
    { name: "CSS", category: "Frontend", level: 90, icon: "css" },
    { name: "JavaScript", category: "Frontend", level: 92, icon: "javascript" },
    { name: "React", category: "Frontend", level: 88, icon: "react" },
    { name: "Vite", category: "Frontend", level: 85, icon: "vite" },
    { name: "Bootstrap", category: "Frontend", level: 85, icon: "bootstrap" },
    { name: "Tailwind CSS", category: "Frontend", level: 90, icon: "tailwind" },
    
    // Backend
    { name: "Python", category: "Backend", level: 94, icon: "python" },
    { name: "FastAPI", category: "Backend", level: 90, icon: "fastapi" },
    { name: "Flask", category: "Backend", level: 85, icon: "flask" },
    { name: "Node.js", category: "Backend", level: 80, icon: "nodejs" },
    { name: "Express.js", category: "Backend", level: 80, icon: "express" },
    { name: "Java", category: "Backend", level: 82, icon: "java" },
    { name: "Spring Boot", category: "Backend", level: 78, icon: "springboot" },
    
    // Database
    { name: "SQL", category: "Database", level: 88, icon: "sql" },
    { name: "MongoDB", category: "Database", level: 84, icon: "mongodb" },
    
    // Tools
    { name: "Git", category: "Tools", level: 90, icon: "git" },
    { name: "GitHub", category: "Tools", level: 92, icon: "github" },
    { name: "VS Code", category: "Tools", level: 95, icon: "vscode" },
    { name: "Figma", category: "Tools", level: 78, icon: "figma" },
    { name: "FlutterFlow", category: "Tools", level: 80, icon: "flutterflow" }
  ],
  projects: [
    {
      id: "venture-connect",
      title: "Venture Connect",
      shortDescription: "A premium collaborative platform bridging ambitious startup founders, business mentors, and venture capital investors.",
      fullDescription: "Venture Connect is an enterprise-grade full-stack platform designed to facilitate networking and investment workflows for startups. It allows startup founders to present business models, build team proposals, and seek strategic guidance. Mentors can offer structured consultations, while venture capital investors can evaluate pitches and manage pipeline deals securely.",
      technologies: ["Java", "Spring Boot", "React", "Tailwind CSS", "MySQL", "Vite"],
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800",
      githubUrl: "https://github.com/dhanushkavin4765-lang/venture-connect",
      demoUrl: "https://github.com/dhanushkavin4765-lang/venture-connect",
      category: "Java Full Stack Platform",
      features: [
        "Multi-role user portal (Founder, Mentor, Investor) with tailored metrics and actions.",
        "Interactive pitch deck creation, visual metrics trackers, and secure document vaults.",
        "Integrated communication dashboard with real-time text chat.",
        "Automated booking scheduler for mentorship sessions and investment rounds."
      ]
    },
    {
      id: "locotour",
      title: "Locotour",
      shortDescription: "A smart hyperlocal tourism and route recommendation planner powered by FastAPI and React.",
      fullDescription: "Locotour is a Python full-stack platform designed to optimize travel planning and hyperlocal sightseeing. By leveraging modern APIs, it aggregates point-of-interest data and calculates optimized multi-destination routes based on user preferences, operating hours, and location reviews.",
      technologies: ["Python", "FastAPI", "React", "Tailwind CSS", "MongoDB", "Vite"],
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=800",
      githubUrl: "https://github.com/dhanushkavin4765-lang/locotour",
      demoUrl: "https://github.com/dhanushkavin4765-lang/locotour",
      category: "Python Full Stack Platform",
      features: [
        "Custom travel itinerary builder with real-time route path optimization.",
        "Geolocated search engine powered by MongoDB geospatial indexing.",
        "High-performance async FastAPI backend with clean, auto-documented OpenAPI specs.",
        "Interactive reviews dashboard with user feedback metrics."
      ]
    }
  ],
  timeline: [
    {
      id: "timeline-1",
      year: "2023 - Present",
      title: "B.Tech Information Technology",
      company: "Shree Venkateshwara Hi-Tech Engineering College",
      description: "Pursuing B.Tech degree with a focus on computer science, web technologies, and database management. Maintaining strong foundations in software engineering."
    },
    {
      id: "timeline-2",
      year: "2024 - 2025",
      title: "Full Stack Learning Journey",
      company: "Self-Directed / Labs",
      description: "Mastered python backend engineering (Flask, FastAPI) and modern front-end technologies (React, Vite, Tailwind CSS). Built solid capabilities in full-stack orchestration."
    },
    {
      id: "timeline-3",
      year: "2025 - Present",
      title: "Project Milestones & Collaborations",
      company: "Academic & Personal Projects",
      description: "Designed and built full-stack software like 'Venture Connect' (Java + Spring Boot) and 'Locotour' (Python + FastAPI). Integrated robust relational & NoSQL databases."
    },
    {
      id: "timeline-4",
      year: "2026 - 2027",
      title: "Career Growth Path",
      company: "Hiring Markets & Internships",
      description: "Seeking opportunities to collaborate with startup founders, product companies, and hiring managers to deploy modern full stack applications."
    }
  ]
};
