import useParticles from "../../hooks/useParticles";
import useTheme from "../../hooks/useTheme";
import useReducedMotionPreference from "../../hooks/useReducedMotionPreference";

const ParticleCanvas = () => {
  const { theme } = useTheme();
  const prefersReducedMotion = useReducedMotionPreference();
  const isDesktop =
    typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : true;
  const canvasRef = useParticles({
    enabled: !prefersReducedMotion && theme === "dark" && isDesktop,
    theme,
  });

  return (
    <div className="absolute inset-0 overflow-hidden rounded-[2rem]">
      <canvas ref={canvasRef} className="h-full w-full opacity-75" />
      <div className="hero-overlay absolute inset-0" />
    </div>
  );
};

export default ParticleCanvas;
