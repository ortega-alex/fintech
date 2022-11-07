import { httpRequest } from '@/utilities';
const controller = 'user';

export const httpSingIn = async body => await httpRequest(`${controller}/sing-in`, 'POST', body);
