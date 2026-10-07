import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { api } from "../api";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: user?.name || "", phone: "", address: "", city: "Karachi", postalCode: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!items.length) {
    navigate("/cart");
    return null;
  }

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const order = await api("/orders", {
        method: "POST",
        body: JSON.stringify({
          items: items.map(({ productId, quantity }) => ({ productId, quantity })),
          shipping: form
        })
      });
      clearCart();
      navigate(`/orders?success=${order._id}`);
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section container checkout-page">
      <button className="back-link plain" onClick={() => navigate(-1)}><ArrowLeft size={17}/> Back</button>
      <div className="checkout-grid">
        <form className="form-card" onSubmit={submit}>
          <div className="eyebrow">Secure checkout</div><h1>Delivery details</h1>
          {error && <div className="form-error">{error}</div>}
          <div className="form-grid">
            <label>Full name<input name="fullName" value={form.fullName} onChange={change} required /></label>
            <label>Phone number<input name="phone" value={form.phone} onChange={change} required placeholder="03XX XXXXXXX" /></label>
            <label className="wide">Address<textarea name="address" value={form.address} onChange={change} required rows="3" /></label>
            <label>City<input name="city" value={form.city} onChange={change} required /></label>
            <label>Postal code<input name="postalCode" value={form.postalCode} onChange={change} required /></label>
          </div>
          <div className="payment-choice"><div><strong>Cash on delivery</strong><span>Pay when your order arrives.</span></div><span className="radio active">✓</span></div>
          <button className="button button-dark button-large full" disabled={submitting}>{submitting ? "Placing order..." : "Place order"}</button>
          <p className="secure-note"><ShieldCheck size={16}/> Your order is secured by authenticated checkout.</p>
        </form>
        <aside className="summary-card checkout-summary"><h2>Review</h2>{items.map((item) => <div className="review-item" key={item.productId}><img src={item.image} alt=""/><span>{item.name}<small>Qty {item.quantity}</small></span><strong>Rs. {(item.price * item.quantity).toLocaleString()}</strong></div>)}<hr/><div className="summary-total"><span>Total</span><strong>Rs. {subtotal.toLocaleString()}</strong></div></aside>
      </div>
    </section>
  );
}
