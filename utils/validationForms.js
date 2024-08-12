export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const validatePhone = (phone) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
};

export const validateDocumentNumber = (documentNumber) => {
    const regex = /^[0-9]+$/;
    return regex.test(documentNumber);
};

export const formatCurrency = (value) => {
    const newValue = value.replace(/^\$/, '');
    const numberValue = parseFloat(newValue.replaceAll('.', ''));
    if (isNaN(numberValue)) return '';
    return numberValue.toLocaleString('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
};

export const validateNumber = (value) => {
    const newValue = value.replace(/^\$/, '');
    const numberValue = parseFloat(newValue.replaceAll('.', ''));
    if (isNaN(numberValue)) return '';
    return Number(numberValue);
};