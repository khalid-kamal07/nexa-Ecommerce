import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Truck, Headphones, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../api";
import ProductCard from "../components/ProductCard";

const categories = [
  ["Electronics", "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=700&q=80"],
  ["Fashion", "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=700&q=80"],
  ["Home", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=80"],
  ["Sports", "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=700&q=80"]
];

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api("/products?featured=true").then(setProducts).catch(console.error);
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <div className="pill"><Sparkles size={15} /> Curated for modern living</div>
            <h1>Better things.<br /><em>Simply</em> chosen.</h1>
            <p>Discover useful products, timeless style and everyday essentials — all in one thoughtfully designed store.</p>
            <div className="hero-actions">
              <Link className="button button-dark" to="/shop">Explore collection <ArrowRight size={18} /></Link>
              <Link className="text-link" to="/shop?category=Fashion">Shop fashion</Link>
            </div>
          </div>
          <div className="hero-art">
            <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=88" alt="Modern retail interior" />
            <div className="hero-card">
              <span>01</span>
              <strong>New season</strong>
              <small>Designed to last</small>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-grid">
          <div><Truck size={21}/><span><strong>Fast delivery</strong><small>Across Pakistan</small></span></div>
          <div><ShieldCheck size={21}/><span><strong>Secure checkout</strong><small>Your data stays protected</small></span></div>
          <div><Headphones size={21}/><span><strong>Human support</strong><small>We're here when you need us</small></span></div>
        </div>
      </section>

      <section className="section container">
        <div className="section-head"><div><div className="eyebrow">Browse by mood</div><h2>Find your category</h2></div><Link className="text-link" to="/shop">View all <ArrowRight size={16}/></Link></div>
        <div className="category-grid">
          {categories.map(([name, image]) => (
            <Link to={`/shop?category=${name}`} className="category-card" key={name}>
              <img src={image} alt={name} />
              <div><span>{name}</span><ArrowRight size={19}/></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="section-head"><div><div className="eyebrow">Handpicked</div><h2>Featured products</h2></div><Link className="text-link" to="/shop">See collection <ArrowRight size={16}/></Link></div>
          <div className="product-grid">
            {products.map((product) => <ProductCard key={product._id} product={product} />)}
          </div>
        </div>
      </section>

      <section className="container editorial">
        <div className="editorial-image"><img src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1000&q=85" alt="Minimal workspace" /></div>
        <div className="editorial-copy"><div className="eyebrow">The Nexa approach</div><h2>Less noise.<br />More <em>good stuff.</em></h2><p>We believe online shopping should feel calm. So the catalog stays focused, the experience stays fast, and every product has a reason to be here.</p><Link className="button button-dark" to="/shop">Start shopping <ArrowRight size={18}/></Link></div>
      </section>
    </>
  );
}
