import { profile } from "./profile";

export const contactSectionContent = {
  eyebrow: "Contact",
  heading: "Let’s build something sharp, useful, and production-ready.",
  description:
    "I enjoy working on ambitious interfaces, AI-backed products, and systems that need strong frontend architecture. Reach out for product builds, freelance work, or engineering collaboration.",
  links: [
    { label: profile.email, href: `mailto:${profile.email}`, icon: "email" },
    { label: "LinkedIn", href: profile.linkedin, icon: "linkedin" },
    { label: "GitHub", href: profile.github, icon: "github" },
  ],
  resume: {
    label: "Download Resume",
    href: profile.resumeUrl,
    icon: "download",
  },
};
