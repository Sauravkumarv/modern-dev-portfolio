export const projectsSectionContent = {
  eyebrow: "Projects",
  heading: "Selected work across frontend systems, full stack products, and applied AI.",
};

export const projects = [
  {
    title: "Real-time Language Exchange Platform",
    category: "Realtime Product",
    accent: "from-cyan-400/35 via-sky-400/15 to-transparent",
    outcome: "Interactive matching and conversation system",
    description:
      "A conversation-first platform that matches learners instantly, streams messages in real time, and guides progress with adaptive recommendations and a focused UX.",
    techStack: ["React", "Node.js", "Socket.IO", "MongoDB", "TailwindCSS"],
    githubUrl: "https://github.com/yourusername/language-exchange-platform",
    liveUrl: "https://language-exchange-demo.vercel.app",
  },
  {
    title: "Loan Approval ML System",
    category: "ML Platform",
    accent: "from-sky-500/30 via-cyan-300/10 to-transparent",
    outcome: "Explainable predictions with deployable workflow",
    description:
      "An explainable ML workflow that predicts eligibility, surfaces feature importance clearly, and exposes the model through a production-ready dashboard.",
    techStack: ["Python", "Scikit-learn", "FastAPI", "React", "PostgreSQL"],
    githubUrl: "https://github.com/yourusername/loan-approval-ml-system",
    liveUrl: "https://loan-approval-ml-demo.vercel.app",
  },
  {
    title: "Rapido Clone",
    category: "Mobility UI",
    accent: "from-blue-500/30 via-cyan-400/10 to-transparent",
    outcome: "Mobile-first booking flow and live status UX",
    description:
      "A ride-booking interface with live status tracking, driver availability flows, booking history, and a mobile-first location-driven experience.",
    techStack: ["React", "Node.js", "Express", "MongoDB", "Framer Motion"],
    githubUrl: "https://github.com/yourusername/rapido-clone",
    liveUrl: "https://rapido-clone-demo.vercel.app",
  },
];
