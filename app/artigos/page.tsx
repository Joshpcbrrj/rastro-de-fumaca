import { ArticleCard } from '../../components/articles/ArticleCard'
import { mockArticles } from '../../data/mockArticles'

export const metadata = {
  title: 'Pesquisas e Artigos | Rastro de Fumaça',
  description: 'Artigos e pesquisas históricas sobre aviação brasileira, FAB e memória aérea.',
}

export default function ArtigosPage() {
  return (
    <main className="container mx-auto px-4 py-8 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-serif text-gold-400 mb-2">Pesquisas e Artigos</h1>
        <p className="text-paper-200/60">Explore o acervo de pesquisas históricas sobre a aviação brasileira</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockArticles.map((article) => (
          <ArticleCard key={article.id} title={article.title} summary={article.summary} tag={article.tag} readingTime={article.readingTime} date={article.date} imageUrl={article.imageUrl} />
        ))}
      </div>
    </main>
  )
}
