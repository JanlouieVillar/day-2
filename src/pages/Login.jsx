import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "../supabase-client"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const login = async () => {
    // 1️ Sign in with Supabase
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      alert(error.message)
      return
    }

    const user = data.user

    if (!user) {
      alert("No user found")
      return
    }

    // 2️ Get role from profiles table
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    if (profileError) {
      alert(profileError.message)
      return
    }

    // 3️ Redirect based on role
    if (profile.role === "admin") {
      navigate("/admin") // Admin Dashboard
    } else {
      navigate("/") // Normal User Home
    }
  }

  const loginWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin,
      },
    })

    if (error) alert(error.message)
  }

  return (
    <div className="bg-zinc-900 min-h-screen flex items-center justify-center">
      <div className="bg-zinc-800 p-6 w-80 text-white">
        <h1 className="text-xl mb-4 text-center">Login</h1>

        <input
          className="w-full p-2 mb-2 text-black"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-3 text-black"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-red-600 p-2 mb-2"
          onClick={login}
        >
          Login
        </button>

        <button
          className="w-full bg-white text-black p-2"
          onClick={loginWithGoogle}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  )
}

export default Login
