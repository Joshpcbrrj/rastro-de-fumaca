'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface HeroRadarProps {
  title: string
  subtitle: string
}

export function HeroRadar({ title, subtitle }: HeroRadarProps) {
  useEffect(() => {
    const titleElement = document.getElementById('hero-title')
    if (titleElement) {
      titleElement.classList.add('animate-typing')
    }
  }, [])

  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px]">
          <div className="absolute inset-0 rounded-full border border-gold-500/20" />
          <div className="absolute inset-[15%] rounded-full border border-gold-500/15" />
          <div className="absolute inset-[30%] rounded-full border border-gold-500/10" />
          <div className="absolute inset-[45%] rounded-full border border-gold-500/5" />

          <div className="absolute top-1/2 left-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent origin-left animate-radar-scan" />

          <div className="absolute top-[20%] left-[30%] w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
          <div className="absolute bottom-[25%] right-[35%] w-1.5 h-1.5 bg-gold-400/70 rounded-full animate-pulse" />
          <div className="absolute top-[60%] left-[55%] w-1 h-1 bg-gold-400/50 rounded-full" />
        </div>
      </div>

      <div className="absolute right-0 bottom-0 w-1/2 max-w-md lg:max-w-lg xl:max-w-xl animate-float opacity-40 lg:opacity-60">
        <Image src="/images/branding/p47.png" alt="Republic P-47 Thunderbolt" width={600} height={400} className="w-full h-auto drop-shadow-2xl" priority />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl">
          <span className="inline-block px-3 py-1 text-xs font-mono text-gold-400 border border-gold-400/30 rounded-full mb-4">SISTEMA DE MEMÓRIA AÉREA</span>

          <h1 id="hero-title" className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif leading-tight mb-6 overflow-hidden whitespace-nowrap border-r-2 border-gold-500 w-fit" style={{ width: 'fit-content' }}>
            {title}
          </h1>

          <p className="text-lg text-paper-200/80 mb-8 max-w-xl">{subtitle}</p>

          <div className="flex flex-wrap gap-4">
            <Link href="/artigos" className="inline-flex items-center gap-2 bg-gradient-to-r from-gold-500 to-gold-400 text-navy-950 px-6 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-gold-500/20 transition-all hover:-translate-y-0.5">Ver pesquisas <span>→</span></Link>

            <Link href="/contato" className="inline-flex items-center gap-2 border border-gold-400/50 text-gold-400 px-6 py-3 rounded-full font-bold hover:bg-gold-500/10 transition-all">Enviar material histórico</Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 text-[10px] font-mono text-gold-400/40">
        <span>LAT: 22°54'S</span> | <span>LONG: 43°12'W</span> |<span>RNG: 360NM</span>
      </div>
    </section>
  )
}
