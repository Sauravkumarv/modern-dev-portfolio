import { siteMeta } from "../../data/site";

const Footer = () => {
  return (
    <footer className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="footer-shell mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 rounded-3xl border border-[var(--color-border)] bg-[var(--color-nav)] px-6 py-5 text-center text-sm text-[var(--color-text-muted)] backdrop-blur-xl md:flex-row">
        <p>{siteMeta.footerText}</p>
        <p>{siteMeta.copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;
