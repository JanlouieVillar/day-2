function Checkout() {
  return (
    <div className="bg-zinc-900 text-white min-h-screen px-10 py-16">
      <h1 className="text-3xl font-bold mb-4">
        Checkout
      </h1>

      <p className="text-gray-400 mb-6">
        Please log in to proceed with checkout.
      </p>

      <button className="bg-red-600 px-6 py-3 uppercase tracking-wider">
        Login to Continue
      </button>
    </div>
  )
}

export default Checkout
