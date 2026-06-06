'use client'

import { useState } from 'react'
import { CinematicIntro } from '../components/home/CinematicIntro'
import { FeaturedResearch } from '../components/home/FeaturedResearch'
import { HeroRadar } from '../components/home/HeroRadar'

export default function HomePage() {
  const [showCinematic, setShowCinematic] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showPassword, setShowPassword] = useState(true)

  const handlePasswordSubmit = (password: string) => {
    if (password === 'p-47') {
      setShowPassword(false)
      setTimeout(() => setShowCinematic(true), 300)
    } else {
      alert('Senha incorreta')
    }
  }

  if (showPassword) {
    return (
      <div className="fixed inset-0 bg-navy-950 flex items-center justify-center z-[200]">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-6 rounded-full border-2 border-gold-500/50 flex items-center justify-center">
            <span className="text-4xl">🔒</span>
          </div>
          <h2 className="text-2xl font-serif text-gold-400 mb-4">Acesso Restrito</h2>
          <p className="text-paper-200/60 mb-6">Digite a senha para acessar o acervo</p>
          <form onSubmit={(e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            handlePasswordSubmit(formData.get('password') as string)
          }}>
            <input
              type="password"
              name="password"
              className="bg-navy-800 border border-gold-400/30 rounded-lg px-4 py-2 text-paper-100 w-64 mb-4"
              placeholder="Senha"
              autoFocus
            />
            <br />
            <button
              type="submit"
              className="bg-gold-500 text-navy-950 px-6 py-2 rounded-lg font-bold hover:bg-gold-400 transition"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (showCinematic) {
    return (
      <CinematicIntro
        isOpen={showCinematic}
        onComplete={() => {
          setShowCinematic(false)
          setIsAuthenticated(true)
        }}
      />
    )
  }

  if (!isAuthenticated) return null

  return (
    <main>
      <HeroRadar
        title="Histórias, documentos e memórias da aviação brasileira"
        subtitle="Um museu digital dedicado à preservação da memória aérea brasileira"
      />

      <FeaturedResearch />

      <section className="container mx-auto px-4 py-16 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="section-panel p-8">
            <h2 className="text-3xl font-serif text-gold-400 mb-4">Missão</h2>
            <p className="text-paper-200/70 leading-relaxed">
              A plataforma conecta relatos, documentos e imagens para preservar a memória da aviação brasileira.
              Cada memória é apresentada como parte de uma narrativa visual que une o passado à experiência contemporânea.
            </p>
          </div>
          <div className="section-panel p-8">
            <h2 className="text-3xl font-serif text-gold-400 mb-4">Radar de História</h2>
            <p className="text-paper-200/70 leading-relaxed">
              Explore o acervo com um olhar de investigação histórica, acessando pesquisas, artigos e registros das missões da FAB.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
