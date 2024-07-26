import axios from 'axios';

const instanceMunicipios = axios.create({
    baseURL: 'https://www.datos.gov.co/api/id/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export default instanceMunicipios;