import { useEffect, useState } from "react";
import { api } from "../api";
import { Package, Plus, Pencil, Trash2, X } from "lucide-react";

const blank = { name:"", description:"", price:"", category:"Electronics", image:"", stock:"10", featured:false };

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState(null);
  const [message, setMessage] = useState("");

  async function load() {
    const [p,o] = await Promise.all([api("/products?sort=newest"), api("/orders")]);
    setProducts(p); setOrders(o);
  }
  useEffect(() => { load().catch(e => setMessage(e.message)); }, []);

  function edit(product) {
    setEditing(product._id);
    setForm({...product, price:String(product.price), stock:String(product.stock)});
    window.scrollTo({top:0, behavior:"smooth"});
  }

  async function save(e) {
    e.preventDefault();
    setMessage("");
    try {
      const payload = {...form, price:Number(form.price), stock:Number(form.stock)};
      if (editing) await api(`/products/${editing}`, {method:"PUT", body:JSON.stringify(payload)});
      else await api("/products", {method:"POST", body:JSON.stringify(payload)});
      setForm(blank); setEditing(null); setMessage("Product saved successfully."); await load();
    } catch(e) { setMessage(e.message); }
  }

  async function remove(id) {
    if (!confirm("Delete this product?")) return;
    try { await api(`/products/${id}`, {method:"DELETE"}); await load(); }
    catch(e) { setMessage(e.message); }
  }

  async function updateStatus(id, status) {
    try { await api(`/orders/${id}/status`, {method:"PUT", body:JSON.stringify({status})}); await load(); }
    catch(e) { setMessage(e.message); }
  }

  return <section className="section container admin-page">
    <div className="page-title"><div className="eyebrow">Management</div><h1>Admin dashboard</h1><p>Catalog and order operations in one place.</p></div>
    {message && <div className="form-error">{message}</div>}

    <div className="admin-grid">
      <form className="form-card" onSubmit={save}>
        <div className="form-card-head"><div><div className="eyebrow">{editing ? "Edit product" : "New product"}</div><h2>{editing ? "Update product" : "Add a product"}</h2></div>{editing && <button type="button" className="icon-button" onClick={()=>{setEditing(null);setForm(blank)}}><X/></button>}</div>
        <label>Name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/></label>
        <label>Description<textarea value={form.description} onChange={e=>setForm({...form,description:e.target.value})} required rows="4"/></label>
        <div className="form-grid"><label>Price<input type="number" min="0" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} required/></label><label>Stock<input type="number" min="0" value={form.stock} onChange={e=>setForm({...form,stock:e.target.value})} required/></label></div>
        <div className="form-grid"><label>Category<select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}><option>Electronics</option><option>Fashion</option><option>Home</option><option>Beauty</option><option>Sports</option></select></label><label>Image URL<input value={form.image} onChange={e=>setForm({...form,image:e.target.value})} required/></label></div>
        <label className="check"><input type="checkbox" checked={form.featured} onChange={e=>setForm({...form,featured:e.target.checked})}/> Featured product</label>
        <button className="button button-dark full"><Plus size={17}/>{editing ? "Save changes" : "Add product"}</button>
      </form>

      <div className="admin-panel">
        <div className="panel-head"><h2>Products <span>{products.length}</span></h2></div>
        <div className="admin-table">
          {products.map(p=><div className="admin-row" key={p._id}><img src={p.image} alt=""/><div><strong>{p.name}</strong><small>{p.category} · Rs. {p.price.toLocaleString()} · {p.stock} stock</small></div><button className="icon-button" onClick={()=>edit(p)}><Pencil size={17}/></button><button className="icon-button danger" onClick={()=>remove(p._id)}><Trash2 size={17}/></button></div>)}
        </div>
      </div>
    </div>

    <div className="admin-panel orders-admin"><div className="panel-head"><h2>Orders <span>{orders.length}</span></h2></div>
      <div className="admin-table">{orders.map(o=><div className="order-admin-row" key={o._id}><div><strong>#{o._id.slice(-8).toUpperCase()} · {o.user?.name}</strong><small>{o.user?.email} · {o.items.length} item(s) · Rs. {o.total.toLocaleString()}</small></div><select value={o.status} onChange={e=>updateStatus(o._id,e.target.value)}><option>Pending</option><option>Processing</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option></select></div>)}</div>
    </div>
  </section>;
}
