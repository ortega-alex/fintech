import { httpRequest } from '@/utilities';
const controller = '/settings-form';

/**
 *
 * @param {Int} proccess_id
 * @param {Int} campaign_id
 * @returns {Object}
 */
export const httpGetSettingsForm = async (proccess_id, campaign_id) =>
    await httpRequest(`${controller}/${proccess_id}/${campaign_id}`, 'GET');
