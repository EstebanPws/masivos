import { format } from 'date-fns';

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