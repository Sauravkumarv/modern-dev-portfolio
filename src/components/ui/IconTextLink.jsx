import { iconMap } from "../../utils/iconMap";

const IconTextLink = ({ href, icon, label, external = false, className = "" }) => {
  const Icon = iconMap[icon];

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`flex items-center justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-5 py-4 transition hover:border-[var(--color-accent)] hover:bg-[var(--color-surface-hover)] ${className}`.trim()}
    >
      <span className="flex items-center gap-3 text-sm font-medium text-[var(--color-text)]">
        {Icon ? <Icon className="text-[var(--color-accent)]" /> : null}
        {label}
      </span>
      <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-muted)]">
        Open
      </span>
    </a>
  );
};

export default IconTextLink;
