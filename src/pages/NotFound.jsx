
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found-number">404</div>
      <span className="eyebrow">PAGE NOT FOUND</span>
      <h1>Looks like you're lost.</h1>
      <p>
        Halaman yang kamu cari mungkin sudah dipindahkan atau alamatnya salah.
      </p>
      <Link to="/" className="button button-primary">
        <ArrowLeft size={17} /> Kembali ke Home
      </Link>
    </section>
  );
}
