import axios from 'axios';

const api = axios.create({
  baseURL: 'https://catalogo-filmes-backend.onrender.com/api'
});

export default api;
