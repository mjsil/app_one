import axios from 'axios';

export const base_url = 'http://1net.net.br:3331';

const api = axios.create({
    baseURL: base_url,
});

export default api;
