import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Target,
  Lightbulb,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import "./About.css";

/* Muncul halus saat elemen masuk layar */
function Reveal({
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className = "",
  children,
  ...rest
}) {
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
      className={`ab-reveal ab-reveal-${variant} ${
        shown ? "is-visible" : ""
      } ${className}`}
      style={{ "--d": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

const values = [
  { icon: <Target size={22} />, key: "about.value1" },
  { icon: <Lightbulb size={22} />, key: "about.value2" },
  { icon: <ShieldCheck size={22} />, key: "about.value3" },
  { icon: <Workflow size={22} />, key: "about.value4" },
];

export default function About() {
  const { t } = useLanguage();

  return (
    <>
      <section className="page-hero ab-hero">
        <div className="container page-hero-inner">
          <span className="eyebrow ab-anim" style={{ "--i": 0 }}>
            {t("about.eyebrow")}
          </span>
          <h1 className="ab-anim" style={{ "--i": 1 }}>
            {t("about.h1a")}
            <br />
            <span className="text-gradient">{t("about.h1b")}</span>
          </h1>
          <p className="ab-anim" style={{ "--i": 2 }}>
            {t("about.hero.desc")}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <Reveal variant="left" className="about-art">
            <div className="about-art-main">
              <span className="about-art-logo">B.</span>
              <span className="eyebrow eyebrow-light">
                {t("about.art.eyebrow")}
              </span>
              <h2>{t("about.art.title")}</h2>
              <div className="about-art-line" />
              <span className="about-art-caption">
                {t("about.art.caption")}
              </span>
            </div>
            <div className="about-art-badge">
              <Lightbulb size={24} />
              <span>
                {t("about.badge1")}
                <br />
                {t("about.badge2")}
              </span>
            </div>
          </Reveal>

          <Reveal variant="right" delay={120} className="about-copy">
            <span className="eyebrow">{t("about.who.eyebrow")}</span>
            <h2>{t("about.who.title")}</h2>
            <p>{t("about.who.p1")}</p>
            <p>{t("about.who.p2")}</p>
            <p>{t("about.who.p3")}</p>
            <Link to="/contact" className="button button-primary">
              {t("about.who.button")} <ArrowUpRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <Reveal className="section-heading">
            <span className="eyebrow">{t("about.principles.eyebrow")}</span>
            <h2>{t("about.principles.title")}</h2>
            <p>{t("about.principles.desc")}</p>
          </Reveal>

          <div className="values-grid">
            {values.map((value, index) => (
              <Reveal
                as="article"
                className="value-card"
                key={value.key}
                delay={index * 110}
              >
                <span className="service-icon">{value.icon}</span>
                <span className="service-number">0{index + 1}</span>
                <h3>{t(`${value.key}.title`)}</h3>
                <p>{t(`${value.key}.text`)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}