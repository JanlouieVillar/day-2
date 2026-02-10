import { useState } from 'react'
import { supabase } from '../supabase-client'

function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const signup = async () => {
    await supabase.auth.signUp({ email, password })
    alert('Signup successful')
  }

  return (
    <div className="p-10 bg-zinc-900 min-h-screen text-white">
      <h1 className="text-2xl mb-4">Sign Up</h1>
      <input
        className="block mb-2 p-2 text-black"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="block mb-2 p-2 text-black"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={signup} className="bg-red-600 px-4 py-2">
        Sign Up
      </button>
    </div>
  )
}

export default Signup
