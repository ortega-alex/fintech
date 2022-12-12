import { httpRequest } from '@/utilities';
const controller = '/campaign';

/**
 *
 * @returns {Array}
 */
export const httpCampaignsAcive = async () => await httpRequest(`${controller}/active`, 'GET');
