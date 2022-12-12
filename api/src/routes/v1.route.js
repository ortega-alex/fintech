import { Router } from 'express';
import {
    addCustomersCtr,
    addOrUpdateCampaignCtr,
    addOrUpdateSettingFormCtl,
    addUserCtr,
    getAllCampaignsCtr,
    getAllCustomersCtr,
    getAllUserCtr,
    getCampaignsActiveCtr,
    getCustomersByCampaignIdCtr,
    getSettingFormByProccessIdAndCampaignIdCtl,
    loginCtr
} from '../controllers';
import { authenticateToken } from '../utilities';

const route = Router();

route.post('/user/sing-in', loginCtr);

route.get('/user/all', authenticateToken, getAllUserCtr);
route.post('/user', authenticateToken, addUserCtr);

route.get('/campaign/all', authenticateToken, getAllCampaignsCtr);
route.get('/campaign/active', authenticateToken, getCampaignsActiveCtr);
route.post('/campaign', authenticateToken, addOrUpdateCampaignCtr);

route.get('/customer/all', authenticateToken, getAllCustomersCtr);
route.get('/customer/:id', authenticateToken, getCustomersByCampaignIdCtr);
route.post('/customer', authenticateToken, addCustomersCtr);

route.get('/settings-form/:proccess_id/:campaign_id', authenticateToken, getSettingFormByProccessIdAndCampaignIdCtl);
route.post('/settings-form', authenticateToken, addOrUpdateSettingFormCtl);

export default route;
