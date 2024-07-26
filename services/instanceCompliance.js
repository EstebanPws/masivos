import axios from 'axios';

const instanceCompliance = axios.create({
    baseURL: 'https://servicemerchat.paymentscompliance.co/WcfComplianceService.svc/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

export default instanceCompliance;
