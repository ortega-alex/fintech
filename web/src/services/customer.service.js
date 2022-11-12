import { httpRequest } from '@/utilities';
const controller = 'customer';

export const httpGetAllCustomers = async () => await httpRequest(`${controller}/all`, 'GET');
export const httpGetCustomersByCampaignId = async id => await httpRequest(`${controller}/${id}`, 'GET');
