import { profile } from "./profile";

export const heroContent = {
  eyebrow: "Developer Portfolio",
  name: profile.name,
  title: profile.title,
  description:
    "I build full stack products that balance sharp frontend systems, reliable backend architecture, and practical AI workflows that are ready for real users.",
  primaryAction: { label: "View My Work", href: "#projects" },
  secondaryAction: { label: "Contact Me", href: "#contact" },
  availability: "Open to full-time roles and high-impact freelance work",
  spotlightLabel: "Now building",
  spotlightValue: "AI-first products with polished frontend systems",
  stats: [
    { value: "3+", label: "Flagship products" },
    { value: "Frontend-led", label: "System thinking" },
    { value: "AI + Product", label: "Execution edge" },
  ],
  chips: ["React Architecture", "System Design", "Applied AI", "Scalable APIs"],
};

export const aboutContent = {
  eyebrow: "About",
  heading: "Building products with code and models.",
  description:
    "I am a full stack developer and AI/ML engineer focused on product-grade interfaces, dependable services, and machine learning that solves actual workflow problems. I care about maintainable architecture, developer clarity, and shipping systems that scale without becoming hard to change.",
  highlightsTitle: "Approach",
  highlights: [
    "Reusable components with clear responsibilities and low coupling.",
    "Data-driven sections so content updates do not require UI rewrites.",
    "Performance-minded motion that stays lightweight on weaker devices.",
    "Responsive layouts that feel intentional on desktop and mobile.",
  ],
};
