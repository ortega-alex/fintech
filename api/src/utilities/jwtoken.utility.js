import jwtoken from 'jsonwebtoken';
import { _KEYS } from './envirinment.utility';

export const authenticateToken = (req, res, next) => {
    console.log(req.headers);
    const authHeader = req.headers.Authorization || req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    jwtoken.verify(token, _KEYS.TOKEN, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

export const generateToken = payload => jwtoken.sign(payload, _KEYS.TOKEN);
