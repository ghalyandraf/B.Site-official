import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import "./Navbar.css";

const links = [
  { to: "/", label: "Beranda", end: true },
  { to: "/about", label: "Tentang" },
  { to: "/portfolio", label: "Portofolio" },
  { to: "/pricing", label: "Daftar Harga" },
  { to: "/contact", label: "Kontak" },
];

const navText = {
  mainNav: "Navigasi utama",
  tagline: "Solusi Digital",
  cta: "Hubungi Kami",
  openMenu: "Buka menu",
  closeMenu: "Tutup menu",
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!open) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 961px)");
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <header className={`nb-header ${scrolled ? "is-scrolled" : ""}`}>
      <nav className="nb-inner" aria-label={navText.mainNav}>
        <Link to="/" className="nb-brand" onClick={closeMenu}>
          <img src="/favicon.png" alt="B.Site Logo" className="nb-logo" />
          <span className="nb-brand-text">
            <span className="nb-brand-name">B.Site</span>
            <small className="nb-brand-tag">{navText.tagline}</small>
          </span>
        </Link>

        <div id="nb-menu" className={`nb-menu ${open ? "is-open" : ""}`}>
          <div className="nb-links">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `nb-link ${isActive ? "is-active" : ""}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="nb-actions">
            <Link to="/contact" className="nb-cta" onClick={closeMenu}>
              {navText.cta} <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>

        <button
          type="button"
          className="nb-toggle"
          aria-label={open ? navText.closeMenu : navText.openMenu}
          aria-expanded={open}
          aria-controls="nb-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div
        className={`nb-overlay ${open ? "is-open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
    </header>
  );
}