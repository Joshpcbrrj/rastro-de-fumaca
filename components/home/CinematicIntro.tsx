'use client'

import { useState, useEffect } from 'react'
import { X, SkipForward } from 'lucide-react'

interface CinematicIntroProps {
  onComplete: () => void
  isOpen: boolean
}

export function CinematicIntro({ onComplete, isOpen }: CinematicIntroProps) {
  const [progress, setProgress] = useState(0)
  const [currentMessage, setCurrentMessage] = useState('Preparando missão histórica...')
  const [showSkip, setShowSkip] = useState(false)

  const messages = [
    'Preparando missão histórica...',
    'Carregando histórias do acervo...',
    'Abrindo o acervo digital...',
    'Ativando radar de memória...',
    'Preparando hangar histórico...',
    'Rastro de Fumaça online.',
  ]

  useEffect(() => {
    if (!isOpen) return

    let progressInterval: any
    let messageInterval: any
    let skipTimer: any

    progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          clearInterval(messageInterval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    let messageIndex = 0
    messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % messages.length
      setCurrentMessage(messages[messageIndex])
    }, 800)

    skipTimer = setTimeout(() => setShowSkip(true), 2000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(messageInterval)
      clearTimeout(skipTimer)
    }
  }, [isOpen, onComplete])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-navy-950 flex items-center justify-center">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('/images/branding/p47-silhouette.png')] bg-center bg-no-repeat bg-contain" />
        <div className="absolute inset-0 radar-screen" />
      </div>

      <div className="relative z-10 max-w-md w-full mx-4 text-center">
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-gold-500/20 to-gold-400/20 border-2 border-gold-500/50 flex items-center justify-center">
            <span className="text-3xl font-bold text-gold-400">✈️</span>
          </div>
        </div>

        <h1 className="text-3xl font-serif text-gold-400 mb-2">Rastro de Fumaça</h1>
        <p className="text-sm text-paper-200/60 mb-8">Sistema de Memória Aérea Brasileira</p>

        <p className="text-paper-100 font-mono text-sm mb-6 min-h-[60px]">{currentMessage}</p>

        <div className="w-full h-1 bg-navy-800 rounded-full overflow-hidden mb-4">
          <div className="h-full bg-gradient-to-r from-gold-500 to-gold-400 transition-all duration-100" style={{ width: `${progress}%` }} />
        </div>

        <p className="text-xs text-gold-400/70 font-mono">{progress}%</p>

        {showSkip && (
          <button onClick={onComplete} className="mt-8 flex items-center gap-2 mx-auto text-paper-200/50 hover:text-gold-400 transition-colors text-sm">
            <SkipForward size={16} />
            Pular abertura
          </button>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-gold-500/10 to-transparent" />
      </div>
    </div>
  )
}
