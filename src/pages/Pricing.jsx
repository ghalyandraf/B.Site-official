import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, GraduationCap } from "lucide-react";
import { formatRupiah } from "../data/pricing";
import { hostingPlans } from "../data/hosting";
import { websitePlans } from "../data/websites";
import "./Pricing.css";

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
      className={`reveal ${shown ? "is-visible" : ""} ${className}`}
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

const pricingText = {
  eyebrow: "DAFTAR HARGA",
  h1a: "Harga simpel.",
  h1b: "Peluang nyata.",
  heroDesc:
    "Pilih solusi website yang sesuai kebutuhan. Kami menyiapkan paket hosting dan website dengan harga yang jelas dan mudah dipahami.",
  hostingEyebrow: "PAKET HOSTING",
  hostingTitle: "Pilih hosting yang pas.",
  hostingDesc: "Bayar bulanan, atau hemat dengan bayar 1 tahun sekaligus.",
  hostingPeriod: "/ bln",
  yearlyLabel: "Bayar 1 tahun",
  hostingButton: "Pesan Hosting",
  websiteEyebrow: "HARGA WEBSITE",
  websiteTitle: "Paket website yang siap dipilih.",
  websiteDesc:
    "Mulai dari halaman tunggal, portofolio, company profile, hingga kebutuhan custom sesuai skala projek Anda.",
  websitePeriod: "/ project",
  note: "Harga di atas dapat berubah sesuai kebutuhan dan masa aktif layanan.",
  customTitle: "Butuh website custom?",
  customDesc:
    "Untuk company profile, landing page, atau kebutuhan khusus, kami siap membantu menyesuaikan kebutuhan dan budget Anda.",
  customLink: "Minta penawaran",
};

export default function Pricing() {
  const [heroIn, setHeroIn] = useState(prefersReducedMotion);

  useEffect(() => {
    if (heroIn) return;
    const t = setTimeout(() => setHeroIn(true), 60);
    return () => clearTimeout(t);
  }, [heroIn]);

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

  return (
    <>
      <section className="page-hero page-hero-compact pr-hero">
        <div className="container page-hero-inner">
          <span className="eyebrow" style={heroFade(0)}>
            {pricingText.eyebrow}
          </span>
          <h1 style={heroFade(1)}>
            {pricingText.h1a}
            <br />
            <span className="text-gradient">{pricingText.h1b}</span>
          </h1>
          <p style={heroFade(2)}>{pricingText.heroDesc}</p>
        </div>
      </section>

      <section className="section pricing-page">
        <div className="container">
          {/* ---------- Paket hosting ---------- */}
          <Reveal className="pr-packages-heading">
            <span className="eyebrow">{pricingText.hostingEyebrow}</span>
            <h2>{pricingText.hostingTitle}</h2>
            <p>{pricingText.hostingDesc}</p>
          </Reveal>

          <div className="pr-packages-grid pr-grid-2">
            {hostingPlans.map((plan, index) => (
              <Reveal
                as="article"
                key={plan.id}
                delay={index * 120}
                className="price-card pr-card pr-pkg"
              >
                <h3>{plan.name}</h3>
                <p className="price-description">{plan.desc}</p>

                <div className="price-main">
                  <strong className="pr-price-pop">
                    {formatRupiah(plan.monthly)}
                  </strong>
                  <span className="price-period">
                    {pricingText.hostingPeriod}
                  </span>
                </div>

                {/* Klik kotak ini = langsung pilih periode 1 tahun di Kontak */}
                <Link
                  to={`/contact?service=hosting&hosting=${plan.id}&billing=year`}
                  className="pr-yearly pr-yearly-link"
                  aria-label={`Pesan hosting ${plan.name} bayar 1 tahun`}
                >
                  <div>
                    <small>{pricingText.yearlyLabel}</small>
                    <strong>{formatRupiah(plan.yearly)}</strong>
                  </div>
                  <span className="pr-save">Gratis {plan.freeMonths} bulan</span>
                </Link>

                <div className="price-divider" />

                <ul className="feature-list">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Check size={17} /> {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/contact?service=hosting&hosting=${plan.id}&billing=month`}
                  className="button button-secondary button-full"
                >
                  {pricingText.hostingButton} <ArrowRight size={17} />
                </Link>
              </Reveal>
            ))}
          </div>

          {/* ---------- Harga website ---------- */}
          <Reveal className="pr-packages-heading">
            <span className="eyebrow">{pricingText.websiteEyebrow}</span>
            <h2>{pricingText.websiteTitle}</h2>
            <p>{pricingText.websiteDesc}</p>
          </Reveal>

          <div className="pr-packages-grid">
            {websitePlans.map((plan, index) => (
              <Reveal
                as="article"
                key={plan.name}
                delay={index * 120}
                className="price-card pr-card pr-pkg pr-web"
              >
                {plan.badge && (
                  <div className="pr-tag">
                    <GraduationCap size={14} /> {plan.badge}
                  </div>
                )}

                <h3>{plan.name}</h3>
                <p className="price-description">{plan.desc}</p>

                <div className="price-main">
                  <strong className="pr-price-pop">
                    {plan.price > 0 ? formatRupiah(plan.price) : "Konsultasi"}
                  </strong>
                  {plan.price > 0 && (
                    <span className="price-period">
                      {pricingText.websitePeriod}
                    </span>
                  )}
                </div>

                <div className="price-divider" />

                <ul className="feature-list">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Check size={17} /> {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  to={`/contact?service=${plan.service}`}
                  className="button button-secondary button-full"
                >
                  {plan.price > 0 ? "Pesan Sekarang" : "Konsultasi Sekarang"}{" "}
                  <ArrowRight size={17} />
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal as="p" className="pr-packages-note" delay={100}>
            {pricingText.note}
          </Reveal>

          <Reveal className="pricing-bottom-note pr-note">
            <div>
              <h3>{pricingText.customTitle}</h3>
              <p>{pricingText.customDesc}</p>
            </div>
            <Link to="/contact" className="text-link">
              {pricingText.customLink} <ArrowRight size={17} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}