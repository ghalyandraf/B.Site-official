import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  ArrowUpRight,
  MessageCircle,
  Send,
  Globe,
  Clock3,
  CheckCircle2,
  GraduationCap,
  Server,
  Lock,
} from "lucide-react";
import { formatRupiah } from "../data/pricing";
import { hostingPlans } from "../data/hosting";
import { websitePlans } from "../data/websites";
import "./Contact.css";

const whatsappNumber = "628872235587";

const SERVICE_OPTIONS = [
  { id: "single", wa: "Web Single Page" },
  { id: "student", wa: "Web Portofolio Single Page (Promo Pelajar / Mahasiswa)" },
  { id: "company", wa: "Web Company Profile" },
  { id: "hosting", wa: "Hosting & Domain" },
  { id: "ecommerce", wa: "E-commerce" },
  { id: "webapp", wa: "Web Application" },
  { id: "maintenance", wa: "Website Maintenance" },
  { id: "custom", wa: "Web Custom" },
  { id: "other", wa: "Lainnya" },
];

/* Dipakai hanya kalau harga belum pasti (layanan konsultasi) */
const BUDGET_OPTIONS = [
  { id: "", key: "none", wa: "Belum ditentukan" },
  { id: "b0", key: "b0", wa: "Di bawah Rp250.000" },
  { id: "b1", key: "b1", wa: "Rp250.000–Rp500.000" },
  { id: "b2", key: "b2", wa: "Rp500.000–Rp1.500.000" },
  { id: "b3", key: "b3", wa: "Rp1.500.000–Rp3.000.000" },
  { id: "b4", key: "b4", wa: "Di atas Rp3.000.000" },
];

const BILLING_OPTIONS = [
  { id: "month", label: "Bulanan" },
  { id: "year", label: "Bayar 1 tahun (lebih hemat)" },
];

/* Baca ?service=...&hosting=...&billing=... dari URL (dikirim dari halaman Pricing).
   Hanya nilai yang valid yang dipakai. */
function paramsToFields(params) {
  const fields = {};

  const service = params.get("service");
  if (SERVICE_OPTIONS.some((s) => s.id === service)) fields.service = service;

  const hosting = params.get("hosting");
  if (hostingPlans.some((p) => p.id === hosting)) {
    fields.hosting = hosting;
    if (!fields.service) fields.service = "hosting";
  }

  const billing = params.get("billing");
  if (BILLING_OPTIONS.some((b) => b.id === billing)) fields.billing = billing;

  return fields;
}

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

