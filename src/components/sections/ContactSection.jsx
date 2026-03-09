import Button from "../ui/Button";
import Card from "../ui/Card";
import IconTextLink from "../ui/IconTextLink";
import SectionHeader from "../ui/SectionHeader";
import { contactSectionContent } from "../../data/contact";
import { profile } from "../../data/profile";
import { iconMap } from "../../utils/iconMap";

const ContactSection = () => {
  const ResumeIcon = iconMap[contactSectionContent.resume.icon];

  return (
    <section id="contact" className="content-section grid gap-6 md:grid-cols-[1fr,0.9fr]">
      <Card className="p-6 sm:p-8">
        <SectionHeader
          eyebrow={contactSectionContent.eyebrow}
          heading={contactSectionContent.heading}
          description={contactSectionContent.description}
        />
      </Card>

      <Card className="contact-card p-6 sm:p-8">
        <div className="contact-links space-y-4">
          {contactSectionContent.links.map((link) => (
            <IconTextLink
              key={link.href}
              href={link.href}
              icon={link.icon}
              label={link.label}
              external={link.href.startsWith("http")}
            />
          ))}
        </div>

        <Button
          href={contactSectionContent.resume.href}
          download={profile.resumeDownloadName}
          className="contact-resume-button mt-6 inline-flex"
        >
          {ResumeIcon ? <ResumeIcon /> : null}
          {contactSectionContent.resume.label}
        </Button>
      </Card>
    </section>
  );
};

export default ContactSection;
