import { Suspense, lazy } from "react";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import BackgroundScene from "../../components/ui/BackgroundScene";
import SectionLoader from "../../components/ui/SectionLoader";

const HeroSection = lazy(() => import("../../components/sections/HeroSection"));
const AboutSection = lazy(() => import("../../components/sections/AboutSection"));
const SkillsSection = lazy(() => import("../../components/sections/SkillsSection"));
const ProjectsSection = lazy(() => import("../../components/sections/ProjectsSection"));
const FeedbackSection = lazy(() => import("../../components/sections/FeedbackSection"));
const ContactSection = lazy(() => import("../../components/sections/ContactSection"));

const HomePage = () => {
  return (
    <div className="app-shell relative min-h-screen overflow-x-hidden bg-[var(--color-bg)] text-[var(--color-text)]">
      <BackgroundScene />
      <Navbar />
      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 pb-8 pt-24 sm:px-6 lg:px-8">
        <Suspense fallback={<SectionLoader />}>
          <HeroSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <SkillsSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ProjectsSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <FeedbackSection />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
