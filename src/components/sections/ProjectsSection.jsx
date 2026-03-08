import { motion } from "framer-motion";
import { FaArrowRight, FaGithub } from "react-icons/fa";
import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";
import { projects, projectsSectionContent } from "../../data/projects";
import useReducedMotionPreference from "../../hooks/useReducedMotionPreference";
import { createSoftScaleIn, createStaggerContainer } from "../../utils/animation";

const ProjectsSection = () => {
  const prefersReducedMotion = useReducedMotionPreference();

  return (
    <section id="projects" className="content-section grid gap-6">
      <Card className="p-8">
        <SectionHeader
          eyebrow={projectsSectionContent.eyebrow}
          heading={projectsSectionContent.heading}
        />
      </Card>

      <motion.div
        className="grid gap-6 lg:grid-cols-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={createStaggerContainer(prefersReducedMotion)}
      >
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            className="project-card group glass-panel flex h-full flex-col p-6"
            variants={createSoftScaleIn(prefersReducedMotion, index * 0.04)}
            whileHover={prefersReducedMotion ? undefined : { y: -8 }}
          >
            <div className={`project-card-aura bg-gradient-to-br ${project.accent}`} />

            <div className="project-card-header">
              <div>
                <span className="project-card-category">{project.category}</span>
                <h3 className="mt-4 font-display text-2xl font-semibold text-[var(--color-text)]">
                  {project.title}
                </h3>
              </div>
              <span className="project-card-index">0{index + 1}</span>
            </div>

            <motion.div
              className="project-card-preview mt-6"
              whileHover={prefersReducedMotion ? undefined : { scale: 1.015 }}
            >
              <div className="project-card-preview-grid" />
              <div className="project-card-preview-content">
                <span className="project-card-preview-label">Outcome</span>
                <p className="mt-2 text-base font-medium text-[var(--color-text)]">
                  {project.outcome}
                </p>
              </div>
            </motion.div>

            <p className="mt-6 flex-1 text-sm leading-7 text-[var(--color-text-soft)]">
              {project.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="project-tech-pill"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between gap-4">
              <a
                className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-text)] transition hover:text-[var(--color-accent)]"
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub />
                GitHub
              </a>
              <a
                className="project-link"
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
              >
                View Case Study
                <FaArrowRight />
              </a>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
