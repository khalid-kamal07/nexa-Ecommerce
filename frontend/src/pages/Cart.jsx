import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, subtotal, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (!items.length) return (
    <section className="section container empty-state cart-empty">
      <div className="empty-icon">🛍</div>
      <div className="eyebrow">Your bag</div>
      <h1>Your cart is empty</h1>
      <p>Looks like you haven't added anything yet.</p>
      <Link className="button button-dark" to="/shop">Explore products <ArrowRight size={18}/></Link>
    </section>
  );

  return (
    <section className="section container cart-page">
      <div className="page-title"><div className="eyebrow">Shopping bag</div><h1>Your cart</h1></div>
      <div className="cart-layout">
        <div className="cart-list">
          {items.map((item) => (
            <div className="cart-item" key={item.productId}>
              <img src={item.image} alt={item.name}/>
              <div className="cart-item-main"><Link to={`/products/${item.productId}`}><h3>{item.name}</h3></Link><span>Rs. {item.price.toLocaleString()}</span></div>
              <div className="quantity"><button onClick={() => updateQuantity(item.productId, item.quantity - 1)}><Minus size={15}/></button><strong>{item.quantity}</strong><button onClick={() => updateQuantity(item.productId, item.quantity + 1)}><Plus size={15}/></button></div>
              <strong className="line-total">Rs. {(item.price * item.quantity).toLocaleString()}</strong>
              <button className="remove-button" onClick={() => removeFromCart(item.productId)} aria-label="Remove item"><Trash2 size={18}/></button>
            </div>
          ))}
        </div>
        <aside className="summary-card">
          <h2>Order summary</h2>
          <div><span>Subtotal</span><strong>Rs. {subtotal.toLocaleString()}</strong></div>
          <div><span>Delivery</span><strong>Calculated at checkout</strong></div>
          <hr/>
          <div className="summary-total"><span>Total</span><strong>Rs. {subtotal.toLocaleString()}</strong></div>
          <button className="button button-dark full" onClick={() => navigate("/checkout")}>Checkout <ArrowRight size={18}/></button>
          <Link className="continue-link" to="/shop">Continue shopping</Link>
        </aside>
      </div>
    </section>
  );
}
