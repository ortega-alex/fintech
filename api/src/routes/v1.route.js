import { Router } from 'express';
import { addUserCtr, getAllUserCtr, loginCtr } from '../controllers';
import { authenticateToken } from '../utilities';

const route = Router();

route.post('/user/login', loginCtr);

route.get('/user/all', authenticateToken, getAllUserCtr);
route.post('/user', authenticateToken, addUserCtr);

route.get('/', (req, res) => {
    res.send('Hola mundo');
});

export default route;
