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
import "./Home.css";

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
  {
    icon: <LayoutTemplate size={23} />,
    title: "Desain Website",
    desc: "Tampilan website yang profesional, konsisten, dan nyaman digunakan.",
  },
  {
    icon: <Code2 size={23} />,
    title: "Pengembangan Web",
    desc: "Website yang dibangun sesuai kebutuhan dan tujuan bisnis kamu.",
  },
  {
    icon: <Smartphone size={23} />,
    title: "Website Responsif",
    desc: "Pengalaman yang tetap nyaman di desktop, tablet, dan smartphone.",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-badge hero-anim" style={{ "--i": 0 }}>
              <span className="status-dot" />
              Partner Digital Kamu
            </div>

            <h1 className="hero-anim" style={{ "--i": 1 }}>
              Kami bangun website
              <br />
              yang mewujudkan
              <br />
              <span className="text-gradient">ide kamu.</span>
            </h1>

            <p className="hero-description hero-anim" style={{ "--i": 2 }}>
              B.Site membantu bisnis dan individu membangun kehadiran digital melalui website yang modern, fungsional, dan responsif.
            </p>

            <div className="hero-actions hero-anim" style={{ "--i": 3 }}>
              <Link to="/contact" className="button button-primary">
                Mulai Project <ArrowUpRight size={18} />
              </Link>
              <Link to="/portfolio" className="button button-secondary">
                Lihat Portofolio <ArrowRight size={17} />
              </Link>
            </div>

            <div className="hero-points hero-anim" style={{ "--i": 4 }}>
              <span>
                <CheckCircle2 size={16} /> Desain responsif
              </span>
              <span>
                <CheckCircle2 size={16} /> Pengembangan modern
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
                <span>websitekamu.site</span>
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
                  <Sparkles size={14} /> PENGALAMAN DIGITAL
                </div>

                <div className="visual-headline">
                  Ambil
                  <br />
                  <span>langkah berikutnya.</span>
                </div>

                <div className="visual-lines">
                  <i />
                  <i />
                </div>

                <div className="visual-cta">
                  Jelajahi <ArrowRight size={13} />
                </div>

                <div className="visual-bottom">
                  <div>
                    <strong>01</strong>
                    <span>Desain</span>
                  </div>
                  <div>
                    <strong>02</strong>
                    <span>Bangun</span>
                  </div>
                  <div>
                    <strong>03</strong>
                    <span>Rilis</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="floating-card floating-card-top">
              <span className="floating-icon">
                <Code2 size={18} />
              </span>
              <div>
                <strong>Kode Bersih</strong>
                <small>Dibuat dengan tujuan</small>
              </div>
            </div>

            <div className="floating-card floating-card-bottom">
              <span className="floating-icon">
                <Smartphone size={18} />
              </span>
              <div>
                <strong>100% Responsif</strong>
                <small>Di semua perangkat</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <Reveal className="container trust-inner">
          <span>IDE</span>
          <i />
          <span>DESAIN</span>
          <i />
          <span>PENGEMBANGAN</span>
          <i />
          <span>RILIS</span>
        </Reveal>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-heading">
            <span className="eyebrow">YANG KAMI KERJAKAN</span>
            <h2>Semua yang kamu butuhkan untuk go digital.</h2>
            <p>Dari ide awal sampai website siap digunakan, kami fokus pada pengalaman yang jelas dan bermanfaat.</p>
          </Reveal>

          <div className="services-grid">
            {services.map((service, index) => (
              <Reveal
                as="article"
                className="service-card"
                key={service.title}
                delay={index * 120}
              >
                <span className="service-icon">{service.icon}</span>
                <span className="service-number">0{index + 1}</span>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <Link to="/about" className="text-link">
                  Selengkapnya <ArrowRight size={16} />
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
              <span className="eyebrow eyebrow-light">PUNYA PROJECT DI KEPALA?</span>
              <h2>Yuk wujudkan ide kamu jadi nyata.</h2>
              <p>Ceritakan kebutuhan website kamu. Kita mulai dari sana.</p>
            </div>
            <Link to="/contact" className="button button-white">
              Hubungi Kami <ArrowUpRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}