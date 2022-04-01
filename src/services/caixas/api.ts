import { BoxStatusResponse } from '../../models/BoxStatusResponse';
import { api } from '../api';

export function getAllCaixas() {
  return api.get(
    `/api/caixa`,
  );
}

export function getStatusCaixaById(idCaixa: string | undefined) {
  return api.get(
    `/api/caixa/${idCaixa}/status/`,
  );
}
