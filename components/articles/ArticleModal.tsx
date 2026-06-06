'use client'

import { useEffect } from 'react'
import { X, Clock, Calendar, Tag } from 'lucide-react'
import Image from 'next/image'

interface Article {
  id: string
  title: string
  content: string
  tag: string
  readingTime?: string
  date?: string
  imageUrl?: string
}

interface ArticleModalProps {
  article: Article | null
  isOpen: boolean
  onClose: () => void
}

export function ArticleModal({ article, isOpen, onClose }: ArticleModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.body.style.overflow = 'unset'
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen || !article) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative max-w-3xl w-full max-h-[90vh] overflow-y-auto bg-navy-900 rounded-panel border border-gold-400/30 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 p-2 rounded-full bg-navy-800/90 hover:bg-gold-500/20 transition-colors">
          <X size={20} />
        </button>

        <div className="p-6 lg:p-8">
          {article.imageUrl && (
            <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
              <Image src={article.imageUrl} alt={article.title} fill className="object-cover" />
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center gap-1 text-xs text-gold-400"><Tag size={12} />{article.tag}</span>
            {article.date && (<span className="inline-flex items-center gap-1 text-xs text-paper-200/50"><Calendar size={12} />{article.date}</span>)}
            {article.readingTime && (<span className="inline-flex items-center gap-1 text-xs text-paper-200/50"><Clock size={12} />{article.readingTime} de leitura</span>)}
          </div>

          <h2 className="text-2xl lg:text-3xl font-serif mb-4 text-gold-400">{article.title}</h2>

          <div className="prose prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>
        </div>
      </div>
    </div>
  )
}
