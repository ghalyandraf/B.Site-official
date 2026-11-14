import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  MessageCircle,
  Send,
  Globe,
  Clock3,
  CheckCircle2,
} from "lucide-react";
import "./Contact.css";

const whatsappNumber = "628872235587";

const SERVICE_OPTIONS = [
  { id: "company", wa: "Company Profile" },
  { id: "landing", wa: "Landing Page" },
  { id: "portfolio", wa: "Personal Portfolio" },
  { id: "ecommerce", wa: "E-commerce" },
  { id: "webapp", wa: "Web Application" },
  { id: "maintenance", wa: "Website Maintenance" },
  { id: "other", wa: "Lainnya" },
];

const BUDGET_OPTIONS = [
  { id: "", key: "none", wa: "Belum ditentukan" },
  { id: "b1", key: "b1", wa: "Di bawah Rp500.000" },
  { id: "b2", key: "b2", wa: "Rp500.000–Rp1.500.000" },
  { id: "b3", key: "b3", wa: "Rp1.500.000–Rp3.000.000" },
  { id: "b4", key: "b4", wa: "Di atas Rp3.000.000" },
];

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
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`ct-reveal ct-reveal-${variant} ${
        shown ? "is-visible" : ""
      } ${className}`}
      style={{ "--d": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "company",
    budget: "",
    message: "",
  });

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const serviceText =
      SERVICE_OPTIONS.find((s) => s.id === form.service)?.wa || form.service;
    const budgetText =
      BUDGET_OPTIONS.find((b) => b.id === form.budget)?.wa ||
      "Belum ditentukan";

    const message = [
      "Halo B.Site! Saya ingin konsultasi project website.",
      "",
      `Nama: ${form.name}`,
      `Email: ${form.email || "-"}`,
      `Layanan: ${serviceText}`,
      `Budget: ${budgetText}`,
      "",
      `Detail project: ${form.message}`,
    ].join("\n");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <>
      <section className="page-hero page-hero-compact ct-hero">
        <div className="container page-hero-inner">
          <span className="eyebrow ct-anim" style={{ "--i": 0 }}>
            HUBUNGI KAMI
          </span>
          <h1 className="ct-anim" style={{ "--i": 1 }}>
            Yuk bangun sesuatu
            <br />
            <span className="text-gradient">yang bermakna.</span>
          </h1>
          <p className="ct-anim" style={{ "--i": 2 }}>
            Punya ide website atau masih bingung mulai dari mana? Ceritakan kebutuhan kamu, dan kita diskusikan bersama.
          </p>
        </div>
      </section>

      <section className="section contact-page">
        <div className="container contact-layout">
          <Reveal as="aside" variant="left" className="contact-info">
            <span className="eyebrow eyebrow-light">MARI TERHUBUNG</span>
            <h2>Ceritakan ide besar kamu berikutnya.</h2>
            <p>Isi formulir di samping. Informasi yang kamu masukkan akan disusun menjadi pesan WhatsApp agar lebih mudah dikirim.</p>

            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-link ct-link"
            >
              <span className="contact-info-icon ct-wa-icon">
                <MessageCircle size={20} />
              </span>
              <span>
                <small>WhatsApp</small>
                <strong>0887-2235-587</strong>
              </span>
              <ArrowUpRight size={18} />
            </a>

            <div className="contact-info-link contact-info-static ct-link">
              <span className="contact-info-icon">
                <Globe size={20} />
              </span>
              <span>
                <small>Fokus kami</small>
                <strong>Website &amp; Solusi Digital</strong>
              </span>
            </div>

            <div className="contact-info-link contact-info-static ct-link">
              <span className="contact-info-icon">
                <Clock3 size={20} />
              </span>
              <span>
                <small>Konsultasi project</small>
                <strong>Dengan janji temu</strong>
              </span>
            </div>

            <div className="contact-mini-note">
              <CheckCircle2 size={17} />
              <span>Diskusi awal untuk memahami kebutuhan project.</span>
            </div>
          </Reveal>

          <Reveal variant="right" delay={120} className="contact-form-card">
            <div className="contact-form-heading">
              <span className="eyebrow">KONSULTASI PROJECT</span>
              <h2>Ceritakan apa yang kamu butuhkan.</h2>
              <p>Kolom bertanda * wajib diisi.</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <label className="form-field">
                  Nama lengkap *
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Nama kamu"
                    value={form.name}
                    onChange={updateField}
                    required
                    maxLength={100}
                  />
                </label>

                <label className="form-field">
                  Email
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="nama@email.com"
                    value={form.email}
                    onChange={updateField}
                    maxLength={150}
                  />
                </label>
              </div>

              <div className="form-row">
                <label className="form-field">
                  Layanan yang dibutuhkan *
                  <select
                    name="service"
                    value={form.service}
                    onChange={updateField}
                    required
                  >
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.wa}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="form-field">
                  Estimasi budget
                  <select
                    name="budget"
                    value={form.budget}
                    onChange={updateField}
                  >
                    {BUDGET_OPTIONS.map((opt) => (
                      <option key={opt.key} value={opt.id}>
                        {opt.wa}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label className="form-field">
                Ceritakan project kamu *
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Contoh: Saya ingin membuat website company profile untuk bisnis..."
                  value={form.message}
                  onChange={updateField}
                  required
                  maxLength={2000}
                />
              </label>

              <button
                type="submit"
                className="button button-primary button-full ct-submit"
              >
                Kirim via WhatsApp <Send size={17} />
              </button>

              <p className="form-privacy-note">
                Formulir ini tidak menyimpan data ke server. Saat dikirim, browser akan membuka WhatsApp dengan pesan yang sudah disiapkan.
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}