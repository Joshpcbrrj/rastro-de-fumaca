'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import { mockArticles } from '../../../data/mockArticles'

export default function AdminArtigos() {
  const [articles] = useState(mockArticles)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-serif text-gold-400">Gerenciar Artigos</h1>
        <Link href="/admin/artigos/novo" className="flex items-center gap-2 px-4 py-2 bg-gold-500 text-navy-950 rounded-lg font-bold hover:bg-gold-400 transition">
          <Plus size={18} />
          Novo Artigo
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gold-400/20">
            <tr className="text-left text-paper-200/50 text-sm">
              <th className="pb-3">Título</th>
              <th className="pb-3">Categoria</th>
              <th className="pb-3">Data</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-b border-gold-400/10">
                <td className="py-3">{article.title}</td>
                <td className="py-3"><span className="text-xs px-2 py-1 bg-gold-500/10 text-gold-400 rounded">{article.tag}</span></td>
                <td className="py-3 text-paper-200/50 text-sm">{article.date}</td>
                <td className="py-3"><span className="text-xs px-2 py-1 bg-green-500/10 text-green-400 rounded">Publicado</span></td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <button className="p-1 hover:text-gold-400 transition"><Eye size={18} /></button>
                    <button className="p-1 hover:text-gold-400 transition"><Edit size={18} /></button>
                    <button className="p-1 hover:text-red-400 transition"><Trash2 size={18} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
