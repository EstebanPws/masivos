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
    try {
        const key = CryptoJS.enc.Hex.parse(secretKey);
        const iv = CryptoJS.enc.Hex.parse('00000000000000000000000000000000');

        const encrypted = CryptoJS.AES.encrypt(id, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        return encrypted.toString();
    } catch (error) {
        console.log(error.message);
        return "";
    }
}