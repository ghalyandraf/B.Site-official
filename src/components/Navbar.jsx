import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, ArrowUpRight, Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import "./Navbar.css";

const links = [
  { to: "/", key: "nav.home", end: true },
  { to: "/about", key: "nav.about" },
  { to: "/portfolio", key: "nav.portfolio" },
  { to: "/pricing", key: "nav.pricing" },
  { to: "/contact", key: "nav.contact" },
];

function LanguageSwitch() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="nb-lang" role="group" aria-label={t("nav.language")}>
      <Globe size={16} className="nb-lang-icon" aria-hidden="true" />
      <button
        type="button"
        className={`nb-lang-btn ${lang === "id" ? "is-active" : ""}`}
        onClick={() => setLang("id")}
        aria-pressed={lang === "id"}
      >
        ID
      </button>
      <button
        type="button"
        className={`nb-lang-btn ${lang === "en" ? "is-active" : ""}`}
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();

  const closeMenu = () => setOpen(false);

  // Efek header saat scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tutup menu saat pindah halaman
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Kunci scroll body + tutup dengan tombol Escape saat menu mobile terbuka
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

  // Reset menu kalau layar dibesarkan ke desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 961px)");
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      <header className={`nb-header ${scrolled ? "is-scrolled" : ""}`}>
        <nav className="nb-inner" aria-label={t("nav.mainNav")}>
          <Link to="/" className="nb-brand" onClick={closeMenu}>
            <img src="/favicon.png" alt="B.Site Logo" className="nb-logo" />
            <span className="nb-brand-text">
              <span className="nb-brand-name">B.Site</span>
              <small className="nb-brand-tag">{t("nav.tagline")}</small>
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
                  {t(link.key)}
                </NavLink>
              ))}
            </div>

            <div className="nb-actions">
              <LanguageSwitch />
              <Link to="/contact" className="nb-cta" onClick={closeMenu}>
                {t("nav.cta")} <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>

          <button
            type="button"
            className="nb-toggle"
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={open}
            aria-controls="nb-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      <div
        className={`nb-overlay ${open ? "is-open" : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
    </>
  );
}