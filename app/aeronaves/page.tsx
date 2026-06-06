const aircraft = [
  {
    name: 'Republic P-47 Thunderbolt',
    period: 'Segunda Guerra Mundial',
    type: 'Caça',
    description: 'Aeronave símbolo do projeto. Utilizada pelo 1º Grupo de Aviação de Caça na Itália.',
    imageUrl: '/images/aircraft/p47.jpg',
  },
  {
    name: 'Consolidated PBY Catalina',
    period: 'Segunda Guerra Mundial',
    type: 'Patrulha Marítima',
    description: 'Hidroavião anfíbio usado na vigilância do Atlântico Sul.',
    imageUrl: '/images/aircraft/catalina.jpg',
  },
  {
    name: 'Douglas C-47 Skytrain',
    period: 'Segunda Guerra até atualidade',
    type: 'Transporte',
    description: 'Aeronave lendária que serviu por décadas na FAB.',
    imageUrl: '/images/aircraft/c47.jpg',
  },
]

export default function AeronavesPage() {
  return (
    <main className="container mx-auto px-4 py-8 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-serif text-gold-400 mb-2">Hangar Histórico</h1>
        <p className="text-paper-200/60">Conheça as aeronaves que marcaram a história da aviação brasileira</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aircraft.map((plane) => (
          <div key={plane.name} className="rounded-panel border border-gold-400/20 bg-white/5 p-6 shadow-panel transition-all duration-300 hover:-translate-y-1">
            <div className="w-full h-48 bg-navy-800 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-5xl">✈️</span>
            </div>
            <h3 className="text-xl font-serif mb-2">{plane.name}</h3>
            <div className="flex gap-2 mb-3">
              <span className="text-xs px-2 py-1 bg-gold-500/10 text-gold-400 rounded">{plane.period}</span>
              <span className="text-xs px-2 py-1 bg-gold-500/10 text-gold-400 rounded">{plane.type}</span>
            </div>
            <p className="text-sm text-paper-200/70">{plane.description}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
