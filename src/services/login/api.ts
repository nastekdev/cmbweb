import { LoginRequestDTO } from '../../models/LoginRequestDTO';
import { api } from '../api';

export function postLogin(login: LoginRequestDTO) {
  return api.post(
    `/api/login/`,
    login,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    }
  );
}
