import { format } from 'date-fns';
import CryptoJS from 'crypto-js';

export const formatDate = (date) => {
    if (!date) return '';
    return format(date, 'yyyy/MM/dd');
};

export const formatDateGuion = (date) => {
    if (!date) return '';
    return format(date, 'yyyyMMdd');
};

export const formatDateValue = (date) => {
    if (!date) return new Date();
    const year = date.substring(0, 4);
    const month = date.substring(4, 6) - 1; 
    const day = date.substring(6, 8);
    const datFinal = new Date(year, month, day);
    return datFinal;
};

export const formatNames = (names) => {
    const nameWithoutSpaces = names.trim();
    return nameWithoutSpaces.split(' ');
};

export const formatDateWithoutSlash = (date) => {
    return date.replaceAll('/', '');
};

export const formatCardNumber = (number) => {
    return number.replace(/(.{4})/g, '$1 ');
};

export const encryptIdWithSecret = (id, secretKey) => {
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
};

const generateRandomChars = (length) =>{
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charsLength = chars.length;
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * charsLength));
    }
    return result;
  }

export const generateUniqueId = () => {
    const nowUtc = new Date();
    const formattedDate = format(nowUtc, "yyyyMMddHHmmss");
    const randomChars = generateRandomChars(8);
    return `${formattedDate}${randomChars}`;
}