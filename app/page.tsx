
"use client";

import { useState } from "react";
import { ambientes } from "@/lib/ambientes";
import { prepararPesquisa } from "@/lib/pesquisa";
import type { ConsultaWebGerada } from "@/lib/conectores/consultas-web";

type PesquisaPreparada = {
  id: string;
  ambienteNome: string;
  consultasWeb: ConsultaWebGerada[];
};

export default function Home() {
  const [pesquisaPreparada, setPesquisaPreparada] =
    useState<PesquisaPreparada | null>(null);

  const [ambienteSelecionado, setAmbienteSelecionado] =
    useState("");

  const [erroPesquisa, setErroPesquisa] = useState("");

  function selecionarAmbiente(ambiente: (typeof ambientes)[number]) {
    setAmbienteSelecionado(ambiente.nome);
    setPesquisaPreparada(null);
    setErroPesquisa("");

    try {
      // O sistema constrói a consulta usando as categorias
      // previamente definidas para cada ambiente.
      const consultaAutomatica =
        ambiente.categorias.length > 0
          ? ambiente.categorias.join(" ")
          : ambiente.finalidade;

      const pesquisa = prepararPesquisa({
        ambienteId: ambiente.id,
        consulta: consultaAutomatica,
        filtros: {},
      });

      setPesquisaPreparada({
        id: pesquisa.id,
        ambienteNome: pesquisa.ambienteNome,
        consultasWeb: pesquisa.consultasWeb,
      });
    } catch (error) {
      setErroPesquisa(
        error instanceof Error
          ? error.message
          : "Não foi possível preparar a pesquisa."
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#080d16] text-white">
      <header className="px-5 md:px-12 py-4 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <img
            src="/logo-garimpo.jpg"
            alt="GArimpo"
            className="h-12 md:h-14 w-auto object-contain rounded"
          />

          <span className="text-xs md:text-sm text-gray-400">
            Inteligência de descoberta
          </span>
        </div>
      </header>

      <section id="inicio" className="relative overflow-hidden">
        <img
          src="/banner-garimpo.jpg"
          alt="Inteligência de descoberta GArimpo"
          className="w-full h-[230px] md:h-[390px] object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#080d16] via-black/20 to-black/20" />

        <div className="absolute inset-0 flex flex-col items-center justify-end text-center px-5 pb-7 md:pb-12">
          <p className="text-amber-400 uppercase tracking-[0.25em] text-xs md:text-sm mb-3">
            Inteligência de descoberta
          </p>

          <h1 className="text-2xl md:text-5xl font-semibold tracking-tight">
            GArimpo
          </h1>

          <p className="mt-3 max-w-xl text-gray-200 text-sm md:text-base">
            Inteligência para descobrir pessoas e identificar
            oportunidades em fontes públicas.
          </p>
        </div>
      </section>

      <section
        id="pesquisa"
        className="max-w-4xl mx-auto px-5 py-10 md:py-14"
      >
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-3xl font-semibold">
            O que você deseja garimpar?
          </h2>

          <p className="text-gray-400 mt-2 text-sm">
            Escolha o ambiente. O GArimpo organiza a pesquisa.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {ambientes
            .filter((ambiente) => ambiente.ativo)
            .map((ambiente) => {
              const selecionado =
                ambienteSelecionado === ambiente.nome;

              return (
                <button
                  key={ambiente.id}
                  type="button"
                  onClick={() => selecionarAmbiente(ambiente)}
                  aria-pressed={selecionado}
                  className={`text-left rounded-xl border p-5 md:p-6 transition
                    ${
                      selecionado
                        ? "border-amber-400 bg-amber-500/10"
                        : "border-white/10 bg-[#111c2b] hover:border-amber-400 hover:bg-amber-500/5"
                    }`}
                >
                  <h3 className="font-semibold text-lg text-amber-400">
                    {ambiente.nome}
                  </h3>

                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                    {ambiente.descricao}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xs text-amber-300">
                      Selecionar ambiente
                    </span>

                    <span className="text-amber-400 text-xl">
                      →
                    </span>
                  </div>
                </button>
              );
            })}
        </div>

        {erroPesquisa && (
          <div
            role="alert"
            className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
          >
            {erroPesquisa}
          </div>
        )}

        {pesquisaPreparada && (
          <section
            aria-live="polite"
            className="mt-8 rounded-xl border border-amber-500/30 bg-[#111c2b] p-5 md:p-6"
          >
            <p className="text-amber-400 text-xs font-semibold tracking-wider">
              PESQUISA ORGANIZADA
            </p>

            <h3 className="text-white text-lg font-semibold mt-2">
              {pesquisaPreparada.ambienteNome}
            </h3>

            <p className="text-gray-400 text-sm mt-2 leading-relaxed">
              O GArimpo preparou consultas direcionadas às fontes
              públicas. Nesta etapa, os links precisam ser abertos
              manualmente. A coleta e a validação automática de
              perfis ainda serão implementadas.
            </p>

            {pesquisaPreparada.consultasWeb.length === 0 ? (
              <p className="text-gray-400 text-sm mt-5">
                Nenhuma consulta externa foi gerada para este ambiente.
              </p>
            ) : (
              <div className="mt-5 space-y-3">
                {pesquisaPreparada.consultasWeb.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-lg border border-white/10 bg-[#080d16] p-4"
                  >
                    <p className="text-white font-semibold text-sm">
                      {item.fonte}
                    </p>

                    <p className="text-gray-400 text-xs mt-1">
                      {item.objetivo}
                    </p>

                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex mt-3 rounded-lg border border-amber-500/40 px-4 py-2 text-sm text-amber-400 hover:bg-amber-500 hover:text-black transition"
                    >
                      Abrir consulta ↗
                    </a>
                  </div>
                ))}
              </div>
            )}

            <p className="text-gray-600 text-xs mt-5 break-all">
              Identificador: {pesquisaPreparada.id}
            </p>
          </section>
        )}
      </section>

      <footer className="text-center px-5 py-8 border-t border-white/10">
        <p className="text-gray-300 text-sm font-semibold">
          GArimpo
        </p>

        <p className="text-gray-500 text-xs mt-2">
          Inteligência de busca, descoberta e identificação.
        </p>

        <p className="text-gray-600 text-xs mt-5">
          © 2026 GArimpo. Todos os direitos reservados.
        </p>
      </footer>
    </main>
  );
}
