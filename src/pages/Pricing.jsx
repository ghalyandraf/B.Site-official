import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Info,
  Sparkles,
} from "lucide-react";
import { formatRupiah } from "../data/pricing";
import {
  packages,
  packageTexts,
  domainExtensions,
  DEFAULT_DOMAIN,
} from "../data/packages";
import { useLanguage } from "../context/LanguageContext";
import "./Pricing.css";

const whatsappNumber = "628872235587";

const websitePlans = [
  {
    name: "Web Single Page",
    price: 150000,
    note: "Free hosting",
    desc: "Website satu halaman untuk landing page atau profil singkat.",
  },
  {
    name: "Web Portofolio Single Page",
    price: 100000,
    note: "Free hosting / diskon pelajar & mahasiswa",
    desc: "Portofolio single page dengan tampilan modern dan fokus personal branding.",
  },
  {
    name: "Web Company Profile",
    price: 750000,
    note: "Contoh 5 halaman",
    desc: "Website company profile untuk bisnis yang membutuhkan presentasi lengkap.",
  },
  {
    name: "Web Custom",
    price: 0,
    note: "Konsultasi via WhatsApp",
    desc: "Untuk kebutuhan khusus, harga bisa disesuaikan dengan admin di 08872235587.",
  },
];

/* Pesan WhatsApp sengaja tetap Bahasa Indonesia (yang baca penjual) */
function makeWebsiteLink(productName, price, extra = "") {
  const message = [
    "Halo B.Site, saya tertarik membeli produk berikut:",
    `Produk: ${productName}`,
    `Harga: ${price > 0 ? formatRupiah(price) : "Konsultasi"}`,
    extra ? `Detail: ${extra}` : "",
    "",
    "Boleh minta informasi lebih lanjut?",
  ].join("\n");

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/* Pesan WhatsApp untuk paket layanan (selalu Bahasa Indonesia) */
function makePackageLink({ name, total, period, ext, renewal }) {
  const id = packageTexts.id;
  const periodText =
    period === "month"
      ? " / bulan"
      : period === "year"
      ? " / tahun"
      : period === "first"
      ? " (tahun pertama)"
      : "";

  const lines = [id.waIntro, `${id.waPackage}: ${name}`];
  if (ext) lines.push(`${id.waDomain}: ${ext}`);
  lines.push(`${id.waPrice}: ${formatRupiah(total)}${periodText}`);
  if (renewal) lines.push(`${id.waRenew}: ${formatRupiah(renewal)}`);
  lines.push("", id.waOutro);

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    lines.join("\n")
  )}`;
}

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

export default function Pricing() {
  const [heroIn, setHeroIn] = useState(prefersReducedMotion);
  const [domainExt, setDomainExt] = useState(DEFAULT_DOMAIN);

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
  const domain =
    domainExtensions.find((d) => d.ext === domainExt) || domainExtensions[0];

  const pricingText = {
    eyebrow: "DAFTAR HARGA",
    h1a: "Harga simpel.",
    h1b: "Peluang nyata.",
    heroDesc:
      "Pilih solusi website yang sesuai kebutuhan. Kami menyiapkan paket hosting, website, dan domain dengan harga yang jelas dan mudah dipahami.",
    packageEyebrow: "PAKET LAYANAN",
    packageTitle: "Pilih paket yang pas.",
    packageDesc:
      "Mau website lengkap, website saja, atau hosting dan domain saja? Harga domain menyesuaikan ekstensi yang kamu pilih.",
    domainTitle: "Pilih ekstensi domain",
    domainHint: "Harga domain per tahun",
    docNote:
      "Ekstensi ini biasanya butuh dokumen identitas atau legalitas untuk pendaftaran.",
    breakdownTitle: "Rincian harga",
    web: "Website",
    hosting: "Hosting",
    domain: "Domain",
    renewLabel: "Perpanjangan tahun berikutnya",
    note: "Harga di atas dapat berubah sesuai kebutuhan, ekstensi domain, dan masa aktif layanan.",
    websiteEyebrow: "HARGA WEBSITE",
    websiteTitle: "Paket website yang siap dipilih.",
    websiteDesc:
      "Mulai dari halaman tunggal, portofolio, company profile, hingga kebutuhan custom sesuai skala projek Anda.",
    websitePeriod: "/ project",
    customTitle: "Butuh website custom?",
    customDesc:
      "Untuk company profile, landing page, atau kebutuhan khusus, kami siap membantu menyesuaikan kebutuhan dan budget Anda.",
    customLink: "Minta penawaran",
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
          <Reveal className="pr-packages-heading">
            <span className="eyebrow">{pricingText.packageEyebrow}</span>
            <h2>{pricingText.packageTitle}</h2>
            <p>{pricingText.packageDesc}</p>
          </Reveal>

          <Reveal className="pr-domain-picker">
            <div className="pr-domain-head">
              <strong>{pricingText.domainTitle}</strong>
              <span>{pricingText.domainHint}</span>
            </div>

            <div
              className="pr-domain-options"
              role="group"
              aria-label={pricingText.domainTitle}
            >
              {domainExtensions.map((d) => (
                <button
                  key={d.ext}
                  type="button"
                  className={`pr-domain-chip ${
                    d.ext === domainExt ? "is-active" : ""
                  }`}
                  aria-pressed={d.ext === domainExt}
                  onClick={() => setDomainExt(d.ext)}
                >
                  <span className="pr-chip-ext">{d.ext}</span>
                  <span className="pr-chip-price">{formatRupiah(d.price)}</span>
                </button>
              ))}
            </div>

            {domain.needsDoc && (
              <p className="pr-domain-doc">
                <Info size={15} /> {pricingText.docNote}
              </p>
            )}
          </Reveal>

          <div className="pr-packages-grid">
            {packages.map((pkg, index) => {
              const text = pkg.id_text;
              const domainCost = pkg.withDomain ? domain.price : 0;
              const total = pkg.webPrice + pkg.hostingPrice + domainCost;
              const renewalTotal = pkg.renewal
                ? pkg.hostingPrice + domainCost
                : 0;

              const rows = [];
              if (pkg.webPrice > 0)
                rows.push({ label: pricingText.web, amount: pkg.webPrice });
              if (pkg.hostingPrice > 0)
                rows.push({ label: pricingText.hosting, amount: pkg.hostingPrice });
              if (pkg.withDomain)
                rows.push({
                  label: `${pricingText.domain} ${domain.ext}`,
                  amount: domain.price,
                });

              const periodLabel =
                pkg.period === "month"
                  ? "/ bulan"
                  : pkg.period === "year"
                  ? "/ tahun"
                  : pkg.period === "first"
                  ? "/ tahun pertama"
                  : "/ project";

              return (
                <Reveal
                  as="article"
                  key={pkg.id}
                  delay={index * 120}
                  className={`price-card pr-card pr-pkg ${
                    pkg.featured ? "pr-pkg-featured" : ""
                  }`}
                >
                  {pkg.featured && text.badge && (
                    <div className="pr-pop">
                      <Sparkles size={13} /> {text.badge}
                    </div>
                  )}

                  <h3>{text.name}</h3>
                  <p className="price-description">{text.desc}</p>

                  <div className="price-main">
                    <strong key={`${pkg.id}-${total}`} className="pr-price-pop">
                      {formatRupiah(total)}
                    </strong>
                    <span className="price-period">{periodLabel}</span>
                  </div>

                  {rows.length > 1 && (
                    <div className="pr-breakdown">
                      <p className="pr-breakdown-title">{pricingText.breakdownTitle}</p>
                      {rows.map((row) => (
                        <div className="pr-breakdown-row" key={row.label}>
                          <span>{row.label}</span>
                          <span>{formatRupiah(row.amount)}</span>
                        </div>
                      ))}
                      {pkg.renewal && (
                        <div className="pr-breakdown-row pr-breakdown-renew">
                          <span>{pricingText.renewLabel}</span>
                          <span>{formatRupiah(renewalTotal)}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="price-divider" />

                  <ul className="feature-list">
                    {text.features.map((feature) => (
                      <li key={feature}>
                        <Check size={17} /> {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={makePackageLink({
                      name: pkg.id_text.name,
                      total,
                      period: pkg.period,
                      ext: pkg.withDomain ? domain.ext : null,
                      renewal: renewalTotal,
                    })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`button button-full ${
                      pkg.featured ? "button-primary" : "button-secondary"
                    }`}
                  >
                    {text.button}{" "}
                    {pkg.featured ? (
                      <ArrowUpRight size={17} />
                    ) : (
                      <ArrowRight size={17} />
                    )}
                  </a>
                </Reveal>
              );
            })}
          </div>

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
                className="price-card pr-card pr-pkg"
              >
                <h3>{plan.name}</h3>
                <p className="price-description">{plan.desc}</p>

                <div className="price-main">
                  <strong className="pr-price-pop">
                    {plan.price > 0 ? formatRupiah(plan.price) : "Konsultasi"}
                  </strong>
                  {plan.price > 0 && (
                    <span className="price-period">{pricingText.websitePeriod}</span>
                  )}
                </div>

                <div className="price-divider" />
                <ul className="feature-list">
                  <li>
                    <Check size={17} /> {plan.note}
                  </li>
                </ul>

                <a
                  href={makeWebsiteLink(plan.name, plan.price, plan.note)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button button-secondary button-full"
                >
                  {plan.price > 0 ? "Pesan Sekarang" : "Konsultasi via WhatsApp"}{" "}
                  <ArrowRight size={17} />
                </a>
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