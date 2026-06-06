'use client'

import { useState } from 'react'
import { CockpitSidebar } from '../components/layout/CockpitSidebar'
import { Menu } from 'lucide-react'
import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <html lang="pt-BR">
      {/*
        Root layout: imports global styles and mounts the cockpit sidebar.
        The mobile menu state is kept here so the sidebar can be toggled from
        any page. We intentionally keep this file a client component because
        the sidebar uses client-only hooks and interactions.
      */}
      <body className="bg-navy-950 text-paper-100 overflow-x-hidden">
        <div className="scanline hidden lg:block pointer-events-none" />
        <div className="min-h-screen">
          <CockpitSidebar
            isMobileMenuOpen={isMobileMenuOpen}
            onMobileMenuClose={() => setIsMobileMenuOpen(false)}
          />

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="fixed top-4 left-4 z-50 lg:hidden bg-navy-800/90 backdrop-blur p-2 rounded-lg border border-gold-400/30"
          >
            <Menu size={24} />
          </button>

          <main className="min-h-screen w-full lg:ml-[280px] lg:max-w-[calc(100vw-280px)]">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
