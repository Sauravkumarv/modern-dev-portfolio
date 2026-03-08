import { motion } from "framer-motion";
import Button from "../ui/Button";
import SectionHeader from "../ui/SectionHeader";
import ParticleCanvas from "./ParticleCanvas";
import { heroContent } from "../../data/home";
import useReducedMotionPreference from "../../hooks/useReducedMotionPreference";
import { createReveal } from "../../utils/animation";

const HeroSection = () => {
  const prefersReducedMotion = useReducedMotionPreference();

  return (
    <section
      id="home"
      className="relative overflow-hidden rounded-[2rem] border border-[var(--color-accent-border)] bg-[var(--color-hero)] px-6 py-10 shadow-glow sm:px-8 lg:px-12 lg:py-14"
    >
      <ParticleCanvas />
      <div className="hero-rings absolute inset-y-0 right-[-10%] hidden aspect-square w-[38rem] lg:block" />
      <div className="hero-glow-line absolute inset-x-0 top-0 h-px" />

      <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="mx-auto flex max-w-4xl flex-col text-center lg:mx-0 lg:text-left">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={createReveal(prefersReducedMotion, 0.05)}
            className="flex flex-wrap items-center justify-center gap-3 lg:justify-start"
          >
            <SectionHeader eyebrow={heroContent.eyebrow} />
            <span className="hero-status-pill">{heroContent.availability}</span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={createReveal(prefersReducedMotion, 0.12)}
            className="mt-5 font-display text-4xl font-bold leading-[0.95] text-[var(--color-text)] sm:text-5xl lg:text-7xl"
          >
            {heroContent.name}
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={createReveal(prefersReducedMotion, 0.18)}
            className="mt-6 text-lg font-medium text-[var(--color-accent-soft)] sm:text-2xl"
          >
            {heroContent.title}
          </motion.p>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={createReveal(prefersReducedMotion, 0.24)}
            className="mt-6 max-w-2xl text-base leading-7 text-[var(--color-text-soft)] sm:text-lg"
          >
            {heroContent.description}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={createReveal(prefersReducedMotion, 0.28)}
            className="mt-6 flex flex-wrap justify-center gap-3 lg:justify-start"
          >
            {heroContent.chips.map((chip) => (
              <span key={chip} className="hero-chip">
                {chip}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={createReveal(prefersReducedMotion, 0.3)}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <Button href={heroContent.primaryAction.href}>
              {heroContent.primaryAction.label}
            </Button>
            <Button href={heroContent.secondaryAction.href} variant="secondary">
              {heroContent.secondaryAction.label}
            </Button>
          </motion.div>
        </div>

        <motion.aside
          initial="hidden"
          animate="visible"
          variants={createReveal(prefersReducedMotion, 0.34)}
          className="hero-spotlight-card mx-auto w-full max-w-md lg:mx-0"
        >
          <div className="hero-spotlight-inner">
            <div className="hero-spotlight-head">
              <span className="section-eyebrow">{heroContent.spotlightLabel}</span>
              <p className="hero-spotlight-title mt-3 text-2xl font-semibold leading-tight">
                {heroContent.spotlightValue}
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {heroContent.stats.map((stat) => (
                <div key={stat.label} className="hero-stat-card">
                  <div className="hero-stat-value text-2xl font-bold">{stat.value}</div>
                  <div className="hero-stat-label mt-1 text-xs uppercase tracking-[0.18em]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="hero-terminal mt-8">
              <div className="hero-terminal-bar">
                <span />
                <span />
                <span />
              </div>
              <div className="hero-terminal-copy space-y-3 text-sm">
                <p>
                  <span className="text-[var(--color-accent)]">$</span> building interfaces that
                  feel fast, clear, and memorable
                </p>
                <p>
                  <span className="text-[var(--color-accent)]">$</span> merging product thinking
                  with scalable frontend architecture
                </p>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>

      <motion.a
        href="#about"
        initial="hidden"
        animate="visible"
        variants={createReveal(prefersReducedMotion, 0.4)}
        className="hero-scroll-cue"
      >
        <span className="hero-scroll-dot" />
        Scroll to explore
      </motion.a>
    </section>
  );
};

export default HeroSection;
