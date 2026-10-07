import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AuthLayout } from "./Login";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault(); setError(""); setLoading(true);
    try { await register(form.name, form.email, form.password); navigate("/account"); }
    catch (e) { setError(e.message); } finally { setLoading(false); }
  }

  return <AuthLayout title="Create your account" subtitle="Save your orders, checkout faster and shop with ease.">
    <form className="auth-form" onSubmit={submit}>
      {error && <div className="form-error">{error}</div>}
      <label>Full name<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required minLength="2"/></label>
      <label>Email<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/></label>
      <label>Password<input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required minLength="6"/></label>
      <button className="button button-dark button-large full" disabled={loading}>{loading ? "Creating..." : "Create account"}</button>
      <p className="auth-switch">Already registered? <Link to="/login">Sign in</Link></p>
    </form>
  </AuthLayout>;
}
