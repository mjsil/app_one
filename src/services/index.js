import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.42.189:3232',
});

export default api;
