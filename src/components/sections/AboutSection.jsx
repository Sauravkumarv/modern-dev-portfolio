import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";
import { aboutContent } from "../../data/home";

const AboutSection = () => {
  return (
    <section id="about" className="content-section grid gap-6 md:grid-cols-[1.1fr,0.9fr]">
      <Card className="p-6 sm:p-8">
        <SectionHeader
          eyebrow={aboutContent.eyebrow}
          heading={aboutContent.heading}
          description={aboutContent.description}
        />
      </Card>

      <Card className="about-highlights-card p-6 sm:p-8">
        <SectionHeader eyebrow={aboutContent.highlightsTitle} />
        <ul className="about-highlights-list mt-6">
          {aboutContent.highlights.map((highlight) => (
            <li key={highlight} className="about-highlight-item">
              <span className="about-highlight-dot" aria-hidden="true" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </Card>
    </section>
  );
};

export default AboutSection;
