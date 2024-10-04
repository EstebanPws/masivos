import axios from 'axios';
import { getSessionToken } from '@/utils/storageUtils';

const instanceWallet = axios.create({
    baseURL: 'https://coopcentral-backwallet.vepay.com.co/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

instanceWallet.interceptors.request.use(
    async (config) => {
        const token = await getSessionToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instanceWallet.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.message === 'Network Error') {
        error.messsage = 'Error de red detectado. Verifique su conexión.';
      } else if (error.code === 'ECONNABORTED') {
        error.messsage = 'La solicitud ha tardado demasiado y ha sido cancelada.';
      }

      return Promise.reject(error);
    }
);

export default instanceWallet;