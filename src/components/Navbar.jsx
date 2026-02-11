import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../supabase-client"
import logo from "../assets/logo.png"

function Navbar() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((e, session) => {
      setUser(session?.user || null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <nav className="bg-gray-200 text-black px-6 py-4 flex justify-between">
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} className="h-14" />
        <span className="text-xl font-bold">LUZON MUSIC STUDIO</span>
      </Link>

      <div className="flex gap-4 items-center text-sm">
        <Link to="/">Shop</Link>
        <Link to="/cart">Cart</Link>

        {user ? (
          <>
            <span className="text-xs">{user.email}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar
