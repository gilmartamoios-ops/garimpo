
"use client";

import { useState } from "react";
import { ambientes } from "@/lib/ambientes";
import { prepararPesquisa } from "@/lib/pesquisa";

export default function Home() {
  const [ambienteSelecionado, setAmbienteSelecionado] = useState(
    ambientes[0]
  );

  const [consulta, setConsulta] = useState("");
  const [janelaPesquisaAberta, setJanelaPesquisaAberta] = useState(false);

  const [pesquisaPreparada, setPesquisaPreparada] = useState<{
    id: string;
    ambienteNome: string;
    consultaOriginal: string;
  } | null>(null);

  const [erroPesquisa, setErroPesquisa] = useState("");

  function selecionarAmbiente(
    ambiente: (typeof ambientes)[number]
  ) {
    setAmbienteSelecionado(ambiente);
    setConsulta("");
    setPesquisaPreparada(null);
    setErroPesquisa("");
    setJanelaPesquisaAberta(true);
  }

  function executarPreparacao() {
    try {
      const pesquisa = prepararPesquisa({
        ambienteId: ambienteSelecionado.id,
        consulta,
      });

      setPesquisaPreparada({
        id: pesquisa.id,
        ambienteNome: pesquisa.ambienteNome,
        consultaOriginal: pesquisa.consultaOriginal,
      });

      setErroPesquisa("");
    } catch (error) {
      setPesquisaPreparada(null);

      setErroPesquisa(
        error instanceof Error
          ? error.message
          : "Não foi possível preparar a pesquisa."
      );
    }
  }

  function fecharJanelaPesquisa() {
    setJanelaPesquisaAberta(false);
  }

  return (
    <main className="min-h-screen bg-[#080d16] text-white">
      <header className="flex items-center justify-between px-6 md:px-16 py-5 border-b border-white/10">
        <img
          src="/logo-garimpo.jpg"
          alt="GArimpo"
          className="h-14 w-auto object-contain rounded"
        />

        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <a href="#inicio" className="hover:text-amber-400">
            Início
          </a>
          <a href="#pesquisa" className="hover:text-amber-400">
            Pesquisa
          </a>
          <a href="#ambientes" className="hover:text-amber-400">
            Ambientes
          </a>
          <a href="#sobre" className="hover:text-amber-400">
            Sobre
          </a>
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

      <section
        id="pesquisa"
        className="max-w-5xl mx-auto px-5 py-12 md:py-16"
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold">
            O que você deseja encontrar?
          </h2>

          <p className="text-gray-400 mt-3 text-sm">
            Escolha um ambiente para iniciar sua pesquisa.
          </p>
        </div>

        <div
          id="ambientes"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {ambientes
            .filter((ambiente) => ambiente.ativo)
            .map((ambiente) => (
              <button
                key={ambiente.id}
                type="button"
                onClick={() => selecionarAmbiente(ambiente)}
                className="text-left rounded-xl border border-white/10 bg-[#111c2b] p-5 transition hover:border-amber-400 hover:bg-amber-500/10 active:scale-[0.99]"
              >
                <h3 className="font-semibold text-lg text-amber-400">
                  {ambiente.nome}
                </h3>

                <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                  {ambiente.descricao}
                </p>

                <div className="flex items-center justify-between mt-5">
                  <span className="text-xs text-amber-300">
                    Iniciar pesquisa
                  </span>

                  <span className="text-amber-400 text-lg">
                    →
                  </span>
                </div>
              </button>
            ))}
        </div>

        {pesquisaPreparada && (
          <div className="mt-8 rounded-xl border border-amber-500/30 bg-[#111c2b] p-5">
            <p className="text-amber-400 text-sm font-semibold">
              ÚLTIMA PESQUISA PREPARADA
            </p>

            <p className="text-white mt-3">
              Ambiente: {pesquisaPreparada.ambienteNome}
            </p>

            <p className="text-gray-300 mt-2">
              Consulta: {pesquisaPreparada.consultaOriginal}
            </p>

            <p className="text-gray-500 text-xs mt-4 break-all">
              Identificador: {pesquisaPreparada.id}
            </p>

            <p className="text-gray-400 text-xs mt-3">
              A pesquisa foi organizada. A conexão com fontes
              de informação será implementada posteriormente.
            </p>
          </div>
        )}
      </section>

      {janelaPesquisaAberta && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 md:p-6"
          onClick={fecharJanelaPesquisa}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-janela-pesquisa"
            className="flex flex-col w-full h-full md:h-auto md:max-h-[90vh] md:max-w-2xl overflow-y-auto bg-[#111c2b] border border-white/10 md:rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-5 md:p-7 border-b border-white/10">
              <div>
                <p className="text-amber-400 text-xs font-semibold tracking-widest">
                  GArimpo · PESQUISA
                </p>

                <h2
                  id="titulo-janela-pesquisa"
                  className="text-xl md:text-2xl font-semibold mt-2"
                >
                  {ambienteSelecionado.nome}
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  {ambienteSelecionado.finalidade}
                </p>
              </div>

              <button
                type="button"
                onClick={fecharJanelaPesquisa}
                aria-label="Fechar janela de pesquisa"
                className="text-gray-400 hover:text-white text-3xl leading-none px-2"
              >
                ×
              </button>
            </div>

            <div className="p-5 md:p-7 flex-1">
              <p className="text-sm text-gray-300 font-medium mb-3">
                Categorias deste ambiente
              </p>

              <div className="flex flex-wrap gap-2">
                {ambienteSelecionado.categorias.map((categoria) => (
                  <span
                    key={categoria}
                    className="text-xs rounded-full border border-amber-500/30 px-3 py-2 text-amber-300"
                  >
                    {categoria}
                  </span>
                ))}
              </div>

              <label
                htmlFor="consulta"
                className="block text-sm text-gray-300 mt-8 mb-3"
              >
                O que você deseja encontrar?
              </label>

              <textarea
                id="consulta"
                autoFocus
                value={consulta}
                onChange={(e) => {
                  setConsulta(e.target.value);
                  setPesquisaPreparada(null);
                  setErroPesquisa("");
                }}
                placeholder={`Descreva sua pesquisa em ${ambienteSelecionado.nome.toLowerCase()}...`}
                rows={5}
                className="w-full bg-[#080d16] border border-white/10 rounded-xl p-4 text-white placeholder:text-gray-500 outline-none focus:border-amber-500 resize-y"
              />

              {erroPesquisa && (
                <p className="text-red-400 text-sm mt-4">
                  {erroPesquisa}
                </p>
              )}

              {pesquisaPreparada && (
                <div className="mt-5 rounded-xl border border-amber-500/30 bg-[#080d16] p-5">
                  <p className="text-amber-400 text-sm font-semibold">
                    PESQUISA PREPARADA
                  </p>

                  <p className="text-white mt-3">
                    Ambiente: {pesquisaPreparada.ambienteNome}
                  </p>

                  <p className="text-gray-300 mt-2">
                    Consulta: {pesquisaPreparada.consultaOriginal}
                  </p>

                  <p className="text-gray-500 text-xs mt-4 break-all">
                    Identificador: {pesquisaPreparada.id}
                  </p>

                  <p className="text-gray-400 text-xs mt-3">
                    A pesquisa foi organizada. A conexão com fontes
                    de informação será implementada posteriormente.
                  </p>
                </div>
              )}

              {!pesquisaPreparada && (
                <p className="text-gray-500 text-xs mt-4">
                  A conexão com as fontes de informação será implementada
                  nas próximas etapas.
                </p>
              )}
            </div>

            <div className="p-5 md:px-7 md:pb-7 border-t border-white/10">
              <button
                type="button"
                disabled={!consulta.trim()}
                onClick={executarPreparacao}
                className="w-full rounded-xl bg-amber-500 text-black font-semibold py-4 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-amber-400 transition"
              >
                Preparar pesquisa
              </button>

              <button
                type="button"
                onClick={fecharJanelaPesquisa}
                className="w-full mt-3 rounded-xl border border-white/10 text-gray-300 py-3 hover:bg-white/5 transition"
              >
                Voltar aos ambientes
              </button>
            </div>
          </section>
        </div>
      )}

      <section
        id="sobre"
        className="text-center px-5 py-12 border-t border-white/10"
      >
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
