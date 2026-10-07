import { Link } from "react-router-dom";
import { LogOut, Package, ShieldCheck } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Account() {
  const { user, logout } = useAuth();
  return <section className="section container account-page">
    <div className="account-hero"><div><div className="eyebrow">My account</div><h1>Hello, {user.name.split(" ")[0]}.</h1><p>{user.email}</p></div><button className="button button-light" onClick={logout}><LogOut size={17}/> Log out</button></div>
    <div className="account-cards">
      <Link to="/orders" className="account-card"><Package/><div><h3>My orders</h3><p>View order history and status.</p></div></Link>
      {user.role === "admin" && <Link to="/admin" className="account-card"><ShieldCheck/><div><h3>Admin dashboard</h3><p>Manage products and customer orders.</p></div></Link>}
    </div>
  </section>;
}
