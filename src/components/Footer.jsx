import { Link } from "react-router-dom";
import { ArrowUpRight, Instagram, MessageCircle } from "lucide-react";

const whatsapp = "https://wa.me/628872235587";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Link to="/" className="brand">
            <img
  src="/favicon.png"
  alt="B.Site Logo"
  className="brand-logo"
/>

<span className="brand-name">
  B.Site
  <small>Digital Solutions</small>
</span>
          </Link>
          <p>
            We turn ideas into digital experiences through thoughtful
            design and reliable web development.
          </p>
        </div>

        <div className="footer-column">
          <h3>Explore</h3>
          <Link to="/about">About Us</Link>
          <Link to="/portfolio">Portfolio</Link>
          <Link to="/pricing">Pricelist</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className="footer-column">
          <h3>Get in touch</h3>
          <a href={whatsapp} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={16} /> WhatsApp
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram size={16} /> Instagram
          </a>
          <Link to="/contact">
            Start a project <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} B.Site. All rights reserved.</span>
        <span>Designed with purpose. Built for growth.</span>
      </div>
    </footer>
  );
}
