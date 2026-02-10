function Cart() {
  return (
    <div className="bg-zinc-900 text-white min-h-screen px-10 py-16">
      <h1 className="text-3xl font-bold mb-6">
        Shopping Cart
      </h1>

      <div className="bg-zinc-800 p-6 rounded">
        <p className="text-gray-400">
          Your cart is currently empty.
        </p>
      </div>
    </div>
  )
}

export default Cart
