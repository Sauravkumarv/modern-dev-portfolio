import { useEffect, useRef } from "react";

const PARTICLE_CONFIG = {
  desktop: { count: 42, linkDistance: 135, speed: 0.26 },
  mobile: { count: 36, linkDistance: 110, speed: 0.24 },
  lowPower: { count: 18, linkDistance: 82, speed: 0.18 },
};

const createParticles = (width, height, config) =>
  Array.from({ length: config.count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * config.speed,
    vy: (Math.random() - 0.5) * config.speed,
    radius: Math.random() * 1.8 + 1,
  }));

const useParticles = ({ enabled = true, theme = "dark" } = {}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || !enabled) {
      return undefined;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return undefined;
    }

    let animationFrameId = 0;
    let particles = [];
    let isDocumentVisible = !document.hidden;
    let lastFrameTime = 0;

    const isLowPowerDevice =
      window.innerWidth < 768 || (navigator.hardwareConcurrency || 4) <= 4;

    const getConfig = () =>
      isLowPowerDevice
        ? PARTICLE_CONFIG.lowPower
        : window.innerWidth < 768
          ? PARTICLE_CONFIG.mobile
          : PARTICLE_CONFIG.desktop;

    const setCanvasSize = () => {
      const parent = canvas.parentElement;
      const width = parent?.clientWidth ?? window.innerWidth;
      const height = parent?.clientHeight ?? window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.25);
      const config = getConfig();

      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = createParticles(width, height, config);
    };

    // Keep the canvas effect lightweight because it runs continuously behind the hero.
    const drawFrame = (timestamp) => {
      if (!isDocumentVisible) {
        animationFrameId = window.requestAnimationFrame(drawFrame);
        return;
      }

      if (timestamp - lastFrameTime < 1000 / 24) {
        animationFrameId = window.requestAnimationFrame(drawFrame);
        return;
      }

      lastFrameTime = timestamp;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const { linkDistance } = getConfig();
      const pointColor =
        theme === "dark" ? "rgba(103, 232, 249, 0.92)" : "rgba(14, 165, 233, 0.78)";
      const glowColor =
        theme === "dark" ? "rgba(34, 211, 238, 0.46)" : "rgba(56, 189, 248, 0.28)";

      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x <= 0 || particle.x >= width) particle.vx *= -1;
        if (particle.y <= 0 || particle.y >= height) particle.vy *= -1;

        context.beginPath();
        context.fillStyle = pointColor;
        context.shadowBlur = theme === "dark" ? 12 : 6;
        context.shadowColor = glowColor;
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      });

      particles.forEach((particle, index) => {
        for (let nextIndex = index + 1; nextIndex < particles.length; nextIndex += 1) {
          const neighbour = particles[nextIndex];
          const distance = Math.hypot(
            particle.x - neighbour.x,
            particle.y - neighbour.y
          );

          if (distance < linkDistance) {
            context.beginPath();
            context.strokeStyle =
              theme === "dark"
                ? `rgba(34, 211, 238, ${1 - distance / linkDistance})`
                : `rgba(14, 165, 233, ${(1 - distance / linkDistance) * 0.6})`;
            context.lineWidth = 0.6;
            context.moveTo(particle.x, particle.y);
            context.lineTo(neighbour.x, neighbour.y);
            context.stroke();
          }
        }
      });

      animationFrameId = window.requestAnimationFrame(drawFrame);
    };

    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden;
    };

    setCanvasSize();
    drawFrame();

    window.addEventListener("resize", setCanvasSize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [enabled, theme]);

  return canvasRef;
};

export default useParticles;
