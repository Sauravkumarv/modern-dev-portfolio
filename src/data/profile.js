export const profile = {
  name: "Saurav Kumar Verma",
  title: "Full Stack Developer | AI/ML Engineer",
  email: "sauravkumarv22@gmail.com",
  phone: "+91 74286 21418",
  linkedin: "https://www.linkedin.com/in/saurav-kumar-verma-6014a722b/",
  github: "https://github.com/Sauravkumarv",
  whatsapp: "https://wa.me/917428621418",
  resumeUrl: `${import.meta.env.BASE_URL}Saurav_Kumar_Verma_Resume.pdf`,
  resumeDownloadName: "Saurav_Kumar_Verma_Resume.pdf",
};

export const socialLinks = [
  { label: "GitHub", href: profile.github, icon: "github" },
  { label: "LinkedIn", href: profile.linkedin, icon: "linkedin" },
  { label: "Email", href: `mailto:${profile.email}`, icon: "email" },
];
