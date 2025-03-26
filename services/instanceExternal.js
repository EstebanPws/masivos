import axios from 'axios';

const instanceExternal = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL_EXTERNAL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export default instanceExternal;