import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import BackgroundScene from "../../components/ui/BackgroundScene";
import FloatingWhatsAppButton from "../../components/ui/FloatingWhatsAppButton";
import HeroSection from "../../components/sections/HeroSection";
import AboutSection from "../../components/sections/AboutSection";
import SkillsSection from "../../components/sections/SkillsSection";
import ProjectsSection from "../../components/sections/ProjectsSection";
import FeedbackSection from "../../components/sections/FeedbackSection";
import ContactSection from "../../components/sections/ContactSection";

const HomePage = () => {
  return (
    <div className="app-shell relative min-h-screen overflow-x-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
      <BackgroundScene />
      <Navbar />
      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-8 pt-24 sm:px-6 lg:px-8">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <FeedbackSection />
        <ContactSection />
      </main>
      <FloatingWhatsAppButton />
      <Footer />
    </div>
  );
};

export default HomePage;
