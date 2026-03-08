export const createReveal = (reducedMotion, delay = 0) => ({
  hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: reducedMotion ? 0.2 : 0.55,
      delay,
      ease: "easeOut",
    },
  },
});

export const createStaggerContainer = (reducedMotion, delayChildren = 0) => ({
  hidden: {},
  visible: {
    transition: reducedMotion
      ? undefined
      : {
          staggerChildren: 0.08,
          delayChildren,
        },
  },
});

export const createSoftScaleIn = (reducedMotion, delay = 0) => ({
  hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97, y: 18 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: reducedMotion ? 0.2 : 0.45,
      delay,
      ease: "easeOut",
    },
  },
});
