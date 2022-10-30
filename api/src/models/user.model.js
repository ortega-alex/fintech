import { executeQuery } from '../utilities';
import bcrypt from 'bcryptjs';

export const getUserByUsername = async (username, next) => {
    const query = ` SELECT *	
                    FROM user 
                    WHERE username = ?`;
    const res = await executeQuery(query, [username]);
    next(res.error, res);
};

export const getAllUsers = async next => {
    const query = ` SELECT *
                    FROM user
                    ORDER BY username`;
    const res = await executeQuery(query);
    next(res.error, res);
};

export const addUser = async (user, next) => {
    const { id_user, username, password, facebook, google, temporal_password, state, temporal_password_expiration } = onFormat(user);
    const query = ` INSERT INTO user (id_user, username, password, facebook, google)
                    VALUES (?, ?, ?, ?, ?) AS val
                    ON DUPLICATE KEY UPDATE
                    username = val.username,
                    password = val.password,
                    facebook = val.facebook,
                    google = val.google,
                    temporal_password = ?,
                    state = ?,
                    temporal_password_expiration = ?,
                    edition_date = CURRENT_TIMESTAMP()`;
    const res = await executeQuery(query, [
        id_user,
        username,
        password,
        facebook,
        google,
        temporal_password,
        state,
        temporal_password_expiration
    ]);
    next(res.error, res.insertId);
};

const onFormat = data => {
    data.toString();
    data.id_user = 'id_user' in data ? parseInt(data.id_user) : 0;
    data.username = 'username' in data ? String(data.username).trim() : null;
    data.password = 'password' in data ? bcrypt.hashSync(data.password, 8) : null;
    data.facebook = 'facebook' in data ? String(data.facebook).trim() : null;
    data.google = 'google' in data ? String(data.google).trim() : null;
    data.temporal_password = 'temporal_password' in data ? bcrypt.hashSync(data.temporal_password, 8) : null;
    data.state = 'state' in data ? parseInt(data.state) : 1;
    data.temporal_password_expiration = 'temporal_password_expiration' in data ? `DATE_ADD(NOW(), INTERVAL 10 minute)` : null;
    return data;
};
