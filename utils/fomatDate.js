import { format } from 'date-fns';
import CryptoJS from 'crypto-js';

export const formatDate = (date) => {
    if (!date) return '';
    return format(date, 'yyyy/MM/dd');
};

export const formatNames = (names) => {
    const nameWithoutSpaces = names.trim();
    return nameWithoutSpaces.split(' ');
} 

export const formatDateWithoutSlash = (date) => {
    return date.replaceAll('/', '');
}

export const formatCardNumber = (number) => {
    return number.replace(/(.{4})/g, '$1 ');
};

export function encryptIdWithSecret(id, secretKey) {
    const data = id + secretKey;
    const hash = CryptoJS.MD5(data).toString();

    return hash;
}