export const SITE = {
  name: "Hirab Abdourazak",
  role: "Software Engineer & ML Enthusiast",
  location: "Philadelphia, PA",
  intro: {
    headline: "Building reliable, delightful, intelligent apps.",
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
    languages: ["TypeScript", "Python", "Java", "C/C++", "SQL", "Go", "JavaScript"],
    frameworks: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "Flask",
      "Tailwind",
      "Framer Motion",
      "FastAPI",
    ],
    apisTools: [
      "OpenAI API",
      "Firebase",
      "MongoDB",
      "AWS (Rekognition, S3)",
      "Docker",
      "Vite",
      "Git",
      "Google Cloud",
      "Resend",
    ],
  },
  projects: [
    {
        title: "One Point Five",
        description:
          "A client-focused real estate website designed to showcase property listings with a sleek, responsive UI.",
        tags: ["React.js", "Resend", "Google Cloud", "Vercel"],
        links: {
          github: "https://github.com/Hxrob/onepointfive",
          demo: "https://onepointfivehotel.com",
        },
        image: "/images/onepointfive.jpeg",
      },

    {
      title: "HotSpot",
      description:
        "A geolocation-based event discovery and real-time alert app that lets users broadcast, find, and join nearby happenings.",
      tags: ["React.js", "Express", "Firebase", "Google Maps API"],
      links: {
        github: "https://github.com/cis3296f24/01-HotSpot",
      },
      image: "/images/hotspot.png",
    },
    {
      title: "Piglet Prep",
      description:
        "An interactive video learning platform for children, embedding real-time multiple-choice and object-detection questions into videos to assess understanding and adapt learning.",
      tags: ["Next.js", "OpenAI API", "Rekognition", "MongoDB"],
      links: {
        github: "https://github.com/Capstone-Projects-2025-Spring/project-piggyback-learning-team-1",
        demo: "https://pigletprep.vercel.app",
      },
      image: "/images/pigletprep.jpeg",
    },

  ],
  contact: {
    blurb:
      "Interested in SWE/ML roles or collaborations. I'm open to internships, new-grad roles, and contract work!",
    email: "hirababdourazak@gmail.com",
    location: "Philadelphia, PA",
  },
} as const;
