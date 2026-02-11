import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../supabase-client"
import logo from "../assets/logo.png"
import { MapPin, User, ShoppingCart, Search } from "lucide-react"

function Navbar() {
  const [user, setUser] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null)
      }
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-black text-white text-center text-xs py-2">
        Play now, pay later — Shop at LUZON MUSIC STUDIO
      </div>

      {/* Main Navbar */}
      <nav className="bg-white border-b relative z-50">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="LUZON MUSIC STUDIO"
              className="w-20 md:w-20 h-auto object-contain"
            />
          </Link>

          {/* Search Bar */}
          <div
            onClick={() => setSearchOpen(true)}
            className="hidden md:flex items-center bg-gray-100 px-5 py-2 rounded-full w-[45%] cursor-pointer"
          >
            <Search size={18} className="text-gray-500" />
            <span className="px-3 text-sm text-gray-500">
              What can we help you find?
            </span>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-6">
            <MapPin className="cursor-pointer hover:text-gray-600" size={20} />

            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-xs hidden md:block">
                  {user.email}
                </span>
                <button
                  onClick={logout}
                  className="text-xs hover:text-red-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login">
                <User className="cursor-pointer hover:text-gray-600" size={20} />
              </Link>
            )}

            <Link to="/cart">
              <ShoppingCart
                className="cursor-pointer hover:text-gray-600"
                size={20}
              />
            </Link>
          </div>
        </div>

        {/* Bottom Category Menu */}
        <div className="hidden md:flex justify-center gap-8 py-2 text-sm font-medium border-t">
          <Link to="/" className="hover:text-gray-500">New</Link>
          <Link to="/" className="hover:text-gray-500">Electric Guitars</Link>
          <Link to="/" className="hover:text-gray-500">Basses</Link>
          <Link to="/" className="hover:text-gray-500">Acoustics</Link>
          <Link to="/" className="hover:text-gray-500">Amps & Effects</Link>
          <Link to="/" className="hover:text-gray-500">Accessories</Link>
          <Link to="/" className="hover:text-gray-500">Deals</Link>
        </div>
      </nav>

      {/* SEARCH OVERLAY */}
      {searchOpen && (
        <div className="fixed inset-0 bg-white z-40 pt-20 px-10">

          {/* Top Search Bar */}
          <div className="flex items-center justify-between max-w-6xl mx-auto mb-10">
            <div className="flex items-center bg-gray-100 px-5 py-3 rounded-full w-2/3">
              <Search size={18} className="text-gray-500" />
              <input
                autoFocus
                type="text"
                placeholder="What can we help you find?"
                className="bg-transparent outline-none px-3 w-full text-sm"
              />
            </div>

            <button
              onClick={() => setSearchOpen(false)}
              className="text-sm underline"
            >
              Cancel
            </button>
          </div>

          {/* Content */}
          <div className="max-w-6xl mx-auto grid grid-cols-4 gap-10">

            {/* Suggested Searches */}
            <div>
              <h3 className="font-semibold mb-4">Suggested Searches</h3>
              <ul className="space-y-3 text-gray-600 text-sm">
                <li>New Releases</li>
                <li>Web Exclusives</li>
                <li>Limited Edition</li>
                <li>Best Sellers</li>
                <li>Beginner Guitars & Basses</li>
              </ul>
            </div>

            {/* Trending Products */}
            <div className="col-span-3">
              <h2 className="text-2xl font-semibold mb-6">
                Trending Products
              </h2>

              <div className="grid grid-cols-4 gap-6">
                {[1,2,3,4].map((item) => (
                  <div key={item} className="bg-gray-100 p-6 text-center">
                    <div className="h-40 bg-gray-200 mb-4"></div>
                    <p className="text-sm font-medium">
                      Sample Guitar Product Name
                    </p>
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
