import { Link } from "react-router-dom";
import { ShoppingBag, ArrowUpRight } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <Link to={`/products/${product._id}`} className="product-image-wrap">
        <img src={product.image} alt={product.name} className="product-image" loading="lazy" />
        {product.featured && <span className="badge">Featured</span>}
        <span className="image-arrow"><ArrowUpRight size={18} /></span>
      </Link>
      <div className="product-card-body">
        <div className="eyebrow">{product.category}</div>
        <Link to={`/products/${product._id}`}><h3>{product.name}</h3></Link>
        <p className="product-description">{product.description}</p>
        <div className="product-row">
          <strong>Rs. {product.price.toLocaleString()}</strong>
          <button
            className="add-mini"
            onClick={() => addToCart(product)}
            disabled={product.stock < 1}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}
