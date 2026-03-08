import { useState } from "react";
import { motion } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import ThemeToggle from "../ui/ThemeToggle";
import SocialLinks from "../ui/SocialLinks";
import { navigationItems, siteMeta } from "../../data/site";
import { socialLinks } from "../../data/profile";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 sm:px-6 lg:px-8">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between rounded-full border border-[var(--color-border)] bg-[var(--color-nav)] px-5 py-3 backdrop-blur-xl">
        <a href="#home" className="font-display text-lg font-bold tracking-wide text-[var(--color-text)]">
          {siteMeta.brand}
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navigationItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="nav-link nav-link-font text-sm font-medium text-[var(--color-text-soft)]"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <SocialLinks links={socialLinks} />
          <ThemeToggle />
        </div>

        <button
          type="button"
          className="text-2xl text-[var(--color-text)] md:hidden"
          onClick={() => setIsOpen((current) => !current)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </nav>

      {isOpen ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="mx-auto mt-3 w-full max-w-7xl rounded-3xl border border-[var(--color-border)] bg-[var(--color-nav-strong)] p-5 backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-4">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link nav-link-font text-sm font-medium text-[var(--color-text-soft)]"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mt-2 flex items-center justify-between gap-4">
              <SocialLinks links={socialLinks} />
              <ThemeToggle />
            </div>
          </div>
        </motion.div>
      ) : null}
    </header>
  );
};

export default Navbar;
