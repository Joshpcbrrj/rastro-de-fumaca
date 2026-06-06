'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Compass, BookOpen, Plane, Archive, Users, PenTool, Heart, Mail, Handshake } from 'lucide-react'

const navigation = [
  { name: 'Início', href: '/', icon: Compass },
  { name: 'Pesquisas', href: '/artigos', icon: BookOpen },
  { name: 'Aeronaves', href: '/aeronaves', icon: Plane },
  { name: 'Acervo Digital', href: '/acervo', icon: Archive },
  { name: 'Identificar', href: '/ajude-a-identificar', icon: Users },
  { name: 'Diário de Bordo', href: '/diario-familiar', icon: PenTool },
  { name: 'Família', href: '/diario-familiar', icon: Heart },
  { name: 'Parcerias', href: '/contato', icon: Handshake },
  { name: 'Contato', href: '/contato', icon: Mail },
]

interface CockpitSidebarProps {
  isMobileMenuOpen?: boolean
  onMobileMenuClose?: () => void
}

export function CockpitSidebar({ isMobileMenuOpen, onMobileMenuClose }: CockpitSidebarProps) {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const SidebarContent = () => (
    <div className="cockpit-sidebar flex h-full flex-col">
      <div className="cockpit-header">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-500 to-gold-400 flex items-center justify-center">
            <span className="text-navy-950 font-bold text-xl">FAB</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-wider">Rastro de Fumaça</h1>
            <p className="text-xs text-gold-400/70">por Joaquim Vivas</p>
          </div>
        </div>

        <div className="relative w-20 h-20 mx-auto mt-4">
          <div className="absolute inset-0 rounded-full border-2 border-gold-500/30 animate-pulse-glow" />
          <div className="absolute inset-2 rounded-full border border-gold-500/20 flex items-center justify-center">
            <span className="text-xs text-gold-400 font-mono">1945</span>
          </div>
          <div className="absolute top-1/2 left-1/2 w-1 h-8 bg-gold-500/50 origin-bottom -translate-x-1/2 -translate-y-full animate-radar-scan" />
        </div>
      </div>

      <nav className="cockpit-menu flex-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => onMobileMenuClose?.()}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                ${isActive
                  ? 'bg-gold-500/10 border-l-2 border-gold-500 text-gold-400'
                  : 'hover:bg-white/5 text-paper-200/70 hover:text-paper-100'
                }
              `}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="cockpit-footer">
        <p className="text-[10px] text-paper-200/40 font-mono">
          PAINEL DE NAVEGAÇÃO<br />
          SISTEMA DE MEMÓRIA AÉREA
        </p>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <>
        <button
          onClick={() => onMobileMenuClose?.()}
          className="fixed top-4 left-4 z-50 lg:hidden bg-navy-800/90 backdrop-blur p-2 rounded-lg border border-gold-400/30"
        >
          <Menu size={24} />
        </button>

        <div
          className={`
            fixed inset-0 z-40 lg:hidden transition-transform duration-300
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <div className="absolute inset-0 bg-black/70" onClick={onMobileMenuClose} />
          <aside className="relative w-72 h-full bg-navy-900 shadow-cockpit">
            <SidebarContent />
          </aside>
        </div>
      </>
    )
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] z-30 hidden lg:block">
      <SidebarContent />
    </aside>
  )
}
