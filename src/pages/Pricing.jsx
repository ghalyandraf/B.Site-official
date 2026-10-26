import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  GraduationCap,
  Info,
  Sparkles,
} from "lucide-react";
import { pricing, formatRupiah } from "../data/pricing";
import {
  packages,
  packageTexts,
  domainExtensions,
  DEFAULT_DOMAIN,
} from "../data/packages";
import { useLanguage } from "../context/LanguageContext";
import "./Pricing.css";

const whatsappNumber = "628872235587";

/* Pesan WhatsApp sengaja tetap Bahasa Indonesia (yang baca penjual) */
function makeOrderLink(productName, price, student = false) {
  const message = [
    "Halo B.Site, saya tertarik membeli produk berikut:",
    `Produk: ${productName}`,
    `Harga: ${formatRupiah(price)}`,
    `Status: ${student ? "Pelajar/Mahasiswa (diskon 30%)" : "Harga reguler"}`,
    "",
    "Boleh minta informasi lebih lanjut?",
  ].join("\n");

  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/* Pesan WhatsApp untuk paket layanan (selalu Bahasa Indonesia) */
function makePackageLink({ name, total, period, ext, renewal }) {
  const id = packageTexts.id;
  const periodText =
    period === "year" ? " / tahun" : period === "first" ? " (tahun pertama)" : "";

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
      className={`pr-reveal ${shown ? "is-visible" : ""} ${className}`}
      style={{ "--d": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export default function Pricing() {
  const { t, lang } = useLanguage();
  const pt = packageTexts[lang] || packageTexts.id;

  const [domainExt, setDomainExt] = useState(DEFAULT_DOMAIN);
  const domain =
    domainExtensions.find((d) => d.ext === domainExt) || domainExtensions[0];

  const product = pricing[0];
  const studentPrice = Math.round(
    product.originalPrice * (1 - product.studentDiscount / 100)
  );

  const studentFeatures = [
    "pricing.student.f1",
    "pricing.student.f2",
    "pricing.student.f3",
    "pricing.student.f4",
  ];

  return (
    <>
      <section className="page-hero page-hero-compact pr-hero">
        <div className="container page-hero-inner">
          <span className="eyebrow pr-anim" style={{ "--i": 0 }}>
            {t("pricing.eyebrow")}
          </span>
          <h1 className="pr-anim" style={{ "--i": 1 }}>
            {t("pricing.h1a")}
            <br />
            <span className="text-gradient">{t("pricing.h1b")}</span>
          </h1>
          <p className="pr-anim" style={{ "--i": 2 }}>
            {t("pricing.hero.desc")}
          </p>
        </div>
      </section>

      <section className="section pricing-page">
        <div className="container">
          <Reveal className="pricing-intro">
            <div>
              <span className="eyebrow">{t("pricing.intro.eyebrow")}</span>
              <h2>{t("pricing.intro.title")}</h2>
              <p>{t("pricing.intro.desc")}</p>
            </div>
            <div className="pricing-intro-icon pr-intro-icon">
              <Sparkles size={31} />
            </div>
          </Reveal>

          <div className="pricing-grid">
            <Reveal as="article" className="price-card pr-card">
              <span className="price-label">{product.label}</span>
              <h3>{product.name}</h3>
              <p className="price-description">{product.description}</p>

              <div className="price-main">
                <strong>{formatRupiah(product.originalPrice)}</strong>
                <span className="price-period">{t("pricing.perTemplate")}</span>
              </div>

              <div className="price-divider" />

              <p className="features-title">{t("pricing.features.title")}</p>
              <ul className="feature-list">
                {product.features.map((feature) => (
                  <li key={feature}>
                    <Check size={17} /> {feature}
                  </li>
                ))}
              </ul>

              <a
                href={makeOrderLink(product.name, product.originalPrice)}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-secondary button-full"
              >
                {t("pricing.regular.button")} <ArrowRight size={17} />
              </a>
            </Reveal>

            <Reveal
              as="article"
              className="price-card student-price-card pr-card"
              delay={140}
            >
              <div className="student-ribbon">
                <GraduationCap size={16} /> {t("pricing.student.ribbon")}
              </div>

              <span className="price-label">{t("pricing.student.label")}</span>
              <h3>{t("pricing.student.title")}</h3>
              <p className="price-description">{t("pricing.student.desc")}</p>

              <div className="discount-badge pr-badge">
                <Sparkles size={15} /> {t("pricing.save")}{" "}
                {product.studentDiscount}%
              </div>

              <div className="price-main">
                <span className="price-original">
                  {formatRupiah(product.originalPrice)}
                </span>
                <strong>{formatRupiah(studentPrice)}</strong>
                <span className="price-period">{t("pricing.perTemplate")}</span>
              </div>

              <div className="price-divider" />

              <p className="features-title">
                {t("pricing.student.featuresTitle")}
              </p>
              <ul className="feature-list">
                {studentFeatures.map((key) => (
                  <li key={key}>
                    <Check size={17} /> {t(key)}
                  </li>
                ))}
              </ul>

              <a
                href={makeOrderLink(product.name, studentPrice, true)}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-primary button-full"
              >
                {t("pricing.student.button")} <ArrowUpRight size={17} />
              </a>

              <p className="student-disclaimer">
                {t("pricing.student.disclaimer")}
              </p>
            </Reveal>
          </div>

          {/* ---------- Paket layanan ---------- */}
          <Reveal className="pr-packages-heading">
            <span className="eyebrow">{pt.eyebrow}</span>
            <h2>{pt.title}</h2>
            <p>{pt.desc}</p>
          </Reveal>

          {/* Pilihan ekstensi domain */}
          <Reveal className="pr-domain-picker">
            <div className="pr-domain-head">
              <strong>{pt.domainTitle}</strong>
              <span>{pt.domainHint}</span>
            </div>

            <div
              className="pr-domain-options"
              role="group"
              aria-label={pt.domainTitle}
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
                <Info size={15} /> {pt.docNote}
              </p>
            )}
          </Reveal>

          <div className="pr-packages-grid">
            {packages.map((pkg, index) => {
              const text = pkg[`${lang}_text`] || pkg.id_text;

              const domainCost = pkg.withDomain ? domain.price : 0;
              const total = pkg.webPrice + pkg.hostingPrice + domainCost;
              const renewalTotal = pkg.renewal
                ? pkg.hostingPrice + domainCost
                : 0;

              const rows = [];
              if (pkg.webPrice > 0)
                rows.push({ label: pt.web, amount: pkg.webPrice });
              if (pkg.hostingPrice > 0)
                rows.push({ label: pt.hosting, amount: pkg.hostingPrice });
              if (pkg.withDomain)
                rows.push({
                  label: `${pt.domain} ${domain.ext}`,
                  amount: domain.price,
                });

              const periodLabel =
                pkg.period === "year"
                  ? pt.year
                  : pkg.period === "first"
                  ? pt.first
                  : pt.once;

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
                    <strong
                      key={`${pkg.id}-${total}`}
                      className="pr-price-pop"
                    >
                      {formatRupiah(total)}
                    </strong>
                    <span className="price-period">{periodLabel}</span>
                  </div>

                  {rows.length > 1 && (
                    <div className="pr-breakdown">
                      <p className="pr-breakdown-title">{pt.breakdownTitle}</p>
                      {rows.map((row) => (
                        <div className="pr-breakdown-row" key={row.label}>
                          <span>{row.label}</span>
                          <span>{formatRupiah(row.amount)}</span>
                        </div>
                      ))}
                      {pkg.renewal && (
                        <div className="pr-breakdown-row pr-breakdown-renew">
                          <span>{pt.renewLabel}</span>
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

          <Reveal as="p" className="pr-packages-note" delay={100}>
            {pt.note}
          </Reveal>

          <Reveal className="pricing-bottom-note pr-note">
            <div>
              <h3>{t("pricing.custom.title")}</h3>
              <p>{t("pricing.custom.desc")}</p>
            </div>
            <Link to="/contact" className="text-link">
              {t("pricing.custom.link")} <ArrowRight size={17} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}