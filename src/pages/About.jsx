import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Target,
  Lightbulb,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import "./About.css";

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
  {
    icon: <Target size={22} />,
    title: "Berorientasi tujuan",
    text: "Setiap website dibuat dengan tujuan yang jelas dan kebutuhan pengguna sebagai fokus.",
  },
  {
    icon: <Lightbulb size={22} />,
    title: "Desain yang matang",
    text: "Tampilan yang rapi, konsisten, dan membantu pengunjung memahami informasi.",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Pengerjaan andal",
    text: "Kami mengutamakan komunikasi yang jelas dan proses pengerjaan yang terarah.",
  },
  {
    icon: <Workflow size={22} />,
    title: "Siap berkembang",
    text: "Struktur website dirancang agar dapat dikembangkan sesuai kebutuhan berikutnya.",
  },
];

export default function About() {
  return (
    <>
      <section className="page-hero ab-hero">
        <div className="container page-hero-inner">
          <span className="eyebrow ab-anim" style={{ "--i": 0 }}>
            TENTANG B.SITE
          </span>
          <h1 className="ab-anim" style={{ "--i": 1 }}>
            Solusi digital,
            <br />
            <span className="text-gradient">dibuat dengan tujuan.</span>
          </h1>
          <p className="ab-anim" style={{ "--i": 2 }}>
            Kami percaya website yang baik bukan hanya soal tampilan, tetapi juga bagaimana website membantu mencapai tujuan.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <Reveal variant="left" className="about-art">
            <div className="about-art-main">
              <span className="about-art-logo">B.</span>
              <span className="eyebrow eyebrow-light">BANGUN YANG LEBIH BAIK</span>
              <h2>Ide layak punya tempat di dunia online.</h2>
              <div className="about-art-line" />
              <span className="about-art-caption">DESAIN · BANGUN · SERAHKAN</span>
            </div>
            <div className="about-art-badge">
              <Lightbulb size={24} />
              <span>
                Dari ide
                <br />
                jadi digital
              </span>
            </div>
          </Reveal>

          <Reveal variant="right" delay={120} className="about-copy">
            <span className="eyebrow">SIAPA KAMI</span>
            <h2>Kami bikin web bekerja buat kamu.</h2>
            <p>B.Site adalah brand penyedia jasa pembuatan website yang berfokus pada desain modern, fungsi yang relevan, dan pengalaman pengguna yang nyaman.</p>
            <p>Kami ingin membantu bisnis, organisasi, pelajar, mahasiswa, maupun individu memiliki ruang digital yang sesuai dengan kebutuhan mereka.</p>
            <p>Setiap proyek dimulai dari memahami kebutuhan, menentukan struktur, membangun tampilan, lalu memastikan website dapat digunakan dengan baik.</p>
            <Link to="/contact" className="button button-primary">
              Diskusikan Project <ArrowUpRight size={18} />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section section-soft">
        <div className="container">
          <Reveal className="section-heading">
            <span className="eyebrow">PRINSIP KAMI</span>
            <h2>Yang jadi pegangan kami.</h2>
            <p>Prinsip yang menjadi dasar pendekatan kami dalam mengerjakan website.</p>
          </Reveal>

          <div className="values-grid">
            {values.map((value, index) => (
              <Reveal
                as="article"
                className="value-card"
                key={value.title}
                delay={index * 110}
              >
                <span className="service-icon">{value.icon}</span>
                <span className="service-number">0{index + 1}</span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}