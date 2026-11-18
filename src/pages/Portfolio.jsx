import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { projects } from "../data/projects";
import PortfolioPreview from "../components/PortfolioPreview";
import "./Portfolio.css";

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
  return (
    <>
      <section className="page-hero page-hero-compact pf-hero">
        <div className="container page-hero-inner">
          <span className="eyebrow pf-anim" style={{ "--i": 0 }}>
            PORTOFOLIO KAMI
          </span>
          <h1 className="pf-anim" style={{ "--i": 1 }}>
            Karya yang mewujudkan
            <br />
            <span className="text-gradient">ide jadi nyata.</span>
          </h1>
          <p className="pf-anim" style={{ "--i": 2 }}>
            Lihat preview website langsung dan buka versi aslinya untuk menjelajahi website secara lengkap.
          </p>
        </div>
      </section>

      <section className="section portfolio-page">
        <div className="container">
          <div className="portfolio-note pf-note pf-anim" style={{ "--i": 3 }}>
            <span className="note-dot" />
            <p>Beberapa website membatasi tampilan melalui iframe. Gunakan tombol "Buka Website" jika preview tidak tersedia.</p>
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
              <h2>Punya project yang ingin dibuat?</h2>
              <p>Website berikutnya bisa menjadi karya yang kita bangun bersama.</p>
            </div>
            <Link to="/contact" className="button button-primary">
              Mulai Project <ArrowUpRight size={18} />
            </Link>
          </Reveal>

        </div>
      </section>
    </>
  );
}