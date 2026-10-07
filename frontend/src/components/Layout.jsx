import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, UserRound, LogOut, LayoutDashboard } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Layout({ children }) {
  const { count } = useCart();
  const { user, logout } = useAuth();
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function submitSearch(e) {
    e.preventDefault();
    navigate(`/shop${query.trim() ? `?search=${encodeURIComponent(query.trim())}` : ""}`);
  }

  return (
    <div className="app-shell">
      <header className="header">
        <div className="container nav">
          <Link className="brand" to="/">
            <span className="brand-mark">N</span>
            <span>Nexa<span>Commerce</span></span>
          </Link>

          <nav className="nav-links">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            {user?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
          </nav>

          <form className="search" onSubmit={submitSearch}>
            <Search size={18} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
            />
          </form>

          <div className="nav-actions">
            <Link className="icon-button cart-button" to="/cart" aria-label="Shopping cart">
              <ShoppingBag size={20} />
              {count > 0 && <span>{count}</span>}
            </Link>

            {user ? (
              <div className="user-menu">
                <Link className="icon-button" to="/account" title={user.name}>
                  <UserRound size={20} />
                </Link>
                <button className="icon-button" onClick={logout} title="Log out">
                  <LogOut size={19} />
                </button>
                {user.role === "admin" && (
                  <Link className="icon-button" to="/admin" title="Dashboard">
                    <LayoutDashboard size={19} />
                  </Link>
                )}
              </div>
            ) : (
              <Link className="login-link" to="/login">Login</Link>
            )}
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div className="container footer-grid">
          <div>
            <div className="brand footer-brand"><span className="brand-mark">N</span><span>Nexa<span>Commerce</span></span></div>
            <p>Thoughtfully built shopping for everyday life.</p>
          </div>
          <div><strong>Shop</strong><Link to="/shop">All products</Link><Link to="/cart">Shopping cart</Link></div>
          <div><strong>Account</strong><Link to={user ? "/account" : "/login"}>{user ? "My account" : "Sign in"}</Link><Link to="/orders">Orders</Link></div>
        </div>
        <div className="container footer-bottom">© {new Date().getFullYear()} Nexa Commerce. All rights reserved.</div>
      </footer>
    </div>
  );
}
