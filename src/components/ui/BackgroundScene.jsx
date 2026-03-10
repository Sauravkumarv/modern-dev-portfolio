import useReducedMotionPreference from "../../hooks/useReducedMotionPreference";

const BackgroundScene = () => {
  const prefersReducedMotion = useReducedMotionPreference();

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="scene-grid" />
      {!prefersReducedMotion ? <div className="scene-noise" /> : null}
      <div className="scene-orb scene-orb-left" />
      <div className="scene-orb scene-orb-right" />
    </div>
  );
};

export default BackgroundScene;
