import { iconMap } from "../../utils/iconMap";

const SocialLinks = ({ links, className = "" }) => {
  return (
    <div className={`flex items-center gap-4 ${className}`.trim()}>
      {links.map((link) => {
        const Icon = iconMap[link.icon];
        const isExternal = link.href.startsWith("http");

        return (
          <a
            key={link.href}
            className="nav-icon-link"
            href={link.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noreferrer" : undefined}
            aria-label={link.label}
          >
            {Icon ? <Icon /> : null}
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
