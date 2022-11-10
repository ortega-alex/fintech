import { httpRequest } from '@/utilities';
const controller = 'campaign';

export const httpGetAllCampaigns = async () => await httpRequest(`${controller}/all`, 'GET');
export const httpAddOrUpdateCampaign = async body => await httpRequest(`${controller}`, 'POST', body);
