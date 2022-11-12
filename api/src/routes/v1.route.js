import { Router } from 'express';
import {
    addOrUpdateCampaignCtr,
    addOrUpdateSettingFormCtl,
    addUserCtr,
    getAllCampaignsCtr,
    getAllCustomersCtr,
    getAllUserCtr,
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
route.post('/campaign', authenticateToken, addOrUpdateCampaignCtr);

route.get('/customer/all', authenticateToken, getAllCustomersCtr);
route.get('/customer/:id', authenticateToken, getCustomersByCampaignIdCtr);

route.get('/settings-form/:proccess_id/:campaign_id', authenticateToken, getSettingFormByProccessIdAndCampaignIdCtl);
route.post('/settings-form', authenticateToken, addOrUpdateSettingFormCtl);

export default route;
