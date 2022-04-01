import { TecnicoByUserRequestDTO } from '../../models/TecnicoByUserRequestDTO';
import { TecnicoByUserResponseDTO } from '../../models/TecnicoByUserResponseDTO';
import { api } from '../api';

export function getTecnicoByUser(user: TecnicoByUserRequestDTO): Promise<TecnicoByUserResponseDTO> {
  return api.get(
    `/api/tecnico`,
    {
      data: {
        ...user
      }
    }
  );
}
