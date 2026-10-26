import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const translations = {
  id: {
    // Navbar
    "nav.home": "Beranda",
    "nav.about": "Tentang",
    "nav.portfolio": "Portofolio",
    "nav.pricing": "Daftar Harga",
    "nav.contact": "Kontak",
    "nav.cta": "Hubungi Kami",
    "nav.tagline": "Solusi Digital",
    "nav.openMenu": "Buka menu",
    "nav.closeMenu": "Tutup menu",
    "nav.language": "Ganti bahasa",
    "nav.mainNav": "Navigasi utama",

    // Home - hero
    "home.badge": "Partner Digital Kamu",
    "home.h1a": "Kami bangun website",
    "home.h1b": "yang mewujudkan",
    "home.h1c": "ide kamu.",
    "home.desc":
      "B.Site membantu bisnis dan individu membangun kehadiran digital melalui website yang modern, fungsional, dan responsif.",
    "home.startProject": "Mulai Project",
    "home.viewPortfolio": "Lihat Portofolio",
    "home.point1": "Desain responsif",
    "home.point2": "Pengembangan modern",

    // Home - visual card
    "home.visual.url": "websitekamu.site",
    "home.visual.label": "PENGALAMAN DIGITAL",
    "home.visual.h1": "Ambil",
    "home.visual.h2": "langkah berikutnya.",
    "home.visual.cta": "Jelajahi",
    "home.visual.step1": "Desain",
    "home.visual.step2": "Bangun",
    "home.visual.step3": "Rilis",
    "home.float1.title": "Kode Bersih",
    "home.float1.sub": "Dibuat dengan tujuan",
    "home.float2.title": "100% Responsif",
    "home.float2.sub": "Di semua perangkat",

    // Home - trust strip
    "home.strip1": "IDE",
    "home.strip2": "DESAIN",
    "home.strip3": "PENGEMBANGAN",
    "home.strip4": "RILIS",

    // Home - services
    "home.services.eyebrow": "YANG KAMI KERJAKAN",
    "home.services.title": "Semua yang kamu butuhkan untuk go digital.",
    "home.services.desc":
      "Dari ide awal sampai website siap digunakan, kami fokus pada pengalaman yang jelas dan bermanfaat.",
    "home.service1.title": "Desain Website",
    "home.service1.desc":
      "Tampilan website yang profesional, konsisten, dan nyaman digunakan.",
    "home.service2.title": "Pengembangan Web",
    "home.service2.desc":
      "Website yang dibangun sesuai kebutuhan dan tujuan bisnis kamu.",
    "home.service3.title": "Website Responsif",
    "home.service3.desc":
      "Pengalaman yang tetap nyaman di desktop, tablet, dan smartphone.",
    "home.learnMore": "Selengkapnya",

    // Home - CTA
    "home.cta.eyebrow": "PUNYA PROJECT DI KEPALA?",
    "home.cta.title": "Yuk wujudkan ide kamu jadi nyata.",
    "home.cta.desc": "Ceritakan kebutuhan website kamu. Kita mulai dari sana.",
    "home.cta.button": "Hubungi Kami",

    // About - hero
    "about.eyebrow": "TENTANG B.SITE",
    "about.h1a": "Solusi digital,",
    "about.h1b": "dibuat dengan tujuan.",
    "about.hero.desc":
      "Kami percaya website yang baik bukan hanya soal tampilan, tetapi juga bagaimana website membantu mencapai tujuan.",

    // About - art card
    "about.art.eyebrow": "BANGUN YANG LEBIH BAIK",
    "about.art.title": "Ide layak punya tempat di dunia online.",
    "about.art.caption": "DESAIN · BANGUN · SERAHKAN",
    "about.badge1": "Dari ide",
    "about.badge2": "jadi digital",

    // About - who we are
    "about.who.eyebrow": "SIAPA KAMI",
    "about.who.title": "Kami bikin web bekerja buat kamu.",
    "about.who.p1":
      "B.Site adalah brand penyedia jasa pembuatan website yang berfokus pada desain modern, fungsi yang relevan, dan pengalaman pengguna yang nyaman.",
    "about.who.p2":
      "Kami ingin membantu bisnis, organisasi, pelajar, mahasiswa, maupun individu memiliki ruang digital yang sesuai dengan kebutuhan mereka.",
    "about.who.p3":
      "Setiap proyek dimulai dari memahami kebutuhan, menentukan struktur, membangun tampilan, lalu memastikan website dapat digunakan dengan baik.",
    "about.who.button": "Diskusikan Project",

    // About - principles
    "about.principles.eyebrow": "PRINSIP KAMI",
    "about.principles.title": "Yang jadi pegangan kami.",
    "about.principles.desc":
      "Prinsip yang menjadi dasar pendekatan kami dalam mengerjakan website.",
    "about.value1.title": "Berorientasi tujuan",
    "about.value1.text":
      "Setiap website dibuat dengan tujuan yang jelas dan kebutuhan pengguna sebagai fokus.",
    "about.value2.title": "Desain yang matang",
    "about.value2.text":
      "Tampilan yang rapi, konsisten, dan membantu pengunjung memahami informasi.",
    "about.value3.title": "Pengerjaan andal",
    "about.value3.text":
      "Kami mengutamakan komunikasi yang jelas dan proses pengerjaan yang terarah.",
    "about.value4.title": "Siap berkembang",
    "about.value4.text":
      "Struktur website dirancang agar dapat dikembangkan sesuai kebutuhan berikutnya.",

    // Portfolio
    "portfolio.eyebrow": "PORTOFOLIO KAMI",
    "portfolio.h1a": "Karya yang mewujudkan",
    "portfolio.h1b": "ide jadi nyata.",
    "portfolio.hero.desc":
      "Lihat preview website langsung dan buka versi aslinya untuk menjelajahi website secara lengkap.",
    "portfolio.note":
      "Beberapa website membatasi tampilan melalui iframe. Gunakan tombol \"Buka Website\" jika preview tidak tersedia.",
    "portfolio.cta.title": "Punya project yang ingin dibuat?",
    "portfolio.cta.desc":
      "Website berikutnya bisa menjadi karya yang kita bangun bersama.",
    "portfolio.cta.button": "Mulai Project",
    "portfolio.disclaimer":
      "Data proyek pada versi demo masih menggunakan website contoh. Ganti URL dan deskripsinya dengan proyek asli sebelum dipublikasikan.",

    // Pricing
    "pricing.eyebrow": "DAFTAR HARGA",
    "pricing.h1a": "Harga simpel.",
    "pricing.h1b": "Peluang nyata.",
    "pricing.hero.desc":
      "Pilih solusi website yang sesuai kebutuhan. Harga demo ini bisa disesuaikan dengan produk dan layanan B.Site yang sebenarnya.",
    "pricing.intro.eyebrow": "PRODUK DIGITAL",
    "pricing.intro.title": "Mulai dari portofolio.",
    "pricing.intro.desc":
      "Website portofolio untuk memperkenalkan diri, menampilkan karya, dan membangun personal branding.",
    "pricing.perTemplate": "/ template",
    "pricing.features.title": "Yang kamu dapatkan",
    "pricing.regular.button": "Pesan Harga Reguler",
    "pricing.student.ribbon": "PENAWARAN PELAJAR",
    "pricing.student.label": "Spesial untuk pelajar",
    "pricing.student.title": "Portofolio Pelajar",
    "pricing.student.desc":
      "Tampilkan identitas, pengalaman organisasi, sertifikat, keahlian, dan proyek dalam satu website.",
    "pricing.save": "Hemat",
    "pricing.student.featuresTitle": "Semua fitur template, plus",
    "pricing.student.f1": "Harga spesial pelajar dan mahasiswa",
    "pricing.student.f2": "Cocok untuk CV digital dan personal branding",
    "pricing.student.f3": "Bisa disesuaikan dengan kebutuhan",
    "pricing.student.f4": "Konsultasi awal melalui WhatsApp",
    "pricing.student.button": "Klaim Diskon Pelajar",
    "pricing.student.disclaimer":
      "Status pelajar/mahasiswa dapat diminta untuk diverifikasi saat pemesanan. Harga dan cakupan produk perlu dikonfirmasi sebelum pembayaran.",
    "pricing.custom.title": "Butuh website custom?",
    "pricing.custom.desc":
      "Untuk company profile, landing page, atau kebutuhan khusus, harga dapat disesuaikan dengan ruang lingkup proyek.",
    "pricing.custom.link": "Minta penawaran",

    // Contact - hero
    "contact.eyebrow": "HUBUNGI KAMI",
    "contact.h1a": "Yuk bangun sesuatu",
    "contact.h1b": "yang bermakna.",
    "contact.hero.desc":
      "Punya ide website atau masih bingung mulai dari mana? Ceritakan kebutuhan kamu, dan kita diskusikan bersama.",

    // Contact - info
    "contact.info.eyebrow": "MARI TERHUBUNG",
    "contact.info.title": "Ceritakan ide besar kamu berikutnya.",
    "contact.info.desc":
      "Isi formulir di samping. Informasi yang kamu masukkan akan disusun menjadi pesan WhatsApp agar lebih mudah dikirim.",
    "contact.whatsapp": "WhatsApp",
    "contact.focus.label": "Fokus kami",
    "contact.focus.value": "Website & Solusi Digital",
    "contact.inquiry.label": "Konsultasi project",
    "contact.inquiry.value": "Dengan janji temu",
    "contact.note": "Diskusi awal untuk memahami kebutuhan project.",

    // Contact - form
    "contact.form.eyebrow": "KONSULTASI PROJECT",
    "contact.form.title": "Ceritakan apa yang kamu butuhkan.",
    "contact.form.required": "Kolom bertanda * wajib diisi.",
    "contact.field.name": "Nama lengkap *",
    "contact.field.namePh": "Nama kamu",
    "contact.field.email": "Email",
    "contact.field.service": "Layanan yang dibutuhkan *",
    "contact.field.budget": "Estimasi budget",
    "contact.field.message": "Ceritakan project kamu *",
    "contact.field.messagePh":
      "Contoh: Saya ingin membuat website company profile untuk bisnis...",
    "contact.service.company": "Company Profile",
    "contact.service.landing": "Landing Page",
    "contact.service.portfolio": "Personal Portfolio",
    "contact.service.ecommerce": "E-commerce",
    "contact.service.webapp": "Web Application",
    "contact.service.maintenance": "Website Maintenance",
    "contact.service.other": "Lainnya",
    "contact.budget.none": "Belum ditentukan",
    "contact.budget.b1": "Di bawah Rp500.000",
    "contact.budget.b2": "Rp500.000–Rp1.500.000",
    "contact.budget.b3": "Rp1.500.000–Rp3.000.000",
    "contact.budget.b4": "Di atas Rp3.000.000",
    "contact.submit": "Kirim via WhatsApp",
    "contact.privacy":
      "Formulir ini tidak menyimpan data ke server. Saat dikirim, browser akan membuka WhatsApp dengan pesan yang sudah disiapkan.",
  },
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.about": "About",
    "nav.portfolio": "Portfolio",
    "nav.pricing": "Pricelist",
    "nav.contact": "Contact",
    "nav.cta": "Let's Talk",
    "nav.tagline": "Digital Solutions",
    "nav.openMenu": "Open menu",
    "nav.closeMenu": "Close menu",
    "nav.language": "Switch language",
    "nav.mainNav": "Main navigation",

    // Home - hero
    "home.badge": "Your Digital Partner",
    "home.h1a": "We build websites",
    "home.h1b": "that make your",
    "home.h1c": "ideas happen.",
    "home.desc":
      "B.Site helps businesses and individuals build their digital presence through modern, functional, and responsive websites.",
    "home.startProject": "Start a Project",
    "home.viewPortfolio": "View Portfolio",
    "home.point1": "Responsive design",
    "home.point2": "Modern development",

    // Home - visual card
    "home.visual.url": "yourwebsite.site",
    "home.visual.label": "DIGITAL EXPERIENCE",
    "home.visual.h1": "Make your",
    "home.visual.h2": "next move.",
    "home.visual.cta": "Explore more",
    "home.visual.step1": "Design",
    "home.visual.step2": "Develop",
    "home.visual.step3": "Launch",
    "home.float1.title": "Clean Code",
    "home.float1.sub": "Built with purpose",
    "home.float2.title": "100% Responsive",
    "home.float2.sub": "Across your devices",

    // Home - trust strip
    "home.strip1": "IDEA",
    "home.strip2": "DESIGN",
    "home.strip3": "DEVELOPMENT",
    "home.strip4": "LAUNCH",

    // Home - services
    "home.services.eyebrow": "WHAT WE DO",
    "home.services.title": "Everything you need to go digital.",
    "home.services.desc":
      "From the first idea to a website that's ready to use, we focus on clear and meaningful experiences.",
    "home.service1.title": "Website Design",
    "home.service1.desc":
      "A professional, consistent, and comfortable-to-use website look.",
    "home.service2.title": "Web Development",
    "home.service2.desc":
      "Websites built around your needs and business goals.",
    "home.service3.title": "Responsive Website",
    "home.service3.desc":
      "An experience that stays smooth on desktop, tablet, and smartphone.",
    "home.learnMore": "Learn more",

    // Home - CTA
    "home.cta.eyebrow": "HAVE A PROJECT IN MIND?",
    "home.cta.title": "Let's turn your idea into reality.",
    "home.cta.desc": "Tell us what your website needs. We'll start from there.",
    "home.cta.button": "Contact Us",

    // About - hero
    "about.eyebrow": "ABOUT B.SITE",
    "about.h1a": "Digital solutions,",
    "about.h1b": "made with purpose.",
    "about.hero.desc":
      "We believe a good website isn't just about looks, but about how it helps you reach your goals.",

    // About - art card
    "about.art.eyebrow": "BUILD SOMETHING BETTER",
    "about.art.title": "Ideas deserve a place online.",
    "about.art.caption": "DESIGN · DEVELOP · DELIVER",
    "about.badge1": "From idea",
    "about.badge2": "to digital",

    // About - who we are
    "about.who.eyebrow": "WHO WE ARE",
    "about.who.title": "We make the web work for you.",
    "about.who.p1":
      "B.Site is a website development brand focused on modern design, relevant functionality, and a comfortable user experience.",
    "about.who.p2":
      "We want to help businesses, organizations, students, and individuals have a digital space that fits their needs.",
    "about.who.p3":
      "Every project starts with understanding your needs, defining the structure, building the look, and making sure the website works well.",
    "about.who.button": "Discuss Your Project",

    // About - principles
    "about.principles.eyebrow": "OUR PRINCIPLES",
    "about.principles.title": "What guides our work.",
    "about.principles.desc":
      "The principles behind our approach to building websites.",
    "about.value1.title": "Purpose-driven",
    "about.value1.text":
      "Every website is built with a clear goal and the needs of its users in focus.",
    "about.value2.title": "Thoughtful design",
    "about.value2.text":
      "A neat, consistent look that helps visitors understand information.",
    "about.value3.title": "Reliable delivery",
    "about.value3.text":
      "We prioritize clear communication and a well-directed working process.",
    "about.value4.title": "Built to grow",
    "about.value4.text":
      "The website structure is designed to be extended as your needs grow.",

    // Portfolio
    "portfolio.eyebrow": "OUR PORTFOLIO",
    "portfolio.h1a": "Work that brings",
    "portfolio.h1b": "ideas to life.",
    "portfolio.hero.desc":
      "See live website previews and open the original version to explore each website in full.",
    "portfolio.note":
      "Some websites restrict embedding through iframes. Use the \"Open Website\" button if the preview isn't available.",
    "portfolio.cta.title": "Have a project you want to build?",
    "portfolio.cta.desc":
      "Your next website could be something we create together.",
    "portfolio.cta.button": "Start a Project",
    "portfolio.disclaimer":
      "Project data in this demo still uses sample websites. Replace the URLs and descriptions with real projects before publishing.",

    // Pricing
    "pricing.eyebrow": "PRICELIST",
    "pricing.h1a": "Simple pricing.",
    "pricing.h1b": "Real possibilities.",
    "pricing.hero.desc":
      "Choose the website solution that fits your needs. These demo prices can be adjusted to B.Site's actual products and services.",
    "pricing.intro.eyebrow": "DIGITAL PRODUCT",
    "pricing.intro.title": "Start with a portfolio.",
    "pricing.intro.desc":
      "A portfolio website to introduce yourself, showcase your work, and build your personal brand.",
    "pricing.perTemplate": "/ template",
    "pricing.features.title": "What you get",
    "pricing.regular.button": "Order at Regular Price",
    "pricing.student.ribbon": "STUDENT OFFER",
    "pricing.student.label": "Special for students",
    "pricing.student.title": "Student Portfolio",
    "pricing.student.desc":
      "Showcase your identity, organizational experience, certificates, skills, and projects in a single website.",
    "pricing.save": "Save",
    "pricing.student.featuresTitle": "All template features, plus",
    "pricing.student.f1": "Special price for school and university students",
    "pricing.student.f2": "Great for a digital CV and personal branding",
    "pricing.student.f3": "Can be customized to your needs",
    "pricing.student.f4": "Initial consultation via WhatsApp",
    "pricing.student.button": "Claim Student Discount",
    "pricing.student.disclaimer":
      "Student status may be verified when ordering. Prices and product scope should be confirmed before payment.",
    "pricing.custom.title": "Need a custom website?",
    "pricing.custom.desc":
      "For company profiles, landing pages, or special requirements, pricing can be adjusted to the scope of the project.",
    "pricing.custom.link": "Request a quote",

    // Contact - hero
    "contact.eyebrow": "CONTACT US",
    "contact.h1a": "Let's build something",
    "contact.h1b": "meaningful.",
    "contact.hero.desc":
      "Have a website idea or not sure where to start? Tell us what you need, and we'll talk it through together.",

    // Contact - info
    "contact.info.eyebrow": "LET'S CONNECT",
    "contact.info.title": "Tell us about your next big idea.",
    "contact.info.desc":
      "Fill in the form next to this. The details you enter will be put together as a WhatsApp message so it's easier to send.",
    "contact.whatsapp": "WhatsApp",
    "contact.focus.label": "Our focus",
    "contact.focus.value": "Website & Digital Solutions",
    "contact.inquiry.label": "Project inquiry",
    "contact.inquiry.value": "By appointment",
    "contact.note": "An initial discussion to understand your project needs.",

    // Contact - form
    "contact.form.eyebrow": "PROJECT INQUIRY",
    "contact.form.title": "Tell us what you need.",
    "contact.form.required": "Fields marked with * are required.",
    "contact.field.name": "Full name *",
    "contact.field.namePh": "Your name",
    "contact.field.email": "Email",
    "contact.field.service": "Service needed *",
    "contact.field.budget": "Estimated budget",
    "contact.field.message": "Tell us about your project *",
    "contact.field.messagePh":
      "Example: I'd like to build a company profile website for my business...",
    "contact.service.company": "Company Profile",
    "contact.service.landing": "Landing Page",
    "contact.service.portfolio": "Personal Portfolio",
    "contact.service.ecommerce": "E-commerce",
    "contact.service.webapp": "Web Application",
    "contact.service.maintenance": "Website Maintenance",
    "contact.service.other": "Other",
    "contact.budget.none": "Not decided yet",
    "contact.budget.b1": "Under Rp500,000",
    "contact.budget.b2": "Rp500,000–Rp1,500,000",
    "contact.budget.b3": "Rp1,500,000–Rp3,000,000",
    "contact.budget.b4": "Over Rp3,000,000",
    "contact.submit": "Send via WhatsApp",
    "contact.privacy":
      "This form doesn't store any data on a server. When you submit, your browser will open WhatsApp with a prepared message.",
  },
};

const STORAGE_KEY = "bsite-lang";
const DEFAULT_LANG = "id";

const LanguageContext = createContext(null);

function getInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "id" || saved === "en") return saved;
  } catch {
    /* localStorage tidak tersedia */
  }
  if (typeof navigator !== "undefined") {
    return navigator.language?.toLowerCase().startsWith("id")
      ? "id"
      : "en";
  }
  return DEFAULT_LANG;
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* abaikan */
    }
  }, [lang]);

  const setLang = useCallback((next) => {
    if (next === "id" || next === "en") setLangState(next);
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => (prev === "id" ? "en" : "id"));
  }, []);

  const t = useCallback(
    (key) => translations[lang]?.[key] ?? translations[DEFAULT_LANG][key] ?? key,
    [lang]
  );

  const value = useMemo(
    () => ({ lang, setLang, toggleLang, t }),
    [lang, setLang, toggleLang, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage harus dipakai di dalam <LanguageProvider>");
  }
  return ctx;
}