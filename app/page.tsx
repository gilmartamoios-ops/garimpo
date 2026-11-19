
"use client";

import { useState } from "react";
import { ambientes } from "@/lib/ambientes";

export default function Home() {
  const [ambienteSelecionado, setAmbienteSelecionado] = useState(
    ambientes[0]
  );
  const [consulta, setConsulta] = useState("");

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
          <a href="#pesquisa" className="hover:text-amber-400">Pesquisa</a>
          <a href="#ambientes" className="hover:text-amber-400">Ambientes</a>
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
          alt="Inteligência de descoberta GArimpo"
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
            Escolha um ambiente e defina sua pesquisa.
          </p>
        </div>

        <div id="ambientes" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {ambientes.filter((ambiente) => ambiente.ativo).map((ambiente) => (
            <button
              key={ambiente.id}
              type="button"
              onClick={() => {
                setAmbienteSelecionado(ambiente);
                setConsulta("");
              }}
              className={`text-left rounded-xl border p-5 transition ${
                ambienteSelecionado.id === ambiente.id
                  ? "border-amber-400 bg-amber-500/10"
                  : "border-white/10 bg-[#111c2b] hover:border-amber-500/50"
              }`}
            >
              <h3 className="font-semibold text-lg text-amber-400">
                {ambiente.nome}
              </h3>

              <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                {ambiente.descricao}
              </p>

              <p className="text-xs text-gray-500 mt-4">
                {ambienteSelecionado.id === ambiente.id
                  ? "Ambiente selecionado"
                  : "Selecionar ambiente"}
              </p>
            </button>
          ))}
        </div>

        <div className="bg-[#111c2b] border border-white/10 rounded-2xl p-5 md:p-7 shadow-2xl">
          <p className="text-amber-400 text-sm font-semibold mb-2">
            AMBIENTE SELECIONADO
          </p>

          <h3 className="text-xl font-semibold">
            {ambienteSelecionado.nome}
          </h3>

          <p className="text-gray-400 text-sm mt-2">
            {ambienteSelecionado.finalidade}
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            {ambienteSelecionado.categorias.map((categoria) => (
              <span
                key={categoria}
                className="text-xs rounded-full border border-amber-500/30 px-3 py-2 text-amber-300"
              >
                {categoria}
              </span>
            ))}
          </div>

          <div className="mt-7">
            <label
              htmlFor="consulta"
              className="block text-sm text-gray-300 mb-3"
            >
              Descreva o que deseja encontrar
            </label>

            <textarea
              id="consulta"
              value={consulta}
              onChange={(e) => setConsulta(e.target.value)}
              placeholder={`Descreva sua pesquisa em ${ambienteSelecionado.nome.toLowerCase()}...`}
              rows={3}
              className="w-full bg-[#080d16] border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-500 outline-none focus:border-amber-500 resize-y"
            />

            <button
              type="button"
              disabled
              className="w-full mt-4 rounded-xl bg-amber-500 text-black font-semibold py-4 opacity-60 cursor-not-allowed"
            >
              Motor de pesquisa em preparação
            </button>

            <p className="text-center text-gray-500 text-xs mt-3">
              A conexão com as fontes de informação será implementada
              nas próximas etapas.
            </p>
          </div>
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
