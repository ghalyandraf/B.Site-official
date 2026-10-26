import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";
import PortfolioPreview from "../components/PortfolioPreview";
import { useLanguage } from "../context/LanguageContext";
import "./Portfolio.css";

/* Muncul halus saat elemen masuk layar */
function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`pf-reveal ${shown ? "is-visible" : ""} ${className}`}
      style={{ "--d": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default function Portfolio() {
  const { t } = useLanguage();

  return (
    <>
      <section className="page-hero page-hero-compact pf-hero">
        <div className="container page-hero-inner">
          <span className="eyebrow pf-anim" style={{ "--i": 0 }}>
            {t("portfolio.eyebrow")}
          </span>
          <h1 className="pf-anim" style={{ "--i": 1 }}>
            {t("portfolio.h1a")}
            <br />
            <span className="text-gradient">{t("portfolio.h1b")}</span>
          </h1>
          <p className="pf-anim" style={{ "--i": 2 }}>
            {t("portfolio.hero.desc")}
          </p>
        </div>
      </section>

      <section className="section portfolio-page">
        <div className="container">
          <div className="portfolio-note pf-note pf-anim" style={{ "--i": 3 }}>
            <span className="note-dot" />
            <p>{t("portfolio.note")}</p>
          </div>

          <div className="portfolio-grid">
            {projects.map((project, index) => (
              <Reveal
                key={project.id}
                className="pf-item"
                delay={(index % 2) * 130}
              >
                <PortfolioPreview project={project} />
              </Reveal>
            ))}
          </div>

          <Reveal className="portfolio-bottom-cta pf-cta">
            <div>
              <h2>{t("portfolio.cta.title")}</h2>
              <p>{t("portfolio.cta.desc")}</p>
            </div>
            <Link to="/contact" className="button button-primary">
              {t("portfolio.cta.button")} <ArrowUpRight size={18} />
            </Link>
          </Reveal>

          <Reveal as="p" className="portfolio-disclaimer" delay={100}>
            {t("portfolio.disclaimer")}
          </Reveal>
        </div>
      </section>
    </>
  );
}