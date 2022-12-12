import { httpRequest } from '@/utilities';
const controller = '/user';

/**
 *
 * @param {Objec} body
 * @returns {Object}
 */
export const httpSingIn = async body => await httpRequest(`${controller}/sing-in`, 'POST', body);
