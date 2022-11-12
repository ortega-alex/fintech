import { httpRequest } from '@/utilities';
const controller = 'settings-form';

export const httpGetSettingsFormByProccesIdAndCampaignId = async (procces_id, campaign_id) =>
    await httpRequest(`${controller}/${procces_id}/${campaign_id}`, 'GET');
export const httpAddOrUpdateSettingsForm = async body => await httpRequest(`${controller}`, 'POST', body);
