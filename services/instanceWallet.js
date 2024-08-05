import axios from 'axios';

const instanceWallet = axios.create({
    baseURL: 'https://coopcentral-backwallet.vepay.com.co/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export default instanceWallet;