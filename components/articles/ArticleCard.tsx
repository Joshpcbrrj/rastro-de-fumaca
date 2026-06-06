import Image from 'next/image'

interface ArticleCardProps {
  title: string
  summary: string
  tag: string
  readingTime?: string
  date?: string
  imageUrl?: string
  onClick?: () => void
}

export function ArticleCard({ title, summary, tag, readingTime = '4 min', date, imageUrl, onClick }: ArticleCardProps) {
  return (
    <button onClick={onClick} className="w-full text-left group rounded-panel border border-gold-400/20 bg-white/5 p-6 shadow-panel transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40 hover:shadow-xl">
      {imageUrl && (
        <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
          <Image src={imageUrl} alt={title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
      )}

      <span className="inline-block text-xs font-mono text-gold-400 mb-3">{tag}</span>

      <h3 className="text-xl font-serif mb-2 group-hover:text-gold-400 transition-colors">{title}</h3>

      <p className="text-paper-200/70 text-sm mb-4 line-clamp-2">{summary}</p>

      <div className="flex items-center gap-4 text-xs text-paper-200/40">
        {date && (<span className="flex items-center gap-1">{date}</span>)}
        <span className="flex items-center gap-1">{readingTime}</span>
      </div>
    </button>
  )
}
