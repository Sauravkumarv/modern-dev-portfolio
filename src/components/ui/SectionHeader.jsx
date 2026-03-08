const SectionHeader = ({ eyebrow, heading, description, className = "" }) => {
  return (
    <div className={className}>
      {eyebrow ? <span className="section-eyebrow">{eyebrow}</span> : null}
      {heading ? <h2 className="section-heading">{heading}</h2> : null}
      {description ? (
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-text-soft)]">
          {description}
        </p>
      ) : null}
    </div>
  );
};

export default SectionHeader;
