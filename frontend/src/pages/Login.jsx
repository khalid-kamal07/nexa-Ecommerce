import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault(); setError(""); setLoading(true);
    try { await login(form.email, form.password); navigate(location.state?.from || "/account", { replace: true }); }
    catch (e) { setError(e.message); } finally { setLoading(false); }
  }

  return <AuthLayout title="Welcome back" subtitle="Sign in to manage your orders and continue shopping.">
    <form className="auth-form" onSubmit={submit}>
      {error && <div className="form-error">{error}</div>}
      <label>Email<input type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} required /></label>
      <label>Password<input type="password" value={form.password} onChange={e => setForm({...form, password:e.target.value})} required /></label>
      <button className="button button-dark button-large full" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
      <p className="auth-switch">New to Nexa? <Link to="/register">Create an account</Link></p>
    </form>
  </AuthLayout>;
}

export function AuthLayout({ title, subtitle, children }) {
  return <section className="auth-page"><div className="auth-art"><div className="auth-overlay"><div className="brand"><span className="brand-mark">N</span><span>Nexa<span>Commerce</span></span></div><h1>Shopping,<br/><em>made calm.</em></h1><p>Good products. Clear choices. No unnecessary noise.</p></div></div><div className="auth-panel"><div className="auth-box"><div className="eyebrow">Your account</div><h2>{title}</h2><p>{subtitle}</p>{children}</div></div></section>;
}
