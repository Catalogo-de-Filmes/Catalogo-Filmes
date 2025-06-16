import axios from 'axios';

const api = axios.create({
  baseURL: 'https://catalogo-filmes-8lgz.onrender.com'
});

export default api;
