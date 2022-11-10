import moment from 'moment';
import es from 'moment/dist/locale/es';
moment.locale('es', es);

export const replaceAccents = str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
export const replaceWhiteSpaceByCharacter = (str, char) => str.replace(/\s/g, char);
export const newCode = () => `${Math.round(Math.random() * 999999)}-${moment().format('YYYYMMDD')}`;
export const dateFormat = (date, format = null) =>
    date && String(date).trim !== '' && date !== 'null' ? moment(date).format(format ? format : 'DD/MM/YYYY') : '';
