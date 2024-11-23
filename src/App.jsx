import { Link, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { useAppProvider } from "./context/Context";
import AdminDashboard from "./components/admin/AdminDashboard";
import VendorDashboard from "./components/vendor/VendorDashboard";
import Profile from "./components/customer/Profile";
import GuestRoutes from "./routes/GuestRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import Shop from "./components/pages/Shop";
import Categories from "./components/pages/Categories";
import Contact from "./components/pages/Contact";
import About from "./components/pages/About";
import Orders from "./components/customer/Orders";
import Wishlist from "./components/customer/Wishlist";
import Cart from "./components/customer/Cart";
import Products from "./components/vendor/Products";
import AddProduct from "./components/vendor/AddProduct";
import VendorOrders from "./components/vendor/Orders";
import Create from "./components/pages/categories/Create";
import Edit from "./components/pages/categories/Edit";
import ManageUser from "./components/admin/ManageUser";
import ManageProducts from "./components/admin/ManageProducts";
import AdminLayout from "./components/admin/AdminLayout";
import ManageCategories from "./components/admin/ManageCategories";
import VendorLayout from "./components/vendor/VendorLayout";
import Settings from "./components/vendor/Settings";
import Show from "./components/vendor/Show";

export default function App() {
  const { user, logout, role } = useAppProvider();

  return (
    <div className="bg-slate-200 min-h-screen">
      <header className="bg-indigo-900 ">
        <nav className="max-w-7xl  mx-auto flex justify-between items-center text-slate-200 py-6 ">
          <p className="text-2xl flex-1 font-bold">Laravel-react</p>
          <div className="flex-2 text-end">
            <ul className="flex justify-center items-center gap-6 text-md font-semibold">
              <li className="hover:text-slate-100 hover:scale-110 hover:bg-slate-500 px-1 py-2 rounded-md">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-slate-100 hover:scale-110 hover:bg-slate-500 px-1 py-2 rounded-md">
                <Link to="/shop">Shop</Link>
              </li>
              <li className="hover:text-slate-100 hover:scale-110 hover:bg-slate-500 px-1 py-2 rounded-md">
                <Link>Categories</Link>
              </li>
              <li className="hover:text-slate-100 hover:scale-110 hover:bg-slate-500 px-1 py-2 rounded-md">
                <Link to="/about">About Us</Link>
              </li>{" "}
              <li className="hover:text-slate-100 hover:scale-110 hover:bg-slate-500 px-1 py-2 rounded-md">
                <Link to="/contact">Contact Us</Link>
              </li>
              {user ? (
                <>
                  {role === "customer" && (
                    <>
                      <li className="hover:text-slate-100 hover:scale-110 hover:bg-slate-500 px-1 py-2 rounded-md">
                        <Link to="/customer/orders">Orders</Link>
                      </li>
                      <li className="hover:text-slate-100 hover:scale-110 hover:bg-slate-500 px-1 py-2 rounded-md">
                        <Link to="/customer/wishlist">Wishlist</Link>
                      </li>
                      <li className="hover:text-slate-100 hover:scale-110 hover:bg-slate-500 px-1 py-2 rounded-md">
                        <Link to="/customer/cart">Cart</Link>
                      </li>
                    </>
                  )}

                  <li className="hover:text-slate-100 hover:scale-110 hover:bg-slate-500 px-1 py-2 rounded-md">
                    {role == "customer" ? (
                      <Link to="customer/profile">{user?.name}</Link>
                    ) : (
                      <Link to={`/${role}`}>{user?.name}</Link>
                    )}
                  </li>

                  <li className="hover:text-slate-100 hover:scale-110 hover:bg-slate-500 px-1 py-2 rounded-md">
                    <button onClick={() => logout()}>Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="hover:text-slate-100 hover:scale-110 hover:bg-slate-500 px-1 py-2 rounded-md">
                    <Link to="/login">Login</Link>
                  </li>

                  <li className="hover:text-slate-100 hover:scale-110 hover:bg-slate-500 px-1 py-2 rounded-md">
                    <Link to="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </header>
      <section className="max-w-7xl mx-auto mt-4">
        <Routes>
          <Route path="*" element={<div>404 not Found!</div>} />
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/create" element={<Create />} />
          <Route path={`/categories/edit/:id`} element={<Edit />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />

          {/* Guest Routes */}
          <Route element={<GuestRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<ProtectedRoutes allowedRoles={["0"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<ManageUser />} />
              <Route path="products" element={<ManageProducts />} />
              <Route path="categories" element={<ManageCategories />} />
            </Route>
          </Route>

          {/* Vendor Routes */}
          <Route element={<ProtectedRoutes allowedRoles={["1"]} />}>
            <Route path="/vendor" element={<VendorLayout />}>
              <Route index element={<VendorDashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="show/:id" element={<Show />} />
              <Route path="add-product" element={<AddProduct />} />
              <Route path="orders" element={<VendorOrders />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

          {/* Customer Routes */}
          <Route element={<ProtectedRoutes allowedRoles={["2"]} />}>
            <Route path="/customer/profile" element={<Profile />} />
            <Route path="/customer/orders" element={<Orders />} />
            <Route path="/customer/wishlist" element={<Wishlist />} />
            <Route path="/customer/cart" element={<Cart />} />
          </Route>
        </Routes>
      </section>
    </div>
  );
}