/* Fade-in hero: pakai transition inline supaya tidak ketimpa CSS lain */
const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Contact() {
  const [searchParams] = useSearchParams();
  const [heroIn, setHeroIn] = useState(prefersReducedMotion);
  const [form, setForm] = useState(() => ({
    name: "",
    email: "",
    service: "single",
    hosting: "none",
    billing: "month",
    budget: "",
    message: "",
    ...paramsToFields(searchParams),
  }));

  useEffect(() => {
    if (heroIn) return;
    const t = setTimeout(() => setHeroIn(true), 60);
    return () => clearTimeout(t);
  }, [heroIn]);

  /* Datang dari Pricing: isi kolom sesuai paket, lalu scroll ke form */
  useEffect(() => {
    const fields = paramsToFields(searchParams);
    if (Object.keys(fields).length === 0) return;

    setForm((prev) => ({ ...prev, ...fields }));

    const t = setTimeout(() => {
      document.getElementById("contact-form")?.scrollIntoView({
        behavior: prefersReducedMotion() ? "auto" : "smooth",
        block: "start",
      });
    }, 150);
    return () => clearTimeout(t);
  }, [searchParams]);

  const heroFade = (i) => {
    const ease = "cubic-bezier(0.22, 1, 0.36, 1)";
    const delay = `${i * 140 + 120}ms`;
    return {
      opacity: heroIn ? 1 : 0,
      transform: heroIn ? "translateY(0)" : "translateY(26px)",
      filter: heroIn ? "blur(0px)" : "blur(8px)",
      transition: `opacity 1s ${ease} ${delay}, transform 1s ${ease} ${delay}, filter 1s ${ease} ${delay}`,
    };
  };

  /* ---------- Hitung biaya (jadi isi Estimasi budget) ---------- */
  const selectedHosting = hostingPlans.find((p) => p.id === form.hosting);
  const isYearly = form.billing === "year";

  const servicePlan = websitePlans.find((p) => p.service === form.service);
  const serviceOption = SERVICE_OPTIONS.find((s) => s.id === form.service);
  const serviceLabel = servicePlan?.name || serviceOption?.wa || form.service;

  const showWebsiteRow = form.service !== "hosting";
  const websitePrice = servicePlan?.price || 0;
  const websiteIsConsult = showWebsiteRow && websitePrice === 0;

  const hostingPrice = selectedHosting
    ? isYearly
      ? selectedHosting.yearly
      : selectedHosting.monthly
    : 0;
  const hostingLabel = selectedHosting
    ? isYearly
      ? `Hosting ${selectedHosting.name} (1 tahun)`
      : `Hosting ${selectedHosting.name} (bulan pertama)`
    : "";

  const total = websitePrice + hostingPrice;

  /* Budget otomatis kalau harganya pasti; kalau konsultasi, user pilih sendiri */
  const isAutoBudget = total > 0 && !websiteIsConsult;

  const breakdown = [];
  if (showWebsiteRow && websitePrice > 0) {
    breakdown.push({ label: serviceLabel, amount: websitePrice });
  }
  if (selectedHosting) {
    breakdown.push({ label: hostingLabel, amount: hostingPrice });
  }

  function updateField(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const name = form.name.trim();
    const email = form.email.trim();
    const detail = form.message.trim();

    const manualBudget =
      BUDGET_OPTIONS.find((b) => b.id === form.budget)?.wa ||
      "Belum ditentukan";

    const lines = [
      "Halo B.Site, saya ingin konsultasi project website.",
      "",
      `*Nama:* ${name}`,
      `*Email:* ${email || "-"}`,
      `*Layanan:* ${serviceOption?.wa || form.service}`,
    ];

    if (selectedHosting) {
      lines.push(`*Paket hosting:* ${selectedHosting.name}`);
      lines.push(
        isYearly
          ? `*Periode bayar:* 1 tahun (gratis ${selectedHosting.freeMonths} bulan)`
          : "*Periode bayar:* Bulanan"
      );
    } else {
      lines.push("*Paket hosting:* Tidak pakai hosting");
    }

    /* Estimasi budget + rincian */
    if (isAutoBudget) {
      lines.push("", `*Estimasi budget:* ${formatRupiah(total)}`);
      breakdown.forEach((row) => {
        lines.push(`- ${row.label}: ${formatRupiah(row.amount)}`);
      });
      if (selectedHosting && !isYearly) {
        lines.push(
          `(Hosting bulan berikutnya ${formatRupiah(selectedHosting.monthly)} / bulan)`
        );
      }
    } else {
      lines.push("", `*Estimasi budget:* ${manualBudget}`);
      if (selectedHosting) {
        lines.push(`- ${hostingLabel}: ${formatRupiah(hostingPrice)}`);
      }
    }

    lines.push("", "*Detail project:*", detail, "", "Terima kasih.");

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      lines.join("\n")
    )}`;

    /* Kalau popup diblokir (umum di HP), pindah di tab yang sama */
    const win = window.open(url, "_blank");
    if (win) {
      win.opener = null;
    } else {
      window.location.href = url;
    }
  }

  return (
    <>
      <section className="page-hero page-hero-compact ct-hero">
        <div className="container page-hero-inner">
          <span className="eyebrow" style={heroFade(0)}>
            HUBUNGI KAMI
          </span>
          <h1 style={heroFade(1)}>
            Yuk bangun sesuatu
            <br />
            <span className="text-gradient">yang bermakna.</span>
          </h1>
          <p style={heroFade(2)}>
            Punya ide website atau masih bingung mulai dari mana? Ceritakan
            kebutuhan kamu, dan kita diskusikan bersama.
          </p>
        </div>
      </section>

      <section className="section contact-page">
        <div className="container contact-layout">
          <Reveal as="aside" variant="left" className="contact-info">
            <span className="eyebrow eyebrow-light">MARI TERHUBUNG</span>
            <h2>Ceritakan ide besar kamu berikutnya.</h2>
            <p>
              Isi formulir di samping. Informasi yang kamu masukkan akan
              disusun menjadi pesan WhatsApp agar lebih mudah dikirim.
            </p>

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

          <Reveal
            id="contact-form"
            variant="right"
            delay={120}
            className="contact-form-card"
          >
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
                    {SERVICE_OPTIONS.map((opt) => {
                      const plan = websitePlans.find(
                        (p) => p.service === opt.id
                      );
                      return (
                        <option key={opt.id} value={opt.id}>
                          {opt.wa}
                          {plan && plan.price > 0
                            ? ` - ${formatRupiah(plan.price)}`
                            : ""}
                        </option>
                      );
                    })}
                  </select>
                  {form.service === "student" && (
                    <span className="ct-hint">
                      <GraduationCap size={14} />
                      Promo khusus pelajar &amp; mahasiswa. Admin bisa minta
                      bukti status pelajar/mahasiswa.
                    </span>
                  )}
                </label>

                {/* ---------- Estimasi budget (otomatis / manual) ---------- */}
                <div className="form-field ct-budget">
                  <label htmlFor="ct-budget-field">Estimasi budget</label>

                  {isAutoBudget ? (
                    <>
                      <div className="ct-budget-auto" id="ct-budget-field">
                        <strong>{formatRupiah(total)}</strong>
                        <span>
                          <Lock size={12} /> Otomatis
                        </span>
                      </div>

                      <div className="ct-budget-detail" aria-live="polite">
                        {breakdown.map((row) => (
                          <div className="ct-budget-row" key={row.label}>
                            <span>{row.label}</span>
                            <span>{formatRupiah(row.amount)}</span>
                          </div>
                        ))}
                        {selectedHosting && !isYearly && (
                          <p className="ct-budget-note">
                            Bulan berikutnya hosting{" "}
                            {formatRupiah(selectedHosting.monthly)} / bulan.
                          </p>
                        )}
                        {selectedHosting && isYearly && (
                          <p className="ct-budget-note">
                            Hemat: gratis {selectedHosting.freeMonths} bulan
                            hosting.
                          </p>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      <select
                        id="ct-budget-field"
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
                      <p className="ct-budget-note">
                        Harga layanan ini disesuaikan setelah konsultasi, jadi
                        pilih perkiraan budget kamu.
                        {selectedHosting &&
                          ` Biaya hosting ${formatRupiah(
                            hostingPrice
                          )} belum termasuk.`}
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="form-row">
                <label className="form-field">
                  Paket hosting
                  <select
                    name="hosting"
                    value={form.hosting}
                    onChange={updateField}
                  >
                    <option value="none">Tidak pakai hosting</option>
                    {hostingPlans.map((plan) => (
                      <option key={plan.id} value={plan.id}>
                        {plan.name} - {formatRupiah(plan.monthly)}/bln
                      </option>
                    ))}
                  </select>
                  {selectedHosting && (
                    <span className="ct-hint">
                      <Server size={14} />
                      {selectedHosting.features.join(" • ")}
                    </span>
                  )}
                </label>

                <label className="form-field">
                  Periode bayar hosting
                  <select
                    name="billing"
                    value={form.billing}
                    onChange={updateField}
                    disabled={!selectedHosting}
                  >
                    {BILLING_OPTIONS.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.label}
                        {selectedHosting && opt.id === "year"
                          ? ` - ${formatRupiah(selectedHosting.yearly)}`
                          : ""}
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
                Formulir ini tidak menyimpan data ke server. Saat dikirim,
                browser akan membuka WhatsApp dengan pesan yang sudah
                disiapkan.
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}