import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ShoppingBag, CheckCircle2 } from "lucide-react";
import { api } from "../api";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api(`/products/${id}`).then(setProduct).catch((e) => setError(e.message));
  }, [id]);

  if (error) return <div className="page-center"><div><h2>{error}</h2><Link className="text-link" to="/shop">Back to shop</Link></div></div>;
  if (!product) return <div className="page-center"><div className="spinner"/></div>;

  return (
    <section className="section container details-page">
      <Link className="back-link" to="/shop"><ArrowLeft size={17}/> Back to shop</Link>
      <div className="details-grid">
        <div className="details-image"><img src={product.image} alt={product.name}/></div>
        <div className="details-copy">
          <div className="eyebrow">{product.category}</div>
          <h1>{product.name}</h1>
          <div className="details-price">Rs. {product.price.toLocaleString()}</div>
          <p>{product.description}</p>
          <div className="stock-line">{product.stock > 0 ? <><CheckCircle2 size={17}/> {product.stock} available</> : "Out of stock"}</div>
          <button className="button button-dark button-large" onClick={() => addToCart(product)} disabled={!product.stock}>
            <ShoppingBag size={19}/> {product.stock ? "Add to cart" : "Out of stock"}
          </button>
          <div className="detail-notes"><span>Free delivery on selected orders</span><span>Cash on delivery available</span><span>Easy order tracking</span></div>
        </div>
      </div>
    </section>
  );
}
