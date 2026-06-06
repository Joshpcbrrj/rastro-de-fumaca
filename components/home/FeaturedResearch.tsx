'use client'

import { useState } from 'react'
import { ArticleCard } from '../articles/ArticleCard'
import { ArticleModal } from '../articles/ArticleModal'
import { mockArticles } from '../../data/mockArticles'

export function FeaturedResearch() {
  const [selectedArticle, setSelectedArticle] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const featuredArticles = mockArticles.filter((a) => a.featured)

  const handleOpenArticle = (article: any) => {
    setSelectedArticle(article)
    setIsModalOpen(true)
  }

  return (
    <section className="py-16 bg-gradient-to-b from-transparent to-navy-900/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-serif text-gold-400 mb-2">Pesquisas em Destaque</h2>
          <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto" />
          <p className="mt-4 text-paper-200/60">Artigos e materiais recentes do acervo</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.id} title={article.title} summary={article.summary} tag={article.tag} readingTime={article.readingTime} date={article.date} imageUrl={article.imageUrl} onClick={() => handleOpenArticle(article)} />
          ))}
        </div>
      </div>

      <ArticleModal article={selectedArticle} isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setSelectedArticle(null); }} />
    </section>
  )
}
