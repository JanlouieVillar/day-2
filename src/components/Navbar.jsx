import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../supabase-client"
import logo from "../assets/logo.png" 

function Navbar() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // check current session
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null)
    })

    // listen for login or logout changes
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    alert("Logged out")
  }

  return (
    <nav className="bg-gray-200 text-black px-10 py-5 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-3">
        <img
          src={logo}
          alt="Luzon Music Studio Logo"
          className="h-16 w-auto object-contain"
        />
        <span className="text-2xl font-extrabold tracking-wide">
          LUZON MUSIC STUDIO
        </span>
      </Link>

      <div className="space-x-6 text-sm uppercase tracking-wider flex items-center">
        <Link to="/" className="hover:text-red-500">Shop</Link>
        <Link to="/cart" className="hover:text-red-500">Cart</Link>
        <Link to="/admin" className="hover:text-red-500">Admin</Link>

        {user ? (
          <>
            <span className="normal-case text-xs mr-2">
              {user.email}
            </span>

            <button
              onClick={logout}
              className="hover:text-red-500"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:text-red-500">Login</Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
