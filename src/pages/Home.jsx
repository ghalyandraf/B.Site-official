import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Code2,
  LayoutTemplate,
  Smartphone,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import "./Home.css";

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
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "is-visible" : ""} ${className}`}
      style={{ "--d": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

const services = [
  { icon: <LayoutTemplate size={23} />, key: "home.service1" },
  { icon: <Code2 size={23} />, key: "home.service2" },
  { icon: <Smartphone size={23} />, key: "home.service3" },
];

export default function Home() {
  const { t } = useLanguage();

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-badge hero-anim" style={{ "--i": 0 }}>
              <span className="status-dot" />
              {t("home.badge")}
            </div>

            <h1 className="hero-anim" style={{ "--i": 1 }}>
              {t("home.h1a")}
              <br />
              {t("home.h1b")}
              <br />
              <span className="text-gradient">{t("home.h1c")}</span>
            </h1>

            <p className="hero-description hero-anim" style={{ "--i": 2 }}>
              {t("home.desc")}
            </p>

            <div className="hero-actions hero-anim" style={{ "--i": 3 }}>
              <Link to="/contact" className="button button-primary">
                {t("home.startProject")} <ArrowUpRight size={18} />
              </Link>
              <Link to="/portfolio" className="button button-secondary">
                {t("home.viewPortfolio")} <ArrowRight size={17} />
              </Link>
            </div>

            <div className="hero-points hero-anim" style={{ "--i": 4 }}>
              <span>
                <CheckCircle2 size={16} /> {t("home.point1")}
              </span>
              <span>
                <CheckCircle2 size={16} /> {t("home.point2")}
              </span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="visual-glow" />
            <div className="visual-card">
              <div className="visual-topbar">
                <div className="browser-dots">
                  <span />
                  <span />
                  <span />
                </div>
                <span>{t("home.visual.url")}</span>
              </div>

              <div className="visual-content">
                <div className="visual-mini-nav">
                  <span className="visual-logo">B.</span>
                  <div>
                    <i />
                    <i />
                    <i />
                  </div>
                </div>

                <div className="visual-label">
                  <Sparkles size={14} /> {t("home.visual.label")}
                </div>

                <div className="visual-headline">
                  {t("home.visual.h1")}
                  <br />
                  <span>{t("home.visual.h2")}</span>
                </div>

                <div className="visual-lines">
                  <i />
                  <i />
                </div>

                <div className="visual-cta">
                  {t("home.visual.cta")} <ArrowRight size={13} />
                </div>

                <div className="visual-bottom">
                  <div>
                    <strong>01</strong>
                    <span>{t("home.visual.step1")}</span>
                  </div>
                  <div>
                    <strong>02</strong>
                    <span>{t("home.visual.step2")}</span>
                  </div>
                  <div>
                    <strong>03</strong>
                    <span>{t("home.visual.step3")}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="floating-card floating-card-top">
              <span className="floating-icon">
                <Code2 size={18} />
              </span>
              <div>
                <strong>{t("home.float1.title")}</strong>
                <small>{t("home.float1.sub")}</small>
              </div>
            </div>

            <div className="floating-card floating-card-bottom">
              <span className="floating-icon">
                <Smartphone size={18} />
              </span>
              <div>
                <strong>{t("home.float2.title")}</strong>
                <small>{t("home.float2.sub")}</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <Reveal className="container trust-inner">
          <span>{t("home.strip1")}</span>
          <i />
          <span>{t("home.strip2")}</span>
          <i />
          <span>{t("home.strip3")}</span>
          <i />
          <span>{t("home.strip4")}</span>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-heading">
            <span className="eyebrow">{t("home.services.eyebrow")}</span>
            <h2>{t("home.services.title")}</h2>
            <p>{t("home.services.desc")}</p>
          </Reveal>

          <div className="services-grid">
            {services.map((service, index) => (
              <Reveal
                as="article"
                className="service-card"
                key={service.key}
                delay={index * 120}
              >
                <span className="service-icon">{service.icon}</span>
                <span className="service-number">0{index + 1}</span>
                <h3>{t(`${service.key}.title`)}</h3>
                <p>{t(`${service.key}.desc`)}</p>
                <Link to="/about" className="text-link">
                  {t("home.learnMore")} <ArrowRight size={16} />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="home-cta-section">
        <div className="container">
          <Reveal className="home-cta">
            <div>
              <span className="eyebrow eyebrow-light">
                {t("home.cta.eyebrow")}
              </span>
              <h2>{t("home.cta.title")}</h2>
              <p>{t("home.cta.desc")}</p>
            </div>
            <Link to="/contact" className="button button-white">
              {t("home.cta.button")} <ArrowUpRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}