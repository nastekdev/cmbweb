export interface BoxStatusResponse {
  created_at?: string;
  id?: string;
  latitude?: string;
  longitude?: string;
  passwords?: string;
  solicitacao_pendente?: SolicitacaoPendente;
  ultimas_ocorrencias?: UltimasOcorrencias;
  ultimos_alarmes?: UltimosAlarmes;
  status?: string;
  statusText?: string;
}

export interface SolicitacaoPendente {
  caixa?: Caixa;
  created_at?: string;
  status?: string;
  tecnico?: Tecnico;
}

export interface Caixa {
  id?: string;
  latitude?: string;
  longitude?: string;
}

export interface Tecnico {
  email?: string;
  nome?: string;
}

export interface UltimasOcorrencias {
  ferrolho_1?: {
    caixa?: string;
    id?: string;
    momento_ocorrencia?: string;
    status?: string;
    tipo?: string;
  };
  ferrolho_2?: {
    caixa?: string;
    id?: string;
    momento_ocorrencia?: string;
    status?: string;
    tipo?: string;
  };
  porta_p1?: {
    caixa?: string;
    id?: string;
    momento_ocorrencia?: string;
    status?: string;
    tipo?: string;
  };
  porta_p2?: {
    caixa?: string;
    id?: string;
    momento_ocorrencia?: string;
    status?: string;
    tipo?: string;
  };
  porta_p3?: {
    caixa?: string;
    id?: string;
    momento_ocorrencia?: string;
    status?: string;
    tipo?: string;
  };
  porta_p4?: {
    caixa?: string;
    id?: string;
    momento_ocorrencia?: string;
    status?: string;
    tipo?: string;
  };
  presenca_1?: {
    caixa?: string;
    id?: string;
    momento_ocorrencia?: string;
    status?: string;
    tipo?: string;
  };
  presenca_2?: {
    caixa?: string;
    id?: string;
    momento_ocorrencia?: string;
    status?: string;
    tipo?: string;
  };
  trava_p1_e_p2?: {
    caixa?: string;
    id?: string;
    momento_ocorrencia?: string;
    status?: string;
    tipo?: string;
  };
  trava_p3_e_p4?: {
    caixa?: string;
    id?: string;
    momento_ocorrencia?: string;
    status?: string;
    tipo?: string;
  };
}

export interface UltimosAlarmes {
  alarme_abertura_manual?: {
    caixa?: string;
    id?: string;
    momento_ocorrencia?: string;
    status?: string;
    tipo?: string;
  };
  alarme_energia?: {
    caixa?: string;
    id?: string;
    momento_ocorrencia?: string;
    status?: string;
    tipo?: string;
  };
  alarme_ferrolho?: {
    caixa?: string;
    id?: string;
    momento_ocorrencia?: string;
    status?: string;
    tipo?: string;
  };
  alarme_presenca?: {
    caixa?: string;
    id?: string;
    momento_ocorrencia?: string;
    status?: string;
    tipo?: string;
  };
  alarme_solicitacao_abertura?: {
    caixa?: string;
    id?: string;
    momento_ocorrencia?: string;
    status?: string;
    tipo?: string;
  };
  alarme_temperatura?: {
    caixa?: string;
    id?: string;
    momento_ocorrencia?: string;
    status?: string;
    tipo?: string;
  };
  alarme_vibracao?: {
    caixa?: string;
    id?: string;
    momento_ocorrencia?: string;
    status?: string;
    tipo?: string;
  };
  alarme_violacao?: {
    caixa?: string;
    id?: string;
    momento_ocorrencia?: string;
    status?: string;
    tipo?: string;
  };
}
