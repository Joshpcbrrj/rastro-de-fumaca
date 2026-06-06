'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
    } else {
      router.push('/admin')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-950">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gold-500/20 to-gold-400/20 border-2 border-gold-500/50 flex items-center justify-center mb-4">
            <span className="text-2xl">🔐</span>
          </div>
          <h1 className="text-2xl font-serif text-gold-400">Acesso Administrativo</h1>
          <p className="text-paper-200/50 text-sm mt-2">Entre com suas credenciais</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-paper-200/70 mb-1">E-mail</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-navy-800 border border-gold-400/30 rounded-lg px-4 py-2 text-paper-100 focus:outline-none focus:border-gold-400" required />
          </div>

          <div>
            <label className="block text-sm text-paper-200/70 mb-1">Senha</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-navy-800 border border-gold-400/30 rounded-lg px-4 py-2 text-paper-100 focus:outline-none focus:border-gold-400" required />
          </div>

          {error && (<div className="text-red-400 text-sm text-center">{error}</div>)}

          <button type="submit" disabled={loading} className="w-full bg-gold-500 text-navy-950 py-2 rounded-lg font-bold hover:bg-gold-400 transition disabled:opacity-50">{loading ? 'Entrando...' : 'Entrar'}</button>
        </form>
      </div>
    </div>
  )
}
