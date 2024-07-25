import { format } from 'date-fns';

export const formatDate = (date) => {
    if (!date) return '';
    return format(date, 'yyyy/MM/dd');
};