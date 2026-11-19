
export default function Home() {
  return (
    <main className="min-h-screen bg-[#080d16] text-white">
      <header className="flex items-center justify-between px-6 md:px-16 py-5 border-b border-white/10">
        <img
          src="/logo-garimpo.jpg"
          alt="GArimpo"
          className="h-14 w-auto object-contain rounded"
        />

        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <a href="#inicio" className="hover:text-amber-400">Início</a>
          <a href="#recursos" className="hover:text-amber-400">Recursos</a>
          <a href="#sobre" className="hover:text-amber-400">Sobre</a>
        </nav>

        <a
          href="#pesquisa"
          className="rounded-lg border border-amber-500/60 px-5 py-2 text-sm text-amber-400 hover:bg-amber-500 hover:text-black transition"
        >
          Explorar
        </a>
      </header>

      <section id="inicio" className="relative overflow-hidden">
        <img
          src="/banner-garimpo.jpg"
          alt="Lupa dourada sobre uma rede digital de informações"
          className="w-full h-[300px] md:h-[470px] object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#080d16] via-black/15 to-black/20" />

        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-5 pb-8 md:pb-14">
          <p className="text-amber-400 uppercase tracking-[0.3em] text-xs md:text-sm mb-4">
            Inteligência de descoberta
          </p>
          <h1 className="text-3xl md:text-6xl font-semibold tracking-tight">
            Encontre o que ainda não descobriu.
          </h1>
          <p className="mt-4 max-w-2xl text-gray-200 text-sm md:text-lg">
            Uma nova maneira de pesquisar, identificar pessoas,
            descobrir organizações e explorar conexões.
          </p>
        </div>
      </section>

      <section id="pesquisa" className="max-w-5xl mx-auto px-5 py-12 md:py-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold">
            O que você deseja encontrar?
          </h2>
          <p className="text-gray-400 mt-3 text-sm">
            Transforme uma pergunta em uma jornada de descoberta.
          </p>
        </div>

        <div className="bg-[#111c2b] border border-white/10 rounded-2xl p-3 md:p-4 flex flex-col md:flex-row gap-3 shadow-2xl">
          <input
            type="text"
            placeholder="Digite pessoas, organizações, profissionais, temas..."
            className="flex-1 bg-transparent px-4 py-4 outline-none text-white placeholder:text-gray-500"
          />
          <button
            type="button"
            disabled
            className="bg-amber-500 text-black font-semibold px-8 py-4 rounded-xl opacity-80 cursor-not-allowed"
          >
            Busca em preparação
          </button>
        </div>

        <p className="text-center text-gray-500 text-xs mt-4">
          A integração dos mecanismos de pesquisa será implementada nas próximas etapas.
        </p>
      </section>

      <section id="recursos" className="max-w-6xl mx-auto px-5 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <article className="bg-[#111c2b] border border-white/10 rounded-xl p-7">
            <div className="text-amber-400 text-3xl mb-4">⌕</div>
            <h3 className="font-semibold text-lg mb-2">Busca inteligente</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Explore diferentes fontes de informação a partir de critérios definidos.
            </p>
          </article>

          <article className="bg-[#111c2b] border border-white/10 rounded-xl p-7">
            <div className="text-amber-400 text-3xl mb-4">◎</div>
            <h3 className="font-semibold text-lg mb-2">Identificação</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Organize informações sobre pessoas, profissionais e organizações.
            </p>
          </article>

          <article className="bg-[#111c2b] border border-white/10 rounded-xl p-7">
            <div className="text-amber-400 text-3xl mb-4">⌘</div>
            <h3 className="font-semibold text-lg mb-2">Conexões</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Analise relações e possíveis correspondências entre informações públicas.
            </p>
          </article>
        </div>
      </section>

      <section id="sobre" className="text-center px-5 py-12 border-t border-white/10">
        <h2 className="text-xl font-semibold">GArimpo</h2>
        <p className="text-gray-400 text-sm mt-2">
          Inteligência de busca, descoberta e identificação.
        </p>
        <p className="text-gray-600 text-xs mt-6">
          © 2026 GArimpo. Todos os direitos reservados.
        </p>
      </section>
    </main>
  );
}
