function ProductDetails() {
  return (
    <div className="bg-zinc-900 text-white min-h-screen px-10 py-16">
      <div className="grid md:grid-cols-2 gap-10">
        
        <div className="bg-zinc-800 h-96 flex items-center justify-center text-gray-400">
          Product Image
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-4">
            Electric Guitar
          </h1>
          <p className="text-gray-400 mb-6">
            High-quality electric guitar designed for professional performance.
          </p>
          <p className="text-2xl font-bold mb-6">
            ₱45,000
          </p>

          <button className="bg-red-600 px-6 py-3 uppercase tracking-wider">
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  )
}

export default ProductDetails
