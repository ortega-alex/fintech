import { Router } from 'express';
import { addOrUpdateCampaignCtr, addUserCtr, getAllCampaignsCtr, getAllUserCtr, loginCtr } from '../controllers';
import { authenticateToken } from '../utilities';

const route = Router();

route.post('/user/sing-in', loginCtr);

route.get('/user/all', authenticateToken, getAllUserCtr);
route.post('/user', authenticateToken, addUserCtr);

route.get('/campaign/all', authenticateToken, getAllCampaignsCtr);
route.post('/campaign', authenticateToken, addOrUpdateCampaignCtr);

route.get('/', (req, res) => {
    res.send('Hola mundo');
});

export default route;
