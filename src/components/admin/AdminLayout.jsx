import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-900 text-white ">
        <div className="p-4 text-center font-bold text-xl border-b border-gray-700">
          Admin Dashboard
        </div>
        <nav className="mt-4">
          <ul>
            <NavLink to="/admin" end>
              <li className="py-2 px-4 hover:bg-blue-700">Dashboard</li>
            </NavLink>
            <NavLink to="/admin/users">
              <li className="py-2 px-4 hover:bg-blue-700">Users</li>
            </NavLink>
            <NavLink to="/admin/products">
              <li className="py-2 px-4 hover:bg-blue-700">Products</li>
            </NavLink>
            <NavLink to="/admin/categories">
              <li className="py-2 px-4 hover:bg-blue-700">Categories</li>
            </NavLink>
            <NavLink to="/admin/settings">
              <li className="py-2 px-4 hover:bg-blue-700">Settings</li>
            </NavLink>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1  overflow-hidden">
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

export default AdminLayout;
