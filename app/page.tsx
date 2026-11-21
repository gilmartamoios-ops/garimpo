
"use client";

import { useState } from "react";
import { ambientes } from "@/lib/ambientes";

type Publicacao = {
  uri: string;
  texto: string;
  publicadaEm: string;
  autor: {
    nome: string;
    identificador: string;
    perfil: string;
    avatar?: string;
  };
  endereco: string;
  metricas: {
    curtidas: number;
    compartilhamentos: number;
    respostas: number;
  };
};

type GrupoResultado = {
  grupo: string;
  publicacoes: Publicacao[];
  total: number;
  consultasExecutadas: string[];
  falhas: {
    consulta: string;
    erro: string;
  }[];
};

type ResultadoGarimpo = {
  pesquisaId: string;
  nicho: string;
  ambiente: string;
  fonte: string;
  status: string;
  totalPublicacoes: number;
  grupos: GrupoResultado[];
  consultadoEm: string;
};

const nomesGrupos: Record<string, string> = {
  consumidores_suplementos: "Consumidores de suplementos",
  interesse_suplementos: "Interesse em suplementos",
  publico_conteudos_afins: "Interesse em conteúdos relacionados",
  empreendedores_venda_direta: "Empreendedores de venda direta",
};

function formatarData(data: string): string {
  if (!data) {
    return "Data não informada";
  }

  const valor = new Date(data);

  if (Number.isNaN(valor.getTime())) {
    return "Data não informada";
  }

  return valor.toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export default function Home() {
  const [ambienteSelecionado, setAmbienteSelecionado] =
    useState("");

  const [carregando, setCarregando] = useState(false);

  const [resultado, setResultado] =
    useState<ResultadoGarimpo | null>(null);

  const [erroPesquisa, setErroPesquisa] = useState("");

  async function selecionarAmbiente(
    ambiente: (typeof ambientes)[number]
  ) {
    if (carregando) {
      return;
    }

    setAmbienteSelecionado(ambiente.nome);
    setResultado(null);
    setErroPesquisa("");
    setCarregando(true);

    try {
      const resposta = await fetch("/api/pesquisar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ambienteId: ambiente.id,
        }),
        cache: "no-store",
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          dados.erro ?? "Não foi possível executar o garimpo."
        );
      }

      setResultado(dados as ResultadoGarimpo);
    } catch (error) {
      setErroPesquisa(
        error instanceof Error
          ? error.message
          : "Não foi possível executar o garimpo."
      );
    } finally {
      setCarregando(false);
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
        className="max-w-5xl mx-auto px-5 py-10 md:py-14"
      >
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-3xl font-semibold">
            O que você deseja garimpar?
          </h2>

          <p className="text-gray-400 mt-2 text-sm">
            Escolha o ambiente. O GArimpo executa a pesquisa.
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
                  disabled={carregando}
                  onClick={() => selecionarAmbiente(ambiente)}
                  aria-pressed={selecionado}
                  className={`text-left rounded-xl border p-5 md:p-6 transition disabled:opacity-60
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
                      {carregando && selecionado
                        ? "Executando garimpo..."
                        : "Iniciar garimpo"}
                    </span>

                    <span className="text-amber-400 text-xl">
                      →
                    </span>
                  </div>
                </button>
              );
            })}
        </div>

        {carregando && (
          <div
            role="status"
            className="mt-8 rounded-xl border border-amber-500/30 bg-[#111c2b] p-6 text-center"
          >
            <div className="text-amber-400 font-semibold">
              GArimpo em execução
            </div>

            <p className="text-gray-400 text-sm mt-2">
              Consultando publicações e identificando autores no Bluesky.
            </p>

            <p className="text-gray-500 text-xs mt-3">
              Aguarde a conclusão das consultas.
            </p>
          </div>
        )}

        {erroPesquisa && (
          <div
            role="alert"
            className="mt-6 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
          >
            {erroPesquisa}
          </div>
        )}

        {resultado && (
          <section
            aria-live="polite"
            className="mt-8 rounded-xl border border-amber-500/30 bg-[#111c2b] p-5 md:p-6"
          >
            <p className="text-amber-400 text-xs font-semibold tracking-wider">
              RESULTADO DO GARIMPO
            </p>

            <h3 className="text-white text-xl font-semibold mt-2">
              {resultado.nicho}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
              <div className="rounded-lg bg-[#080d16] p-4">
                <p className="text-gray-500 text-xs">
                  Publicações encontradas
                </p>
                <p className="text-2xl font-semibold text-amber-400 mt-1">
                  {resultado.totalPublicacoes}
                </p>
              </div>

              <div className="rounded-lg bg-[#080d16] p-4">
                <p className="text-gray-500 text-xs">
                  Grupos pesquisados
                </p>
                <p className="text-2xl font-semibold text-white mt-1">
                  {resultado.grupos.length}
                </p>
              </div>

              <div className="rounded-lg bg-[#080d16] p-4 col-span-2 sm:col-span-1">
                <p className="text-gray-500 text-xs">
                  Fonte consultada
                </p>
                <p className="text-lg font-semibold text-white mt-1">
                  {resultado.fonte}
                </p>
              </div>
            </div>

            <p className="text-gray-400 text-xs mt-4">
              Consulta realizada em {formatarData(resultado.consultadoEm)}
            </p>

            {resultado.totalPublicacoes === 0 && (
              <div className="mt-6 rounded-lg border border-white/10 bg-[#080d16] p-5">
                <p className="text-white font-semibold text-sm">
                  Nenhuma publicação encontrada nesta execução.
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Isso não significa que não existam pessoas com esse
                  interesse. Significa apenas que esta fonte não retornou
                  publicações para as consultas realizadas.
                </p>
              </div>
            )}

            <div className="mt-7 space-y-7">
              {resultado.grupos.map((grupo) => (
                <div key={grupo.grupo}>
                  <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
                    <h4 className="text-white font-semibold text-sm">
                      {nomesGrupos[grupo.grupo] ?? grupo.grupo}
                    </h4>

                    <span className="text-amber-400 text-sm font-semibold">
                      {grupo.total} publicações
                    </span>
                  </div>

                  {grupo.publicacoes.length === 0 ? (
                    <p className="text-gray-500 text-sm mt-3">
                      Nenhuma publicação encontrada neste grupo.
                    </p>
                  ) : (
                    <div className="space-y-3 mt-4">
                      {grupo.publicacoes.map((publicacao) => (
                        <article
                          key={publicacao.uri}
                          className="rounded-lg border border-white/10 bg-[#080d16] p-4"
                        >
                          <div className="flex items-start gap-3">
                            {publicacao.autor.avatar ? (
                              <img
                                src={publicacao.autor.avatar}
                                alt=""
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-[#263449] flex items-center justify-center text-amber-400 font-semibold">
                                {publicacao.autor.nome
                                  .charAt(0)
                                  .toUpperCase()}
                              </div>
                            )}

                            <div className="min-w-0 flex-1">
                              <p className="text-white font-semibold text-sm">
                                {publicacao.autor.nome}
                              </p>

                              <p className="text-gray-500 text-xs mt-1 break-all">
                                @{publicacao.autor.identificador}
                              </p>

                              <p className="text-gray-500 text-xs mt-1">
                                {formatarData(publicacao.publicadaEm)}
                              </p>
                            </div>
                          </div>

                          <p className="text-gray-300 text-sm leading-relaxed mt-4 whitespace-pre-wrap break-words">
                            {publicacao.texto || "Publicação sem texto."}
                          </p>

                          <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-gray-500 text-xs">
                            <span>
                              Curtidas: {publicacao.metricas.curtidas}
                            </span>
                            <span>
                              Compartilhamentos: {publicacao.metricas.compartilhamentos}
                            </span>
                            <span>
                              Respostas: {publicacao.metricas.respostas}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-4 mt-4">
                            <a
                              href={publicacao.autor.perfil}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-amber-400 text-xs hover:underline"
                            >
                              Abrir perfil ↗
                            </a>

                            <a
                              href={publicacao.endereco}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-amber-400 text-xs hover:underline"
                            >
                              Ver publicação original ↗
                            </a>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}

                  {grupo.falhas.length > 0 && (
                    <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                      <p className="text-red-300 text-xs font-semibold">
                        Consultas que apresentaram falhas
                      </p>

                      {grupo.falhas.map((falha, indice) => (
                        <p
                          key={`${falha.consulta}-${indice}`}
                          className="text-gray-400 text-xs mt-2"
                        >
                          {falha.consulta}: {falha.erro}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-7 border-t border-white/10 pt-4">
              <p className="text-gray-500 text-xs leading-relaxed">
                Estes são resultados de publicações públicas encontradas
                no Bluesky. A presença de uma pessoa nesta lista não
                comprova compra, consumo, intenção comercial ou atuação
                como consultor. A classificação individual ainda será
                desenvolvida com base nas evidências.
              </p>

              <p className="text-gray-600 text-xs mt-3 break-all">
                Identificador: {resultado.pesquisaId}
              </p>
            </div>
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
