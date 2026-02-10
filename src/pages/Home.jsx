function Home() {
  return (
    <div className="bg-zinc-900 text-white min-h-screen">
      
      {/* HERO SECTION */}
      <section className="bg-black px-10 py-24 text-center">
        <h1 className="text-5xl font-extrabold mb-4">
          ICONIC SOUND. MODERN STYLE.
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Discover premium guitars and instruments crafted for musicians of all levels.
        </p>
      </section>

      {/* PRODUCT LISTING */}
      <section className="px-10 py-16">
        <h2 className="text-3xl font-bold mb-10">
          Featured Instruments
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map(item => (
            <div
              key={item}
              className="bg-zinc-800 rounded-lg overflow-hidden hover:scale-105 transition"
            >
              <div className="h-56 bg-zinc-700 flex items-center justify-center text-gray-400">
                Product Image
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold">
                  Electric Guitar Model
                </h3>
                <p className="text-sm text-gray-400 mb-4">
                  ₱45,000
                </p>
                <button className="bg-red-600 px-4 py-2 text-sm uppercase tracking-wider">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

export default Home
