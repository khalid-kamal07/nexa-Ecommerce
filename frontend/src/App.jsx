import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Account from "./pages/Account";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";

export default function App() {
  return <Layout><Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/shop" element={<Shop/>}/>
    <Route path="/products/:id" element={<ProductDetails/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/checkout" element={<ProtectedRoute><Checkout/></ProtectedRoute>}/>
    <Route path="/account" element={<ProtectedRoute><Account/></ProtectedRoute>}/>
    <Route path="/orders" element={<ProtectedRoute><Orders/></ProtectedRoute>}/>
    <Route path="/admin" element={<ProtectedRoute admin><Admin/></ProtectedRoute>}/>
    <Route path="*" element={<Home/>}/>
  </Routes></Layout>;
}
