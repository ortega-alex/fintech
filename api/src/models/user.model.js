import { executeQuery } from '../utilities';
import bcrypt from 'bcryptjs';

export const getUserByUsername = async playlod => {
    const strQuery = ` SELECT a.*	
                    FROM user a
                    LEFT JOIN person b ON a.user_id = b.user_id 
                    WHERE a.username = ?
                    OR b.email = ?`;
    const res = await executeQuery(strQuery, [playlod, playlod]);
    if (res.error) throw res.error.sqlMessage;
    return res;
};

export const getAllUsers = async () => {
    const strQuery = `  SELECT a.*,
                            b.type_user,
                            c.*,
                            a.user_id
                        FROM user a
                        INNER JOIN type_user b ON a.type_user_id = b.type_user_id
                        LEFT JOIN person c ON a.user_id = c.user_id
                        ORDER BY a.username`;
    const res = await executeQuery(strQuery);
    if (res.error) throw res.error.sqlMessage;
    return res;
};

export const addOrUpdateUser = async user => {
    const { user_id, type_user_id, username, password, provider, provider_id, temporal_password, state, temporal_password_expiration } =
        onFormat(user);
    const strQuery = ` INSERT INTO user (user_id, type_user_id, username, password, provider, provider_id)
                    VALUES (?, ?, ?, ?, ?, ?) AS val
                    ON DUPLICATE KEY UPDATE
                    type_user_id = val.type_user_id,
                    username = val.username,
                    password = val.password,
                    provider = val.provider,
                    provider_id = val.provider_id,
                    temporal_password = ?,
                    state = ?,
                    temporal_password_expiration = ?,
                    edition_date = CURRENT_TIMESTAMP()`;
    const res = await executeQuery(strQuery, [
        user_id,
        type_user_id,
        username,
        password,
        provider,
        provider_id,
        temporal_password,
        state,
        temporal_password_expiration
    ]);
    if (res.error) throw res.error.sqlMessage;
    return res.insertId;
};

const onFormat = data => {
    data.toString();
    data.user_id = 'user_id' in data ? parseInt(data.user_id) : 0;
    data.type_user_id = 'type_user_id' in data ? parseInt(data.type_user_id) : 1;
    data.username = 'username' in data ? String(data.username).trim() : null;
    data.password = 'password' in data ? bcrypt.hashSync(data.password, 8) : null;
    data.provider = 'provider' in data ? String(data.provider).trim() : null;
    data.provider_id = 'provider_id' in data ? String(data.provider_id).trim() : null;
    data.temporal_password = 'temporal_password' in data ? bcrypt.hashSync(data.temporal_password, 8) : null;
    data.state = 'state' in data ? parseInt(data.state) : 1;
    data.temporal_password_expiration = 'temporal_password_expiration' in data ? `DATE_ADD(NOW(), INTERVAL 10 minute)` : null;
    return data;
};
