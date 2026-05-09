export const SITE = {
  name: "Hirab Abdourazak",
  role: "Software Engineer & ML Enthusiast",
  location: "Philadelphia, PA",
  intro: {
    headline: "Building reliable, delightful, intelligent apps.",
    subtext:
      "Recent CS grad focused on cloud, research, & ML/AI. I ship full-stack products, optimize performance, and love clean design.",
    ctaPrimary: { label: "Let's Connect!", href: "https://www.linkedin.com/in/hirabdou" },
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
      title: "SparX",
      description:
        "A private, locally-run AI social worker designed to give underserved communities in New York City secure, equitable access to government resources and services. Built at the NVIDIA Spark Hack Series in NYC.",
      tags: ["React.js", "Resend", "Google Cloud", "Vercel"],
      links: {
        github: "https://github.com/Hxrob/sparx",
      },
      image: "/images/sparx.webp",
    },

    {
        title: "One Point Five",
        description:
          "A client-focused real estate website designed to showcase property listings with a sleek, responsive UI.",
        tags: ["React.js", "Resend", "Google Cloud", "Vercel"],
        links: {
          github: "https://github.com/Hxrob/onepointfive",
          demo: "https://onepointfivehotel.com",
        },
        image: "/images/onepointfive.webp",
      },

    {
      title: "HotSpot",
      description:
        "A geolocation-based event discovery and real-time alert app that lets users broadcast, find, and join nearby happenings.",
      tags: ["React.js", "Express", "Firebase", "Google Maps API"],
      links: {
        github: "https://github.com/cis3296f24/01-HotSpot",
      },
      image: "/images/hotspot.webp",
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
      image: "/images/pigletprep.webp",
    },

  ],
  research: {
    title:
      "Associations Between Sleep Duration Across Development and Hippocampal Subfield Volumes at Midlife",
    venue: "Society of Biological Psychiatry (SOBP)",
    type: "Poster Presentation",
    role: "First Author",
    lab: "Ellman Lab · Temple University · Healthy Brains Project",
    summary:
      "A neuroimaging study (n = 91) examining how childhood and midlife sleep patterns relate to hippocampal subfield volumes in adulthood — using FreeSurfer-based volumetric segmentation and partial correlations controlled for intracranial volume.",
    coAuthors: [
      "Stephanie A. Korenic",
      "Ann M. Kring",
      "Raana Mohyee",
      "Ian Ballard",
      "Bhakti Patwardhan",
      "Savannah Cookson",
      "Kathleen J. O'Brien",
      "Blake L. Elliott",
      "Ingrid A. Olson",
      "Barbara A. Cohn",
      "Piera M. Cirillo",
      "Nickilou Y. Krigbaum",
      "Thomas M. Olino",
      "Mark T. D'Esposito",
      "Ashby B. Cogan",
      "Lauren M. Ellman",
    ],
    highlights: [
      { label: "Cohort size", value: "n = 91" },
      { label: "Methods", value: "MRI · FreeSurfer" },
      { label: "Domain", value: "Sleep × Hippocampus" },
    ],
    findings: [
      "Poorer early-life sleep correlated with reduced hippocampal CA3 subfield volumes at midlife.",
      "Poorer midlife sleep was associated with reduced fimbria volumes — controlling for intracranial volume.",
      "Findings suggest differential, lifespan-dependent influences of sleep on hippocampal microstructure.",
    ],
    poster: {
      preview: "/research/poster-preview.jpg",
      pdf: "/research/SOBP_Abdourazak_Korenic_Poster.pdf",
      filename: "Abdourazak_SOBP_Hippocampus_Poster.pdf",
    },
  },
  contact: {
    blurb:
      "Interested in SWE/ML roles or collaborations. I'm open to internships, new-grad roles, and contract work!",
    email: "hirababdourazak@gmail.com",
    location: "Philadelphia, PA",
  },
} as const;
