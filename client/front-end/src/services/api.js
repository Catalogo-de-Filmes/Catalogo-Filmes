import axios from 'axios';

const api = axios.create({
  baseURL: 'https://catalogo-filmes-3b3k.onrender.com/api',
  withCredentials: true
});


export default api;
