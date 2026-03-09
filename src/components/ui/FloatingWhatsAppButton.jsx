import { FaWhatsapp } from "react-icons/fa";
import { profile } from "../../data/profile";

const FloatingWhatsAppButton = () => {
  return (
    <a
      href={profile.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact on WhatsApp"
      className="floating-whatsapp"
    >
      <span className="floating-whatsapp-badge">Quick Hire Chat</span>
      <span className="floating-whatsapp-icon">
        <FaWhatsapp />
      </span>
    </a>
  );
};

export default FloatingWhatsAppButton;
