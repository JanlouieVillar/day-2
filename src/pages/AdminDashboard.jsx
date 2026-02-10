function AdminDashboard() {
  return (
    <div className="bg-zinc-900 text-white min-h-screen px-10 py-16">
      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      <div className="bg-zinc-800 p-6 rounded mb-6">
        <h2 className="font-bold mb-2">
          Product Management
        </h2>
        <p className="text-gray-400">
          Add, update, or remove products from the store.
        </p>
      </div>

      <button className="bg-red-600 px-6 py-3 uppercase tracking-wider">
        Add New Product
      </button>
    </div>
  )
}

export default AdminDashboard
