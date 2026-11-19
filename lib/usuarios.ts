export type PapelUsuario = "master" | "usuario";

export type StatusUsuario = "ativo" | "bloqueado" | "pendente";

export type Usuario = {
  id: string;
  nome: string;
  email: string;
  papel: PapelUsuario;
  status: StatusUsuario;
  criadoEm: string;
  ultimoAcesso?: string;
};

export type LimiteUsuario = {
  id: string;
  usuarioId: string;
  limiteDiario: number;
  ativo: boolean;
  fusoHorario: "America/Sao_Paulo";
  atualizadoEm: string;
  atualizadoPor: string;
};

export type ConsumoDiario = {
  id: string;
  usuarioId: string;
  dataReferencia: string;
  quantidadeUtilizada: number;
  atualizadoEm: string;
};

export type ResumoUtilizacao = {
  usuarioId: string;
  limiteDiario: number;
  quantidadeUtilizada: number;
  quantidadeRestante: number;
  percentualUtilizado: number;
  dataReferencia: string;
  proximaRenovacao: string;
};

export type ConfiguracaoManutencao = {
  ativa: boolean;
  mensagem: string;
  iniciadaEm?: string;
  atualizadaEm: string;
  atualizadaPor: string;
};

export type EventoAuditoria = {
  id: string;
  usuarioId: string;
  acao: string;
  descricao: string;
  realizadoPor: string;
  criadoEm: string;
};

export function usuarioPodeAcessar(
  usuario: Usuario
): boolean {
  return usuario.status === "ativo";
}

export function usuarioPodeAdministrar(
  usuario: Usuario
): boolean {
  return (
    usuario.status === "ativo" &&
    usuario.papel === "master"
  );
}

export function calcularUtilizacao(
  limiteDiario: number,
  quantidadeUtilizada: number
): Pick<
  ResumoUtilizacao,
  "quantidadeRestante" | "percentualUtilizado"
> {
  const limite = Math.max(0, limiteDiario);
  const utilizada = Math.max(0, quantidadeUtilizada);

  return {
    quantidadeRestante: Math.max(0, limite - utilizada),
    percentualUtilizado:
      limite === 0
        ? 0
        : Math.min(100, Math.round((utilizada / limite) * 100)),
  };
}

export function usuarioPodePesquisar(
  usuario: Usuario,
  limite: LimiteUsuario,
  quantidadeUtilizada: number
): boolean {
  return (
    usuarioPodeAcessar(usuario) &&
    limite.ativo &&
    limite.usuarioId === usuario.id &&
    quantidadeUtilizada < limite.limiteDiario
  );
}
