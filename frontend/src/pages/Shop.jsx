import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import { api } from "../api";
import ProductCard from "../components/ProductCard";

const categories = ["All", "Electronics", "Fashion", "Home", "Beauty", "Sports"];

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const search = params.get("search") || "";
  const category = params.get("category") || "All";
  const sort = params.get("sort") || "newest";

  useEffect(() => {
    setLoading(true);
    const query = new URLSearchParams();
    if (search) query.set("search", search);
    if (category !== "All") query.set("category", category);
    query.set("sort", sort);

    api(`/products?${query.toString()}`)
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [search, category, sort]);

  function setFilter(key, value) {
    const next = new URLSearchParams(params);
    if (!value || value === "All" || (key === "sort" && value === "newest")) next.delete(key);
    else next.set(key, value);
    setParams(next);
  }

  return (
    <section className="section container shop-page">
      <div className="shop-heading">
        <div><div className="eyebrow">The collection</div><h1>Shop everything</h1><p>{products.length} products to explore</p></div>
      </div>

      <div className="shop-toolbar">
        <div className="category-filters">
          <SlidersHorizontal size={18}/>
          {categories.map((item) => (
            <button key={item} className={category === item ? "active" : ""} onClick={() => setFilter("category", item)}>{item}</button>
          ))}
        </div>
        <select value={sort} onChange={(e) => setFilter("sort", e.target.value)} aria-label="Sort products">
          <option value="newest">Newest</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="name">Name: A–Z</option>
        </select>
      </div>

      {search && <div className="active-search">Showing results for <strong>“{search}”</strong><button onClick={() => setFilter("search", "")}><X size={15}/></button></div>}

      {loading ? <div className="loading-grid">{Array.from({length: 8}).map((_, i) => <div className="skeleton" key={i}/>)}</div> :
       products.length ? <div className="product-grid">{products.map((p) => <ProductCard key={p._id} product={p}/>)}</div> :
       <div className="empty-state"><h2>No products found</h2><p>Try a different search or category.</p><button className="button button-dark" onClick={() => setParams({})}>Clear filters</button></div>}
    </section>
  );
}
