import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CheckCircle2, Package } from "lucide-react";
import { api } from "../api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [params] = useSearchParams();
  const success = params.get("success");

  useEffect(() => { api("/orders/my").then(setOrders).catch(console.error); }, []);

  return <section className="section container orders-page">
    {success && <div className="success-banner"><CheckCircle2/> Order placed successfully. Your order number is <strong>{success.slice(-8).toUpperCase()}</strong>.</div>}
    <div className="page-title"><div className="eyebrow">Account</div><h1>My orders</h1></div>
    {!orders.length ? <div className="empty-state"><Package size={42}/><h2>No orders yet</h2><p>Your completed purchases will appear here.</p><Link className="button button-dark" to="/shop">Start shopping</Link></div> :
      <div className="orders-list">{orders.map(order => <div className="order-card" key={order._id}><div className="order-head"><div><strong>Order #{order._id.slice(-8).toUpperCase()}</strong><small>{new Date(order.createdAt).toLocaleString()}</small></div><span className={`status status-${order.status.toLowerCase()}`}>{order.status}</span></div><div className="order-items">{order.items.map((item,i)=><div key={i}><img src={item.image} alt=""/><span>{item.name} <small>× {item.quantity}</small></span><strong>Rs. {(item.price*item.quantity).toLocaleString()}</strong></div>)}</div><div className="order-foot"><span>Payment: Cash on delivery</span><strong>Total Rs. {order.total.toLocaleString()}</strong></div></div>)}</div>}
  </section>;
}
