function Home() {
  return (
    <div className="bg-zinc-900 text-white min-h-screen">
      
      
      <section className="relative px-10 py-24 text-center h-screen flex flex-col justify-center items-center overflow-hidden">
       
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black z-0"></div>

     
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
            ICONIC SOUND. MODERN STYLE.
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-8">
            Discover premium guitars and instruments crafted for musicians of all levels.
          </p>
          <button className="bg-red-600 hover:bg-red-700 text-white uppercase tracking-wider px-8 py-3 rounded shadow-lg transition">
            Shop Now
          </button>
        </div>
      </section>

      {/* PRODUCT LISTING */}
      <section className="px-10 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center md:text-left">
          Featured Instruments
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map(item => (
            <div
              key={item}
              className="bg-zinc-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
            >
              {/* Product Image */}
              <div className="h-56 bg-zinc-700 flex items-center justify-center text-gray-400 overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/guitar${item}/400/225`}
                  alt="Electric Guitar"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="p-6 flex flex-col justify-between h-56">
                <div>
                  <h3 className="text-lg font-bold mb-2">
                    Electric Guitar Model {item}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    ₱45,000
                  </p>
                </div>
                <button className="bg-red-600 hover:bg-red-700 px-4 py-2 text-sm uppercase tracking-wider rounded transition">
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
