import axios, { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptores de request (se necessário)
api.interceptors.request.use(
  (config) => {
    // Adicione qualquer lógica antes de enviar a requisição
    return config;
  },
  (error) => {
    // Lida com o erro de requisição
    return Promise.reject(error);
  }
);
 
// Interceptores de response (se necessário)
api.interceptors.response.use(
  (response) => {
    // Qualquer lógica para processar a resposta
    return response;
  },
  (error) => {
    // Lida com o erro de resposta
    return Promise.reject(error);
  }
);

const responseBody = (response: AxiosResponse) => response.data;

export const requests = {
 get: (url: string) => api.get(url).then(responseBody),
 post: (url: string, body: {}) => api.post(url, body).then(responseBody),
 put: (url: string, body: {}) => api.put(url, body).then(responseBody),
 patch: (url: string, body: {}) => api.patch(url, body).then(responseBody),
 delete: (url: string) => api.delete(url).then(responseBody),
};