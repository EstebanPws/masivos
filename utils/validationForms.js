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