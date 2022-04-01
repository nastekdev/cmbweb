import axios from 'axios';

export const api = axios.create(
  {
    baseURL: 'http://cmbhml.nastek.com.br:8000',
    // baseURL: 'http://localhost:8000',
  }
);
