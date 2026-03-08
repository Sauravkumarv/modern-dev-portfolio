import { motion } from "framer-motion";
import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";
import { skillCategories, skillsSectionContent } from "../../data/skills";
import { iconMap } from "../../utils/iconMap";
import useReducedMotionPreference from "../../hooks/useReducedMotionPreference";
import { createSoftScaleIn, createStaggerContainer } from "../../utils/animation";

const SkillsSection = () => {
  const prefersReducedMotion = useReducedMotionPreference();

  return (
    <section id="skills" className="content-section grid gap-6">
      <Card className="p-8">
        <SectionHeader
          eyebrow={skillsSectionContent.eyebrow}
          heading={skillsSectionContent.heading}
        />
      </Card>

      <motion.div
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={createStaggerContainer(prefersReducedMotion)}
      >
        {skillCategories.map((category, categoryIndex) => (
          <motion.article
            key={category.title}
            className="skill-card glass-panel p-6"
            variants={createSoftScaleIn(prefersReducedMotion, categoryIndex * 0.03)}
            whileHover={prefersReducedMotion ? undefined : { y: -6 }}
          >
            <h3 className="font-display text-2xl font-semibold text-[var(--color-text)]">
              {category.title}
            </h3>
            <div className="mt-6 space-y-4">
              {category.items.map((item) => {
                const Icon = iconMap[item.icon];

                return (
                  <motion.div
                    key={item.name}
                    className="skill-item flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-3"
                    whileHover={prefersReducedMotion ? undefined : { x: 4 }}
                  >
                    <span className="skill-item-icon text-2xl text-[var(--color-accent)]">
                      {Icon ? <Icon /> : null}
                    </span>
                    <span className="text-sm font-medium text-[var(--color-text-soft)]">
                      {item.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
};

export default SkillsSection;
