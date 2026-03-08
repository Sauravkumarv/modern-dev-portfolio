import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";
import { aboutContent } from "../../data/home";

const AboutSection = () => {
  return (
    <section id="about" className="content-section grid gap-6 md:grid-cols-[1.1fr,0.9fr]">
      <Card className="p-8">
        <SectionHeader
          eyebrow={aboutContent.eyebrow}
          heading={aboutContent.heading}
          description={aboutContent.description}
        />
      </Card>

      <Card className="p-8">
        <SectionHeader eyebrow={aboutContent.highlightsTitle} />
        <ul className="mt-4 space-y-4 text-sm text-[var(--color-text-soft)]">
          {aboutContent.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default AboutSection;
