import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const VendorLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-900 text-white ">
        <div className="p-4 text-center font-bold text-xl border-b border-gray-700">
          Vendor Dashboard
        </div>
        <nav className="mt-4">
          <ul>
            <NavLink to="/vendor" end>
              <li className="py-2 px-4 hover:bg-blue-700">Dashboard</li>
            </NavLink>

            <NavLink to="/vendor/products">
              <li className="py-2 px-4 hover:bg-blue-700">Products</li>
            </NavLink>
            <NavLink to="/vendor/orders">
              <li className="py-2 px-4 hover:bg-blue-700">Orders</li>
            </NavLink>
            <NavLink to="/vendor/settings">
              <li className="py-2 px-4 hover:bg-blue-700">Settings</li>
            </NavLink>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1  overflow-y-scroll">
        <header className="h-16 bg-white flex items-center justify-between px-6 shadow">
          <div>Search...</div>
          <div>Profile | Logout</div>
        </header>
        <div className="p-6 ">
          <Outlet /> {/* Nested Route Content Renders Here */}
        </div>
      </main>
    </div>
  );
};

export default VendorLayout;
