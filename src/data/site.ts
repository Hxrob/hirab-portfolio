export const SITE = {
  name: "Hirab Abdourazak",
  role: "Software Engineer & ML Enthusiast",
  location: "Philadelphia, PA",
  intro: {
    headline: ["Building reliable", "delightful", "intelligent apps."], // typewriter rotates
    subtext:
      "Recent CS grad focused on SWE + ML/AI. I ship full-stack products, optimize performance, and love clean design.",
    ctaPrimary: { label: "Contact Me", href: "#contact" },
    ctaSecondary: { label: "View Projects", href: "#projects" },
  },
  socials: [
    { label: "GitHub", href: "https://github.com/Hxrob" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/hirabdou" },
    { label: "Email", href: "mailto:hirababdourazak@gmail.com" },
  ],
  skills: {
    languages: ["TypeScript", "Python", "Java", "C/C++", "SQL", "Go"],
    frameworks: [
      "React",
      "Next.js",
      "Node/Express",
      "Flask/FastAPI",
      "Tailwind",
      "Framer Motion",
    ],
    apisTools: [
      "OpenAI API",
      "Firebase",
      "MongoDB",
      "AWS (Rekognition, S3)",
      "Docker",
      "Vite",
      "Git/GitHub Actions",
    ],
  },
  projects: [
    {
      title: "HotSpot — Real-time Event Pings",
      description:
        "React Native + Express + Firebase app for geo-based event alerts with live updates and role-based moderation.",
      tags: ["React Native", "Express", "Firebase", "Google Maps API"],
      links: {
        github: "https://github.com/cis3296f24/01-HotSpot",
        demo: "https://your-hotspot-demo.com",
      },
    },
    {
      title: "Piggyback Learning — Interactive Video Quizzes",
      description:
        "YouTube-embedded quiz platform using OpenAI for question generation and AWS Rekognition for scene tagging.",
      tags: ["Next.js", "OpenAI API", "Rekognition", "MongoDB"],
      links: {
        github: "https://github.com/Capstone-Projects-2025-Spring/project-piggyback-learning-team-1",
        demo: "https://pigletprep.vercel.app",
      },
    },
  ],
  contact: {
    blurb:
      "Interested in SWE/ML roles or collaborations. I'm open to internships, new-grad roles, and contract work!",
    email: "hirababdourazak@gmail.com",
    location: "Philadelphia, PA",
  },
} as const;
