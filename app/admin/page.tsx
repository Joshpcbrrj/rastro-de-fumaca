'use client'

import { useEffect, useState } from 'react'
import { createClient } from '../../lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FileText, Plane, Image, Users, MessageSquare, LogOut } from 'lucide-react'

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) {
        router.push('/login')
      } else {
        setUser(data.user)
      }
    })
  }, [supabase, router])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  const cards = [
    { title: 'Artigos', count: 12, icon: FileText, href: '/admin/artigos' },
    { title: 'Aeronaves', count: 8, icon: Plane, href: '/admin/aeronaves' },
    { title: 'Acervo', count: 45, icon: Image, href: '/admin/acervo' },
    { title: 'Usuários', count: 3, icon: Users, href: '/admin/usuarios' },
    { title: 'Mensagens', count: 7, icon: MessageSquare, href: '/admin/mensagens' },
  ]

  return (
    <div className="min-h-screen bg-navy-950">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-serif text-gold-400">Painel Administrativo</h1>
            <p className="text-paper-200/50">Bem-vindo,{user?.email}</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-navy-800 border border-gold-400/30 rounded-lg text-paper-200 hover:text-gold-400 transition">
            <LogOut size={18} />
            Sair
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <Link key={card.title} href={card.href} className="group rounded-panel border border-gold-400/20 bg-gradient-to-br p-6 shadow-panel transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40">
                <div className="flex items-center justify-between mb-4">
                  <Icon size={32} className="text-gold-400" />
                  <span className="text-3xl font-bold text-gold-400">{card.count}</span>
                </div>
                <h3 className="text-xl font-serif mb-2 group-hover:text-gold-400 transition">{card.title}</h3>
                <p className="text-sm text-paper-200/50">Gerenciar{card.title.toLowerCase()}</p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
