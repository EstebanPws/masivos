import axios from 'axios';

const instanceExternal = axios.create({
    baseURL: 'http://aavancegetwaypayvalidadev-1391159407.us-east-1.elb.amazonaws.com/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export default instanceExternal;