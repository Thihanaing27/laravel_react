const VendorDashboard = () => {
  return (
    <div className="flex h-screen  ">
      {/* Content Area */}
      <section className="p-6  ">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Cards */}
          <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold">Products</h2>
            <p className="text-gray-600">100 Registered Users</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold">Sales</h2>
            <p className="text-gray-600">$50,000 Revenue</p>
          </div>
          <div className="p-4 bg-white shadow rounded-lg">
            <h2 className="text-lg font-semibold">Orders</h2>
            <p className="text-gray-600">200 Orders Processed</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VendorDashboard;
