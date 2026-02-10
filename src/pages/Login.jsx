import { useState } from "react"
import { supabase } from "../supabase-client"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const login = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      alert(error.message)
    } else {
      alert("Logged in successfully")
    }
  }

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google"
    })

    if (error) {
      alert(error.message)
    }
  }

  return (
    <div className="bg-zinc-900 min-h-screen flex items-center justify-center text-white">
      <div className="bg-zinc-800 p-8 rounded w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          className="w-full p-2 mb-3 text-black"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 mb-4 text-black"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-red-600 py-2 uppercase tracking-wider mb-3"
        >
          Login
        </button>

        <button
          onClick={loginWithGoogle}
          className="w-full bg-white text-black py-2 uppercase tracking-wider flex items-center justify-center gap-2"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  )
}

export default Login
